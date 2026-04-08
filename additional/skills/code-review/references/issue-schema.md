# Issue Schema

Normalize all candidate findings into this shape before validation.

```json
{
  "file": "src/path/file.ts",
  "line": 42,
  "lane": "blocker",
  "severity": "high",
  "category": "bug",
  "summary": "Short issue title",
  "evidence": "Quoted diff, exact rule text, or quoted precedent snippet",
  "reason_flagged": "bug|compile-break|rule-violation|skill-contract-violation|logic-error|security|consistency-drift",
  "confidence": 92,
  "rule_source": "AGENTS.md:18",
  "precedent_refs": ["src/example.ts:10", "src/example.ts:44"],
  "validator_verdict": "pending|confirmed|rejected"
}
```

## Required rules

- `file`, `line`, `lane`, `severity`, `category`, `summary`, `evidence`, and `confidence` are mandatory.
- `lane` must be `blocker` or `advisory`.
- `severity` must be one of `critical`, `high`, `medium`, `low`.
- `evidence` must be concrete and directly tied to changed code, scoped rule text, or cited precedent.
- `confidence` is integer `0-100`.
- `rule_source` is required for `rule-violation` and `skill-contract-violation`.
- `precedent_refs` is required for `consistency-drift`.

## Deduplication key

Use `(file, line, lane, category, normalized summary)`.

Only one final finding and one final inline comment per dedupe key.
