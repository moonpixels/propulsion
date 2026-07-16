# Nondeterministic Faults

Use this reference for intermittent, flaky, timing-sensitive, order-dependent, or concurrent faults. The goal is a controlled failure rate or replayable causal execution, not one passing retry.

## Measure the fault

Run the exact trigger repeatedly and record attempts, failures, seed, order, clock, load, resources, environment, and any captured schedule. A useful signal either reproduces at a stable enough rate to compare experiments or preserves the execution that failed.

Partition the likely nondeterminism before changing code:

- randomness or generated input;
- test order, shared state, or leaked resources;
- clock, timeout, asynchronous condition, or event order;
- concurrent access or scheduling;
- load, resource pressure, network, filesystem, or environment.

Vary one dimension and compare the failure rate or execution. Preserve every failing seed, order, input, and schedule that improves repeatability.

## Select the experiment

| Evidence | Technique | Causal evidence |
| --- | --- | --- |
| A seed or generated input controls the failure | Seed replay and counterexample reduction | The same input fails repeatedly and a minimised input preserves the verdict. |
| Test order or shared state is suspected | Order permutation and isolation probe | A specific predecessor, state, or unreleased resource changes the rate. |
| An asynchronous condition is suspected | Condition instrumentation and controlled perturbation | An observable state transition, rather than elapsed delay alone, determines success. |
| Unsynchronised access is possible | Repository-supported **race detector** | Conflicting accesses and their call paths identify the shared state to investigate. |
| A particular interleaving is suspected | Systematic, controlled, or recorded schedule | The captured schedule replays the failure and an alternative schedule discriminates the hypothesis. |

Use stress, injected delay, parallelism, or load only to amplify and capture a failure. Stress without a retained input, schedule, trace, or invariant violation does not prove a cause, and a long passing run does not prove absence.

Replace guessed delays with **condition-based waiting** only after evidence identifies the condition whose ordering is causal. A longer timeout that merely reduces the observed rate is not a confirmed repair.

## Verify the repair

Run the preserved failing seed, order, schedule, or trace first. Then repeat the original trigger under the same controls and compare failures per attempts; keep attempt counts proportionate to the prior rate and report the remaining uncertainty. Run focused regression and repository checks after the causal signal changes as predicted.

If a repair does not change the preserved execution or measured rate as predicted, record the result and revert the attempt before testing the next hypothesis.
