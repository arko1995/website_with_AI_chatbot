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

from pydantic import BaseModel, Field
from llm import generate_reply

app = FastAPI(title="SkylineDB3 Project Assistant", version="1.0.0")


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(default_factory=list)
    context: dict[str, Any] = Field(default_factory=dict)


def compose_reply(payload: ChatRequest) -> str:

    return generate_reply(payload.messages)


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/chat")
def chat(payload: ChatRequest) -> dict[str, str]:
    return {"reply": compose_reply(payload)}
