# Debugger-Led Inspection

Use this reference when `investigation-loop.md` needs observation-first inspection to locate the first bad state without editing production logic.

Use these tools after reproduction and reduction are stable, and while you are tracing backward from the symptom to the first meaningful divergence.

1. Start with the least invasive observation that can answer the question.

- Existing logs, traces, dumps, and metrics come first.
- Temporary logpoints or structured probes come next when you need one more observable boundary.
- Conditional breakpoints beat broad stop-every-line stepping when you know the state shape to watch for.

2. Match the tool to the question.

- Use breakpoints when you need to stop at a suspected transition.
- Use logpoints when stopping would distort timing or concurrency.
- Use watchpoints or data breakpoints when the key question is where a value changed.
- Use frame or stack inspection when the key question is how execution arrived at the current state.
- Use post-mortem debugging when the process already crashed and the interesting state is preserved.
- Use record/replay or reverse debugging when the symptom appears long after the bad transition or reproducing is expensive.

3. Inspect backward, not just inward.

- Do not stop at the line that threw, asserted, or rendered the wrong output.
- Follow the data, request, or control path backward to the last known-good state.
- Ask at each step whether the current frame or boundary is the first divergence or only where the divergence became visible.

4. Record only evidence that changes the diagnosis.

- Note the exact breakpoint, watch expression, frame, dump, or trace slice used.
- Record the observed value or transition and why it matters.
- Fold the result back into `debug.md` as evidence, first divergence, or eliminated alternative.

## Rules

- Prefer observation-first tools over speculative code edits.
- Use the narrowest breakpoint, watchpoint, or probe that answers the question.
- Stop inspecting once you can prove the first bad state or eliminate the current top hypothesis.
- Treat debugger output as evidence only when it is tied to a concrete state transition, boundary comparison, or falsifier.
