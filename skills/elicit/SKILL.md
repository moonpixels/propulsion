---
name: elicit
description: Elicits material user-held information and user-authoritative decisions one question at a time until confirmed. Use when shared understanding depends on the user, not safely discoverable facts.
metadata:
    invocation: model
disable-model-invocation: false
---

# Elicit

Uses an internal **decision tree** to resolve only the material branches of shared understanding, then applies adapted **theoretical saturation** and obtains explicit confirmation of one complete synthesis.

## Process

### 1. Establish the basis

Inspect the request, conversation, caller context, and accessible task-scoped evidence before questioning. Derive discoverable facts and identify the user's intended outcome. Keep inspection read-only. When a required fact could be discovered only through a state change, make whether the caller should perform that lookup the active authority decision and leave the lookup to the caller. The outcome and factual basis are explicit.

### 2. Maintain the decision tree

Build and continually recompute an internal, dependency-ordered decision tree covering only material outcome, scope, terminology, inputs, outputs, prerequisites, dependencies, constraints, flows, exceptions, permissions, risks, trade-offs, and success conditions. Open a branch only when runtime evidence or an answer exposes it and resolving it could materially change the shared understanding. Preserve compatible answers as branches open, close, become irrelevant, or reopen. Select the highest-impact unresolved branch whose prerequisites are resolved. Keep the tree internal; one active issue is explicit.

### 3. Ask one question

Ask exactly one explicit question about the active issue, once per turn, in natural conversational language. Explain why an information question matters. For a decision, present only viable positions and their decisive trade-offs, recommending one only when the outcome, evidence, applicable conventions, consequences, and prior answers provide a defensible basis. Leave room for the user's own answer and treat the user as the sole authority over their information and decisions. The active issue has one explicit response.

### 4. Adapt and validate

Test each response internally against the root goal, previous decisions, scenarios, counterexamples, conflicts, and consequences. Keep material ambiguity open. When the response is unclear or conflicting, or the user cannot answer, scaffold the same issue through plain-language restatement, clearer choices and trade-offs, examples, scenarios, or prerequisite questions resolved one at a time. Do not offer an escape hatch or decide for the user. Recombine the answers and reopen every affected branch. The active issue is resolved consistently.

### 5. Reach theoretical saturation

Repeat steps 2–4 until every material branch is resolved. Then make an adapted theoretical-saturation pass across the tree, scenarios, counterexamples, conflicts, and consequences. Saturation is reached only when the pass adds or reopens no branch whose answer could materially change the shared understanding. The decision tree is saturated.

### 6. Confirm shared understanding

Present one concise, self-contained synthesis of the outcome, relevant facts, decisions, scope, constraints, and observable success conditions, then ask exactly one question for explicit agreement. Only a new explicit user response confirming the complete synthesis completes elicitation; selecting an earlier option does not. Treat a correction or rejection as new evidence, reopen every affected branch, and continue from step 2 until saturation returns before presenting the revised synthesis. Return only the confirmed synthesis; the caller retains mutation, persistence, verification, downstream action, and stopping ownership.
