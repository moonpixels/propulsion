# Review report contract

Each assessment supplies findings in the format below. The consolidator saves one report with a compact candidate identity, requested scope, comparison where relevant, authorities, assessment statuses, inspected and uninspected scope, probes and material limitations. Keep the fingerprint inventory as verification evidence rather than a large table in the report.

Record Spec as skipped when behavioural authority is unavailable. Distinguish complete, incomplete and stale assessments. A skipped Spec assessment does not invalidate a completed Standards assessment. Use `No findings.` only for completed current assessments with no surviving concern. A report is not an approval or proof that the code is defect-free.

## Rank by consequence

| Severity | Consequence                                                                                                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High     | Material requirement failure, security or privacy compromise, data loss, duplicated effects, major reliability failure, or a structural or evidence defect that makes the candidate untrustworthy. |
| Medium   | Bounded behavioural defect, regression risk or meaningful maintenance burden with an evidenced causal path.                                                                                        |
| Low      | Local evidenced issue with a concrete benefit from a narrow correction.                                                                                                                            |

Order findings by severity, then strength of evidence. Express confidence through the evidence and its limits, without numerical scores. Severity orders attention and grants no remediation authority.

```markdown
### [High|Medium|Low] Concise finding

- Axis: spec | standards | spec, standards
- Location: verified absolute file path and line or symbol
- Issue: the specific defect or maintenance burden
- Evidence: applicable authority, observed facts and reachable triggering case or structural demonstration
- Effect: concrete behavioural or maintenance consequence
- Direction: narrow corrective outcome, without an unverified patch
```

## Deduplicate without losing findings

Merge only the same defect with the same corrective outcome. Keep both axis labels and all material evidence and consequences. Use the strongest supported severity. Shared locations, symptoms or terminology do not establish duplication.

| Independent observations                                                           | Consolidated result                                                                                |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Spec finds a retry charges twice. Standards finds the same path lacks idempotency. | One finding with both axes and the required retry behaviour and engineering evidence.              |
| Spec finds missing rejection. Standards finds a resource leak on that branch.      | Two findings because rejection and resource cleanup require different corrections.                 |
| One reviewer supports a concern and the other reports no findings.                 | Retain the concern. Silence is not contrary evidence.                                              |
| Reviewers disagree about a contract or remedy.                                     | Preserve supported concerns and explain the disagreement. Return missing evidence to its reviewer. |

Consolidation preserves independent judgement. The caller decides which findings to accept, reject or investigate.
