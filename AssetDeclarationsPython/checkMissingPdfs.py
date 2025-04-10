import os

def find_folders_without_pdfs(root_folder):
    folders_without_pdfs = []

    for dirpath, dirnames, filenames in os.walk(root_folder):
        # Check if any PDF files exist in the current folder
        has_pdf = any(filename.lower().endswith('.pdf') for filename in filenames)
        if not has_pdf:
            folders_without_pdfs.append(dirpath)

    return folders_without_pdfs

# Example usage:
root_dir = r'C:\Users\wittk\source\repos\AssetDeclarations\AssetDeclarationsPython\downloads'
no_pdf_folders = find_folders_without_pdfs(root_dir)

print("Subfolders without PDF files:")
for folder in no_pdf_folders:
    print(folder)
