---
name: elicit
description: Resolve material user-held information and decisions when a bounded task needs clarification or stress-testing.
---

# Elicit

Return confirmed shared understanding by relentlessly traversing a bounded **decision tree**. The user owns their information and decisions. The caller owns downstream action.

A branch is **material** when differing answers could change the outcome, scope, constraints, trade-offs, success conditions, or a consequential choice. Include choices the agent could otherwise guess. Leave routine details within established direction to the caller.

## Inputs

Take the task, intended outcome and authority boundary from the request or caller handoff. Resolve discoverable facts through task-scoped read-only inspection before dependent questioning. Verify uncertain or changing claims. Current behaviour is evidence, not authority for intended behaviour. Leave substantial research and changes to the caller.

## Method

1. **Map the tree.** Track material branches, dependencies, and their disposition internally: open, resolved by user answer or evidence, explicitly delegated, or excluded by agreed scope. Preserve compatible answers. Assumptions, recommendations, and unanswered questions leave branches open.
2. **Ask one question per turn.** Choose the highest-impact open branch whose prerequisites are settled. Explain what the answer changes. For a real choice, offer materially different viable options and a grounded recommendation. Ask directly for missing information. Leave room for the user's own answer and wait before relying on it.
3. **Challenge and recompute.** After each answer or discovery, stress-test the proposal and affected answers against the goal, facts, alternatives, implications, concrete scenarios, and counterexamples. Directly identify factual errors, contradictions, and choices that undermine the goal. Explain the evidence or conflict before asking the resolving question. Distinguish evidence from inference and legitimate preferences from errors. Respect fixed constraints while surfacing conflicts that make them untenable. Acknowledge and correct your own mistaken interpretation. Reopen affected decisions, add exposed branches, and recompute dependencies before continuing.
4. **Clarify the same decision.** Resolve ambiguity before relying on an answer. When the user asks for explanation or shows confusion, read [question clarification](references/clarification.md) and rephrase without changing the choice. Close clear answers without ceremonial repetition. An informed preference settles a viable choice. A factual contradiction remains unresolved while dependent work requires it.
5. **Traverse to saturation.** Follow answers into dependent branches, then return to unresolved siblings. Use no question quota. An exhausted list, workable outline, or empty set of askable questions is insufficient. Walk the complete outcome and decision interactions through relevant responsibilities, inputs and outputs, defaults, states and transitions, time boundaries, visibility, exceptions, failure and recovery, and success evidence. Reopen consequential gaps and continue until every material branch has a supported disposition and a fresh coverage pass adds or reopens none.
6. **Confirm the whole.** Present a concise, self-contained synthesis of facts, decisions, scope, constraints, consequential implications, delegated choices, and observable success conditions. Ask one question for explicit agreement. Corrections or later evidence reopen affected branches. Repeat traversal and coverage before confirming the revision. Reuse an earlier confirmed synthesis only when it covers the complete outcome and rechecking finds no material gap or change. Agreement to one option does not confirm the whole.

## Finish

Return the confirmed synthesis to the caller. Create no durable artefact or state change.

**Done only when** every material branch has a supported disposition, a fresh coverage pass opens none, and the user has confirmed the complete synthesis. If a necessary fact or decision is unavailable, report it and the dependent work. Deferral leaves that work unresolved unless the user changes scope or explicitly delegates the choice.
