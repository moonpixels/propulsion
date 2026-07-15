---
name: maintain-context
description: Maintains project language and architecture decisions. Use when domain terms or consequential codebase decisions emerge or change.
metadata:
    invocation: model
disable-model-invocation: false
---

# Maintain Context

**Ubiquitous language** keeps project terms rigorous through everyday use and
refinement; concise architecture decision records preserve the consequential
choices that shape the codebase.

## Steps

1. Compare domain language in the conversation with the root `CONTEXT.md` and
   relevant code. Challenge vague, overloaded, or conflicting terms, propose
   one precise canonical term, and test it with concrete scenarios and edge
   cases. Treat code as evidence of current behaviour and the user's confirmed
   answer as intent; surface contradictions for resolution. Reuse a compatible
   convention and obtain agreement before moving or reshaping conflicting
   durable records. The term is either validated with the user or remains
   explicitly unresolved.
2. As soon as a term is validated and agreed, create or update the single root
   `CONTEXT.md` using the [context template](assets/context-template.md). Keep
   definitions to one or two sentences, add `_Avoid_` only for aliases or
   ambiguous alternatives that actually occur, and group terms under descriptive
   subheadings when natural clusters emerge; keep a flat list when all terms form
   one cohesive area. Define domain meaning rather than implementation,
   specifications, or general programming concepts. Give each domain meaning one
   authoritative entry and link supporting material from it. The glossary
   reflects each resolved term before the discussion continues.
3. Test an accepted codebase decision against all three ADR gates:
    - changing it later has meaningful cost;
    - a future reader would find it surprising without context; and
    - viable alternatives created a genuine trade-off.

    Offer an ADR only when all three gates pass. The decision is either rejected
    as routine or identified as a qualifying architectural decision.

4. After a qualifying decision is accepted, create `docs/adr/` lazily and write
   the next record from the [ADR template](assets/adr-template.md). Derive the
   next four-digit sequence from filenames alone, and name the file
   `NNNN-decision-shaped-slug.md`. Use an inverted pyramid: state the decision
   first, then only the context and significant ramifications needed to explain
   it. Give each architectural decision one authoritative ADR. Require only
   `Decision`, `Context`, and `Ramifications` as content sections, in that order;
   reserve frontmatter for `status` and conditional supersession links. Link
   supporting material from that record. The new ADR is brief, accepted,
   sequentially numbered, and readable from its filename.
5. When an accepted decision changes, read only the specific ADR it supersedes,
   preserve that record, and create a new one. Set the old record's `status` to
   `superseded` with a relative `superseded-by` link, and give the new record a
   relative `supersedes` link; leave the old decision, context, and ramifications
   unchanged. Both records expose the decision history in both directions.
6. Re-read every changed artifact against the resolved language, accepted
   decisions, and relevant code evidence, then report the files changed and any
   unresolved contradiction. The handoff identifies a consistent durable
   record or names the exact uncertainty that prevented one.
