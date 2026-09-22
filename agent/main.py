"""
Run from this directory:
    python -m venv .venv
    source .venv/bin/activate       # Windows: .venv\\Scripts\\activate
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000
"""

import os
from typing import Any

from fastapi import FastAPI
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

app = FastAPI(title="SkylineDB3 Project Assistant", version="1.0.0")

GEMINI_MODEL = "gemini-3.8-flash"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)


class ChatRequest(BaseModel):
    messages: list[dict[str, Any]] = Field(default_factory=list)
    context: dict[str, Any] = Field(default_factory=dict)


def compose_reply(payload: ChatRequest) -> str:

    last_message = payload.messages[-1].get("content", "") if payload.messages else ""

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=last_message,
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
