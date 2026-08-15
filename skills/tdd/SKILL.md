---
name: tdd
description: Implements observable features and bug fixes through red-green-refactor with durable tests. Use when an existing runnable test suite can exercise the change at a stable observable boundary.
metadata:
    invocation: model
disable-model-invocation: false
---

# Test-Driven Development

Builds one observable behaviour at a time through red-green-refactor. Retained tests detect promised behaviour changes while surviving changes to hidden structure.

## Prerequisite

TDD applies only when an existing runnable test suite can credibly exercise the requested behaviour through a stable observable boundary. Otherwise return control with the exact missing condition. Do not install or invent a test framework or add a harness to satisfy this prerequisite; new-project test infrastructure belongs in architecture and initial delivery work. Apply TDD to observable behaviour, including configuration with observable effects; leave documentation, configuration-only maintenance without an exercisable effect, and behaviour-preserving refactors with the caller.

## Process

### 1. Establish the baseline

Read repository instructions, caller-confirmed behaviour and acceptance evidence, applicable modular constraints, relevant production code, and current tests. Identify the test command and run the smallest relevant focused baseline. Record baseline failures without attributing a pre-existing failure to the change; continue only when the focused Red and Green signals remain distinguishable, otherwise return the blocker. Use **tracer bullets** to select the smallest end-to-end behaviour that produces one requested observable result. Apply caller-supplied modular constraints, or invoke `$modular-design` only when the slice presents a new material structural-maintainability decision. Choose the narrowest boundary that exposes the result, hides structure allowed to change, and credibly exercises production behaviour. Identify a **test oracle**—a requirement, accepted example, published protocol, independent invariant, trusted reference or separate model, accepted prior behaviour, or explicit domain decision—capable of disagreeing with the implementation; when none exists, return the missing behavioural decision. Consult [Test Quality](references/TEST-QUALITY.md) when the boundary, oracle, or proposed assertion needs deeper guidance. The baseline, behaviour, boundary, oracle, and applicable modular constraints are explicit.

### 2. Red

Add one focused test: arrange only the necessary state, act once through the selected boundary, assert the complete promised outcome and any material unchanged state, and clean up resources the test acquires. Name one plausible promised-behaviour defect that must make the test fail and one hidden structural change that must leave it unchanged. Keep internal collaborators real. When an uncontrollable boundary must be controlled or observed, choose the least powerful **Test Double** that supplies the required evidence; consult [Test Doubles](references/TEST-DOUBLES.md) before introducing a double or interaction assertion.

For a bug, reproduce the incorrect behaviour; adopt an already-failing regression test only when it independently specifies the desired behaviour. Run the focused test and confirm that it fails for the expected behavioural reason. When it fails because of the test or environment, remain in Red: correct an in-scope defect or report the blocker, then rerun until the intended failure is observed. Meaningful red evidence exists before Green begins.

### 3. Green

Implement only enough production code to satisfy the behaviour using project and framework conventions, then run the focused test and relevant nearby tests. The new behaviour passes without speculative production code or hidden baseline failures.

### 4. Refactor

Improve the production design behind the selected boundary while keeping behaviour fixed. Preserve the test across changes to algorithms, collaborators, storage, rendering, or other hidden structure; when structure alone breaks it, move the observation back to the promised outcome. Clarify test code only without weakening its oracle or quality counterfactuals. Run the focused tests after each material change until the design is clear and green. The cycle ends without a refactor regression.

### 5. Complete the cycles

Repeat Red, Green, and Refactor for each remaining confirmed behaviour, then run the complete relevant suite. Report the behaviours delivered, exact Red and Green evidence, refactors, commands and results, unresolved baseline failures, and other limitations. The requested behaviour and durable retained tests are implemented; the caller owns the overall work outcome, broader quality portfolio, later `$verify-change`, independent `$code-review`, commit or artefact decisions, and whether its workflow can stop.
