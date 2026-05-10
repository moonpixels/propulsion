---
name: interrogate
description: Manage interrogation, intake, interviews, scope clarification, requirements gathering, and shared understanding. Use when missing decisions must be resolved.
---

# Interrogate

Reach shared understanding through project context and one-question-at-a-time user interrogation.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Launch a fresh explorer subagent to inspect project facts relevant to the request.
2. Interrogate the user about every aspect of the request until shared understanding is reached.
    - Ask questions one at a time, provide your recommended answer first, then 2-3 viable alternatives.
    - Walk down each branch of the decision tree resolving dependencies between decisions.
    - Keep asking until shared understanding is reached.
3. Return a concise summary to the caller.

## Rules

These rules are MANDATORY.

- MUST use explorer subagent for entry exploration.
- ALWAYS interrogate the user until shared understanding is reached.
- NEVER think "this is too many questions", it isn't.
- DO NOT limit the number of questions; keep asking until EVERY blocking branch is closed.
- MUST ask user exactly one question at a time, provide a recommended answer, then 2-3 viable alternatives.
- ALWAYS check if a question can be answered by project inspection before asking.
- MUST walk the decision tree until EVERY blocking branch is closed by project facts or user answers.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Fresh explorer subagent completed entry project-context inspection.
- [ ] Decision tree branches were explored and attempted to answer with code exploration.
- [ ] Remaining open branches were closed by relentlessly interrogating the user.
- [ ] Shared understanding was reached with no open blocking branches.
- [ ] Resolved decisions were summarised for the caller.

## References

Use these references when you need detail.

- [references/interrogate-protocol.md](references/interrogate-protocol.md) - Detailed intake protocol, question format, and branch handling.
