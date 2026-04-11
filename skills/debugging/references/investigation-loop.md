# Investigation Loop

Use this reference to keep `debugging` aligned with systematic, evidence-first bug resolution.

Work the loop in this order and keep `debug.md` current after each step.

1. Reproduce and stabilise.

- Capture the exact symptom, failing assertion, wrong output, or visible bad behaviour.
- Freeze the environment facts that matter: revision, runtime, flags, config, inputs, time, locale, dataset, and scope.
- Reduce moving parts until one command, script, or exact manual path reproduces the issue, or classify it explicitly as flaky.

2. Reduce the case.

- Minimise setup, fixtures, services, flags, and data while preserving the same symptom.
- Prefer the smallest practical failing case. This follows the delta-debugging idea: remove variables until the bug survives in less space.
- If the symptom changes, record that you changed the problem.

3. Isolate the first bad boundary.

- Compare broken versus working inputs, environments, traces, or outputs.
- Find the first component, layer, handoff, or state transition where the signal changes from good to bad.
- If a good/bad history window exists, isolate it before broad code reading. Diff debugging beats guessing.

4. Diagnose with one ranked hypothesis at a time.

- Keep a short list: current best hypothesis, strongest alternative, and unexplained evidence.
- Run one discriminating experiment at a time and record the expected result first.
- Trace backward from the late symptom to the earliest explainable bad state or divergence.
- Use existing logs, traces, dumps, breakpoints, logpoints, watchpoints, and debugger-led inspection before mutating logic.

5. Gate the fix.

- Do not choose a fix until the diagnosis explains the first bad state or divergence, not just the late symptom.
- Record one chosen fix hypothesis, the falsifier, and fix constraints in `debug.md`.
- If the evidence no longer fits, reset the diagnosis instead of pushing through.

6. Verify the fix loop result.

- If a dispatched fix attempt fails verification or contradicts the diagnosis, return to step 1 or 2 with the new evidence.
- After 3 failed fix loops, escalate to the user with the failed loops summarised in `debug.md`.

Use these narrowing moves when the failure clearly fits one:

- Flaky: prove pass/fail variation, freeze time/seed/order, and record what changes between runs before theorising.
- Regression window exists: isolate the smallest credible good/bad window and bisect it before broad code reading.
- Performance or resource failure: record the failing threshold, compare against a good baseline, and isolate the slow or wasteful boundary before proposing a fix.
- Environment or config mismatch: compare broken versus working runtime, flags, and config propagation at each boundary.
- Data-dependent failure: shrink to the smallest failing input, stored state, or fixture that still produces the same symptom.
- Concurrency or ordering bug: serialise the workload when possible, add logpoints or watchpoints, and capture the first ordering change that makes good turn bad.
- Multi-component boundary failure: inspect ingress and egress at each handoff until the first bad boundary is visible.

## Rules

- Reproduce before theorising.
- Reduce before widening the search.
- Isolate before fixing.
- One hypothesis, one experiment, one fix at a time.
- Reset immediately when verification or evidence breaks the current model.
