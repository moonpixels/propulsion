---
name: define-product
description: Defines and maintains a product through confirmed discovery. Use when exploring a new product or documenting and redirecting an existing one.
metadata:
    invocation: user
disable-model-invocation: true
---

# Define Product

The **Product Vision Board** turns a new idea or existing system into a shared, evidence-aware product definition that guides strategic features without becoming a delivery plan.

## Process

### 1. Inspect the product context

Inspect the request, root `PRODUCT.md` and `CONTEXT.md`, relevant decisions and research, and the smallest representative repository evidence. Select a create or improve branch. For an existing product, treat code and tests as evidence of current behaviour and the user as the authority on intent; expose contradictions between them. The branch, current evidence, and definition boundary are explicit.

### 2. Elicit shared understanding

Invoke `$elicit-with-context` to reach shared understanding of the vision, users and customers, needs, product type, value proposition, alternatives, differentiating capabilities, business goals, success signals, boundaries, current state, and intended direction. When a dimension is unclear, load only the relevant section of [Discovery Techniques](references/DISCOVERY.md). Invoke `$research` when external evidence could materially resolve a product question or help the user formulate a decision; keep its report authoritative and link applicable findings. Each product dimension is confirmed, supported, or explicitly uncertain.

### 3. Trace strategic value

Use **Impact Mapping** to trace every strategic capability or feature concept through an actor and desired behaviour change to a product or business goal. Apply the product-discovery risks of value, usability, feasibility, and viability as a completeness pass. Classify product state as `current`, `confirmed direction`, or `hypothesis`, and evidence as `observed`, `user-confirmed`, `researched`, `hypothesis`, or `unknown`. Remove feature ideas without a strategic trace or retain them as explicit open questions. The definition distinguishes direction from evidence and exposes its risks.

### 4. Write the product definition

At `$elicit-with-context`'s final confirmation, create or update the single root `PRODUCT.md` from the [Product Definition Template](assets/product-template.md). Preserve one authoritative meaning for each statement, use canonical terms from `CONTEXT.md`, omit inapplicable template guidance, and keep claims linked to durable evidence. Record high-level capabilities and feature concepts while leaving sequencing, estimates, tickets, implementation, architecture, and feature-level acceptance criteria to downstream work. The living product definition reflects the confirmed contract without overstating certainty.

### 5. Verify the definition

Verify every current-state claim against cited repository evidence, every direction claim against user confirmation, every strategic feature against its impact trace, and every material uncertainty against the risk pass. Reconcile the finished document with `CONTEXT.md`, applicable ADRs, and research reports. Return changed files, the confirmed current state and direction, supporting research, and unresolved questions. The user receives a coherent product guide ready to inform later feature work.
