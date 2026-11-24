from login import login


def test_valid_credentials():
    assert login("admin", "1234") == "Login successful"


def test_wrong_password():
    assert login("admin", "wrong") == "Invalid username or password"


def test_unknown_user():
    assert login("guest", "1234") == "Invalid username or password"
