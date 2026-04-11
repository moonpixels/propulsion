---
name: execution
# prettier-ignore
description: Execute a feature plan by orchestrating fresh subagents one phase at a time. Use when current `plan.md` exists and the user wants feature implementation to start.
---

# Execution

Execute a feature plan one phase at a time.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- If no `docs/propulsion/.../plan.md` exists for this work, STOP. Load `planning`.
- If the plan is bug-oriented, STOP. Load `debugging`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Review `plan.md` to understand how each phase is scoped.
2. Select the first incomplete phase in `plan.md` as the current phase.
3. Dispatch a fresh implementer subagent with the prompt in [references/implementer-prompt.md](references/implementer-prompt.md).
4. Wait for the implementer to finish and report back.
5. If the implementer reports `Status: unclear` then provide additional context or clarification to the implementer.
6. If the implementer reports `Status: blocked` then triage the blocker and resolve it.
7. Escalate to the user if you are unable to resolve `unclear` or `blocked` statuses from context within the plan, codebase, or tools.
8. If the implementer reports `Status: done` then dispatch a fresh implementation-reviewer subagent with the prompt in [references/implementation-reviewer-prompt.md](references/implementation-reviewer-prompt.md).
9. If the implementation-reviewer reports `Status: rejected`, send the findings back to the same implementer subagent session with the prompt in [references/implementation-feedback-prompt.md](references/implementation-feedback-prompt.md).
10. Repeat steps 4-9 until the implementer reports `Status: done` and the latest implementation-reviewer reports `Status: approved`.
11. Check off the current phase acceptance criteria and phase completion in `plan.md`.
12. Repeat steps 2-11 for the next incomplete phase in `plan.md` until all phases are complete.
13. After the last phase is complete, infer and run the final repo-wide checks before claiming the plan complete (tests, lint, formatting, build etc., depending on the repo and work).

## Rules

These rules are MANDATORY.

- DO NOT implement work from the main agent, ALWAYS dispatch a fresh implementer subagent for each phase.
- DO NOT use `execution` for bug diagnosis, bug-fix orchestration, or bug-fix feedback loops; those belong to `debugging`.
- NEVER resolve `Status: unclear` or `Status: blocked` by guessing. If the information is not in the plan, codebase, or tools, escalate to the user for resolution.
- ALWAYS update `plan.md` checkboxes after each successful implementation-review cycle.
- ALWAYS use the prompts in the references when dispatching subagents and sending feedback.
- You CAN use parallel implementer subagents for different phases ONLY IF the phases are truly independent with no shared dependencies or risk of conflicts.
- DO NOT claim completion without final repo-wide checks.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Every phase in `plan.md` has gone through an implementer subagent and received `Status: done`.
- [ ] Every phase in `plan.md` has gone through an implementation-reviewer subagent and received `Status: approved`.
- [ ] Every phase acceptance criterion and phase completion checkbox in `plan.md` is checked off.
- [ ] Final repo-wide checks pass.
- [ ] Completion evidence is provided to the user.

## Next Skill

Once the completion gate is fully checked:

- Tell the user the plan is fully executed and ask whether they have any feedback on the implementation.

## References

Use these references when you need detail.

- [references/implementer-prompt.md](references/implementer-prompt.md) - Fresh implementer subagent prompt.
- [references/implementation-reviewer-prompt.md](references/implementation-reviewer-prompt.md) - Fresh implementation-reviewer subagent prompt.
- [references/implementation-feedback-prompt.md](references/implementation-feedback-prompt.md) - Prompt for sending implementation-reviewer findings back to the implementer subagent.
