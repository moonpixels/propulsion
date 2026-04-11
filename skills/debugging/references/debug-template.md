# Debug Template

Write living `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` artifact using this exact section order.

```md
# Debug Note: <bug>

## Reproduction

- Status: `<deterministic | flaky | not yet stable>`
- Exact command or path: `<single reproducing command, script, or manual flow>`
- Expected behavior: `<what should happen>`
- Actual behavior: `<what happens instead>`

## Environment Facts

- Revision / branch / artifact: `<commit, branch, build, image, or release>`
- Runtime and platform: `<OS, runtime, dependency versions>`
- Inputs, flags, config, and data facts: `<only facts that affect reproduction>`
- Scope: `<local | CI | production | tenant | dataset | path>`

## Reduction And Isolation

- Smallest failing case found: `<reduced test, request, input, or path>`
- What was removed or controlled: `<fixtures, services, flags, timing, data>`
- First bad boundary or divergence: `<component, layer, handoff, or state>`
- Good / bad comparison points: `<known-good input, env, trace, commit, or output>`

## Evidence

- E1. `<command, log, trace, dump, screenshot, or debugger observation>`
- E2. `<next evidence item>`
- E3. `<next evidence item>`

## Hypotheses And Experiments

- H1. `<current best hypothesis>`
    - Why plausible: `<evidence that points here>`
    - Strongest alternative: `<next best explanation>`
    - Experiment: `<single discriminating step>`
    - Expected result: `<what would support H1>`
    - Actual result: `<observed outcome>`
    - Conclusion: `<supported | disproved | unclear>`
- H2. `<alternative or eliminated hypothesis>`
    - Why plausible: `<brief reason>`
    - Experiment: `<single discriminating step>`
    - Actual result: `<observed outcome>`
    - Conclusion: `<supported | disproved | unclear>`

## Diagnosis Gate

- First bad state or divergence: `<earliest state proven wrong>`
- Root cause statement: `<specific condition>` caused `<failure>` because `<mechanism>`
- Falsifier: `<result that would prove the diagnosis wrong>`
- Fix constraints: `<behavior and invariants the fix must preserve>`
- Gate status: `<open | grounded>`

## Fix Hypothesis

- Chosen fix hypothesis: `<single change expected to remove the root cause>`
- Why this fix follows from the diagnosis: `<tie back to evidence and first bad state>`
- Loop number: `<1 | 2 | 3>`

## Regression Test

- Test location: `<path>`
- Behavior under test: `<public interface or stable seam>`
- Failing result before fix: `<proof the regression exists>`
- Passing result after fix: `<proof the behavior now holds>`

## Fix Attempts

- Attempt 1: `<summary>`
    - Files changed: `<paths>`
    - Verification: `<checks run and result>`
    - Review result: `<approved | rejected>`
    - Outcome: `<closed | reset to diagnosis>`
- Attempt 2: `<summary or N/A>`

## Verification

- Targeted checks: `<commands and outcomes>`
- Wider regression checks: `<commands and outcomes>`
- Remaining unexplained evidence: `<None or list>`

## Closure

- Final status: `<fixed | escalated | still diagnosing>`
- User-visible resolution: `<what changed for the user>`
- Follow-ups: `<cleanup, hardening, or None>`
```

## Rules

- `debug.md` starts in `debugging` and stays the single living bug artifact for later loops.
- Keep evidence, diagnosis, fix attempts, and closure together in one file.
- The diagnosis gate must be grounded before any production-code change.
- Record failed fix loops, resets, and escalations explicitly; do not erase them.
- Keep the artifact short, concrete, and evidence-backed.
