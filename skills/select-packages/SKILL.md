---
name: select-packages
description: Recommend packages when a common, reusable application capability could otherwise require meaningful bespoke code.
---

# Select packages

Delegate **read-only package selection** to a fresh agent. Return a succinct recommendation that avoids unnecessary owned code and dependency burden. Keep candidate research outside the caller's context.

If explicitly assigned as the selector, follow [candidate evaluation](references/selection.md) directly without further delegation.

## Inputs

Take the problem or feature, required behaviour and project constraints from the request or caller handoff. A known adequate project, framework or native capability needs no new search. Routine edits, trivial helpers and project-specific business rules usually do not warrant invocation.

## Method

1. **Brief fresh.** Give a fresh agent this skill's path, the requirement, relevant project paths, constraints and source access. Use fresh context rather than inheriting the conversation. Authorise only read-only inspection and browsing. Request the recommendation defined below, with no report or scratch files.
2. **Keep the boundary.** The selector owns discovery, evaluation and source verification. Relay material user-held questions through the caller. Continue independent work where possible, then wait for the result before dependent implementation.
3. **Check the handoff.** Require a clear recommendation tied to the requirement, with canonical links and any material limitation. Return unsupported claims or missing coverage to the selector. Leave installation, integration and behaviour verification to the caller.

## Finish

Return one short bullet per recommended package, with its name, canonical link and requirement-specific reason, or `No packages recommended.` with a brief reason. Add only material caveats or evidence gaps. Omit implementation instructions, supporting-link inventories, candidate catalogues and research narratives.

**Done only when** the fresh agent has completed candidate evaluation and returned a supported succinct recommendation, or identified the exact missing evidence or constraint preventing one. An incomplete search cannot establish that no suitable package exists.
