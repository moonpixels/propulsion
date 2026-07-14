---
name: debug
description: Reproduces, isolates, repairs, and verifies code issues. Use when debugging failures, regressions, runtime errors, or incorrect behaviour.
metadata:
    invocation: user
disable-model-invocation: true
---

# Debug

**Scientific method** turns a repeatable failing signal into a verified causal
repair through falsifiable hypotheses and discriminating experiments.

## Steps

1. Read repository instructions and establish the authorised scope, expected
   behaviour, observed behaviour, and a repeatable failing signal. Use the
   smallest reliable reproduction: a failing test, benchmark, trace, log
   pattern, or targeted probe may substitute for a local reproduction when it
   distinguishes the fault. When the signal or a later discriminating experiment
   is not obvious, use [Debugging Techniques](references/TECHNIQUES.md) to select
   and tighten the smallest applicable one. Preserve pre-existing user work.
   When no repeatable signal can be established, leave the implementation
   unchanged and report the evidence, blocker, and next discriminating
   experiment. The failure and mutation boundary are explicit.
2. Gather evidence and state falsifiable hypotheses in evidence-supported
   order. Run the cheapest experiment that distinguishes the leading
   hypotheses, changing one variable at a time and recording the result. Use a
   **minimal reproducible example**, **binary search**, or **delta debugging**
   when it will narrow the failing input, change, component, or boundary.
   Repeat until **root-cause analysis** identifies a cause supported by the
   experiments rather than a correlated symptom. The demonstrated cause is
   explicit before repair.
3. When the user explicitly requested diagnosis only, stop before mutation and
   follow the Handoff. Otherwise invoke `$tdd` when its prerequisite applies and
   the fault has a stable regression seam. When TDD is not applicable, apply
   the smallest correction to the demonstrated cause and use the repeatable
   signal as the immediate feedback loop. Keep the repair within the authorised
   scope; report a cause that requires external access or expanded authority as
   a blocker. The repair is causal, focused, and covered by the strongest
   feasible regression protection.
4. Re-run the original reproduction and confirm the expected behaviour, then
   run focused regression coverage, relevant nearby checks, and the
   repository-prescribed wider checks. Separate unrelated pre-existing failures
   from repair regressions. The original fault is repaired and relevant checks
   pass, or the exact remaining failure and uncertainty are explicit.

## Handoff

Report the expected and observed behaviour, failing signal, hypotheses and
experiments, root cause, changed files, regression protection, verification
commands and results, and any blocker or unresolved uncertainty. For
diagnosis-only work, state plainly that no implementation was changed.
