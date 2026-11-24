from string_length import length_of


def test_expected_output_from_lab_manual():
    assert length_of("SoftwareEngineering") == 19


def test_empty_string():
    assert length_of("") == 0


def test_matches_builtin_len():
    for s in ["a", "hello world", "CSA10", "  spaces  "]:
        assert length_of(s) == len(s)
