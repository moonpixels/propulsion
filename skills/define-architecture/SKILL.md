---
name: define-architecture
description: Establishes a durable technical foundation for a new or existing system. Use when the product foundation is confirmed and later feature solutions need system-wide architecture constraints.
metadata:
    invocation: user
disable-model-invocation: true
---

# Define Architecture

Establishes one user-confirmed, system-specific technical foundation breadth-first, then tests it against representative change before recording it. Selective **arc42 architecture-description concepts** keep drivers, constraints, context, responsibility views, cross-cutting concerns, runtime, deployment, and risks inspectable without adopting its full template. The result constrains later feature solutions without duplicating current implementation or designing an individual feature.

## Prerequisites

Require a confirmed root `PRODUCT.md` and relevant root `CONTEXT.md`. Inspect both before continuing. When either is missing, or the product foundation is too incomplete or contradictory to establish its technical drivers, report the exact prerequisite and stop; leave product definition to a later `$define-product` invocation rather than manufacturing it here.

## Process

### 1. Establish the evidence boundary

Inspect the request, `PRODUCT.md`, `CONTEXT.md`, existing `ARCHITECTURE.md` and ADRs, repository guidance, and material technical, organisational, regulatory, and operational constraints. For an existing system, inspect the smallest representative runtime and deployment evidence needed to understand principal entry points, responsibilities, data stores and flows, integrations, contracts, and trust boundaries. Treat code, configuration, contracts, tests, and deployment evidence as current implementation evidence, not intended architecture by default. Preserve confirmed unrelated content and local documentation conventions. The evidence is separated into confirmed intent, observed current architecture, and unresolved gaps before questioning begins.

Invoke `$elicit` throughout steps 2–6 for material user-held information and technical trade-offs. Derive discoverable facts first and ask exactly one material decision at a time. Invoke `$research` when a material external technical or regulatory claim could change a decision and its evidence must survive the session; use obvious local facts directly and an incidental lookup for external facts that need not persist. Invoke `$prototype` only when one bounded visual or interactive uncertainty would be resolved better by the least elaborate disposable artefact than by discussion. Supporting utilities own only their contract-specific mutations and return their results to this session.

Keep `ARCHITECTURE.md` unchanged until the complete synthesis is explicitly confirmed.

### 2. Establish drivers and context

Establish the architecture goals, product and organisational drivers, highest-priority material quality needs, fixed constraints, external actors and systems, scope, and trust boundaries. Express quality needs with enough observable context to compare consequences without manufacturing precision. Distinguish an existing system's observed current state, confirmed target direction, and unresolved gap wherever conflating them could mislead later design. The forces that the technical foundation must balance are explicit before a solution structure is proposed.

### 3. Establish responsibilities and boundaries

Map the principal system capabilities or responsibility boundaries, their coherent owners, information hidden behind each boundary, dependency and communication direction, and major contracts future feature designs must respect. Invoke `$modular-design` with the confirmed behaviour, drivers, constraints, and current evidence; use its structural findings as passive constraints while retaining ownership of architecture alternatives, user decisions, and this document. Prefer the smallest justified boundaries and deep, stable contracts that localise plausible change. Compare viable alternatives and their consequences for each material structural trade-off, then leave the choice to the user. The proposed foundation has coherent ownership and explicit dependency rules without mirroring the source tree.

### 4. Complete the technical foundation

Establish only the system-wide decisions and constraints that are material across the following concerns:

- technology strategy and justified constraints;
- data domains, ownership, lifecycle, consistency, privacy, and retention;
- integrations, external dependencies, protocols, and failure boundaries;
- security, reliability and resilience, observability, performance and scalability, accessibility and compatibility, operability, and testing or verification strategy; and
- deployment and runtime topology at an enduring conceptual level.

Omit a concern when it is not material. Record what future designs must preserve, what cannot yet be reliably inferred, and why a constraint exists. Leave endpoints, schemas, classes, files, framework wiring, executable configuration, library inventories, ephemeral deployment details, ticket or roadmap state, and feature-specific solutions to their owning evidence and later sessions. The proposed foundation is proportionate and contains no speculative implementation inventory.

Invoke `$maintain-context` inline when consequential terminology is confirmed, changed, misused, or contradicted. It alone owns the corresponding `CONTEXT.md` update. Treat `ARCHITECTURE.md` as the main living synthesis. Identify and test an ADR candidate only when `$maintain-context`'s four gates appear satisfied, then include its rationale and the user's explicit durable-record agreement in the final synthesis. Do not invoke `$maintain-context` to record an ADR before that whole synthesis is confirmed, and reject routine, discoverable, or section-level choices as candidates.

### 5. Walk representative change

Walk representative current and likely capability changes from product intent through actors, boundaries, contracts, data, integrations, cross-cutting constraints, and runtime consequences. Use these walks to expose contradictions, missing ownership, unstable dependency direction, or a foundation that would force scattered change. Reopen only the evidenced architecture branch needed to resolve a failure, compare the viable consequences, and avoid elaborating the feature itself. The foundation can constrain plausible later solution designs without pretending to settle them.

### 6. Confirm the complete synthesis

Have `$elicit` present one concise, complete synthesis covering drivers and context, responsibilities and dependency direction, technology and data strategy, integrations and material cross-cutting constraints, current-versus-target distinctions, trade-offs, evolution constraints, unresolved material risks, and every proposed ADR rationale. Obtain explicit user confirmation of the whole synthesis. Create no ADR record from any candidate until the complete synthesis, or a revised synthesis after rejection, is confirmed. If the user rejects or corrects it, leave `ARCHITECTURE.md` unchanged, reopen only affected evidence-backed branches, repeat the relevant change walks, and reconfirm the complete revised synthesis. The confirmed synthesis supplies authority for its agreed document writes without a second permission prompt.

### 7. Record the architecture

Create or update the single root `ARCHITECTURE.md` using the [Architecture Foundation Template](assets/architecture-template.md) when the project has no stronger convention. Preserve unrelated confirmed content and local structure when it differs only stylistically. Omit empty or immaterial sections rather than filling boilerplate. Use prose, tables, or repository-native diagrams only when they materially clarify relationships. Keep canonical term meanings in `CONTEXT.md`, external evidence in research reports, and exceptional rationale in qualifying ADRs instead of duplicating them.

After writing `ARCHITECTURE.md`, invoke `$maintain-context` for every confirmed qualifying ADR and for confirmed terminology not already applied. The prior architecture confirmation supplies explicit agreement only for ADR rationales included in that synthesis.

### 8. Verify and stop

Verify every recorded statement against the confirmed synthesis and its authority: product intent against `PRODUCT.md`; terms against `CONTEXT.md`; current claims against inspected system evidence; target direction and trade-offs against user confirmation; and external claims against cited research. Check that responsibilities, dependency directions, data ownership, integration failure boundaries, and material quality constraints agree with one another and that the representative changes still fit. Confirm preservation of unrelated content and absence of implementation inventory, feature design, scaffolding, priorities, tickets, releases, or deployment execution.

Report changed files, evidence and limitations, current-versus-target gaps, unresolved material risks, and the next available later session without starting it. Stop after the foundation and warranted context records are written and verified; do not scaffold code, select an individual feature solution, create work items, implement, release, or deploy.
