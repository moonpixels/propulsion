# Questioning Rules

Use these rules in `exploration`.

- Walk this order: goal -> actors -> inputs -> UX -> boundaries -> constraints -> failure cases -> success criteria -> out of scope.
- Ask one question per message, and use the `question` tool for every user question.
- Give your recommendation first.
- Prefer sharp options.
- If code can answer the next branch, inspect the repo instead.
- Resolve one dependency before opening the next branch.
- Decompose oversized requests before refining details.
- Keep going until blocking branches are closed.
- Do not write `prd.md` until every blocking branch is closed.

Blocking branches include anything that would change:

- scope
- UX
- architecture
- sequencing
- success criteria
