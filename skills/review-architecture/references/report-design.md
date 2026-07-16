# Architecture Review Report Design

Load this reference after the recommendation set is complete. The Markdown report is the durable implementation record; the disposable HTML is its visual decision view. They adapt presentation to their readers without changing recommendation IDs, order, claims, or technical substance.

## Markdown Record

Use this reading order:

1. Title, date, scope, exclusions, one-sentence outcome, and recommendation index.
2. `High impact`, `Medium impact`, and `Low impact` recommendation groups, omitting empty groups.
3. Review coverage and evidence limitations.
4. Method, invoked research reports, and validation status.

Name each recommendation `{ID}. {action-led title}`. Lead with three plain-language fields:

- **Issue:** the present architecture friction and consequence.
- **Fix:** the ownership, contract, or dependency change.
- **Benefit:** the concrete quality improvement.

Then preserve the affected modules and contracts, current and target design, repository evidence with precise locations, before-and-after explanation, rejected alternative, framework and runtime fit, costs, risks, uncertainty, dependencies, migration and coexistence stages, containment or rollback, smallest useful slice, and fitness checks. A downstream agent must be able to receive the Markdown path plus an ID and understand the bounded change without reopening the review.

## HTML Shortlist

Apply overview first and details on demand. The initial viewport identifies the review and exposes the impact-grouped recommendation set without introductory prose. Each card shows its ID, title, impact, before-and-after visual, `Issue`, `Fix`, and `Benefit`. Put evidence, alternatives, effort, risk, confidence, migration, and fitness checks in native disclosure. Show a direct zero-result state when no redesign qualifies.

Use filters only when the set is large enough that impact groups alone do not support comparison. Filtering changes visibility, never IDs, ranking, or report content; show the visible count and a clear reset.

## Visual Language

Apply **visual juxtaposition**: give every recommendation an aligned current/target pair that answers one question about changed ownership, hidden knowledge, dependency direction, runtime flow, or migration. Keep corresponding concepts in corresponding positions with consistent names, shapes, direction, and scale. At narrow widths, stack the pair while preserving that visual grammar. Simplify the visual rather than shrinking an unreadable whole-system map.

Choose the smallest useful form: a boundary or dependency graph, quality-scenario flow, ownership sketch, cross-section, or staged migration. Mermaid, inline SVG, and semantic HTML/CSS are all valid. Mix techniques when the evidence benefits; avoid ornamental diagrams. Give every visual an accessible name and adjacent textual explanation.

Use strong hierarchy, generous spacing, readable line lengths, restrained colour, and consistent cards. Paths and contracts may use monospace. Colour reinforces words and shapes rather than carrying meaning. Prefer semantic controls, visible focus, and native disclosure; interactions remain keyboard-operable. Provide responsive and print styles that preserve all content and expand technical details for printing.

Scripts, styles, fonts, and diagram libraries may load from verified CDNs when useful. Keep the generated artifact in one HTML file apart from those dependencies, escape repository-derived text for its destination context, and verify every selected dependency at generation time.

## Plain Language

Use **plain language** for `Issue`, `Fix`, and `Benefit`: state the point first, use active verbs and familiar concrete words, and keep one idea in each field. Preserve established domain, project, framework, and architecture terms when they are more precise. Move substantiation into disclosure instead of weakening or repeating the summary. A collapsed card succeeds when it is concise and distinguishable from every other recommendation.

## Visual QA

Inspect the actual temporary file with network access:

1. Confirm external dependencies and every before-and-after visual render.
2. Compare recommendation IDs, order, labels, and claims with the Markdown record.
3. Exercise disclosure and applicable filters by pointer and keyboard; verify focus, state, count, and reset.
4. Inspect desktop, narrow, zero-result, and print states for hierarchy, wrapping, overflow, clipping, and content loss.
5. Confirm the report remains understandable without colour and that evidence paths remain legible.

Correct material defects and rerun affected checks. When browser inspection is unavailable, complete structural and source checks, then mark visual acceptance incomplete in both artifacts and the handoff.
