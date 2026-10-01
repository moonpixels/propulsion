---
name: code-cleanup
description: Reviews completed code changes or a bounded module for behaviour-preserving deletion and simplification. Use when implementation is finished or existing code needs cleanup.
metadata:
    type: utility
disable-model-invocation: false
---

# Code Cleanup

Returns independent, justified opportunities to reduce code and tests while preserving behaviour and coherent design.

## Process

### 1. Fix the review packet

Resolve the scope from the request or completed work. For a change, identify the candidate, comparison base, and directly affected code, including untracked files and newly orphaned artefacts. For a named module, identify its paths and contracts. Inspect consumers outside the scope only to establish evidence; this does not expand the cleanup boundary.

Prepare the repository location, exact scope and candidate, behavioural authorities, applicable repository instructions, available check results, and read-only permissions. Reuse current caller evidence; load only missing task facts. Resolve discoverable facts directly; ask only for missing user-held decisions that materially change the review.

### 2. Dispatch the independent review

Start exactly one fresh agent with no conversation history. Pass the packet and the path to [Review Instructions](references/REVIEW.md); let the reviewer load those instructions. Exclude implementation rationale, desired findings, and prior reviewer conclusions. Require it to inspect the actual code, perform only the read-only review, and return its table and material limitations. It does not delegate again.

Retain only the result. Return it unchanged to the caller; leave validation of findings, accepted edits, and checks on the revised candidate to the main thread. Stop after this handoff.
