# Propulsion Skill Authoring

Use this document when creating or updating any Propulsion skill.

## Goal

Write skills that are explicit, strict, low-token, and hard to misread.

Propulsion skills are workflow contracts. Nothing important should be implied. State the exact prerequisite, exact artifact, exact stop condition, exact completion gate, and exact next skill by name.

## Core Rules

- Use exact supported skill names in backticks: `workflow`, `exploration`, `planning`, `execution`, `tdd`, `debugging`.
- State every stage boundary explicitly. Never imply what should happen next.
- Put critical gates in `SKILL.md`. Do not hide them only in `references/`.
- Prefer hard commands over soft guidance: `MUST`, `DO NOT`, `NEVER`, `ONLY`, `STOP`, `ALL`.
- Keep sentences short, imperative, and binary.
- Use subagents explicitly when the workflow depends on them.
- State what to do when prerequisites are missing. Usually: `STOP` and route to another skill by exact name.
- State what artifact must exist, where it lives, and whether explicit user approval or a visible user-facing transition prompt is required.
- Add a completion checklist. Do not let the skill exit without it.
- Start each major section with its standard intro line.
- Move explanation, examples, and long formats into `references/`.

## Tone

- Lead with imperatives.
- Prefer one instruction per line.
- Use CAPS only for control words.
- Avoid filler, motivation, and commentary.
- Avoid hedging like `prefer`, `usually`, `maybe`, unless the choice is genuinely optional.
- Avoid vague language like `continue if needed`, `consider`, `handle appropriately`, `similar to`, `etc.`.

## Required Shape

Every Propulsion `SKILL.md` except `workflow` MUST use this structure.

`workflow` is the only exception. It is an entry-only contract, not a standard stage skill.

```md
# Skill Name

One-line mission.

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- Requirement 1
- Requirement 2

If any prerequisite are false, STOP. Load `other-skill`.

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
- If implementation review returns findings during phase execution, keep the loop inside `execution` and send the findings back to the active implementer context.

Bad:

- Move to the next stage.
- Continue the workflow.
- Review if needed.

### References

Use this section as the exhaustive reference list for the skill.

Standard intro line:

- `Use these references when you need detail.`

## References Rules

Use `references/` for detail, not for gates.

- Put templates, formats, examples, and deeper heuristics in `references/`.
- Mention critical references inside the ordered instructions.
- Keep references focused and single-purpose. Consolidate tiny overlapping references when one stronger reference is clearer.
- Do not hide approval gates, stop conditions, or next-skill routing in references.

## Reference Shape

Use the same reference layout every time.

- Start with `# Title`.
- Follow with one line that says when to use the reference, for example `Use this reference ...` or `Use this template ...`.
- Put the actual template, format, heuristics, or examples next.
- End with `## Rules` and only the reference-local rules.
- For prompt templates, keep the full prompt in a fenced block and keep dispatch-only rules after the fence.

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
