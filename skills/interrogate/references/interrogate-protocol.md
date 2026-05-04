# Interrogate Protocol

Use this protocol when a workflow needs missing information resolved before it can proceed safely.

## Entry Exploration

Launch a fresh explorer subagent to inspect available project context before asking the user anything. Use the user's request, the current workflow goal, and any facts needed to avoid asking questions the project can answer. Use those findings to seed the initial decision tree.

## Decision Tree

Track unresolved branches, then walk down each branch of the decision tree that could affect the answer or next action. Work the highest-impact blocking branch first. A branch is closed only when it is answered by project facts or answered by the user.

## Codebase-Answerable Branches

Before asking the user, decide whether project inspection could answer the branch. If yes, launch a focused explorer subagent with one narrow objective. Use focused project exploration for existing patterns, available APIs, file locations, naming conventions, tests, configuration, dependencies, and shipped behaviour.

## User Question Format

Relentlessly ask the user one question at a time. Keep each question decision-oriented and easy to answer. There is no limit on the number of questions; keep going until shared understanding is reached.

```markdown
Question: <single question the user must decide>

Recommendation: <best answer and why it fits the current facts>

Options:

- <recommended option, repeated concisely>
- <viable alternative 1>
- <viable alternative 2, if useful>
- <viable alternative 3, only if genuinely viable>
```

Do not list more than 3 alternatives beyond the recommendation. Do not ask multi-part questions. If multiple decisions are related, ask the prerequisite decision first and let the next branch depend on that answer.

## Shared Understanding

Continue walking the decision tree until no blocking branches remain. Shared understanding means the agent can state the intended outcome, constraints, important tradeoffs, and the next workflow action without inventing product or codebase facts.

## Handoff Summary

When interrogation is complete, return a concise summary to the caller. Keep the summary in chat; this skill does not create or edit durable artefacts.

```markdown
Resolved decisions:

- <decision>

Project facts:

- <fact learned from exploration>
```
