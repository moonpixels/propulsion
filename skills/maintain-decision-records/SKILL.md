---
name: maintain-decision-records
description: Preserve exceptional accepted technical or architectural decisions in concise ADRs when durable rationale may be warranted.
---

# Maintain decision records

Record the rationale for an exceptional accepted technical or architectural decision. Keep routine choices and decisions owned elsewhere out of `docs/adr/`.

## Inputs

Use the accepted decision, conversation or caller handoff, applicable repository guidance, existing ADRs, and only the evidence needed to establish alternatives, consequences, authority, and existing coverage.

## Method

1. Create a record only when **all** conditions hold: changing the choice later has meaningful cost; it would surprise a future reader without context; viable alternatives created a real trade-off; and no existing durable authority already records it or is its better owner.
2. Require explicit user agreement to preserve the rationale. Relevant conversation or a caller handoff can supply that agreement. If the other conditions hold but agreement is absent, ask one direct question. A routine, discoverable, unaccepted, or already-owned decision produces no ADR.
3. Create `docs/adr/` lazily. Name the record `NNNN-decision-shaped-slug.md`, using `0001` when no sibling matches `NNNN-*.md`, otherwise one above the largest four-digit prefix. Use the template's `Decision`, `Context`, and `Consequences` sections in that order. Capture the accepted choice, reason, necessary rejected alternatives, and material consequences.
4. Re-read the record against the accepted decision, evidence, eligibility conditions, and agreement.

## Conditional resources

Use [the ADR template](assets/adr-template.md) when a record qualifies and the user has agreed to preserve it.

## Finish

Return the created path or why no ADR was warranted. Leave caller-owned product, feature, architecture, implementation, external state, and verification outcomes unchanged.
