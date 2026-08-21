# Behavioural Evidence

## Behavioural and regression suites

Map each changed observable outcome to an oracle capable of disagreeing with the implementation. When `$tdd` applies, use its public result for Red/Green sensitivity, durable boundary, and oracle evidence rather than recreating its workflow here. Treat captured current output as characterization until an independent authority accepts it.

Run the narrowest faithful focused target while changing behaviour, then relevant nearby tests and every repository-required broader suite. Distinguish:

- new-behaviour or defect evidence from focused changed tests;
- integration evidence that retains the production technology or boundary at risk; and
- pass-to-pass regression evidence from previously passing tests.

Confirm discovery and selected-case counts, intended failure sensitivity, complete assertions, negative or unchanged outcomes, fixture representativeness, cleanup, deterministic time and randomness, and meaningful boundary interactions. Inspect changed snapshots, fixtures, doubles, skips, quarantines, retries, timeouts, and test configuration. A shared implementation helper, regenerated snapshot, “does not throw,” empty selector, or incidental call assertion is not a faithful oracle unless that exact representation or interaction is the contract.

Preserve the exact command, result, case count, environment, and failing counterexample. Report flaky evidence as flaky or inconclusive; diagnose or rerun only through an explicit recorded procedure, never until green.

## Coverage

Use coverage to locate changed or risk-relevant statements, branches, conditions, states, and error paths that the selected tests never execute. Start from the claim and ask whether an uncovered path can alter it. Add a test only when an independent oracle and credible seam can make that path observable; executed code without a discriminating assertion is not stronger evidence.

Inspect the measured denominator, included packages, changed-code mapping, branch versus line criteria, exclusions, generated code, merged reports, stale artefacts, and coverage configuration changes. Preserve repository-owned thresholds, but do not invent a target or raise execution merely to improve a number.

Representative contrast: use a report to find that the duplicate-conflict branch never ran, then exercise its externally visible settlement result. Do not add a test that calls the branch and asserts only that it returned.

## Mutation

Use existing mutation tooling only when the bounded behaviour and suite are stable, test sensitivity remains materially uncertain, and execution is safe and economical. Target the changed or risk-bearing area rather than an unrelated whole repository unless authority requires otherwise.

Interpret each category:

- **Killed:** the suite detected that particular non-equivalent injected change.
- **Survived:** determine whether the mutant represents a plausible promised-behaviour defect; strengthen a faithful oracle only when it does.
- **Uncovered:** use coverage and claim tracing to decide whether the location affects material behaviour.
- **Equivalent or irrelevant:** retain a concrete justification; do not count it as detected.
- **Timed out or errored:** record unreliable or missing evidence and diagnose when in scope.

Inspect operator selection, changed-code mapping, exclusions, baseline failures, timeouts, retries, mutant filters, and whether a proposed test merely couples to implementation. Never use the aggregate score as correctness, a universal threshold, or permission to add low-value assertions.

Representative contrast: a surviving change that removes the uniqueness guard requires a test of duplicate settlement behaviour; a mutant that changes an unreachable diagnostic string may be irrelevant to the fixed claim.
