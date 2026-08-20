# {Feature name}

> **Authority:** This document owns the approved intent and selected solution for one feature. It is ready for ticket decomposition only when its readiness statement is satisfied.

<!-- Git owns revision history and the configured ticket system owns delivery state. Keep the stable headings below; omit conditional subsections and prompts that are not material. State each normative item once. Add identifiers only where they make later reference and traceability clearer. -->

## Feature overview

{Orient the reader with the feature, its source request or capability, current context, intended beneficiaries, and concise outcome.}

## Problem, outcomes, and success measures

{State the evidenced problem or opportunity, desired user or product outcomes, and only applicable measures with their source, baseline, direction or threshold, and horizon when known.}

## Scope and non-goals

### In scope

- {Included feature outcome or observable responsibility.}

### Non-goals

- {Excluded adjacent behaviour and the boundary it preserves.}

## Actors, goals, and use cases

### {ACT-01 — Actor or beneficiary}

{Goal and value sought from this feature.}

### {UC-01 — Use-case name}

- **Actor:** {Primary actor.}
- **Trigger:** {Observable event that starts the use case.}
- **Preconditions:** {Material conditions, if any.}
- **Successful outcome:** {Externally observable completion.}
- **Alternatives and exceptions:** {Only material refusal, adverse, recovery, or edge paths.}

## Feature intent

### Requirements and rules

- **REQ-01 — {Requirement name}:** {One necessary, unambiguous, verifiable normative statement.}

### States and transitions

<!-- Include when behaviour depends on lifecycle or allowed and forbidden transitions. A concise Mermaid state diagram may replace repetitive prose. -->

### Experience and design requirements

<!-- Record consequential content, interaction, accessibility, and experience outcomes. Link confirmed flows, prototypes, wireframes, or design-system evidence when material. -->

### Quality and external constraints

<!-- Record only feature-relevant qualities in their operating context and binding external product, regulatory, standards, or compatibility constraints. -->

### Scenarios and acceptance

#### SC-01 — {Scenario name}

- **Given:** {Observable starting context.}
- **When:** {Actor action or external event.}
- **Then:** {User-, assistive-technology-, contract-, or operating-interface outcome.}

**Covers:** {REQ-01 and any distinct acceptance identifiers evidenced by this scenario.}

#### Acceptance conditions

<!-- State general observable completion boundaries rather than paraphrasing scenario outcomes or requirements. A scenario may evidence an acceptance condition without becoming the only statement of its general rule. -->

- **ACC-01:** {Observable acceptance boundary stated once.}

## Selected solution

### Design drivers and current context

{Link the requirements, constraints, accepted decisions, and inspected current-system forces that shape the solution. Distinguish current evidence from selected direction.}

### Strategy and material decisions

{State the selected coherent approach and only the alternatives or trade-offs needed to understand a consequential choice.}

### Responsibilities and boundaries

{Describe affected capabilities, owned knowledge, contracts, dependency direction, and enabling changes without a file or class inventory. Use a small Mermaid context or runtime diagram when it clarifies the design.}

### Interfaces and data contracts

<!-- Define consumer-relevant inputs, outputs, invariants, ordering, errors, compatibility, and data shapes only to decision-complete depth. -->

### Data and lifecycle

<!-- Cover applicable ownership, states, consistency, concurrency, transactions, privacy, retention, migration, rollback, restoration, or removal. -->

### Integrations and failure handling

<!-- Cover applicable protocols, authentication, authorization, idempotency, retries, timeouts, partial failure, reconciliation, trust boundaries, and failure responsibility. -->

### Cross-cutting and operational design

<!-- Cover triggered security, privacy, safety, accessibility, performance, resilience, compatibility, rollout constraints, observability, support, and operation. -->

### Verification seams

{Identify the public or stable contract boundaries and evidence capable of establishing the selected behaviour. Do not prescribe an exhaustive test inventory.}

## Dependencies, assumptions, risks, and unresolved items

<!-- Keep each category explicit. Do not invent named owners or third-party workflow. -->

- **DEP-01 — {Dependency}:** {Evidence, consequence, and affected identifiers.}
- **ASM-01 — {Assumption}:** {Evidence, consequence if wrong, and affected identifiers.}
- **RSK-01 — {Risk}:** {Evidence, consequence, mitigation or design response, and affected identifiers.}
- **UNR-01 — {Non-blocking uncertainty}:** {Evidence, consequence if wrong, affected decisions, and resolution condition or later user-agent step; explain why ticket decomposition remains safe.}

## Traceability and readiness

| Intent or acceptance identifier | Selected responsibility or contract | Verification seam or evidence |
| --- | --- | --- |
| {REQ-01 or ACC-01} | {Design responsibility or contract.} | {Observable verification boundary.} |

| Introduced design element | Originating intent, constraint, evidence, or accepted decision |
| --- | --- |
| {Material responsibility, contract, data, integration, migration, operational, or verification element.} | {Exact identifier or linked authority.} |

### Readiness statement

{State concisely why later ticket creation can proceed without inventing observable behaviour or selecting a material solution, plus any non-blocking limitation. Do not recap the specification.}
