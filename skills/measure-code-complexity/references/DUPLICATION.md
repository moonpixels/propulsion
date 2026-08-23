# Duplication

Clone detection normalizes token sequences and reports locations meeting the bundled `70`-token floor. Review new or expanded clone groups that intersect changed code. A clone is syntactic similarity, not proof that occurrences share one concept or should evolve together.

Compare every occurrence. Inspect whether the same rule, defect fix, invariant, or sequence would need parallel change; also check whether similarities are coincidental, generated, declarative, protocol-defined, or intentionally independent test examples.

Prefer one owner with a deep interface when the occurrences share knowledge and change together. Use data tables or parameterized tests when only values differ. Do not create a shallow helper that leaks sequencing, accepts mode flags, couples independent features, or obscures a readable example.

Retain a clone when independent evolution, protocol fidelity, test clarity, or a small stable repetition outweighs shared ownership. Record that reason and the evidence that future changes need not stay synchronized.
