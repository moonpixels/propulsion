# Debugging Techniques

Use this reference when the repeatable failing signal or next discriminating experiment is not obvious. Identify the runtime situation, select the smallest technique that predicts a discriminating observation, retain its evidence, then return to the scientific-debugging loop. Combine techniques only when each settles a distinct question.

## Tighten the Signal

Run the signal at least once and record its command or probe, input, environment, expected verdict, and observed verdict. A useful signal is:

- **specific:** it reaches the relevant path and asserts the reported symptom, rather than merely completing without an error;
- **repeatable:** it records the fixture, environment, seed, order, schedule, or captured artefact needed to reproduce the verdict;
- **measurable:** it is deterministic, or reports failures per attempts for a nondeterministic fault;
- **tight:** it removes unrelated setup and runs quickly enough to guide the next experiment;
- **runnable:** the agent can execute it unattended when the environment permits; otherwise it uses repeatable captured evidence or a targeted external probe;
- **safe:** production artefacts are minimised, redacted, and handled within the user's permissions.

A passing retry does not turn an intermittent failure green. Use [Nondeterministic Faults](NONDETERMINISTIC.md) to control and compare the measured failure rate.

## Construct a Signal

| Situation | Technique | Observable verdict and retained artefact |
| --- | --- | --- |
| A stable test seam reaches the fault | Focused failing test or minimal harness | Assert the exact behaviour and preserve the smallest fixture. If retained as regression coverage, `$tdd` remains authoritative. |
| The fault is at an HTTP boundary | HTTP request script | Assert the relevant status, body, and headers; retain a redacted request and response rather than relying only on process exit. |
| The fault is a CLI contract | CLI invocation with fixture input | Assert exit status, stdout, and stderr as applicable; record flags, working directory, and relevant environment. |
| Only a production request or event exposes the fault | Capture and replay | Use [Boundary Evidence](BOUNDARY-EVIDENCE.md) to capture the smallest authorised event and assess replay fidelity. |
| The bad input is unknown or combinatorial | Property or fuzz loop | State an executable invariant, preserve the seed and failing input, then minimise the counterexample before diagnosis. |
| The failure is intermittent, order-dependent, concurrent, or timing-sensitive | Repetition, race detector, or controlled schedule | Use [Nondeterministic Faults](NONDETERMINISTIC.md) to measure the rate, partition nondeterminism, and capture a causal execution. |
| The fault crosses components or environments | Correlated boundary probe | Use [Boundary Evidence](BOUNDARY-EVIDENCE.md) to observe only the boundaries that distinguish the hypotheses. |
| The fault is performance | Controlled benchmark | Use [Performance Faults](PERFORMANCE.md) to establish a representative baseline and threshold before profiling. |
| The fault requires browser behaviour | Headless browser assertion or trace | Assert the relevant DOM, accessibility, console, request, response, screenshot, or timing outcome; retain the smallest trace and fixture. Use a structured human-in-the-loop transcript only when automation cannot perform or observe the essential step. |

## Select an Experiment

| Evidence | Experiment | Discriminating result |
| --- | --- | --- |
| A failing input, configuration, or sequence can be reduced | **Minimal reproducible example** or **delta debugging** | Remove partitions while preserving the exact verdict; the remaining elements bound the causal search space. |
| Known-good and known-bad states form an ordered space | **Binary search** or automated bisection | Use a stable good, bad, and untestable classifier across commits, versions, datasets, inputs, or configurations; record the first boundary found. |
| A comparable case works | **Differential testing** | Run the same input through both cases and isolate the smallest output, state, dependency, or configuration difference. Treat a difference as evidence to test, not proof by itself. |
| The symptom appears far from the bad value or action | **Backward causal tracing** | Follow the call and data flow from symptom to the earliest divergence, recording where the value entered and which invariant first failed. |
| The system crosses process or component boundaries | **Boundary instrumentation** | Follow [Boundary Evidence](BOUNDARY-EVIDENCE.md) and record hypothesis-relevant observations at the few boundaries that distinguish the candidates. |
| A value changes unexpectedly during execution | **Breakpoint**, **watchpoint**, or targeted trace | Pause at the earliest mutation or invariant violation and capture the responsible call path and state. |
| Timing, order, or scheduling is suspected | Controlled perturbation | Follow [Nondeterministic Faults](NONDETERMINISTIC.md) and vary one dimension while comparing the measured rate or captured schedule. |
| A controlled benchmark proves a regression | Profiler, query plan, or resource trace | Follow [Performance Faults](PERFORMANCE.md), identify the responsible work, and remeasure the identical workload after repair. |

An experiment is complete when its observation confirms or rejects a stated hypothesis. If it only produces more data, sharpen the prediction or choose a different experiment.

## Preserve Useful Evidence

- Promote a minimised reproducer to regression protection at the strongest stable seam when appropriate; keep `$tdd` authoritative for the test and repair cycle.
- Remove temporary instrumentation and throwaway harnesses after use, or retain them deliberately as documented diagnostics. Tag temporary probes so cleanup is mechanically checkable.
- Store only sanitised captures and fixtures that the repository is authorised to retain. Report external artefacts without copying sensitive data into the workspace.
- Preserve the original reproduction across repair attempts. When a repair fails its prediction, retain the observation but revert the attempt before testing the next hypothesis.
