---
name: debug
description: Diagnose a software defect from discriminating evidence and, when requested, make a causal local repair with checks and independent review.
---

# Debug

Explain a defect through discriminating evidence. For an authorised repair, deliver a minimal local change that improves the original signal as predicted.

## Inputs

Take the defect from the request. Inspect its failure evidence and affected code. Resolve diagnosis-only versus repair scope. Use [$elicit-with-context](../elicit-with-context/SKILL.md) for a material user-held fact or decision that remains after inspection.

Keep production and external systems read-only within the user's authority. Report a required external mutation separately. Protect secrets and unnecessary personal data in commands, captures, and reports.

## Method

1. Establish the best available **signal**: focused test, command, trace, captured artefact, benchmark, safe observation, or measured failure rate. Record invocation or provenance, inputs, environment, expected and observed outcomes, and fidelity limits. Run it before implementation changes when safe. Preserve the original unminimised signal. If nothing can distinguish this defect, leave implementation unchanged and report the gap and next smallest experiment.
2. Model the affected path, contracts, state, boundaries, and relevant changes. Keep a compact record of observations, ranked causal hypotheses, active prediction, experiment, result, implication, and contradictory evidence. Test the smallest safe prediction that separates credible alternatives, controlling material conditions. A recent change, suspicious line, correlation, or passing retry is evidence to investigate, not proof.
3. Use the matching resource below when the current uncertainty calls for it. Return observations to the causal record before choosing another technique. Continue until the mechanism accounts for the signal and strongest alternatives, or the next experiment is unsafe, unavailable, outside authority, or no longer proportionate. A cause may require several interacting conditions.
4. Remove owned temporary probes, captures, fixtures, and experimental edits. For diagnosis-only work, report the supported mechanism, trigger, alternatives, contradictions, confidence limits, and unknowns, then stop.
5. For an authorised repair, apply [$modular-design](../modular-design/SKILL.md) and choose the minimal change directed at the supported cause. Use [$test-design](../test-design/SKILL.md) for testing eligibility and its test-first method. Run the original signal. Retain the repair only when it changes as predicted. Otherwise record the contradiction, revert only that attempt's owned edits, and resume investigation. Preserve pre-existing work.
6. Freeze the complete repair, behavioural authority, causal account, original signal, regression and quality evidence, changed and untracked contents, and repository state. Invoke [$code-review](../code-review/SKILL.md). Read the returned report file and check its assessment status and coverage. Refresh an incomplete or stale review before treating the repair as independently reviewed. Adjudicate findings against those authorities, correct required findings, reject unsupported or out-of-scope ones with evidence, and obtain material user decisions. After a material change, rerun the original signal and affected checks, re-freeze, and repeat independent review.

## Conditional resources

| Current uncertainty                                           | Read                                                                 |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Several plausible causes                                      | [Hypothesis experiments](references/hypothesis-experiments.md)       |
| Observable boundaries along the failing path                  | [Boundary isolation](references/boundary-isolation.md)               |
| Reliable ordered good and bad states                          | [Change bisection](references/change-bisection.md)                   |
| Large reducible input, sequence, state, or change set         | [Delta debugging](references/delta-debugging.md)                     |
| Bad state observed downstream from its origin                 | [Origin tracking](references/origin-tracking.md)                     |
| A credible working comparator                                 | [Comparative debugging](references/comparative-debugging.md)         |
| Existing observations cannot distinguish hypotheses           | [Instrumentation](references/instrumentation-debuggers.md)           |
| Timing, order, randomness, load, or shared-state dependence   | [Nondeterministic faults](references/nondeterministic-concurrent.md) |
| Latency, throughput, contention, leakage, exhaustion, or cost | [Performance faults](references/performance-resource.md)             |

Use nondeterministic or performance guidance as soon as that signal appears. Combine techniques only when they answer different unresolved questions. Use [$research](../research/SKILL.md) when a material external-knowledge question requires a durable cited report.

## Finish

Return the requested diagnosis or repair, authority and environment boundary, original signal, decisive experiments and contradictions, reverted attempts, supported cause or evidence gap, retained regression protection, checks, review dispositions, limitations, and next discriminating step. Include a prevention observation only when it follows from the cause.

A repair is complete when the current candidate has no unresolved supported finding, applicable existing regression checks pass, the original signal changes as predicted, and applicable repository and risk-relevant checks ran or their exact blockers are explicit. Green checks do not establish universal proof. State when diagnosis left implementation unchanged.

Stop after the local result. Commit, tracker changes, publication, deployment, production mutation, and monitoring are separate actions.
