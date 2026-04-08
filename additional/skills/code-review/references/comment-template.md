# Inline Comment Template

Use one inline comment per unique validated `blocker` or `important` issue.

## Template

```markdown
[<lane>] <short issue title>

This is a real issue because <objective impact>. <Short evidence-backed why-it-matters sentence>.

Evidence:
- Code: https://github.com/<owner>/<repo>/blob/<full_sha>/<path>#L<start>-L<end>
- Rule (if applicable): https://github.com/<owner>/<repo>/blob/<full_sha>/<rule_path>#L<start>-L<end>
- Precedent (if applicable): https://github.com/<owner>/<repo>/blob/<full_sha>/<precedent_path>#L<start>-L<end>
- Intent (if applicable): PR description or linked artifact reference
```

## Rules

- Use full commit SHA in all links.
- Prefix title with `[blocker]` or `[important]`.
- Always include `Code` evidence.
- Include `Rule` evidence for `rule-violation` and `skill-contract-violation`.
- Include `Precedent` evidence for `consistency-drift` and any precedent-backed `important` finding.
- For principle-backed `important` findings, name the principle in the prose and cite the changed code link.
- Keep comments concise, factual, and non-speculative.
- Never post `advisory` comments to GitHub.
- Never post duplicate comments for the same dedupe key.
