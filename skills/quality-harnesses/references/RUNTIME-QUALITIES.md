# Runtime Qualities

## Performance and load

Start from an authoritative budget, SLO, pre-change baseline, or concrete regression risk. Use a representative workload, data scale, concurrency, cache state, warm-up, duration, repetitions, and environment. Assert behavioural correctness during the measurement; a fast wrong result is not evidence.

Preserve distributions and tail values rather than one average, variance and outlier policy, resource consumption, baseline revision, tool overhead, and environmental noise. Compare like with like and rerun enough to distinguish a material effect from noise. Inspect reduced workloads, changed data, warmed caches, hidden retries, omitted errors, and thresholds moved after seeing results.

A clean local benchmark supports only the exercised workload and environment. It does not establish production tail latency, capacity, contention, cost, or scalability beyond measured ranges.

## Concurrency and ordering

Name the invariant and realistic failure: duplicate effect, lost update, stale read, reordered event, deadlock, starvation, cancellation leak, retry amplification, or broken idempotency. Use existing race detection, deterministic schedule exploration, model checking, controlled interleavings, or seeded stress at the narrowest boundary that retains the shared state and transaction semantics at risk.

Assert final outcomes, intermediate invariants where observable, and absence of duplicate or missing effects; do not rely only on no crash. Confirm that the intended scenario and its relevant execution count are non-empty. Preserve the schedule or seed and environment details only when material to interpretation or reproduction. Inspect accidental serialization, mocks that remove shared state, selectors that match zero cases, disabled detectors, swallowed task errors, and retries that mask nondeterminism.

A bounded clean run supports only its exercised schedules and environment. Stress cannot prove race freedom. When production-like scheduling or specialist concurrency assessment is unavailable, record the remaining failure mode rather than increasing an arbitrary iteration count.

## Resilience and fault injection

State an explicit hypothesis: which dependency or resource fails, how the system should degrade or recover, what state must remain safe, and what users or operators observe. Use a safe isolated boundary with an existing fault mechanism and current observability. Establish steady state, inject the fault, confirm it actually occurred, assert degradation and recovery outcomes, remove the fault, and verify cleanup and restored state.

Record fault type, timing, duration, affected calls or nodes, environment, observability signals, recovery window, data invariants, retries, and residual effects. Inspect no-op injection, fallbacks that bypass the target, hidden retries, insufficient blast-radius controls, missing recovery oracle, and cleanup failures.

One successful experiment cannot enumerate production combinations or prove rollout readiness. Release, deployment, rollback execution, and production monitoring remain with their owning workflows.
