import requests
import api_keys
from gemini_wrapper import GeminiWrapper
import prompt
import json

gemini = GeminiWrapper(api_keys.GEMINI)

csv = r'C:\Users\wittk\source\repos\AssetDeclarations\Data\Andrzej Adamczyk\output.csv'
pdf = r'C:\Users\wittk\source\repos\AssetDeclarations\Data\Andrzej Adamczyk\OSW101_001.pdf'

response = gemini.prompt_with_files(prompt.task, pdf, csv, 0)
print(response)
data = response.strip().removeprefix("```json").removesuffix("```").strip()

url = 'https://localhost:7212/api/Person/Create'

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=data, headers=headers, verify=False)

print("Status Code:", response.status_code)
print("Response Body:", response.text)