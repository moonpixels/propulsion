---
name: discover-project
description: Create root project briefs for greenfield products and system blueprints. Use when starting project discovery, positioning, competitor research, or full project definition.
---

# Discover Project

Turn a rough software idea into an approved root `project-brief.md` for later Propulsion PRDs.

## Prerequisites

ALL prerequisites MUST be satisfied BEFORE following this skill.

- If an approved target-root `project-brief.md` already exists, STOP. Ask which feature should enter `brainstorm`.
- If current external evidence is required and browsing is unavailable, STOP. Ask the user to enable browsing or provide sources.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Resolve the target project root; default to the current workspace root unless the user names another path.
2. Load `interrogate` and close every discovery decision using [references/discovery-checklist.md](references/discovery-checklist.md).
3. Gather problem, users, business model, explicit user-chosen stack, features, MVP boundary, risks, and success metrics.
4. Research competitors, alternatives, market, and positioning claims when they need current evidence.
5. Write `<target-project-root>/project-brief.md` from [references/project-brief-template.md](references/project-brief-template.md).
6. Sanity-check the brief against the conversation, research, and repo context. Remove contradictions, placeholders, and unanswered questions.
7. Start a fresh project brief reviewer subagent with [references/project-brief-reviewer-prompt.md](references/project-brief-reviewer-prompt.md).
8. Fix reviewer findings, then repeat step 7 until the latest review returns exact `Status: approved`.
9. Ask the user to review and approve `project-brief.md`.
10. After user approval, update `<target-project-root>/project-brief.md` metadata to `Status: Approved` and set `Last reviewed` to the approval date.

## Rules

These rules are MANDATORY.

- ALWAYS use `interrogate` before writing the brief.
- MUST keep asking until there are no open questions in the approved brief.
- MUST separate sourced evidence from inference and include research dates and confidence.
- MUST use current web evidence for competitor, market, positioning, or similar external claims.
- MUST include monetisation or business model, with explicit `N/A` allowed.
- MUST record explicit user-chosen architecture, language, framework, storage, deployment, and integrations.
- MUST include a full feature inventory grouped by product area with MVP, later, and suggested PRD slices.
- USE `Status: approved` as the ONLY valid project brief reviewer approval signal.
- MUST block user approval and repeat review when reviewer status is rejected, missing, or unclear.
- DO NOT decide detailed UI style beyond minimal platform or UI-presence context; defer UI style to feature PRDs.
- DO NOT write `plan.md`; discovery output is root `project-brief.md` only.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Target project root is resolved.
- [ ] Interrogation closed every discovery question.
- [ ] Current evidence supports all competitor, market, and positioning claims.
- [ ] Root `project-brief.md` is written and cross-checked.
- [ ] Project brief reviewer returned exact `Status: approved`.
- [ ] User explicitly approved `project-brief.md`.
- [ ] Approved `project-brief.md` metadata was written with `Status: Approved` and `Last reviewed` set to the approval date.

## Next Steps

Once the completion gate is fully checked:

- STOP after approved metadata is written. Do not enter `brainstorm` until the user chooses a feature for PRD work.

## References

Use these references when you need detail.

- [references/discovery-checklist.md](references/discovery-checklist.md) - Required discovery decision tree.
- [references/project-brief-template.md](references/project-brief-template.md) - Root project brief structure.
- [references/project-brief-reviewer-prompt.md](references/project-brief-reviewer-prompt.md) - Project brief reviewer subagent prompt.
