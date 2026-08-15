---
name: tdd
description: Implements observable features and bug fixes through red-green-refactor. Use when an existing runnable test suite can exercise the change at a stable public seam.
metadata:
    invocation: model
disable-model-invocation: false
---

# Test-Driven Development

**Classicist TDD** builds one observable behaviour at a time through red-green-refactor, testing the narrowest stable public seam with real internal collaborators and doubling only uncontrollable boundaries.

## Prerequisite

TDD applies when an existing runnable test suite can exercise the requested behaviour through a stable public seam. Otherwise return control with the missing condition; the caller owns any decision to create a test harness or reshape a public contract. Apply TDD to observable behaviour, including configuration with observable effects; leave documentation, configuration-only maintenance, and behaviour-preserving refactors with the caller.

## Process

### 1. Establish the baseline

Read repository instructions, identify the relevant test command, and run the existing suite. Use **tracer bullets** to select the smallest end-to-end behaviour that advances the request. Apply caller-supplied modular constraints, or invoke `$modular-design` when the slice presents a new material structural-maintainability decision, then choose the narrowest stable public seam that observes the slice without exposing hidden structure. Identify a **test oracle**—a requirement, worked example, invariant, contract, trusted reference, accepted prior behaviour, or explicit domain decision—capable of distinguishing the expected outcome from the implementation. Consult [Test Quality](references/TEST-QUALITY.md) when the seam, oracle, or proposed assertion could couple to representation. The baseline, behaviour, seam, oracle, and applicable modular constraints are explicit.

### 2. Red

Use **Arrange-Act-Assert** to add one focused test. Apply the **Test Desiderata**, especially behavioural sensitivity, structure insensitivity, specificity, determinism, readability, and production prediction. Keep internal collaborators real. When an uncontrollable boundary must be controlled or observed, choose the least powerful **Test Double** that supplies the required evidence; consult [Test Doubles](references/TEST-DOUBLES.md) before introducing a double or interaction assertion.

For a bug, reproduce the incorrect behaviour; adopt an already-failing regression test only when it independently specifies the desired behaviour. Run the focused test and confirm that it fails for the expected behavioural reason. When it fails because of the test or environment, remain in Red: correct an in-scope defect or report the blocker, then rerun until the intended failure is observed. Meaningful red evidence exists before Green begins.

### 3. Green

Implement only enough production code to satisfy the behaviour, then run the focused test and relevant nearby tests. The new behaviour passes without speculative production code or hidden baseline failures.

### 4. Refactor

Improve the test and production code while keeping behaviour fixed. Preserve the test across changes to algorithms, collaborators, storage, rendering, or other hidden structure; when structure alone breaks it, move the observation back to the public outcome. Run the focused tests after each material change until the design is clear and green. The cycle ends without a refactor regression.

### 5. Complete the cycles

Repeat Red, Green, and Refactor for each remaining behaviour, then run the complete relevant suite. Report the behaviours delivered, red and green evidence, refactors, commands, results, and unresolved baseline failures. The requested behaviour and retained tests are verified.
