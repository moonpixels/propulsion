---
name: execute
# prettier-ignore
description: Execute a feature plan through subagent implementation and review one phase at a time. Use when current `plan.md` exists and the user wants feature implementation to start.
---

# Execute

Execute a feature plan one phase at a time.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If no `docs/propulsion/.../plan.md` exists for this work, STOP. Load `plan`.
- If the plan is bug-oriented, STOP. Load `debug`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review `plan.md` to understand how each phase is scoped.
2. Select the first incomplete phase in `plan.md` as the current phase.
3. Start a fresh worker subagent with the prompt in [references/worker-prompt.md](references/worker-prompt.md).
4. Wait for the worker to finish and report back.
5. If the worker reports `Status: unclear` then provide additional context or clarification to the worker.
6. If the worker reports `Status: blocked` then triage the blocker and resolve it.
7. Escalate to the user if you are unable to resolve `unclear` or `blocked` statuses from context within the plan, codebase, or tools.
8. If the worker reports `Status: done` then start a fresh implementation-reviewer subagent with the prompt in [references/reviewer-prompt.md](references/reviewer-prompt.md).
9. If the implementation-reviewer reports `Status: rejected`, send the findings back to the same worker subagent with the prompt in [references/worker-feedback-prompt.md](references/worker-feedback-prompt.md).
10. Repeat steps 4-9 until the worker reports `Status: done` and the latest implementation-reviewer reports `Status: approved`.
11. Check off the current phase acceptance criteria and phase completion in `plan.md`.
12. Repeat steps 2-11 for the next incomplete phase in `plan.md` until all phases are complete.
13. After the last phase is complete, infer and run the final repo-wide checks from the target repository's docs, scripts, and conventions before claiming the plan complete.

## Rules

These rules are MANDATORY.

- DO NOT implement work from the orchestrating agent; ALWAYS use a fresh worker subagent for each phase.
- ALWAYS use a fresh implementation-reviewer subagent for each phase review.
- DO NOT use `execute` for bug diagnosis, bug-fix orchestration, or bug-fix feedback loops; those belong to `debug`.
- NEVER resolve `Status: unclear` or `Status: blocked` by guessing. If the information is not in the plan, codebase, or tools, escalate to the user for resolution.
- ALWAYS update `plan.md` checkboxes after each successful implementation-review cycle.
- ALWAYS use the prompts in the references when starting subagents and sending feedback.
- DO NOT directly implement user feedback once the completion gate is passed; loop back to `brainstorm` instead.
- You CAN use parallel worker subagents for different phases ONLY IF the phases are truly independent with no shared dependencies or risk of conflicts.
- DO NOT claim completion without final repo-wide checks chosen from the target repository's docs, scripts, and conventions.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every phase in `plan.md` has gone through a worker subagent and received `Status: done`.
- [ ] Every phase in `plan.md` has gone through an implementation-reviewer subagent and received `Status: approved`.
- [ ] Every phase acceptance criterion and phase completion checkbox in `plan.md` is checked off.
- [ ] Final repo-wide checks pass.
- [ ] Completion evidence is provided to the user.

## Next Steps

Once the completion gate is fully checked:

- Tell the user the plan is fully executed and ask whether they have any feedback on the implementation.
- If the user provides feedback after this completion handoff, do not implement it in `execute`; load `brainstorm` to update the PRD, then `plan` to create or update a phase, then return to `execute` for implementation.

## References

Use these references when you need detail.

- [references/worker-prompt.md](references/worker-prompt.md) - Fresh worker subagent prompt.
- [references/reviewer-prompt.md](references/reviewer-prompt.md) - Fresh implementation-reviewer subagent prompt.
- [references/worker-feedback-prompt.md](references/worker-feedback-prompt.md) - Prompt for sending implementation-reviewer findings back to the worker subagent.
