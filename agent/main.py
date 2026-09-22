"""SkylineDB3 Python AI service.

This is intentionally provider-agnostic. Keep the MERN app stable and replace
`compose_reply` with your LangGraph/LangChain/custom RAG or tool-calling agent.

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


class ChatRequest(BaseModel):
    messages: list[dict[str, Any]] = Field(default_factory=list)
    context: dict[str, Any] = Field(default_factory=dict)


def compose_reply(payload: ChatRequest) -> str:
    """Swap this function for your real agent/RAG pipeline."""
    last = payload.messages[-1].get("content", "") if payload.messages else ""
    services = [item.get("title", "") for item in payload.context.get("services", [])]
    service_text = ", ".join(filter(None, services))
    return (
        "I can help qualify this project for the SkylineDB3 team. "
        f"You mentioned: {last!r}. "
        f"Relevant studio capabilities include {service_text}. "
        "What is the project location, approximate scale, current stage, and target timeline?"
    )


@app.get("/health")
def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/chat")
def chat(payload: ChatRequest) -> dict[str, str]:
    return {"reply": compose_reply(payload)}
