# Investigation Loop

Use this reference to drive the diagnosis-first investigation loop in `debugging`.

Start by reproducing the issue:

- Capture the exact steps.
- Capture the exact command, inputs, and environment.
- Confirm whether it happens every time.
- If it is flaky, log what changes between runs.

Capture fresh evidence close to the failure:

- Exact error text.
- Stack trace.
- Failing command.
- Relevant inputs and outputs.
- Config or environment differences.

In multi-step systems, add evidence at component boundaries so you can see where the signal changes.

If a working example exists, compare the nearest working and broken variants:

- Inputs.
- Environment.
- Config.
- Code path.
- External dependency behavior.

Do not dismiss small differences early. Small differences often explain the bug.

Narrow the surface before changing anything:

- Isolate the failing layer.
- Remove unrelated variables.
- Test one seam at a time.
- Prefer the smallest reproduction that still fails.

Run one hypothesis at a time:

- Hypothesis: <suspected root cause>
- Why: <evidence that points here>
- Test: <smallest probe>
- Result: <confirmed | disproved>

If disproved, form a new hypothesis. Do not stack fixes.

## Rules

- Use this reference to keep the investigation evidence-first and diagnosis-first.
- If you cannot reproduce or localize the issue yet, gather more evidence instead of guessing.
- Keep probes as small as possible.
- Do not stack hypotheses or speculative fixes.
