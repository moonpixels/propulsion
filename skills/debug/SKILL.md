---
name: debug
description: Reproduces, isolates, repairs, and verifies code issues. Use when debugging failures, regressions, runtime errors, or incorrect behaviour.
metadata:
    invocation: model
disable-model-invocation: false
---

# Debug

**Scientific debugging** turns a repeatable failing signal into a verified causal repair through falsifiable hypotheses, predicted observations, and discriminating experiments.

## Process

### 1. Establish a repeatable signal

Read repository instructions and establish the authorised scope, expected behaviour, observed behaviour, and exact verdict that distinguishes them. Run the smallest reliable reproduction and record its invocation or probe, input, environment, expected verdict, and observed verdict. A failing test, benchmark, trace, log pattern, captured artefact, or targeted external probe may supply the signal when a local reproduction cannot. Use [Debugging Techniques](references/TECHNIQUES.md) when the signal or next experiment is not obvious; for an intermittent or concurrent fault, component or production boundary, or performance regression, load [Nondeterministic Faults](references/NONDETERMINISTIC.md), [Boundary Evidence](references/BOUNDARY-EVIDENCE.md), or [Performance Faults](references/PERFORMANCE.md) respectively. Preserve pre-existing user work and identify the mutation boundary for later repair attempts. When no reliable signal can be established, leave the implementation unchanged and report the evidence, blocker, and next discriminating experiment. The original fault has a repeatable red signal or an explicit evidence boundary.

### 2. Isolate the root cause

Gather evidence and state falsifiable causal hypotheses in evidence-supported order. For the leading hypothesis, state the observation it predicts, then run the cheapest experiment that distinguishes it from the credible alternatives. Change one variable and record the hypothesis, prediction, experiment, and observation. Treat an observation that does not discriminate as an incomplete experiment and sharpen it before continuing. Repeat until the evidence supports one leading cause strongly enough to justify a minimal repair experiment. The cause, causal mechanism, and evidence against symptom-level alternatives are explicit.

### 3. Test one repair

When the user requested diagnosis only, stop before mutation and follow the Handoff. Invoke `$modular-design` when the supported repair presents a material structural-maintainability decision, and carry its constraints into `$tdd` when a runnable suite can exercise the repair through a stable observable boundary; preserve the established reproduction as TDD's Red signal and let it own the minimal Green repair and regression protection. When TDD is not applicable, apply one smallest change that would repair the leading cause if the hypothesis is correct. Keep the attempt within the authorised mutation boundary and leave unrelated cleanup or refactoring outside it. One evidence-led repair is ready for a causal verdict.

### 4. Accept or revert the repair

Run the original signal. When it changes as predicted, retain the repair provisionally and continue to verification. When it remains red or changes for a different reason, record the contradictory evidence and revert only the production, configuration, and throwaway-test changes introduced by that attempt; preserve the established reproduction and all pre-existing user work. Reconsider the hypotheses, experiment, system boundary, or architecture whenever the observations no longer support the causal model, then return to isolation without stacking another repair onto the failed one. The working tree contains either one supported repair or no residue from an unsuccessful attempt.

### 5. Verify and clean up

Re-run the original unminimised reproduction, focused regression coverage, relevant nearby checks, and the repository-prescribed wider checks. Remove temporary instrumentation and throwaway harnesses, or retain them deliberately as documented diagnostics. Separate unrelated pre-existing failures from repair regressions. The original fault and causal account are confirmed by the evidence, the smallest supported repair remains, and relevant checks pass; otherwise the exact remaining failure and uncertainty are explicit.

## Handoff

Report the expected and observed behaviour, original failing signal, hypotheses, predictions, experiments and observations, root cause and causal mechanism, reverted attempts, retained change, regression protection, verification commands and results, and any blocker or unresolved uncertainty. For diagnosis-only work, state plainly that no implementation was changed.
