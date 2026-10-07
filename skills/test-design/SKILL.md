---
name: test-design
description: Design minimal behavioural tests when application behaviour changes or testing work is explicitly requested.
---

# Test design

Protect **behavioural promises** with the fewest meaningful tests. Exercise the supported entry used by a person or system. Tests must survive internal refactors that preserve those promises.

## Inputs

Use confirmed requirements, acceptance criteria, documented contracts, production entries and repository testing conventions. Derive expected results independently of the implementation. Resolve missing intended behaviour before its test. Current behaviour is authority only for explicitly requested characterisation work.

## Method

1. **Decide eligibility.** Without an existing testing framework, stop silently. Add no tests, framework recommendation or testing-gap report. Otherwise, new or corrected observable behaviour requires **TDD**. Cosmetic edits, maintenance and behaviour-preserving refactors acquire no new coverage unless testing work is explicitly requested. Judge the actual promise, not the task label. Repair existing brittle tests while preserving useful coverage. The caller still owns existing checks and direct verification.
2. **Choose the behavioural seam.** Drive the actual UI, HTTP route, CLI command, library product API, scheduled job or queue-consumer entry through real internal collaborators. An exported private helper is not a supported entry. Consult [$modular-design](../modular-design/SKILL.md) when interface ownership needs judgement. Read [test techniques](references/test-techniques.md) before writing or repairing tests and [entry examples](references/entry-examples.md) for CLI, library or automated work.
3. **Select the promises.** Map requested promises to existing coverage. Extend or add tests only for missing protection, using representative inputs and material outcomes. Keep several cohesive assertions when they establish one promise. Trace invalid inputs through supported runtime paths. A mock-created bad value does not prove a defence necessary or redundant. Leave production deletion decisions to the caller.
4. **Build the arrangement.** Follow repository conventions and create missing harnesses, model factories and fixtures. Missing scaffolding is work to complete, not a skip condition. Keep application-owned logic and disposable persistence real. Read [test doubles](references/test-doubles.md) for external services, time or randomness. Use **Arrange–Act–Assert**, independent expected results and observable completion. Isolate state and release resources after every test.
5. **Run red–green–refactor.** For each behaviour change, write or adapt one test and observe failure for the intended missing behaviour before implementation. Setup, import and syntax failures are not red. Implement only enough to satisfy the promise, run green, then refactor while green. Complete the cycle before the next promise. A shared rule may satisfy further cases immediately. Retain their useful protection without breaking correct code to manufacture red. Test-only repairs and characterisation work require no artificial red.
6. **Challenge and verify.** Name the promise each retained test protects and an internal refactor it tolerates. Remove redundant or implementation-coupled tests only after preserving useful protection. Never weaken an expectation to accommodate incorrect behaviour. Run affected tests after the final edits. The caller owns broader checks and independent review.

## Finish

Return concise evidence of the tested entries, protected promises, independent expectations, observed red and green where applicable, and affected test results. Report an actual execution blocker precisely. Without a framework, return no testing message. During read-only cleanup or review, apply these rules to findings without editing or starting an implementation cycle.

**Done only when** requested promises have meaningful protection through supported entries, newly implemented behaviour had an intended red before green, retained tests tolerate internal refactoring, and affected tests pass. Stop within the requested behaviour or testing scope.
