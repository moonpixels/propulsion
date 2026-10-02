---
name: code-cleanup
description: Find behaviour-preserving deletions and simplifications in completed changes or a bounded module through an independent read-only review.
---

# Code cleanup

Return justified opportunities to reduce code and tests while preserving behaviour and coherent ownership.

## Inputs

Fix the repository, candidate and comparison base, or the named module and its paths. Include changed and in-scope untracked files, newly orphaned artefacts, behavioural authorities, repository instructions, and available check results. Inspect outside consumers only to establish evidence. Resolve discoverable facts directly; obtain a missing user decision when it changes the review boundary.

## Method

1. Prepare a self-contained read-only packet from those inputs. Exclude implementation rationale, desired findings, and prior review conclusions.
2. Give the packet and [review instructions](references/REVIEW.md) to a fresh agent with no conversation history. It inspects the actual code and returns findings and limitations without further delegation.
3. Return its report unchanged. The caller validates findings, applies accepted edits, and checks the revised candidate.

## Conditional resources

The independent reviewer reads [review instructions](references/REVIEW.md) before inspecting the candidate. They define deletion evidence, preserved behaviour, and the findings table.

## Finish

Return the independent report, including `No findings.` when no justified change remains. Stop after the report. Source edits, adjudication, and post-edit checks belong to the caller.
