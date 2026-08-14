---
name: maintain-context
description: Continually maintains confirmed project terminology and rare ADRs. Use when project language is introduced, changed, misused, or contradicted, or an accepted decision needs durable rationale.
metadata:
    invocation: model
disable-model-invocation: false
---

# Maintain Context

**Ubiquitous Language** keeps project-specific terminology consistent across conversation, documentation, and code. Maintain one root `CONTEXT.md` as a concise glossary during ordinary work; preserve only rare qualifying architecture decisions separately.

## Process

### 1. Notice project language

Act whenever a material project term is introduced, changed, misused, or contradicted during the caller's work. Compare its meanings in the active discussion and root `CONTEXT.md`, then inspect only the relevant code or authoritative documents needed to expose a conflict. State the conflicting meanings and their sources plainly. The term and any disagreement are explicit.

### 2. Resolve the meaning

Challenge an inconsistent, vague, or overloaded meaning immediately. Propose one precise canonical term and test its project-specific meaning with concrete examples or boundary cases suited to the disagreement. Treat every source as evidence rather than automatic authority and obtain confirmation from the user or the caller's already-confirmed outcome. When the meaning remains unresolved, keep the conflict explicit and leave `CONTEXT.md`, including any existing entry, unchanged. One meaning is confirmed or its uncertainty remains visible.

### 3. Update the glossary inline

As soon as a meaning is confirmed, update `CONTEXT.md` before the surrounding work continues. Create the root file lazily from the [context template](assets/context-template.md) when the first term resolves. Give each canonical term one authoritative entry and define its project-specific meaning in one or two concise sentences, including only what is needed to explain the term. Group entries under descriptive headings when natural clusters emerge; otherwise keep one flat language list.

Change no code, specification, product, architecture, or other project artifact. Return every remaining conflict to the caller or artifact owner. The glossary reflects the confirmed language and other authorities retain their ownership.

### 4. Offer a rare ADR

Consider an architecture decision record only for an already accepted codebase decision that passes every gate:

- changing it later has meaningful cost;
- a future reader would find it surprising without context; and
- viable alternatives created a genuine trade-off; and
- neither `ARCHITECTURE.md` nor a feature record already explains it adequately.

When every gate passes, offer the ADR and let the user decide whether to record it. A decision that misses any gate remains routine and produces no ADR. The exceptional record has explicit user agreement.

### 5. Record and verify the result

When the user accepts the offer, create `docs/adr/` lazily and write the next record from the [ADR template](assets/adr-template.md). Derive the next four-digit sequence from filenames alone and name it `NNNN-decision-shaped-slug.md`. Use exactly `Decision`, `Context`, and `Ramifications` as content sections, in that order, and link only the supporting material needed to understand the choice. In every path, re-read each changed artifact against the confirmed language, accepted decision, and relevant evidence. Report changed files and each unresolved conflict with its owning artifact. The glossary and any qualifying ADR are concise, verified, and ready for the caller to continue.
