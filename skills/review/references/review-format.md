# Review Format

Use this reference when validating or copying the exact `review` output shape.

```md
Status: clear | findings | unclear

Acceptance Criteria Status

- <criterion>: met | not met | unclear
    - Evidence: <brief proof from diff, test output, behavior, or missing input>

If `findings`:

- [high|medium|low] <short title>
    - Where: <file or phase>
    - Why it matters: <risk or regression>
    - Evidence: <proof from diff, test output, or behavior>

If `unclear`:

- Missing: <phase | plan excerpt | diff | verification evidence>
    - Why review cannot continue
```

## Rules

- Use this reference only when validating or copying `review` output.
- Keep the output in this exact shape.
- Replace placeholders with the actual current-phase criteria, findings, and missing-input details.
