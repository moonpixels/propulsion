# Debug.md Guidance

Use this template whenever `debugging` writes or updates the required `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` artifact.

Write `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` in this exact section order:

```md
# Debug Note: <issue>

## Reproduction

- Status: `<deterministic | flaky | not yet stable>`
- Exact command or path: `<single reproducing command, script, or exact manual path>`
- Steps:
    - `<ordered steps>`
- Expected behavior: `<what should happen>`
- Actual behavior: `<what happens instead>`

## Symptom And Failure Class

- Exact symptom: `<error text, assertion, crash, or wrong output>`
- Failure class: `<deterministic functional | flaky | regression | performance | environment/config | data-dependent | concurrency/ordering | multi-component>`
- User-visible impact: `<who or what fails>`

## Environment Facts

- Revision / branch / artifact: `<commit, branch, build, image, or release>`
- Runtime and platform: `<OS, runtime, dependency versions>`
- Inputs, flags, config, and data facts: `<only the facts that affect reproduction>`
- Scope: `<local | CI | production | specific tenant/dataset/path>`

## Reduction And Isolation

- Smallest failing case found: `<reduced test, input, request, or execution path>`
- What was removed or controlled: `<fixtures, services, flags, data, timing, parallelism>`
- First failing boundary or narrowed surface: `<component, layer, call, or state boundary>`
- Good / bad comparison points: `<known-good input, env, commit, trace, or boundary output>`

## Evidence

- E1. `<command, log, trace, dump, screenshot, or debugger observation>`
- E2. `<next evidence item>`
- E3. `<next evidence item>`

## Hypotheses And Experiments

- H1. `<primary hypothesis>`
    - Why plausible: `<evidence that points here>`
    - Strongest alternative: `<next best explanation>`
    - Experiment: `<single discriminating experiment>`
    - Expected result: `<what outcome would support H1>`
    - Actual result: `<observed outcome>`
    - Conclusion: `<supported | disproved | unclear>`
- H2. `<alternative or eliminated hypothesis>`
    - Why plausible: `<brief reason>`
    - Experiment: `<single discriminating experiment or comparison>`
    - Actual result: `<observed outcome>`
    - Conclusion: `<supported | disproved | unclear>`

## First Divergence

- Last known-good state: `<value, boundary output, request state, commit, or frame>`
- First bad state or divergence: `<earliest state proven wrong>`
- Transition that changed good to bad: `<specific handoff, mutation, config application, commit, or ordering event>`
- Evidence: `<E1, E2, ...>`

## Root Cause

- Root cause statement: `<specific condition or code path>` caused `<observed failure>` because `<mechanism>`, first evidenced at `<first bad state or divergence>`, supported by `<E1, E2, ...>`.
- Why this is the root cause, not a late symptom: `<why this explains the earliest bad state>`
- Falsifier: `<one result that would prove this explanation wrong>`
- Unresolved alternatives: `<remaining plausible alternatives or 'None'>`

## Fix Constraints

- Must change: `<what later stages must address>`
- Must preserve: `<behavior, contracts, or invariants that cannot regress>`
- Must prove in implementation: `<tests, environments, or traces later stages must use>`
- Must avoid: `<tempting symptom-only fix or known bad direction>`
```

## Rules

- `debug.md` is always required for `debugging`; it is the durable diagnosis artifact, not an optional note.
- Keep the section order exactly as written so later stages can consume the artifact quickly.
- Replace placeholders with concrete evidence, not generic summaries.
- The `Root Cause` section must explain the earliest proven bad state or divergence, not merely restate the visible symptom.
- `Hypotheses And Experiments` must record failed or unresolved alternatives, not just the winning explanation.
- Keep `debug.md` diagnosis-first. Do not turn it into an implementation log, fix diff, or speculative solution draft.
