---
name: tdd
description: Implement observable behaviour test-first through red-green-refactor when an existing suite can exercise a credible behavioural seam.
metadata:
    type: teaching
---

# Test-driven development

Build one observable behaviour at a time with a test that fails for the missing promise and survives hidden structural change.

## Inputs

Use confirmed behaviour, modular constraints, current production and test evidence, and an existing usable suite with a credible seam. If these conditions do not hold, surface the missing condition and use the strongest project-native feedback without claiming TDD. New suite infrastructure requires that work to be in scope.

Run the focused baseline. Keep pre-existing failures visible and proceed only when they cannot hide Red or Green. Use `$test-design` to select the behavioural seam and independent oracle for the smallest complete vertical slice. Current output is characterization unless preservation is the requirement.

## Method

1. **Red:** write the behavioural test before the production change and run it. The oracle must fail for the intended missing or wrong behaviour. Syntax, fixture, and environment errors do not establish Red. For a bug, assert the independently justified desired outcome. Unexpected exceptions count only when successful completion is the full promise. When an unimplemented stub prevents a result assertion from running, demonstrate that assertion's sensitivity with a controlled wrong result before claiming Red. Assert promised boundary count or order directly.
2. **Green:** implement enough production code for this slice and run the focused and relevant nearby tests. Preserve the valid independent oracle. Treat confirmed preconditions as inputs; do not invent extra branches, options, validation, or fallbacks outside the confirmed behaviour.
3. **Refactor:** improve structure while Green without adding behaviour or weakening the oracle. Behavioural assertions survive production refactors. When structure alone breaks a test, restore observation at the promised outcome. Run focused tests after material changes. Return a new unresolved structural decision to the caller.
4. Apply `$test-design` to the affected Green suite to retain distinct behavioural protection. Repeat the cycle for remaining confirmed behaviours, then run the complete relevant suite.

For a partial implementation, demonstrate sensitivity using the pre-change revision, a safely disabled behaviour, or a controlled known-bad variant. If none is safe, retain a meaningful regression or characterization test and state that failing-before evidence was not demonstrated.

## Finish

Return delivered behaviours, retained tests and their unique protection, exact Red and Green commands and evidence, refactors, final relevant-suite results, baseline failures, and fidelity limits to the caller.

Done when each confirmed behaviour has meaningful coverage and current checks, with missing evidence explicit. A passing test or unrelated error cannot be reported as Red. Leave workflow completion and external actions to the caller.
