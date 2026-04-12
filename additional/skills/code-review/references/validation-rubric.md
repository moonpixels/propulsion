# Validation Rubric

Use this reference when validating candidate findings and questions before final report generation.

## Disprove-first flow

1. Assume the finding is wrong.
2. Search the diff, full changed files, scoped rules/contracts, and gathered adjacent context for counter-evidence.
3. Reject if evidence is incomplete, ambiguous, pre-existing, or out of scope.
4. Confirm only if objective evidence supports the claim and the issue is one the PR author would likely fix.

## Candidate types

- Validate `finding` candidates and `question` candidates separately.
- A `question` is valid only when missing context materially blocks the final decision or severity.
- A `question` must cite the exact missing artefact, assumption, or unresolved behaviour.

## Severity confirmation requirements

- `critical`
    - Deterministic breakage, material security exposure, or an explicit rule/contract violation that should block merge.
    - Confidence `>= 90`.
- `high`
    - Strongly evidenced bug, trust-boundary failure, requirement drift, test gap, or architecture regression with material merge risk.
    - Confidence `>= 85`.
- `medium`
    - Meaningful maintainability, performance, or verification issue that should likely be fixed before or immediately after merge.
    - Confidence `>= 80`.
- `low`
    - Real but lower-risk maintainability or consistency drag with a clear alignment path.
    - Confidence `>= 75`.
- `nitpick`
    - Minor non-blocking cleanup worth mentioning only when strongly evidenced and clearly useful.
    - Confidence `>= 70`.
- `question`
    - Missing context that prevents a reliable decision. Do not use when the reviewer can resolve the uncertainty from allowed context.
    - Confidence `>= 80` that the context gap is real.

## Evidence requirements

- Evidence must come from changed code, scoped rules/contracts, allowed adjacent context, nearby precedent, or explicitly linked intent artefacts.
- Rule or contract violations must quote exact text and source path.
- Consistency claims must cite dominant local precedent.
- Principle-backed claims must name the principle and explain the concrete maintenance, ownership, testing, or correctness cost.
- Test-gap claims must tie directly to changed behaviour and realistic failure modes.

## Automatic reject conditions

- Style-only or subjective guidance without strong precedent or principle evidence.
- Potential issues requiring context beyond the sanctioned review window (changed files, scoped rules/contracts, allowed adjacent files, and explicitly linked PR artefacts).
- Pre-existing issues not introduced by reviewed diff.
- Linter-catch issues.
- Consistency findings when multiple equally accepted patterns exist.
- Missing `rule_source` for rule/contract violations.
- Missing `precedent_refs` for consistency findings.
- Principle-backed maintainability or architecture claims with no concrete impact.
- Test-gap claims that do not tie to changed behaviour or realistic failure modes.
- Questions that ask for context the review was already allowed to inspect.
- Questions that do not change the likely decision, severity, or recommended action.

## Rules

- ALWAYS try to disprove every candidate before confirming it.
- DO report only candidates that survive every applicable validation rule.
