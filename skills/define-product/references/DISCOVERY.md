# Discovery Techniques

Load only the section needed by the active discovery branch. `$elicit-with-context` remains authoritative for questioning, confirmation, and canonical language; `$research` remains authoritative for external evidence.

## Establish an existing product

Use **repository archaeology** to recover available behaviour before asking the user. Start with root documentation and manifests, then sample user entry points, public contracts, data boundaries, tests, and operational configuration. Follow evidence until the product areas and feature candidates stabilise. Treat absence as unknown rather than proof, distinguish shipped behaviour from abandoned or planned code, and ask the user to resolve contradictions with stated intent.

## Complete the product frame

Use the **Product Vision Board** as a completeness check for the concise opening:

1. What positive change and enduring purpose define the vision?
2. Which users, customers, and influential actors matter, and what outcomes do they need?
3. Why would they choose this product over alternatives, manual work, or doing nothing?
4. What market position or differentiation makes that choice plausible?
5. Which business model, revenue, costs, channels, goals, success signals, and pricing decisions matter now?
6. Which boundaries and non-goals keep the product coherent?

Keep this frame proportionate to its supporting role. Move into whole-product feature discovery once these dimensions are clear.

## Map the big picture

Use the **mile-wide, inch-deep** pass before local detail:

1. Name the product's main users and their entry points.
2. Narrate how each user moves from first contact through recurring value and eventual exit or completion.
3. Record the user-facing product areas along that journey.
4. Beneath each area, inventory current features, confirmed direction, and ideas at one-line resolution.
5. Add commercial, account, trust, support, and other cross-cutting features that the main journey did not expose.

This pass creates a feature surface, not cards, stories, priorities, screens, releases, or architecture.

## Explore a feature

Resolve only the information required by the mini-brief:

- **User value**: who benefits and what becomes possible or easier?
- **High-level behaviour**: what does the product do from the user's perspective?
- **Status**: is it `Current`, `Confirmed direction`, or `Idea`?
- **Meaningful boundaries**: what nearby behaviour could a later planner reasonably but incorrectly assume belongs to it?

Use examples or scenarios when behaviour remains ambiguous. Stop when a downstream planning session can understand the feature's product intent without receiving its implementation or delivery design.

## Walk the complete catalogue

Read the mapped product back as one narrative. Change perspective across intended users and check entry, recurring-use, recovery, commercial, trust, support, and exit paths where applicable. Look for missing transitions, duplicated features, false journey positions, contradictions, and feature descriptions that hide more than one distinct product behaviour. Resolve each finding during elicitation, then repeat the walk until it exposes nothing new.

## Establish external position

Compare the product with alternatives users employ today, including manual work and doing nothing. Invoke `$research` when competitor capabilities, market conditions, pricing, standards, regulation, or user evidence could materially change a product decision. Keep researched claims in the research report and bring only the decision-relevant conclusion and link into `PRODUCT.md`.
