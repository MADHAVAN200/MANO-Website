# rag_pipeline.py — Core RAG logic: ChromaDB + Embeddings + LLM
import os
import chromadb
from sentence_transformers import SentenceTransformer
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# ─── Config ──────────────────────────────────────────────────────────────────
CHROMA_PATH  = os.getenv("CHROMA_PATH", "./chroma_data")
CHUNKS_PATH  = os.getenv("CHUNKS_PATH", "../knowledge_base/website_content.txt")
OPENAI_KEY   = os.getenv("OPENAI_API_KEY", "")

# ─── Model Init ──────────────────────────────────────────────────────────────
# Free local embedding model — no API cost for embeddings
print("[RAG] Loading embedding model (all-MiniLM-L6-v2)...")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# LLM client
llm = OpenAI(api_key=OPENAI_KEY) if OPENAI_KEY else None

# ─── ChromaDB Init ───────────────────────────────────────────────────────────
print(f"[RAG] Connecting to ChromaDB at: {CHROMA_PATH}")
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_or_create_collection(
    name="mano_kb",
    metadata={"description": "MANO Projects Pvt. Ltd. website knowledge base"}
)

print(f"[RAG] Collection 'mano_kb' has {collection.count()} vectors")


# ─── Indexing ────────────────────────────────────────────────────────────────
def index_from_text_file(filepath: str = CHUNKS_PATH):
    """
    Read the scraped website_content.txt, chunk it, embed it, store in ChromaDB.
    Call this once after running the scraper script.
    """
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Content file not found: {filepath}")

    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()

    # Split by page separator inserted by the scraper
    pages = raw.split("=" * 60)
    chunks = []
    chunk_id = 0

    for block in pages:
        block = block.strip()
        if not block or len(block) < 50:
            continue

        # Extract page label from first line
        lines = block.splitlines()
        label = lines[0].replace("PAGE:", "").strip() if lines else "General"
        body  = " ".join(lines[2:])  # skip PAGE: and URL: lines

        # Sliding window chunking — 300 words, 50-word overlap
        words = body.split()
        step  = 250
        size  = 300
        for i in range(0, max(1, len(words)), step):
            text = " ".join(words[i: i + size]).strip()
            if len(text) < 80:
                continue
            chunks.append({
                "id":       f"chunk_{chunk_id:04d}",
                "text":     text,
                "metadata": {"page": label, "start_word": i}
            })
            chunk_id += 1

    if not chunks:
        print("[RAG] ⚠️  No chunks found — check your content file.")
        return 0

    print(f"[RAG] Embedding {len(chunks)} chunks (this may take ~30s)...")
    texts      = [c["text"]     for c in chunks]
    ids        = [c["id"]       for c in chunks]
    metadatas  = [c["metadata"] for c in chunks]
    embeddings = embedder.encode(texts, show_progress_bar=True).tolist()

    # Upsert into ChromaDB (safe to re-run — overwrites same IDs)
    collection.upsert(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)
    print(f"[RAG] ✅ Indexed {len(chunks)} chunks into ChromaDB")
    return len(chunks)


# ─── Query ───────────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are an official assistant for Mano Projects Pvt. Ltd., 
a Construction & Project Management firm based in Mumbai, India, established in 2010.

RULES:
- Answer ONLY using the context provided below.
- Do NOT make up any information not in the context.
- If the answer is not in the context, say exactly: 
  "I don't have that specific information. Please contact us directly at our office."
- Keep answers concise, professional, and helpful.
- Never discuss competitors or topics unrelated to MANO Projects."""


def answer_question(question: str, top_k: int = 5) -> dict:
    """
    Full RAG pipeline: embed question → retrieve chunks → LLM answer.
    Returns dict with answer text and source page references.
    """
    if collection.count() == 0:
        return {
            "answer": "The knowledge base is empty. Please run the indexing step first.",
            "sources": []
        }

    # 1. Embed the question
    q_embedding = embedder.encode([question]).tolist()[0]

    # 2. Retrieve top-K relevant chunks
    results = collection.query(
        query_embeddings=[q_embedding],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )

    docs      = results["documents"][0]
    metas     = results["metadatas"][0]
    distances = results["distances"][0]

    # Filter low-relevance results (distance > 1.5 means very dissimilar)
    relevant = [(d, m) for d, m, dist in zip(docs, metas, distances) if dist < 1.5]
    if not relevant:
        return {
            "answer": "I don't have that specific information. Please contact us directly at our office.",
            "sources": []
        }

    context = "\n\n---\n\n".join([d for d, _ in relevant])
    sources = list({m["page"] for _, m in relevant})

    # 3. Call LLM
    if not llm:
        return {"answer": "[LLM not configured — set OPENAI_API_KEY in .env]", "sources": sources}

    response = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": f"CONTEXT:\n{context}\n\nQUESTION: {question}"}
        ],
        temperature=0.2,
        max_tokens=500
    )

    return {
        "answer":  response.choices[0].message.content.strip(),
        "sources": sources
    }
