# Cyclomatic Complexity

Cyclomatic complexity counts recognized decision points within each function as a control-flow-path proxy. Use the bundled bands as attention routing: `1-6` low, `7-9` moderate, `10-20` high, and `21+` very high. Values differ across measurement engines and languages; this does not measure all executable paths, nesting, domain difficulty, runtime behaviour, or correctness.

Inspect whether the branches represent one cohesive decision, repeated cases, invalid intermediate states, flag-driven behaviour, or several policies sharing a function. Trace the distinct outcomes and their tests.

Prefer guard clauses for invalid states, data or lookup tables for declarative cases, and extraction behind a named boundary when a decision has an independent contract. Use polymorphism or strategy objects only when the variants are real concepts with separate change patterns. Do not improve the number by scattering the same decisions across shallow helpers.

Retain high complexity when an explicit algorithm, parser, state transition, protocol, or irreducible domain rule is clearer locally and its material paths are tested. Record that mechanism and evidence.
