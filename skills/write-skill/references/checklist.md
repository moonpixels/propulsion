# Skill Checklist

Use this checklist before handing off a new or updated skill.

## Frontmatter

- [ ] `name` is lowercase with single hyphen separators.
- [ ] `name` is 1-64 characters.
- [ ] `name` matches the parent directory name.
- [ ] `name` matches `^[a-z0-9]+(-[a-z0-9]+)*$`.
- [ ] `description` is one line only.
- [ ] `description` is 200 characters or fewer to avoid validator warnings.
- [ ] `description` is 300 characters or fewer to avoid validator errors.
- [ ] `description` includes what the skill does.
- [ ] `description` includes `Use when`, `Use for`, or `Use to`.
- [ ] `description` front-loads the main use case and strongest trigger words because crowded skill lists can shorten descriptions.
- [ ] `description` includes natural trigger keywords a user would say.
- [ ] `description` is third person and action-oriented.
- [ ] `description` starts with a strong action verb such as Create, Validate, Review, Manage, or Execute.

## Artefact Layout

- [ ] Repository skill path defaults to `.agents/skills/{skill-name}/SKILL.md`.
- [ ] `SKILL.md` exists and contains required `name` and `description` frontmatter.
- [ ] `assets/` contains only reusable templates or static resources.
- [ ] `references/` contains detailed documentation, examples, rubrics, or checklists.
- [ ] `scripts/` contains only executable helpers and documents how to run them.
- [ ] Scripts are used only when deterministic behavior or external tooling is needed.
- [ ] Scripts are self-contained, dependency-light, and report actionable errors.
- [ ] Artefact files are directly under `assets/`, `references/`, or `scripts/`; no nested artefact directories or files exist.
- [ ] No unnecessary README, changelog, or duplicate auxiliary files were added.

## SKILL.md Body

- [ ] Includes a title and one-line purpose.
- [ ] Includes required `## Instructions` and `## References` sections.
- [ ] Uses only allowed H2 sections: `## Prerequisites`, `## Instructions`, `## Rules`, `## Completion Gate`, `## Next Steps`, `## References`.
- [ ] H2 sections follow the canonical order exactly when present.
- [ ] `## References` is the final H2 section.
- [ ] Each included H2 starts with its required intro sentence from the template; extra text may follow on the same line.
- [ ] Includes `## Prerequisites` when the skill can be invalid, blocked, or must route elsewhere.
- [ ] Includes `## Rules` when durable instructions must always apply.
- [ ] Includes `## Completion Gate` when explicit finish checks are needed.
- [ ] Includes `## Next Steps` when a handoff or post-completion route exists.
- [ ] Uses ordered steps for workflows that must run in sequence.
- [ ] Instructions name expected inputs, outputs, and artefacts when relevant.
- [ ] `## Rules` uses strong control words such as `MUST`, `DO NOT`, `NEVER`, `ONLY`, `STOP`, or `ALWAYS`.
- [ ] Body stays at or below 50 non-empty lines to avoid validator warnings.
- [ ] Body stays at or below 80 non-empty lines to avoid validator errors.

## Language Quality

- [ ] Removes filler words such as just, really, basically, actually, and simply.
- [ ] Removes pleasantries and chatty setup such as sure, certainly, happy to, and please.
- [ ] Removes hedging when the instruction is required, including likely, maybe, should probably, and may want to.
- [ ] Replaces verbose phrasing with short direct wording without changing the instruction.
- [ ] Preserves explicit technical meaning: commands, paths, APIs, error text, safety warnings, conditions, and ordering constraints stay exact.

## Progressive Disclosure

- [ ] Level 1 metadata is enough to decide whether to load the skill.
- [ ] Level 2 `SKILL.md` contains only essential workflow and durable rules.
- [ ] Level 3 artefacts hold examples, templates, explanations, and long checklists.
- [ ] All linked references resolve from `SKILL.md` using relative paths.
- [ ] Every `assets/`, `references/`, and `scripts/` artefact is linked from the final `## References` section.
- [ ] Reference bullets use exactly `- [path](path) - text`.
- [ ] Reference bullet link text matches the href exactly.
- [ ] Reference bullets include a short description after the separator in `- [path](path) - text`.
- [ ] No orphaned reference, asset, or script files exist.

## Validation

- [ ] Manually verify frontmatter, line count, links, and artefact placement.
- [ ] Run the dedicated validator with exactly one skill directory path.
- [ ] Do not pass validator options or a file path.
- [ ] Read validator output as JSON on both success and failure.
