import os
from pdfminer.high_level import extract_text


def parse_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """
    # Validate file path
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found at: {file_path}")

    if not file_path.lower().endswith('.pdf'):
        raise ValueError("File must be a PDF")

    try:
        text = extract_text(file_path)
        if not text:
            raise ValueError("No text could be extracted from the PDF")
        return text
    except Exception as e:
        raise RuntimeError(f"Failed to extract text from PDF file: {e}")


if __name__ == '__main__':
    # For testing purposes
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(
        os.path.dirname(os.path.dirname(current_dir)))
    test_file = os.path.join(project_root, 'data', 'Distyl_txt2sql.pdf')

    if os.path.exists(test_file):
        text = parse_pdf(test_file)
        print(text[:500])
    else:
        print(f"Test file not found at: {test_file}")
