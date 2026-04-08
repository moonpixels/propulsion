# Inline Comment Template

Use one inline comment per unique validated issue.

## Template

```markdown
[<lane>] <short issue title>

Why this is a real issue:
- <objective impact>
- <evidence summary>

Evidence:
- Code: https://github.com/<owner>/<repo>/blob/<full_sha>/<path>#L<start>-L<end>
- Rule: https://github.com/<owner>/<repo>/blob/<full_sha>/<rule_path>#L<start>-L<end>
- Precedent: https://github.com/<owner>/<repo>/blob/<full_sha>/<precedent_path>#L<start>-L<end>
```

## Rules

- Use full commit SHA in all links.
- Prefix title with `[blocker]` or `[advisory]`.
- Always include `Code` evidence.
- Include `Rule` evidence for `rule-violation` and `skill-contract-violation`.
- Include `Precedent` evidence for `consistency-drift`.
- Keep comments concise, factual, and non-speculative.
- Never post duplicate comments for the same dedupe key.
