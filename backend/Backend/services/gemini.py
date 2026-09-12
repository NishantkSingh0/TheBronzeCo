from django.conf import settings

from google import genai
from google.genai import types

from .prompts import SYSTEM_PROMPT, build_user_prompt


class GeminiService:
    """Small provider adapter that can be replaced by another LLM later."""

    def __init__(self):
        if not settings.GEMINI_API_KEY:
            raise RuntimeError('GEMINI_API_KEY is not configured')

        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model = settings.GEMINI_MODEL
        self.system_instruction = SYSTEM_PROMPT

    def stream(self, message, context=''):
        response = self.client.models.generate_content_stream(
            model=self.model,
            contents=build_user_prompt(message, context),
            config=types.GenerateContentConfig(
                system_instruction=self.system_instruction,
                tools=[types.Tool(google_search=types.GoogleSearch())],
            ),
        )

        for chunk in response:
            if hasattr(chunk, 'text') and chunk.text:
                yield chunk.text