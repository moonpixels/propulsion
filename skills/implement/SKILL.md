---
name: implement
description: Implements clear software requests in verified slices with TDD when applicable and a closed review loop. Use when explicitly asked to change code.
metadata:
    invocation: user
disable-model-invocation: true
---

# Implement

**Tracer bullets**, from Andrew Hunt and David Thomas's _The Pragmatic
Programmer_, deliver the smallest end-to-end slice and use its feedback to aim
the next one; TDD and review keep each slice safe.

## Steps

1. Read the request, repository instructions, relevant context and decisions,
   current Git state, and available verification commands. Invoke `$elicit`
   before editing when the requested outcome is materially ambiguous; otherwise
   record the intended behaviour, authorised scope, acceptance evidence, and
   pre-existing changes. The request and its change boundary are explicit.
2. Choose the smallest end-to-end slice that advances the request. Invoke `$tdd`
   when the slice changes observable behaviour or fixes a bug and the repository
   already has a runnable test suite. For documentation or configuration-only
   work without an observable behaviour change, behaviour-preserving refactors,
   or repositories without a test suite, implement the smallest change and use
   the best existing verification without adding a test harness merely to enable
   TDD. The slice passes its targeted verification.
3. Repeat the slice-and-verify loop, running focused tests, type-checking, or
   other fast checks regularly. Every requested behaviour and acceptance
   condition is implemented without speculative scope.
4. Invoke `$review` with the confirmed request and the exact changes made for
   it. Address every in-scope finding in priority order, using `$tdd` for
   behavioural corrections when applicable and keeping tests green through
   refactors. Invoke `$elicit` when a correction would change agreed behaviour,
   a public contract, architecture, or authorised scope; difficulty alone does
   not require user intervention. Re-run relevant checks and `$review` until its
   latest report has no unresolved in-scope findings.
5. Run the repository's prescribed checks and the full test suite when one
   exists. The final verification state is known: available checks pass, or an
   exact blocker or unrelated pre-existing failure is reported without claiming
   full verification.

## Rules

- Preserve pre-existing user changes and keep review and remediation scoped to
  the current request.
- Commit or push only when the user explicitly requests that Git operation.
- Prefer the simplest present solution; each abstraction and change must serve
  the confirmed request.

## Handoff

Report the implemented behaviour and changed files, why TDD did or did not
apply, targeted and final verification evidence, review rounds and remediated
findings, and any unresolved blocker or uncertainty.
