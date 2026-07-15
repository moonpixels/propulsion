---
name: tdd
description: Builds observable behaviour through red-green-refactor. Use when a feature or bug fix can be exercised by an existing runnable test suite through a stable seam.
metadata:
    invocation: model
disable-model-invocation: false
---

# Test-Driven Development

**Test-driven development** builds one observable behaviour at a time through red-green-refactor. Use **Classicist TDD** to test stable public seams with real internal collaborators, introducing doubles mainly at uncontrollable boundaries.

## Prerequisite

TDD applies when an existing runnable test suite can exercise the requested behaviour through a stable public seam. Otherwise return control with the missing condition; the caller owns any decision to create a test harness or reshape a public contract. Apply TDD to observable behaviour, including configuration with observable effects; leave documentation, configuration-only maintenance, and behaviour-preserving refactors with the caller.

## Process

### 1. Establish the baseline

Read repository instructions, identify the relevant test command, and run the existing suite to establish a known baseline. Separate unrelated existing failures from the change, then select the smallest observable behaviour. The baseline, test seam, and next behaviour are explicit.

### 2. Red

Use **Arrange-Act-Assert** to add one focused test through a stable public interface. For a bug, reproduce the incorrect behaviour; adopt an already-failing regression test only when it independently specifies the desired behaviour. Run the test and confirm that it fails for the expected behavioural reason rather than a test defect or environment error. When it does not, remain in Red: correct an in-scope test defect or report an environment blocker, then rerun until the expected failure is observed. Meaningful red evidence is recorded before Green begins.

### 3. Green

Implement only enough production code to satisfy the behaviour, then run the focused test and relevant nearby tests. The new behaviour passes without hiding baseline failures.

### 4. Refactor

Improve the test and production code while keeping behaviour fixed. Run the focused tests after each material change until the design is clear and green. The cycle ends with no refactor regression.

### 5. Complete the cycles

Repeat Red, Green, and Refactor for each remaining behaviour, then run the complete relevant suite. Report the behaviours delivered, red and green evidence, refactors, commands, results, and unresolved baseline failures. The requested behaviour and retained tests are verified.

## Test Quality

Apply the **Test Desiderata** to retain tests that are isolated, composable, fast, inspiring, writable, readable, behavioural, structure-insensitive, automated, specific, deterministic, and predictive. Retained tests remain unchanged when production code is refactored without changing observable behaviour; when structure alone breaks a test, move its assertions to the public outcome. Prefer assertions on public outcomes over CSS classes, incidental DOM shape, private methods, internal call sequences, broad snapshots, or coverage-only cases.
