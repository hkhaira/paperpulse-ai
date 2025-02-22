# PaperPulse AI

PaperPulse AI is a modular application that processes technical research papers to produce four key outputs:
1. A concise summary with practical insights.
2. Detailed explanations for each research idea.
3. Step-by-step instructions to reproduce the research locally.
4. An interactive chat session for follow-up questions and clarifications.

## Project Overview

The application uses advanced language model techniques (including prompt engineering, chain-of-thought, and retrieval-augmented generation) to provide meaningful insights from research papers. It leverages the OpenAI API to translate complex academic content into digestible information.

## Directory Structure

```
PaperPulse-AI/
├── README.md
├── requirements.txt
├── pyproject.toml        # For PEP 517/518 packaging
├── setup.cfg             # Packaging metadata (optional)
├── setup.py              # Minimal package setup (optional)
├── .gitignore
├── docs/                 # Documentation and blog post notes
├── tests/                # Unit tests using pytest
└── src/
    └── llm_app/          # Main application package
        ├── __init__.py
        ├── config.py
        ├── file_upload.py
        ├── processing.py
        ├── llm_interface.py
        ├── retrieval.py
        ├── chat.py
        ├── prompt_templates.py
        └── utils.py
```

## Setup Instructions

### Environment Setup
- Ensure you are on macOS.
- Install Homebrew if not installed:
  ```
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- Install Python 3:
  ```
  brew install python3
  python3 --version
  ```
- Install VS Code and use iTerm or the built-in Terminal for CLI work.

### Virtual Environment and Dependencies
1. Create and activate a virtual environment:
   ```
   cd /path/to/PaperPulse-AI
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies from requirements.txt:
   ```
   pip install -r requirements.txt
   ```
   Dependencies include:
   - openai
   - pdfminer.six
   - requests
   - numpy
   - scikit-learn
   - pytest

## Running the Application

1. Activate your virtual environment.
2. Run the main script:
   ```
   python -m src.paperpulse_app.main                                                                                                                 
   ```
3. Follow the on-screen prompts to upload a PDF research paper and generate outputs.

## Testing

Run unit tests using pytest:
```
pytest tests/
```
The tests validate PDF parsing, section splitting, and LLM interface functionality.

## Advanced Techniques & Future Extensions

- **Prompt Engineering:** Custom-built prompts in `prompt_templates.py` tailor outputs for summaries, detailed explanations, and reproduction instructions.
- **Retrieval-Augmented Generation (RAG):** Use embeddings and cosine similarity in `retrieval.py` to identify the most relevant text sections.
- **Interactive Chat:** The chat module facilitates iterative interactions for clarifications.
- **Future Extensions:**
  - Develop a Flask-based web UI.
  - Integrate a vector database (e.g., Pinecone, Weaviate) for scalable text retrieval.
  - Enhance error handling, logging, and testing.

## Contributing

Contributions are welcome through pull requests or by opening issues.

## License

Distributed under the MIT License. See the `LICENSE` file for details.