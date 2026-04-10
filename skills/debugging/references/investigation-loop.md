# Investigation Loop

Use this reference to drive the diagnosis-first investigation loop in `debugging`.

Work the loop in this order and keep notes in `debug.md` as you go.

1. Capture the exact symptom.

- Record the exact error text, stack trace, failing assertion, or visible wrong behavior.
- Record where it happens: local, CI, production, one machine, one dataset, one tenant, or one user path.
- Record the code revision, branch, artifact version, runtime, flags, config, inputs, and any time, locale, or seed facts that could matter.
- For deterministic functional failures, say so explicitly. Do not treat a reproducible wrong output as a special branch; it still follows this core loop.

2. Freeze the environment and reproduce.

- Reduce moving parts until you have one command, script, or exact manual path that reproduces the issue, or an explicit flaky classification.
- Freeze inputs, config, seed, time, timezone, locale, feature flags, and dependency versions where relevant.
- Re-run enough times to classify the failure: deterministic, flaky, regression after a known change, performance, environment/config mismatch, data-dependent, concurrency/ordering, or multi-component boundary failure.
- If the issue is flaky, record what changes between runs instead of pretending the failure is deterministic.

When a special class is identified, branch immediately to the matching focused reference and keep the result in the same `debug.md` artifact:

- Flaky: `references/flaky-failures.md`
- Regression window exists: `references/regression-isolation.md`
- Performance or resource failure: `references/performance-failures.md`
- Environment or config mismatch: `references/environment-and-config.md`
- Data-dependent failure: `references/data-dependent-failures.md`
- Concurrency or ordering bug: `references/concurrency-and-ordering.md`
- Multi-component boundary failure: `references/multi-component-boundaries.md`

3. Minimize the failing case immediately.

- Strip unrelated setup, fixtures, dependencies, flags, and data until the smallest practical failing case remains.
- Shrink the system under test from end-to-end toward integration or unit scope when that preserves the same failure.
- Remove one variable at a time so you know which reductions preserve the bug.
- Keep the reduced case anchored to the original symptom. If the symptom changes, note that you changed the problem.

4. Isolate the failing boundary and any good/bad window.

- Identify the first component, layer, or boundary where observed behavior changes from expected to wrong.
- In multi-step systems, inspect ingress and egress at each boundary so you can see where the signal diverges.
- If the bug used to work, find the nearest known-good and known-bad variants: commit, build, config, dataset, input, or environment.
- If a credible good/bad history window exists, isolate it now. Use regression isolation before reading more code.

5. Compare the broken path against a known-good counterpart.

- Compare broken vs working inputs.
- Compare broken vs working environment and config.
- Compare broken vs working code path, trace, or boundary outputs.
- Do not dismiss small differences early. The first real difference often is the diagnosis.

6. Inspect with observation-first tools before editing logic.

- Start with existing logs, traces, crash dumps, and other already-recorded evidence.
- Add temporary structured logs or logpoints when you need more visibility without changing control flow.
- Use conditional breakpoints, watchpoints, frame inspection, and post-mortem debugging when the value or transition must be observed precisely.
- Use record/replay or reverse debugging when the symptom appears late, intermittently, or under concurrency.
- Use these tools while tracing backward from the late symptom to the earliest bad state. See `references/debugger-led-inspection.md` when you need detail.

7. Trace backward to the first bad state.

- Start at the observed symptom and ask: what is wrong right now?
- Then ask: when did it first become wrong?
- Find the last known-good state for the same value, request, process, or execution path.
- Identify the transition that changed the system from good to bad.
- Keep tracing backward until you can explain the earliest bad state or first meaningful divergence, not just the place where the symptom became visible.

8. Rank hypotheses and run one discriminating experiment.

- Keep a short ranked list: primary hypothesis, strongest alternative, and unexplained evidence.
- For the next experiment, write the expected result before running it.
- Prefer the smallest discriminating experiment: one that separates competing explanations, not just one that is convenient.
- Change one variable at a time. Prefer observation over mutation when observation can answer the question.
- After the result, update the ranking, record eliminated alternatives, and repeat only if the search space is smaller or certainty is higher.

Use this experiment format:

- Hypothesis: `<suspected root cause or first bad transition>`
- Why it is plausible: `<evidence that points here>`
- Strongest alternative: `<next best explanation>`
- Experiment: `<single probe, breakpoint, reduced repro, trace diff, or other discriminating step>`
- Expected result: `<what outcome would support the hypothesis>`
- Result: `<observed outcome>`
- Conclusion: `<supported | disproved | still unclear>`

## Rules

- Use this reference to keep the investigation evidence-first and diagnosis-first.
- Every action must either increase certainty or reduce search space.
- Minimize before theorizing broadly; smaller failures are easier to localize.
- Trace backward to the first bad state or first meaningful divergence. Do not stop at the late symptom.
- Keep hypotheses ranked, but only run one discriminating experiment at a time.
- Use debugger-led inspection and instrumentation only to gather evidence. Do not drift into fix implementation here.
