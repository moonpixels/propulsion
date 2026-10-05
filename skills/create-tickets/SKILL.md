---
name: create-tickets
description: Create confirmed implementation-ready vertical tickets from an approved work definition in the project's configured ticket destination.
---

# Create tickets

Turn approved work into a confirmed, verified set of small vertical tickets. Each ticket must be executable in a fresh implementation session without inventing product behaviour or material solution decisions.

## Inputs

Use the approved document or confirmed conversation, root `AGENTS.md`, relevant linked authorities, and current-system evidence. The definition must settle outcome, scope, behaviour or obligations, constraints, and material solution choices.

Find an explicit ticket destination in root guidance. If absent, ask which destination the project uses, invoke `$maintain-agents` with the answer, and resume from its result. For an external destination, require its installed integration and writable account. Report exact missing access rather than guessing or silently falling back.

## Method

1. **Inspect destination capabilities.** For an external system, establish its item, body, initial status, estimate, parent, dependency, and read-back capabilities before writes. For local Markdown, use one file per ticket under `docs/features/<work-slug>/tickets/`.
2. **Decompose complete outcomes.** Account for every material requirement, obligation, constraint, responsibility, transition, and acceptance boundary in both directions between definition and tickets. Each ticket delivers one observable outcome or fulfilled contract through the layers it needs. Absorb shared setup into the earliest outcome needing it. Separate enabling, migration, or refactor work only when it has an independently necessary verifiable boundary or preserves a compatible intermediate state.
3. **Size and relate the set.** Use the estimation reference for complexity buckets `1`, `2`, `3`, `5`, and `8`. Choose the lowest defensible bucket; split work above `8`. Add a blocker only when another ticket's accepted outcome is necessary to begin or meet acceptance. Distinguish display order from dependencies, state direction, and reject cycles.
4. **Confirm the proposal.** Present compact numbered titles, vertical outcomes, complexity, and `Blocked by` references. Invoke `$elicit-with-context` for material decomposition decisions. Obtain confirmation of the whole set before writing ticket bodies. Existing confirmation of that exact set suffices. Confirmation authorises synthesis and writes without another prompt. If synthesis reveals a material gap, leave the destination unchanged and reopen the affected proposal.
5. **Write the agreed tickets.** Invoke `$write-prose` for the ticket bodies, supplying the confirmed set, approved definition, human and agent implementer audience, destination constraints, and the template's semantic body. Link durable authority or embed necessary confirmed intent and solution context when no durable source exists. A fresh implementer must not depend on an unavailable conversation. Describe stable outcomes and contracts rather than files, classes, wiring, code, or exhaustive tests.
6. **Apply destination semantics.** For local files, allocate stable sequential IDs such as `TKT-001`, use `<ticket-id>-<ticket-slug>.md`, initialise `Todo`, and write reciprocal `Blocked by` and `Blocks` references. Local statuses are `Todo`, `In Progress`, `Done`, and `Cancelled`. For an external system, map to exact native fields and initial status where available. If a capability is absent, preserve its meaning in the body and report the limitation rather than substituting another relationship. Create and relate exactly the confirmed set. Set priority, assignee, cycle, milestone, release, or dates only when supplied by the user or approved definition.

## Conditional resources

- Read [the estimation reference](references/estimation.md) when sizing the proposed outcomes.
- Use [the ticket template](assets/ticket-template.md) when writing agreed ticket bodies, omitting inapplicable conditional content.

## Finish

Read every created ticket and relationship back from its destination. Check agreed titles, outcomes, authority or embedded context, requirements, constraints, observable acceptance, complexity, status, relationship direction, acyclic dependencies, local links, and two-way definition coverage. Correct an unambiguous in-scope discrepancy; otherwise report the mismatch and needed decision or capability. After an unknown external write outcome, inspect destination state before retrying to avoid duplicates.

Return ticket links or paths, verification, capability and source limitations, and unresolved external state. Stop before changing the work definition, scheduling, prioritising, implementation, commits, releases, or deployment.
