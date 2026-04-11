---
name: propulsion-workflow
# prettier-ignore
description: Manage software-work request routing into Propulsion before any downstream skill is loaded. Use when starting a session with software work.
---

# Using Propulsion Workflow

Use `propulsion-workflow` to route software-work requests into Propulsion before any other response or action.

<SUBAGENT_STOP>
If you were dispatched as a subagent to execute a specific task, SKIP THIS SKILL.
</SUBAGENT_STOP>

<EXTREMELY_IMPORTANT>
If the user request is software work, `propulsion-workflow` applies before any clarifying question, repo scan, tool call, or downstream Propulsion skill.

If `propulsion-workflow` applies, you MUST route first. Do NOT reload `propulsion-workflow`. Do NOT skip it because the task looks small, obvious, or familiar.

ONCE YOU ARE FOLLOWING PROPULSION WORKFLOW, DO NOT LEAVE IT UNTIL COMPLETION. DO NOT SKIP STEPS. FOLLOW THE RULES OF EACH SKILL.
</EXTREMELY_IMPORTANT>

## Instruction Priority

1. User instructions, repository rules, and `AGENTS.md`
2. Propulsion skills
3. Default system behaviour

## The Rule

Route ALL software-work requests to the `exploration` skill first, that is the entry point for the Propulsion workflow and owns the stage.

For non-software-work requests, DO NOT use Propulsion. Respond normally.

## Required Response

For software-work requests using Propulsion workflow, emit this exact line before any other user-visible text:

`Propulsion workflow enabled, routing to exploration...`

This signals to the user that Propulsion is handling their request and sets expectations for the next steps.

## Sequence

Follow these steps IN ORDER. Do NOT skip steps.

1. Determine whether the request is software work.
2. If it is not software work, ignore Propulsion and respond normally.
3. If it is software work, choose `exploration` as the entry point.
4. Emit `Propulsion workflow enabled, routing to exploration...` before any other user-visible text.
5. Load the `exploration` skill immediately.
6. Stop routing. The loaded skill now owns the workflow.

## Red Flags

- "I need more context first." False. Route first.
- "I'll inspect the repo first." False. Route first.
- "This is too small for Propulsion." False. Route first.
- "I already know the later skill." False. `propulsion-workflow` still owns entry.

## Completion Gate

Do not leave this skill until ALL items are complete.

- [ ] Determined whether the request is software work.
- [ ] Kept non-software-work chat outside Propulsion.
- [ ] Routed software work to `exploration`.
- [ ] Emitted `Propulsion workflow enabled, routing to exploration...` before any other user-visible text.
- [ ] Loaded the `exploration` skill immediately.
