---
name: debugging
description: Analyze bugs, failing tests, flaky behavior, or unexpected output root-cause-first. Use when fixes should wait for evidence.
---

# Debugging

## Quick Start

```text
reproduce or capture failing evidence -> collect full error/stack + recent changes -> compare broken vs working -> trace to source -> state root-cause hypothesis -> add failing test when behavior changes -> make smallest fix at source -> verify original repro or failing case
```

## Required Order

- Reproduce first. If intermittent, capture failing evidence and narrow the conditions first. No fixes, guesses, or design advice before that.
- Gather evidence before proposing fixes: full error/stack, inputs, outputs, logs, failing path, recent changes.
- Compare broken vs working paths when possible; differences beat speculation.
- For multi-step systems, instrument boundaries between steps to find where reality diverges from expectation.
- Trace the failure to the source before editing; fix the source, not a downstream symptom.
- State the root-cause hypothesis before editing: `Hypothesis: X breaks because Y.`
- If behavior changes, add a regression test first; use `tdd` for the loop.
- Make the smallest fix that matches the evidence and hypothesis.

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
