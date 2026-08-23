---
name: tdd
description: Teaches test-driven development through red-green-refactor with durable behavioural tests. Use when a usable suite can exercise changed behaviour through a credible seam.
metadata:
    type: teaching
disable-model-invocation: true
---

# Test-Driven Development

Teaches a caller to implement one observable behaviour at a time and retain a small suite that detects promised-behaviour defects without resisting structural change.

## Prerequisites

Apply TDD only when the work adds, changes, or repairs observable behaviour and an existing usable suite can exercise it through a credible seam. Otherwise surface the missing condition so the caller can use the strongest project-native feedback without claiming TDD. Create a suite or framework only when that infrastructure is part of the agreed work.

## Process

### 1. Fix the slice, seam, and oracle

Use the caller's confirmed behaviour, applicable modular constraints, and current production and test evidence. Inspect only evidence that is missing or stale. Identify the focused command and run its baseline. Keep pre-existing failures visible; continue only when they cannot hide the next Red or Green signal.

Select a **tracer bullet**: the smallest complete vertical slice that produces one requested observable outcome. Apply `$test-design` to choose its seam, oracle, test shape, and any conditional technique. Current output is characterization, not proof of correctness.

For an existing partial implementation, demonstrate sensitivity against the pre-change revision, a safely disabled behaviour, or a controlled known-bad variant. When none is safe, retain an independently meaningful test as regression or characterization evidence without calling the work TDD.

### 2. Red

Write one focused behavioural test before its production change, following the selected test design.

For a bug, reproduce the incorrect result and assert the independently established desired result. Structure the test so failure is reported against the promise: an unexpected exception that aborts before any oracle assertion is not Red unless the test explicitly establishes that successful completion is the promise. When count or order at a system boundary is promised, assert it directly rather than inferring it from final state.

Run the focused test. Red exists only when an oracle fails for the intended missing or incorrect behaviour; a pass, syntax error, fixture failure, or environment error is invalid. Correct an in-scope test or environment defect and rerun, or surface the blocker in the caller's workflow. Preserve the exact Red command and failure.

### 3. Green

Add only enough production code for the current behaviour. Treat confirmed preconditions as inputs to this slice; do not invent validation, errors, fallbacks, or branches for their violation. Do not anticipate later cases, add hypothetical options, or refactor unrelated code. Run the focused test and relevant nearby tests. Fix production code while the independent oracle remains valid; never weaken the test merely to obtain Green. Preserve the exact Green command and result.

### 4. Refactor while green

Improve production naming, cohesion, duplication, ownership, and interfaces without adding behaviour. Keep behavioural tests unchanged through production refactors. When structural movement alone breaks a test, move its observation back to the promised outcome. Clarify test names or fixtures only without weakening the oracle or counterfactuals. Run the focused tests after each material step.

If refactoring exposes a new material structural decision not resolved by the caller's modular constraints, pause the cycle until the caller resolves it.

### 5. Rationalise the retained suite

After production refactoring, reapply `$test-design` to the affected suite while it remains Green.

### 6. Complete the cycles

Repeat Red, Green, Refactor, and rationalisation for each remaining confirmed behaviour. Run the complete relevant suite.

Keep the delivered behaviours, retained tests and their unique protection, exact Red and Green evidence, refactors, commands and results, unresolved baseline failures, fidelity limits, and other missing evidence current in the caller's workflow.
