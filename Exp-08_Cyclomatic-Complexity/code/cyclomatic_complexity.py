"""Experiment 8 - Cyclomatic complexity of a flow graph.

    V(G) = E - N + 2        (edges, nodes)
    V(G) = P + 1            (predicate / decision nodes)
"""


def complexity_from_graph(edges: int, nodes: int) -> int:
    return edges - nodes + 2


def complexity_from_predicates(predicates: int) -> int:
    return predicates + 1


def interpret(v: int) -> str:
    if v <= 10:
        return "Moderate complexity - low risk"
    if v <= 20:
        return "Complex - moderate risk"
    if v <= 50:
        return "Very complex - high risk"
    return "Untestable - very high risk"


def main() -> None:
    E, N, P = 17, 13, 5
    v1 = complexity_from_graph(E, N)
    v2 = complexity_from_predicates(P)
    print(f"Edges (E) = {E}, Nodes (N) = {N}, Predicate nodes (P) = {P}")
    print(f"V(G) = E - N + 2 = {E} - {N} + 2 = {v1}")
    print(f"V(G) = P + 1     = {P} + 1 = {v2}")
    print("Both formulae agree" if v1 == v2 else "Formulae disagree - recheck the graph")
    print(f"Independent paths (minimum test cases) = {v1}")
    print("Interpretation:", interpret(v1))


if __name__ == "__main__":
    main()
