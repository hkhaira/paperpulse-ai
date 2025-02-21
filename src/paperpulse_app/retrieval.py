import numpy as np
import openai


def get_embeddings(text: str,
                   model: str = "text-embedding-3-small") -> np.ndarray:
    """
    Gets a vector embedding for the given text using OpenAI's API.
    """
    response = openai.embeddings.create(input=[text], model=model)
    embeddings = response.data[0].embedding
    return np.array(embeddings)


def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Computes the cosine similarity between two vectors.
    """
    dot_product = np.dot(vec1, vec2)
    norm_a = np.linalg.norm(vec1)
    norm_b = np.linalg.norm(vec2)
    return dot_product / (norm_a * norm_b) if norm_a and norm_b else 0.0


def retrieve_relevant_sections(query: str,
                               sections: list,
                               threshold: float = 0.8) -> list:
    """
    Retrieves sections relevant to the query based on cosine similarity.
    """
    query_vec = get_embeddings(query)
    relevant = []
    for sec in sections:
        sec_vec = get_embeddings(sec)
        similarity = cosine_similarity(query_vec, sec_vec)
        if similarity >= threshold:
            relevant.append((sec, similarity))
    # Sort by similarity decendingly
    return sorted(relevant, key=lambda x: x[1], reverse=True)


if __name__ == "__main__":
    # Example usage:
    query = "Explain the key contribution of a novel neural network architecture."
    sections = [
        "This section discusses the innovative use of attention mechanisms in neural networks.",
        "The paper also reviews standard convolutional networks.",
    ]
    results = retrieve_relevant_sections(query, sections, threshold=0.5)
    for sec, sim in results:
        print(f"Similarity: {sim:.3f} - Section: {sec[:60]}...")
