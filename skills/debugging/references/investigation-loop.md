# Investigation Loop

Use this reference to keep `debugging` aligned with systematic, evidence-first bug resolution.

## Iron Law

No fixes before grounded root-cause investigation. Do not choose a fix hypothesis, dispatch production-code work, or edit production code until the evidence explains the earliest bad state or divergence. Temporary diagnostic edits are allowed only when recorded in `debug.md`, used for investigation, and reverted before fix handoff.

Work the loop in this order and keep `debug.md` current after each step.

1. Reproduce and stabilise.

- Capture the exact symptom, failing assertion, wrong output, or visible bad behaviour.
- Read the failure fully: full error, stack, warning, assertion, logs, exit code, and first meaningful frame before summarising.
- Freeze the environment facts that matter: revision, runtime, flags, config, inputs, time, locale, dataset, and scope.
- Reduce moving parts until one command, script, or exact manual path reproduces the issue, or classify it explicitly as flaky.

2. Scan recent changes.

- Check recent changes before broad code reading: working tree diff, staged diff, recent commits, dependencies, config changes, environment changes, CI changes, and runtime drift.
- Record the smallest credible good/bad window when one exists.
- Treat drift as evidence, not a diagnosis, until tied to the reproduced symptom.

3. Reduce the case.

- Minimise setup, fixtures, services, flags, and data while preserving the same symptom.
- Prefer the smallest practical failing case. This follows the delta-debugging idea: remove variables until the bug survives in less space.
- If the symptom changes, record that you changed the problem.

4. Compare working examples.

- When applicable, compare against a working example, reference implementation, adjacent passing test, prior release, documented sample, or known-good trace.
- Record the first meaningful divergence between broken and working paths.
- If no useful working example exists, record why.

5. Isolate the first bad boundary.

- Compare broken versus working inputs, environments, traces, or outputs.
- Find the first component, layer, handoff, or state transition where the signal changes from good to bad.
- Trace boundary data explicitly: ingress, egress, config propagation, and state at each component handoff.
- If a good/bad history window exists, isolate it before broad code reading. Diff debugging beats guessing.

6. Diagnose with one ranked hypothesis at a time.

- Keep a short list: current best hypothesis, strongest alternative, and unexplained evidence.
- Run one discriminating experiment at a time and record the expected result first.
- Trace backward from the late symptom to the earliest explainable bad state or divergence.
- Use existing logs, traces, dumps, breakpoints, logpoints, watchpoints, and debugger-led inspection before mutating logic.

7. Gate the fix.

- Do not choose a fix until the diagnosis explains the first bad state or divergence, not just the late symptom.
- Record one chosen fix hypothesis, the falsifier, and fix constraints in `debug.md`.
- If the evidence no longer fits, reset the diagnosis instead of pushing through.

8. Verify the fix loop result.

- If a dispatched fix attempt fails verification or contradicts the diagnosis, return to step 1 or 2 with the new evidence.
- After 3 failed fix loops, reassess architecture and patterns before user escalation, then escalate with the failed loops and reassessment summarised in `debug.md`.

Use these narrowing moves when the failure clearly fits one:

- Flaky: prove pass/fail variation, freeze time/seed/order, and record what changes between runs before theorising.
- Regression window exists: isolate the smallest credible good/bad window and bisect it before broad code reading.
- Performance or resource failure: record the failing threshold, compare against a good baseline, and isolate the slow or wasteful boundary before proposing a fix.
- Environment or config mismatch: compare broken versus working runtime, flags, and config propagation at each boundary.
- Data-dependent failure: shrink to the smallest failing input, stored state, or fixture that still produces the same symptom.
- Concurrency or ordering bug: serialise the workload when possible, add logpoints or watchpoints, and capture the first ordering change that makes good turn bad.
- Multi-component boundary failure: inspect ingress and egress at each handoff until the first bad boundary is visible.

## Rules

- No fixes before grounded root-cause investigation.
- Reproduce before theorising.
- Read the full error before summarising.
- Scan recent changes before widening the search.
- Reduce before widening the search.
- Isolate before fixing.
- Compare against a working example or reference when applicable.
- Trace ingress, egress, config propagation, and state at each component handoff.
- One hypothesis, one experiment, one fix at a time.
- Reset immediately when verification or evidence breaks the current model.
- Reassess architecture and patterns after 3 failed fix loops before escalating to the user.
