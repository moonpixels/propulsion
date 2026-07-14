---
name: tdd
description: Builds observable behaviour through red-green-refactor and Test Desiderata. Use when a feature or bug fix has a runnable test suite.
metadata:
    invocation: model
disable-model-invocation: false
---

# Test-Driven Development

**Test-driven development**, from Kent Beck's _Test-Driven Development: By
Example_, builds one behaviour at a time through red, green, and refactor;
**Test Desiderata** governs whether each test is worth keeping.

## Prerequisites

- The request changes observable behaviour or fixes a bug.
- The repository already has a runnable test suite. A missing suite makes TDD
  inapplicable; use the repository's available verification without installing
  a harness solely for this workflow.
- Documentation, configuration-only work, and behaviour-preserving refactors
  remain outside TDD unless they also introduce an observable behaviour change.

## Test Quality

Assess each test against Beck's Test Desiderata. A test need not maximise every
property, but surrender one only for a property of greater value:

- **Isolated** and **composable**: order and selection do not change results.
- **Fast** and **automated**: feedback is prompt and needs no intervention.
- **Inspiring** and **predictive**: passing provides proportionate confidence
  that the behaviour is suitable for production.
- **Writable** and **readable**: its cost is justified and its motivation is
  clear to the next reader.
- **Behavioural** and **structure-insensitive**: behaviour changes affect the
  result; rearranging implementation without changing behaviour does not.
- **Specific** and **deterministic**: failure has an obvious cause and unchanged
  inputs produce the same result.

Test through a public interface or stable observable seam. Derive expectations
independently from a requirement, worked example, or known result. For user
interfaces, prefer interactions and outcomes available to a user, such as
accessible roles, names, labels, and visible state.

Keep CSS classes, incidental DOM shape, private methods, internal collaborator
calls or ordering, broad snapshots, trivial getters, and coverage-padding out
of tests because they do not establish required behaviour. Use test doubles at
uncontrollable system boundaries such as external APIs, time, randomness, and
sometimes persistence; exercise real internal collaborators so refactoring does
not break otherwise valid tests.

## Steps

1. Read the request, repository conventions and context, and nearby tests. Run
   the smallest relevant existing test set to establish a known baseline.
   Record unrelated failures. When a related test already fails for the requested
   defect and independently specifies the required behaviour, adopt it as the
   Red test; otherwise surface a related failure that prevents a known baseline.
   The baseline and the next required behaviour are explicit.
2. Select one smallest behaviour and its most stable observable seam. Infer the
   seam from the public contract and ask the user only when viable seams create
   a material product or architecture trade-off. For a bug fix, choose a test
   that reproduces the defect through that seam. One behaviour and expected
   outcome are fixed for the cycle.
3. **Red**: write one test for that behaviour, or use the qualifying failing test
   found in the baseline, then run it and confirm it fails for the expected
   absence or defect. If it passes or fails for another reason, correct the test
   or setup until the failure proves the intended gap.
4. **Green**: write only the production behaviour needed to pass the new test,
   then run it and the relevant existing tests. The selected behaviour passes
   without regressions or speculative implementation.
5. **Refactor**: while tests are green, improve names, duplication, complexity,
   cohesion, or dependencies when a concrete opportunity exists. Make one
   behaviour-preserving change at a time and rerun the relevant tests. The code
   and tests remain green with worthwhile structure improvements applied.
6. Repeat red-green-refactor for the next behaviour, one test at a time. Finish
   by running the complete relevant test set; every required behaviour is
   covered by durable passing tests.

## Handoff

Report the baseline, behaviours and seams tested, red failures observed, green
commands, refactors performed, final relevant test result, and any unrelated
failure or blocker left for the caller.
