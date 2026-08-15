---
name: maintain-context
description: Continually maintains confirmed project terminology and rare ADRs. Use when project language is introduced, changed, misused, or contradicted, or an accepted decision needs durable rationale.
metadata:
    invocation: model
disable-model-invocation: false
---

# Maintain Context

Adapted **Ubiquitous Language** keeps confirmed project-specific terminology consistent. Maintain one concise root `CONTEXT.md` glossary inline during ordinary work and, exceptionally, preserve the rationale for a qualifying accepted decision in an ADR.

## Process

### 1. Inspect the language

When project language is introduced, changed, misused, or contradicted, inspect the relevant conversation or caller handoff, root `CONTEXT.md`, applicable repository guidance, and only the code or product evidence needed to understand that language. Challenge inconsistent uses of established terms. The candidate term, current meaning, and any contradiction are explicit without loading unrelated project context.

### 2. Resolve the meaning

Accept terminology already established by authoritative project evidence or explicitly agreed with the user. A caller's agreed in-scope update supplies authority to persist that meaning without another permission prompt. When a material meaning, conflict, rename, or deprecation remains unresolved, return it to an active `$elicit` caller or invoke `$elicit` when none is active, and leave durable context, including the existing entry, unchanged until agreement. One meaning is confirmed or the unresolved decision returns to the caller.

### 3. Update the glossary inline

As confirmed language arises, update `CONTEXT.md` before the surrounding work continues. Create the root file lazily from the [context template](assets/context-template.md). Preserve unrelated terms and the document's local format; edit only affected entries and prefer changing an existing entry to adding a duplicate. Reconcile a confirmed change across affected entries. Retain an alias or deprecation only while it helps interpret current project evidence, and remove obsolete wording only when its replacement is confirmed and losing it will not obscure that evidence.

Give each canonical term one short plain-language definition, normally one or two sentences, using project-native wording. Include only durable project-specific terms, distinctions, roles, boundaries, or aliases that future agents need to interpret the project consistently; group them naturally when useful. `CONTEXT.md` explains what the language means. It does not store skill procedures, generic guidance, task status, roadmaps, volatile implementation facts, architecture inventories, schemas or endpoints, acceptance criteria, or anything reliably discoverable from code. Keep product intent in `PRODUCT.md`, system structure in `ARCHITECTURE.md`, feature behaviour in its specification, and implementation detail in code. The glossary is current without duplicating another authority.

### 4. Gate a rare ADR

Consider an ADR only for an accepted technical or architectural decision that passes every gate:

- changing it later has meaningful cost;
- a future reader would find it surprising without context; and
- viable alternatives created a genuine trade-off; and
- no existing durable authority is the better owner, including `PRODUCT.md`, `ARCHITECTURE.md`, a feature document, or a dedicated governance record.

When every gate passes, obtain the user's explicit agreement to preserve the rationale durably. Explicit agreement recorded in the relevant conversation or caller handoff satisfies this gate without another prompt. A decision that misses a gate, lacks that agreement, or is routine or discoverable produces no ADR. The exceptional record has a confirmed owner and purpose.

### 5. Record and verify the result

When the user agrees, follow the project's existing ADR convention; when none exists, create `docs/architecture/decisions/` lazily. Write the next record from the [ADR template](assets/adr-template.md) and name it `NNNN-short-title.md`. Use `0001` when no sibling filename matches `NNNN-*.md`; otherwise add one to the maximum four-digit `NNNN` among matching siblings. Keep exactly three substantive sections in order: `Decision`, `Context`, and `Ramifications`. Record the accepted choice, why it was needed, only the rejected or constrained alternatives necessary to explain its trade-offs, and its material consequences.

Re-read each changed context artifact against the confirmed meaning, accepted decision, and relevant evidence. Return the changed files or why no durable update was warranted, plus unresolved terminology for the caller to resolve. Change no caller-owned product, architecture, feature, code, external state, or verification outcome. The caller receives a concise context update and retains its surrounding outcome.
