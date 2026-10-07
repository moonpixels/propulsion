# Nondeterministic and concurrent faults

Read as soon as the signal depends on timing, order, randomness, load or shared state. Seek a replayable failing execution or a controlled failure rate. One passing retry does not verify a repair. Examples are illustrative.

## Measure and partition

Repeat the original trigger and record failures per attempts. Preserve the seed, test order, clock, state, workload, concurrency and any captured schedule. Use the same controls for comparisons. Choose repetitions sufficient for the claim instead of adopting a universal failure-rate threshold.

Vary the likely dimension that distinguishes current hypotheses.

| Suspected dependence      | Discriminating experiment                                             |
| ------------------------- | --------------------------------------------------------------------- |
| Random input              | Replay the seed or sweep a bounded input family                       |
| Test order                | Run suspect sequences from clean state, then remove sequence elements |
| Shared mutable state      | Correlate readers and writers, force the suspected interleaving       |
| Completion ordering       | Observe the producer's actual completion and committed result         |
| Time                      | Control the clock and the relevant deadline through existing tooling  |
| Load or resource pressure | Hold workload shape constant and vary the suspected pressure          |

Stress and injected delays can amplify a failure enough to capture it. Preserve the resulting invariant violation or schedule. Logging, debugger pauses and reduced parallelism can hide the original timing. Record probe effects and verify under the original controls too.

A race detector identifies the fault classes and paths it observes. A clean run does not exclude logical event-order faults or every schedule. Prefer repository-supported tooling and account for its overhead.

## Worked example, lost updates

Two workers maintain independent progress counters through one JSON state file. Both read the file, update their own field and write the whole object. The contract requires both counters to survive concurrent completion.

```text
Initial state: {"a": 0, "b": 0}
Forced schedule:
  A reads {"a": 0, "b": 0}
  B reads {"a": 0, "b": 0}
  A writes {"a": 1, "b": 0}
  B writes {"a": 0, "b": 1}
Observed: A's progress disappears.
```

Use a barrier in the existing local harness to expose this schedule. Compare it with sequential completion, then trace every writer. Longer sleeps can change the likelihood without removing the read-modify-write race.

Determine whether the product needs one canonical object. If the counters are independent facts, separate owned state can remove shared mutation and locking work. If a canonical object is a real invariant, the repair needs structural atomicity or synchronisation. Pass this requirement and the preserved schedule to `implement`. Verify both the controlled execution and repeated original workload, with failure counts and uncertainty.

## Worked example, readiness or an incorrect lifecycle

A test sometimes reads an empty output array after waiting 50 ms. Observe the job's completion event, the committed output and their order.

```text
H1: The test reads before valid completion.
H2: The job announces completion before committing its output.

Observe output at the completion event:
  committed output is present -> supports H1
  event precedes commit -> supports H2
```

For H1, use an existing completion promise, event or bounded condition wait. Observe fresh state and report a deadline failure. For H2, waiting longer hides a broken lifecycle contract. Investigate the completion owner instead. Tests of real debounce or expiry intervals need controlled time and their intended timing assertions, rather than an unrelated readiness poll.

## Order-dependent pollution

A test passing alone can still fail after another test leaves a listener, file, port or global behind. Preserve the failing order. Reduce the sequence against the exact failure, resetting initial state consistently between trials. Running each test individually cannot exclude a multi-test interaction. Locate the producer of the residual state and compare setup and teardown with a working owner.
