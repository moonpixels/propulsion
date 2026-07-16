---
name: review-architecture
description: Reviews a codebase or scope for high-value modular redesigns, persists a Markdown review, and opens a disposable visual HTML shortlist. Use when modular architecture needs assessment.
metadata:
    invocation: user
disable-model-invocation: true
---

# Review Architecture

The **visual information-seeking mantra** turns an evidence-backed modular review into an impact-grouped overview for people and a durable implementation reference for agents.

## Process

### 1. Establish the review

Use the user's explicit scope or the whole repository with the slug `full-codebase`. Inspect applicable project context, architecture decisions, source, tests, contracts, schemas, dependencies, runtime configuration, and documentation. Exclude generated output, vendored dependencies, caches, and binaries unless they participate in a material boundary. Invoke `$modular-design` as the architecture authority. The scope, exclusions, project constraints, and modular baseline are explicit.

### 2. Select the redesigns

Read [Architecture Analysis](references/architecture-analysis.md). Recover confirmed and inferred quality drivers, map the current capabilities and contracts, and trace material architecture pressure to precise repository locations. Apply **design it twice** to every serious candidate and load `$modular-design` techniques only when their conditions fit. Invoke `$research` only when a recommendation materially depends on an external claim requiring durable verification. Retain every redesign that clears the evidence threshold, assign stable two-digit IDs in ranked order, and group the set by explained `high`, `medium`, or `low` impact. Zero recommendations is valid.

### 3. Persist the review

Write the canonical report to `docs/architecture/YYYYMMDD-{scope}-architecture-review.md`; preserve an existing path with `-2`, `-3`, and so on unless replacement is explicit. For each recommendation, make the issue, fix, benefit, affected architecture, current and target design, evidence, rejected alternative, costs, risks, dependencies, migration route, smallest useful slice, containment, and fitness checks independently understandable. Record coverage without a qualifying redesign and material limitations. Stop before implementation or a file-by-file plan.

### 4. Present the visual shortlist

Read [Report Design](references/report-design.md), then create a disposable `architecture-review-{timestamp}.html` in the operating system's temporary directory and open it for the user. Give it the same recommendation IDs, ordering, conclusions, and technical substance as the Markdown report. Show the complete set as `High impact`, `Medium impact`, and `Low impact`; make each collapsed card understandable through an aligned before-and-after visual and plain-language `Issue`, `Fix`, and `Benefit`, with technical depth available on demand. Add filters only when they materially improve navigation.

### 5. Verify and hand off

Verify the Markdown paths, links, structure, and implementation sufficiency, then compare both artifacts for matching IDs and claims. Inspect the HTML at desktop and narrow widths, exercising disclosure, applicable filters, pointer and keyboard operation, focus, overflow, external dependencies, and print output. Correct material defects; when browser inspection is unavailable, mark visual acceptance incomplete. Return both report paths, scope and exclusions, recommendation IDs and count, invoked research, validation performed, and unresolved limitations. Preserve the reviewed implementation unchanged.
