---
name: implement
description: Implements clear software requests through verified slices and review. Use when the user asks to change code, documentation, or configuration.
metadata:
    invocation: user
disable-model-invocation: true
---

# Implement

**Tracer bullets** deliver the smallest end-to-end slice and use its feedback to aim the next one. `$tdd` builds applicable behaviour; `$code-review` assesses the completed implementation independently.

## Process

### 1. Deliver a verified slice

Deliver the smallest end-to-end slice that advances the request. Invoke `$tdd` when its prerequisite applies; otherwise implement directly with the best available targeted verification. Repeat until every requested behaviour and acceptance condition is implemented.

### 2. Review and remediate

Invoke `$code-review` with the confirmed request and exact implementation scope. Address every in-scope finding in priority order, invoking `$tdd` for applicable behavioural corrections. Invoke `$elicit` when a correction would materially change agreed behaviour, a public contract, architecture, or authorised scope. Re-run relevant verification and `$code-review` until its latest report has no unresolved in-scope findings.

### 3. Run the final checks

Run the repository's prescribed final checks without modifying pre-existing out-of-scope changes. Isolate a mutating check when needed; when that cannot be done safely, leave it unrun and report the blocker. Available checks pass, or the exact blocker and any unrelated pre-existing failure are reported without claiming full verification.

## Rules

- Preserve pre-existing user changes and keep implementation, review, and remediation scoped to the current request.

## Handoff

Report the implemented behaviour and changed files, `$tdd` applicability, verification and review evidence, and any unresolved blocker or uncertainty.
