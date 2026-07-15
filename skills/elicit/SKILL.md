---
name: elicit
description: Elicits user-confirmed decisions one at a time until shared understanding is complete. Use when requirements, constraints, trade-offs, boundaries, or intent need the user's direction before acting.
metadata:
    invocation: model
disable-model-invocation: false
---

# Elicit

**Requirements elicitation** turns choices into confirmed shared understanding while the user directs every decision.

## Process

### 1. Establish the factual basis

Inspect the request, conversation, and task-scoped environment for facts needed by the current branch. Use accessible read-only sources incrementally as answers expose new branches. Keep pre-confirmation fact-finding read-only; when establishing a fact requires a state-changing operation, make that operation a decision and wait for the user's authorisation. When a material fact remains unavailable, state the inspected evidence, best-supported inference, and confidence, then ask one factual verification question. The current branch has an explicit factual basis.

### 2. Build the decision tree

Build and continually update an internal, dependency-ordered **decision tree**. Assess the relevant outcome, scope, terminology, inputs, outputs, prerequisites, dependencies, constraints, flows, exceptions, permissions, risks, and success conditions. Treat the active user as the sole decision authority. Preserve compatible decisions after a redirection, rebuild affected branches, and select the highest-impact decision whose dependencies are resolved. One current decision is explicit.

### 3. Ask one decision

Use **Socratic questioning** to ask exactly one question per turn about one decision. State the context, recommended answer, concise reasoning, and as many educated alternatives as help the user think, then ask the decision once while leaving room for their own answer. Derive recommendations from the user's confirmed outcome, evidence, project conventions, consequences, and trade-offs. Treat their choice as authoritative and record a logically necessary consequence without asking it again. The user confirms the current decision.

### 4. Test the answer

Apply **falsification** to each answer through relevant scenarios, counterexamples, and edge cases. Ask another question only when testing exposes a choice, contradiction, or boundary. Keep an ambiguous, partial, or conflicting answer on the current branch and reframe its single point of uncertainty. Answer the user's requests for context directly, then return to the same decision. Present a discovered constraint and its consequence as facts, then reframe the decision around feasible options. The answer is clear and consistent with the confirmed tree.

### 5. Scaffold the decision

Use **contingent scaffolding** when the user has difficulty deciding. Adapt the form and clarity of support through plain-language restatement, alternatives and trade-offs, examples, or scenarios. When useful, replace a complex decision with its highest-impact prerequisite decisions, resolve them one at a time, and recombine them. The user reaches and confirms the decision.

### 6. Reach theoretical saturation

Continue until **theoretical saturation**: every relevant dimension has been assessed, every discovered choice has a confirmed answer, dependencies and answers are consistent, and a final scenario-and-edge-case pass reveals no new material branch. Present one concise, self-contained synthesis of the outcome, boundaries, key decisions, constraints, and observable success conditions, then ask for explicit confirmation. Shared understanding is ready for confirmation.

### 7. Complete or redirect

When the user corrects or rejects the synthesis, rebuild the affected branches and continue from step 2 until saturation returns. An affirmative confirmation completes the contract and authorises the already-requested downstream outcome. A pause returns a concise checkpoint of confirmed decisions and the active decision; a cancellation acknowledges the user's direction and ends without a synthesis or handoff. The caller receives only the handoff the user selected.
