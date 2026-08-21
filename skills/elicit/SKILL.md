---
name: elicit
description: Elicits material information and decisions from the user one question at a time until shared understanding is confirmed. Use when a request or consuming skill depends on user-held context, clarification, or choices that cannot be safely discovered.
disable-model-invocation: false
---

# Elicit

Builds confirmed shared understanding by resolving a bounded internal **decision tree**, then applying adapted **theoretical saturation**.

## Process

### 1. Establish the basis

Inspect the request, conversation, caller context, and available task-scoped evidence before questioning. Use cheap read-only fact-finding and stable, confidently applicable general knowledge to close discoverable branches. Verify uncertain, contentious, or potentially current knowledge before treating it as fact. Leave material research and every state-changing action to the caller. The intended outcome, caller boundary, and factual basis are explicit.

### 2. Maintain the decision tree

Build and continually recompute an internal, dependency-ordered tree containing only branches whose resolution could materially change the bounded outcome. Cover relevant outcome, scope, terminology, inputs, outputs, prerequisites, dependencies, constraints, flows, exceptions, permissions, risks, trade-offs, and success conditions. Preserve compatible answers; close, discard, or reopen branches as evidence changes; and follow directly consequential issues without expanding into unrelated discovery. Select the highest-impact unresolved branch whose prerequisites are resolved. Keep the tree internal and one active issue explicit.

### 3. Ask one question

Ask exactly one explicit question per turn in natural language. Explain why an information question matters. Offer suggested answers only when grounded in the established basis. Apply **Design It Twice**: present at least two genuinely distinct viable options, state the material effect of each, and recommend the strongest when the evidence supports a clear winner. Make those options part of the one question; do not append another choice prompt. Leave room for another answer and keep the user as the sole authority over their information and decisions. The active issue receives one explicit response.

### 4. Adapt and validate

Test every response internally against the outcome, established facts, prior answers, implications, contradictions, scenarios, and counterexamples. Surface a challenge only when it could materially change the shared understanding. Close clear answers without ceremonial repetition. For ambiguity, conflict, difficulty, or consequential interpretation, use plain-English paraphrasing, rewording, clearer options and effects, examples, scenarios, or prerequisite questions resolved one at a time. Do not invent an answer or decide for the user. Recompute the tree and reopen every affected branch. The active issue is resolved consistently.

### 5. Reach theoretical saturation

Repeat steps 2–4 until every material branch is resolved. Make an adapted theoretical-saturation pass across the tree, implications, scenarios, counterexamples, and conflicts. Walk each material decision through affected actors and authority, defaults and unchanged behaviour, states and transitions, time boundaries, channels, visibility, exceptions, invalidation, and success evidence; open only consequential gaps. Saturation is reached only when the pass adds or reopens no branch whose answer could materially change the shared understanding. The bounded decision tree is saturated.

### 6. Confirm shared understanding

Present one concise, self-contained synthesis of the relevant facts, information, decisions, scope, constraints, implications, and observable success conditions. Ask exactly one question for explicit agreement. Only a new response confirming the complete synthesis ends elicitation; selecting an earlier option does not. Treat a correction or rejection as new evidence, reopen every affected branch, and repeat the saturation pass before presenting a revised synthesis. Return only the confirmed synthesis; create no durable artefact and leave mutation, persistence, verification, downstream action, and the caller's stopping boundary to the caller.
