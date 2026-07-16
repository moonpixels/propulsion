# Performance Faults

Use this reference for latency, throughput, resource, query, or scale regressions. Measure a representative workload before selecting a profiler or changing code.

## Establish the regression

Define the workload, environment, expected threshold or known-good baseline, measured outcome, and variance that distinguishes the fault. Control input size, data shape, concurrency, cache state, runtime version, machine resources, and other material conditions. Warm up when the runtime requires it, repeat the measurement, and report the distribution rather than one timing.

When known-good and known-bad states exist, use automated **bisection** with the same stable classifier. Treat noisy or untestable states explicitly; route a flaky classifier through [Nondeterministic Faults](NONDETERMINISTIC.md) before trusting its boundary.

## Locate responsible work

After the controlled benchmark proves the regression, choose the smallest instrument that distinguishes the hypotheses:

| Suspected cost | Technique | Discriminating observation |
| --- | --- | --- |
| CPU or call-path work | Sampling or instrumenting profiler | The responsible stack or operation accounts for the measured difference. |
| Memory, allocation, I/O, lock, or network pressure | Resource counter or targeted trace | The relevant resource changes with the regression under the same workload. |
| Database work | Query plan and execution measurement | The plan, cardinality, I/O, lock, or execution step explains the difference. |
| Version or configuration change | Bisection or differential benchmark | The first ordered boundary preserves the same performance verdict. |

Record measurement overhead and side effects. Use transactions or inert fixtures when an execution plan can mutate data. Profile the controlled workload; a profile from a different workload does not explain the measured regression.

## Repair and verify

Make one minimal change to the responsible work. Remeasure the identical workload and controls, compare the result and variance with the original baseline, then run functional regression and repository checks. A faster result that changes behaviour, workload, or environment does not verify the repair.

If the measurement does not change as predicted, record the result and revert the attempt before revising the performance hypothesis.
