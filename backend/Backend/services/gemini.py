from django.conf import settings

from .prompts import SYSTEM_PROMPT, build_user_prompt


class GeminiService:
    """Small provider adapter that can be replaced by another LLM later."""

    def __init__(self):
        import google.generativeai as genai

        if not settings.GEMINI_API_KEY:
            raise RuntimeError('GEMINI_API_KEY is not configured')

        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            settings.GEMINI_MODEL,
            system_instruction=SYSTEM_PROMPT,
        )
        self.tools = [genai.types.Tool(google_search_retrieval={})]

    def stream(self, message, context=''):
        response = self.model.generate_content(
            build_user_prompt(message, context),
            stream=True,
            tools=self.tools,
        )

        for chunk in response:
            if chunk.text:
                yield chunk.text