---
name: quality-harnesses
description: Teaches risk-triggered selection and honest interpretation of software quality harnesses for a fixed change. Use when implementing or assessing code, tests, configuration, migrations, generated artefacts, or other software changes.
disable-model-invocation: false
---

# Quality Harnesses

Teaches a caller to apply every repository-required and changed-risk harness that can provide faithful evidence without treating green tools, metrics, or control count as proof.

## Process

### 1. Fix the evidence boundary

Read the caller's outcome, exact candidate or change scope, intended behaviour and other authorities, repository instructions, changed implementation and tests, available quality infrastructure, and material environment constraints. Identify:

- behaviour, contracts, data, dependencies, generated output, configuration, and operational qualities changed or relied upon;
- repository-required checks and their actual scopes;
- material failure modes introduced or altered; and
- measurement-path changes, including tests, assertions, snapshots, fixtures, generators, seeds, selectors, exclusions, suppressions, thresholds, baselines, scripts, tool configuration, and cached or generated evidence.

Treat earlier evidence as stale when its candidate, authority, harness, configuration, inputs, environment, or measurement path has materially changed. The fixed evidence boundary and every plausible changed risk are explicit.

### 2. Select through the complete catalogue

Read the complete [Harness Catalogue](references/CATALOGUE.md) on every invocation. For each entry, compare its trigger with the fixed boundary. Select an entry when repository authority requires it or the change exposes its named risk; neither familiarity nor low cost is required. Reject entries with no trigger even when their tooling exists.

Load the linked detail for every selected entry and only selected entries. When entries share one reference, read it once and apply each selected section. Preserve repository-owned commands, versions, matrices, thresholds, and procedures; generic guidance does not replace them.

The catalogue routes selected entries to [Build, Static, and Structural Harnesses](references/BUILD-STATIC-STRUCTURE.md), [Behavioural Evidence](references/BEHAVIOURAL-EVIDENCE.md), [Security and Adversarial Harnesses](references/SECURITY-ADVERSARIAL.md), [Contracts and Data](references/CONTRACTS-DATA.md), [Runtime Qualities](references/RUNTIME-QUALITIES.md), and [Human and Specialist Evidence](references/HUMAN-SPECIALIST.md). Do not load these references until their catalogue trigger applies.

### 3. Apply the selected knowledge

Apply the loaded guidance inside the caller's workflow. The caller owns commands, edits, remediation, evidence, and stopping. Where dependencies allow, use fast focused feedback before broader or specialist evidence, but never substitute a cheaper harness for the faithful one a claim requires.

Selection precedes feasibility. Keep every triggered entry selected even when its existing harness is unreliable, unrepresentative, unsafe, unavailable, or outside the execution boundary; record the result as inconclusive or not run and leave the claim unassessed. Do not relabel an applicable entry as optional or irrelevant merely because faithful evidence is expensive or missing.

Before trusting a result, confirm that the intended target, cases, rules, inputs, and environments actually ran and that the oracle can distinguish the material failure. Treat empty selectors, tautological expectations, stale baselines, unexplained exclusions or suppressions, unrepresentative inputs, hidden retries, and changed thresholds as measurement defects rather than clean evidence.

Use existing infrastructure. Add or improve behavioural tests through the existing suite when the implementation requires them and the caller has authority. Do not install or establish project-wide harness infrastructure unless it is part of the agreed work. Do not weaken or skip a repository-required check silently. When an applicable harness is absent, unsafe, unavailable, or outside scope, leave the claim unassessed and record the residual risk.

### 4. Preserve claim-level evidence

For each selected harness, retain:

- **Claim:** the exact behaviour, repository rule, contract, invariant, or risk assessed;
- **Provenance:** why the harness applies and the repository command or reproducible procedure used;
- **Boundary:** candidate, environment, configuration, fixtures or data, seed, tool version, and external-state constraints where material;
- **Result:** pass, fail, flaky or inconclusive, or not run, with salient output and artefact location;
- **Coverage:** the cases, paths, rules, versions, platforms, states, or criteria actually exercised;
- **Limitation:** what the result cannot establish and any measurement weakness; and
- **Residual risk:** the consequence still unsupported and the in-scope correction, later work, or user decision needed for stronger evidence.

Record a field only when it materially changes interpretation or reproduction for that harness; omit immaterial metadata. Use bounded claims such as “the selected examples passed in this environment.” Do not promote compilation, execution, coverage, mutation, static analysis, or a collection of green controls into proof of correctness, a confidence percentage, or an overall verification verdict.

### 5. Return control

Return the selected and rejected catalogue entries with their triggers, applicable commands or procedures, claim-level evidence, unavailable evidence, and residual risks. End by stating that execution, evidence capture, remediation, and completion remain with the caller. Stop after the guidance has been applied within the caller's current boundary. Do not take ownership of implementation, independent review, commit, publication, release, deployment, or the caller's completion decision.

## Rules

- Treat complexity, cognitive complexity, size, churn, coupling, coverage, mutation, and smell counts as evidence for a named question, never as universal quality gates or findings without a concrete mechanism and consequence.
- Preserve flaky or conflicting results as unreliable evidence; never turn them into a pass through unrecorded retries, averaging, suppression, or selective omission.
- Prefer several independent evidence routes over repeated controls that share the same oracle, configuration, implementation assumption, or failure mode.
- Never state or imply that the candidate is ready, not ready, approved, rejected, verified, unverified, blocked, or clear to continue. Report claim-level evidence and return the completion decision to the caller.
- Return decisions to the caller or an authority already named by the caller or project. Do not invent owners, reviewers, specialists, approval bodies, or coordination.
