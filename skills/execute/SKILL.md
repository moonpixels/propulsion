---
name: execute
# prettier-ignore
description: Execute a feature plan through subagent implementation and review one phase at a time. Use when current `plan.md` exists and the user wants feature implementation to start.
---

# Execute

Execute a feature plan one phase at a time.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- If no `docs/propulsion/.../plan.md` exists for this work, STOP. Load `plan`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review and select the first incomplete phase in `plan.md`.
2. Start a fresh worker subagent with the prompt in [references/worker-prompt.md](references/worker-prompt.md).
3. Wait for the worker to finish and handle the status:
    - If `Status: unclear`, provide additional context or clarification.
    - If `Status: blocked`, triage the blocker and resolve it.
    - If you cannot resolve `unclear` or `blocked` from the plan, codebase, or tools, escalate to the user.
    - If `Status: done`, continue to review.
4. Start a fresh reviewer subagent with the prompt in [references/reviewer-prompt.md](references/reviewer-prompt.md).
5. Wait for the reviewer to finish and handle the status:
    - If `Status: approved`, mark the current phase complete in `plan.md`.
    - If `Status: rejected`, send the findings back to the same worker subagent with the prompt in [references/worker-feedback-prompt.md](references/worker-feedback-prompt.md).
6. Repeat steps 3-5 until the worker reports `Status: done` and the latest reviewer reports `Status: approved`.
7. Repeat steps 1-6 for each incomplete phase in `plan.md`.
8. Infer and run repo-wide checks, such as tests and linters.
9. Inform the user that implementation is complete.
10. Ask whether the user has feedback on the implementation.

## Rules

These rules are MANDATORY.

- NEVER implement a phase without a worker subagent.
- ALWAYS user a fresh reviewer subagent for every review.
- NEVER resolve `Status: unclear` or `Status: blocked` by guessing; if the information is not in the plan, codebase, or tools, escalate to the user for resolution.
- ALWAYS update `plan.md` checkboxes after each successful implementation-review cycle.
- MUST infer and run relevant repo-wide checks before claiming completion.
- NEVER implement user feedback directly in `execute`, instead:
    - Loop back to `brainstorm` to update the PRD.
    - Move to `plan` to create or update a phase if needed.
    - Return to `execute` for implementation.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every phase in `plan.md` has gone through a worker subagent and received `Status: done`.
- [ ] Every phase in `plan.md` has gone through a reviewer subagent and received `Status: approved`.
- [ ] Every phase completion checkbox in `plan.md` is marked complete.
- [ ] Final repo-wide checks pass.
- [ ] Informed the user that implementation is complete and asked for feedback.

## Next Steps

Once the completion gate is fully checked:

- If no user feedback is requested or provided, STOP. Implementation is complete.
- If user requests changes or provides feedback, STOP. Loop back to `brainstorm`, then `plan`, then back to `execute` for implementation.

## References

Use these references when you need detail.

- [references/worker-prompt.md](references/worker-prompt.md) - Fresh worker subagent prompt.
- [references/reviewer-prompt.md](references/reviewer-prompt.md) - Fresh reviewer subagent prompt.
- [references/worker-feedback-prompt.md](references/worker-feedback-prompt.md) - Prompt for sending reviewer findings back to the worker subagent.
