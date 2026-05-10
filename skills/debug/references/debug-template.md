# Debug Template

Create or resume one living `docs/propulsion/{yyyymmdd}-{bug-slug}/debug.md` dossier. Keep it concise, evidence-backed, and append-only for failed hypotheses, resets, diagnostic edits, and fix loops.

```md
# Debug Note: <bug>

## Intake

- Source/time: `<user report, issue, PR, alert, log, support ticket, or prior debug.md>`
- Original report: `<verbatim excerpt or link>`
- Exact symptom: `<failing command, crash, assertion, wrong output, visible behaviour>`
- Expected behaviour: `<known expected result, or blocker if unknowable>`
- Actual behaviour: `<observed result>`
- Impact: `<severity, frequency, users/workflows affected>`
- Environment: `<OS, runtime, browser, device, CI/prod, tenant, dataset, versions>`
- Questions answered: `<Q/A list or None>`
- Open blockers: `<missing expected behaviour, reproduction, environment, data, access, or None>`

## Targeted Exploration

- Areas inspected: `<small path/component set and why>`
- Relevant tests/commands/logs: `<possible reproduce or verification signals>`
- Ownership/prior context: `<recent docs, commits, issues, maintainers, or None>`
- Likely seams: `<public interface, subsystem handoff, config, data, timing, environment>`
- Exploration limits: `<what was intentionally deferred until reproduction/evidence>`

## Reproduction / No-Repro

- Status: `<reproduced | flaky | no-repro | blocked>`
- Exact command/path: `<single command, script, URL, or manual flow>`
- Expected vs actual: `<short comparison>`
- Full output: `<inline excerpt or linked complete output>`
- Reduced repro: `<smallest stable failing case, flaky proof, or no-repro attempts>`
- No-repro/blocking rationale: `<attempts made, missing signal, user input needed, or N/A>`

## Full Error Reading

- Complete error: `<full error, stack, warning, assertion, logs, exit code>`
- First meaningful frame/signal: `<earliest useful app, config, dependency, data, or boundary frame>`
- Surrounding context: `<only logs/traces needed to interpret the failure>`
- Conclusion: `<what the output proves and does not prove>`

## Environment And Recent Changes

- Revision/build: `<commit, branch, release, image, artifact>`
- Runtime/config/data: `<versions, flags, env, inputs, time/locale, tenant/dataset>`
- Worktree/staged diff: `<relevant changes or None>`
- Recent delta: `<good/bad window, candidate commits, dependencies, CI/runtime drift>`
- Change conclusion: `<plausible changes tied to the symptom, or none>`

## Reduction And Comparison

- Smallest failing case: `<input, request, fixture, test, path, or workload>`
- Variables removed/controlled: `<services, flags, data, timing, seed, order, config>`
- Working example: `<passing test, adjacent feature, prior release, known-good trace, or N/A>`
- Broken vs working diff: `<input, output, state, config, trace, timing, boundary behaviour>`
- First observed divergence: `<earliest point where good and bad paths differ>`

## Boundary Tracing

- Boundary map: `<components, layers, services, files, processes crossed>`
- Handoff observations: `<input and output at each relevant boundary>`
- Config/data/state propagation: `<where values are read, transformed, lost, raced, or corrupted>`
- First bad boundary: `<component, frame, state, handoff, or transition where good turns bad>`

## Diagnostic Edits

- Temporary edits: `<file, tag/comment marker if used, purpose, observation, or None>`
- Revert status: `<reverted before fix handoff | not applicable>`
- Outcome: `<evidence proven, disproven, or still unclear>`

## Evidence

- E1. `<command/log/trace/dump/screenshot/debugger/diagnostic edit observation>`
- E2. `<next evidence item>`

## Hypotheses And Experiments

- H1. `<current best hypothesis>`
    - Evidence for: `<why plausible>`
    - Strongest alternative: `<next best explanation>`
    - Experiment: `<one discriminating experiment>`
    - Expected result: `<supporting outcome recorded before running>`
    - Actual result: `<observed outcome>`
    - Falsifier: `<what disproves it>`
    - Conclusion: `<supported | disproved | unclear>`
- H2. `<next hypothesis only after H1 concludes or resets>`

## Diagnosis Gate

- First bad state/divergence: `<earliest proven wrong state or boundary>`
- Root cause: `<specific condition> caused <failure> because <mechanism>`
- Falsifier: `<evidence that would prove this diagnosis wrong>`
- Fix constraints: `<behaviour, compatibility, observability, invariants to preserve>`
- Gate status: `<open | grounded>`

## Regression Test

- Test location: `<path or no-test rationale from tdd>`
- Behaviour under test: `<public interface or stable seam>`
- Failing proof before fix: `<command/result>`
- Passing proof after fix: `<command/result>`

## Fix Attempts

- Attempt 1: `<one fix hypothesis and summary>`
    - Files changed: `<paths>`
    - Verification: `<commands and results>`
    - Review result: `<approved | rejected>`
    - Outcome: `<closed | reset to diagnosis>`
- Attempt 2: `<N/A or next single fix after reset/continued evidence>`

## Verification

- Targeted checks: `<commands and outcomes>`
- Wider regression checks: `<commands and outcomes>`
- Remaining unexplained evidence: `<None or list>`

## Reassessment

- Trigger: `<after 3 failed fix loops | not reached>`
- Failed loop summary: `<hypotheses, attempts, review outcomes, reset reasons>`
- Architecture/pattern reassessment: `<ownership, boundaries, abstractions, data flow, workflow assumptions>`
- Next direction/escalation: `<new investigation direction or user decision required>`

## Closure

- Final status: `<fixed | blocked | no-repro | reset | escalated>`
- Resolution: `<what changed, or why not>`
- Closure evidence: `<verification, no-repro proof, blocker, or escalation evidence>`
- Follow-ups: `<cleanup, hardening, or None>`
```

## Rules

- `debug.md` is the single audit trail from intake through closure.
- Reproduce before theorising; read the full error before summarising; reduce before widening search.
- If expected behaviour, reproduction, or environment is unknowable, record the blocker and do not dispatch a fix.
- Ground the diagnosis gate before any production-code change or fix dispatch.
- Use one hypothesis, one experiment, and one fix at a time; record expected experiment results before running them.
- Use the same sections for flaky, no-repro, regression-window, performance, environment/config, data-dependent, concurrency, and multi-component evidence.
- Record diagnostic edits with file, purpose, marker when relevant, observation, and revert status; revert them before fix handoff.
- Preserve failed hypotheses, contradicted evidence, rejected reviews, reset reasons, failed fix loops, and escalations.
- After 3 failed fix loops, reassess architecture and patterns before escalating.
