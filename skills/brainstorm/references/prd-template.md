# PRD Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md` using this exact section order.

```md
# <Feature Title> PRD

## Problem Statement

State the problem in user language.

## Solution

Describe the proposed behaviour end-to-end from the user's perspective.

## Goals

- Goal

## Non-Goals

- Explicit non-goal

## User Stories

| ID     | User Story                                           |
| ------ | ---------------------------------------------------- |
| US-001 | As a <actor>, I want <behaviour>, so that <benefit>. |

## Functional Requirements

| ID     | Requirement                                  |
| ------ | -------------------------------------------- |
| FR-001 | When <context>, the system must <behaviour>. |

## Non-Functional Requirements

| ID      | Category    | Requirement                                   |
| ------- | ----------- | --------------------------------------------- |
| NFR-001 | Performance | <operation> must complete within <threshold>. |

## Implementation Decisions

- Durable module or boundary decisions
- Data shape or API contract decisions
- Interaction rules that the `plan` skill should not re-litigate

## Implementation Inputs

- External links, tickets, docs, or references
- Business rules or constraints

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
    - Performance: response times, throughput, resource use.
    - Reliability: availability, fault tolerance, recovery.
    - Security: data protection, authn/authz, compliance.
    - Usability: UX, accessibility, ease of use.
    - Scalability: growth in load, users, or data.
    - Maintainability: code quality, docs, future changes.
    - Compatibility: platform, browser, integration support.
    - Portability: deployment across environments.
    - Compliance: standards, regulations, policies.
    - Monitoring: observability, logging, alerting.
- MUST ensure user stories, functional requirements, and non-functional requirements cover all feature aspects.
- DO create supporting documents with mermaid diagrams, data models, or other relevant artefacts if they help clarify the feature or implementation.
