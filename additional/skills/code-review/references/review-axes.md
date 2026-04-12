# Review Axes

Use this reference when dispatching the focused reviewer passes.

## Focused reviewer passes

- Correctness
    - Verify changed behaviour against the stated intent, edge cases, failure paths, state transitions, data flow, and dependency changes.
- Security / trust boundaries
    - Inspect auth, authorization, validation, injection surfaces, secrets, config, logging, file handling, and integration boundaries.
- Maintainability / architecture
    - Look for wrong-layer ownership, second sources of truth, duplicated business logic, concrete refactoring opportunities, abstraction leakage, coupling, unnecessary complexity, and unnecessary indirection.
    - Apply `DRY`, `single-source-of-truth`, `separation-of-concerns`, `ownership-boundary`, `cohesion`, `encapsulation`, `complexity-management`, `abstraction-leakage`, `SOLID`, and `YAGNI` only when the impact is concrete in the changed code.
- Tests / verification
    - Check whether changed behaviour is actually protected by tests or other verification, including realistic failure modes and regressions.
- Intent / rule alignment
    - Compare the diff against PR intent, explicitly linked planning artefacts, scoped `AGENTS.md` / `CLAUDE.md`, touched command or skill contracts, and dominant local precedent when consistency matters.

## Alignment rules

- Review like a senior PR reviewer, not a lint pass.
- Improve overall code health; do not seek perfection.
- Prefer concrete, merge-relevant issues the author would likely fix.
- Read code in context, not only the diff hunk.
- Treat tests and trust-boundary changes as first-class review scope.
- Use exact evidence, quoted rules, and nearby precedent before broad principles.

## Named principles allowed for principle-backed findings

- `DRY`
- `single-source-of-truth`
- `separation-of-concerns`
- `ownership-boundary`
- `test-protection`
- `cohesion`
- `encapsulation`
- `complexity-management`
- `abstraction-leakage`
- `SOLID`
- `YAGNI`

## Reject candidates when

- The complaint is aesthetic or stylistic.
- The claim depends on hidden requirements.
- The issue is too small for a real review comment.
- Multiple local patterns exist and no dominant precedent is clear.
- The suggestion is speculative future-proofing instead of a concrete fix for this diff.

## Rules

- EACH pass returns only candidates, NEVER final report text.
- DO stay inside the allowed review scope and gathered context.
