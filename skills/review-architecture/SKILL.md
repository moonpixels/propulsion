---
name: review-architecture
description: Review a codebase for consequential modular-design improvements and save an interactive HTML report grounded in current evidence.
---

# Review architecture

Find the strongest current opportunities to improve modular structure. Deliver one report, including an evidence-backed **zero-candidate result** when no change qualifies.

## Inputs

Use the request, repository guidance, product and domain authorities, applicable decisions, current revision, and starting worktree state. Review the whole codebase unless the request narrows the scope. Exclude dependencies, generated output, vendored code, and obsolete paths from recommendations. Use the requested destination or existing architecture-report convention, defaulting to a new dated HTML file under `docs/architecture/`. Preserve existing reports unless replacement was requested.

## Method

1. Map capabilities and inspect the source, tests, contracts, schemas, configuration, and operational evidence needed to understand their structure. Inspect relevant history for repeated cross-file changes and hotspots; use it as supporting evidence without overlooking quieter areas. Distinguish project authority, current observation, inference, and unknowns.
2. Apply `$modular-design` to the current evidence. Invoke `$research` only when a material candidate depends on external evidence that the repository cannot establish; read its report before deciding whether the candidate qualifies.
3. Retain candidates with precise repository evidence, a credible structural cause, a material present benefit, and visible trade-offs or uncertainty. Reject cosmetic cleanup, unsupported smell labels, speculative abstractions, and minor or hypothetical benefits. Claim only improvements caused by the recommended direction. Rank qualifying candidates by present consequence, evidence, likely benefit, and feasibility, without a fixed count. Identify the top recommendation and record coverage and meaningful areas where no candidate qualified.
4. Write the report using the template. Keep each recommendation, reason, and improvement visible; place detailed evidence and trade-offs in expandable sections. Preserve the selected order. Add a candidate-specific current-versus-recommended visual when it clarifies the relationship. Escape repository-derived text and remove template markers. Keep recommendations at the structural-direction level; detailed interfaces, migration plans, and tickets belong to later work.
5. Validate the report structure and cited paths. Inspect the rendered report when a browser or renderer is available, including narrow-screen readability and expandable evidence. Fix presentation defects; report unavailable visual checks honestly. Recheck the revision for material drift and confirm that only the report changed apart from pre-existing work.

## Conditional resources

Use [the report template](assets/report-template.html) for the HTML output. Adapt its presentation while preserving the revision, coverage, recommendation fields, fixed order, expandable evidence, and zero-result markers.

Run [the report validator](scripts/validate-report.js) with `bun /path/to/validate-report.js <report.html>`. It requires Bun, reads one local HTML file without mutation or network access, and returns JSON. Exit 0 means structural checks passed, 1 means report defects, and 2 means invalid usage. Correct defects and rerun. It checks structure, not factual claims or rendered quality.

## Finish

Return the report path, ordered candidate titles or zero-candidate result, reviewed revision, invoked research, validation, and limitations. Done when the report matches current evidence, coverage and uncertainty are visible, and available structural and visual checks are complete. Stop before implementation, authority changes, detailed design, specifications, tickets, committing, or publication.
