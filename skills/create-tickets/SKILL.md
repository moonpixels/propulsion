---
name: create-tickets
description: Creates implementation-ready tickets from approved work. Use when a complete work definition needs vertical decomposition in the project's configured ticket system.
metadata:
    type: performer
disable-model-invocation: true
---

# Create Tickets

Turns one **approved work definition** into a confirmed, verified set of small vertical tickets. A work definition may be a document or confirmed conversation whose outcome, scope, behaviour or obligations, material constraints, and solution decisions are complete enough to decompose without invention.

## Prerequisites

Read the root `AGENTS.md` for an explicit ticket destination such as `The project uses Linear for tickets.` or `The project uses local Markdown for tickets.` When absent, ask the user which destination the project uses, invoke `$maintain-agents` with the answer, and resume from its result. For an external destination, require its installed integration and writable account; otherwise stop with the exact access needed. Never guess or silently fall back.

## Process

### 1. Establish the work and destination

Use the already-loaded root guidance. Inspect the request, approved work definition, and only the additional linked product, context, decision, research, and current-system evidence needed to understand the work. Treat the definition as authority for intended outcomes and settled constraints, and the repository as evidence of the current system.

For an external destination, inspect its native item, body, status, estimate, parent, dependency, and read-back capabilities before planning writes. For local Markdown, use one file per ticket under `docs/features/<work-slug>/tickets/`.

### 2. Agree the vertical ticket set

Map every material requirement, obligation, constraint, solution responsibility, transition, and acceptance boundary in both directions between the work definition and proposed tickets. Form the smallest coherent set in which each ticket delivers one observable outcome or fulfilled contract across every layer it needs. Absorb shared setup into the earliest outcome that needs it. Create separate enabling, migration, or refactor work only when it has an independently necessary, verifiable boundary or preserves a valid compatible intermediate state.

Size each ticket for one fresh implementation session. Load the [Estimation Reference](assets/estimation-reference.md), assign the lowest defensible **complexity** bucket from `1`, `2`, `3`, `5`, or `8`, and use sibling comparison only as a consistency check. Split any outcome that would exceed `8`, then estimate the resulting slices again.

Add a blocker only when one ticket cannot honestly begin or meet acceptance before another reaches its accepted outcome. Keep display order, likely sequence, user-journey order, and merely related work out of the dependency graph. State dependency direction explicitly and reject cycles.

Present only a compact numbered proposal containing each ticket's stable title, vertical outcome, complexity, and `Blocked by` references. Invoke `$elicit-with-context` when supported alternatives require a user decomposition decision. Iterate the compact set until the user confirms the whole proposal; do not synthesize full bodies first. Confirmation authorises the agreed synthesis and writes without another application prompt. If synthesis exposes a material gap, leave the destination unchanged and reopen the affected proposal.

### 3. Synthesize and write the tickets

Use the [Ticket Template](assets/ticket-template.md) as the minimum semantic body, omitting only inapplicable conditional content. Embed the necessary confirmed intent and solution context when no durable authority exists; never tell a fresh implementation agent to recover an unavailable conversation. Explain what must be delivered at stable boundaries without prescribing files, classes, framework wiring, code, or an exhaustive test inventory.

For local Markdown, allocate stable sequential identifiers such as `TKT-001`, use `<ticket-id>-<ticket-slug>.md`, set new tickets to `Todo`, and write reciprocal `Blocked by` and `Blocks` references. The local status vocabulary is `Todo`, `In Progress`, `Done`, and `Cancelled`.

For an external destination, use the closest established initial native status and map complexity, blocker, blocked, and parent meanings to exact native fields when available. When an exact capability is absent, retain the meaning explicitly in the body and surface the limitation; never substitute a different relation. Do not set priority, assignee, sprint or cycle, milestone, release, or dates unless the approved definition or user supplies them.

Create and relate exactly the confirmed set.

### 4. Read back, verify, and stop

Read every created ticket and relationship back from its destination. Verify the confirmed titles, outcomes, authority or embedded context, requirements, applicable constraints, acceptance criteria, complexity values and ceiling, status, relationship meanings and directions, acyclic dependencies, resolved local references, and two-way work-definition coverage. Correct an exact in-scope discrepancy when the agreed value and target are unambiguous; otherwise stop with the mismatch and required decision or capability.

Return the created ticket links or local paths, verification performed, capability limitations, source limitations, and unresolved external state. Stop without changing the approved work definition, scheduling or prioritising work, implementing, committing, publishing, releasing, or deploying.
