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
        response = openai.chat.completions.create(
            model=model,
            messages=[{
                "role": "system",
                "content": "You are an expert research assistant."
            }, {
                "role": "user",
                "content": prompt
            }],
            temperature=temperature,
            # max_tokens=111,
        )
        # Extract the content from the first message
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise RuntimeError(f"OpenAI API error: {e}")


if __name__ == "__main__":
    sample_prompt = "Summarize the following research paper: \n\nTitle: A Study on the Effects of AI in Healthcare\n\nAbstract: This paper discusses the impact of artificial intelligence on healthcare, focusing on its applications, benefits, and challenges."
    result = generate_completion(sample_prompt)
    print(result)
