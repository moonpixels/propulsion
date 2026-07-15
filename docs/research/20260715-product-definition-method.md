---
title: 'Product definition method'
createdAt: 2026-07-15
updatedAt: 2026-07-15
status: current
---

# Product definition method

## Research question and scope

**Question:** Which established methods should govern a skill that elicits and
documents a new or existing product's purpose, users, needs, differentiation,
strategic features, goals, evidence, and uncertainty without becoming a
roadmap or implementation plan?

**Intended use:** Support the confirmed `define-product` skill, its reusable
`PRODUCT.md` template, and its conditional discovery reference.

**Scope:** User-led discovery, static repository evidence, product vision and
strategy, value propositions, strategic feature traceability, and early product
risk. Customer interviews, experiments, roadmap sequencing, feature-level
requirements, delivery planning, and architecture design are excluded.

## Conclusion

The **Product Vision Board** is the strongest governing methodology because it
captures an enduring vision and a compact product strategy through target
groups, needs, standout capabilities, and business goals. It applies to new
products and material changes to existing ones while explicitly keeping a
detailed backlog outside the strategy.

Use three supporting techniques for distinct gaps: the **Value Proposition
Canvas** when user needs and product value are vague; **Impact Mapping** to
trace feature concepts from goals through actors and behaviour change; and the
four product risks to expose uncertainty about value, usability, feasibility,
and viability. Repository archaeology supplies evidence of an existing
product's current behaviour but cannot establish product intent without user
confirmation.

A reusable `PRODUCT.md` asset and a conditional technique reference are
justified. The asset stabilises the repeated output contract; the reference
keeps branch-specific discovery prompts out of the main skill and avoids
duplicating the elicitation and research dependencies.

## Findings

### Product Vision Board defines the durable product strategy

Roman Pichler's Product Vision Board separates the product's overarching
purpose from the strategy chosen to realise it. Its strategy fields cover the
target market and users, their main needs, three to five standout capabilities,
and business goals. Pichler explicitly places detailed features in the product
backlog and describes the board as applicable to both new products and changes
to existing ones
([Product Vision Board](https://www.romanpichler.com/blog/the-product-vision-board/)).

**Inference:** `PRODUCT.md` should preserve those stable strategic meanings but
may add current-state evidence, boundaries, risks, and open questions required
by this skill's confirmed use cases. Strategic features should remain
coarse-grained and differentiated rather than becoming an exhaustive feature
inventory.

### Value Proposition Canvas supplies conditional user-value prompts

Strategyzer's Value Proposition Canvas distinguishes a customer's jobs, pains,
and gains from the products, pain relievers, and gain creators designed to
serve them. It recommends adjusting the value proposition using customer
evidence rather than treating the initial mapping as established fit
([official template](https://www.strategyzer.com/library/the-value-proposition-canvas)).

**Inference:** jobs, pains, and gains are useful contingent scaffolding when a
user cannot yet articulate needs or differentiation. They should not become
mandatory fields for every product or imply external validation that has not
occurred.

### Impact Mapping prevents feature lists without strategic causality

Impact Mapping grows scope through four linked questions: goal, actors, desired
behaviour impacts, and deliverables. Its primary guidance argues that this
trace makes the reasoning behind a feature inspectable and helps discard work
that does not contribute to a critical impact
([Drawing impact maps](https://www.impactmapping.org/drawing.html)).

**Inference:** every strategic capability in `PRODUCT.md` should trace to an
actor, desired impact, and product or business goal. The skill should preserve
multiple plausible deliverables as hypotheses and stop before prioritising or
sequencing them into a roadmap.

### Four product risks expose uncertainty without blocking definition

SVPG distinguishes value risk, usability risk, feasibility risk, and business
viability risk. The taxonomy broadens discovery beyond whether a feature can be
built and makes the product's different uncertainty classes explicit
([The Four Big Risks](https://www.svpg.com/four-big-risks/)).

**Inference:** the skill should complete a four-risk pass but may finish with
labelled hypotheses and open questions. Requiring every risk to be resolved
would incorrectly turn product definition into a full validation programme.

### Existing-system evidence and product intent have different authorities

Source code, tests, routes, public contracts, and operational configuration can
show what an existing system currently does. They cannot establish why the
product should exist or which future direction is intended.

**Inference:** the existing-product branch should inspect representative
repository evidence before questioning, label it as observed current state,
and ask the user to resolve contradictions with intended direction. Absence
from inspected code remains unknown rather than proof that a capability does
not exist.

## Conflicts

The Product Vision Board recommends validated strategy statements, while the
confirmed skill must also support early ideas that cannot yet be validated.
The skill resolves this by preserving the board's dimensions while explicitly
labelling observations, user-confirmed direction, research, hypotheses, and
unknowns. It does not describe hypotheses as validated findings.

## Limitations

The method can establish a coherent product definition from repository and
user evidence, but it cannot prove customer demand, usability, technical
feasibility, or business viability without the corresponding research and
experiments. Impact Mapping establishes a causal hypothesis, not proof that a
feature will create the intended impact.

## Method

On 2026-07-15, primary descriptions from the method authors and organisations
were compared against the confirmed use cases. Each method was tested for a
distinct responsibility, overlap with composed skills, applicability to new
and existing products, and risk of crossing into roadmap or implementation
planning. The selected stack was falsified against early unvalidated ideas,
existing repositories whose implementation conflicts with intent, vague user
segments, and feature lists without outcome traces.

## Primary sources

- [The Product Vision Board](https://www.romanpichler.com/blog/the-product-vision-board/) — Roman Pichler, updated 2025-10-13, accessed 2026-07-15; vision and product-strategy structure.
- [The Value Proposition Canvas](https://www.strategyzer.com/library/the-value-proposition-canvas) — Strategyzer, published 2026-01-28, accessed 2026-07-15; customer jobs, pains, gains, and value mapping.
- [Drawing impact maps](https://www.impactmapping.org/drawing.html) — Impact Mapping, accessed 2026-07-15; goal, actor, impact, and deliverable trace.
- [The Four Big Risks](https://www.svpg.com/four-big-risks/) — Silicon Valley Product Group, published 2017-12-04, accessed 2026-07-15; value, usability, feasibility, and viability risk taxonomy.
