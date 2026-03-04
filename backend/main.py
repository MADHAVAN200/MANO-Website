# main.py — FastAPI RAG Server for MANO Projects Pvt. Ltd. Chatbot
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# ─── App Setup ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="MANO Projects RAG API",
    description="Retrieval-Augmented Generation chatbot backend for MANO Projects Pvt. Ltd.",
    version="1.0.0"
)

# ─── CORS ────────────────────────────────────────────────────────────────────
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─── Import pipeline (loads models on startup) ───────────────────────────────
from rag_pipeline import answer_question, index_from_text_file, collection


# ─── Request / Response Schemas ──────────────────────────────────────────────
class ChatRequest(BaseModel):
    question: str

    model_config = {
        "json_schema_extra": {
            "example": {"question": "What services does MANO offer?"}
        }
    }

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]

class IndexRequest(BaseModel):
    filepath: str | None = None  # defaults to CHUNKS_PATH in .env


# ─── Routes ──────────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    """Server liveness check — also returns vector count in ChromaDB."""
    return {
        "status": "ok",
        "service": "MANO RAG API",
        "vectors_indexed": collection.count()
    }


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """
    Main chatbot endpoint.
    Embeds the question, retrieves relevant chunks from ChromaDB, 
    and returns an LLM-generated answer grounded in MANO's content.
    """
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    result = answer_question(req.question)
    return ChatResponse(answer=result["answer"], sources=result["sources"])


@app.post("/index")
def index_knowledge(req: IndexRequest = IndexRequest()):
    """
    Trigger re-indexing of the knowledge base from the scraped text file.
    Run this once after scraping, or whenever website content changes.
    """
    try:
        filepath = req.filepath or os.getenv("CHUNKS_PATH", "../knowledge_base/website_content.txt")
        count = index_from_text_file(filepath)
        return {"status": "success", "chunks_indexed": count}
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─── Entry Point ─────────────────────────────────────────────────────────────
# Run locally:  uvicorn main:app --reload --port 8001
# Run on EC2:   uvicorn main:app --host 0.0.0.0 --port 8001
