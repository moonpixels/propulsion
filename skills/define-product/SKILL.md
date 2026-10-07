---
name: define-product
description: Define and document a whole software product when an idea or existing product needs discovery and definition.
---

# Define product

Produce a confirmed `PRODUCT.md` with whole-product intent, system-wide requirements and a high-level feature index. Use **discovery** and **story mapping** to establish breadth before deepening individual features.

## Inputs

Take the idea, product or requested revision from the request and its supplied context. Read relevant project guidance and linked authorities. For an existing product, inspect representative journeys and contracts. Preserve unrelated confirmed content, identifiers and specification links.

## Method

1. **Prepare discovery.** Read [discovery guidance](references/discovery.md) and [the product template](assets/product-template.md) before mapping the decision tree. Treat the starting idea as a hypothesis to explore, not a complete feature list. Resolve discoverable facts through inspection or [$research](../research/SKILL.md).
2. **Elicit the whole product.** Invoke [$elicit-with-context](../elicit-with-context/SKILL.md) for product needs, journeys, missing features and shared constraints, using the discovery guidance. Keep detailed feature rules and internal implementation for later stages.
3. **Build the feature index.** Give each feature a stable ID, name, brief outcome and boundary, and specification field. Leave new specification fields blank. Connect features to journeys and goals. Account for every agreed need through a feature, shared requirement or explicit exclusion, and justify every indexed feature. Preserve existing IDs and use `FEAT-*` for new entries unless a convention already exists.
4. **Check the foundation.** Check journey coverage, the feature index and shared requirements. Record the scope and consequence of detail reserved for feature specification. Supply this complete foundation to the active dialogue for confirmation.
5. **Write and check.** Invoke [$write-prose](../write-prose/SKILL.md) with the confirmed foundation, evidence and template. Write root `PRODUCT.md`. Distinguish confirmed intent, observed facts and unresolved assumptions. Link glossary, rationale and research in their authoritative homes. Re-read for fidelity, feature coverage, consistent identifiers and intact specification links.

## Finish

Return the document path, coverage checked and material limitations. Stop after product definition and context maintenance owned by invoked skills.

**Done only when** contextual elicitation is complete and the saved document faithfully records its journeys, feature index and system-wide requirements. Report any unmet prerequisite and its dependent work. Leave feature specifications, ticket planning and implementation to subsequent requests.
