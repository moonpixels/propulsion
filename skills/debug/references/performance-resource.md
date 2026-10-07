# Performance and resource faults

Read as soon as the symptom concerns latency, throughput, CPU, memory, I/O, contention, queueing, leakage, exhaustion or cost. Connect the responsible work or wait to the user's measured regression. Examples are illustrative.

## Establish comparable measurements

Define the intended threshold or trustworthy baseline, full workload, input scale and shape, environment, warm-up, cache state, concurrency, measurement interval and repetitions. Inspect the harness. Confirm that it counts errors, validates correct output and includes actual completed work in the measured region.

A fast rejection, unconsumed generator, unawaited promise or cache bypass can produce a plausible number for work that never happened. A small fixture can select a different database plan or avoid the production pressure. Preserve these fidelity limits.

Compare repeated runs under equivalent conditions. Interleave baseline and candidate when drift matters. Report the relevant distribution and variation, not only a mean. A difference within noise is inconclusive. Separate diagnostic profiles from comparable timing runs when profiler overhead matters.

## Find the limiter

Use the **USE method**, utilisation, saturation and errors, to triage relevant resources. Then select evidence that answers the active hypothesis.

| Suspected cost                      | Useful evidence                                                     |
| ----------------------------------- | ------------------------------------------------------------------- |
| CPU work                            | Call-path profile under the representative workload                 |
| Waiting, queueing or contention     | Off-CPU trace, queue depth, lock or resource counters               |
| Memory growth                       | Allocation profile and retaining paths across equivalent lifecycles |
| Database work                       | Actual query plan, cardinalities, I/O, waits and query counts       |
| Version or configuration regression | Matched benchmark or trustworthy change bisection                   |

A hotspot identifies where sampled work occurs. It does not automatically explain end-to-end latency. A caller can generate unnecessary work, a load generator can saturate before the server, and a fast CPU path can spend most wall time waiting elsewhere. Connect the proposed mechanism to both a low-level observation and the original user-visible measure.

Before adding caches, concurrency or cheaper machinery, test whether the work is needed, repeated unnecessarily or performed too often. Removing unused work is the first candidate when the supported contract permits it. Preserve output, ordering and required timing.

## Worked example, delete the unused pass

An export is slow for large inputs. Its contract requires one complete ordered CSV. A profile locates repeated serialisation.

```text
Baseline workload: same records, release build, same cache and concurrency.
Observed: formatRows(records) runs twice.
Data flow: first result is discarded, second is written.

Hypothesis: the unused first pass causes the added CPU work and latency.
Experiment: remove only that pass in a disposable local run.
Predict: one serialisation, identical CSV, reduced end-to-end latency.
Falsifier: one serialisation remains slow because another limiter dominates.
```

Trace callers and effects to establish that the first pass owns no required work. Count serialisations and validate the full CSV, then measure complete unprofiled exports under the original controls. If work falls but latency does not, preserve that result and investigate the remaining limiter. Do not report the regression fixed from a faster helper alone. Pass the causal deletion and verification obligations to `implement` when supported.

## Worked example, retained objects or a leak

Opening and closing a panel repeatedly increases memory. Compare snapshots at the same lifecycle point after the same cycles and collection conditions. Follow growing objects' retaining paths to their owners.

```text
Observation: detached panel nodes remain after close.
Retaining path: global event listener -> closure -> panel.
Comparator: another panel unregisters its listener during teardown.
Prediction: matching ownership and teardown removes that retaining path.
```

Growth alone can be caching or delayed collection. Console inspection can itself retain objects, and a snapshot can perturb collection. Test the lifecycle and retaining path, then repeat the original cycles and user-visible resource observation. One smaller snapshot at a different stage does not verify a repair.

## Verify the actual regression

After the causal repair, rerun the same workload and controls. Check both the relevant causal metric and the end-to-end outcome, with functional correctness and errors. Report repetitions, distribution, remaining variation and fidelity gaps. If an environment or capture boundary prevents the original comparison, verification remains incomplete.
