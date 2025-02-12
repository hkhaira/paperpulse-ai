from paperpulse_app.llm_interface import generate_completion
from paperpulse_app.prompt_templates import chat_prompt


def chat_session(initial_response: str):
    """
    A simple interactive loop that uses the LLM to answer follow-up questions.
    """
    print("Initial Response:")
    print(initial_response)
    print("\nEnter 'exit' to quit the chat.")
    while True:
        user_input = input("Your question: ").strip()
        if user_input.lower() == "exit":
            break
        prompt = chat_prompt(initial_response, user_input)
        answer = generate_completion(prompt)
        print("AI Response:")
        print(answer)
        # Optionally update the initial_response if you want a conversational history
        initial_response += f"\nUser: {user_input}\nAI: {answer}\n"


if __name__ == "__main__":
    # For testing, start a chat session with a dummy initial response
    dummy_response = "This research paper introduces a novel attention mechanism for neural networks."
    chat_session(dummy_response)
