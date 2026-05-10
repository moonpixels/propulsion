# Investigation Loop

Use this loop to keep `debug.md` evidence-first and block fixes before root cause is grounded.

## Loop

1. Capture the feedback signal.

- Record the exact symptom: failing command, assertion, crash, wrong output, visible behaviour, alert, metric.
- Record expected versus actual behaviour and the user impact.
- Freeze relevant environment facts: revision, runtime, platform, flags, config, inputs, time/locale, dataset, tenant, CI/prod scope.

2. Reproduce or block.

- Reproduce before theorising using one command, script, URL, or manual path.
- If it will not reproduce, record no-repro attempts, environment gaps, and the next needed signal before blocking or asking.
- For flaky failures, prove pass/fail variation, capture run counts, freeze seed/time/order where possible, and record changing factors.

3. Read the failure fully.

- Read the complete error, stack, warning, assertion, logs, exit code, and first meaningful frame before summarising.
- Separate what the output proves from what it merely suggests.

4. Scan recent changes.

- Check working tree diff, staged diff, recent commits, dependencies, config, environment, CI, runtime drift, release delta before broad code reading.
- If a good/bad window exists, record the smallest credible window and isolate it before guessing.

5. Reduce the case.

- Remove fixtures, services, flags, data, timing, and setup while preserving the same symptom.
- If the symptom changes, record that the problem changed and reset the reduction.
- For performance/resource failures, reduce to the threshold and boundary where cost first diverges from a good baseline.
- For data-dependent failures, shrink to the smallest input, fixture, stored state, or tenant dataset that still fails.

6. Compare with working evidence.

- Compare against a passing test, adjacent feature, prior release, reference implementation, known-good trace, good environment.
- For environment/config failures, compare runtime, flags, env, and config propagation at each boundary.
- Record the first meaningful broken-versus-working difference.

7. Isolate the first bad boundary.

- Trace ingress, egress, config propagation, data, state, and timing at each component handoff.
- For concurrency/order bugs, serialise when possible, use logpoints/watchpoints, and capture the first ordering change that turns good into bad.
- For multi-component failures, inspect each handoff until the earliest bad boundary is visible.

8. Hypothesize one cause.

- Keep one current best hypothesis plus the strongest alternative and unexplained evidence.
- Define the falsifier and one discriminating experiment before running it.
- Prefer logs, traces, dumps, breakpoints, logpoints, watchpoints, and debugger inspection before mutating code.

9. Experiment once.

- Run one experiment at a time and record expected result, actual result, and conclusion.
- Temporary diagnostic edits are allowed only for investigation; record file, purpose, tag/comment marker when relevant, observation, revert status in `debug.md`.
- Revert temporary diagnostic edits before fix handoff.

10. Diagnose and gate the fix.

- Ground the diagnosis only when evidence explains the earliest bad state or divergence, not just late symptoms.
- Record root cause, falsifier, fix constraints, and one chosen fix hypothesis.
- Dispatch one fix at a time; if evidence no longer fits, reset diagnosis instead of pushing through.

11. Reset or escalate.

- If verification, review, or new evidence contradicts the model, return to the earliest loop step affected and record the reset reason.
- After 3 failed fix loops, reassess architecture and patterns before escalating to the user.
- Escalate with reproduced facts, failed hypotheses, experiments, fix attempts, reassessment, and the exact decision or access needed.

## Rules

- No permanent production-code changes in the controller before a grounded diagnosis.
- Reproduce before theorising.
- Read full errors before summarising.
- Scan changes and reduce before widening search.
- Isolate before fixing.
- Use one hypothesis, one experiment, and one fix at a time.
- Record expected experiment results before running experiments.
- Record, tag where relevant, and revert temporary diagnostic edits before fix handoff.
- Treat flaky, regression-window, performance, environment/config, data-dependent, concurrency, and multi-component cases as evidence patterns, not shortcuts to a fix.
- Reset when evidence breaks the current model.
- Reassess architecture and patterns after 3 failed fix loops before user escalation.
