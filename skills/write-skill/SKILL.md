---
name: write-skill
description: Create or improve reusable skills with compact progressive-disclosure artefacts. Use when authoring, updating, or migrating any skill.
---

# Write Skill

Create concise skills that package repeatable workflows without bloating context.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Load `interrogate` skill to gather the skill's job, concrete use cases, expected inputs, expected outputs, and trigger phrases before drafting.
2. Choose the default output path `.agents/skills/{skill-name}/`; keep `name` equal to the directory name.
3. Draft or update `SKILL.md` with the required shape in [assets/skill-template.md](assets/skill-template.md).
4. Put only essential workflow in `SKILL.md`; move supporting artefacts into appropriate directories.
5. Put reusable templates or static resources in `assets/`, executable helpers in `scripts/`, and detailed docs in `references/`.
6. Validate the result with [scripts/validate-skill.js](scripts/validate-skill.js), then fix every blocking issue.

## Rules

These rules are MANDATORY.

- Required authored-skill sections are title, one-line purpose, `## Instructions`, and `## References`.
- Optional sections become REQUIRED when prerequisites, durable rules, completion gates, or next steps exist.
- MUST use only canonical H2 sections in order; `## References` must be the final H2.
- MUST keep `SKILL.md` compact: target about 50 body lines and never exceed 80 body lines.
- MUST make `description` one line, triggerable, and clear about when the skill should be used.
- MUST place artefacts directly under `assets/`, `references/`, or `scripts/` and link each from final references as `- [path](path) - text`.
- MUST use progressive disclosure: metadata first, essential instructions second, artefacts only when needed.
- MUST write short, direct, instructional prose: remove filler, pleasantries, hedging, and verbose phrases while preserving exact technical meaning.
- MUST review [references/checklist.md](references/checklist.md) and run [scripts/validate-skill.js](scripts/validate-skill.js) before handoff.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Skill path and frontmatter name match.
- [ ] Used `interrogate` skill to resolve the skill job, use cases, expected inputs, expected outputs, and trigger phrases before drafting.
- [ ] `SKILL.md` contains only essential workflow and required sections.
- [ ] Skill wording is concise, no-fluff, and technically precise.
- [ ] Supporting artefacts are placed under `assets/`, `references/`, or `scripts/` by purpose.
- [ ] Checklist review is complete with blocking issues fixed.
- [ ] Validator has been run against the skill and all errors are fixed.

## References

Use these references when you need detail.

- [assets/skill-template.md](assets/skill-template.md) - Section-by-section authoring template.
- [references/checklist.md](references/checklist.md) - Skill quality and validation checklist.
- [scripts/validate-skill.js](scripts/validate-skill.js) - Bun validator for skill metadata, body limits, and artefacts.
