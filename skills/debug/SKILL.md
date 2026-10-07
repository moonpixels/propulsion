---
name: debug
description: Investigate software defects systematically when reported behaviour, tests, builds, integrations or performance fail their intended contract.
---

# Systematic debugging

Establish a supported causal mechanism before repairing a defect. Use **systematic debugging**, from root cause investigation through pattern analysis and hypothesis testing to implementation with verification. Prefer the smallest causal repair, including deletion.

## Inputs

Take the defect and diagnosis or repair intent from the request. Inspect the affected code and failure evidence. Requirements and documented contracts govern intended behaviour. Code and runtime observations establish actual behaviour. Use [$elicit-with-context](../elicit-with-context/SKILL.md) for material user-held gaps that inspection cannot resolve.

Preserve unrelated work and original failure evidence. Keep production and external systems read-only. Protect secrets and unnecessary personal data in probes, captures and reports.

Create a unique Markdown **causal record** in the OS temporary directory for every investigation, or resume the supplied record. Keep its absolute path available. On resumption, read it and referenced evidence, then recheck relevant code and environment for drift before relying on prior conclusions.

## Method

1. **Investigate the root cause.** Read [investigation and patterns](references/investigation-and-patterns.md). Read the actual errors and relevant traces. Establish an exact failure signal through a test, command, capture, safe observation or measured rate. Record its invocation or provenance, inputs, relevant environment, expected and observed results, and fidelity limits. Run it before repair when safe. Preserve the original unminimised scenario. Trace the failing path and bad state backwards to the first broken invariant. Inspect relevant code, dependency, configuration and state changes. If evidence cannot distinguish the reported defect, gather the missing observation before dependent conclusions.
2. **Analyse the pattern.** Find a credible working example or authoritative reference and understand its complete relevant path, lifecycle and dependencies. Compare inputs, state, configuration, ordering and implementation. Account for material differences without dismissing small ones. Record when no credible comparator exists. A difference or first bad revision identifies a candidate, not its cause.
3. **Test hypotheses.** Read [hypothesis experiments](references/hypothesis-experiments.md). Keep grounded, ranked alternatives in the causal record. State one active mechanism, supporting evidence, prediction and falsifier before the smallest discriminating observation or intervention. Control material conditions, inspect the result and update the account. Undo owned edits motivated by rejected hypotheses. Revisit the oracle and shared premises when attempts contradict the account or expose new coupling. Persist until the mechanism explains the exact failure and trigger, observations establish the relevant transition, and discriminating evidence favours it over the strongest alternatives, or a concrete evidence, access or authority blocker prevents progress. Prefer controlled runtime confirmation whenever safely available. Decisive captured evidence or direct analysis can suffice. Suggestive evidence remains a hypothesis.
4. **Implement and verify.** For diagnosis-only work, return the supported account and stop. For an authorised repair, first consider removing unnecessary work or correcting the existing rule or state owner. Check related occurrences of the demonstrated pattern within the authorised capability and report wider discoveries separately. Restore owned experimental edits before handing off. Invoke [$implement](../implement/SKILL.md) with the causal record, intended contract, original signal, minimal repair boundary and verification obligations. It owns testing eligibility, implementation, simplification, checks and independent review. Require verification against the original failure and relevant causal observations before treating the change as working. If they contradict the account, record the result, revert that attempt's owned repair edits and resume investigation. Check the final candidate against the original signal after implementation finishes.

Load specialised guidance as soon as its signal appears. Combine techniques when they answer different unresolved questions.

| Signal                                                         | Read                                                                 |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| Large trigger or regression between reliably classified states | [Reduction and bisection](references/reduction-and-bisection.md)     |
| Timing, order, randomness, load or shared-state dependence     | [Nondeterministic faults](references/nondeterministic-concurrent.md) |
| Latency, throughput, retention, exhaustion or resource cost    | [Performance faults](references/performance-resource.md)             |

Record the initial signal and intended contract, append each experiment's prediction and actual result, and update the supported account, owned edits, blockers and next step before pausing or handing off. Link evidence by path or provenance and preserve rejected hypotheses. Keep the record concise rather than copying full tool transcripts. Use [$research](../research/SKILL.md) when a material external-knowledge question needs a durable cited investigation.

## Finish

Remove owned temporary probes and experimental edits while preserving needed evidence. Update the causal record and return its absolute path with the cause and trigger, original signal, decisive experiments and rejected alternatives, repair if requested, verification and implementation results, and remaining limitations. For blocked work, name the missing evidence or access and next discriminating experiment.

**Done only when** the causal record is current and the requested outcome meets its gate. Diagnosis must explain a supported mechanism and its evidence limits. An authorised repair must change the original failure and relevant causal observations as predicted, and `$implement` must have met its completion gate. Blocked or unverified work remains incomplete. Stop at the local result. Urgent mitigation, unrelated cleanup, commit, publication, deployment and monitoring are outside this contract.
