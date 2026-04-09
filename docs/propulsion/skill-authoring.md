# Propulsion Skill Authoring

Use this document when creating or updating any Propulsion skill.

## Goal

Write skills that are explicit, strict, low-token, and hard to misread.

Propulsion skills are workflow contracts. Nothing important should be implied. State the exact prerequisite, exact artifact, exact stop condition, exact completion gate, and exact next skill by name.

## Core Rules

- Use exact skill names in backticks: `workflow`, `exploration`, `planning`, `execution`, `tdd`, `review`, `review-response`, `debugging`.
- State every stage boundary explicitly. Never imply what should happen next.
- Put critical gates in `SKILL.md`. Do not hide them only in `references/`.
- Prefer hard commands over soft guidance: `MUST`, `DO NOT`, `NEVER`, `ONLY`, `STOP`, `ALL`.
- Keep sentences short, imperative, and binary.
- Use subagents explicitly when the workflow depends on them.
- State what to do when prerequisites are missing. Usually: `STOP` and route to another skill by exact name.
- State what artifact must exist, where it lives, and whether explicit user approval or a visible user-facing transition prompt is required.
- Add a completion checklist. Do not let the skill exit without it.
- Add `## Quick Start` with one minimal workflow example.
- Start each major section with its standard intro line.
- Move explanation, examples, and long formats into `references/`.

## Tone

Match Matt Pocock's terseness and Superpowers' stage discipline.

- Lead with imperatives.
- Prefer one instruction per line.
- Use CAPS only for control words.
- Avoid filler, motivation, and commentary.
- Avoid hedging like `prefer`, `usually`, `maybe`, unless the choice is genuinely optional.
- Avoid vague language like `continue if needed`, `consider`, `handle appropriately`, `similar to`, `etc.`.

## Required Shape

Every Propulsion `SKILL.md` should use this structure unless there is a clear reason not to.

```md
# Skill Name

One-line mission.

## Quick Start

    Minimal workflow example.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- Requirement 1
- Requirement 2

If any prerequisite is false, STOP. Load `other-skill`.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Step 1.
2. Step 2.
3. Step 3.

## Rules

These rules are MANDATORY.

- MUST ...
- DO NOT ...
- NEVER ...
- ONLY ...

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Outcome 1
- [ ] Outcome 2
- [ ] Outcome 3

## Next Skill

Once the completion gate is fully checked:

- If condition A is true, load `next-skill`.
- If condition B is true, load `different-skill`.

## References

Use these references when you need detail.

- [references/file.md](references/file.md) - Why it exists.
```

## Section Contract

Use the same section meaning every time.

### Prerequisites

Use this section to define the legal entry point.

Standard intro line:

- `ALL prerequisites MUST be true before following this skill.`

- Name the prior skill if there is one.
- Name the required artifact if there is one.
- Name the required approval if there is one.
- Say what to do if anything is missing.

Good:

- Approved `docs/propulsion/.../prd.md` exists.
- `exploration` has completed.
- If the PRD is missing or unapproved, STOP. Load `exploration`.

### Instructions

Use this section for the ordered workflow only.

Standard intro line:

- `Follow these steps IN ORDER. Do NOT skip steps.`

- Put steps in strict sequence.
- Put loops in plain language: `Repeat until ...`.
- Put review and re-review loops here, not only in references.
- If a step uses a reference file, name it inline.

### Rules

Use this section for non-negotiable constraints.

Standard intro line:

- `These rules are MANDATORY.`

- Ban stage skipping.
- Ban guessing.
- Ban hidden transitions.
- Ban artifact-free handoffs.
- Ban self-approval where a fresh subagent or human approval is required.

### Completion Gate

Use this section as the exit test.

Standard intro line:

- `Do NOT leave this skill until ALL items are complete.`

- Every checkbox should be observable.
- Include artifact creation.
- Include required approval.
- Include verification or review if required.
- If a checkbox is not checkable, rewrite it.

### Next Skill

Use exact skill names. Do not imply transitions.

Standard intro line:

- `Once the completion gate is fully checked:`

Good:

- If `prd.md` is approved, load `planning`.
- If plan review finds missing product intent, load `exploration`.
- If review returns findings, load `review-response`.

Bad:

- Move to the next stage.
- Continue the workflow.
- Review if needed.

### References

Use this section as the exhaustive reference list for the skill.

Standard intro line:

- `Use these references when you need detail.`

## Stage Rules

These transitions should stay explicit across the suite.

- `workflow` routes into the correct skill. It does not do the downstream skill's job.
- `exploration` produces `prd.md` and stops for explicit user approval before `planning`.
- `planning` starts from either approved `prd.md` from `exploration` or grounded bug output from `debugging`. It produces `plan.md`, runs plan review until `clear`, then asks whether to move to `execution`.
- `execution` requires current `plan.md`. Main agent orchestrates only. Fresh subagents implement and review.
- `tdd` is used inside `execution` or `review-response` when public behavior changes.
- `review` returns `clear`, `findings`, or `unclear` only.
- `review-response` handles `review` findings, then routes back to `review`.
- `debugging` proves root cause before fixes. It is the process-stage alternative to `exploration` for bugs. It hands off to `planning`, not directly to `execution`.
- `workflow` has no direct-handling bypass for coding work. It always routes into a Propulsion skill.

## Enforcement Patterns

Use these patterns repeatedly.

- `If X is missing, STOP. Load Y.`
- `Do NOT start Z here.`
- `Return \`unclear\` when required inputs are missing.`
- `Repeat until the reviewer returns \`clear\`.`
- `Do NOT mark this complete until ...`
- `Main agent orchestrates only.`
- `Fresh subagent per ...`
- `Do NOT print the full artifact in chat.`
- `Planning complete. Move to \`execution\` now?`

## Artifact Rules

- Keep workflow artifacts under `docs/propulsion/`.
- `exploration` writes `docs/propulsion/{yyyymmdd}-{feature-name}/prd.md`.
- `planning` writes `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md`.
- `debugging` writes `docs/propulsion/{yyyymmdd}-{feature-name}/debug.md` for non-trivial investigations.
- Add collision suffixes like `-2`, `-3` when needed.
- If a skill requires a fixed document shape, provide a reference template.
- Keep PRDs and plans on disk. Do not paste full workflow artifacts into chat.

## References Rules

Use `references/` for detail, not for gates.

- Put templates, formats, examples, and deeper heuristics in `references/`.
- Mention critical references inside the ordered instructions.
- Keep references focused and single-purpose.
- Do not hide approval gates, stop conditions, or next-skill routing in references.

## Author Checklist

Use this before finalizing a skill.

- [ ] The skill names the exact legal prerequisite skill, if any.
- [ ] The skill names the exact legal next skill, if any.
- [ ] The skill states what artifact must exist or be written.
- [ ] The skill states whether explicit user approval or a visible transition prompt is required.
- [ ] The skill states what the agent must do if inputs are missing.
- [ ] The skill uses strong explicit wording, not implied behavior.
- [ ] The skill keeps long detail in `references/`.
- [ ] The skill conforms to `agentic-skills`.

## Workflow-Specific Decisions

These decisions came from real usage. Keep them unless the workflow changes.

- `exploration` MUST question relentlessly before writing `prd.md`.
- `exploration` MUST scan the repo first, then use fresh subagents whenever code can answer the next branch.
- `exploration` MUST ask one question per message, with the recommendation first.
- `exploration` MUST walk a fixed decision-tree order and close every blocking branch before writing `prd.md`.
- `exploration` MUST decompose oversized requests and explore only the first slice or subsystem.
- `exploration` MUST ask the user to switch to build mode if it needs to write `prd.md` and cannot write files.
- `planning` MUST re-scan the repo before slicing.
- `planning` MUST use thin vertical slices.
- `planning` MUST start every `plan.md` with a short `## For Agentic Coders` section that points to `execution`.
- `planning` SHOULD use per-slice acceptance criteria checkboxes instead of a generic verification line.
- `planning` SHOULD use `Likely areas` rather than exact file paths unless exact paths are durable and important.
- `planning` MUST use a fresh plan-review subagent and iterate until review returns `clear`.
- If planning review finds missing product intent, scope, UX, or success criteria, `planning` MUST route back to `exploration`.
- `debugging` MUST use ordered phases and an iron law: no fixes before root-cause investigation.
- `debugging` SHOULD write `debug.md` for non-trivial investigations and may hand off concise grounded output for trivial bugs.
- `debugging` MUST stop after 3 failed hypotheses or probes and question the architecture with the user.
- `debugging` subagents are for evidence and code facts only. They do not propose fixes or reroute workflow.
- `execution` MUST run slices sequentially by default. Parallel slices require explicit independence in `plan.md`.
- `execution` MUST use `tdd` for behavior changes.
- `execution` MUST require `review`, `review-response`, and re-review until `clear` before marking a slice complete.
- Only the main agent may update `plan.md`.
- `execution` MUST stop on blockers instead of skipping ahead.
- `execution` MUST run the repo's real final checks before claiming the plan complete.
- `tdd` MUST enforce one behavior, one failing test, one minimal fix at a time.
- `tdd` MUST test public behavior through public interfaces.
- `tdd` MUST stop if the new test does not fail for the expected reason.
- `tdd` MUST refactor only while green.
- `review` MUST return `clear`, `findings`, or `unclear` only.
- `review` MUST surface real issues only and run in a fresh subagent.
- `review-response` MUST classify every finding before coding.
- `review-response` MUST use `tdd` for bug-fix or behavior-changing findings.
- `review-response` MUST push back on invalid findings with evidence.
- `review-response` MUST resolve unclear findings before coding.
- `review-response` MUST request a fresh `review` after changes.
- `workflow` MUST load a Propulsion skill before any response or action when one applies.
- `workflow` MUST announce the active skill and major stage transitions.
- `workflow` MUST keep major stage prompts user-facing: `exploration` -> `planning`, `planning` -> `execution`, `debugging` -> `planning`.
- `workflow` MUST NOT allow subagents to reroute stages.
- `workflow` MUST NOT keep a direct-handling bypass for coding work.

## Notes For Future Updates

- Tighten wording before adding more wording.
- If an agent skipped a step in real usage, add a harder gate instead of a longer explanation.
- If a rule matters to workflow correctness, put it in the skill body.
- If a skill can exit in more than one direction, make each branch explicit.
