# {Product name}

> **Authority:** This document owns confirmed whole-product intent and system-wide requirements. Feature specifications refine it without silently changing it.

<!-- Git owns revision history. Do not add delivery or release status or a hand-maintained change log. -->

## Executive summary

{Orient readers with intended users, problem, product outcome, distinguishing approach, and consequential boundaries or constraints.}

## Purpose, problem, and vision

{Describe the problem, why it matters, the product's purpose, and the positive change sought without prescribing implementation.}

## Users, actors, stakeholders, and needs

- **{Role or group}:** {Context, needs, pain, and desired outcomes.}

## Value, goals, and success measures

{Record goals with observable measures, baselines, direction or threshold, measurement source, and horizon where known. Include commercial or market position only when it changes requirements.}

## Scope, boundaries, and non-goals

### In scope

- {Included outcome or responsibility.}

### Non-goals

- {Durable exclusion and the focus or ownership boundary it preserves.}

## Current situation and target direction

<!-- Use for an existing product when material. Cite observed evidence and state confirmed direction and gaps without migration or delivery status. Omit for a blank product. -->

{Current evidence, target direction, and material gaps.}

## Key journeys

### {Journey name}

**Actors:** {Users, stakeholders, or external systems.}

{Narrate entry, outcome, major stages, consequential interactions, recovery or support, and completion or exit. Reference capabilities without repeating their mini-briefs or adding feature scenarios.}

## Functional capabilities

### {Natural product area}

#### CAP-01 — {Capability name}

- **Actors and value:** {Beneficiaries, need, and enabled outcome.}
- **High-level responsibility:** {One coherent statement of externally observable product behaviour.}
- **Boundaries:** {Important inclusions, exclusions, and adjacent capabilities.}
- **Source trace:** {Need, goal, journey, obligation, research, or current evidence.}

<!-- Repeat only necessary product areas and mini-briefs. Do not add a routine State field or detailed rules, scenarios, feature requirements, or acceptance criteria. -->

<!-- Use the compact local record below for each material technical requirement. Add an observable measure or later-verifiable response to the requirement when applicable. State each obligation once and link its ID elsewhere. -->

### {PREFIX}-01 — {Requirement name}

{One direct normative requirement.}

- **Source:** {Confirmed or cited rationale and evidence.}
- **Scope:** {Journeys, capabilities, actors, data, interfaces, or environments governed.}

## Quality requirements

{Use `QUAL-*` records for material qualities in their operating context.}

## System context and external interfaces

{Briefly describe people and external systems, ownership, exchanges, direction, and trust boundaries. Use `INT-*` records for binding interaction, protocol, standard, ownership, and failure expectations without inventing endpoints, payloads, or adapters. Add a context diagram only when it materially clarifies relationships.}

## Data and information requirements

{Use `DATA-*` records for material purpose, categories, sources or sinks, ownership, sensitivity, lifecycle, retention, residency, provenance, scale, or transition obligations.}

## Integrations and external dependencies

{Use `INT-*` records for external parties or systems, purpose, exchanges, ownership, mandated contracts, support expectations, failure consequences, or substitution constraints. Link the applicable interface records instead of repeating them.}

## Security, privacy, safety, and compliance

{Use `SEC-*` records for protection or assurance outcomes, actor or data scope, trust boundaries, audit obligations, applicable instruments and versions, and risk tolerance.}

## Technology and platform constraints

{Use `TECH-*` records for mandated or prohibited platforms, runtimes, languages, database families or drivers, hosting, environments, standards, supported clients, licences, or vendors. State hard versus preferred.}

## Operational and lifecycle requirements

{Use `OPS-*` records for availability, support, recovery, capacity, observability, audit, deployment restrictions, maintainability, export, archival, continuity, or retirement outcomes.}

## Assumptions, dependencies, constraints, risks, and open questions

<!-- Keep each type explicit. Use one compact paragraph per material record. -->

- **Assumption `ASM-01` — {claim}:** {Evidence; consequence if wrong and affected IDs; owner and resolution trigger.}
- **Dependency `DEP-01` — {condition or party}:** {Evidence; consequence and affected IDs; owner and trigger.}
- **Constraint `CON-01` — {limit}:** {Source and rationale; affected scope; change owner or trigger.}
- **Risk `RSK-01` — {uncertainty}:** {Evidence; consequential effect and affected IDs; owner and review trigger.}
- **Open question `OQ-01` — {question}:** {Why non-blocking; consequence and affected IDs; decision owner and trigger.}

## Product-level acceptance and foundation readiness

### Product-level acceptance

- **ACC-01:** {Whole-product journey, system-wide outcome, or conformance obligation that one feature cannot own cleanly.}

### Foundation readiness

{State evidence that the foundation is coherent and safe for downstream feature specification, plus residual limitations. Do not restate the catalogue, self-certify with a checklist, or claim uninspected evidence.}

## Evidence and traceability

{Link supplied or inspected research, current-system evidence, applicable ADRs, and `GLOSSARY.md`. Do not invent dates, roles, or provenance. Do not add a traceability matrix when the identifiers and inline source traces already establish coverage.}
