---
name: plan-iteration
description: Selects and records a feasible body of ready, unblocked work in the project's native planning mechanism. Use when planning the next delivery period or ordered next-work queue from a refined backlog.
metadata:
    invocation: user
disable-model-invocation: true
---

# Plan Iteration

Selects a coherent body of work that current evidence makes feasible for the project's next delivery period, then records and verifies that selection in the configured task-management tool. The result is a forecast of selected work, not a promise of completion or a release plan.

## Prerequisites

Require an explicitly bounded backlog whose candidate items have already been refined. An eligible item has observable bounded scope, a current priority, enough approved intent and technical direction for its next implementation step, and no unresolved blocker. Exclude an item that fails any condition, preserve the exact reason, and route it to a later `$refine-backlog` session; do not refine, estimate, split, or rescope it here.

Require the project's task-management tool to be named in the root `AGENTS.md`. When the preference is absent, ask the user which tool the project uses, invoke `$maintain-agents` with the confirmed preference, verify the root instruction, and resume. Never guess a tool or introduce a Propulsion manifest, adapter, configuration, or state model. When the configured tool, account, bounded backlog, or required read or write operation is unavailable, stop with the exact access or connection needed rather than falling back to Markdown or another tracker.

## Process

### 1. Establish the native planning surface

Inspect the request, repository guidance, bounded backlog, configured tool, and current planning state before proposing any mutation. Discover the tool's native sprint, cycle, milestone, or ordered-queue concepts; period identity and dates; membership and ordering; dependency direction; priority, readiness, sizing, capacity, and assignment fields; existing selections; and read-back operations. Use only concepts with the meanings established by the project and tool.

Determine the next planning horizon from project evidence or user authority. A formal-period project uses its established or explicitly confirmed native period. A project without a formal period uses only its existing native ordered next-work mechanism; tool support alone does not establish that the project uses sprints, cycles, or milestones. When neither a native period nor an ordered next-work mechanism can represent the outcome, report the capability gap and agree only a representation the configured tool actually supports. Do not create a repository mirror.

The planning horizon, native representation, existing membership, and capability limits are explicit.

### 2. Establish honest capacity and eligibility

Read current project-native evidence for the horizon: comparable historical throughput or sizing where it exists, current commitments, team availability, specialist constraints, dependency timing, operational load, and other work that consumes the same capacity. Never invent velocity, estimates, dates, availability, or precision, and do not treat points or item counts as interchangeable capacity unless the project's own evidence supports that use.

When evidence cannot resolve a material capacity, horizon, or trade-off decision, invoke `$elicit-with-context` with the evidence and viable consequences. Let it ask one user-authoritative question at a time and use only its confirmed synthesis; retain ownership of selection, mutation, verification, and stopping. State the weakest honest capacity bound when precise capacity is unavailable rather than manufacturing a number.

Refresh each candidate's observable scope, current priority, readiness for its next implementation step, dependencies, blockers, and current native state. Treat a relationship as blocking only when the dependency meaning and evidence show the item cannot begin or complete without it. Do not confuse preference, display order, or convenient sequence with a blocker. The eligible set, exclusions with reasons, and capacity assumptions and limitations are current and explicit.

### 3. Form one feasible selection

Consider eligible items in current priority order. Select a coherent body subject to the capacity evidence, whole-item fit, genuine dependencies, specialist availability, operational commitments, and material delivery risk. Include a prerequisite only when it is ready, necessary, and feasible in the same horizon; exclude work blocked by an external or out-of-horizon prerequisite.

Do not fill capacity automatically, add lower-priority work merely to maximise utilisation, or promise that selected work will finish. Preserve a high-priority item that does not fit as an exclusion rather than splitting, rescoping, or lowering its readiness standard. Keep intentionally unused capacity visible when uncertainty, operational load, item shape, or a constrained capability makes that the honest plan.

The proposed body is priority-led, dependency-valid, coherent, and feasible within the stated evidence without changing the backlog.

### 4. Confirm the complete native plan

Present one complete proposal containing the planning horizon, selected items, native membership and order, exclusions and reasons, included prerequisites, capacity evidence and assumptions, existing assignments or commitments being preserved, exact intended mutations, capability limitations, and residual feasibility risk. Keep the tracker unchanged while resolving material decisions.

Obtain explicit user confirmation of the complete proposal. If the user rejects or revises it, reopen every affected capacity, eligibility, dependency, coherence, ordering, and representation decision and present the complete revised proposal. Confirmation supplies authority for exactly the agreed native mutations without another application question.

The user and agent share one exact, feasible mutation plan.

### 5. Refresh and apply the agreed selection

Immediately before writing, re-read the target period or queue, every selected or displaced membership and order, relevant capacity state, priorities, readiness, blockers, and dependencies. When drift materially changes eligibility, feasibility, membership, order, or an agreed mutation, keep the affected state unchanged and return to complete-proposal confirmation. Preserve an independent agreed mutation only when the drift cannot affect its feasibility or meaning.

Apply exactly the confirmed native assignments, membership, and order. Preserve unrelated period, queue, backlog, field, relationship, and assignment state. Use the tool's native operations and meanings; when an agreed capability is unsupported, leave that part unapplied and report the limitation rather than simulating it with a misleading field, relationship, or prose record.

The configured tracker contains exactly the safely applicable agreed selection.

### 6. Read back, verify, and stop

Read back the target period or queue, selected membership and order, affected relationships and assignments, and every changed field. Compare them with the confirmed proposal and verify that selected items remain ready and unblocked, prerequisites and dependency directions are valid, capacity assumptions still hold within their stated precision, and unrelated native state was preserved. Correct an exact in-scope discrepancy when the agreed value and target are unambiguous; otherwise stop and report the mismatch or unsupported capability.

Report the verified native period or queue, selected and excluded items with reasons, applied and no-op mutations, capacity evidence and limitations, read-back evidence, unsupported capabilities, drift, and residual feasibility risk. Stop after the selected body is recorded and verified. Do not refine or estimate backlog work, change specifications or designs, create tickets, implement, commit, publish, release, or deploy.
