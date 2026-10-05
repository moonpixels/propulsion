---
name: elicit
description: Resolve and stress-test user-held information and decisions one question at a time until shared understanding is confirmed. Use for any bounded task whose intent, constraints, trade-offs, or success conditions need the user's direction.
---

# Elicit

Return confirmed shared understanding by relentlessly traversing a bounded **decision tree**. Apply this to any situation, including plans, ideas, writing, purchases, personal decisions, and software. The user owns their information and decisions; the caller owns downstream action.

A branch is **material** when different answers could change the intended outcome, scope, constraints, trade-offs, success conditions, or a consequential choice needed to achieve it. Include those branches even when the agent could proceed by guessing. Leave routine details within established direction to the caller.

## Inputs

Use the request, conversation, caller's outcome and boundary, and available task evidence. Resolve discoverable facts through task-scoped read-only inspection before dependent questioning. Verify uncertain or changing claims. Evidence of what currently happens does not establish what the user wants. Leave substantial research and changes to the caller.

## Method

1. **Build the decision tree.** Map the intended outcome and every material branch, including prerequisites and decisions that depend on other answers. Keep the tree internal. Track what remains open and what was resolved by a user answer or evidence, explicitly delegated, or excluded by the agreed scope. Preserve compatible answers. A plausible assumption, recommendation, or unanswered question does not close a branch.
2. **Ask one question per turn.** Select the highest-impact open branch whose prerequisites are settled. Explain its effect on the outcome. For a real choice, offer grounded, materially different viable options and recommend one when evidence supports it. For missing information, ask directly; do not manufacture alternatives. Leave room for the user's own answer and wait for it before relying on the decision.
3. **Stress-test and expand.** After every answer or relevant discovery, test the starting proposal and affected answers against the goal, facts, alternatives, implications, concrete scenarios, counterexamples, and conflicts. Respect explicitly fixed constraints; surface a conflict that makes them untenable. Add newly exposed branches, recompute dependencies, and reopen every affected decision. Resolve ambiguity or consequential interpretation before relying on an answer. When the user struggles to answer, clarify the same issue with plain language, examples, or prerequisite questions. Close clear answers without ceremonial repetition.
4. **Traverse to saturation.** Repeat steps 2–3 while material branches remain open. Follow each answer into its dependent decisions, then return to unresolved sibling branches. An exhausted initial question list, a workable outline, or no immediately askable question is not completion. Keep questioning while consequential gaps remain; use no question quota. If a prerequisite needs unavailable evidence or user input, identify it and the dependent work.
5. **Check coverage.** Before synthesis, walk the complete proposed outcome and interactions between decisions through relevant participants, responsibilities, inputs and outputs, defaults, states and transitions, time boundaries, visibility, exceptions, failure and recovery, and success evidence. Use only dimensions relevant to this task. Ask whether plausible differing interpretations would change the result. Open consequential gaps and return to traversal. **Saturation requires every material branch to have a supported disposition and a fresh coverage pass that adds or reopens none.**
6. **Confirm understanding.** Present a concise, self-contained synthesis of the facts, decisions, scope, constraints, consequential implications, delegated choices, and observable success conditions. Ask one question for explicit agreement. A correction reopens affected branches; repeat traversal and coverage before presenting the revised synthesis. An earlier answer to one option does not confirm the complete synthesis. If a prior confirmed synthesis covers this complete outcome, recheck its basis and coverage; return it without another checkpoint only when no material gap or change is found.

## Finish

Return the synthesis after the user confirms it. If a necessary fact or decision remains unavailable, identify it and the dependent work rather than claiming readiness. Explicit deferral keeps dependent work unresolved unless the user changes scope or delegates the choice. Create no durable artefact or state change. Return control to the caller for persistence, verification, and further action.

If later evidence exposes a material gap or invalidates a settled answer, resume at the affected branches even after confirmation. Preserve unaffected decisions and require confirmed understanding of the revised result before dependent action.
