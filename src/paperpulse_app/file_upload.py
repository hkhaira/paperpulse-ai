from pdfminer.high_level import extract_text


def parse_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """
    try:
        text = extract_text(file_path)
        return text
    except Exception as e:
        raise RuntimeError(f"Failed to extract text from PDF file: {e}")


if __name__ == '__main__':
    # For testing purposes
    file_path = 'data/Distyl_txt2sql.pdf'
    text = parse_pdf(file_path)
    print(text[:500])  # Print the first 500 characters of the extracted text
