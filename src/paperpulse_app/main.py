import os
from paperpulse_app.file_upload import parse_pdf
from paperpulse_app.processing import split_into_sections
from paperpulse_app.llm_interface import generate_completion
from paperpulse_app.prompt_templates import summary_prompt, detailed_explanation_prompt, reproduction_instructions_prompt
from paperpulse_app.chat import chat_session
from paperpulse_app.utils import setup_logging
from rich.console import Console
from rich.markdown import Markdown


def main():
    setup_logging()
    console = Console()

    # List all pdf files in the data directory
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    pdf_files = [f for f in os.listdir(data_dir) if f.lower().endswith(".pdf")]
    if pdf_files:
        console.print(
            "[bold green]PDF files available in data directory:[/bold green]")
        for f in pdf_files:
            console.print(f" - src/paperpulse_app/data/{f}")
    else:
        console.print(
            "[bold red]No PDF files found in the provided directory.[/bold red]"
        )

    # 1. Let the user provide a file path with validation
    while True:
        file_path = console.input(
            "Enter the [bold yellow]path[/bold yellow] to the research paper PDF: "
        ).strip()

        # Convert to absolute path if relative
        if not os.path.isabs(file_path):
            file_path = os.path.abspath(file_path)

        try:
            text = parse_pdf(file_path)
            break
        except (FileNotFoundError, ValueError, RuntimeError) as e:
            print(f"Error: {e}")
            print("Please try again with a valid PDF file path.")

    # 2. Process the text: split into sections
    sections = split_into_sections(text)

    # 3. Generate outputs using LLM (summaries, detailed explanations, reproduction instructions)
    full_text = "\n".join(
        sections[:5])  # for example, use the first 5 sections

    summary = generate_completion(summary_prompt(full_text))
    explanation = generate_completion(detailed_explanation_prompt(full_text))
    reproduction = generate_completion(
        reproduction_instructions_prompt(full_text))

    # 4. Print the results (could also save to files)
    console.print("\n=== [bold yellow]Concise Summary[/bold yellow] ===")
    console.print(Markdown(summary))
    console.print("\n=== [bold yellow]Detailed Explanations[/bold yellow] ===")
    console.print(Markdown(explanation))
    console.print(
        "\n=== [bold yellow]Reproduction Instructions[/bold yellow] ===")
    console.print(Markdown(reproduction))

    # 5. Start an interactive chat session (optional)
    chat_choice = input(
        "Do you want to start an interactive chat session? (yes/no): ").strip(
        ).lower()
    if chat_choice in ("yes", "y"):
        # Use the summary (or any output) as the basis for conversation
        chat_session(explanation + "\n" + reproduction)


if __name__ == "__main__":
    main()
