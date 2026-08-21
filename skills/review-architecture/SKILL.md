---
name: review-architecture
description: Reviews a whole codebase for high-impact evidence-backed modular-design improvements and writes an interactive HTML report. Use for architecture or structural maintainability reviews.
disable-model-invocation: true
---

# Review Architecture

Finds the most consequential current opportunities to improve a codebase's modular structure and explains them in one interactive HTML report.

## Process

### 1. Establish whole-codebase evidence

Inspect the request, repository guidance, root `PRODUCT.md` and `CONTEXT.md`, applicable ADRs, current revision, and starting worktree state. Treat the whole repository as the review scope while honouring explicit exclusions. Map its capabilities and inspect the source, tests, contracts, schemas, configuration, and operational evidence needed to understand current structure. Exclude dependencies, generated output, vendored code, and obsolete paths from recommendation coverage.

Inspect relevant Git history after mapping the repository. Use repeated cross-file changes and hotspots as supporting evidence and ranking signals without excluding quieter areas. Distinguish project authority, current observation, inference, and unknowns.

Invoke `$modular-design` with the authorities and current evidence. Apply its structural teaching while retaining ownership of investigation, candidate qualification, ranking, the report, and stopping. Invoke `$research` only when a material candidate depends on external framework, platform, or technical evidence that the repository cannot establish; read its report before deciding whether the candidate qualifies.

### 2. Retain only top-level candidates

Require each candidate to have precise current repository evidence, a credible structural cause, a material present benefit, and visible trade-offs or uncertainty. State only the recommended structural direction, why it matters, and what it improves. Claim only improvements caused by that structural direction; do not imply that it establishes correctness, safety, or another quality it cannot demonstrate. Reject cosmetic cleanup, unsupported smell labels, speculative abstractions, and changes whose benefit is minor or hypothetical.

Keep only the highest-impact qualifying candidates. Use no fixed count. Order them by explicit qualitative judgement of present consequence, evidence, likely benefit, and feasibility; preserve that fixed order and identify the top recommendation. Zero candidates is a valid result. Record reviewed coverage and meaningful non-qualifying areas so absence of recommendations remains trustworthy.

### 3. Write the interactive report

Write only `docs/architecture/YYYYMMDD-full-codebase-architecture-review.html`, using `-2`, `-3`, and later numeric suffixes when a same-day path exists unless replacement was explicit. Copy and complete [the report template](assets/report-template.html). Escape repository-derived text before placing it in HTML and remove every template marker.

Keep each candidate's recommendation, reason, and improvement always visible. Put exact file and history evidence, trade-offs, and uncertainty in one native expandable section. Do not add filters, reordering, scores, detailed target interfaces, file-by-file changes, migration steps, test prescriptions, tickets, or an implementation plan.

Add a current-versus-recommended visual only when it makes the structural relationship materially easier to understand. Design it specifically for that candidate with accessible HTML or inline SVG; add another CDN library only when it clearly improves the explanation. Omit a weak, generic, or decorative visual.

### 4. Verify and stop

Run the bundled `scripts/validate-report.js` with Bun and the report path. Re-read the report against the fixed order and current evidence; verify every cited repository path and material claim, the top recommendation, coverage, limitations, HTML escaping, and absence of leftover markers. Recheck the revision for material drift and confirm that only the report changed apart from pre-existing work. Do not open the report or perform rendered visual review.

Return the report path, ordered candidate titles or the zero-candidate result, reviewed revision, invoked research, verification, and limitations. Stop without changing implementation or project authorities, elaborating a detailed design, creating specifications or tickets, committing, or publishing.
