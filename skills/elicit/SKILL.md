---
name: elicit
description: Elicits user-confirmed decisions one at a time until shared understanding is complete. Use when requirements, constraints, trade-offs, boundaries, or intent need the user's direction before acting.
metadata:
    invocation: model
disable-model-invocation: false
---

# Elicit

**Goal-oriented requirements engineering** refines a request into user-confirmed decisions until every branch reaches shared understanding.

## Process

### 1. Establish the root goal

Inspect the request, conversation, and accessible task-scoped material before questioning. Derive every available fact and identify the user's intended outcome as the root goal. Keep fact-finding read-only; when it requires a state-changing operation, make authorisation the active decision. Represent every unavailable fact as a branch to resolve with the user. The root goal and factual basis are explicit.

### 2. Refine the decision tree

Build and continually update an internal, dependency-ordered decision tree. Use lightweight goal refinement to expand the entire request across outcome, scope, terminology, inputs, outputs, prerequisites, dependencies, constraints, flows, exceptions, permissions, risks, trade-offs, and success conditions. Explore alternatives, scenarios, obstacles, and conflicts; preserve compatible decisions when the tree changes. Select the highest-impact unresolved decision whose dependencies are resolved. One active decision is explicit.

### 3. Ask one issue

Use **Issue-Based Information Systems** to frame the active decision as one issue with a recommended position, viable alternatives, and the decisive arguments and trade-offs. Offer only positions that resolve the issue in the current tree. Derive the recommendation from the confirmed goal, evidence, conventions, consequences, and prior decisions. Ask exactly one question per turn, ask it once, and leave room for the user's own answer. Treat the user as the sole decision authority. The active decision has one explicit response.

### 4. Scaffold an answer

When the user cannot answer, apply **contingent scaffolding** to the same issue through plain-language restatement, clearer alternatives and trade-offs, examples, or scenarios. When needed, decompose it into the highest-impact prerequisite decisions, resolve them one at a time, and recombine their answers. Continue adapting the issue until the user resolves it. The active decision has a user-confirmed answer.

### 5. Validate the answer

Test each answer against the root goal, prior decisions, scenarios, counterexamples, edge cases, obstacles, conflicts, and consequences. Use **Socratic questioning** to probe the single highest-impact uncertainty in its assumptions, evidence, implications, or viewpoints. Keep an ambiguous or conflicting answer open, state discovered constraints and consequences as facts, and add every exposed decision to the tree. Preserve compatible answers and rebuild affected branches. The answer is consistent and every consequence is represented.

### 6. Reach theoretical saturation

Continue steps 1–5 until **theoretical saturation**: every branch has a confirmed answer, all dependencies and answers are consistent, and a final goal-refinement, scenario, obstacle, conflict, consequence, and edge-case pass produces no new branch. Shared understanding is ready for synthesis.

### 7. Confirm shared understanding

Present one concise, self-contained synthesis of the outcome, boundaries, decisions, constraints, and observable success conditions, then ask for explicit agreement. Treat a correction or rejection as new evidence, reopen every affected branch, and continue from step 2 until saturation returns before presenting the revised synthesis. Affirmative agreement completes elicitation. Return only the user-confirmed synthesis to the caller.
