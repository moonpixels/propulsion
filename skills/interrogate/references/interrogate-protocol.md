# Interrogate Protocol

Use when a request needs missing information resolved before safe progress.

## Entry Exploration

Launch a fresh explorer subagent before asking the user anything. Inspect project context needed to avoid answerable questions, then seed the initial decision tree.

## Decision Tree

Build an explicit decision tree before the first user question. Include branches that could affect the answer or next action, especially:

- intended outcome and non-goals
- user workflow, UX, API, CLI, or agent-facing behaviour
- inputs, outputs, data shape, state, persistence, and side effects
- scope boundaries, compatibility, migration, rollback, and rollout
- architecture, dependencies, integration points, and ownership
- errors, edge cases, security, privacy, and performance constraints
- tests, acceptance criteria, verification, and handoff expectations

Track each branch as open or closed. Work the highest-impact blocker first, then update the tree after every project finding or user answer. Close a branch only when project facts or the user fully answer it.

## Codebase-Answerable Branches

Before asking the user, decide whether project inspection could fully answer the branch. If yes, inspect focused evidence: patterns, APIs, file locations, naming, tests, config, dependencies, shipped behaviour.

Do not treat existing code as product intent when intent is unclear. If inspection reveals current state but not desired outcome, use it to recommend an answer, then ask.

## User Questioning

Relentlessly ask one question at a time. Keep each question decision-oriented and easy to answer. Keep going until shared understanding is reached; do not stop because the answer seems obvious, many questions were asked, or inspection found adjacent facts.

```markdown
Question: <single question the user must decide>

Options:

- <recommended option> (recommended)
- <viable alternative 1>
- <viable alternative 2, if useful>
- <viable alternative 3, only if genuinely viable>
```

Do not list more than 3 alternatives beyond the recommendation. Do not ask multi-part questions. If decisions are related, ask the prerequisite first and let the next branch depend on that answer.

## Shared Understanding

Walk the decision tree until no blocking branches remain. Shared understanding means the agent can state outcome, constraints, tradeoffs, and acceptance criteria without inventing product or codebase facts.

When unsure whether a branch blocks, treat it as blocking and ask. Do not finish with silent assumptions, unresolved branches, or TODO-style follow-ups.

## Handoff Summary

When interrogation is complete, return a concise summary to the caller.
