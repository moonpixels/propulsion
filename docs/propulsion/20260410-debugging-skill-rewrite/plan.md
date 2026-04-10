# Plan: Debugging Skill Rewrite

> Source PRD: `docs/propulsion/20260410-debugging-skill-rewrite/prd.md`

## For Agentic Coders

Use the `execution` skill to implement this plan one phase at a time, and track progress using the checkboxes.

## Durable Decisions

- Keep `debugging` diagnosis-only. It MUST NOT implement production fixes.
- Always require a durable `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` artifact before handoff.
- Treat the diagnosis as grounded only when the first bad state, first divergence, or earliest explainable bad transition is proven with evidence.
- Keep critical gates, stop conditions, re-entry rules, and stage boundaries in `skills/debugging/SKILL.md`, not hidden only in references.
- Split broad bug-class coverage into focused reference files under `skills/debugging/references/` so the main skill stays short and explicit.
- Preserve workflow compatibility. Do not redesign entry routing or turn `debugging` into an implementation stage.

## Phase 1: Rewrite The Top-Level Contract

**Status**: [x] Phase complete

**Goal**: Replace the current lightweight `debugging` contract with a stricter diagnosis-first workflow that enforces evidence collection, anti-thrashing rules, exact handoff behavior, and explicit re-entry into `debugging` when later stages uncover contradictory evidence.

**Supporting Context**: The current `SKILL.md` is too thin, makes `debug.md` optional, and does not clearly encode the stronger four-phase workflow or the first-bad-state evidence bar. Use `docs/propulsion/skill-authoring.md`, the approved PRD, `docs/propulsion/20260410-debugging-skill-rewrite/research.md`, and sibling skills such as `exploration`, `planning`, `execution`, and `tdd` as the consistency baseline while rewriting the top-level contract.

**User Stories**:

1. As an agentic coder, I want a strict debugging workflow that prevents premature fixes, so that I stop masking symptoms and start proving causes.
2. As a downstream planner or implementer, I want a durable diagnosis artifact with reproduction, evidence, first divergence, and fix constraints, so that I can act on the diagnosis without restarting the investigation.
3. As a human partner, I want Propulsion to stop thrashing after repeated failed experiments and question assumptions explicitly, so that debugging stays disciplined under pressure.

**Likely Areas**: `skills/debugging/SKILL.md`

**Constraints**: Preserve the standard Propulsion skill shape. Keep `debugging` diagnosis-only. Put critical gates in `SKILL.md`. Do not imply transitions. Do not allow artifact-free handoffs.

**Acceptance Criteria**:

- [x] `skills/debugging/SKILL.md` defines explicit prerequisites, ordered instructions, mandatory rules, observable completion gates, and exact next-skill routing in Propulsion's standard shape.
- [x] The main workflow encodes the stronger sequence of triage/reproduction, reduction/isolation, evidence-driven diagnosis, and root-cause handoff without allowing production fix edits.
- [x] The rules explicitly require every action to either increase certainty or reduce search space, and explicitly escalate after repeated failed or non-discriminating experiments.
- [x] The top-level contract explicitly forbids speculative fix stacking and symptom-first edits during diagnosis.
- [x] The completion gate requires a grounded diagnosis and a written `debug.md` artifact before asking whether to move to `planning`.
- [x] The skill includes an explicit re-entry path for contradictory later evidence so debugging resumes from the existing artifact instead of restarting from scratch.

## Phase 2: Rebuild The Core Diagnosis References

**Status**: [x] Phase complete

**Goal**: Replace the current generic references with a stronger core investigation loop and an exact `debug.md` template that make root-cause proof, reduction, experimentation, and handoff structure concrete for the implementer.

**Supporting Context**: The current `investigation-loop.md` and `debug.md` are too light for the required evidence bar. This phase turns the doctrine into executable guidance and a durable artifact shape. Use `docs/propulsion/20260410-debugging-skill-rewrite/research.md` and the Superpowers systematic debugging materials named in the PRD as the main content inputs, while keeping wording and reference shape aligned with Propulsion's local authoring guidance.

**User Stories**:

1. As an agentic coder, I want a strict debugging workflow that prevents premature fixes, so that I stop masking symptoms and start proving causes.
2. As a downstream planner or implementer, I want a durable diagnosis artifact with reproduction, evidence, first divergence, and fix constraints, so that I can act on the diagnosis without restarting the investigation.

**Likely Areas**: `skills/debugging/references/investigation-loop.md`, `skills/debugging/references/debug.md`, `skills/debugging/references/debugger-led-inspection.md`

**Constraints**: Keep references focused and single-purpose. Do not move critical gates out of `SKILL.md`. Allow diagnostic probes and instrumentation, but do not blur the line into production fix guidance.

**Acceptance Criteria**:

- [x] `references/investigation-loop.md` tells the debugger how to capture exact symptoms, freeze the environment, classify the failure mode, minimize the failing case, compare against known-good variants, rank hypotheses, and run one discriminating experiment at a time.
- [x] The core investigation reference makes tracing backward to the first bad state the center of diagnosis rather than stopping at a late symptom.
- [x] Deterministic functional failures are explicitly covered by the core investigation flow, so implementers do not need a separate branch reference to satisfy that part of the PRD.
- [x] `references/debug.md` defines one exact `debug.md` section order and a strict root-cause statement format, including evidence, first divergence, falsifier, unresolved alternatives, and downstream fix constraints.
- [x] The rewritten references make clear that `debug.md` is always required and diagnosis-first, not an implementation log.
- [x] The core references make explicit where debugger-led inspection techniques such as breakpoints, logpoints, watchpoints, frame inspection, post-mortem debugging, and similar observation-first tools belong in the workflow.

## Phase 3: Add Specialized Branch References And Final Handoff Alignment

**Status**: [x] Phase complete

**Goal**: Add focused branch references for the major failure classes and advanced debugging techniques, then align any minimal downstream wording needed so `planning` can consume the stronger debug handoff cleanly without workflow ambiguity.

**Supporting Context**: The PRD calls for broad bug-class coverage, but the main skill must stay low-token. This phase adds the maintainable reference suite and verifies the stronger handoff contract does not contradict adjacent skills. Use the research artifact, the sibling skill package conventions, and the existing planning references as the alignment check while deciding how to split the reference suite.

**User Stories**:

1. As an agentic coder, I want explicit branches for different failure classes, so that I can use the right investigation techniques for flaky, regression, performance, config, and concurrency bugs.
2. As a downstream planner or implementer, I want a durable diagnosis artifact with reproduction, evidence, first divergence, and fix constraints, so that I can act on the diagnosis without restarting the investigation.
3. As a human partner, I want Propulsion to stop thrashing after repeated failed experiments and question assumptions explicitly, so that debugging stays disciplined under pressure.

**Likely Areas**: `skills/debugging/references/`, `skills/debugging/references/flaky-failures.md`, `skills/debugging/references/regression-isolation.md`, `skills/debugging/references/performance-failures.md`, `skills/debugging/references/environment-and-config.md`, `skills/debugging/references/data-dependent-failures.md`, `skills/debugging/references/concurrency-and-ordering.md`, `skills/debugging/references/multi-component-boundaries.md`, `skills/debugging/references/debugger-led-inspection.md`, `skills/planning/SKILL.md`, `skills/planning/references/plan-template.md`, `skills/planning/references/plan-reviewer-prompt.md`

**Constraints**: Keep branch references sharply scoped. Cover deterministic, flaky, regression, performance, environment/config, data-dependent, concurrency, and multi-component failures. Do not edit `planning` unless the stronger debug contract reveals a real wording mismatch.

**Acceptance Criteria**:

- [x] `skills/debugging/references/` includes focused branch guidance for the agreed failure classes and any core advanced techniques needed to support them, without bloating `SKILL.md`.
- [x] The branch-reference suite covers, at minimum, flaky failures, regression isolation, performance failures, environment/config mismatches, data-dependent failures, concurrency/ordering bugs, and multi-component boundary tracing, with any additional core technique guidance added only where it sharpens execution.
- [x] The main `debugging` skill references the new branch documents where they matter, and the package reads as one coherent workflow rather than a pile of disconnected notes.
- [x] Any necessary downstream wording updates are minimal, concrete, and limited to preserving compatibility with the stronger `debug.md` handoff.
- [x] If `planning` already cleanly supports the stronger debug handoff, the phase records that compatibility was checked and leaves the downstream files unchanged.
- [x] Repo-wide checks pass after the rewrite, proving the updated skill package and any downstream wording changes do not break the repository.
