import os
import requests
import api_keys
from gemini_wrapper import GeminiWrapper
import prompt
import json

gemini = GeminiWrapper(api_keys.GEMINI)


folder_path = r'C:\Users\wittk\source\repos\AssetDeclarations\Data\Mateusz Morawiecki'

pdf = None
csv = None

# Loop through the files in the folder
for file_name in os.listdir(folder_path):
    full_path = os.path.join(folder_path, file_name)
    
    if os.path.isfile(full_path):
        if file_name.lower().endswith('.pdf') and pdf is None:
            pdf = full_path
        elif file_name.lower().endswith('.csv') and csv is None:
            csv = full_path

    # Break the loop if both files are found
    if pdf and csv:
        break

# Print the results
print("PDF file path:", pdf)
print("CSV file path:", csv)

response = gemini.prompt_with_files(prompt.task, pdf, csv, 0)
#print(response)
data = response.strip().removeprefix("```json").removesuffix("```").strip()

url = 'https://localhost:7212/api/Person/Create'

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=data, headers=headers, verify=False)

print("Status Code:", response.status_code)
if response.status_code != 201:
    print("Response Body:", response.text)