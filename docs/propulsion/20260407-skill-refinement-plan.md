# Skill Refinement Plan

## Discovery Context

- Propulsion already has the final public skill set in place: `workflow`, `exploration`, `planning`, `execution`, `tdd`, `review`, `review-response`, `debugging`.
- A per-skill comparison pass was run against the most relevant Superpowers and Matt Pocock source skills.
- Goal: capture the strongest missing process from Superpowers and the highest-value wording/terminology from Matt without reintroducing bulk, worktree assumptions, or heavyweight ceremony.
- Rejected options:
  - do not mirror Superpowers' full bootstrap/spec/commit ceremony
  - do not add worktree flow or subagent topology internals to public skills
  - do not force Matt phrasing into skills that have no real Matt analogue
- Non-blocking assumption: current validator warnings on some descriptions are heuristic noise unless a clean wording improvement removes them.

## Decisions

- Apply only the non-optional refinements from the audit.
- Keep this as a wording/process-tightening pass, not a structural rewrite.
- Validate every touched skill with `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/<skill-name>` immediately after editing it.
- Re-run a full validator pass across all public skills at the end.
- Keep all public skills within the compact `agentic-skills` Level 2 style; move nothing to `references/` unless a body would otherwise bloat.

## Architecture

- Treat the skill set as one routed workflow with four layers: routing (`workflow`), discovery/planning (`exploration`, `planning`), execution (`execution`, `tdd`, `debugging`), and critique loops (`review`, `review-response`).
- Update skills in dependency order so upstream routing and handoff language stays consistent while downstream skills are tightened.
- Preserve stable interfaces between skills: `workflow` routes, `exploration` discovers, `planning` writes the execution doc, `execution` follows it, `tdd` handles behavior changes, `review` critiques, `review-response` handles feedback, and `debugging` investigates root cause.

## Repo Touch Points

- Modify: `skills/workflow/SKILL.md`
  Why: strengthen trigger discipline and process-first routing.
- Modify: `skills/exploration/SKILL.md`
  Why: add recent-commit inspection and clearer decomposition language.
- Modify: `skills/planning/SKILL.md`
  Why: add split/reroute guardrails, anti-placeholder language, deeper module wording, and prior-art verification guidance.
- Modify: `skills/execution/SKILL.md`
  Why: tighten blocker handling and fidelity to the written plan.
- Modify: `skills/tdd/SKILL.md`
  Why: strengthen red-state discipline and Matt-style terminology around slices and test quality.
- Modify: `skills/review/SKILL.md`
  Why: add deviation judgment and clearer corrective guidance.
- Modify: `skills/review-response/SKILL.md`
  Why: add source-sensitive remedy checking, coupled-comment handling, and YAGNI pressure checks.
- Modify: `skills/debugging/SKILL.md`
  Why: add recent-change/error-stack checks, source-tracing language, boundary instrumentation, and failed-hypothesis discipline.

## Execution Phases

### Phase 1: Routing And Discovery

- Update `skills/workflow/SKILL.md`.
  Scope:
  - tighten description to a trigger, not a route summary
  - require skill check/load before any response, including clarifying questions
  - add one short process-first routing rule
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/workflow`

- Update `skills/exploration/SKILL.md`.
  Scope:
  - add `recent commits` to the initial repo scan
  - explicitly decompose multi-subsystem requests before detailed questioning
  - keep the one-question loop and codebase-first rule intact
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/exploration`

### Phase 2: Planning And Execution Boundaries

- Update `skills/planning/SKILL.md`.
  Scope:
  - add a split/reroute rule for multi-subsystem or unsafe-one-doc scope
  - add one no-placeholders rule with concrete banned examples
  - strengthen architecture wording toward deep modules / stable, testable interfaces
  - add prior-art tests/checks to verification guidance
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/planning`

- Update `skills/execution/SKILL.md`.
  Scope:
  - add blocker handling for unclear tasks, missing dependencies, or repeated verification failure
  - make fidelity to the written task steps slightly more explicit
  - leave branch-completion handoff out for now
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/execution`

### Phase 3: Implementation Discipline

- Update `skills/tdd/SKILL.md`.
  Scope:
  - add the explicit principle: if you did not watch the test fail, you do not know it proves the behavior
  - tighten red-state quality so failure must match the intended behavior gap
  - add vertical-slice wording and avoid horizontal slicing
  - strengthen test wording so tests survive internal refactors
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/tdd`

- Update `skills/debugging/SKILL.md`.
  Scope:
  - add full error/stack + recent-change checks before hypothesizing
  - add explicit source-tracing / fix-at-source wording
  - add one boundary-instrumentation line for multi-step systems
  - add a failed-hypothesis rule: do not stack fixes; return to evidence
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/debugging`

### Phase 4: Critique Loops

- Update `skills/review/SKILL.md`.
  Scope:
  - add deviation judgment against the approved plan
  - add the likely corrective step when obvious
  - leave explicit ready/not-ready verdicts out for now
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/review`

- Update `skills/review-response/SKILL.md`.
  Scope:
  - add one rule for external review: verify the proposed remedy fits this codebase's constraints
  - strengthen batch handling when comments may be coupled
  - add one compact YAGNI check for "more proper/professional" feedback
  Validation:
  - `bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/review-response`

## Verification

- After each skill edit, run the skill-specific validator command and resolve any real validation failures before moving on.
- After all edits, run:
  - `for dir in skills/*; do bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs "$dir"; done`
- Run a final repo check to confirm:
  - all 8 public skill names still match the canonical Propulsion set
  - no public skill reintroduces worktree assumptions or removed legacy names
  - cross-skill references still point at the correct Propulsion names

## Review Points

- After Phase 1: check that routing/discovery wording got sharper without broadening scope.
- After Phase 2: check that planning/execution boundaries are stricter but still compact.
- After Phase 3: check that TDD/debugging became stricter without turning into long teaching docs.
- After Phase 4: check that critique-loop skills remain reusable for both code and docs/plans.
- Final review: do one whole-surface pass across `skills/*/SKILL.md` to catch naming drift, duplicated process, or new ambiguity.
