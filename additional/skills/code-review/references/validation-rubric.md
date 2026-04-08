# Validation Rubric

Every candidate issue must pass this validation before reporting.

## Disprove-first flow

1. Assume the finding is wrong.
2. Search the diff and scoped rules/contracts for counter-evidence.
3. Reject if evidence is incomplete, ambiguous, or out of scope.
4. Confirm only if objective evidence supports the claim.

## Blocker confirmation requirements

- Evidence is in changed code, or in a scoped `CLAUDE.md`/`AGENTS.md`/skill/command contract.
- Rule/contract violations include exact quoted rule text and source path.
- Bug/security/compile claims are deterministic, not speculative.
- Confidence is `>= 85`.

## Advisory consistency requirements

- Finding is `consistency-drift` and non-blocking.
- Evidence shows changed code diverges from dominant local precedent.
- Include at least one concrete precedent reference with `file:line`.
- Recommendation is actionable and aligned with existing codebase patterns.
- Confidence is `>= 75`.

## Automatic reject conditions

- Style-only or subjective guidance without precedent evidence.
- Potential issues requiring outside context to prove.
- Pre-existing issues not introduced by reviewed diff.
- Linter-catch issues.
- Silenced findings (for example, inline ignore suppressions).
- Consistency findings when multiple equally accepted patterns exist.
- Missing `rule_source` for rule/contract violations.
- Missing `precedent_refs` for consistency findings.
