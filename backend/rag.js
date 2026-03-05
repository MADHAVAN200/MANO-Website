// rag.js — Core RAG logic: ChromaDB + Embeddings + Groq LLM
import { ChromaClient } from "chromadb";
import Groq from "groq-sdk";
import { pipeline } from "@xenova/transformers";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env explicitly from this file's directory (fixes ES module import order issue)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// ─── Config ───────────────────────────────────────────────────────────────────
const CHROMA_PATH = process.env.CHROMA_PATH || path.join(__dirname, "chroma_data");
const COLLECTION = "mano_kb";
const EMBED_MODEL = "Xenova/all-MiniLM-L6-v2"; // same model used during indexing

function readEnvNumber(name, fallback) {
    const raw = process.env[name];
    if (raw === undefined || raw === null || raw === "") return fallback;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

const DEFAULT_TOP_K = Math.round(clamp(readEnvNumber("RAG_DEFAULT_TOP_K", 24), 1, 100));
const MAX_RETRIEVAL_K = Math.round(clamp(readEnvNumber("RAG_MAX_RETRIEVAL_K", 40), 5, 200));
const MIN_LOCATION_RETRIEVAL_K = Math.round(clamp(readEnvNumber("RAG_MIN_LOCATION_RETRIEVAL_K", 30), 1, 200));
const MIN_GENERAL_RETRIEVAL_K = Math.round(clamp(readEnvNumber("RAG_MIN_GENERAL_RETRIEVAL_K", 32), 1, 200));
const LOCATION_DISTANCE_THRESHOLD = clamp(readEnvNumber("RAG_LOCATION_DISTANCE_THRESHOLD", 1.8), 0.1, 5);
const GENERAL_DISTANCE_THRESHOLD = clamp(readEnvNumber("RAG_GENERAL_DISTANCE_THRESHOLD", 1.9), 0.1, 5);
const LOCATION_RESULT_LIMIT = Math.round(clamp(readEnvNumber("RAG_LOCATION_RESULT_LIMIT", 8), 1, 30));
const LOCATION_HINT_RETRIEVAL_K = Math.round(clamp(readEnvNumber("RAG_LOCATION_HINT_RETRIEVAL_K", 25), 1, 100));
const HYBRID_MIN_SEMANTIC_SCORE = clamp(readEnvNumber("RAG_HYBRID_MIN_SEMANTIC_SCORE", 0.28), 0, 1);
const HYBRID_MIN_KEYWORD_SCORE = clamp(readEnvNumber("RAG_HYBRID_MIN_KEYWORD_SCORE", 0.12), 0, 1);

const rawSemanticWeight = clamp(readEnvNumber("RAG_HYBRID_SEMANTIC_WEIGHT", 0.7), 0, 1);
const rawKeywordWeight = clamp(readEnvNumber("RAG_HYBRID_KEYWORD_WEIGHT", 0.3), 0, 1);
const weightSum = rawSemanticWeight + rawKeywordWeight;
const HYBRID_SEMANTIC_WEIGHT = weightSum > 0 ? rawSemanticWeight / weightSum : 0.7;
const HYBRID_KEYWORD_WEIGHT = weightSum > 0 ? rawKeywordWeight / weightSum : 0.3;

const STOPWORDS = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have", "how", "i", "in", "is", "it",
    "its", "me", "my", "of", "on", "or", "our", "please", "the", "their", "them", "to", "us", "was", "we", "what",
    "when", "where", "which", "who", "why", "with", "you", "your", "about", "details", "tell", "give", "explain"
]);

// ─── Lazy-loaded singletons ───────────────────────────────────────────────────
let _embedder = null;
let _collection = null;
let _groq = null;

async function getEmbedder() {
    if (!_embedder) {
        console.log("[RAG] Loading embedding model (all-MiniLM-L6-v2)...");
        _embedder = await pipeline("feature-extraction", EMBED_MODEL);
        console.log("[RAG] Embedding model ready.");
    }
    return _embedder;
}

async function getCollection() {
    if (!_collection) {
        const chromaUrl = process.env.CHROMA_URL || "http://localhost:8000";
        console.log(`[RAG] Connecting to ChromaDB at: ${chromaUrl}`);
        const client = new ChromaClient({ path: chromaUrl });
        _collection = await client.getOrCreateCollection({ name: COLLECTION });
        const count = await _collection.count();
        console.log(`[RAG] Collection '${COLLECTION}' has ${count} vectors`);
    }
    return _collection;
}

function getGroq() {
    // Read from process.env every call so dotenv order doesn't matter
    const key = process.env.GROQ_API_KEY || "";
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    if (!_groq && key) {
        _groq = {
            client: new Groq({ apiKey: key }),
            model,
        };
        console.log(`[RAG] Groq model loaded: ${model}`);
    }
    return _groq;
}

// ─── Embed a text string → float array ───────────────────────────────────────
async function embedText(text) {
    const embedder = await getEmbedder();
    const output = await embedder(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
}

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an official, professional assistant for Mano Projects Pvt. Ltd.,
a Construction & Project Management firm based in Mumbai, India, established in 2010.

RULES:
- Answer ONLY using the context provided below.
- Provide highly PRECISE and DETAILED answers. Include exact figures, names, years, and locations whenever available in context.
- Prioritize factual correctness over verbosity; do not add assumptions.
- If multiple relevant points exist, structure the answer clearly with concise bullet points.
- Do NOT repeat the same point in different wording.
- Keep each bullet unique and non-overlapping.
- Avoid restating the same service/process item more than once.
- If asked for process/workflow, return step-by-step sequence from context.
- If asked about a location or address, provide the FULL exact location from the context (e.g., plot numbers, street names, full address).
- If asked about services or features, list them comprehensively with details.
- Always answer in full, professional sentences or well-formatted paragraphs/bullet points.
- Do NOT make up any information not in the context.
- If the answer is not in the context, say exactly:
  "I don't have that specific information. Please contact us directly at our office."
- Never discuss competitors or topics unrelated to MANO Projects.`;

const LOCATION_QUERY_REGEX = /\b(where|location|located|address|head office|office address|contact\s+address)\b/i;

function isLocationQuestion(question) {
    return LOCATION_QUERY_REGEX.test(question || "");
}

function addressSignalScore(doc = "", meta = {}) {
    const text = `${doc}\n${meta?.page || ""}\n${meta?.source_file || ""}`.toLowerCase();
    let score = 0;

    if (text.includes("head office address")) score += 8;
    if (text.includes("contact information")) score += 4;
    if (text.includes("address")) score += 3;
    if (text.includes("dadar")) score += 3;
    if (text.includes("l.n road") || text.includes("ln road")) score += 3;
    if (text.includes("mumbai - 400014") || text.includes("400014")) score += 4;

    return score;
}

function extractExactAddress(documents = []) {
    for (const doc of documents) {
        const normalized = (doc || "").replace(/\r/g, "");

        const blockMatch = normalized.match(/Head Office Address:\s*\n?([^\n]+(?:\n(?!Phone:|Email:).+)*)/i);
        if (blockMatch?.[1]) {
            return blockMatch[1].split("\n").map((line) => line.trim()).filter(Boolean).join(", ");
        }

        const inlineMatch = normalized.match(/Head Office Address:\s*([^\n]+)/i);
        if (inlineMatch?.[1]) {
            return inlineMatch[1].trim();
        }
    }

    return "";
}

function uniqueByTextRanked(items = []) {
    const seen = new Set();
    const out = [];
    for (const item of items) {
        const key = (item?.doc || "").trim();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(item);
    }
    return out;
}

function dedupeAnswerLines(text = "") {
    const lines = text.split("\n");
    const seen = new Set();
    const out = [];

    for (const line of lines) {
        const normalized = line
            .toLowerCase()
            .replace(/^\s*[-*\d.)\s]+/, "")
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        if (!normalized) {
            if (out.length > 0 && out[out.length - 1] !== "") out.push("");
            continue;
        }

        if (normalized.length >= 20 && seen.has(normalized)) {
            continue;
        }

        seen.add(normalized);
        out.push(line);
    }

    return out.join("\n").trim();
}

function tokenize(text = "") {
    return (text || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

function semanticScoreFromDistance(distance) {
    const d = typeof distance === "number" ? distance : 3;
    return 1 / (1 + Math.max(0, d));
}

function keywordOverlapScore(queryTokens, doc = "") {
    const qTokens = Array.from(new Set(queryTokens));
    if (qTokens.length === 0) return 0;

    const docTokens = new Set(tokenize(doc));
    if (docTokens.size === 0) return 0;

    let overlap = 0;
    for (const token of qTokens) {
        if (docTokens.has(token)) overlap += 1;
    }

    return overlap / qTokens.length;
}

function hybridRankCandidates(candidates, question, limit) {
    const queryTokens = tokenize(question);

    const ranked = candidates
        .map((candidate) => {
            const semantic = semanticScoreFromDistance(candidate.dist);
            const lexical = keywordOverlapScore(queryTokens, candidate.doc);
            const hybrid = (semantic * HYBRID_SEMANTIC_WEIGHT) + (lexical * HYBRID_KEYWORD_WEIGHT);
            return { ...candidate, semantic, lexical, hybrid };
        })
        .sort((a, b) => {
            if (b.hybrid !== a.hybrid) return b.hybrid - a.hybrid;
            return a.dist - b.dist;
        })
        .filter(({ semantic, lexical }) => semantic > HYBRID_MIN_SEMANTIC_SCORE || lexical > HYBRID_MIN_KEYWORD_SCORE);

    return uniqueByTextRanked(ranked).slice(0, limit);
}

// ─── Main RAG: embed question → retrieve chunks → Gemini answer ───────────────
export async function answerQuestion(question, topK = DEFAULT_TOP_K) {
    const collection = await getCollection();
    const count = await collection.count();

    if (count === 0) {
        return {
            answer: "The knowledge base is empty. Please run the indexing step first.",
            sources: [],
        };
    }

    // 1. Embed the question
    const queryEmbedding = await embedText(question);

    const locationQuestion = isLocationQuestion(question);
    const retrievalK = locationQuestion
        ? Math.min(Math.max(topK, MIN_LOCATION_RETRIEVAL_K), MAX_RETRIEVAL_K)
        : Math.min(Math.max(topK, MIN_GENERAL_RETRIEVAL_K), MAX_RETRIEVAL_K);

    // 2. Retrieve top-K relevant chunks
    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: retrievalK,
        include: ["documents", "metadatas", "distances"],
    });

    const docs = results.documents[0];
    const metas = results.metadatas[0];
    const distances = results.distances[0];

    // 3. Filter low-relevance results (distance > 1.5 = very dissimilar)
    console.log(`\n[DEBUG] Question: ${question}`);
    docs.forEach((d, i) => {
        console.log(`[DEBUG] Dist: ${distances[i].toFixed(2)} | Source: ${metas[i].source_file} | Preview: ${d.substring(0, 50).replace(/\n/g, " ")}`);
    });

    const candidates = docs
        .map((doc, i) => ({ doc, meta: metas[i], dist: distances[i] }))
        .filter(({ doc }) => Boolean(doc));

    let relevant;
    if (locationQuestion) {
        relevant = candidates
            .map((c) => ({ ...c, signal: addressSignalScore(c.doc, c.meta) }))
            .sort((a, b) => {
                if (b.signal !== a.signal) return b.signal - a.signal;
                return a.dist - b.dist;
            })
            .filter(({ dist, signal }) => signal > 0 || dist < LOCATION_DISTANCE_THRESHOLD)
            .slice(0, LOCATION_RESULT_LIMIT);
    } else {
        relevant = hybridRankCandidates(
            candidates.filter(({ dist }) => dist < GENERAL_DISTANCE_THRESHOLD),
            question,
            topK
        );
    }

    if (relevant.length === 0) {
        return {
            answer: "I don't have that specific information. Please contact us directly at our office.",
            sources: [],
        };
    }

    const context = relevant.map(({ doc }) => doc).join("\n\n---\n\n");
    const sources = [...new Set(relevant.map(({ meta }) => meta.page))];

    if (locationQuestion) {
        const exactAddress = extractExactAddress(relevant.map(({ doc }) => doc));
        if (exactAddress) {
            return {
                answer: `MANO Projects Pvt. Ltd. Head Office Address: ${exactAddress}`,
                sources,
            };
        }

        const locationHint = `${question} head office address contact information dadar l.n road mumbai 400014`;
        const hintedEmbedding = await embedText(locationHint);
        const hintedResults = await collection.query({
            queryEmbeddings: [hintedEmbedding],
            nResults: LOCATION_HINT_RETRIEVAL_K,
            include: ["documents", "metadatas", "distances"],
        });

        const hintedDocs = hintedResults.documents?.[0] || [];
        const hintedMetas = hintedResults.metadatas?.[0] || [];
        const hintedAddress = extractExactAddress(hintedDocs);
        if (hintedAddress) {
            const hintedSources = [...new Set(hintedMetas.map((meta) => meta?.page).filter(Boolean))];
            return {
                answer: `MANO Projects Pvt. Ltd. Head Office Address: ${hintedAddress}`,
                sources: hintedSources.length ? hintedSources : sources,
            };
        }
    }

    // 4. Call Groq
    const groq = getGroq();
    if (!groq) {
        return {
            answer: "[LLM not configured — set GROQ_API_KEY in .env]",
            sources,
        };
    }

    const fullPrompt = `CONTEXT:\n${context}\n\nQUESTION: ${question}`;
    const result = await groq.client.chat.completions.create({
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: fullPrompt }
        ],
        model: groq.model,
        temperature: 0.2, // low temp for factual RAG answers
    });
    const rawAnswer = result.choices[0]?.message?.content || "No response generated.";
    const answer = dedupeAnswerLines(rawAnswer);

    return { answer: answer.trim(), sources };
}

// ─── Health: return vector count ──────────────────────────────────────────────
export async function getVectorCount() {
    try {
        const collection = await getCollection();
        return await collection.count();
    } catch {
        return 0;
    }
}
