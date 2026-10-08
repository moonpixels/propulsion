---
name: simplify-code
description: Aggressively reduce code and maintenance burden when a feature, module, file or codebase needs sustained behaviour-preserving simplification.
---

# Simplify code

Aggressively reduce code and maintenance burden. Relentlessly challenge unnecessary mechanisms and tests. **Subtract before adding. Preserve observable behaviour.**

## Inputs

Take the feature, module, file or codebase from the request. Include related unchanged code and tests across the affected capability. Preserve unrelated work. Resolve material scope or preservation uncertainty through [$elicit-with-context](../elicit-with-context/SKILL.md) before dependent changes.

## Method

1. **Establish the run.** Read repository instructions. Inventory the complete scope, supported entries, consumers and observable guarantees. Record the starting revision and relevant working-tree state. Create a unique run directory at `docs/simplification/<date>-<scope>-<unique-id>/`, unless the caller supplies a destination, and report its absolute path. Use [the running report template](assets/progress.md). Read [recovery and evidence](references/recovery.md) when establishing or resuming a run, and maintain that record throughout.
2. **Measure the baseline.** Invoke [$measure-code-complexity](../measure-code-complexity/SKILL.md) with explicit production paths covering the complete logical scope. Its changed-file default is insufficient. Record existing check results and pre-existing failures. Track production and test size separately. Apply [$test-design](../test-design/SKILL.md) to the related suite, identifying meaningful promises and unnecessary test burden.
3. **Relentlessly examine.** Invoke [$code-cleanup](../code-cleanup/SKILL.md) on the fixed candidate and complete scope, including tests and supporting implementation. Supply the preservation baseline, repository instructions and current measurements. Keep the running report, adjudication history and prior conclusions outside fresh reviewer packets. Pursue whole mechanisms, duplicated rules, unnecessary state, redundant transformations and abstractions that do not earn their cost. Use **YAGNI** and **DRY**. Lower scores and fewer lines alone cannot justify dense code or displaced complexity.
4. **Adjudicate and implement.** Read every report and give every finding an evidence-backed disposition. Resolve preservation gaps before transforming code. Deliver every justified simplification through [$implement](../implement/SKILL.md), including necessary test repairs and deletion of newly orphaned artefacts. Reject incorrect or disproportionate recommendations with concrete evidence. Aggressively reduce the overall maintenance burden while retaining meaningful behavioural protection. Do not weaken assertions, checks or quality thresholds to enable deletion.
5. **Verify the candidate.** After changes, refresh affected checks and the complete relevant existing suite. Remeasure the same logical production scope, accounting for additions, renames and deletions. Obtain current [$code-review](../code-review/SKILL.md) coverage of the complete scope and resolve its findings. Reuse implementation evidence only where its candidate and coverage match. Account for formatter and generator edits before trusting final evidence.
6. **Repeat to saturation.** Maintain a consecutive clean-review counter, initially zero. Count only outer-loop cleanup reviews that are fresh, current, complete for the agreed scope and leave no justified implementable findings after evidenced adjudication. Empty reports and concretely disproved findings can qualify. An incomplete or stale review, unresolved finding or unexplained rejection breaks the sequence and resets it to zero. Any substantive change to reviewed code, tests, supporting implementation, scope or preservation baseline also resets it. Log and evidence updates do not. Commission another fresh cleanup review until the count reaches three on the unchanged candidate. Inner implementation cleanup does not count. Three improvement cycles do not satisfy this gate. Continue for as many cycles as necessary, without a deletion quota or arbitrary iteration limit.

## Finish

Return a link to `progress.md` and a concise summary of significant deletions and simplifications, preserved behaviour, separate production and test reductions, before-and-after measurements, checks, independent review, the three qualifying cleanup reports and material limitations.

**Done only when** the complete scope is accounted for, all justified changes and accepted findings are implemented, observable behaviour is preserved, required checks and independent review are current, three consecutive qualifying cleanup reviews cover the unchanged final candidate, and the running report has no unresolved completion blockers. Three reviews are the stopping rule, not proof of optimal simplicity. If blocked or interrupted, record the exact blocker, attempted paths and next useful action, and report incomplete work. Leave a local reviewable result. Commit, publication and deployment require separate instructions.
