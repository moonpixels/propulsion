# Flaky Failures

Use this reference when repeated runs do not produce the same result under the same intended conditions.

Work this branch after classification says the failure is flaky.

1. Prove the flake is real.

- Re-run the same reproduction enough times to show pass/fail variation.
- Record run count, fail count, seed, clock, order, and host facts in `debug.md`.
- Keep one exact command or path even if the result is intermittent.

2. Remove hidden state and scheduling noise.

- Freeze time, timezone, locale, random seed, and dependency versions.
- Serialize the workload or test if parallelism may hide the signal.
- Clear caches, temp files, queues, shared fixtures, and reused process state.
- Compare isolated single-run behavior against suite or parallel behavior.

3. Capture what changes between runs.

- Record which input, order, timing window, machine, or dependency state differs.
- Add logpoints or trace markers around suspected shared-state and ordering boundaries.
- Keep broken and passing traces so you can diff the first divergence.

4. Force the branch narrower.

- Reduce the test or execution path until the flake becomes easier to trigger or reason about.
- Remove unrelated concurrency, retries, and background work one variable at a time.
- If a deterministic reduced case appears, switch back to the core loop with that reproduction.

5. Escalate to stronger observation when needed.

- Use `references/debugger-led-inspection.md` when conditional breakpoints, watchpoints, logpoints, or record/replay can capture the ordering change precisely.
- Use `references/concurrency-and-ordering.md` when the flake depends on races, shared state, or cross-thread ordering.

## Rules

- Treat flaky as a real failure class, not as "cannot reproduce".
- Do not average away the signal with broad reruns that record no per-run evidence.
- Record what changed between passing and failing runs before theorizing broadly.
- If three experiments fail to make the flake more observable, stop, record the dead ends, and question the framing.
