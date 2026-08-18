---
name: define-product
description: Establishes a durable whole-product foundation for later feature definition. Use when externalising a new product idea or redefining an existing product.
metadata:
    invocation: user
disable-model-invocation: true
---

# Define Product

Establishes one user-confirmed product foundation using an adapted **Product Vision Board** for strategic completeness and **User Story Mapping** for a mile-wide, inch-deep view of the whole product. The result guides later feature definition without becoming a feature specification, roadmap, or technical design.

## Process

### 1. Inspect the product evidence

Inspect the request, root `PRODUCT.md` and `CONTEXT.md`, repository guidance, applicable research and decisions, and, for an existing system, the smallest representative public contracts, entry points, data boundaries, code, tests, and configuration. Treat the repository as evidence of current behaviour and the user as authority on intended product direction. Surface contradictions, distinguish observed behaviour from stated direction, and treat missing evidence as unknown rather than absence. Do not turn the inspection into an implementation inventory. When an existing product is difficult to establish, load [Discovery Techniques](references/DISCOVERY.md). The known product evidence, its provenance, and the unresolved product decisions are explicit.

### 2. Establish the product frame

Invoke `$elicit-with-context` for material user-held knowledge and decisions throughout steps 2–5. Reuse the confirmed synthesis from a prior free-form `$elicit-with-context` session as resolved branches and ask only about gaps exposed by the product evidence. Establish concise executive orientation: purpose and vision; intended users, actors, and their needs and desired outcomes; value and meaningful alternatives or market position when applicable; product and business outcomes with observable success signals; business model or pricing only when material; and durable boundaries and non-goals. Derive discoverable facts before asking. The concise product frame is complete enough to orient the whole-product pass.

Invoke `$maintain-ubiquitous-language` inline whenever consequential project language is confirmed, changed, misused, or contradicted. It owns only the root `CONTEXT.md` glossary update; this skill retains the product outcome and stopping boundary.

Invoke `$research` when a material external subject could change the product decision and needs durable evidence; read and link its report rather than copying its findings wholesale. Use an incidental lookup when the evidence need not persist. Research returns evidence to this product session and owns neither `PRODUCT.md` nor continuation.

Keep `PRODUCT.md` unchanged until the complete whole-product synthesis is explicitly confirmed. Before then, supporting utilities may perform only the writes authorised by their own contracts.

### 3. Map the whole product

Map the product breadth-first before exploring any one capability. Walk each intended user from entry through recurring value, recovery, and exit or completion where applicable; use those journeys to expose the natural user-facing product areas and their high-level capabilities. Add commercial, account, trust, support, and genuinely cross-cutting areas only where the product needs them. Use the big-picture guidance in [Discovery Techniques](references/DISCOVERY.md) when the product surface is difficult to expose. The whole product is visible at low resolution without stories, screens, releases, or priorities.

### 4. Clarify the capability catalogue

Clarify every mapped capability only to mini-brief depth: who benefits and the value they receive, the externally observable high-level behaviour, and meaningful boundaries that prevent a later feature session from assuming adjacent behaviour. For an existing product, distinguish `Current` observed behaviour, `Confirmed direction`, and uncommitted `Idea` where the distinction prevents conflation; these describe product truth, not delivery progress or priority. Do not manufacture current claims for a blank product. Leave detailed rules, states, scenarios, acceptance conditions, technical solution, architecture, sequencing, releases, estimates, and tickets to their owning later sessions. Each capability is independently understandable without becoming a feature specification.

### 5. Confirm the whole-product synthesis

Walk every journey and capability across the relevant user perspectives. Resolve material omissions, duplicates, false groupings, broken transitions, contradictions, and capability descriptions that conceal more than one product behaviour. Have `$elicit-with-context` present one complete synthesis of the product frame, journeys, and capability catalogue and obtain the user's explicit confirmation; if the user rejects or corrects it, reopen the affected product work and reconfirm the complete revised synthesis. The confirmed foundation is coherent and ready to persist.

### 6. Write the product definition

After explicit confirmation, create or update the single root `PRODUCT.md` using the [Product Foundation Template](assets/product-template.md) where the project has no established convention; the invocation already supplies authority for this agreed write. Preserve unrelated confirmed content and local structure when it differs only stylistically. Record the concise frame and explicit key journeys, then use natural user-facing areas as `##` headings and capabilities as `###` headings without a redundant umbrella. Preserve confirmed status distinctions only where material. Link external claims to durable research and keep canonical term meanings in `CONTEXT.md`. `PRODUCT.md` is the sole product authority, not a backlog, status tracker, assumptions ledger, or implementation mirror.

### 7. Verify the definition

Verify current claims against inspected evidence, direction and ideas against user confirmation, and material external claims against linked research. Check coverage from frame to journeys to every capability mini-brief, coherence across user perspectives, consistency with `CONTEXT.md`, preservation of unrelated confirmed content, and absence of architecture, detailed feature behaviour, priorities, roadmap, releases, tickets, or implementation detail. Report changed files, evidence, and limitations. Stop after `PRODUCT.md` and applicable ubiquitous language are updated and verified; later architecture and feature definition remain separate sessions.
