---
name: tdd
description: Teaches test-driven development through red-green-refactor with durable behavioural tests. Use when a usable suite can exercise changed behaviour through a credible seam.
disable-model-invocation: true
---

# Test-Driven Development

Teaches a caller to implement one observable behaviour at a time and retain a small suite that detects promised-behaviour defects without resisting structural change.

## Prerequisites

Apply TDD only when the work adds, changes, or repairs observable behaviour and an existing usable suite can exercise it through a credible seam. Otherwise return the missing condition to the caller; proceed through the strongest project-native feedback without claiming TDD. Create a suite or framework only when that infrastructure is part of the agreed work.

## Process

### 1. Fix the slice, seam, and oracle

Read the confirmed behaviour, repository instructions, applicable modular constraints, relevant production code, and current tests. Identify the focused command and run its baseline. Keep pre-existing failures visible; continue only when they cannot hide the next Red or Green signal.

Select a **tracer bullet**: the smallest complete vertical slice that produces one requested observable outcome. Choose the narrowest seam that exposes the promise, hides changeable structure, and retains the production risk that matters. Derive the expected result before Green from a requirement, accepted example, contract, invariant, trusted reference, separate model, or accepted prior behaviour. Current output is characterization, not proof of correctness. Load [Test Design](references/TEST-DESIGN.md) and apply its boundary, oracle, determinism, and durability rules.

If the caller already wrote this production behaviour, discard only caller-owned uncommitted implementation and restart test-first. Preserve pre-existing and user-owned work. For an existing partial implementation, demonstrate sensitivity against the pre-change revision, a safely disabled behaviour, or a controlled known-bad variant. When none is safe, retain an independently meaningful test as regression or characterization evidence without calling the work TDD.

### 2. Red

Write one focused behavioural test before its production change. Arrange only necessary state, act once through the supported seam, assert the complete promised outcome, and clean up acquired resources. Assert unchanged state only when its preservation is promised and the action can actually affect the observed value. Name one realistic production break the test must detect and one hidden structural change it must survive.

Keep internal collaborators real. When an uncontrollable boundary needs substitution or observation, load [Test Doubles](references/TEST-DOUBLES.md), choose the least powerful double, and assert only contractually meaningful effects.

For a bug, reproduce the incorrect result and assert the independently established desired result. Structure the test so failure is reported against the promise: an unexpected exception that aborts before any oracle assertion is not Red unless the test explicitly establishes that successful completion is the promise. When count or order at a system boundary is promised, assert it directly rather than inferring it from final state.

Run the focused test. Red exists only when an oracle fails for the intended missing or incorrect behaviour; a pass, syntax error, fixture failure, or environment error is invalid. Correct an in-scope test or environment defect and rerun, or return the blocker. Preserve the exact Red command and failure.

### 3. Green

Add only enough production code for the current behaviour. Treat confirmed preconditions as inputs to this slice; do not invent validation, errors, fallbacks, or branches for their violation. Do not anticipate later cases, add hypothetical options, or refactor unrelated code. Run the focused test and relevant nearby tests. Fix production code while the independent oracle remains valid; never weaken the test merely to obtain Green. Preserve the exact Green command and result.

### 4. Refactor while green

Improve production naming, cohesion, duplication, ownership, and interfaces without adding behaviour. Keep behavioural tests unchanged through production refactors. When structural movement alone breaks a test, move its observation back to the promised outcome. Clarify test names or fixtures only without weakening the oracle or counterfactuals. Run the focused tests after each material step.

If refactoring exposes a new material structural decision not resolved by the caller's modular constraints, return it to the caller for resolution before continuing.

### 5. Rationalise the retained suite

After production refactoring, identify the unique behaviour, boundary, invariant, or risk protected by each affected test. Remove obsolete implementation-detail assertions, broad snapshots used only as change alarms, and examples that add no distinct failure detection. Consolidate equivalent cases with a table or property only when the resulting oracle and failure diagnosis remain clear.

Mentally mutate wrong constants, branches, validation, effects, and empty or default results. Strengthen the smallest test or input that would let a realistic defect survive. Use actual mutation or coverage tooling only when the caller's quality-harness guidance selects it.

### 6. Complete and return

Repeat Red, Green, Refactor, and rationalisation for each remaining confirmed behaviour. When example cases cannot economically cover a large input or state space, or a direct oracle is unavailable, load [Generative Testing](references/GENERATIVE-TESTING.md) and use only the triggered technique. Run the complete relevant suite.

Return the behaviours delivered; retained tests and the unique protection each adds; exact Red and Green evidence; refactors; commands and results; unresolved baseline failures; fidelity limits; and other missing evidence. The caller retains ownership of broader quality harnesses, independent review, the complete work outcome, commits, and publication.
