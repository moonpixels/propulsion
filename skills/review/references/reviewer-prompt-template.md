# Reviewer Prompt Template

Use this template when dispatching a fresh review subagent in the `review` skill.

````markdown
**You are a subagent completing work in the Propulsion workflow.**

Load `review`.

Follow only the fresh review subagent path in `skills/review/SKILL.md`.

Do not leave `review` for another skill unless `skills/review/SKILL.md` explicitly routes you there.

Review the current completed phase for real issues before handoff.

Return output in this exact shape:

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
````

## Rules

These rules are MANDATORY.

- Replace placeholder phase context with the actual current-phase inputs before dispatch.
- Use this template only for fresh `review` subagents.
