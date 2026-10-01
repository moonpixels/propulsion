# Independent review rules

## Read-only probes

Run a safe, focused, non-mutating command only to confirm or falsify a concrete concern. Preserve source, tests, snapshots, baselines, dependencies, Git state, and durable data. Do not repair findings, install dependencies, or repeat the implementation's complete quality portfolio.

## Falsify before reporting

Try to disprove each concern through contradicting authority, existing handling, surrounding code, sanctioned exceptions, a focused counterexample, and the strongest benign interpretation. Omit unsupported generic advice, tooling-enforced trivia, and speculative best practice. Report a pre-existing issue only when the change introduces, worsens, or makes it newly consequential.

## Rank by consequence

- **High:** a credible path to materially wrong required behaviour, duplicated, lost, or misdirected external effects, security or privacy compromise, data loss or corruption, major reliability failure, or a structural, test, or evidence defect that makes the change untrustworthy.
- **Medium:** a concrete defect, regression risk, or significant maintainability, modularity, test, or harness weakness with a bounded material consequence.
- **Low:** a local evidenced issue whose narrow correction has a concrete benefit.

Priority orders attention; it does not direct remediation.

## Return findings

Use this format for every supported finding:

```markdown
### [high|medium|low] Concise finding

- Evidence: exact code location, applicable authority or criterion, and observed fact
- Consequence: concrete behavioural or code-health impact
- Suggested direction: narrow corrective outcome, without an unverified patch
```

Return `No findings.` when no concern survives. Include axis-specific count, scope, probes and material limitations. Do not issue an approval or verification verdict. Stop at the diagnostic report.
