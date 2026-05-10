# Review Axes

Use when dispatching focused reviewer passes.

## Focused reviewer passes

- Correctness: changed behaviour vs stated intent, edge cases, failure paths, state transitions, data flow, and dependency changes.
- Security / trust boundaries: auth, authorization, validation, injection surfaces, secrets, config, logging, file handling, and integration boundaries.
- Maintainability / architecture: wrong-layer ownership, second sources of truth, duplicated business logic, concrete refactoring opportunities, abstraction leakage, coupling, unnecessary complexity, and unnecessary indirection. Apply named principles only when impact is concrete in changed code.
- Tests / verification: changed behaviour protected by tests or other verification, including realistic failure modes and regressions.
- Intent / rule alignment: diff vs PR intent, linked planning artefacts, scoped `AGENTS.md` / `CLAUDE.md`, touched command/skill contracts, and dominant local precedent when consistency matters.

## Alignment rules

- Review like a senior PR reviewer, not a lint pass.
- Improve code health; do not seek perfection.
- Prefer concrete, merge-relevant issues the author would fix.
- Read code in context, not only diff hunks.
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
- The issue is too small for a final report finding.
- Multiple local patterns exist and no dominant precedent is clear.
- The suggestion is speculative future-proofing instead of a concrete fix for this diff.

## Rules

- EACH pass returns only candidates, NEVER final report text.
- DO stay inside the allowed review scope and gathered context.
