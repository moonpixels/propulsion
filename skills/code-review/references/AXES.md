# Review axes

## Spec

Account for every applicable requirement in code and retained tests, and every introduced behaviour against the supplied authority. Follow affected contracts, states, data shapes, errors, effects, and consumers far enough to identify missing, partial, conflicting, excessive, or regressed behaviour.

Trace success, failure, retry, and concurrent paths where the authority distinguishes them. **Effect before acknowledgement:** when an external effect precedes durable state or acknowledgement, inspect failure after that effect and before the record or response, including what a retry repeats.

Keep separate findings when their triggering state, violated requirement, consequence, or narrow corrective outcome differs, even if evidence overlaps.

## Standards

Understand every changed line in context. Assess correctness and regressions, coherent scope, repository and framework conventions, test validity, independent oracles, meaningful failure detection, modular ownership, dependencies, interface depth, and change locality. Check required and risk-relevant harness coverage, measurement integrity, and evidence limits. Investigate specialist risks exposed by the change.

Apply `$modular-design` for structural judgement and `$test-design` for test judgement using their public contracts.

Inspect supplied complexity measurements and their interpretation in source context. A score alone is not a finding, and improving a score does not justify extra tests or abstractions. If a concrete concern depends on missing or inconsistent measurement, request current-file measurements or reuse supplied native CRAP through [$measure-code-complexity](../../measure-code-complexity/SKILL.md) within the read-only boundary. Leave new native test runs and historical comparisons to the implementation caller. Report material evidence limits without inventing a score-based gate.

Read [code smells](CODE-SMELLS.md) when recognised vocabulary clarifies a concrete maintainability mechanism. Repository-sanctioned shapes and evidence can justify retaining them.
