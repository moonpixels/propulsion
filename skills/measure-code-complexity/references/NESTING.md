# Nested Control Structures

The nested-structures metric reports the maximum number of nested control structures in a function. Review values above `3`. It is a syntactic proxy for context carried through nested branches; it is not Cognitive Complexity and may vary with language support.

Python uses the bundled AST counter, version 1, with its interpreter version recorded in output. It counts conditional expressions, loops, try, with, and match blocks; an `elif` is a sibling choice. Comprehension generators and filter groups add levels, including the current generator when measuring its iterable. Named nested function bodies are measured separately; their header expressions count in the enclosing function. Lambda bodies count in their enclosing expression because the analyzer does not emit separate lambda records. A parse or function-matching failure makes measurement unavailable. Other languages use the pinned Lizard nesting extension, reset per file. Compare baselines measured by the same method.

Inspect which conditions protect invalid states, which levels represent independent policy, and whether loop, exception, and conditional nesting obscure the active invariant. Trace the deepest path and its tests.

Prefer guard clauses, `continue` or early completion for invalid cases, named predicates, and extraction of a cohesive nested policy. Flatten only when the resulting order and effects remain explicit. Avoid boolean flags, callback chains, or hidden mutable state that reduce indentation while increasing coordination.

Retain nesting when tree traversal, parsing, structured resource handling, or transactional cleanup is clearest in its lexical hierarchy. Record why flattening would weaken correctness or locality and identify the tests protecting the deepest path.
