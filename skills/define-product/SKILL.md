---
name: define-product
description: Create or deliberately revise PRODUCT.md as a confirmed whole-product intent and system requirements foundation for later feature specification.
---

# Define product

Produce one confirmed root `PRODUCT.md` that owns whole-product intent and system-wide requirements. Keep feature design and delivery work in their later authorities.

## Inputs

Read project guidance and check `PRODUCT.md`, `GLOSSARY.md`, applicable ADRs, and research. For an existing system, inspect representative public contracts, entry points, tests, data, configuration, and operational evidence needed to understand its product surface. Treat absent files as absent evidence. Preserve unrelated confirmed content and local conventions.

The user supplies intended direction. Repository and runtime evidence establishes current behaviour. External sources establish only the claims they support. Separate confirmed targets, observed behaviour, assumptions, and unknowns.

## Method

1. **Map the whole product.** Establish purpose, problem, users and relevant actors, needs, value, goals and observable success measures, scope and non-goals. Walk journeys from entry through value, refusal or failure, recovery or support, and completion or exit. Map the functional capability catalogue before deepening any one capability. Include commercial or market detail only when it changes requirements.
2. **Capture design inputs.** Cover material system-wide qualities, context, interfaces, information duties, integrations, security, privacy, safety, compliance, mandated technology or platforms, operations, and lifecycle. Establish immateriality before omitting a concern. Invoke `$elicit-with-context` for material user-held information or decisions. Invoke `$research` when a material external claim needs durable evidence; link its report.
3. **Make requirements traceable.** Give capabilities stable `CAP-*` identifiers, actors and value, high-level observable responsibilities, meaningful boundaries, and source traces. Give material technical requirements semantic identifiers such as `QUAL-*`, `INT-*`, `DATA-*`, `SEC-*`, `TECH-*`, or `OPS-*`, with their requirement, rationale and source, affected scope, and observable measure or later-verifiable response where applicable. Distinguish hard constraints from preferences.
4. **Keep the foundation at its level.** Record mandated external contracts, platforms, runtimes, database families or drivers, hosting limits, and standards. Leave detailed feature rules, scenarios, acceptance, and selected internal mechanisms to feature specifications. Qualifying architecture rationale belongs in ADRs. State each obligation once and link its identifier rather than repeating it across journeys or readiness sections.
5. **Resolve readiness.** Walk intended users and relevant lifecycle actors through the journeys, capabilities, and system requirements. Resolve material omissions, broken transitions, contradictions, untraceable requirements, and unconfirmed design. Distinguish assumptions, dependencies, constraints, risks, and open questions. For non-blocking uncertainty, record evidence, consequence if wrong, affected requirements, and resolution condition or later user-agent step. An item that makes the product boundary unsafe or prevents responsible feature specification blocks confirmation.
6. **Confirm and write.** Use an existing confirmed synthesis when it covers the complete foundation, remaining non-blocking items, and exact document effect without a material change since agreement. Otherwise invoke `$elicit-with-context` with those inputs. Invoke `$write-prose` for `PRODUCT.md`, supplying the confirmed synthesis, supporting evidence, intended product and engineering readers, and the template or existing document structure. Reopen affected understanding if coverage changes afterward. Number only records that need downstream reference.

## Conditional resources

- Use [the product template](assets/product-template.md) when writing the foundation, omitting only established immaterial content.
- Read [discovery techniques](references/discovery.md) when representative inspection and ordinary elicitation cannot reconstruct the product or expose its breadth.

## Finish

Re-read the document against confirmed direction, inspected current evidence, glossary, and cited research. Check coverage, consistency, unique identifiers, source traces, explicit uncertainty, product-level acceptance, and readiness for feature specification.

Return paths, evidence, checks, and unresolved limitations. Stop after the foundation and context changes owned by invoked skills. Keep delivery status, priorities, roadmaps, releases, tickets, detailed feature acceptance, and selected feature implementation out of the foundation; create no downstream work or deployment.
