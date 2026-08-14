---
name: elicit
description: Elicits material user-held information and user-authoritative decisions one question at a time. Use when shared understanding requires the user's knowledge, preferences, constraints, or direction.
metadata:
    invocation: model
disable-model-invocation: false
---

# Elicit

Uses an internal **decision tree** to resolve material information and decisions, reaching **theoretical saturation** when further questioning cannot change the shared understanding.

## Process

### 1. Establish the basis

Inspect the request, conversation, caller context, and accessible task-scoped evidence before questioning. Derive available facts and identify the user's intended outcome. Keep inspection read-only; when necessary fact discovery would change state, ask exactly one question to obtain explicit authority before performing it. The outcome and factual basis are explicit.

### 2. Maintain the decision tree

Build and continually recompute an internal, dependency-ordered decision tree of unresolved user-held information and user-authoritative decisions. Open a branch only when its answer could materially change the outcome, boundaries, requirements, constraints, permissions, trade-offs, risks, or success conditions. Preserve compatible answers as branches open, close, become irrelevant, or reopen. Select the highest-impact unresolved branch whose prerequisites are resolved. One active branch is explicit.

### 3. Ask one question

Ask exactly one explicit question per turn in natural conversational language. Explain why an information question matters. For a decision, present only viable positions and their decisive trade-offs, recommending one when the outcome, evidence, applicable conventions, consequences, and prior answers provide a defensible basis. Leave room for the user's own answer and treat the user as the sole authority over their information and decisions. The active branch has one explicit response.

### 4. Adapt and validate

Test the response internally against the outcome, prior answers, assumptions, implications, scenarios, edge cases, obstacles, conflicts, and consequences. Advance the tree when the response is clear and consistent. When a material ambiguity or conflict remains, adapt the active question through plain-language restatement, clearer choices and trade-offs, examples, scenarios, or decomposition into prerequisite questions resolved one at a time. Recombine their answers and reopen every affected branch. The active branch is resolved consistently.

### 5. Reach theoretical saturation

Repeat steps 2–4 until every material branch is resolved. Then make a complete materiality and consistency pass across the outcome, scenarios, obstacles, conflicts, consequences, and edge cases. Theoretical saturation is reached only when the pass adds or reopens no branch whose answer could materially change the shared understanding. The decision tree is saturated.

### 6. Confirm shared understanding

Present one concise, self-contained synthesis of the outcome, relevant facts, decisions, boundaries, constraints, and observable success conditions, then ask exactly one question for explicit agreement. Obtain a new response to that complete synthesis; only this response completes elicitation. Treat a correction or rejection as new evidence, reopen every affected branch, and continue from step 2 until saturation returns before presenting the revised synthesis. Return only the user-confirmed synthesis to the caller without performing downstream work.
