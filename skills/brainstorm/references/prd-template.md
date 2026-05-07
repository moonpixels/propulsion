# PRD Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using this exact section order.

```md
# <Feature Title> PRD

## Problem Statement

State the problem in user language.

## Solution

Describe the proposed behaviour end-to-end from the user's perspective.

## Goals

- Goal 1
- Goal 2

## Non-Goals

- Explicit non-goal 1
- Explicit non-goal 2

## User Stories

| ID     | User Story                                           |
| ------ | ---------------------------------------------------- |
| US-001 | As a <actor>, I want <behaviour>, so that <benefit>. |
| US-002 | As a <actor>, I want <behaviour>, so that <benefit>. |

## Functional Requirements

| ID     | Requirement                                  |
| ------ | -------------------------------------------- |
| FR-001 | When <context>, the system must <behaviour>. |
| FR-002 | The system must <behaviour> when <context>.  |

## Non-Functional Requirements

| ID      | Category    | Requirement                                   |
| ------- | ----------- | --------------------------------------------- |
| NFR-001 | Performance | <operation> must complete within <threshold>. |
| NFR-002 | Security    | The system must <security requirement>.       |

## Implementation Decisions

- Durable module or boundary decisions
- Data shape or API contract decisions
- Interaction rules that the `plan` skill should not re-litigate

## Implementation Inputs

- External links or references to check out
- Business rules or constraints that must be respected
- References to tickets, docs, or other internal resources that are relevant to implementation

## Testing Decisions

- What public behaviour matters
- Which modules or seams deserve tests
- Prior art worth copying from the repo

## Out Of Scope

- Deferred idea
- Thing that must not be implemented

## Notes

- Any further notes about the feature
```

## Rules

These rules are MANDATORY.

- ALWAYS follow the template structure and section order exactly as specified.
- MUST use the following non-functional requirement categories:
    - Performance: Response times, throughput, and resource utilisation under normal and peak loads.
    - Reliability: System availability, fault tolerance, and error recovery capabilities.
    - Security: Data protection, authentication, authorisation, and compliance with relevant standards.
    - Usability: User experience, accessibility, and ease of use across different user groups.
    - Scalability: Ability to handle increased load and growth in users or data volume.
    - Maintainability: Code quality, documentation, and ease of future modifications.
    - Compatibility: Cross-platform support, browser compatibility, and integration capabilities.
    - Portability: Ability to deploy across different environments and infrastructure.
    - Compliance: Adherence to industry standards, regulations, and organisational policies.
    - Monitoring: Observability, logging, and alerting capabilities for operational support.
- MUST ensure there's a LONG and EXTENSIVE list of user stories, functional requirements, and non-functional requirements to cover all aspects of the feature.
- DO create supporting documents with mermaid diagrams, data models, or other relevant artefacts if they help clarify the feature or implementation.
