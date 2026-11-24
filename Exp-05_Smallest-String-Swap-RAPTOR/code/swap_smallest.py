"""Experiment 5 - Lexicographically smallest string by swapping two characters.

Part A  swap_all()      - the RAPTOR flowchart: swap every ch1 <-> ch2 in the string.
Part B  smallest_string() - tries every pair of letters (at most one swap) and
                            returns the lexicographically smallest result.
"""
from itertools import combinations


def swap_all(text: str, ch1: str, ch2: str) -> str:
    """Loop i = 1..n; if text[i]==ch1 -> ch2, elif text[i]==ch2 -> ch1."""
    result = ""
    i, n = 0, len(text)
    while i < n:                    # Loop symbol: i <= n
        c = text[i]
        if c == ch1:                # Selection 1
            result += ch2
        elif c == ch2:              # Selection 2
            result += ch1
        else:
            result += c
        i += 1                      # i <- i + 1
    return result


def smallest_string(text: str) -> str:
    """Best result when the operation is done at most once."""
    best = text
    for a, b in combinations(sorted(set(text)), 2):
        candidate = swap_all(text, a, b)
        if candidate < best:
            best = candidate
    return best


def main() -> None:
    text = input("Enter the string: ")
    ch1 = input("Enter first character: ")
    ch2 = input("Enter second character: ")
    print("Modified string =", swap_all(text, ch1, ch2))
    print("Smallest possible string (at most one swap) =", smallest_string(text))


if __name__ == "__main__":
    main()
