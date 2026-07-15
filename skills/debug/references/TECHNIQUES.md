# Debugging Techniques

Use this reference when the repeatable failing signal or next discriminating experiment is not obvious. Select the smallest applicable technique; combine techniques only when each settles a distinct question, then return to the main workflow.

## Tighten the Signal

Run the signal at least once and record its command or probe, input, expected verdict, and observed verdict. A useful signal is:

- **specific:** it reaches the relevant path and asserts the reported symptom, rather than merely completing without an error;
- **repeatable:** it records the fixture, environment, seed, order, schedule, or captured artefact needed to reproduce the verdict;
- **measurable:** it is deterministic, or reports failures per attempts for a non-deterministic fault;
- **tight:** it removes unrelated setup and runs quickly enough to guide the next experiment;
- **runnable:** the agent can execute it unattended when the environment permits; otherwise it uses repeatable captured evidence or a targeted external probe;
- **safe:** production artefacts are minimised, redacted, and handled within the user's permissions.

A passing retry does not turn an intermittent failure green; compare the measured failure rate under the same conditions.

## Construct a Signal

| Situation | Technique | Observable verdict and retained artefact |
| --- | --- | --- |
| A stable test seam reaches the fault | Focused failing test or minimal harness | Assert the exact behaviour and preserve the smallest fixture. If retained as regression coverage, `$tdd` remains authoritative. |
| The fault is at an HTTP boundary | HTTP request script | Assert the relevant status, body, and headers; retain a redacted request and response rather than relying only on process exit. |
| The fault is a CLI contract | CLI invocation with fixture input | Assert exit status, stdout, and stderr as applicable; record flags, working directory, and relevant environment. |
| The fault requires browser behaviour | Headless browser script | Assert the relevant DOM, console, request, or response outcome; retain the smallest trace or fixture that exposes the symptom. |
| Only a production request or event exposes the fault | Capture and replay | Capture the smallest safe request, event, trace, or payload and replay it at the nearest stable seam; retain correlation and environment context without secrets. |
| The bad input is unknown or combinatorial | Property or fuzz loop | State an executable invariant, preserve the seed and failing input, then minimise the counterexample before diagnosis. |
| The failure is intermittent | Repetition loop | Run the exact trigger repeatedly, report failures per attempts, and control time, randomness, order, load, and environment one dimension at a time. |
| The fault is concurrent | Controlled schedule or race probe | Prefer a recorded or systematic schedule and repository-supported race tooling. Use stress only to amplify and capture a failure, not to prove its absence. |
| The fault is performance | Benchmark loop | Define a representative workload and failing threshold; warm up, repeat, and report variance before profiling the same workload. |

## Select an Experiment

| Evidence | Experiment | Discriminating result |
| --- | --- | --- |
| A failing input, configuration, or sequence can be reduced | **Minimal reproducible example** or **delta debugging** | Remove partitions while preserving the exact verdict; the remaining elements bound the causal search space. |
| Known-good and known-bad states form an ordered space | **Binary search** or automated bisection | Use a stable good, bad, and untestable classifier across commits, versions, datasets, inputs, or configurations; record the first boundary found. |
| A comparable case works | **Differential testing** | Run the same input through both cases and isolate the smallest output, state, dependency, or configuration difference. Treat a difference as evidence to test, not proof by itself. |
| The symptom appears far from the bad value or action | **Backward causal tracing** | Follow the call and data flow from symptom to the earliest divergence, recording where the value entered and which invariant first failed. |
| The system crosses process or component boundaries | **Boundary instrumentation** | Record hypothesis-relevant input, output, state, configuration, timing, and correlation at the few boundaries that distinguish the candidates. |
| A value changes unexpectedly during execution | **Breakpoint**, **watchpoint**, or targeted trace | Pause at the earliest mutation or invariant violation and capture the responsible call path and state. |
| Timing, order, or scheduling is suspected | Controlled perturbation | Vary one timing, order, load, or scheduling dimension and compare the measured rate. Prefer waiting for observable conditions over guessed delays. |
| A controlled benchmark proves a regression | Profiler, query plan, or resource trace | Identify the work responsible for the measured difference before changing it; remeasure the identical workload after repair. |

An experiment is complete when its observation confirms or rejects a stated hypothesis. If it only produces more data, sharpen the prediction or choose a different experiment.

## Preserve Useful Evidence

- Promote a minimised reproducer to regression protection at the strongest stable seam when appropriate; keep `$tdd` authoritative for the test and repair cycle.
- Remove temporary instrumentation and throwaway harnesses after use, or retain them deliberately as documented diagnostics. Tag temporary probes so cleanup is mechanically checkable.
- Store only sanitised captures and fixtures that the repository is authorised to retain. Report external artefacts without copying sensitive data into the workspace.
