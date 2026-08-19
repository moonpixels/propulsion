# {Feature name} solution design

<!-- Preserve the project's established structure when one exists. Include only applicable material sections and omit empty boilerplate. -->

## Summary and authorities

<!-- Summarise the selected technical solution and link the approved specification, applicable PRODUCT.md system requirements, relevant CONTEXT.md terms and ADRs, inspected current-system evidence, and durable research. Do not restate the feature's what or why. -->

## Design drivers

<!-- State the feature-specific forces, architecture constraints, current-versus-target differences, and material quality, migration, operational, compatibility, or evolution needs that shape the solution. -->

## Selected solution

<!-- Describe one coherent solution and its material selected choices and consequences. Include rejected alternatives only when needed to understand a consequential trade-off, risk, or qualifying ADR. -->

## Affected responsibilities and boundaries

<!-- Map affected system responsibilities, ownership, information hidden, dependency direction, enabling refactors, and any introduced boundary or component. Describe capabilities rather than a file or class inventory. -->

## Interfaces and contracts

<!-- Define only the consumer-relevant precision for interfaces, events, protocols, data shapes, invariants, ordering, errors, and compatibility. A small example is acceptable only when indispensable to make a contract unambiguous. -->

## Data

<!-- Cover applicable ownership, lifecycle, consistency, concurrency, transactions, privacy, retention, migration, backfill, rollback, restoration, and recovery. -->

## Integrations

<!-- Cover applicable protocols, authentication, authorization, idempotency, retries, timeouts, partial failure, reconciliation, trust boundaries, and failure ownership. -->

## Cross-cutting concerns

<!-- Add only material subheadings such as Security and privacy, Performance and capacity, Resilience, Accessibility and compatibility, or Runtime and deployment. -->

## Migration and compatibility

<!-- Describe transition, mixed-version behaviour, rollout constraints, rollback, and removal of temporary paths only where safe implementation depends on them. This is not a release plan. -->

## Operations

<!-- Cover material observability, diagnosis, alerting, operational controls, recovery, and support implications. -->

## Verification strategy and seams

<!-- Map the behaviours and risks to observable seams and the project-required or risk-triggered evidence, environments, fixtures, or infrastructure needed to verify them. Do not create an exhaustive test-case inventory. -->

## Implementation and dependency notes

<!-- Identify implementation-sized seams, genuine dependencies, enabling refactors, and sequencing constraints only far enough to prove decomposability. Do not create tickets, estimates, priorities, or file-by-file instructions. -->

## Risks and trade-offs

<!-- Record material consequences, residual risks, assumptions, and conditions that would reopen the design. Link qualifying ADRs instead of duplicating their rationale. -->

## Traceability

### Specification to design

| Specification behaviour or acceptance condition | Design responsibility or contract | Verification seam or evidence |
| --- | --- | --- |
| {Use a stable specification label or concise exact reference.} | {Owning design element.} | {Observable verification boundary.} |

### Design to authority

| Introduced design element or obligation | Originating specification or architecture need |
| --- | --- |
| {Responsibility, component, contract, data shape, migration, integration, operational change, or verification mechanism.} | {Linked or exact authority reference.} |
