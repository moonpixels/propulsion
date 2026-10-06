# Maximum nesting

Maximum nesting counts simultaneously nested control structures. This is syntactic depth, not a Cognitive Complexity score. Treatment of comprehensions, expressions and nested functions can differ across languages.

| Depth | Advisory band | Meaning                                                  |
| ----- | ------------- | -------------------------------------------------------- |
| 0–1   | Shallow       | Little enclosing control state                           |
| 2–3   | Nested        | Several active conditions or loops                       |
| ≥4    | Deep          | Inspect the successful path and state held across levels |

These are local interpretation heuristics. A necessary traversal may justify deeper nesting.

For example, `loop → if → loop → if` has depth 4. Consider rejecting ineligible outer cases before the inner traversal, or extracting a complete inner operation when it owns a coherent decision. **Replace Nested Conditional with Guard Clauses** can reveal the main path.

Preserve iteration order, failure precedence, resource cleanup and effects. An early return inside a resource lifecycle can change behaviour. Replacing loops with nested callbacks can hide the same depth behind additional indirection.
