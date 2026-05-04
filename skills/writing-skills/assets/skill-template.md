# Skill Authoring Template

Use this template for skills written to `.agents/skills/{skill-name}/SKILL.md` unless the user asks for another supported location.

```markdown
---
name: {skill-name}
description: {One-line action-oriented summary with the main use case and trigger words early}. Use when {specific trigger context}.
---

# {Skill Title}

{One-line purpose: what repeatable job this skill performs.}

## Prerequisites

ALL prerequisites MUST be true before following this skill.

- {Only include when the skill must stop, route, or require a condition before work starts.}

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. {First required action, including expected inputs when relevant.}
2. {Next required action, including expected outputs and artefacts when relevant.}
3. {Final action that completes the workflow.}

## Rules

These rules are MANDATORY.

- {Durable rule that must always apply, using control words like MUST, DO NOT, NEVER, ONLY, STOP, or ALWAYS.}

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] {Observable completion check.}

## Next Steps

Once the completion gate is fully checked:

- {Only include when the workflow must route or hand off after completion.}

## References

Use these references when you need detail.

- [references/{file}.md](references/{file}.md) - {Specific purpose.}
```

## Section Instructions

- `name`: use lowercase alphanumeric words joined by single hyphens; match the parent directory exactly.
- `name`: keep to 64 characters or fewer.
- `description`: keep one YAML line, action-oriented, third person, and triggerable with `Use when`, `Use for`, or `Use to`.
- `description`: put the main use case and strongest trigger words early because crowded skill lists can shorten descriptions.
- `description`: validator warns over 200 characters and errors over 300 characters.
- Title: use a short human-readable H1 that matches the workflow, not necessarily the exact `name`.
- One-line purpose: state the repeatable job and outcome in plain language.
- H2 sections must use this canonical order and no other H2 names: `## Prerequisites`, `## Instructions`, `## Rules`, `## Completion Gate`, `## Next Steps`, `## References`.
- `## Instructions` and `## References` are required.
- Each included H2 must start with its template intro sentence; extra text may follow on the same line.
- `## Instructions`: name expected inputs, outputs, and artefacts when they matter to the workflow.
- `## Prerequisites`: optional; include only when conditions can block, redirect, or define valid use.
- `## Rules`: optional; include when durable constraints must override improvisation; write rules with strong UPPERCASE control words like `MUST`, `DO NOT`, `NEVER`, `ONLY`, `STOP`, or `ALWAYS`.
- `## Completion Gate`: optional; include when the agent must verify explicit end-state checks before leaving.
- `## Next Steps`: optional; include only when a workflow handoff, routing choice, or post-completion action exists.
- `## References` must be the final H2.
- Reference bullets for artefacts must be exactly `- [path](path) - text`; link text must match href and the short description after the separator is required.
- Only links in the final `## References` section count for artefact coverage.

## Prose Style

- Write commands, not essays: use direct verbs like Load, Check, Run, Fix, Stop, or Return.
- Delete filler, pleasantries, hedging, and setup phrases such as just, really, basically, actually, simply, please, likely, may want to, and happy to.
- Prefer short concrete words over verbose phrasing: use fix instead of implement a solution for, use check instead of perform validation of.
- Keep exact technical meaning: preserve required keywords, file paths, commands, API names, error text, safety warnings, and ordering constraints.
- Use fragments when clear, but expand any sentence where compression could hide a condition, risk, or handoff.

## Artefact Placement

- `assets/`: templates, starter files, static examples, images, prompts, and other resources copied or adapted into outputs.
- `references/`: checklists, rubrics, explanations, examples, and long context that should not live in `SKILL.md`.
- `scripts/`: executable validation, generation, migration, or inspection helpers the agent can run.
- Prefer instructions over scripts unless deterministic behavior or external tooling is needed; scripts must be self-contained, dependency-light, and report actionable errors.
- Place artefact files directly under `assets/`, `references/`, or `scripts/`; nested directories or nested files are not allowed.

Keep `SKILL.md` around 50 body lines and under 80 body lines. Move detail here or into `references/` instead of expanding the main skill.

## Validator CLI

- Run as `bun scripts/validate-skill.js <skill-path>` from the skill directory, or `bun path/to/validate-skill.js <skill-path>` from elsewhere.
- The validator requires exactly one skill directory path, not a file path.
- The validator always writes JSON to stdout and exits non-zero when `valid` is `false`.
