# Performance and Resource Faults

Use this reference when the defect is latency, throughput, CPU, memory, allocation, I/O, contention, queueing, exhaustion, leakage, query cost, or scale behaviour. The result is a measured causal connection between responsible work and the original user-visible regression.

## Establish a representative signal

Define the workload, environment, known-good baseline or expected threshold, warm-up, measurement interval, repetitions, and distribution that distinguishes the fault. Control input size and shape, concurrency, cache state, runtime version, machine resources, data volume, and other material conditions. Route a noisy classifier through nondeterministic guidance before trusting it.

For early systemic triage, inspect utilization, saturation, and errors for each relevant resource. Then choose the measurement that matches the suspected cost:

| Suspected cost                        | Evidence                                                        |
| ------------------------------------- | --------------------------------------------------------------- |
| CPU or call-path work                 | Sampling or instrumenting profile under the controlled workload |
| Memory or allocation                  | Heap, allocation, retention, or growth measurement              |
| I/O, network, queue, or lock pressure | Resource counter and targeted trace                             |
| Database execution                    | Actual plan, cardinality, I/O, locks, and query timing          |
| Version or configuration regression   | Stable differential benchmark or change bisection               |

Connect the hotspot, plan, wait, saturation, or growth to the user-visible signal through a controlled workload or intervention. A hotspot is where cost was observed, not automatically why the system is slow.

## Verify like with like

Record measurement overhead and production cost. Long averages can hide bursts, profiles are samples, and one constrained resource can be traded for another.

After one causal repair, rerun the identical workload and controls. Compare the full relevant distribution and low-level causal metric, then run functional regression evidence. Stop only when both move as predicted under the original representative workload. A faster result obtained by changing behaviour, workload, environment, or measurement does not verify the repair.
