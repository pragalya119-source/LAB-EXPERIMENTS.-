"""Experiment 4 - Length of a string (Python equivalent of the RAPTOR flowchart).

Flowchart:  Start -> Input str -> length <- Length_Of(str) -> Output length -> End
"""


def length_of(text: str) -> int:
    """Count the characters one by one (what RAPTOR's Length_Of() does)."""
    count = 0
    for _ in text:
        count += 1
    return count


def main() -> None:
    text = input("Enter a String: ")           # Input symbol
    length = length_of(text)                   # Assignment symbol
    print("Total Number of Characters =", length)  # Output symbol


if __name__ == "__main__":
    main()
