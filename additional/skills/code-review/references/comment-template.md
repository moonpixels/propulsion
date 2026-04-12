# Inline Comment Template

Use this reference when posting validated inline PR comments after the report is shown.

Default posting scope is blocking findings only unless the user explicitly widens it.

## Template

```markdown
[<severity>] <short issue title>

This is a real issue because <objective impact>. <Short evidence-backed why-it-matters sentence>.

Validated evidence:

- Code: https://github.com/<owner>/<repo>/blob/<full_sha>/<path>#L<start>-L<end>
- Rule (if applicable): https://github.com/<owner>/<repo>/blob/<full_sha>/<rule_path>#L<start>-L<end>
- Precedent (if applicable): https://github.com/<owner>/<repo>/blob/<full_sha>/<precedent_path>#L<start>-L<end>
- Intent (if applicable): PR description or linked artefact reference
```

## Rules

- ALWAYS use full commit SHA in all links.
- ALWAYS prefix title with the validated severity.
- ALWAYS include `Code` evidence.
- DO include `Rule` evidence for `rule-violation` and `skill-contract-violation`.
- DO include `Precedent` evidence for `consistency-drift` and any precedent-backed finding.
- DO name the principle in the prose for principle-backed findings and cite the changed code link.
- DO keep comments concise, factual, and non-speculative.
- DO post only findings that survived the validator pass and are in the user-approved posting scope.
- DO default posting scope to blocking findings only unless the user explicitly widens it.
- DO NOT post duplicate comments for the same dedupe key.
