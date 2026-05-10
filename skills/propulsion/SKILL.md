---
name: propulsion
description: Execute structured AI software development from planning through execution. Use when implementing or updating code, debugging issues, or starting software work.
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

1. Determine whether the request is software work.
2. If it is not software work, ignore Propulsion and respond normally.
3. If it is a concrete failure, emit `Propulsion workflow enabled, routing to debug...`, then load and follow `debug` skill.
4. If it is feature or product-scope work, emit `Propulsion workflow enabled, routing to brainstorm...`, then load and follow `brainstorm` skill.
5. The loaded Propulsion skill now owns the workflow stage.

## Rules

These rules are MANDATORY.

- ALWAYS follow instructions in this order:
    1. User instructions are the highest priority (Direct requests or AGENTS.md, CLAUDE.md).
    2. Propulsion skills override default system behaviour.
    3. Default system behaviour is the lowest priority.
- NEVER route non-software-work request to Propulsion.
- ONLY route concrete failures to `debug` (bug reports, regressions, failing tests, failing builds, runtime errors, crashes).
- MUST route feature and product-scope work to `brainstorm` (new features, unclear scope, UX/product shaping, requirements discovery, behaviour changes, refactors, optimisations).
- ALWAYS fall back to `brainstorm` if the request is ambiguous.
- DO NOT leave a Propulsion skill until ALL completion gate items are complete.
- NEVER reload skills (Propulsion or non-Propulsion) that are already active or present in context; continue following the loaded copy instead.
- NEVER rationalise skipping Propulsion with thoughts like:
    - "I need more context first"
    - "I'll inspect the repo first"
    - "This is too small for Propulsion"

## Completion Gate

Do NOT leave this skill until ALL items are complete.

- [ ] Determined whether the request is software work.
- [ ] Kept non-software-work outside Propulsion.
- [ ] Routed concrete failures to `debug`.
- [ ] Routed feature and product-scope work to `brainstorm`.
- [ ] Emitted the route-specific required response before any other user-visible text.

## References

Use these references when you need detail.
