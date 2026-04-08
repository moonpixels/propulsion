---
name: debugging
description: Analyze bugs, failing tests, flaky behavior, or unexpected output root-cause-first. Use when fixes should wait for evidence.
---

# Debugging

## Quick Start

```text
reproduce or capture failing evidence -> collect full error/stack + recent changes -> compare broken vs working -> trace to source -> state root-cause hypothesis -> if behavior must change, hand off to `tdd` for the regression-test-first fix -> verify original repro or failing case
```

## Required Order

- When the cause is unknown, `debugging` is the required first route. Do not jump straight to `tdd` or a fix.
- Reproduce first. If intermittent, capture failing evidence and narrow the conditions first. No fixes, guesses, or design advice before that.
- Gather evidence before proposing fixes: full error/stack, inputs, outputs, logs, failing path, recent changes.
- Compare broken vs working paths when possible; differences beat speculation.
- For multi-step systems, instrument boundaries between steps to find where reality diverges from expectation.
- Trace the failure to the source before editing; fix the source, not a downstream symptom.
- State the root-cause hypothesis before editing: `Hypothesis: X breaks because Y.`
- After an evidence-backed diagnosis, behavior changes should add a regression test first and use `tdd` for the loop.
- If the fix does not change behavior, make the smallest fix that matches the evidence and hypothesis. Otherwise stop after diagnosis and hand off to `tdd`.

## Red Flags

- “Let me try a quick fix first.”
- “It’s probably X.”
- Multiple edits before one clear hypothesis.
- Fixing a symptom because the source is unclear.
- Stacking another fix onto a failed hypothesis.

If any appear: stop, return to reproduction and evidence.

## Verification

- Re-run the original reproduction or captured failing case after the fix.
- Re-run the new or updated regression test.
- Confirm the fix addresses root cause, not just the visible symptom.
- If the hypothesis fails, say so, do not stack another fix onto it, collect new evidence, and form a new one.
