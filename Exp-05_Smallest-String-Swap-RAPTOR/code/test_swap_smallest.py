from swap_smallest import swap_all, smallest_string


def test_manual_example():
    assert swap_all("ccad", "c", "a") == "aacd"


def test_smallest_string():
    assert smallest_string("ccad") == "aacd"
    assert smallest_string("abc") == "abc"      # already smallest
    assert smallest_string("cba") == "abc"
    assert smallest_string("zzz") == "zzz"


def test_swap_is_symmetric():
    assert swap_all("banana", "a", "n") == swap_all("banana", "n", "a")
