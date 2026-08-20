---
name: define-product
description: Defines a breadth-first product and system requirements foundation. Use when externalising a new product idea or deliberately revising PRODUCT.md.
metadata:
    invocation: user
disable-model-invocation: true
---

# Define Product

Turns a product idea or existing system into one confirmed `PRODUCT.md` that supplies product intent and system-wide requirements to later feature specifications.

## Process

### 1. Establish the evidence boundary

Locate the project root; read its repository guidance and check root `PRODUCT.md`, `CONTEXT.md`, applicable ADRs and research. For an existing system, also inspect the smallest representative public contracts, entry points, data, tests, configuration, and operational evidence needed to understand the product. Record absent foundation files as absent evidence rather than skipping the check.

Treat the user as authority for intended direction, repository and runtime evidence as evidence of current behaviour, and cited external sources as authority only for the claims they establish.

Separate confirmed target requirements, observed current behaviour, assumptions, and unknowns before questioning. Preserve unrelated confirmed content and local conventions when revising the foundation. When the current product is difficult to reconstruct, load [Discovery Techniques](references/DISCOVERY.md). The evidence, provenance, contradictions, and unresolved decisions are explicit.

### 2. Elicit the breadth-first foundation

Invoke `$elicit-with-context` for material user-held information and decisions throughout steps 2–4. Reuse compatible confirmed answers and derive discoverable facts before questioning. Invoke `$research` when a material external claim could change a requirement and its evidence must persist; link the resulting report rather than copying it.

Establish the foundation from problem to design inputs:

1. authority and executive orientation;
2. purpose, problem, vision, users, actors, stakeholders, and needs;
3. value, product and business goals, observable success measures, scope, boundaries, and non-goals;
4. current situation and confirmed target direction when an existing system makes the distinction material;
5. end-to-end journeys from entry through value, recovery, support, and completion or exit;
6. a whole-product functional capability catalogue; and
7. system-wide quality, context, interface, data, integration, security, privacy, safety, compliance, technology, platform, operational, and lifecycle requirements.

Map the whole product before deepening any capability or technical concern. Omit a foundation concern only after establishing that it is immaterial. Record commercial or market detail only when it changes requirements. The product surface and every material system-wide design input are visible without becoming a feature specification.

### 3. Shape traceable requirements

Group capabilities under natural product areas. Give each a stable `CAP-*` identifier and a mini-brief containing its actors and value, high-level externally observable responsibility, meaningful inclusions and exclusions, and source need, goal, journey, obligation, or evidence. Do not add routine delivery or current-state metadata. Leave user stories, detailed functional and non-functional feature requirements, business rules, states, scenarios, examples, and acceptance criteria to later feature specifications.

Give every material technical requirement a stable semantic identifier, such as `QUAL-*`, `INT-*`, `DATA-*`, `SEC-*`, `TECH-*`, or `OPS-*`. State the requirement, rationale and source, affected scope, and observable measure or later-verifiable response when applicable. Distinguish hard constraints from preferences. Record mandated external contracts, platforms, runtimes, database families or drivers, hosting limits, and standards as constraints; do not select internal boundaries, components, schemas, endpoints, payloads, algorithms, frameworks, deployment topology, controls, or other implementation mechanisms merely to fill the document. Later feature specifications own the feature-specific technical how, and ADRs own qualifying architecture decisions and rationale.

Record assumptions, dependencies, constraints, risks, and open questions distinctly. A non-blocking unresolved item states its evidence, consequence if wrong, affected requirements, owner, and resolution trigger. Do not confirm the foundation while an unresolved item makes the product boundary unsafe or prevents responsible feature specification.

### 4. Confirm readiness

Walk every intended user and lifecycle stakeholder across the journeys, capabilities, and applicable technical requirements. Resolve material omissions, duplicates, broken transitions, contradictory ownership, untraceable requirements, hidden feature depth, and requirements that prescribe unconfirmed design. Check that every normative requirement is necessary, feasible enough for this stage, unambiguous at its level, source-traceable, and capable of later verification.

Have `$elicit-with-context` present one complete synthesis covering the entire proposed foundation, non-blocking unresolved items, and exact document effect. Obtain explicit confirmation of the whole synthesis. If the user rejects or corrects it, leave `PRODUCT.md` unchanged, reopen every affected branch, repeat the relevant coverage walk, and confirm the complete revision. The confirmed synthesis authorises its agreed `PRODUCT.md` write without another permission prompt.

### 5. Write the foundation

Create or update the single root `PRODUCT.md` using the [Product and System Requirements Template](assets/product-template.md). Keep one authority even when some sections are omitted as immaterial. Preserve unrelated confirmed content and stylistic local structure. Use stable identifiers and direct links so later feature specifications can trace to the foundation without copying it. Assign identifiers to capabilities, material technical requirements, product-level acceptance, and unresolved records that need downstream reference; do not number every narrative section, goal, measure, or journey by default.

State each fact and requirement once, then link its identifier. Keep journeys, readiness, acceptance, and evidence from restating the catalogue; add no traceability matrix when inline source traces already establish coverage.

### 6. Verify and stop

Verify intended direction against the confirmed synthesis, current claims against inspected evidence, terminology against `CONTEXT.md`, and material external claims against cited research. Check authority, scope, journeys, capability and technical-requirement coverage, identifier uniqueness, source traceability, internal consistency, explicit non-blocking uncertainty, product-level acceptance, and foundation readiness. Confirm the absence of delivery status, priorities, roadmap, releases, tickets, detailed feature acceptance, selected feature implementation, internal architecture inventory, and unsupported precision.

Report changed files, supporting evidence, verification, non-blocking unresolved items, and limitations. Stop after `PRODUCT.md` and the context changes owned by invoked skills are verified. Do not create feature specifications, ADR decisions, work items, scaffolding, implementation, releases, or deployments.
