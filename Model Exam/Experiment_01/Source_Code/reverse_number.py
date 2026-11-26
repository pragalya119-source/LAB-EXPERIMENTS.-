"""Reverse the digits of a positive integer and check whether it is a palindrome."""
def reverse_number(number: int):
    if number < 0:
        raise ValueError("Enter a positive integer (0 or greater).")
    original = number
    reversed_number = 0
    trace = []
    while number > 0:
        digit = number % 10
        reversed_number = reversed_number * 10 + digit
        number //= 10
        trace.append((digit, reversed_number, number))
    return original, reversed_number, trace

def main():
    print("RAPTOR FLOWCHART - REVERSE A NUMBER")
    raw = input("Enter a positive integer: ").strip()
    if not raw.isdigit():
        print("Invalid input. Enter digits only.")
        return
    original, reversed_value, trace = reverse_number(int(raw))
    print("\\nLoop trace: digit | reversed | remaining")
    for digit, rev, remaining in trace:
        print(f"   {digit:>3} | {rev:>8} | {remaining:>9}")
    print(f"\\nOriginal number : {original}")
    print(f"Reversed number : {reversed_value}")
    print("Palindrome      :", "Yes" if original == reversed_value else "No")
    if original and str(original).endswith("0"):
        print("Note: trailing zeros become leading zeros when reversed; integer output omits them.")

if __name__ == "__main__":
    main()
