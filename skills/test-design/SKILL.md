---
name: test-design
description: Write, review, or simplify behavioural tests using stable seams, independent oracles, determinism, and unique defect protection.
metadata:
    type: teaching
---

# Test design

Retain tests that detect promised-behaviour defects and tolerate changes to hidden structure.

## Inputs

Use confirmed behaviour, contracts, and current production and test evidence. Representation is an oracle only when it is itself a published contract. When the expected behaviour lacks a credible authority, surface that missing decision rather than copy the implementation.

## Method

1. Choose the narrowest seam that exposes a supported result, state, error, effect, persistence, navigation, or user outcome; hides replaceable internal decisions; and exercises the production technology whose failure matters. Add a broader companion only for material integration risk the narrower seam cannot protect. For example, use the real database when its semantics are the promise, or the rendered application when wiring or accessibility matters.
2. Build an **independent oracle** from confirmed requirements, accepted examples, published protocols, independent laws, a trusted reference or model, or prior behaviour when preservation is required. Encode an independently reasoned literal or predicate. Production helpers, copied algorithms, newly approved captures, and incidental snapshots do not establish correctness. Completion alone is sufficient only when completion is the full promise.
3. Arrange explicit isolated state, perform a meaningful action, assert the complete promise, and release resources. Several cohesive assertions may protect one behaviour; split unrelated rules or actions. Add absence or unchanged-state checks when the requirement makes them material and the action has a causal path to that value.
4. Control time and randomness at their boundary using fixed instants and recorded seeds. Restore changed process state, files, transactions, services, timers, and environment. Replace guessed sleeps, test-order dependence, live external services, and shared mutable fixtures with controlled evidence.
5. Challenge each retained test: would a broken promise fail it, and would a hidden refactor leave it passing? Map affected tests to unique protection. Remove duplicates only when no distinct defect detection or useful diagnosis is lost. Replace a brittle sole protector with a behavioural test before deleting it.

Prefer public outcomes over private methods, helper delegation, ORM calls, incidental CSS or DOM structure, and broad snapshots. Count and order are valid assertions when they are promised boundary effects.

## Conditional resources

- Read [test doubles](references/TEST-DOUBLES.md) when a slow, unavailable, destructive, nondeterministic, externally mutating, or uncontrollable boundary needs substitution or observation. Keep internal collaborators real; a production abstraction needs a purpose beyond mocking.
- Read [generative testing](references/GENERATIVE-TESTING.md) when examples cannot economically cover an input or state space, or an independent relation, model, or comparator supplies an oracle without direct outputs.

## Finish

Return the selected seam and oracle authority, distinct protection retained or removed, check results, and fidelity or behavioural gaps in the caller's workflow. Done when retained tests have meaningful independent expectations, controlled state, and no lost unique protection. Passing generated or substituted checks establish only their stated sampled scope and fidelity.
