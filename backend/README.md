# MANO RAG Backend

FastAPI server that powers the MANO Projects chatbot using ChromaDB (local vector DB) and OpenAI GPT-4o mini.

## Folder Structure

```
MANO_Website/
├── backend/                  ← YOU ARE HERE
│   ├── main.py               ← FastAPI server (entry point)
│   ├── rag_pipeline.py       ← ChromaDB + embeddings + LLM logic
│   ├── requirements.txt      ← Python dependencies
│   ├── .env.example          ← Environment variable template
│   └── chroma_data/          ← Auto-created by ChromaDB on first index
├── frontend/                 ← Existing React website (MANO_Website/src etc.)
├── scripts/
│   ├── scrape_website.py     ← Scrapes rendered pages → text file
│   └── index_knowledge.py    ← Embeds text → stores in ChromaDB
└── knowledge_base/
    └── website_content.txt   ← Output of scraper (RAG source of truth)
```

## Quick Start (Local)

### 1. Setup environment
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Create .env
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

### 3. Scrape website content
```bash
# Make sure frontend dev server is running: npm run dev
cd ..
python scripts/scrape_website.py
# Creates: knowledge_base/website_content.txt
```

### 4. Index into ChromaDB
```bash
python scripts/index_knowledge.py
# Creates: backend/chroma_data/ folder with vector data
```

### 5. Start the server
```bash
cd backend
uvicorn main:app --reload --port 8001
```

Server runs at: **http://localhost:8001**

## API Endpoints

| Method | Endpoint  | Description |
|--------|-----------|-------------|
| GET    | /health   | Server status + vector count |
| POST   | /chat     | Ask a question, get an answer |
| POST   | /index    | Re-trigger indexing (after content updates) |

### Test /chat
```bash
curl -X POST http://localhost:8001/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Who founded MANO Projects?"}'
```

### Interactive API Docs
Visit: http://localhost:8001/docs

## EC2 Deployment

```bash
# 1. SSH into EC2
ssh ubuntu@YOUR_EC2_IP

# 2. Install Python venv
sudo apt update && sudo apt install python3-venv -y

# 3. Pull latest code (or scp files)
cd /home/ubuntu/MANO_Website
git pull

# 4. Setup venv
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 5. Create .env with production values
# CHROMA_PATH=/home/ubuntu/mano_chroma
# OPENAI_API_KEY=sk-...
# ALLOWED_ORIGINS=https://yourdomain.com

# 6. Index knowledge base
cd ..
python scripts/index_knowledge.py

# 7. Start with pm2
pm2 start "venv/bin/uvicorn main:app --host 0.0.0.0 --port 8001" \
  --name rag-service \
  --cwd /home/ubuntu/MANO_Website/backend
pm2 save
```

## Re-indexing After Content Updates

```bash
# 1. Re-scrape
python scripts/scrape_website.py

# 2. Re-index (triggers /index endpoint or run script directly)
python scripts/index_knowledge.py

# 3. Restart server
pm2 restart rag-service
```
