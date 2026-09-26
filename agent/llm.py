import os
from typing import Protocol, Sequence

from google import genai
from google.genai import types
from dotenv import load_dotenv

GEMINI_MODEL = "gemini-3.8-flash"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)


class Message(Protocol):
    role: str
    content: str


def generate_reply(messages: Sequence[message]) -> str:
    contents = []

    for message in messages:
        if message.role == "user":
            gemini_role = "user"
        elif message.role == "assistant":
            gemini_role = "assistant"

        else:
            continue

    contents.append(
        types.Content(role=gemini_role, parts=[types.Part(text=message.content)])
    )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction="You are SkylineDB3's project assistant. "
            "Be concise, helpful, and professional."
        ),
    )

    return response.text or "I couldn't generate a response"
