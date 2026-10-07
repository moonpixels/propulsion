# Parameter count

Parameter count describes the declared inputs to a function. Syntax can affect recognition. Retain the measured value and expose observed discrepancies rather than silently replacing it.

| Parameters | Advisory band | Meaning                                        |
| ---------- | ------------- | ---------------------------------------------- |
| 0–3        | Small         | Few inputs for callers to distinguish          |
| 4–5        | Substantial   | More input meanings and interactions           |
| ≥6         | Large         | Inspect the interface and repeated data clumps |

These are local review heuristics. Independent inputs can form the simplest honest interface.

Consider **Remove Parameter** when unused, **Replace Parameter with Query** when the owner already holds the value, or **Introduce Parameter Object** for a real domain concept. For example, an account and statement period travelling together may earn a `StatementRequest`. Six unrelated inputs do not become simpler when hidden in an unnamed options bag.

Keep supported external signatures and runtime defaults. The caller establishes whether grouping reduces knowledge or merely hides the parameter list.
