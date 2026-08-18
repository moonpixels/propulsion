---
name: maintain-decision-records
description: Maintains rare architecture decision records. Use when explicitly invoked to test and preserve an accepted technical or architectural decision's durable rationale.
disable-model-invocation: true
---

# Maintain Decision Records

Preserves the rationale for exceptional accepted technical or architectural decisions in concise Architecture Decision Records.

## Process

### 1. Inspect the decision

Inspect the accepted decision, relevant conversation or caller handoff, existing `docs/adr/` records, applicable repository guidance, and only the product, architecture, feature, governance, or implementation evidence needed to establish its owner and rationale. Do not scan unrelated decisions. The candidate decision, alternatives, consequences, existing coverage, and user authority are explicit.

### 2. Gate the record

Create an ADR only when the accepted technical or architectural decision passes every gate:

- changing it later has meaningful cost;
- a future reader would find it surprising without context;
- viable alternatives created a genuine trade-off; and
- no existing durable authority already records the decision or is its better owner, including `PRODUCT.md`, `ARCHITECTURE.md`, a feature document, or a dedicated governance record.

Require the user's explicit agreement to preserve the rationale durably. Agreement recorded in the relevant conversation or caller handoff satisfies this gate without another prompt. When every other gate passes but agreement is absent, ask the user one direct question. A decision that misses a gate, lacks agreement, or is routine or discoverable produces no ADR.

### 3. Write the ADR

Create `docs/adr/` lazily and write the next record from the [ADR template](assets/adr-template.md). Name it `NNNN-decision-shaped-slug.md`: use `0001` when no sibling matches `NNNN-*.md`; otherwise add one to the largest four-digit prefix. Keep exactly three substantive sections in order: `Decision`, `Context`, and `Consequences`. Record the accepted choice, why it was needed, only the rejected or constrained alternatives necessary to explain its trade-offs, and its material consequences.

### 4. Verify the result

Re-read the ADR against the accepted decision, every gate, the user's agreement, and relevant evidence. Return the created file or why no ADR was warranted. Change no caller-owned product, architecture, feature, code, external state, or verification outcome.
