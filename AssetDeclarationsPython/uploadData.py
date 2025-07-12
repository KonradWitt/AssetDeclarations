import os
import json
import requests
import urllib3

urllib3.disable_warnings()

def remove_null_values(data):
    """Recursively remove key-value pairs where the value is explicitly None (null in JSON)."""
    if isinstance(data, dict):
        # Iterate over the dictionary and remove keys with None values
        return {key: remove_null_values(value) for key, value in data.items() if value is not None}
    elif isinstance(data, list):
        # If it's a list, recursively remove None elements from the list
        return [remove_null_values(item) for item in data if item is not None]
    else:
        # Return other types as is
        return data


def upload_json_data(directory, url):
    headers = {
        "Content-Type": "application/json"
    }

    # Walk through the directory and subdirectories
    for root, _, files in os.walk(directory):
        for file in files:
            # Check if the file is a JSON file
            if file.endswith('.json'):
                file_path = os.path.join(root, file)

                # Open and read the JSON file
                with open(file_path, 'r', encoding='utf-8') as json_file:
                    try:
                        data = json.load(json_file)
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON from file {file_path}: {e}")
                        continue
                
                # Remove any null values from the JSON data
                cleaned_data = remove_null_values(data)

                # Make the POST request to the API
                post_response = requests.post(url, json=cleaned_data, headers=headers, verify=False)

                # Check the response status
                if post_response.status_code == 201:
                    print(f"Successfully uploaded {file_path}")
                else:
                    print(f"Failed to upload {file_path} - Status Code: {post_response.status_code}")
                    print(f"Response Body: {post_response.text}")


# Directory path where JSON files are located
directory_path = r'C:\Users\wittk\source\repos\AssetDeclarations\Data'

# API URL to upload data
url = 'https://localhost:7212/Person/Create'

# Call the function
upload_json_data(directory_path, url)
