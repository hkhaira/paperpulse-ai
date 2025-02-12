import openai
from paperpulse_app.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY


def generate_completion(prompt: str,
                        model: str = "gpt-4o-mini",
                        temperature: float = 0.7) -> str:
    """
    Generate a completion from the OpenAI API based on given prompt.
    """
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{
                "role": "system",
                "content": "You are an expert research assistant."
            }, {
                "role": "user",
                "content": prompt
            }],
            temperature=temperature,
            max_tokens=111,
        )
        # Extract the content from the first message
        return response.choices[0].message['content'].strip()
    except Exception as e:
        raise RuntimeError(f"OpenAI API error: {e}")
