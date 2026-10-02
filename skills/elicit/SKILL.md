---
name: elicit
description: Resolve material user-held information and decisions one question at a time until shared understanding is confirmed. Use when those inputs block a bounded outcome.
---

# Elicit

Return confirmed shared understanding for a bounded task. The user owns their information and decisions; the caller owns downstream action.

## Inputs

Use the request, conversation, caller's outcome and boundary, and available task evidence. Resolve discoverable facts through task-scoped read-only inspection before questioning. Verify uncertain or changing claims. Leave substantial research and changes to the caller. If an existing user-confirmed synthesis covers this complete bounded outcome and no material fact or decision has changed, return it without another checkpoint.

## Method

1. **Find the unresolved decisions.** Keep an internal dependency-ordered set of questions whose answers could materially change the outcome. Reuse compatible answers and remove questions already settled by evidence. Ask the highest-impact question whose prerequisites are known.
2. **Ask one question per turn.** Explain its effect on the outcome. For a real choice, offer grounded, materially different viable options and recommend one when evidence supports it. For missing information, ask directly; do not manufacture alternatives. Leave room for the user's own answer.
3. **Check the answer.** Compare it with established facts, prior decisions, and consequential scenarios. Close clear answers without repeating them. If ambiguity, contradiction, or interpretation could change the result, clarify that issue before relying on it. Reopen affected decisions rather than inventing the user's answer.
4. **Check coverage.** Once known questions are settled, walk the proposed outcome through relevant actors, authority, defaults, states, transitions, time boundaries, visibility, exceptions, and success evidence. Ask only about gaps that could change the bounded result.
5. **Confirm understanding.** Present a concise, self-contained synthesis of the facts, decisions, scope, constraints, and observable success conditions. Ask one question for explicit agreement. A correction reopens affected decisions; an earlier answer to one option does not confirm the complete synthesis.

## Finish

Return the synthesis after the user confirms it. If a necessary fact or decision remains unavailable, identify it and the dependent work rather than claiming agreement. Create no durable artefact or state change. Return control to the caller for persistence, verification, and further action.
