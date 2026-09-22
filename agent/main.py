"""
Run from this directory:
    python -m venv .venv
    source .venv/bin/activate       # Windows: .venv\\Scripts\\activate
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

import os
from typing import Any
from dotenv import load_dotenv

from fastapi import FastAPI
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()

app = FastAPI(title="SkylineDB3 Project Assistant", version="1.0.0")

GEMINI_MODEL = "gemini-3.8-flash"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(default_factory=list)
    context: dict[str, Any] = Field(default_factory=dict)


def compose_reply(payload: ChatRequest) -> str:

    contents = []

    for messages in payload.messages:
        role = messages.role
        content = messages.content

        if role == "user":
            gemini_role = "user"
        elif role == "assistant":
            gemini_role = "model"
        else:
            continue

        contents.append(
            types.Content(role=gemini_role, parts=[types.Part(text=content)])
        )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=(
                "You are SkylineDB3's project assistant. "
                "Be concise, helpful, and professional."
            )
        ),
    )
    return response.text or "I couldn't generate a response"


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/chat")
def chat(payload: ChatRequest) -> dict[str, str]:
    return {"reply": compose_reply(payload)}
