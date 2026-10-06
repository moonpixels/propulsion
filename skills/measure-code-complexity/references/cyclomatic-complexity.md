# Cyclomatic complexity

CC counts independent control-flow paths. A function begins at 1. Each recognised decision adds paths. This describes path reasoning and testing burden, not all possible executions or nesting.

| Score | Band      | Meaning                                                        |
| ----- | --------- | -------------------------------------------------------------- |
| 1–6   | Low       | Few independent paths                                          |
| 7–9   | Moderate  | Several cases to reason about                                  |
| 10–20 | High      | Inspect branch interactions and mixed responsibilities         |
| >20   | Very high | Prioritise understanding the path structure before changing it |

These bands are advisory. Language and scoring conventions can affect decision counts. A CC value is not a required number of branch-coverage tests or a correctness grade.

For example, nine independent `if` decisions yield CC 10. If they repeatedly reconstruct one supported mapping, consider centralising that mapping. If they represent distinct necessary domain cases, keeping them together may be clearer.

Consider **Decompose Conditional**, **Substitute Algorithm** or a coherent extraction when it reduces decisions the reader must reconstruct. Preserve failure precedence, defaults and effect order. Moving the same branches into tiny wrappers or callbacks can lower one function's score while increasing indirection. The caller decides whether source evidence supports a change.
