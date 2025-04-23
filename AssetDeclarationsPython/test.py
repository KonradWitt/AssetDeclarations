import os
import requests
import api_keys
from gemini_wrapper import GeminiWrapper
import prompt
import json

gemini = GeminiWrapper(api_keys.GEMINI)

main_directory = r'C:\Users\wittk\source\repos\AssetDeclarations\Data'


def list_subdirs(path):
    return [os.path.join(path, name) for name in os.listdir(path)
            if os.path.isdir(os.path.join(path, name))]


for person_directory in list_subdirs(main_directory) [-10:]:
    print(person_directory)
    pdf = None
    csv = None

    for file_name in os.listdir(person_directory):
        full_path = os.path.join(person_directory, file_name)

        if os.path.isfile(full_path):
            if file_name.lower().endswith('.pdf') and pdf is None:
                pdf = full_path
            elif file_name.lower().endswith('.csv') and csv is None:
                csv = full_path

        if pdf and csv:
            break

    if not pdf or not csv:
        break

    response = gemini.prompt_with_files(prompt.task, pdf, csv, 0)
    if (response.startswith('err')):
        print(response)
    data = response.strip().removeprefix("```json").removesuffix("```").strip()

    url = 'https://localhost:7212/api/Person/Create'

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, data=data, headers=headers, verify=False)

    if response.status_code == 201:
        print("OK")
    else:
        print("Status Code:", response.status_code)
        print("Response Body:", response.text)
