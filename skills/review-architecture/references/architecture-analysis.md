# Architecture Analysis

Load this reference while mapping, comparing, and ranking architecture redesigns. It supplies diagnostics and decision criteria; `SKILL.md` owns the workflow and report boundary.

## Quality Priority

Apply the first applicable evidence in this order:

1. Safety, correctness, security, and data integrity constraints.
2. Explicit project quality drivers.
3. The qualities defined by `$modular-design`.
4. Testability and migration safety.
5. Operability, reliability, performance, scalability, and portability when evidenced by the system.

Explicit project evidence overrides the baseline. Recover it from product and domain context, architecture decisions, public promises, tests, operational configuration, incidents, recurring changes, and repository history when available. Express a material driver as a concrete scenario: stimulus, affected capability or boundary, expected response, and observable measure. Label an inferred driver and its confidence. Ask the user when competing designs depend on an unknown priority that the repository cannot establish.

## Architecture Map

Map capabilities before proposing structure:

- the purpose and knowledge owned by each capability;
- its public contract, consumers, and promised behaviour;
- the implementation and change-prone decisions the contract hides;
- dependencies entering and leaving the boundary, including shared data;
- framework, storage, network, UI, process, and deployment adapters;
- test, replacement, migration, and operational seams;
- runtime flows for important quality scenarios;
- repeated changes that cross boundaries or force coordinated edits.

Do not infer an architectural boundary from a directory, namespace, class, package, service, or deployment unit alone. One architecture module may contain several internal actions, and one directory may mix several capabilities.

## Diagnostics

Use these as questions, not as a pattern checklist.

| Signal | Test | Redesign direction | Guardrail |
| --- | --- | --- | --- |
| Information leakage | Which consumers know a representation, ordering rule, protocol, framework type, or policy that belongs elsewhere? | Gather the knowledge behind one explicit contract. | Moving the same leaked fact to a new helper is not hiding it. |
| Shallow or pass-through interface | Does the interface expose nearly as much complexity as its implementation or repeat another layer's API? | Pull cohesive complexity behind a smaller contract or remove the redundant boundary. | A small function is not automatically a shallow architecture module. |
| Temporal decomposition | Are modules organised by processing steps although the underlying decisions change together? | Group by owned knowledge or capability rather than execution order. | Preserve genuinely independent pipeline stages. |
| Weak cohesion | Do unrelated actors, policies, or change reasons force edits to the same module? | Separate the knowledge that changes for different reasons. | Do not split cohesive internal actions merely to make files smaller. |
| Harmful coupling | Does a change propagate through consumers, create cycles, rely on shared mutable data, or reverse intended policy direction? | Narrow the contract, move ownership, introduce a seam, or invert the volatile dependency. | Coupling is necessary; remove knowledge and coordination, not all connection. |
| Missing seam | Can behaviour be verified or replaced only through the full runtime stack? | Expose the smallest purposeful contract at the volatile boundary. | Do not create interfaces without a verification, replacement, or migration need. |
| Framework leakage | Does domain or application policy depend on transport, persistence, UI, or vendor types? | Translate at an adapter and keep the capability contract in its own language. | Framework conventions may be the correct boundary for framework-owned code. |
| Duplicated policy | Is one rule reimplemented across entry points, services, jobs, or clients? | Give one cohesive module ownership and make callers depend on its contract. | Similar syntax is not necessarily the same policy. |
| Runtime boundary mismatch | Do process, transaction, data ownership, failure, or deployment boundaries cut through a supposedly atomic capability? | Align the contract and migration plan with actual consistency and failure constraints. | Do not force distribution when an in-process boundary is sufficient. |

Trace every material signal to repository-relative paths and precise locations. Separate observed facts, conclusions supported by several observations, and uncertainty. Metrics may locate candidates, but they do not prove a redesign.

## Design It Twice

For every serious candidate, compare at least two materially different designs. A variation in naming, file placement, or interface syntax is not a second design. For each alternative state:

- the capability boundary and public contract;
- the knowledge and volatile decisions hidden inside it;
- consumer and dependency direction changes;
- the quality scenarios it improves or worsens;
- framework fit and runtime consequences;
- migration seam, first useful slice, and containment route;
- new complexity, risks, and decisions it creates.

Prefer the design that hides more relevant knowledge behind the simpler stable contract while satisfying the higher-priority quality evidence. Reject an alternative explicitly; do not present the first plausible design as inevitable.

## Evaluation

Assign each label with a one-sentence evidence-based rationale:

- **Impact** — `high` changes a constraint or explicit driver, or removes a repeated high-reach pressure; `medium` materially improves a bounded capability; `low` is marginal or mostly local.
- **Effort** — `high` crosses several boundaries or requires staged data, contract, or deployment work; `medium` needs multiple coordinated changes; `low` is contained behind an existing seam.
- **Risk** — `high` threatens behaviour, data, security, public contracts, or runtime continuity; `medium` needs managed integration; `low` is isolated and readily reversible.
- **Confidence** — `high` follows direct repeated evidence and executable verification; `medium` combines credible evidence with limited inference; `low` depends materially on missing context or an unverified assumption.

Do not combine labels into a score. Rank qualifying recommendations by the quality priority, then the strength and reach of impact, confidence in the evidence, and migration feasibility and risk. Explain judgment where the order is not obvious.

A redesign qualifies only when it:

- materially improves at least one priority quality;
- traces the problem and expected improvement to repository evidence;
- hides or realigns architectural knowledge rather than performing a local refactor or cosmetic rearrangement;
- has a credible incremental route with known dependencies and risks; and
- is supported strongly enough to recommend, with material uncertainty visible.

Report every qualifying redesign and none below the threshold. Zero is valid; there is no minimum or maximum. Record non-qualifying areas only in review coverage.

## Migration and Fitness

For a retained redesign, define stages that keep the system operable and verifiable. Name prerequisites, the smallest independently useful first slice, coexistence between old and new boundaries, data or contract transition, containment or rollback, and removal of the superseded path. Route a high-risk replacement incrementally while old behaviour remains live; replace a safe local boundary atomically. Stop before a file-by-file implementation plan.

Pair each claimed improvement with observable fitness evidence, such as:

- forbidden or allowed dependency checks;
- public contract or quality-scenario tests;
- change-impact checks across module boundaries;
- adapter conformance or replacement tests;
- performance, reliability, security, or operability thresholds;
- deployment, telemetry, or runtime signals.

State the signal, expected result, and where it should run. Prefer existing verification when it proves the quality; propose new machinery only when needed.
