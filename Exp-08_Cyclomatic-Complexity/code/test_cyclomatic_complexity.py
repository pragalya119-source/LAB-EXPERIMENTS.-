from cyclomatic_complexity import complexity_from_graph, complexity_from_predicates


def test_given_graph():
    assert complexity_from_graph(17, 13) == 6
    assert complexity_from_predicates(5) == 6


def test_straight_line_code_is_one():
    assert complexity_from_graph(edges=3, nodes=4) == 1
    assert complexity_from_predicates(0) == 1
