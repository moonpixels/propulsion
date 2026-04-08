# Propulsion Agentic Toolset Design And Implementation Plan

## Goal

Build Propulsion into a first-class agentic coding skillset that installs cleanly through `skills.sh`, offers a dedicated OpenCode plugin with automatic workflow bootstrap, and combines Superpowers' workflow discipline with Matt Pocock's brevity and question design.

## Non-Goals

- Do not add a worktree skill or any worktree requirement.
- Do not maintain separate canonical skill trees for OpenCode and non-OpenCode agents.
- Do not introduce a code generation pipeline before the skill language stabilizes.

## Core Decisions

1. Canonical source of truth is top-level `skills/`.
2. OpenCode support is a thin adapter in `.opencode/`, not a second distribution.
3. Propulsion uses pure Propulsion names: `workflow`, `exploration`, `planning`, `execution`, `tdd`, `review`, `review-response`, `debugging`.
4. New work starts in `exploration`, which inspects the codebase first and then asks one question at a time.
5. Planning produces one detailed file at `docs/propulsion/{yyyymmdd}-{plan-name}.md` containing discovery context, decisions, exact file/module targets, task list, verification, and review checkpoints.
6. `execution` defaults to subagent-driven execution when available, with inline execution as fallback.
7. `SKILL.md` files stay short and dense; deeper guidance moves into `references/`.
8. The canonical `skills/` directory contains only the agreed public skills: `workflow`, `exploration`, `planning`, `execution`, `tdd`, `review`, `review-response`, `debugging`.
9. Relevant skills use iterative subagent review loops where available, especially for plan/doc quality and implementation quality.

## Existing Repo Findings

- The repo already has a first-pass `skills/` tree and a plugin scaffold in `.opencode/plugins/propulsion.js`.
- The current plugin resolves `../skills` relative to `.opencode/plugins`, which points to `.opencode/skills`; the canonical skills currently live in top-level `skills/`, so the path is wrong.
- The current `skills/` tree includes legacy names that should be renamed or removed so only the final public Propulsion set remains.
- There is no public install or contributor documentation yet.
- The repo has no commit history yet, so the first implementation pass can normalize layout without migration baggage.

## Target Repo Shape

```text
.
├── README.md
├── opencode.json
├── docs/
│   └── propulsion/
│       └── YYYYMMDD-<plan-name>.md
├── skills/
│   ├── workflow/
│   │   └── SKILL.md
│   ├── exploration/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── planning/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── execution/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── tdd/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── review/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── review-response/
│   │   ├── SKILL.md
│   │   └── references/
│   └── debugging/
│       ├── SKILL.md
│       └── references/
└── .opencode/
    ├── INSTALL.md
    └── plugins/
        └── propulsion.js
```

## Skill Design

### `workflow`

Purpose: tiny bootstrap router for session start.

Responsibilities:
- remind the agent to check for matching skills before acting
- route new or unclear work to `exploration`
- route approved plans to `execution`
- route bugs to `debugging`
- route meaningful changes and review requests to `review`
- route review feedback to `review-response`

Constraints:
- shortest skill in the repo
- no duplicated process detail from downstream skills
- suitable for OpenCode bootstrap injection

### `exploration`

Purpose: replace the heavier brainstorming/spec flow with a sharper discovery interview.

Responsibilities:
- inspect repo context first
- answer questions from code when possible before asking
- ask one question at a time
- provide a recommended answer with each question
- walk the dependency tree in order until scope, constraints, and success criteria are pinned down
- stop before implementation
- hand off to `planning` once the design is approved

Key behavior:
- takes Matt's `grill-me` questioning discipline
- takes Superpowers' codebase-first and alternatives-first behavior
- avoids long ceremonial framing

### `planning`

Purpose: write one detailed planning doc, not a vague PRD and not a split spec/plan pair.

Responsibilities:
- write to `docs/propulsion/{yyyymmdd}-{plan-name}.md`
- capture discovery context, decisions, architecture, exact files/modules, execution phases, verification, and review points
- decompose large work into phased delivery when needed
- make the document detailed enough that an execution agent can follow it without guessing
- run a review pass over the written document when subagents are available, then incorporate fixes before handing it back
- require approval before implementation

Key behavior:
- borrows module thinking and user-story discipline from `write-a-prd`
- borrows exactness and execution handoff from `writing-plans`
- borrows the iterative review mindset from Superpowers so written plans/docs get critiqued before execution
- removes duplicated spec-plan churn

### `execution`

Purpose: execute an approved planning doc with minimal context drift.

Responsibilities:
- read the current plan task before editing
- keep one task in progress at a time
- prefer subagent-driven implementation when the platform supports it
- use inline execution only as fallback
- route behavior changes through `tdd`
- run iterative subagent reviews after meaningful task groups, fix findings, and re-review until clear
- route meaningful completed work through `review`
- stop when the plan is wrong or scope changes materially

Key behavior:
- derives from `subagent-driven-development` and `executing-plans`
- removes worktree assumptions
- keeps Superpowers' iterative improve-review-improve loop for implementation quality
- stays explicit about when to stop and re-plan

### `tdd`

Purpose: enforce strict red-green-refactor in small vertical slices.

Responsibilities:
- no production code before a failing test
- one test, one change, one pass
- test public behavior over implementation details
- refactor only while green

Key behavior:
- concise wording inspired by Matt's `tdd`
- compatible with Propulsion's execution and debugging flows

### `review`

Purpose: request and structure high-signal code review after meaningful changes.

Responsibilities:
- findings first, severity ordered
- focus on regressions, missing verification, plan drift, risky behavior
- prefer subagent review when available
- support repeated review loops for both implementation work and high-value written artifacts like plans
- keep summaries short

Key behavior:
- folds the useful parts of `requesting-code-review` into a smaller public skill
- remains compatible with a dedicated reviewer agent or subagent prompt later if added
- provides the quality gate pattern other skills can invoke instead of inventing their own review flow

### `review-response`

Purpose: handle incoming feedback without blind agreement.

Responsibilities:
- verify the comment against the codebase first
- classify as correct, incorrect, or unclear
- fix or push back with evidence
- re-verify after accepted changes

Key behavior:
- mostly derived from `receiving-code-review`
- should stay compact because the loop is conceptually simple

### `debugging`

Purpose: make root-cause analysis mandatory before bug fixes.

Responsibilities:
- reproduce first
- gather evidence before proposing fixes
- compare broken vs working paths
- state the root-cause hypothesis before editing
- add a regression test when behavior changes

Key behavior:
- derived from `systematic-debugging`
- shorter, stricter, and named for fast discovery

## Upstream Source Links

These links should be referenced directly from the planning and rewrite tasks so implementation subagents can compare tone, structure, and process expectations while authoring Propulsion's versions.

### Exploration

- Matt Pocock `grill-me`: https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/grill-me/SKILL.md
- Superpowers `brainstorming`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/brainstorming/SKILL.md

### Planning

- Matt Pocock `write-a-prd`: https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/write-a-prd/SKILL.md
- Superpowers `writing-plans`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/writing-plans/SKILL.md

### Execution

- Superpowers `subagent-driven-development`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/subagent-driven-development/SKILL.md
- Superpowers `executing-plans`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/executing-plans/SKILL.md

### TDD

- Matt Pocock `tdd`: https://raw.githubusercontent.com/mattpocock/skills/refs/heads/main/tdd/SKILL.md

### Review

- Superpowers `requesting-code-review`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/requesting-code-review/SKILL.md
- Superpowers `receiving-code-review`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/receiving-code-review/SKILL.md
- Superpowers `code-reviewer` agent: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/agents/code-reviewer.md

### Debugging

- Superpowers `systematic-debugging`: https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/skills/systematic-debugging/SKILL.md

### Distribution

- Skills CLI overview: https://skills.sh/docs
- Skills CLI reference: https://skills.sh/docs/cli
- Skills FAQ: https://skills.sh/docs/faq
- Superpowers OpenCode install: https://github.com/obra/superpowers/blob/main/.opencode/INSTALL.md#installation
- Vercel skills CLI README: https://raw.githubusercontent.com/vercel-labs/skills/refs/heads/main/README.md

## Authoring Rules

Every Propulsion skill rewrite should follow `agentic-skills` conventions:

- frontmatter `name` matches directory name
- frontmatter `description` is one line and includes `Use when`, `Use for`, or `Use to`
- `SKILL.md` body stays within the compact Level 2 style
- include `## Quick Start`
- push long examples and edge-case detail into `references/`
- validate each skill after writing

Validation command during implementation, when the global `agentic-skills` install is available:

```bash
bun ~/.config/opencode/skills/agentic-skills/scripts/validate-skill.mjs skills/<skill-name>/SKILL.md
```

If Propulsion should become self-validating later, add a repo-local validator wrapper after the first stable pass, not before.

## Acceptance Criteria

1. `skills.sh` can discover the canonical skills from top-level `skills/`.
2. OpenCode users can install Propulsion through the plugin path and get the bootstrap `workflow` behavior.
3. Only the canonical public Propulsion skills remain in top-level `skills/`.
4. No skill references worktrees or requires a worktree setup step.
5. `workflow` is short enough to inject automatically without bloating context.
6. `exploration` asks one question at a time and recommends an answer each time.
7. `planning` writes one detailed plan file in `docs/propulsion/` and runs a review pass before handoff when possible.
8. `execution` prefers subagents when available, routes behavior changes to `tdd`, and includes iterative review loops.
9. `review` and `review-response` cover both review request and review handling loops.
10. `debugging` enforces root-cause-first behavior.
11. Each public skill passes `agentic-skills` validation and keeps long detail in `references/`.

## Implementation Plan

### Phase 1: Foundation And Distribution

**Files:**
- Modify: `.opencode/plugins/propulsion.js`
- Create: `README.md`
- Create: `.opencode/INSTALL.md`
- Create or update: `skills/workflow/SKILL.md`
- Delete or rename legacy skill directories that are not part of the final public set

Tasks:
- Fix the plugin skills directory resolution so it points at top-level `skills/`.
- Keep bootstrap injection, but ensure the injected content stays limited to `workflow` only.
- Write installation docs for both `skills.sh` and OpenCode plugin usage.
- Rewrite `workflow` into a compact bootstrap router aligned to the final skill taxonomy.
- Remove or rename legacy skill directories so `skills/` contains only `workflow`, `exploration`, `planning`, `execution`, `tdd`, `review`, `review-response`, and `debugging`.
- Verify the plugin and docs both reference Propulsion naming, not Superpowers naming.

Verification:
- `skill` discovery in OpenCode shows the Propulsion skill set.
- `workflow` content is injected only once per session.
- `README.md` and `.opencode/INSTALL.md` show separate install paths for OpenCode vs everyone else.
- A directory listing of `skills/` contains only the canonical public Propulsion skills.

### Phase 2: Core Workflow Skills

**Files:**
- Create or rewrite: `skills/exploration/SKILL.md`
- Create or rewrite: `skills/planning/SKILL.md`
- Create or rewrite: `skills/execution/SKILL.md`
- Create or rewrite: `skills/tdd/SKILL.md`
- Create as needed: `skills/exploration/references/*`
- Create as needed: `skills/planning/references/*`
- Create as needed: `skills/execution/references/*`
- Create as needed: `skills/tdd/references/*`

Tasks:
- Replace the existing exploratory planning behavior with a dedicated `exploration` skill derived from `grill-me` plus `brainstorming`.
- Rewrite `planning` to produce one detailed `docs/propulsion/{yyyymmdd}-{plan-name}.md` file with architecture, exact files, ordered tasks, verification, and review points.
- Make `planning` explicitly run a review-style subagent pass over the written plan/doc when the platform supports it, then revise before final handoff.
- Rewrite `execution` to prefer subagent-driven execution and use inline execution only as fallback.
- Make `execution` explicitly preserve the iterative implement -> review -> fix -> re-review loop from Superpowers.
- Rename `test-driven-development` to `tdd` and tighten the wording to Matt-style brevity without losing the red-green-refactor guardrails.
- Move examples or extended guidance into `references/` so the public skill bodies stay compact.

Verification:
- Each rewritten skill passes `agentic-skills` validation.
- The skill handoff chain is coherent: `workflow` -> `exploration` -> `planning` -> `execution`.
- `planning` explicitly writes to `docs/propulsion/` and does not mention separate spec files or worktrees.
- `planning` and `execution` both document the review loop behavior clearly enough that subagents can follow it without improvising.

### Phase 3: Quality Loop Skills

**Files:**
- Create or rewrite: `skills/review/SKILL.md`
- Create or rewrite: `skills/review-response/SKILL.md`
- Create or rewrite: `skills/debugging/SKILL.md`
- Create as needed: `skills/review/references/*`
- Create as needed: `skills/review-response/references/*`
- Create as needed: `skills/debugging/references/*`

Tasks:
- Rename `code-review` to `review` and shrink it to the highest-signal workflow guidance.
- Keep `review-response` as the feedback-handling complement.
- Rename `systematic-debugging` to `debugging` and preserve its root-cause-first discipline.
- Ensure all three skills use OpenCode tool names and avoid references to unsupported behavior.
- Make `review` the reusable review-loop skill that other skills can invoke for docs and code, not just final code review.
- Cross-check that `execution`, `review`, and `debugging` route into each other cleanly.

Verification:
- Each rewritten skill passes `agentic-skills` validation.
- `review` leads with findings and mentions missing verification or plan drift.
- `debugging` requires evidence before fixes and routes behavior changes into `tdd`.

### Phase 4: Final Integration Pass

**Files:**
- Review all public `skills/*/SKILL.md`
- Review all `skills/*/references/*`
- Review `README.md`
- Review `.opencode/INSTALL.md`
- Review `.opencode/plugins/propulsion.js`

Tasks:
- Run a compact consistency pass across naming, install instructions, path references, and tool mapping.
- Remove any lingering Superpowers branding except in upstream comparison links.
- Remove any worktree references.
- Confirm each skill description is short, triggerable, and valid for discovery.
- Confirm the repo tells two clear stories: `skills.sh` for general installation, plugin for OpenCode.

Verification:
- All skill names, references, and docs use the final Propulsion taxonomy.
- No doc tells the user to install a second copy of the skills for OpenCode.
- No path in the plugin or docs points at `.opencode/skills` unless intentionally introduced later.

## Review Checklist For The Implementer

- Is every public skill shorter and sharper than its upstream sources?
- Did we preserve the important process constraints while removing filler?
- Can an agent discover the right skill from the name alone?
- Does `skills/` contain only the agreed public skills?
- Does the planning doc path match `docs/propulsion/{yyyymmdd}-{plan-name}.md` everywhere?
- Are upstream links included wherever a rewrite task depends on them?
- Do `planning`, `execution`, and `review` preserve the iterative subagent review strategy instead of reducing it to one final check?
- Did we avoid inventing tooling or abstraction that is not yet needed?

## Recommended Execution Order

1. Foundation and distribution
2. Core workflow skills
3. Quality loop skills
4. Final integration pass

The first implementation branch should stop for review after each phase.
