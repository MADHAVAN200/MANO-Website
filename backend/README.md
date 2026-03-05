# MANO RAG Backend (Node.js)

Express server that powers the MANO Projects chatbot using ChromaDB + Groq.

## Folder Structure

```
backend/
├── server.js            ← Express API entry point
├── rag.js               ← RAG retrieval + LLM answer logic
├── package.json         ← Node dependencies/scripts
├── .env.example         ← Environment variable template
├── index_knowledge.py   ← Optional Python indexing utility
└── chroma_data/         ← Local vector data (if using local indexing)
```

## Quick Start (Local)

### 1) Install dependencies
```bash
cd backend
npm install
```

### 2) Create .env
```bash
cp .env.example .env
# Edit .env and add GROQ_API_KEY
```

### 3) Start Node backend
```bash
npm run dev
```

Server runs at: **http://localhost:8001**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /health  | Server status + vector count |
| POST   | /chat    | Ask a question, get an answer |

### Test /chat
```bash
curl -X POST http://localhost:8001/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What services does MANO offer?"}'
```

## Optional: Re-index content (Python helper)

If website content changes, you can re-generate and re-index knowledge files:

```bash
# From project root
python scripts/scrape_website.py
python backend/chunk_data.py
python backend/index_knowledge.py
```

After indexing, restart Node backend:

```bash
cd backend
npm run dev
```

## Deployment (pm2)

```bash
cd /home/ubuntu/MANO_Website/backend
npm install
cp .env.example .env  # then edit values
pm2 start server.js --name rag-service
pm2 save
```
