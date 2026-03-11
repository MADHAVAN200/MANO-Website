# MANO Website

Official MANO website monorepo with:

- `frontend/`: React + Vite website (PMC and EPC brand flows)
- `backend/`: Node.js RAG chatbot API (ChromaDB + Groq)
- `knowledge_base/` + `scripts/`: content scrape/chunk/index pipeline for chatbot knowledge

## Tech Stack

- Frontend: React 19, React Router, Tailwind CSS v4, Vite
- Backend: Node.js (ESM), Express, CORS, ChromaDB client, Groq SDK, Xenova Transformers
- Knowledge indexing (offline): Python, sentence-transformers, ChromaDB, Playwright

## Repository Structure

```text
MANO_Website/
|- .vite/                    # Vite cache/artifacts (generated)
|- backend/                  # RAG API service
|  |- .env                   # Local backend env config
|  |- chunk_data.ipynb       # Notebook helper for chunking experimentation
|  |- chunk_data.py          # Parse KB pages into chunk JSON
|  |- index_knowledge.py     # Index chunks into Chroma
|  |- rag.js                 # Retrieval + ranking + LLM answering
|  |- requirements.txt       # Python deps for indexing pipeline
|  |- server.js              # Express routes (/health, /chat)
|  |- package.json
|  |- README.md
|- chroma/                   # Local Chroma persistent DB files
|  |- chroma.sqlite3
|- frontend/                 # React app
|  |- src/
|  |  |- components/
|  |  |- context/
|  |  |- data/
|  |  |- pages/
|  |  |  |- Gateway/
|  |  |  |- LandingPage/
|  |  |  |- AboutUs/
|  |  |  |- Services/
|  |  |  |- Projects/
|  |  |  |- Careers/
|  |  |- App.jsx
|  |  |- main.jsx
|  |- public/               # Static image/logo assets
|  |- package.json
|- knowledge_base/
|  |- pages/                # Scraped page text files (14 page-level txt files)
|  |- chunks.json           # Parsed chunks used by indexer
|  |- website_content.txt   # Full-site scraped aggregate text
|
|- scripts/
|  |- scrape_website.py     # Playwright site scraper
|
|- package.json             # Root workspace scripts (start both frontend+backend)
|- package-lock.json
|- test_chat.py             # Simple chatbot endpoint test script
|- README.md
|- node_modules/            # Root dependencies (generated)
```

## Directory Analysis (Current)

- This repository is a monorepo with two runnable apps: `frontend/` (Vite React) and `backend/` (Node RAG API).
- Persistent local vector data is stored under `chroma/chroma.sqlite3`.
- Knowledge assets are split into source page text in `knowledge_base/pages/`, intermediate chunks in `knowledge_base/chunks.json`, and ingestion scripts in `backend/`.
- Generated/dependency directories such as `.vite/` and `node_modules/` are environment-specific and should not be treated as source.
- Top-level folder sizes by file count at time of analysis:
	- `.vite/`: 2 files
	- `backend/`: 11 files
	- `chroma/`: 1 file
	- `frontend/`: 490 files
	- `knowledge_base/`: 16 files
	- `scripts/`: 1 file

## Frontend App Behavior

### Brand routing model

- `/` -> Gateway selector page
- `/pmc/...` -> PMC site pages
- `/epc/...` -> EPC site pages

The app uses a dynamic route wrapper `/:brand` and `CompanyContext` to normalize brand aliases:

- `pmc` or `pcpl` -> PMC mode
- `epc` or `ppl` -> EPC mode

### Main routes under `/:brand`

- `/about-us`
- `/services`
- `/services/project-management`
- `/services/project-execution`
- `/services/project-planning`
- `/services/contract-management`
- `/services/qa-audit`
- `/services/cost-consultancy`
- `/services/qs-billing-audit`
- `/services/ehs-audit`
- `/services/epc`
- `/projects`
- `/careers`

### Responsive implementation

Most top-level pages now follow a desktop/mobile split pattern:

- `SomePageDesktop.jsx`
- `SomePageMobile.jsx`
- `SomePage.jsx` switcher using `matchMedia('(max-width: 767px)')`

## Chatbot Integration

Frontend widget:

- Component: `frontend/src/components/ChatbotWidget.jsx`
- Hidden on gateway route (`/`)
- Calls `POST /chat` on backend via:
	- `VITE_RAG_API_URL` (if set), else
	- `http://localhost:8001/chat`

Backend API:

- `GET /health` -> liveness + indexed vector count
- `POST /chat` -> returns `{ answer, sources }`

## Backend RAG Flow

`backend/rag.js` pipeline:

1. Embed user question (Xenova all-MiniLM-L6-v2)
2. Query Chroma collection `mano_kb`
3. Apply hybrid ranking/filter logic (semantic + keyword)
4. Special handling for location/address queries
5. Build context prompt and call Groq model
6. Return deduplicated final answer with sources

## Environment Variables

### Frontend (`frontend/.env` optional)

```env
VITE_RAG_API_URL=http://localhost:8001/chat
```

### Backend (`backend/.env`)

Required:

```env
GROQ_API_KEY=your_groq_api_key
```

Common optional settings:

```env
PORT=8001
ALLOWED_ORIGINS=http://localhost:5173
CHROMA_URL=http://localhost:8000
GROQ_MODEL=llama-3.3-70b-versatile

# Retrieval tuning (all optional)
RAG_DEFAULT_TOP_K=24
RAG_MAX_RETRIEVAL_K=40
RAG_MIN_LOCATION_RETRIEVAL_K=30
RAG_MIN_GENERAL_RETRIEVAL_K=32
RAG_LOCATION_DISTANCE_THRESHOLD=1.8
RAG_GENERAL_DISTANCE_THRESHOLD=1.9
RAG_LOCATION_RESULT_LIMIT=8
RAG_LOCATION_HINT_RETRIEVAL_K=25
RAG_HYBRID_MIN_SEMANTIC_SCORE=0.28
RAG_HYBRID_MIN_KEYWORD_SCORE=0.12
RAG_HYBRID_SEMANTIC_WEIGHT=0.7
RAG_HYBRID_KEYWORD_WEIGHT=0.3
```

## Local Development

### Run frontend + backend together (recommended)

From the repository root:

```bash
npm install
npm run install:all
npm start
```

This starts:

- Frontend on `http://localhost:5173`
- Backend API on `http://localhost:8001`

The root `npm start` launches both services together without stopping existing processes.

### 1. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Default dev URL:

- `http://localhost:5173/`

### 2. Start backend

```bash
cd backend
npm install
npm run dev
```

Backend URL:

- `http://localhost:8001`

### 3. Verify chatbot API

```bash
python test_chat.py
```

## Knowledge Base Refresh Pipeline

Run when website content changes and chatbot answers need refreshed context.

### Step 1: Scrape pages to text files

```bash
python scripts/scrape_website.py
```

Generates/updates files in `knowledge_base/pages/`.

### Step 2: Convert page text to chunks

```bash
python backend/chunk_data.py
```

Generates `knowledge_base/chunks.json`.

### Step 3: Index chunks into Chroma

```bash
pip install -r backend/requirements.txt
python backend/index_knowledge.py
```

### Step 4: Restart backend service

```bash
cd backend
npm run dev
```

## Build Commands

Frontend production build:

```bash
cd frontend
npm run build
```

Preview frontend build:

```bash
npm run preview
```

## Operational Notes

- Vite may warn if Node is below the recommended patch level for your major version.
- Current CSS includes advanced visual effects and large media assets; chunk-size warnings can appear in production builds.
- `backend/.env` exists locally in this repo tree; do not commit secrets.

## Deployment Notes (High level)

- Deploy `frontend/dist` to static hosting/CDN.
- Deploy backend Node service with environment variables and persistent Chroma storage.
- Ensure CORS `ALLOWED_ORIGINS` includes deployed frontend origin(s).

## Maintainers

MANO internal web/engineering team.
