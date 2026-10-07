# Hypothesis experiments

Read before hypothesis testing. Use **hypothetico-deductive reasoning** to distinguish mechanisms. A location, correlation or familiar-looking bug is a lead. A hypothesis explains how a trigger produces the observed failure.

## Keep a causal record

Record observations separately from interpretations. Keep plausible alternatives grounded in the failing path. Rank them using evidence, likelihood and the cost of discriminating them. Inventing alternatives to reach a fixed count adds noise. Test one active prediction while preserving its strongest competitors.

Use the temporary Markdown causal record as the investigation's reference point. Give it a unique name such as `debug-<unique-id>.md`. Record the relevant source revision or contents, environment and original signal once, then append experiments using the fields below. Maintain one short current-state section with the supported account, outstanding alternatives, owned temporary or repair edits, evidence paths, blockers and next step. Update that section in place while preserving experiment history. On resumption, a changed source or environment may invalidate earlier results.

```text
Observation and intended contract:
Active mechanism and evidence:
Credible alternatives:
Prediction if true:
Falsifier or competing prediction:
Experiment, changed condition and controls:
Actual result and evidence location:
Implication: supported, rejected or inconclusive
Next discriminating step:
```

Choose the least costly safe experiment that separates alternatives. Prefer an invariant observation, matched input, controlled configuration, boundary probe or existing detector over a speculative repair. Change one material condition at a time. When interacting conditions are plausible, compare controlled combinations rather than assuming independent causes.

A valid negative result requires that the experiment reached the relevant path and could expose the predicted effect. Setup failure, an unrelated exception and absent telemetry are inconclusive. A symptom disappearing can reflect masking, a bypassed path, reset state or perturbed timing. Predict an intermediate causal observation as well as the final symptom. A safe A/B comparison or reversal can distinguish these explanations.

## Worked example, distinguish duplicate mechanisms

One queue event creates two invoices. The intended contract is one invoice per event. Three credible mechanisms are duplicate delivery without idempotency, duplicate handler registration, and a check-then-insert race.

```text
H1: Two deliveries each run one handler.
H2: One delivery runs two registered handlers.
H3: Concurrent consumers both observe no invoice before inserting.

Experiment 1:
  Correlate event, delivery, registration and transaction identities.
  Result: one delivery runs two registrations sequentially.
  Implication: H2 supported. This execution does not require H1 or H3.

Experiment 2:
  Disable only the second registration in a disposable local run.
  Predict: one handler execution and one invoice for the same event.
  Falsifier: two invoices remain with one handler execution.
```

If the second prediction holds, trace why registration occurs twice and which owner should register once. Removing the duplicate registration is a candidate causal repair. Deduplicating displayed invoices or increasing a delivery timeout is unsupported by these observations.

If Experiment 1 instead reveals two overlapping transactions, test H3 by forcing both reads before either insert through the existing local harness. Duplicate delivery can be a legitimate trigger while missing atomicity is the defect. Account for the interaction rather than declaring that only one factor can be causal.

## Reset a contradicted premise

When attempts repeatedly fail under one premise or expose new coupling, stop adding repair edits. Summarise the actual attempts, name their shared premise and recheck the oracle, controls and intended contract. Design the next experiment to reject that premise. Consider hidden state, an unobserved writer, an incorrect comparator, interacting causes or a genuine architectural constraint. An attempt count alone cannot establish architectural failure.

```text
Failed attempts: changing lock duration and moving the lock did not stop loss.
Shared premise: every writer uses this lock.
New experiment: correlate every write with its writer and lock identity.
Observed: a second writer bypasses that owner.
Next question: must these writers share one object, or are their states independent?
```

The next repair can correct ownership or remove unnecessary sharing. Another lock at the already protected site preserves the rejected premise. Ask the user when a remedy changes scope or the intended contract. Continue authorised experiments without an automatic discussion gate after a fixed number of attempts.

## Transfer a supported repair

Give `implement` the causal record and obligations needed to deliver the repair. Ensure the record includes the original signal and reduced case, the causal chain from trigger through violated invariant to symptom, decisive experiments, rejected alternatives, proposed repair boundary and verification limits. Preserve the distinction between an input that exposes the bug and the erroneous handling to change.

Prefer removing the responsible redundant operation or correcting the canonical rule. A retry, guard, fallback, cache or wrapper needs a specific causal and contractual reason. Its small diff alone does not make it the minimal repair. Additional validation should protect a distinct reachable boundary, not repeat the same internal check everywhere.

Require the original scenario and relevant causal observation to change as predicted. A reduced test can miss interactions in the full scenario. If a repair fails that gate, preserve the result, undo its owned repair edits and return to investigation. Preserve pre-existing work and independently valid evidence or regression protection. A blocked original-scenario check leaves repair verification incomplete.
