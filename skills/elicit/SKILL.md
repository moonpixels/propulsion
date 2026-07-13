---
name: elicit
description: Elicit shared understanding through research and one-question-at-a-time interviews. Use when requirements, constraints, design choices, or user intent remain unresolved.
metadata:
    invocation: model
disable-model-invocation: false
---

# Elicit

**Requirements elicitation** turns an unresolved request into confirmed shared
understanding through environment research and one decision at a time.

## Steps

1. Establish the subject, then inspect relevant files, tools, behaviour, and
   durable context until discoverable facts for the current branch are known.
   Treat existing evidence as current state and the user's answers as intent.
2. Build an internal decision tree of every material outcome, boundary,
   dependency, constraint, and success condition. Order prerequisites before
   dependent decisions.
3. Take the highest-impact decision whose dependencies are resolved. Ask
   exactly one question, give the recommended answer first with a brief reason,
   add genuinely viable alternatives when useful, then wait for the user's
   answer.
4. Test the answer with concrete scenarios, counterexamples, and edge cases.
   Surface conflicts with evidence or earlier decisions for the user to resolve.
   Inspect newly relevant facts as the tree develops.
5. Repeat the question and validation loop to **theoretical saturation**, when
   further answers reveal no new material branches.
6. Present a concise synthesis of the agreed outcome, boundaries, decisions,
   constraints, and success conditions. Ask whether it accurately captures the
   shared understanding and complete only after explicit confirmation.

## Rules

- Keep downstream action pending until shared understanding is confirmed.
- Return an unconfirmed state when the user pauses, cancels, or redirects the
  interview before confirmation.
- Keep each response focused on the single active decision.
