---
name: code-review
description: Review code independently when a file, module, branch diff or codebase needs assessment against behavioural intent and engineering standards.
---

# Code review

Save one severity-ranked report from **independent Spec and Standards assessments**. Preserve the code and every supported finding. The caller owns adjudication and action.

## Inputs

Use the repository, exact scope, candidate, comparison base where relevant, available behavioural authorities and check evidence. Accept a file, module, diff or whole codebase. Resolve ambiguous scope before dispatch. An empty diff has no change to review. Existing code needs no diff.

## Method

1. **Fix the candidate.** Inventory the in-scope source, tests and configuration. Record resolved revisions, comparison semantics and working-tree contents, including staged, unstaged and in-scope untracked files. Keep a path and content fingerprint inventory to detect movement. Include surrounding contracts and consumers needed to understand the scope.
2. **Separate the briefs.** Give both reviewers actual source paths, candidate identity, scope, applicable repository instructions and [review instructions](references/reviewer.md). Give Spec the confirmed request, ticket, specification, acceptance criteria and published behavioural contracts, with [Spec instructions](references/spec.md). Give Standards repository conventions, architecture decisions and relevant check or measurement evidence, with [Standards instructions](references/standards.md). **Exclude the ticket, specification and request from Standards**, including their contents in summaries or check evidence. Exclude conversation history, implementation rationale, proposed findings and prior conclusions from both briefs.
3. **Dispatch fresh.** Spawn separate read-only agents with no inherited conversation history. Run both in parallel when behavioural authority exists. Otherwise skip Spec and record why. Each reviewer follows its assigned instructions without further delegation. Self-review cannot replace either assessment.
4. **Collect and consolidate.** Require complete scope accounting and evidenced findings. Return missing coverage or fields to the same reviewer. Read [the report contract](assets/review-report.md), then combine only the same defect and corrective outcome. Preserve supported disagreements and lone-reviewer findings. Do not adjudicate findings using the implementation conversation or replace independent judgement with your preferred verdict.
5. **Verify and save.** Recheck revisions, comparison, paths and content fingerprints, including inspected context files. Mark affected assessments stale if the candidate moved and identify the reviewed and current state. Save the consolidated report to a unique Markdown file in the OS temporary directory. Read it back and verify identity, assessment status, coverage, findings and deduplication.

## Finish

Return **only the absolute report path**. If no report can be saved, return the exact blocker. Leave repair, finding dispositions, approval and publication to the caller.

**Done only when** applicable fresh assessments cover the fixed scope, the verified report preserves every supported finding without duplicates, and the candidate remains current. An incomplete or stale assessment must identify its unreviewed scope or drift and cannot claim `No findings.`.
