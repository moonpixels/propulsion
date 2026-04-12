# Issue Schema

Use this reference when normalising candidate findings and questions before validation.

```json
{
    "kind": "finding",
    "file": "src/path/file.ts",
    "line": 42,
    "severity": "high",
    "category": "duplication",
    "summary": "Short issue title",
    "evidence": "Quoted diff, exact rule text, quoted precedent snippet, concrete principle-backed code evidence, or explicit intent evidence",
    "evidence_type": "intent-context",
    "impact": "Why this matters in this codebase",
    "confidence": 88,
    "blocking": true,
    "rule_source": "AGENTS.md:18",
    "precedent_refs": ["src/example.ts:10", "src/example.ts:44"],
    "intent_refs": ["PR description", "docs/propulsion/example-plan.md:12-18"],
    "principle_basis": "DRY|single-source-of-truth|separation-of-concerns|ownership-boundary|test-protection|cohesion|encapsulation|complexity-management|abstraction-leakage|SOLID|YAGNI",
    "open_question": "What missing context prevents a reliable decision?",
    "validator_verdict": "pending|confirmed|rejected"
}
```

## Required rules

- `kind`, `severity`, `category`, `summary`, `evidence`, `evidence_type`, `impact`, `confidence`, and `validator_verdict` are mandatory.
- `kind` MUST be `finding` or `question`.
- `file` and `line` are required for code-based findings. DO omit them only for pure intent or rule questions.
- `severity` MUST be one of `critical`, `high`, `medium`, `low`, `nitpick`, `question`.
- `category` MUST be one of `rule-violation`, `skill-contract-violation`, `bug`, `compile-break`, `logic-error`, `security`, `performance`, `architecture`, `maintainability`, `duplication`, `test-gap`, `requirement-drift`, or `consistency-drift`.
- `evidence` MUST be concrete and directly tied to changed code, scoped rule text, or cited precedent.
- `evidence_type` MUST be `diff`, `rule-text`, `precedent`, `principle`, or `intent-context`.
- `confidence` MUST be integer `0-100`.
- `blocking` is required for findings. Set it to `true` only when shipping the issue would create material production, security, UX, or maintenance risk.
- `rule_source` is required for `rule-violation` and `skill-contract-violation`.
- `precedent_refs` is required for `consistency-drift` and any precedent-backed finding.
- `intent_refs` is required for `requirement-drift` and any intent-backed finding.
- `principle_basis` is required for any principle-backed finding.
- `open_question` is required for `kind: question` and should explain the exact missing context.
- DO use `principle` evidence only when the finding names the violated code-health principle and the impact is specific to the changed code.

## Deduplication key

Use `(kind, file, line, severity, category, normalised summary)`.

Only one final finding and one final inline comment per dedupe key.

## Rules

- ALWAYS normalise every candidate before validation.
- DO omit fields only when these rules explicitly allow omission.
