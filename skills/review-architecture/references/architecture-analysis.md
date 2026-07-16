# Architecture Analysis

Load this reference while selecting and ranking redesigns. `$modular-design` owns architecture vocabulary, information hiding, deep modules, realization, and conditional techniques; this reference owns review-specific evidence and judgment.

## Quality Priority

Apply the first evidenced priority in this order:

1. Safety, correctness, security, and data integrity constraints.
2. Explicit project quality drivers.
3. Qualities defined by `$modular-design`.
4. Testability and migration safety.
5. Operability, reliability, performance, scalability, and portability when material to the system.

Recover drivers from product and domain context, architecture decisions, public promises, tests, operational configuration, incidents, recurring changes, and repository history when available. Express a material driver as a scenario with a stimulus, affected capability, expected response, and observable measure. Label inference and confidence; ask the user only when an unavailable priority would materially change qualification or rank.

## Evidence and Comparison

Map capabilities rather than assuming directories, classes, packages, services, or deployment units are architecture modules. For each material pressure, trace the owned knowledge, public contract, consumers, dependencies, runtime boundaries, verification seams, and repeated change propagation to repository-relative paths and precise locations. Separate observations, supported conclusions, and uncertainty. Metrics may locate candidates but cannot prove a redesign.

For every serious candidate compare at least two materially different capability boundaries. State each contract, hidden knowledge, dependency direction, quality effects, framework and runtime fit, migration seam, first useful slice, containment, costs, and risks. A naming, file-placement, or interface-syntax variation is not a second design. Prefer the alternative that hides more consequential knowledge behind the simpler stable contract while satisfying the higher-priority evidence.

## Qualification and Rank

A recommendation qualifies only when it:

- materially improves a priority quality;
- traces its problem and expected improvement to repository evidence;
- hides or realigns architectural knowledge rather than rearranging code locally;
- has a credible incremental route with visible dependencies and risks; and
- is supported strongly enough to recommend with material uncertainty exposed.

Retain every qualifying redesign and none below the threshold. Record non-qualifying areas only as review coverage. Assign labels with a one-sentence evidence rationale:

- **Impact:** `high` changes a constraint or explicit driver, or removes repeated high-reach pressure; `medium` materially improves a bounded capability; `low` produces a worthwhile but contained architectural gain.
- **Effort:** `high` crosses several boundaries or requires staged data, contract, or deployment work; `medium` needs coordinated changes; `low` is contained behind an existing seam.
- **Risk:** `high` threatens behaviour, data, security, public contracts, or runtime continuity; `medium` needs managed integration; `low` is isolated and readily reversible.
- **Confidence:** `high` follows direct repeated evidence and executable verification; `medium` combines credible evidence with limited inference; `low` depends materially on missing context.

Do not calculate a composite score. Order impact groups `high`, `medium`, then `low`; rank within a group by quality priority, evidence reach, confidence, and migration feasibility. Assign `01`, `02`, and onward after ranking, and preserve those IDs across both reports regardless of filtering.

## Migration and Fitness

Define stages that keep the system operable and verifiable: prerequisites, smallest independently useful slice, old/new coexistence, data or contract transition, containment or rollback, and superseded-path removal. Replace a high-risk boundary incrementally; replace a safe local boundary atomically. Stop before a file-by-file implementation plan.

Pair each claimed benefit with observable fitness evidence. State the signal, expected result, and where it should run, using existing contract tests, dependency checks, change-impact checks, adapter conformance, runtime thresholds, telemetry, or deployment signals when they prove the quality. Propose new machinery only when existing verification cannot.
