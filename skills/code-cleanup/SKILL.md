---
name: code-cleanup
description: Identify behaviour-preserving deletions and simplifications when a file, branch diff, capability or codebase needs independent cleanup review.
---

# Code cleanup

Find the least code that preserves supported behaviour. **Subtract before adding**. A fresh agent owns the read-only review. The caller owns decisions, edits and verification.

## Inputs

Take the cleanup scope from the request. Accept a file, diff, capability or whole codebase. Follow related files across the whole affected capability, including unchanged code. Keep unrelated work outside scope. Resolve an unclear scope before dispatch.

## Method

1. **Fix the packet.** Record the candidate revision or working-tree contents, comparison base when relevant, scope and source paths. Include requirements and repository instructions. Exclude implementation history, author rationale, suggested findings and prior review conclusions.
2. **Dispatch fresh.** Give that packet and [review instructions](references/review.md) to a fresh agent with no conversation history. Only the reviewer loads the technique references and report template. If already dispatched as that reviewer, follow the review instructions directly without spawning another agent.
3. **Check the handoff.** Verify the returned report exists, identifies the supplied candidate and accounts for scope. Return missing coverage to the reviewer. A changed candidate requires a refreshed review.

## Finish

Return only the absolute path to the saved report. If no report could be written, return the exact blocker instead of a path. Leave report reading and candidate adjudication to the caller. Resolve preservation gaps before applying a transformation.

**Done only when** the fresh review accounts for the whole scope, completes its final coverage pass and saves a verified report of supported or explicitly uncertain candidates, or `No findings.`. An incomplete review must identify uninspected scope and cannot claim a clean result.
