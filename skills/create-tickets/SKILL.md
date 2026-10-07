---
name: create-tickets
description: Plan and create small vertical implementation tickets when requested work needs an executable breakdown.
---

# Create tickets

Create a confirmed, verified set of **tracer-bullet vertical slices**. Each ticket must be executable in a fresh conversation from its body and accessible authorities.

## Inputs

Take the work from the request and its supplied context, including a specification or confirmed discussion. Read relevant project guidance, linked authorities and current-system evidence. Resolve missing content rather than require an earlier document. Read the ticket destination from root `AGENTS.md`. Resolve an absent destination through the active dialogue and invoke [$maintain-agents](../maintain-agents/SKILL.md) to record the answer.

## Method

1. **Resolve planning gaps.** Invoke [$elicit-with-context](../elicit-with-context/SKILL.md) for requirements exposed by decomposition, slice boundaries and dependencies. Inspect discoverable facts yourself and use [$research](../research/SKILL.md) when external evidence is needed. If new answers change a supplied specification, have the dialogue confirm the correction and update it before publishing dependent tickets.
2. **Slice complete outcomes.** Read [slicing guidance and examples](references/slicing.md) before decomposition. Account for every scoped requirement and acceptance boundary. Find the smallest coherent outcomes that can be demonstrated or verified through the layers they need. Carry required safeguards with the first affected slice. Split separable variants and merge fragments that supply no meaningful intermediate result. Use no estimates.
3. **Order the graph.** Add a hard dependency only for a predecessor outcome required to begin or accept the dependent ticket. Name that outcome. Reject cycles. Propose a topological order with blockers first, distinguishing recommended order from dependencies. Supply numbered titles, delivered outcomes and blockers to the active dialogue for breakdown confirmation.
4. **Make each ticket executable.** Invoke [$write-prose](../write-prose/SKILL.md) with the confirmed set, work definition and [ticket template](assets/ticket-template.md). Add concrete implementation and verification guidance for each slice. Separate fixed requirements from an adaptable implementation plan. Include useful verified entry points and commands, identifying planned structures as proposed. Link precise accessible authority or embed necessary confirmed context from the discussion. End every ticket with observable acceptance checkboxes.
5. **Publish and connect.** Read [destination guidance](references/destinations.md) for the selected destination before writes. Create exactly the agreed set in dependency order, then wire relationships using actual identifiers. When a specification exists, append or reconcile its bottom checklist of ordered ticket links. Initialise new checkboxes unchecked and preserve existing completion state.
6. **Read back and verify.** Read every saved ticket, relationship and specification checklist. Check faithful scope, complete requirement coverage, executable context, unchecked new acceptance, acyclic blockers and valid links. Repair unambiguous in-scope discrepancies.

## Finish

Return ordered ticket links, dependency and coverage checks, the specification checklist update and material limitations. Stop before implementation, scheduling, commits or deployment.

**Done only when** contextual elicitation is complete, every scoped requirement is covered, and all tickets, dependencies and applicable specification links are saved and verified. Missing decisions, access or failed writes leave dependent work incomplete.
