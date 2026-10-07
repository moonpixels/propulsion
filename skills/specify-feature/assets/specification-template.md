# {Feature name}

<!-- Replace prompts with confirmed content. Omit only immaterial conditional detail. Preserve identifiers and existing ticket links during revisions. -->

## Overview and scope

{Problem, beneficiary, desired outcome, current context and intended change. Link the originating request or product feature when available. State inclusions, exclusions and success conditions.}

## Behaviour

### Actors and use cases

{Actors, permissions and goals. For each material use case, state trigger, preconditions, main flow, successful result, alternatives, failures, recovery and guarantees on unsuccessful exit. Include relevant system-initiated events.}

### Rules and requirements

- **REQ-01:** {One unambiguous rule or requirement, including rationale where it affects interpretation.}

{Add state or decision tables when transitions or combinations matter. Define material data meanings, validation, defaults, timing, visibility and interactions. Link applicable product-wide requirements precisely.}

### Acceptance examples

#### {Scenario name}

- **Covers:** {Requirement IDs}
- **Given:** {Relevant initial state and concrete inputs}
- **When:** {Action or event}
- **Then:** {Observable result, including material state changes and forbidden effects}

{Cover material happy, boundary, denial, failure and recovery cases. State general quality or acceptance conditions that examples alone cannot express.}

## Consequential solution

{Selected approach, responsibilities and state ownership, public and shared contracts, important data shapes and invariants, integrations, failure handling, migration and operational requirements. Include only material aspects.}

{Explain load-bearing choices, relevant rejected alternatives and trade-offs. Link existing ADRs instead of restating their rationale. Identify the stable boundaries and evidence that can verify behaviour. Use a precise contract sketch or diagram where it communicates a decision better than prose.}

## Dependencies and remaining uncertainty

{External and existing-system dependencies, assumptions and risks with evidence, consequences and resolution conditions. Explicitly identify delegated implementation choices.}

## Evidence and readiness

{Precise links to inspected sources and research. State why scoped behaviour and consequential design are settled sufficiently for ticket planning, and any limits.}

## Tickets

<!-- Leave empty until tickets are created. Keep this section last. Preserve existing completion state. -->
