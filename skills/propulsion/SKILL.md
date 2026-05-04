---
name: propulsion
# prettier-ignore
description: Manage software-work request routing into Propulsion before any downstream stage is entered. Use when starting a session with software work.
---

# Propulsion

Route software-work requests into the right Propulsion entry stage before any other action.

<SUBAGENT_STOP>
If you were dispatched as a subagent to execute a specific task, SKIP THIS SKILL.
</SUBAGENT_STOP>

<EXTREMELY_IMPORTANT>
ONCE YOU ARE FOLLOWING PROPULSION WORKFLOW, DO NOT LEAVE IT UNTIL COMPLETION. DO NOT SKIP STEPS. FOLLOW THE RULES OF EACH SKILL.
</EXTREMELY_IMPORTANT>

## Instructions

Follow these steps IN ORDER. Do NOT skip steps.

1. Determine whether the request is software work before clarifying questions, repo scans, external actions, or downstream Propulsion stages.
2. If it is not software work, ignore Propulsion and respond normally.
3. If it is a concrete failure, emit `Propulsion workflow enabled, routing to debug...`, then load and follow `debug` skill.
4. If it is feature or product-scope work, emit `Propulsion workflow enabled, routing to brainstorm...`, then load and follow `brainstorm` skill.
5. Stop routing. The loaded Propulsion skill now owns the workflow stage.

## Rules

These rules are MANDATORY.

- User instructions, repository rules, and `AGENTS.md` take priority, then Propulsion skills, then default system behaviour.
- Concrete failures route to `debug`: bug reports, regressions, failing tests, failing builds, runtime errors, crashes, broken behaviour, and diagnosis requests.
- Feature and product-scope work routes to `brainstorm`: new features, unclear scope, UX/product shaping, requirements discovery, PRDs, and broad implementation requests.
- If `propulsion` applies, route first. Do NOT reload `propulsion` or skip it because the task looks small, obvious, or familiar.
- Once following Propulsion workflow, DO NOT leave it until completion. ALWAYS follow the rules of each skill.
- ALWAYS route first. DO NOT rationalise skipping with thoughts like: "I need more context first", "I'll inspect the repo first", "This is too small for Propulsion". They are all FALSE.

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Determined whether the request is software work.
- [ ] Kept non-software-work chat outside Propulsion.
- [ ] Routed concrete failures to `debug`.
- [ ] Routed feature and product-scope work to `brainstorm`.
- [ ] Emitted the route-specific required response before any other user-visible text.
- [ ] Loaded the chosen skill immediately.

## References

Use these references when you need detail.
