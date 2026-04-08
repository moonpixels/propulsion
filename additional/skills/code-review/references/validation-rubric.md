# Validation Rubric

Every candidate issue must pass this validation before reporting.

## Disprove-first flow

1. Assume the finding is wrong.
2. Search the diff, full changed files, scoped rules/contracts, and gathered adjacent context for counter-evidence.
3. Reject if evidence is incomplete, ambiguous, pre-existing, or out of scope.
4. Confirm only if objective evidence supports the claim and the issue is one the PR author would likely fix.

## Blocker confirmation requirements

- Evidence is in changed code, or in a scoped `CLAUDE.md`/`AGENTS.md`/skill/command contract.
- Rule/contract violations include exact quoted rule text and source path.
- Bug/security/compile claims are deterministic, not speculative.
- Confidence is `>= 85`.

## Important confirmation requirements

- The issue is introduced by the reviewed diff and materially worsens code health.
- The issue is concrete enough that a senior reviewer would reasonably ask for a fix before merge.
- Evidence ties the claim to changed code and one of these concrete impacts:
  - duplicated business logic or a second source of truth
  - wrong ownership or abstraction placement
  - meaningful maintainability or complexity regression
  - requirement drift from stated PR intent or linked planning artifact
  - missing or weak tests that leave changed behavior under-protected
  - non-trivial performance or resource-risk regression in changed code
- The finding is backed by either:
  - strong nearby precedent refs, or
  - a named principle with a specific maintenance, ownership, testing, or correctness cost, or
  - explicit PR or linked-plan intent evidence for `requirement-drift`
- Confidence is `>= 80`.

## Advisory confirmation requirements

- The finding is non-blocking.
- Evidence shows changed code diverges from dominant local precedent or creates a smaller code-health drag with a clear alignment path.
- Recommendation is actionable and aligned with existing codebase patterns or a specific code-health principle.
- Confidence is `>= 75`.

## Automatic reject conditions

- Style-only or subjective guidance without strong precedent or principle evidence.
- Potential issues requiring context beyond the sanctioned review window (changed files, scoped rules/contracts, allowed adjacent files, and explicitly linked PR artifacts).
- Pre-existing issues not introduced by reviewed diff.
- Linter-catch issues.
- Consistency findings when multiple equally accepted patterns exist.
- Missing `rule_source` for rule/contract violations.
- Missing `precedent_refs` for consistency findings.
- Principle-backed maintainability or architecture claims with no concrete impact.
- Test-gap claims that do not tie to changed behavior or realistic failure modes.
