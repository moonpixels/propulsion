# Review Axes

Use these axes to review the diff like a senior engineer while staying high-signal.

## Core questions

- Correctness: does the changed code do what the PR claims, including edge cases and failure paths?
- Design: does the behavior live in the right abstraction, or has the diff pushed domain logic into the wrong layer?
- Duplication: does the diff create a second source of truth or repeat business logic that should be centralized?
- Maintainability: does the change make future edits riskier, harder to reason about, or more coupled than needed?
- Tests: do the changed tests actually protect the new or changed behavior, and are important failure modes covered?
- Requirements: does the diff align with the stated PR intent or explicitly linked planning artifact?
- Consistency: does the diff diverge from dominant local patterns in ways that make the code harder to maintain?

## Reviewer guidance

- Favor issues that improve overall code health, not just immediate runtime safety.
- Treat design and maintainability comments as real findings only when the cost is concrete.
- Prefer exact code evidence over broad advice.
- Use precedent when local patterns are strong.
- Use named principles when the code-health regression is obvious even without an exact nearby match.

## Named principles allowed for principle-backed findings

- `DRY`: duplicated business logic or duplicated branching that should have one canonical home
- `single-source-of-truth`: the diff introduces a second place that must now stay in sync
- `separation-of-concerns`: the wrong layer now owns behavior, validation, or policy
- `ownership-boundary`: behavior belongs in a model, service, helper, or shared abstraction rather than the new location
- `test-protection`: changed behavior is no longer adequately defended by tests
- `cohesion`: related behavior is split across locations that should change together
- `encapsulation`: internals or policy leak into callers that should not own them
- `complexity-management`: the diff adds branching, coupling, or coordination cost beyond what the change needs
- `abstraction-leakage`: the caller now knows details that should stay behind the abstraction boundary
## When to reject a candidate even if it sounds smart

- The complaint is mostly aesthetic.
- The claim depends on guessing hidden requirements.
- The code may be imperfect, but the issue is too small for a real review comment.
- Multiple local patterns exist and no dominant precedent is clear.
- The suggested abstraction is hypothetical future-proofing rather than a concrete simplification of the current diff.
