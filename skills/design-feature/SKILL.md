---
name: design-feature
description: Designs an approved feature specification into a confirmed, buildable, system-specific technical solution. Use when feature behaviour is settled and needs solution design before ticket creation.
metadata:
    invocation: user
disable-model-invocation: true
---

# Design Feature

Designs one approved feature specification into one buildable technical solution without redefining the feature or implementing it. A force- and risk-led process uses selective **arc42 viewpoints** to expose the feature's context, boundaries, runtime, deployment, cross-cutting concerns, decisions, and risks; **bidirectional requirements-to-design traceability** and **scenario walkthroughs** keep the result complete and necessary.

## Prerequisites

Require the approved feature `specification.md`, root `PRODUCT.md`, and relevant root `CONTEXT.md` and ADRs. Inspect them before continuing. When an authority is missing, inadequate, or contradictory in a way that prevents a complete solution, report the exact prerequisite or gap and stop. Leave missing feature intent to a later `$specify-feature` session and missing system-wide requirements to a later `$define-product` session; do not invoke either or manufacture its outcome.

Refine an existing paired solution design when requested, preserving unrelated confirmed content and local conventions.

## Process

### 1. Freeze authorities and evidence

Inspect the request, prerequisite authorities, existing paired solution design, repository guidance, and the project's feature-record convention. Inspect only the relevant code, tests, contracts, schemas, configuration, runtime and deployment evidence, similar implemented patterns, and material external technical or regulatory evidence needed to design this feature. Treat the specification as authority for detailed feature intent, `PRODUCT.md` as authority for its product foundation and system-wide requirements, applicable ADRs as authority for their accepted decisions, `CONTEXT.md` as authority for project language, and current implementation as evidence of current constraints and idioms rather than automatic intended design. The user remains authority for material system-specific trade-offs, feature scope, and any proposed departure from those authorities.

Separate confirmed future behaviour, system-wide requirements and accepted decisions, observed current state, and unresolved claims. Inspect obvious facts before asking questions. When a material product behaviour, rule, or acceptance boundary is missing or contradictory, identify the exact specification gap and stop rather than silently deciding it. When a material system-wide requirement is absent or the feature would require changing the product foundation, identify the exact foundation gap and stop rather than embedding it in this design.

Invoke `$elicit-with-context` only when material user-held information or a system-specific trade-off remains unresolved. Let it ask one question at a time and, once invoked, use its complete-synthesis confirmation for this design. Otherwise obtain the same explicit whole-design confirmation directly in step 6. Invoke `$research` when a material external technical or regulatory claim could change the design and its evidence must persist; link its report instead of copying it. Each utility returns evidence or decisions to this session and owns neither the solution document nor continuation.

Invoke `$maintain-ubiquitous-language` inline whenever consequential project terminology is independently confirmed, changed, misused, or contradicted. It alone owns the corresponding `CONTEXT.md` update; this skill retains the solution-design outcome and verification. Apply a glossary change before whole-design confirmation only when its meaning is confirmed independently of the proposed solution. Keep terminology that depends on an unconfirmed design choice unchanged until that choice is confirmed.

The solution-design authority, runtime evidence, unresolved gaps, and permitted decision routes are explicit before solution selection begins.

### 2. Map behaviour to design forces

Map every material behaviour, rule, state, scenario, external constraint, and acceptance condition in the specification to affected system responsibilities and a credible verification seam. Identify the feature's entry points, trust boundaries, owned knowledge, data and integration flows, current-versus-target differences, and material quality, migration, operational, compatibility, and evolution forces. Trace each proposed new component, contract, data shape, migration, or operational obligation back to a specification behaviour, system-wide requirement, or applicable ADR; remove anything with no such origin.

Invoke `$modular-design` with the confirmed behaviour, system-wide requirements, applicable ADRs, project language, and current evidence. Use its structural findings as passive constraints on ownership, information hiding, cohesion, contracts, dependency direction, seams, and change locality while retaining responsibility for alternatives, user decisions, the complete solution, verification, and stopping.

The affected architecture, design forces, risks, and two-way traceability are complete enough to compare coherent solutions without selecting implementation detail prematurely.

### 3. Compare and select the solution

Compare viable system-specific alternatives for every material choice. Prefer the smallest coherent complete solution that follows established project and framework idioms, keeps knowledge with its natural owner, offers deep stable contracts, localises plausible change, and avoids speculative abstraction. Consider the consequences for the relevant forces, failure modes, migration, operations, verification, and likely evolution. Do not let current code win by default when it conflicts with the confirmed target, and do not introduce a new seam or component without evidenced variation, ownership, boundary, migration, or observation value.

Resolve material trade-offs with the user through `$elicit-with-context` when invoked. Select one internally coherent solution and record each material selected option and its consequences. Retain rejected alternatives only when they are needed to understand a consequential trade-off, risk, or qualifying ADR; avoid alternative essays.

The selected solution is justified by runtime constraints and confirmed decisions rather than familiarity or template completeness.

### 4. Complete the technical design

Develop only the applicable design depth needed for safe ticket decomposition:

- map acceptance and behaviour to affected responsibilities, boundaries, ownership, information hiding, dependency direction, and enabling refactors;
- define internal and external interfaces, contracts, events, protocols, data shapes, invariants, ordering, errors, and compatibility at the precision consumers need;
- resolve data ownership, lifecycle, consistency, concurrency, transactions, privacy, retention, migration, backfill, rollback, and recovery;
- resolve integration protocols, authentication, authorization, idempotency, retries, timeouts, partial failure, reconciliation, and ownership of failure;
- resolve material security and threat controls, performance and capacity, resilience, observability, operability, support, and technical accessibility or compatibility concerns;
- define runtime and deployment effects plus rollout or transition constraints only where safe implementation depends on them; and
- identify the project-required and risk-triggered verification seams, evidence, environments, fixtures, or infrastructure needed to establish the designed behaviour.

Omit immaterial concerns. Keep externally contractual detail already owned by the specification exact; otherwise select internal detail only to the level that constrains implementation meaningfully. Remain specific enough to decompose later without turning the design into code, a file or class inventory, framework wiring, executable configuration, or an exhaustive task list.

The solution is coherent across structure, data, integrations, cross-cutting concerns, transition, operations, and verification.

### 5. Walk implementation scenarios

Walk the solution end to end through the main behaviour, material adverse and recovery paths, likely evolution, and migration and rollback where applicable. Follow each scenario across responsibilities, contracts, data, integrations, trust boundaries, failure ownership, observability, and verification seams. Challenge concurrency, partial execution, retries, incompatible versions, failed migration or backfill, restoration, and operational diagnosis when the runtime evidence makes them material.

Use these walks to expose missing ownership, contradictions, duplicated rules, unstable dependencies, untraceable design elements, acceptance conditions without verification seams, or a solution that cannot be divided safely. Identify implementation-sized seams, genuine dependencies, enabling refactors, and sequencing constraints only far enough to prove the design is decomposable; do not create tickets, ticket IDs, estimates, priorities, or a delivery plan. Reopen only the affected design choice and repeat the applicable walk after any change.

The selected solution survives its material operating, change, failure, transition, and verification scenarios and has credible decomposition seams.

### 6. Confirm the complete design

Present one concise, self-contained synthesis covering authorities, drivers, selected solution, affected responsibilities and dependency direction, interfaces and contracts, data, integrations, material cross-cutting concerns, migration and compatibility, operations, verification, implementation dependencies, risks, trade-offs, and both traceability directions. Include every proposed terminology update and ADR rationale.

Identify an ADR candidate only when `$maintain-decision-records`' four gates appear to pass and the user agrees that the durable rationale is warranted. Most feature choices belong only in the solution design. Obtain a new explicit response confirming the whole synthesis; selecting an earlier option is not confirmation. If the user rejects or corrects it, leave the solution design and ADRs unchanged, leave terminology proposed only within the rejected synthesis unapplied, reopen every affected evidence-backed choice, repeat the applicable traces and scenarios, and confirm the complete revised synthesis. Independently confirmed glossary updates already applied inline remain valid after rejection.

The confirmed synthesis supplies authority for the agreed writes without another application prompt.

### 7. Write the solution design and context

Follow the project's established feature-record convention. Otherwise write beside the specification at `docs/features/<feature-slug>/solution-design.md` using the [Solution Design Template](assets/solution-design-template.md). Preserve unrelated confirmed content and local structure when refining an existing design. Include only material sections and omit empty boilerplate. Link authorities and durable evidence rather than duplicating them.

Record the selected how and its consequences at design precision. Use a small example only when indispensable to make a contract unambiguous. Do not rewrite the specification's what or why, duplicate live implementation state, prescribe file-by-file or method-by-method work, or include tickets, code scaffolding, estimates, priorities, releases, or deployment execution.

After writing the solution design, invoke `$maintain-decision-records` for every confirmed qualifying ADR and `$maintain-ubiquitous-language` for confirmed terminology not already applied inline. The prior whole-design confirmation supplies authority for design-dependent terminology and explicit durable-rationale agreement only for ADRs included in that synthesis. Each utility owns only its context artifact; this skill retains the solution-design outcome and verification.

The approved solution and only its warranted durable context are recorded in their owning artifacts.

### 8. Verify and stop

Verify every material specification behaviour and acceptance condition has a design responsibility and verification seam, and every introduced responsibility, component, contract, data shape, migration, integration, operational obligation, and verification mechanism traces back to a specification or architecture need. Rewalk the main, adverse, evolution, migration, and rollback scenarios that apply. Check responsibility ownership, contract compatibility, dependency direction, data lifecycle, integration failure handling, cross-cutting constraints, operational diagnosability, safe transition, and implementation decomposability for internal coherence.

Verify statements against their authorities, links and paired path, preservation of unrelated content, and every context-maintenance result. Confirm the design has not changed product behaviour, smuggled in a system-wide architecture decision, duplicated live state, created tickets, or become code or file-level implementation instructions.

Report changed files, authorities and supporting evidence, selected solution and material trade-offs, verification performed, and unresolved limitations. Stop after the confirmed solution design and applicable context records are written and verified; do not create tickets, estimate, prioritise, scaffold, implement, commit, publish, release, or deploy.
