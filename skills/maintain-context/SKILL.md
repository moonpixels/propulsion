---
name: maintain-context
description: Actively maintains project language and architecture decisions. Use when domain terms or consequential codebase decisions emerge or change.
metadata:
    invocation: model
disable-model-invocation: false
---

# Maintain Context

**Ubiquitous Language** is an active discipline: challenge and refine project terms during ordinary discussion, then write each resolution into one root `CONTEXT.md` before the conversation moves on. Architecture decision records preserve only rare consequential choices.

## Process

### 1. Maintain the language inline

Apply this loop to each material domain term while the discussion is taking place:

- Compare it with the single root `CONTEXT.md` and inspect only the relevant code.
- Challenge glossary misuse immediately and quote the conflicting meanings.
- Sharpen vague or overloaded language by proposing one precise canonical term.
- Test the proposed meaning with concrete scenarios and edge cases that expose its boundaries.
- Use **Model-Driven Design** to surface disagreement between language and implementation. Treat code as evidence of current behaviour and the user's confirmed answer as intent.
- When the user resolves the term, update `CONTEXT.md` before continuing the discussion. Keep a genuine uncertainty explicit and leave its glossary entry unresolved.

Create the root file lazily from the [context template](assets/context-template.md) when the first term resolves. The durable language stays current with the conversation rather than accumulating for handoff.

### 2. Keep the glossary rigorous

Define domain meaning rather than implementation, specifications, or general programming concepts. Give each meaning one authoritative entry, keep its definition to one or two sentences, and add `_Avoid_` only for aliases or ambiguous alternatives that actually occur.

Use **Conceptual Contours** to group related terms under descriptive subheadings when meaningful domain clusters emerge; keep one flat language list when the terms form a cohesive area. If context-dependent meanings conflict with the single-context structure, surface that ambiguity instead of inventing another context file.

### 3. Offer ADRs sparingly

Use **Architecture Decision Records** only for an accepted codebase decision that passes all three gates:

- changing it later has meaningful cost;
- a future reader would find it surprising without context; and
- viable alternatives created a genuine trade-off.

Offer an ADR when all three pass and let the user decide whether to record it. A decision that misses any gate remains routine and produces no ADR.

### 4. Record a qualifying decision

After the user accepts the offer, create `docs/adr/` lazily and write the next record from the [ADR template](assets/adr-template.md). Derive the next four-digit sequence from filenames alone and name it `NNNN-decision-shaped-slug.md`. State the decision first, then only the context and significant ramifications needed to explain it; use exactly `Decision`, `Context`, and `Ramifications` as content sections, in that order. Link supporting material from the record. The ADR is brief, sequentially numbered, and readable from its filename.

### 5. Verify and hand off

Re-read each changed artifact against the resolved language, accepted decisions, and relevant code evidence. Report the files changed and the exact uncertainty behind any unresolved contradiction.
