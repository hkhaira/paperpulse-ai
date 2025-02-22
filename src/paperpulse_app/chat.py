from paperpulse_app.llm_interface import generate_completion
from paperpulse_app.prompt_templates import chat_prompt
from rich.console import Console
from rich.markdown import Markdown


def chat_session(initial_response: str):
    """
    A simple interactive loop that uses the LLM to answer follow-up questions.
    """
    console = Console()
    console.print("\n=== [bold yellow]Initial Response:[/bold yellow] ")
    console.print(Markdown(initial_response))
    console.print("\n[bold red]Enter 'exit' to quit the chat.[/bold red]")
    while True:
        user_input = console.input(
            "\n=== [bold green]Your question:[bold green] ").strip()
        if user_input.lower() == "exit":
            break
        prompt = chat_prompt(initial_response, user_input)
        answer = generate_completion(prompt)
        console.print("\n=== [bold blue]AI Response:[/bold blue] ")
        console.print(Markdown(answer))
        # Optionally update the initial_response if you want a conversational history
        initial_response += f"\nUser: {user_input}\nAI: {answer}\n"


if __name__ == "__main__":
    # For testing, start a chat session with a dummy initial response
    dummy_response = "This research paper introduces a novel attention mechanism for neural networks."
    chat_session(dummy_response)
