---
name: review-architecture
description: Reviews a codebase or scope for high-value modular redesigns and produces an interactive HTML report. Use when architecture boundaries, coupling, abstractions, or change isolation need assessment.
metadata:
    invocation: user
disable-model-invocation: true
---

# Review Architecture

**Information hiding** turns codebase evidence into modular redesigns whose
small, stable contracts hide cohesive implementation and change-prone decisions.

## Steps

1. Establish the review scope. Use the user's explicit scope or the whole
   repository with the slug `full-codebase`. Convert an explicit scope to a
   concise lowercase hyphenated slug. Inspect project context, architecture
   decisions, source, tests, contracts, schemas, dependencies, build and
   deployment configuration, and documentation. Exclude generated output,
   vendored dependencies, caches, and binaries from detailed analysis unless
   they participate in a material boundary. The inspected scope and exclusions
   are explicit.
2. Recover quality drivers from explicit project evidence, then apply the
   priority order in [Architecture Analysis](references/architecture-analysis.md).
   Distinguish confirmed drivers from inference. Ask the user only when an
   unknown priority could materially change which redesigns qualify or how they
   rank. The review has an evidence-backed quality hierarchy.
3. Use the reference's diagnostics to map cohesive capabilities, public
   contracts, hidden decisions, dependency direction, adapters, seams, runtime
   boundaries, verification, and change propagation. Treat a module as a
   capability with a contract, not as a directory, file, class, or service.
   Record repository-relative paths and precise locations for material
   evidence. The current architecture and its material pressures are traceable.
4. Apply **design it twice** to every serious candidate. Compare at least two
   materially different boundaries, including their contracts, hidden
   decisions, dependency direction, quality effects, trade-offs, and migration
   seams. Use principles and patterns from the reference only when their
   conditions fit the evidence. Discard rearrangements, new layers, and
   fashionable patterns that do not materially improve a priority quality. Each
   candidate has a tested alternative and a codebase-specific rationale.
5. Invoke `$research` when a candidate materially depends on an external
   framework, language, platform, or architecture claim that warrants durable
   verification. Use the resulting report as evidence and link it from the
   architecture report without duplicating its source catalogue. Repository
   evidence remains sufficient when no material external claim exists.
6. Evaluate candidates with explained `high`, `medium`, or `low` impact,
   effort, risk, and confidence labels; do not calculate a composite score.
   Retain every redesign that clears the reference's high-value threshold,
   whether none or many, and rank retained recommendations through the quality
   hierarchy and evidence. Record reviewed areas without a qualifying redesign
   as concise coverage rather than low-value findings. The result contains no
   quota, filler, suppressed qualifying redesign, or exhaustive debt catalogue.
7. For each recommendation, define the evidenced problem, affected modules and
   contracts, target boundary, rejected alternative, expected quality
   improvements, framework fit, costs, risks, dependencies, incremental stages,
   containment or rollback route, smallest useful first slice, and observable
   architecture fitness checks. Stop before changing implementation or
   producing a file-by-file implementation plan. Every recommendation is
   independently understandable, actionable, and verifiable.
8. Read [Report Design](references/report-design.md), then create one interactive
   HTML file at
   `docs/architecture/YYYYMMDD-{scope}-architecture-review.html`. Preserve an
   existing path by adding `-2`, `-3`, and so on before `.html` unless the user
   explicitly requests replacement. Generate the overview, comparison,
   diagrams, progressive detail, evidence, coverage, and research links from
   the completed analysis. The artifact follows the report contract and no
   existing report is unintentionally overwritten.
9. Validate the HTML structure and inspect the report in an available browser
   at desktop and narrow widths. Verify loaded scripts and styles, diagrams,
   filters, pointer and keyboard operation, visible focus, collapsed and
   expanded states, overflow, and print output. Correct every material content,
   interaction, accessibility, or layout defect. When browser inspection is
   unavailable, complete structural checks and mark visual acceptance as
   incomplete. The report is either visually accepted or carries an explicit
   verification limitation.

## Handoff

Return the report path, scope and exclusions, recommendation count, invoked
research reports, validation performed, and unresolved evidence or visual-QA
limitations. Preserve the reviewed implementation unchanged.
