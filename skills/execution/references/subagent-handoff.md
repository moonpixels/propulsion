# Subagent Handoff

Every implementation subagent should receive:

- the exact slice text
- the relevant PRD, debug note, and plan excerpts
- the slice acceptance criteria
- the durable decisions that constrain the slice
- the files or areas most likely to change
- the required skill inside the slice: `tdd` for behavior changes

Rules:

- Give the subagent the task once. Do not make it rediscover the plan.
- Keep the prompt bounded to the current slice.
- Tell the subagent that review dispatch stays with the main agent.
- Require the subagent to surface blockers instead of guessing.
- Do not let the subagent update `plan.md`.
