---
name: verify-change
description: Verifies fixed software changes with applicable quality harnesses and reproducible evidence. Use for a diff, revision, pull request, repair, or completed implementation.
metadata:
    invocation: model
disable-model-invocation: false
---

# Verify Change

Verifies a fixed software change through the smallest faithful portfolio of repository-required and risk-triggered quality evidence without repairing or certifying the implementation.

## Process

### 1. Fix the verification basis

Read repository instructions and resolve the exact change set from caller context or the user's stated diff, revision, branch comparison, pull request, repair, or other fixed scope. Capture its revisions when applicable, changed and untracked paths, current repository status, intended behaviour, governing specifications and decisions, repository rules, architecture promises, known risks, and relevant pre-existing results. Inspect the patch, affected implementation, tests, quality configuration, and enough surrounding evidence to understand what changed without performing an independent code review. Ask when the scope or expected behaviour is materially ambiguous; when it cannot be fixed, return the exact blocker without running checks. The change, authorities, initial state, and verification target are explicit.

### 2. Build the evidence map

Apply **bidirectional verification traceability** for evidence selection and accounting: trace each applicable behaviour, repository rule, architecture promise, and material risk forward to the changed scope and evidence capable of assessing it; trace each material changed path, selected harness, result, limitation, and verdict statement back to its governing claim or rule. Do not use this map to replace the independent conformance and maintainability judgement owned by code review.

Discover existing repository commands, tests, CI-equivalent gates, and reproducible QA procedures. Every applicable repository-required gate remains selected. Add a risk-triggered harness only when it tests a named claim or exposes a distinct material failure mode; multiple checks resting on the same signal do not create independent assurance. When a specialist risk, unfamiliar harness, or evidential boundary makes selection unclear, consult [Harness Selection](references/HARNESSES.md). Do not add tests, author an ad hoc executable check, generated-input campaign, benchmark, or oracle, install tools, create project-wide infrastructure, or alter CI to fill a gap, even when the addition would be transient. A read-only inspection or probe may characterise a directly observable artefact or diagnose existing evidence, but it does not become a missing behavioural harness. Record the gap for the verdict and recommend explicit planned work. Each material claim has a selected existing evidence route or a stated limitation.

### 3. Bound the execution

For each selected command or procedure, establish the revision or diff, environment, configuration, fixtures or data, seed, material tool versions, expected outputs, and local or external effects. Prefer a check, dry-run, read-only, or disposable mode. Ordinary caches, build artefacts, temporary files, disposable services, and isolated local test data are permitted only when their boundary is understood; clean up only effects created and owned by this run. Never remove or overwrite pre-existing user work.

Do not run an operation that can alter source, tests, snapshots, baselines, suppressions, dependencies, durable project data, or an external system unless the user has separately authorised that exact verification effect and it does not remediate the change. Use a non-mutating mode when available; otherwise record the check as not run and its consequence. The execution plan is reproducible and stays within available authority.

### 4. Execute and appraise the evidence

Run the portfolio in widening order where project dependencies permit: focused reproduction or behavioural evidence; configured static, formatting, type, framework, and architecture checks; related component, integration, contract, or system evidence; broader regression and build gates; then activated specialist procedures. A faster or narrower check does not substitute for a slower faithful one. Existing CI or supplied evidence counts only when its provenance ties it to the frozen change and exposes enough of the execution boundary and result to appraise; otherwise run the applicable local equivalent or record the limitation.

For each executable behavioural check, identify its **test oracle**: the requirement, invariant, worked example, versioned contract, trusted reference, accepted prior behaviour, explicit domain decision, or other authority capable of distinguishing acceptable from incorrect behaviour. Treat implementation-derived expectations, regenerated snapshots, proxy metrics, and execution without a discriminating outcome as weak or absent oracles. Ask what plausible counterexample would refute the claim and what defect in the harness, configuration, inputs, exclusions, or oracle could make a passing result misleading. For any metric, state the claim it informs and how the observed value bears on that claim; never let a proxy erase a failed gate or unsupported behaviour.

Record one evidence entry per claim with:

- the exact claim;
- the harness, its repository or procedure provenance, why it applies, and whether it is required or risk-triggered;
- the execution boundary;
- the observed result: `pass`, `fail`, `flaky-inconclusive`, or `not run`, with salient output, exit status, and artefact location where applicable;
- evidence integrity: `current`, or `stale` when post-basis drift applies;
- the inputs, paths, states, rules, environments, or acceptance criteria actually exercised;
- the limitation and residual risk; and
- the in-scope resolution taken, or the planned work or user decision needed for stronger evidence.

Preserve every retry, seed, failing counterexample, and contradictory observation. A flaky or inconclusive result never becomes a pass through repetition. A required gate that fails remains a failure even when evidence proves it predates the change; state that provenance and whether it masks change-specific signals. The executed portfolio has inspectable claim-level results rather than an undifferentiated green summary.

### 5. Reinspect scope and harness integrity

Compare the final repository state and diff with the frozen basis. Account for changes to source, tests, snapshots, dependencies, generated artefacts, quality configuration, baselines, ignore lists, suppressions, and scripts. Distinguish declared temporary effects from material changes, but do not revert an unexpected change when ownership is uncertain. When any in-scope source or measurement-path change occurred after the scope was fixed, identify the paths, retain each observed result, set its evidence integrity to `stale`, treat it as unable to satisfy the affected claim, and stop without silently retargeting the run. The final evidence refers to the frozen change and an intact measurement path, or its invalidation is explicit.

### 6. Determine the verification verdict

Use exactly one verification-specific verdict:

- `passed within stated scope` when every applicable required gate passed, each material claim has faithful evidence, no material result is unreliable or stale, and all remaining limitations are stated;
- `partially verified` when useful evidence passed but a named material claim or risk lacks a faithful harness or reliable result;
- `unverified` when the requested behaviour could not be exercised, an applicable required gate did not run, or stale evidence leaves no adequate basis for the requested scope; or
- `failed` when an applicable required gate or acceptance criterion failed and remains unresolved.

A failed required gate takes precedence over incomplete evidence. Do not compute a confidence percentage or describe static inspection, compilation, coverage, or any other single route as proof beyond the claim it exercised. The verdict characterises verification evidence only; it does not certify the complete implementation or replace independent code review.

### 7. Report and stop

Return the exact frozen scope, authorities, material risks, selected and omitted harnesses, execution boundaries, commands or procedures, claim-level evidence entries, before-and-after repository state, verdict, limitations, residual risks, and any recommended planned work. Name every check that was not executed and why. Do not repair a failure, add a missing harness, weaken a gate, commit, publish, release, deploy, or continuously monitor. The caller receives reproducible evidence and one bounded verdict for its own remediation, review, or lifecycle decision.
