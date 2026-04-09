# Subagent Handoff

Every implementation subagent should receive:

- the full phase text
- the relevant PRD, debug note, and plan context
- the phase acceptance criteria
- the durable decisions that constrain the phase
- the files or areas most likely to change
- instruction to ask questions before guessing when requirements or repo state are unclear
- instruction to implement the handed-off phase before reporting back
- instruction to escalate blockers instead of guessing
- instruction to verify the work with targeted checks
- instruction to self-review before reporting back
- instruction to return structured status reporting with changed files, checks run, open questions, and blockers

Rules:

- Give the subagent the task once. Do not make it rediscover the plan.
- Keep the prompt bounded to the current phase.
- Tell the subagent that review dispatch stays with the main agent.
- The implementer decides whether the handed-off work requires `tdd`.
- Do not let the subagent update `plan.md`.
