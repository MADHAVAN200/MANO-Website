import urllib.request
import urllib.error
import json

questions = [
    "What services does MANO offer?",
    "When was MANO Projects established?",
    "Where is MANO Projects located?",
]

for q in questions:
    data = json.dumps({'question': q}).encode()
    req  = urllib.request.Request(
        'http://localhost:8001/chat',
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    try:
        resp = json.loads(urllib.request.urlopen(req).read().decode())
        print(f"Q: {q}")
        print(f"A: {resp['answer']}")
        print(f"Sources: {resp['sources']}")
        print("-" * 60)
    except urllib.error.HTTPError as e:
        print(f"Q: {q}")
        print(f"ERROR: {json.loads(e.read().decode())}")
        print("-" * 60)
