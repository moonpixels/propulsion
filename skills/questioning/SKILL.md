---
name: questioning
# prettier-ignore
description: Manage questioning, intake, interviews, scope clarification, requirements gathering, and shared understanding. Use when missing decisions must be resolved.
---

# Questioning

Reach shared understanding by relentlessly asking the user one question at a time, backed by available project context.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Start every questioning session by launching a fresh explorer subagent to inspect available project context for facts relevant to the request.
2. Build the decision tree for the request, then walk down each branch that could affect the answer or next action.
3. Close any branch the project can answer through a focused explorer subagent instead of asking the user.
4. Ask the user questions for each unresolved branch, using the format in [references/questioning-protocol.md](references/questioning-protocol.md).
5. Update the decision tree after each answer, then repeat focused explorer-subagent exploration or user questioning until shared understanding is reached.
6. Summarise the resolved decisions and remaining assumptions, if any, before handing control back to the caller.

## Rules

These rules are MANDATORY.

- MUST keep this skill chat-only; DO NOT create or edit durable artefacts from this skill.
- MUST ask exactly one user question at a time.
- MUST relentlessly continue user questioning until shared understanding is reached; there is no limit on the number of questions.
- MUST provide the recommended answer first, then 2-3 viable alternatives.
- MUST use explorer subagents for entry exploration and focused project-answerable questions.
- DO NOT ask the user questions that codebase inspection can answer.
- MUST walk the decision tree until every blocking branch is closed or explicitly documented as an assumption.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Fresh explorer subagent completed entry project-context inspection.
- [ ] Decision tree branches were explored and attempted to answer with code exploration.
- [ ] Remaining open branches were closed by relentlessly questioning user.
- [ ] Shared understanding was reached or remaining assumptions were stated.
- [ ] Resolved decisions were summarised for the caller.

## References

Use these references when you need detail.

- [references/questioning-protocol.md](references/questioning-protocol.md) - Detailed intake protocol, question format, and branch handling.
