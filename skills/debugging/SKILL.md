---
name: debugging
description: Debugs bugs, failing tests, flaky behavior, and unexpected output by finding root cause before fixing. Use when the cause is unknown and fixes should wait for evidence.
---

# Debugging

Reproduce first. Guessing is not debugging.

## Quick Start

```text
reproduce or capture failing evidence -> gather facts -> compare broken vs working -> trace to source -> state one hypothesis -> fix only if evidence supports it -> verify the original repro
```

## Use When

- The cause is unknown.
- A test fails and the reason is not yet clear.
- Behavior is flaky or output is unexpected.
- A fix would be guesswork without evidence.

## Core Loop

- When the cause is unknown, `debugging` is the required first route. Do not jump straight to `tdd` or a fix.
- Reproduce first. If intermittent, capture failing evidence and narrow the conditions first. No fixes, guesses, or design advice before that.
- Gather evidence before proposing fixes: full error/stack, inputs, outputs, logs, failing path, recent changes.
- Compare broken vs working paths when possible; differences beat speculation.
- For multi-step systems, instrument boundaries between steps to find where reality diverges from expectation.
- Trace the failure to the source before editing; fix the source, not a downstream symptom.
- State the root-cause hypothesis before editing: `Hypothesis: X breaks because Y.`
- After an evidence-backed diagnosis, behavior changes should add a regression test first and use `tdd` for the loop.
- If the fix does not change behavior, make the smallest fix that matches the evidence and hypothesis. Otherwise stop after diagnosis and hand off to `tdd`.

## Guardrails

- Do not jump straight to a fix.
- Do not stack edits onto a failed hypothesis.
- Do not fix symptoms because the source is unclear.
- If you hear yourself saying "It is probably X," go back to evidence.

## Exit

- Re-run the original reproduction or captured failing case after the fix.
- Re-run the new or updated regression test.
- Confirm the fix addresses root cause, not just the visible symptom.
- If the hypothesis fails, say so, do not stack another fix onto it, collect new evidence, and form a new one.
