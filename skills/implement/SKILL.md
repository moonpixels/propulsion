---
name: implement
description: Routes confirmed implementation work through TDD and code review until complete. Use when the user asks to implement a clear software request.
metadata:
    invocation: user
disable-model-invocation: true
---

# Implement

A tailored **Software Formal Inspection** lifecycle routes confirmed work through `$tdd`, independent `$code-review`, technical disposition, and verified rework.

## Process

Invoke `$tdd` to implement the confirmed work, then invoke `$code-review` on the result. Validate every finding against the confirmed request and current codebase, then disposition it:

- A required correction is a verified violation of confirmed behaviour, the specification, a repository rule, or a necessary safety boundary, or another defect that leaves the change untrustworthy.
- A proportional improvement is valid but non-blocking; accept it only when its concrete benefit justifies the added change and complexity.
- A rejected finding is falsified, unsupported, superseded, or outside the confirmed scope.
- A user decision is required when accepting or rejecting the finding would change behaviour, contracts, architecture, or scope, or when its evidence cannot be obtained safely.

Treat priority as evidence of impact and ordering, not remediation authority. Route each accepted change through `$tdd`, then repeat `$code-review` after any correction. Complete when the requested work is verified, every finding has a technical disposition, and no required finding remains unresolved.
