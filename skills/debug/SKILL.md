---
name: debug
description: Diagnoses defects and conditionally makes verified repairs. Use for failures, regressions, runtime errors, performance faults, incorrect behaviour, or causal debugging.
disable-model-invocation: true
---

# Debug

**Scientific debugging** establishes an evidence-backed causal explanation through falsifiable hypotheses, predicted observations, and discriminating experiments. It stops at diagnosis when requested and permits a repair only when repair is part of the agreed outcome.

## Process

### 1. Fix the outcome and signal

Read repository instructions, the requested outcome, expected and observed behaviour, environment evidence, current implementation and tests, and applicable product, feature, architecture, and operational authorities. Resolve whether the outcome is diagnosis only or diagnosis plus repair; ask when that distinction is materially ambiguous. Record the authorised local, external, and production boundaries before probing or editing.

Define the smallest reliable signal whose verdict distinguishes expected from observed behaviour. Use a focused test, runtime error, trace or log, captured artefact, controlled benchmark, safe external observation, or production-boundary evidence according to the fault. Record its invocation or probe, input, environment, expected verdict, observed verdict, and fidelity limitations. Do not claim a local reproduction when only external or captured evidence exists. Run an external or production probe only when it is read-only and within available authority; obtain explicit authority before any probe that can mutate durable or external state, expose sensitive data, or materially affect service. Preserve the original unminimised signal for the final causal check.

When the signal or next experiment is unclear, load [Debugging Techniques](references/TECHNIQUES.md). For an intermittent, flaky, timing-sensitive, order-dependent, or concurrent fault, load [Nondeterministic Faults](references/NONDETERMINISTIC.md). For a component, process, service, environment, or production boundary, load [Boundary Evidence](references/BOUNDARY-EVIDENCE.md). For a latency, throughput, resource, query, or scale regression, load [Performance Faults](references/PERFORMANCE.md); also load the nondeterministic guide when its classifier is noisy. If no reliable signal can be established, leave implementation unchanged and stop with the exact evidence gap and next smallest discriminating experiment. The outcome, authority, and evidence boundary are explicit.

### 2. Establish the causal explanation

State the plausible causal hypotheses in evidence-supported order. For the leading hypothesis, predict an observation that distinguishes it from credible alternatives, then run the smallest safe experiment capable of producing that observation. Change one variable at a time and record the hypothesis, prediction, experiment, observation, and whether the result supports, rejects, or fails to discriminate the hypothesis. Treat correlation, disappearance of a symptom, and a passing retry as evidence to explain rather than proof of cause.

Repeat until the evidence supports a root cause and causal mechanism and accounts for the strongest alternatives, or until a named evidence boundary prevents the next discriminating experiment. Preserve failed hypotheses and contradictory observations. Keep diagnosis-only experiments non-mutating with respect to the implementation; when the next discriminating experiment requires a source or configuration change, stop with that exact expanded outcome rather than performing it. Remove temporary local or external effects owned by the diagnostic run. Invoke `$research` only when a material external-knowledge subject needs durable evidence and its cited report is explicitly in scope; use proportionate transient documentation lookup otherwise. Invoke `$maintain-ubiquitous-language` only after independently confirmed terminology arises and `$maintain-decision-records` only after an accepted decision reaches its rare ADR gate. For diagnosis-only work, stop here without implementation mutation and follow the Handoff.

### 3. Test one causal repair

For a repair outcome, select the smallest change that addresses the supported cause. Invoke `$modular-design` only when the repair presents a material ownership, boundary, contract, dependency, seam, or change-propagation decision, and carry its constraints into the repair. Exclude unrelated cleanup, broad refactoring, speculative hardening, and other plausible defects.

Invoke `$tdd` only when an existing runnable suite can exercise the desired observable behaviour through a stable boundary with an independent oracle. An established reproduction may supply TDD's Red only when it independently specifies that desired behaviour and fails for the expected behavioural reason; a crash, log, trace, performance symptom, or implementation-derived expectation is not automatically a retained test or valid Red. Otherwise apply one conventional minimal repair and add or update regression protection only when existing project infrastructure can meaningfully express the changed behaviour. Do not install or invent a test or quality framework for this repair.

Run the original signal against the attempt. Retain the repair provisionally only when the signal changes as the causal model predicted. When it does not, record the contradiction and revert only changes introduced and owned by that attempt when their exact ownership is known, preserving the original signal, diagnostic evidence, and all pre-existing user work. Do not use destructive reset or checkout, discard uncertain state, or stack another unsupported fix. Remove owned temporary instrumentation and throwaway harnesses before freezing a supported candidate; retain a diagnostic only when the requested scope and project authority make it durable. Return to the causal hypotheses with either one supported candidate or no repair residue.

### 4. Review the fixed candidate

Freeze the complete supported candidate: exact diff or revisions, changed and untracked paths, repository state, intended-behaviour authority, causal account, original signal, applicable structural constraints, and named risks. Invoke `$code-review` independently on that basis. If the candidate drifts or an applicable review axis is stale or unperformed, re-freeze and repeat the review when scope and ownership remain clear; otherwise stop with the exact blocker.

Adjudicate every finding against the requested outcome, project authorities, causal evidence, and current code. Correct each supported required finding through the applicable TDD or conventional repair path; reject a finding only with concrete contrary evidence. When a finding requires a user-authoritative change to behaviour, contract, architecture, or scope, ask one material question and pause mutation until the answer is confirmed. After any candidate change, re-run the original signal, freeze the new candidate, and repeat independent review. Continue only when the complete current candidate has no unresolved required finding.

### 5. Verify the reviewed repair

Invoke `$verify-change` on the exact reviewed candidate. Supply the intended behaviour, causal claim, original unminimised signal, focused regression evidence, applicable nearby and repository requirements, named risks, review dispositions, and any changed tests, snapshots, baselines, suppressions, scripts, configuration, dependencies, or generated artefacts. A passing regression alone does not prove the root cause; require the original signal to change as predicted and explain the causal mechanism and evidence against material alternatives.

When verification exposes an in-scope failure, return to the causal repair path, then independently re-review and freshly verify the new fixed candidate. When source or measurement-path drift makes evidence stale, establish ownership, re-freeze, re-review, and re-verify rather than retargeting old evidence. Preserve a required pre-existing or out-of-scope failure as a blocker instead of widening the repair. Claim a completed repair only when the current review has no unresolved required finding and verification returns `passed within stated scope`; treat `partially verified`, `unverified`, or `failed` as incomplete or blocked and report it honestly.

## Handoff

Report the requested outcome; expected and observed behaviour; authority and environment boundary; original signal; hypotheses, predictions, experiments, and contradictory evidence; root cause and causal mechanism or exact unresolved evidence boundary; reverted attempts; retained change and regression protection; review scope and finding dispositions; verification scope, commands, evidence, verdict, limitations, residual risks, and next discriminating experiment or planned work. For diagnosis-only work, state that no implementation was changed. Stop after the diagnosis or verified local repair without committing, pushing, opening a pull request, changing tracker state, releasing, deploying, monitoring, or adding speculative documentation.
