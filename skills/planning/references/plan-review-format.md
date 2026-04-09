# Plan Review Format

Use this review shape for `planning`.

```md
Status: clear | findings | unclear

If `findings`:

- <issue>
  - Why it matters
  - Which phase or section it affects

If `unclear`:

- Missing: <product decision | grounded bug diagnosis>
    - Why planning cannot continue
    - Route to: `exploration` | `debugging`
```

Rules:

- Use `clear` only if the plan is execution-ready.
- Use `findings` for fixable planning issues.
- Use `unclear` for missing product intent, scope, UX, success criteria, or bug diagnosis.
- Do not invent missing product decisions or root cause inside the review.
