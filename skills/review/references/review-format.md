# Review Format

Use this exact shape.

```md
Status: clear | findings | unclear

If `findings`:

- [high|medium|low] <short title>
    - Where: <file or phase>
    - Why it matters: <risk or regression>
    - Evidence: <proof from diff, test output, or behavior>

If `unclear`:

- Missing: <phase | plan excerpt | diff | verification evidence>
    - Why review cannot continue
```

Rules:

- Return `clear` only when there are no real issues for the current phase.
- Return `unclear` when required review inputs are missing.
- Keep findings short and concrete.
- Prefer evidence over opinion.
