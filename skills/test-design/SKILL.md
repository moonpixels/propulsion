---
name: test-design
description: Teaches durable behavioural test design through stable seams, independent oracles, determinism, and counterfactual challenge. Use when writing, reviewing, or rationalising tests.
metadata:
    type: teaching
disable-model-invocation: true
---

# Test Design

Teaches a caller to retain tests that detect promised-behaviour defects without resisting hidden structural change.

## Process

### 1. Fix the behavioural basis

Use the caller's confirmed behaviour, applicable contracts, and current production and test evidence. Inspect only evidence that is missing or stale. Treat representation as a valid oracle only when that representation is itself a published contract.

### 2. Select a durable seam

Use the narrowest seam that is:

- **Observable:** exposes a supported result, state, error, effect, persistence, navigation, or user-perceivable outcome.
- **Stable:** hides algorithms, collaborator graphs, storage layouts, rendering wrappers, generated selectors, and other replaceable decisions.
- **Predictive:** exercises the behaviour and technology whose production failure matters.

Add a broader companion test only when the narrower seam cannot retain a material integration risk. Test a pure rule through its public function, a database guarantee against the real engine when its semantics matter, and an end-user interaction through the rendered application when wiring or accessibility is part of the promise.

Prefer supported operations and observable outcomes over private methods, helper delegation, ORM calls, CSS classes, wrapper tags, DOM depth, stack shape, or broad incidental snapshots. For a defect, reproduce the wrong result and assert a requirement-derived correction rather than treating the existing failure as the expectation.

When a slow, unavailable, destructive, non-deterministic, externally mutating, or otherwise uncontrollable boundary needs substitution or observation, load [Test Doubles](references/TEST-DOUBLES.md). Keep internal collaborators real and do not introduce a production abstraction solely to enable mocking.

### 3. Build an independent oracle

Prefer, in order:

1. a confirmed requirement, accepted worked example, published protocol, or domain decision;
2. a law, invariant, or contract independent of the production algorithm;
3. a trusted external reference or separately implemented model; or
4. accepted prior behaviour when preservation is the requirement.

Encode the expectation as an independently reasoned literal or predicate. Do not call the production helper, copy its algorithm, approve newly captured output, or assert only that execution completed unless completion is the entire promise. When no credible oracle exists, surface the missing behavioural decision in the caller's workflow.

When examples cannot economically cover a large input or state space, or a direct expected output is unavailable but an independent relation, model, or comparator exists, load [Generative Testing](references/GENERATIVE-TESTING.md). Use only the technique whose trigger and oracle hold.

### 4. Make the test deterministic and complete

Arrange local explicit state, perform one meaningful action, assert the complete promised outcome, then release acquired resources. Add a negative or unchanged-state assertion only when the requirement makes it material and the action has a real causal path to the observed value. One behaviour may need several cohesive assertions; split multiple independent actions or rules.

Control time and randomness through a deterministic source at the system boundary. Use fixed instants and seeds and preserve a minimised failing counterexample. Give each test isolated data and restore process state, files, transactions, services, timers, and environment values it changes. Avoid sleeps, execution-order dependencies, live external services, and shared mutable fixtures.

### 5. Challenge and rationalise

Apply both counterfactuals before retaining a test:

- If promised behaviour broke, would this test fail?
- If only hidden structure changed, would this test remain unchanged and pass?

Map every affected test to unique protection after refactoring. Keep a focused example when it specifies a distinct rule or gives a clearer failure. Otherwise remove duplicates or consolidate cases only when the resulting oracle and failure diagnosis remain clear. Fewer tests are better only when no unique defect detection is lost.
