# Subagent Handoff

Use this reference for supporting handoff content that travels with the standardized implementer prompt.

Every implementation subagent should receive:

- the full phase text
- the relevant PRD, debug note, and plan context
- the phase acceptance criteria
- the durable decisions that constrain the phase
- the files or areas most likely to change
- instruction to implement only the handed-off phase before reporting back
- instruction to return structured status reporting with changed files, checks run, open questions, blockers, and an `Acceptance Criteria Status` section

`Acceptance Criteria Status` must list every current-phase acceptance criterion and report:

- `met | not met | unclear`
- brief evidence for that status

Supporting guidance:

- Give the subagent the task once. Do not make it rediscover the plan.
- Keep the prompt bounded to the current phase.
- Do not let the subagent update `plan.md`.
- Do not let the subagent check off acceptance criteria in `plan.md`; that stays with the main orchestrator.
