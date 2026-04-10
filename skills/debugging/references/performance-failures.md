# Performance Failures

Use this reference when the failure is latency, throughput, memory, CPU, I/O, or resource-growth related.

Work this branch after the core loop captures one stable workload and one observable metric.

1. Define the performance symptom precisely.

- Record the workload, metric, threshold, and baseline in `debug.md`.
- Separate regression from chronic slowness if history exists.
- State whether the problem is latency, throughput, memory, CPU, lock contention, I/O wait, or another resource symptom.

2. Reduce to one workload and one bottleneck question.

- Remove unrelated traffic, features, and background jobs.
- Freeze dataset size, flags, dependency versions, and hardware facts that affect measurement.
- Compare one slow run against one good run when possible.

3. Profile or trace before proposing optimizations.

- Start with existing metrics, traces, and profilers.
- Identify the hottest callsite, slowest span, blocking dependency, largest allocation, or longest queue wait.
- Use targeted instrumentation only when the existing profile is insufficient.

4. Trace backward to the first meaningful slowdown.

- Find the first boundary where time, allocation, or contention sharply diverges.
- Compare good and bad traces to isolate the first expensive transition.
- Use `references/multi-component-boundaries.md` when latency crosses services or processes.

5. Record the mechanism, not just the hotspot.

- Explain why that hotspot became expensive: extra work, wrong algorithm, repeated retries, missing cache, lock contention, N+1, oversized payload, or similar mechanism.
- Capture the fix constraints needed to verify the eventual change against the same workload and metric.

## Rules

- Do not guess at optimizations without a profile, trace, or equivalent evidence.
- Keep one primary workload and metric until the diagnosis is grounded.
- A hotspot alone is not enough; prove the first slowdown mechanism or boundary.
