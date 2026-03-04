#!/usr/bin/env python3
# scripts/index_knowledge.py
# Run this once after scraping to populate ChromaDB
# Usage: python scripts/index_knowledge.py
# Or with custom path: python scripts/index_knowledge.py path/to/content.txt

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from rag_pipeline import index_from_text_file

if __name__ == "__main__":
    # Allow passing a custom file path as argument
    filepath = sys.argv[1] if len(sys.argv) > 1 else None
    count = index_from_text_file(filepath)
    print(f"\n✅ Ready! {count} chunks are now searchable in ChromaDB.")
    print("   Start the server: cd backend && uvicorn main:app --reload --port 8001")
