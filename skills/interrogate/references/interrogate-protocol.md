# Interrogate Protocol

Use this protocol when a request needs missing information resolved before it can proceed safely.

## Entry Exploration

Launch a fresh explorer subagent to inspect available project context before asking the user anything. Use the user's request, the current workflow goal, and any facts needed to avoid asking questions the project can answer. Use those findings to seed the initial decision tree.

## Decision Tree

Build an explicit decision tree before the first user question. Include every branch that could affect the answer or next action, especially:

- intended outcome and non-goals
- user workflow, UX, API, CLI, or agent-facing behaviour
- inputs, outputs, data shape, state, persistence, and side effects
- scope boundaries, compatibility, migration, rollback, and rollout
- architecture, dependencies, integration points, and ownership
- errors, edge cases, security, privacy, and performance constraints
- tests, acceptance criteria, verification, and handoff expectations

Track each branch as open or closed. Work the highest-impact blocking branch first, then update the tree after every project finding or user answer. A branch is closed only when it is fully answered by project facts or answered by the user.

## Codebase-Answerable Branches

Before asking the user, decide whether project inspection could fully answer the branch. If yes, use focused project exploration for existing patterns, available APIs, file locations, naming conventions, tests, configuration, dependencies, and shipped behaviour.

Do not treat existing code as proof of product intent when intent is unclear. If inspection reveals the current state but not the desired outcome, use the finding to make a recommended answer, then ask the user.

## User Questioning

Relentlessly ask the user one question at a time. Keep each question decision-oriented and easy to answer. There is no limit on the number of questions; keep going until shared understanding is reached. Do not stop because the likely answer seems obvious, because many questions have already been asked, or because project inspection provided adjacent facts.

```markdown
Question: <single question the user must decide>

Options:

- <recommended option> (recommended)
- <viable alternative 1>
- <viable alternative 2, if useful>
- <viable alternative 3, only if genuinely viable>
```

Do not list more than 3 alternatives beyond the recommendation. Do not ask multi-part questions. If multiple decisions are related, ask the prerequisite decision first and let the next branch depend on that answer.

## Shared Understanding

Continue walking the decision tree until no blocking branches remain. Shared understanding means the agent can state the intended outcome, constraints, important tradeoffs, acceptance criteria without inventing product or codebase facts.

When unsure whether a branch is blocking, treat it as blocking and ask the user. Do not complete interrogation with silent assumptions, unresolved branches, or TODO-style follow-ups for later workflow stages.

## Handoff Summary

When interrogation is complete, return a concise summary to the caller.
