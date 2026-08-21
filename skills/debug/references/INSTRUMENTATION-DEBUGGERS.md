# Instrumentation and Debuggers

Use this reference when existing evidence cannot distinguish the active hypotheses. Tools are probes for a stated question, not the debugging method itself. The result is the smallest new observation that changes the causal model.

## Select the probe

Choose the instrument whose observation matches the question:

| Question | Probe |
| --- | --- |
| Which local state or branch first violates an invariant? | Conditional breakpoint, watchpoint, or stack inspection |
| Where does one request cross a process or service boundary? | Correlated logs, metrics, trace, or narrow state endpoint |
| Which operation consumes CPU, memory, I/O, locks, or time? | Matching profiler, counter, or targeted runtime trace |
| Does a known fault class occur? | Repository-supported detector such as a race, memory, or query diagnostic |

Place the fewest probes at boundaries, decisions, and state transitions that partition the hypotheses. Capture only the needed input, output, identity, correlation, time, and environment. Establish measurement overhead when the probe can affect the signal.

## Preserve the evidence boundary

Pausing can invalidate real-time or concurrent behaviour; logging can change timing; profiles are samples; multiple diagnostic tools can interfere. Prefer non-stopping tracepoints or record/replay only when the project and platform support them.

Do not log credentials, tokens, keys, connection strings, or unnecessary personal data. Follow project retention and access rules, and keep production systems read-only. Tag temporary probes so they can be found and removed.

Stop when the observation supports, rejects, or fails to discriminate the active hypotheses. Remove owned probes and sensitive captures after use, or retain a diagnostic deliberately within project authority. If the probe only produces more undirected data, sharpen the prediction before adding another.
