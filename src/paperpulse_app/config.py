from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
# Other configuration constants (e.g., vector database URL, retrieval parameters) can be added here.
