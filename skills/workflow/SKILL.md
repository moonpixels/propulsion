---
name: workflow
# prettier-ignore
description: Manage software-work request routing into Propulsion before any downstream skill is loaded. Use when starting a session with software work.
---

# Using Propulsion Workflow

Use `workflow` to route software-work requests into Propulsion before any other response or action.

<SUBAGENT_STOP>
If you were dispatched as a subagent to execute a specific task, SKIP THIS SKILL.
</SUBAGENT_STOP>

<EXTREMELY_IMPORTANT>
If the user request is software work, `workflow` applies before any clarifying question, repo scan, tool call, or downstream Propulsion skill.

If `workflow` applies, you MUST route first. Do NOT reload `workflow`. Do NOT skip it because the task looks small, obvious, or familiar.

ONCE YOU ARE FOLLOWING PROPULSION WORKFLOW, DO NOT LEAVE IT UNTIL COMPLETION. DO NOT SKIP STEPS. FOLLOW THE RULES OF EACH SKILL.
</EXTREMELY_IMPORTANT>

## Instruction Priority

1. User instructions, repository rules, and `AGENTS.md`
2. Propulsion skills
3. Default system behaviour

After `workflow` selects the entry skill, that downstream skill owns the stage.

## The Rule

Route software-work requests only to `exploration` or `debugging`.

- Default entry route: `exploration`.
- Use `debugging` only for a pure bug, test-failure, or unexpected-behaviour request with no desired change.
- If the request includes a fix plus any desired behaviour change, enhancement, redesign, or new outcome, use `exploration`.
- If the request is vague, mixed, or not clearly pure bug-only investigation, use `exploration`.

For non-software-work requests, do not use Propulsion. Respond normally.

## Required Response

For software-work requests, emit this exact line before any other user-visible text:

`Propulsion workflow enabled, routing to <skill>...`

Replace `<skill>` only with `exploration` or `debugging`.

## Sequence

Follow these steps IN ORDER. Do NOT skip steps.

1. Determine whether the request is software work.
2. If it is not software work, respond normally.
3. If it is software work, choose `exploration` or `debugging` with the rules above.
4. Emit `Propulsion workflow enabled, routing to <skill>...` before any other user-visible text.
5. Load the chosen skill immediately.
6. Stop routing. The loaded skill now owns the workflow.

## Red Flags

- "I need more context first." False. Route first.
- "I'll inspect the repo first." False. Route first.
- "This is too small for Propulsion." False. Route first.
- "I already know the later skill." False. `workflow` still owns entry.

## Completion Gate

Do not leave this skill until ALL items are complete.

- [ ] Determined whether the request is software work.
- [ ] Kept non-software-work chat outside Propulsion.
- [ ] Routed software work only to `exploration` or `debugging`.
- [ ] Emitted `Propulsion workflow enabled, routing to <skill>...` before any other user-visible text.
- [ ] Loaded the selected entry skill immediately.
- [ ] Used `exploration` unless the request was pure bug-only investigation with no desired change.
