import pathlib
from google import genai
from google.genai import types
import io
import httpx


class GeminiWrapper:

    def __init__(self, api_key: str):
        self.__client = genai.Client(api_key=api_key)
        self.__model = 'gemini-2.5-pro-exp-03-25'

    def prompt(self, prompt: str) -> str:
        response = self.__client.models.generate_content(
            model=self.__model,
            contents=[prompt])
        return response.text

    def prompt_with_pdf(self, prompt: str, pdfPath: str, temperature: float) -> str:
        filepath = pathlib.Path(pdfPath)
        config = types.GenerateContentConfig(
            temperature=temperature,
            response_mime_type="text/plain",
        )
        response = self.__client.models.generate_content(
            model=self.__model,
            contents=[types.Part.from_bytes(
                data=filepath.read_bytes(), mime_type='application/pdf'), prompt],
            config=config)
        return response.text
