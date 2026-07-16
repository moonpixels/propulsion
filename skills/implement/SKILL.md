---
name: implement
description: Routes confirmed implementation work through TDD and code review until complete. Use when the user asks to implement a clear software request.
metadata:
    invocation: user
disable-model-invocation: true
---

# Implement

A bounded **Plan–Do–Check–Act (PDCA)** cycle routes confirmed work through `$tdd` and `$code-review` until complete.

## Process

Invoke `$tdd` to implement the confirmed work, then invoke `$code-review` on the result. Route every finding through `$tdd`, then repeat `$code-review` until the work is complete and the latest review has no findings.
