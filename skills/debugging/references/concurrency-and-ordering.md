# Concurrency And Ordering

Use this reference when the failure depends on races, scheduling, async interleaving, lock contention, stale reads, duplicate work, or out-of-order events.

Run this branch when timing and ordering facts matter more than a single straight-line code path.

1. Collapse the schedule where possible.

- Reproduce with reduced parallelism, fewer workers, or forced serialization.
- Record which concurrency level still fails.
- Use the simplest schedule that preserves the bug.

2. Capture the ordering facts.

- Log request IDs, task IDs, thread IDs, transaction IDs, and timestamps at the critical boundaries.
- Record lock acquisition, queue ordering, retries, and shared-state reads/writes when relevant.
- Build one timeline of the failing execution in `debug.md`.

3. Guard the shared state.

- Add temporary invariant checks around the suspected shared value, cache, queue, or lifecycle state.
- Use watchpoints, conditional breakpoints, or logpoints to catch the first illegal transition.
- Use `references/debugger-led-inspection.md` when record/replay, reverse debugging, or watchpoints can expose the race more directly.

4. Compare against a known-good ordering.

- Contrast passing and failing timelines.
- Find the first event ordering, missing synchronization, duplicate action, or stale observation that explains the divergence.
- Reduce the diagnosis to one transition that changed correctness.

## Rules

- Do not debug concurrency bugs as if they were stable straight-line failures.
- Prefer reduced concurrency and stronger observation over speculative synchronization fixes.
- Record the first bad ordering event or stale read, not just the crash or timeout that appears later.
