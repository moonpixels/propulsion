---
name: interrogate
# prettier-ignore
description: Manage interrogation, intake, interviews, scope clarification, requirements gathering, and shared understanding. Use when missing decisions must be resolved.
---

# Interrogate

Reach a shared understanding by exploring the project for context and interrogating the user one question at a time.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Gather context by launching a fresh explorer subagent to inspect the project for facts relevant to the request.
2. Interrogate the user relentlessly about every aspect of the request until a shared understanding is reached.
    - Ask questions one at a time, provide your recommended answer first, then 2-3 viable alternatives.
    - Walk down each branch of the decision tree resolving dependencies between decisions.
    - There are no limits on the number of questions; keep asking until a shared understanding is reached.
3. Return a concise summary to the caller.

## Rules

These rules are MANDATORY.

- MUST use explorer subagent for entry exploration.
- ALWAYS relentlessly interrogate the user until a shared understanding is reached.
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
