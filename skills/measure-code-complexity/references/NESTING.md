# Nested Control Structures

The nested-structures metric reports the maximum number of nested control structures in a function. Review values above `3`. It is a syntactic proxy for context carried through nested branches; it is not Cognitive Complexity and may vary with language support.

Inspect which conditions protect invalid states, which levels represent independent policy, and whether loop, exception, and conditional nesting obscure the active invariant. Trace the deepest path and its tests.

Prefer guard clauses, `continue` or early completion for invalid cases, named predicates, and extraction of a cohesive nested policy. Flatten only when the resulting order and effects remain explicit. Avoid boolean flags, callback chains, or hidden mutable state that reduce indentation while increasing coordination.

Retain nesting when tree traversal, parsing, structured resource handling, or transactional cleanup is clearest in its lexical hierarchy. Record why flattening would weaken correctness or locality and identify the tests protecting the deepest path.
