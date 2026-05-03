# Debug Template

Write a living `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md` artifact using this exact section order.

```md
# Debug Note: <bug>

## User Report Provenance

- Source: `<user message, issue, PR, alert, log, support ticket, or other origin>`
- Reporter and timestamp: `<who reported it and when, if known>`
- Original report excerpt: `<verbatim summary or link>`
- Prior artifact resumed: `<debug.md path or None>`

## Intake Questions Answered

- Exact symptom: `<failing test, build step, crash, assertion, wrong output, or visible bad behaviour>`
- Expected behaviour: `<what should happen; block if unknowable>`
- Actual behaviour: `<what happens instead>`
- Impact: `<severity, affected users, frequency, business or workflow effect>`
- Environment: `<OS, runtime, browser, device, CI, production, tenant, dataset, versions>`
- Reproduction: `<exact command, script, URL, manual path, or missing detail>`
- Questions answered: `<Q/A list with the user or evidence source>`
- Open questions or blockers: `<unknowns that prevent reproduction, expected behaviour, or diagnosis>`

## Targeted Codebase Exploration

- Relevant files or areas: `<small set of paths inspected and why>`
- Existing tests or commands: `<tests, scripts, logs, traces, or smoke paths likely to reproduce or verify>`
- Ownership and prior context: `<recent commits, related docs, issues, or maintainers if known>`
- Likely seams or boundaries: `<public interface, subsystem handoff, config, data, timing, or environment boundary>`
- Exploration limits: `<what was intentionally not inspected before reproduction>`

## Reproduction

- Status: `<deterministic | flaky | not yet stable>`
- Exact command or path: `<single reproducing command, script, or manual flow>`
- Expected behaviour: `<what should happen>`
- Actual behaviour: `<what happens instead>`
- Reduced reproduction or flaky classification: `<smallest stable repro, flaky proof, or why not yet reduced>`

## Full Error Reading

- Full error, stack, warning, assertion, and exit code: `<verbatim or linked complete output>`
- First meaningful frame: `<earliest useful application, config, dependency, or boundary frame>`
- Relevant surrounding logs or traces: `<only facts needed to understand the failure>`
- Error-reading conclusion: `<what the full output proves and what it does not prove>`

## Environment Facts

- Revision / branch / artifact: `<commit, branch, build, image, or release>`
- Runtime and platform: `<OS, runtime, dependency versions>`
- Inputs, flags, config, and data facts: `<only facts that affect reproduction>`
- Scope: `<local | CI | production | tenant | dataset | path>`

## Recent Changes

- Working tree and staged diff: `<relevant changed files or None>`
- Recent commits or release delta: `<good/bad window, candidate commits, or None>`
- Dependencies, config, environment, CI, and runtime drift: `<changes found or None>`
- Recent-change conclusion: `<which changes remain plausible and why>`

## Reduction And Isolation

- Smallest failing case found: `<reduced test, request, input, or path>`
- What was removed or controlled: `<fixtures, services, flags, timing, data>`
- Good / bad comparison points: `<known-good input, env, trace, commit, or output>`

## Working Examples

- Working example or reference implementation: `<passing test, sample, prior release, adjacent feature, or N/A>`
- Broken versus working comparison: `<key input, output, state, config, trace, or behaviour differences>`
- First observed divergence: `<earliest difference between working and broken paths>`

## Diagnostic Edits

- Temporary diagnostic edits made: `<file, purpose, and exact observation, or None>`
- Revert status: `<reverted before fix handoff | not applicable>`
- Diagnostic edit outcome: `<what was proven, disproven, or left unclear>`

## Boundary Tracing

- Boundary map: `<components, layers, services, files, or processes crossed by the failing path>`
- Ingress observations: `<input, request, event, props, state, or config entering each boundary>`
- Egress observations: `<output, response, emitted event, mutated state, or error leaving each boundary>`
- Config propagation: `<where config/env/flags are read, transformed, or lost>`
- State at each component handoff: `<state snapshot or invariant at each handoff>`
- First bad boundary or divergence: `<component, layer, handoff, state, or frame where good turns bad>`

## Evidence

- E1. `<command, log, trace, dump, screenshot, diagnostic edit, or debugger observation>`
- E2. `<next evidence item>`
- E3. `<next evidence item>`

## Hypotheses And Experiments

- H1. `<current best hypothesis>`
    - Why plausible: `<evidence that points here>`
    - Strongest alternative: `<next best explanation>`
    - Experiment: `<single discriminating step>`
    - Expected result: `<what would support H1>`
    - Actual result: `<observed outcome>`
    - Falsifier: `<what would disprove H1>`
    - Conclusion: `<supported | disproved | unclear>`
- H2. `<alternative or eliminated hypothesis>`
    - Why plausible: `<brief reason>`
    - Experiment: `<single discriminating step>`
    - Actual result: `<observed outcome>`
    - Falsifier: `<what would disprove H2>`
    - Conclusion: `<supported | disproved | unclear>`
- Experiment outcomes: `<summary of supported, disproved, and unclear hypotheses>`

## Diagnosis Gate

- First bad state or divergence: `<earliest state proven wrong>`
- Root cause statement: `<specific condition>` caused `<failure>` because `<mechanism>`
- Falsifier: `<result that would prove the diagnosis wrong>`
- Fix constraints: `<behaviour, compatibility, observability, and invariants the fix must preserve>`
- Gate status: `<open | grounded>`

## Fix Hypothesis

- Chosen fix hypothesis: `<single change expected to remove the root cause; leave unset until gate is grounded>`
- Why this fix follows from the diagnosis: `<tie back to evidence and first bad state>`
- Loop number: `<1 | 2 | 3>`

## Regression Test

- Test location: `<path>`
- behaviour under test: `<public interface or stable seam>`
- Failing result before fix: `<proof the regression exists>`
- Passing result after fix: `<proof the behaviour now holds>`

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

## Architecture And Pattern Reassessment

- Trigger: `<after 3 failed fix loops | not reached>`
- Failed loop summary: `<attempts, hypotheses, review outcomes, and reset reasons>`
- Architecture or pattern reassessment: `<ownership, boundaries, abstractions, data flow, or workflow assumptions reconsidered>`
- Next direction before escalation: `<new diagnosis direction, architecture concern to investigate, or reason escalation is required>`

## Closure

- Final status: `<fixed | escalated | still diagnosing>`
- User-visible resolution: `<what changed for the user>`
- Closure evidence: `<verified fix, reason for escalation, or reason diagnosis remains blocked>`
- Follow-ups: `<cleanup, hardening, or None>`
```

## Rules

- `debug.md` starts or resumes in `debugging` and stays the single living bug artifact for later loops.
- Capture user report provenance, exact symptom, expected behaviour, actual behaviour, environment facts, full error reading, recent changes, reduced reproduction or flaky classification, working examples, diagnostic edits, boundary tracing, first bad boundary or divergence, hypotheses, falsifiers, fix constraints, chosen fix hypothesis, experiment outcomes, fix attempts, review outcomes, and closure together in one file.
- If expected behaviour is unknowable, keep asking or block in `debugging`; do not route to fixing.
- The diagnosis gate must be grounded before any production-code change.
- Record failed hypotheses, diagnostic edits, failed fix loops, resets, and escalations explicitly; do not erase them.
- After 3 failed fix loops, reassess architecture and patterns before user escalation.
- Temporary diagnostic edits must be reverted and recorded before fix handoff.
- Keep the artifact short, concrete, and evidence-backed.
