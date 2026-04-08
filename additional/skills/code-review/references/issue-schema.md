# Issue Schema

Normalize all candidate findings into this shape before validation.

```json
{
    "file": "src/path/file.ts",
    "line": 42,
    "lane": "important",
    "severity": "high",
    "category": "duplication",
    "summary": "Short issue title",
    "evidence": "Quoted diff, exact rule text, quoted precedent snippet, concrete principle-backed code evidence, or explicit intent evidence",
    "evidence_type": "intent-context",
    "impact": "Why this matters in this codebase",
    "confidence": 88,
    "rule_source": "AGENTS.md:18",
    "precedent_refs": ["src/example.ts:10", "src/example.ts:44"],
    "intent_refs": ["PR description", "docs/propulsion/example-plan.md:12-18"],
    "principle_basis": "DRY|single-source-of-truth|separation-of-concerns|ownership-boundary|test-protection|cohesion|encapsulation|complexity-management|abstraction-leakage",
    "validator_verdict": "pending|confirmed|rejected"
}
```

## Required rules

- `file`, `line`, `lane`, `severity`, `category`, `summary`, `evidence`, `evidence_type`, `impact`, and `confidence` are mandatory.
- `lane` must be `blocker`, `important`, or `advisory`.
- `severity` must be one of `critical`, `high`, `medium`, `low`.
- `category` must be one of `rule-violation`, `skill-contract-violation`, `bug`, `compile-break`, `logic-error`, `security`, `performance`, `architecture`, `maintainability`, `duplication`, `test-gap`, `requirement-drift`, or `consistency-drift`.
- `evidence` must be concrete and directly tied to changed code, scoped rule text, or cited precedent.
- `evidence_type` must be `diff`, `rule-text`, `precedent`, `principle`, or `intent-context`.
- `confidence` is integer `0-100`.
- `rule_source` is required for `rule-violation` and `skill-contract-violation`.
- `precedent_refs` is required for `consistency-drift` and any precedent-backed `important` or `advisory` finding.
- `intent_refs` is required for `requirement-drift` and any intent-backed `important` finding.
- `principle_basis` is required for any principle-backed `important` or `advisory` finding.
- Use `principle` evidence only when the finding names the violated code-health principle and the impact is specific to the changed code.

## Deduplication key

Use `(file, line, lane, category, normalized summary)`.

Only one final finding and one final inline comment per dedupe key.
