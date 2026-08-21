---
name: debug
description: Diagnoses software defects and conditionally makes causal, verified repairs. Use for failures, regressions, runtime errors, flaky behaviour, or performance faults.
disable-model-invocation: true
---

# Debug

Diagnoses a defect through discriminating evidence and, when requested, produces one minimal reviewed local repair.

## Process

### 1. Fix the outcome and signal

Read the request, repository instructions, expected and observed behaviour, failing evidence, environment, relevant authorities, current code, and tests. Resolve whether the requested outcome is diagnosis only or diagnosis plus repair. Invoke `$elicit-with-context` only when a material user-held fact or decision remains.

Keep production and external systems read-only and within explicit authority. When diagnosis or mitigation needs external mutation, report the required action and stop; production mitigation, deployment, and monitoring remain outside this skill.

Define the best available **signal**: a focused test, command, error, trace, captured artefact, controlled benchmark, safe observation, or measured failure rate. Record its invocation or provenance, input, environment, expected result, observed result, and fidelity limits. Run it before changing implementation when safe. Prefer a sharp repeatable reproduction, but accept authorised captured, external, or probabilistic evidence when that is the honest boundary. Preserve the original unminimised signal through the investigation. If no evidence can distinguish the reported defect, leave implementation unchanged and return the exact gap and next smallest experiment.

### 2. Narrow the cause

Build a small model of the relevant path, contracts, state, boundaries, and recent code, configuration, dependency, environment, data, or workload changes. Treat recent change, suspicious location, correlation, and a passing retry as hypotheses or observations, never as proof.

Maintain one compact investigation record containing observations, a small ranked set of causal hypotheses, the active prediction, the experiment, its result, its implication, and contradictory evidence. Test one prediction at a time with the smallest safe experiment that distinguishes credible alternatives. Prefer changing one factor while preserving the signal's material conditions.

Select the reference whose trigger matches the current uncertainty and load only that reference. Return its evidence to this causal loop before selecting another:

| Evidence shape | Load |
| --- | --- |
| Multiple plausible explanations remain | [Hypothesis-Driven Experiments](references/HYPOTHESIS-EXPERIMENTS.md) |
| A component, pipeline, request, or data path has observable boundaries | [Boundary Isolation](references/BOUNDARY-ISOLATION.md) |
| Reliable known-good and known-bad ordered states exist | [Change Bisection](references/CHANGE-BISECTION.md) |
| A large input, state, sequence, trace, or change set can be reduced | [Delta Debugging](references/DELTA-DEBUGGING.md) |
| Invalid state appears downstream of where it originated | [Origin Tracking](references/ORIGIN-TRACKING.md) |
| A credible working case can be compared with the failing case | [Comparative Debugging](references/COMPARATIVE-DEBUGGING.md) |
| Existing evidence cannot distinguish the active hypotheses | [Instrumentation and Debuggers](references/INSTRUMENTATION-DEBUGGERS.md) |
| Outcome depends on timing, order, randomness, load, or shared state | [Nondeterministic and Concurrent Faults](references/NONDETERMINISTIC-CONCURRENT.md) |
| The signal is latency, throughput, contention, exhaustion, leakage, or resource cost | [Performance and Resource Faults](references/PERFORMANCE-RESOURCE.md) |

When the shape is unclear, verify the signal and inspect recent changes, then compare a working case, isolate boundaries, reduce the reproducer, trace the first invalid state, and finally add targeted probes. Enter nondeterministic or performance guidance immediately when its trigger applies. Combine techniques only when each answers a distinct unresolved question.

Continue until the evidence explains the causal mechanism and accounts proportionately for the strongest alternatives. A root cause may be a set of jointly necessary conditions rather than one deepest line. If the next discriminating experiment is unsafe, unavailable, outside authority, or no longer economical, stop with the supported findings, uncertainty, and exact next experiment. Invoke `$research` only when a material external-knowledge question requires a durable cited report.

### 3. Close diagnosis or repair one cause

Remove owned temporary probes, captures, fixtures, and experimental edits, retaining a diagnostic only when project authority makes it durable and safe. State the supported cause, mechanism, trigger conditions, evidence for and against the material alternatives, contradictions, confidence boundary, and remaining unknowns. For diagnosis-only work, state that implementation was not changed and stop.

For an authorised repair, apply `$modular-design` to keep the change with the natural owner and limit propagation. Select one minimal change directed at the supported cause; exclude unrelated cleanup, broad refactoring, speculative hardening, and other plausible defects.

Apply `$tdd` when its prerequisites hold. The established signal supplies Red only when it independently specifies the desired observable behaviour and fails for that reason; a crash, trace, log, profile, or implementation-derived expectation does not automatically qualify. Otherwise use the strongest existing project-native feedback without claiming TDD or creating project-wide test infrastructure.

Run the original signal against the repair. Retain the attempt only when the result changes as the causal account predicted. When it does not, record the contradiction, revert only the exact changes owned by that attempt without disturbing pre-existing work, and return to the causal loop. Do not stack another unsupported fix.

Apply `$quality-harnesses` to the fixed candidate and preserve its claim-level evidence and missing-evidence limits. Add or retain regression protection only through existing infrastructure and a credible behavioural seam.

### 4. Review and verify the local repair

Freeze the complete candidate, intended-behaviour authority, causal account, original signal, regression evidence, selected quality evidence, changed and untracked paths, and repository state. Invoke `$code-review` on that exact candidate. Adjudicate every finding against the request, authorities, causal evidence, and current code. Correct supported required findings, ask the user about material behaviour, architecture, or scope decisions, and reject unsupported or out-of-scope findings with concrete evidence.

After any candidate change, rerun the original signal and affected harnesses, re-freeze the candidate, and repeat independent review. Complete only when the current candidate has no unresolved required finding; the focused regression passes; the original unminimised signal changes as predicted; applicable repository and risk-triggered checks have been run; and unavailable or inconclusive evidence remains explicit. Do not turn green checks into universal proof.

## Handoff

Return the requested outcome; expected and observed behaviour; authority and environment boundary; original signal; hypotheses, predictions, experiments, contradictions, and reverted attempts; causal mechanism or exact evidence gap; retained change and regression protection; quality evidence and limitations; review scope and dispositions; residual risk; and next discriminating experiment or follow-up. Include one brief prevention observation only when it follows directly from the established cause; do not create an automatic postmortem or wider programme.

For diagnosis-only work, state that implementation was unchanged. Stop after the diagnosis or reviewed verified local repair without committing, changing tracker state, publishing, deploying, mutating production, or monitoring.
