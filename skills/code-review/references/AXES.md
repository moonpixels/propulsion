# Review axes

## Spec

Account for every applicable requirement in code and retained tests, and every introduced behaviour against the supplied authority. Follow affected contracts, states, data shapes, errors, effects, and consumers far enough to identify missing, partial, conflicting, excessive, or regressed behaviour.

Trace success, failure, retry, and concurrent paths where the authority distinguishes them. **Effect before acknowledgement:** when an external effect precedes durable state or acknowledgement, inspect failure after that effect and before the record or response, including what a retry repeats.

Keep separate findings when their triggering state, violated requirement, consequence, or narrow corrective outcome differs, even if evidence overlaps.

## Standards

Understand every changed line in context. Assess correctness and regressions, coherent scope, repository and framework conventions, test validity, independent oracles, meaningful failure detection, modular ownership, dependencies, interface depth, and change locality. Check required and risk-relevant harness coverage, measurement integrity, and evidence limits. Investigate specialist risks exposed by the change.

Apply `$modular-design` for structural judgement and `$test-design` for test judgement using their public contracts. Obtain current complexity evidence through `$measure-code-complexity` for the fixed candidate and base with read-only authority. Reuse supplied output only when its complete measured state and tool configuration still match. Inspect reported triggers in source and test context; retain findings only for a concrete consequence that survives falsification. Report unavailable or incomplete measurement as a limitation.

Read [code smells](CODE-SMELLS.md) when recognised vocabulary clarifies a concrete maintainability mechanism. Repository-sanctioned shapes and evidence can justify retaining them.
