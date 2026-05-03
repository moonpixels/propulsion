---
name: propulsion-workflow
# prettier-ignore
description: Manage software-work request routing into Propulsion before any downstream stage is entered. Use when starting a session with software work.
---

# Using Propulsion Workflow

Use `propulsion-workflow` to route software-work requests into the right Propulsion entry stage before any other response or action.

<SUBAGENT_STOP>
If you were dispatched as a subagent to execute a specific task, SKIP THIS SKILL.
</SUBAGENT_STOP>

<EXTREMELY_IMPORTANT>
If the user request is software work, `propulsion-workflow` applies before any clarifying question, repo scan, external action, or downstream Propulsion stage.

If `propulsion-workflow` applies, you MUST route first. Do NOT reload `propulsion-workflow`. Do NOT skip it because the task looks small, obvious, or familiar.

ONCE YOU ARE FOLLOWING PROPULSION WORKFLOW, DO NOT LEAVE IT UNTIL COMPLETION. DO NOT SKIP STEPS. FOLLOW THE RULES OF EACH SKILL.
</EXTREMELY_IMPORTANT>

## Instruction Priority

1. User instructions, repository rules, and `AGENTS.md`
2. Propulsion skills
3. Default system behaviour

## Routing

Route concrete failures directly to the `debugging` skill. This includes bug reports, regressions, failing tests, failing builds, runtime errors, crashes, broken behaviour, and diagnosis requests.
Route feature and product-scope work to the `exploration` skill. This includes new features, unclear scope, UX/product shaping, requirements discovery, PRDs, and broad implementation requests.
For non-software-work requests, DO NOT use Propulsion. Respond normally.

## Required Response

For concrete failures using Propulsion workflow, emit this exact line before any other user-visible text:
`Propulsion workflow enabled, routing to debugging...`

For feature or product-scope work using Propulsion workflow, emit this exact line before any other user-visible text:
`Propulsion workflow enabled, routing to exploration...`

This signals to the user that Propulsion is handling their request and sets expectations for the next steps.

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Determine whether the request is software work.
2. If it is not software work, ignore Propulsion and respond normally.
3. If it is a concrete failure, choose `debugging` as the entry point.
4. If it is feature or product-scope work, choose `exploration` as the entry point.
5. Emit the route-specific required response before any other user-visible text.
6. Load the chosen skill immediately.
7. Stop routing. The loaded Propulsion skill now owns the workflow stage.

## Red Flags

- "I need more context first." False. Route first.
- "I'll inspect the repo first." False. Route first.
- "This is too small for Propulsion." False. Route first.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Determined whether the request is software work.
- [ ] Kept non-software-work chat outside Propulsion.
- [ ] Routed concrete failures to `debugging`.
- [ ] Routed feature and product-scope work to `exploration`.
- [ ] Emitted the route-specific required response before any other user-visible text.
- [ ] Loaded the chosen skill immediately.
