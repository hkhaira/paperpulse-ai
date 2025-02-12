import re


def split_into_sections(text: str) -> list:
    """
    Split the text into sections based on the presence of section headers.
    This can be enhanced using more sophisticated NLP techniques or regex patterns.
    """
    # Define a regex pattern to match section headers (e.g., "1. Introduction", "2. Methodology", etc.)
    # Comparing the two patterns:
    #
    # 1. Section header pattern (r'(?<!\d)(\d+(\.\d+)*\s+[A-Za-z].*?)(?=\n\d+(\.\d+)*\s+[A-Za-z]|$)')
    #    - Specifically targets section numbers and titles like "1. Introduction" or "1.1 Subsection".
    #    - Useful when your documents have a structured numeric format for sections.
    #
    # 2. Blank line pattern (r'\n\s*\n')
    #    - Splits the text on blank lines.
    #    - More general, capturing separation by empty lines (often used for paragraphs rather than formal sections).
    #
    # Which one is better depends on your document:
    #    - If your document uses explicit numbered headers, the first pattern is more precise.
    #    - If sections are just demarcated by spacing, the second is simpler and more robust.
    section_pattern = r'\n\s*\n'

    # Find all matches of the pattern in the text
    sections = re.split(section_pattern, text)

    # Filter out very short sections
    return [sec.strip() for sec in sections if len(sec.strip()) > 11]


if __name__ == "__main__":
    sample_text = "Section 1\n\nThis is the first section.\n\nSection 2\n\nThis is the longer second section."
    print(split_into_sections(sample_text))
