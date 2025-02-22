def summary_prompt(text: str) -> str:
    """
    Returns a prompt for generating a concise summary.
    """
    return f"Provide a concise summary in easy-to-digest language with practical impact of the following research text:\n\n###\n{text}"


def detailed_explanation_prompt(text: str) -> str:
    """
    Returns a prompt for generating detailed explanations for each idea.
    """
    return (
        f"Break down the following research paper text into key research ideas. For each idea, "
        f"explain the motivation, novelty, proofs, and validations in detail, in the same order as in the text:\n\n###\n{text}"
    )


def reproduction_instructions_prompt(text: str) -> str:
    """
    Returns a prompt for generating step-by-step instructions to reproduce the research.
    """
    return (
        f"Based on the following research paper text, generate detailed step-by-step instructions "
        f"to reproduce the research locally. Provide all necessary commands, configurations and full code in an ipynb file that i can run on google colab. "
        f"Assume reader wants to use open source resources from huggingface. Validate each key research idea in this python code. "
        f"Keep the explanations breif and on point. Output all neccessary python code, clearly state assumptions and output complete code files:\n\n###\n{text}"
    )


def chat_prompt(initial_response: str, user_message: str) -> str:
    """
    Returns a prompt for follow-up chat interactions.
    """
    return (
        f"Here is the initial response regarding the research paper:\n{initial_response}\n\n"
        f"A user now asks: {user_message}\nPlease provide further clarifications and help."
    )
