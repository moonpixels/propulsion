---
name: create-tickets
description: Creates verified native tracker items from an approved feature specification and solution design. Use when a feature needs implementation-ready, dependency-aware tickets.
metadata:
    invocation: user
disable-model-invocation: true
---

# Create Tickets

Turns one approved feature into the smallest coherent set of implementation-ready work in the project's configured task-management tool. **Vertical slicing** keeps each item end to end, while selected **Example Mapping** and **Specification by Example** techniques turn approved rules and examples into observable acceptance evidence.

## Prerequisites

Require the approved feature specification and its approved solution design. Inspect both before continuing. When either document is missing, inadequate, or contradictory in a way that prevents honest decomposition, identify the exact gap and stop. Route missing observable intent to a later `$specify-feature` session and missing technical resolution to a later `$design-feature` session; do not invoke either or manufacture its outcome.

Require the project's task-management tool to be named in the root `AGENTS.md`. When the preference is absent, ask the user directly which tool the project uses, invoke `$maintain-agents` with the confirmed preference, verify the root instruction, and resume. Never guess a tool or add a Propulsion manifest, adapter, configuration, or state model. When the configured tool or required account is unavailable or not writable, stop with the exact access or connection needed rather than falling back to Markdown or another tracker.

## Process

### 1. Fix the authorities and native surface

Inspect the request, repository guidance, approved specification and solution design, their linked product, context, architecture, ADR, and research authorities, and only the implementation evidence needed to understand existing work. Treat the specification as authority for observable intent, the solution design as authority for the selected implementation and genuine technical prerequisites, and the task-management tool as authority for live work state. Discover obvious facts before asking the user.

Inspect the configured tool's available schema and capabilities before planning any mutation: native item types, bodies, links, parent or grouping concepts, dependency direction, duplicate or related relationships, and read-back operations. Use only concepts the tool actually supports. Keep the tracker read-only through proposal confirmation.

The source authorities, tracker scope, native capabilities, and access boundary are explicit.

### 2. Reconcile existing work

Read the relevant open and closed tracker state before decomposing. Search by authoritative document links or identifiers, feature and outcome language, affected project concepts, and related or parent items. Classify candidates as exact matches, partial overlaps, related work, or unrelated work. Reuse an exact match, propose a bounded reconciliation for a partial overlap, preserve merely related work, and avoid creating a second representation of the same outcome.

Record the classification and evidence internally. Do not copy live tracker state into repository documentation. The later proposal can distinguish create, update, relationship-only, and no-op reuse actions without inventing a parallel backlog.

The decomposition starts from a current, duplicate-aware view of native work.

### 3. Form vertical outcomes

Build an internal two-way coverage map from every material specification behaviour, rule, state, scenario, constraint, and acceptance condition, plus every necessary solution responsibility, transition, and verification seam, to proposed tracker outcomes. Each outcome must trace back to an approved source, and every approved requirement necessary to deliver the feature must have an owner.

Form the smallest set of coherent vertical outcomes. Each item spans every affected layer needed to produce one observable result for an actor, consumer, published contract, migration, or operational boundary. Include a shared enabling change in the earliest outcome that needs it unless the approved solution establishes a separately observable and independently verifiable prerequisite. Do not split work by frontend, backend, database, service, class, file, architecture layer, test type, or another implementation inventory merely because those parts exist. One item is correct when the feature is already one bounded independently implementable outcome.

For each item, define a concise native title, one coherent outcome, enough bounded specification and solution context for a separate implementation session, links to both authoritative feature documents, observable acceptance evidence, and applicable relationships. Derive acceptance evidence from approved rules and discriminating examples; use a concrete example only when it separates valid from invalid behaviour or exposes a consequential branch. State outcomes at stable observable boundaries without prescribing test implementation.

Check each item directly for independent value, bounded size, and testability. Minimise coupling between items while representing unavoidable prerequisites honestly. Infer a blocker only when the approved solution or required state transition establishes that one outcome cannot begin or complete before another; do not convert user-journey order, convenient sequencing, or tracker display order into dependency. Interpret the configured tool's relationship direction explicitly and reject cycles.

When a question exposes missing feature intent or technical design, stop with the owning source gap. Invoke `$elicit` only when the approved authorities support more than one materially different decomposition and the user must choose among them. Supply the evidence and alternatives, let it ask one question at a time, and use its confirmed decision while retaining proposal, tracker mutation, verification, and stopping ownership.

The draft items are vertically coherent, source-complete, independently actionable where possible, and linked only by genuine acyclic prerequisites.

### 4. Challenge and propose the set

Trace every proposed item back to its approved need and every approved need forward to exactly the necessary items. Remove unapproved scope, duplicated outcomes, speculative abstractions, horizontal work, incidental dependencies, and detail that belongs only in code. Confirm that an implementation agent could complete each item in one bounded session without rediscovering feature intent or selecting a missing technical design.

Repeat the live duplicate search using the final titles, outcomes, authority links, and concepts. Reconcile the result into one complete proposal containing every native create, update, relationship-only, and no-op reuse action; the exact item contents; relationship types and directions; and any native capability limitation or residual mismatch. Do not include estimates, priorities, sprint or cycle assignments, milestones, target dates, releases, implementation sequencing beyond genuine blockers, or speculative future work.

Present the complete proposal for explicit user confirmation. Selecting an earlier decomposition option is not confirmation of the full set. If the user rejects or revises it, keep the tracker unchanged, reopen every affected coverage, slicing, relationship, and reconciliation decision, repeat the duplicate search, and present the complete revised proposal. The confirmed proposal supplies authority for exactly its agreed tracker mutations without another application question.

The user and agent share one exact, duplicate-aware mutation plan.

### 5. Apply the confirmed work

Immediately before writing, refresh every matching candidate and affected relationship. If concurrent change materially alters the confirmed create, update, no-op, or dependency plan, make no tracker mutation and return to complete-proposal confirmation. Otherwise use the configured tool's native operations to create, update, and link exactly the agreed items. Preserve unrelated content and fields on reused items. Use native idempotency, duplicate, parent, related, and blocking concepts where available; never silently substitute a different meaning when a capability is absent.

Create in dependency-safe order only where the tool requires identifiers before relationships. Agreement authorises the confirmed writes; do not ask whether to apply them again and do not extend the mutation to convenient adjacent work.

The configured tracker contains exactly the agreed native representation or an explicitly surfaced tool limitation.

### 6. Read back, verify, and stop

Read every created or updated item and every affected relationship back from the tool. Compare titles, outcomes, bounded context, authoritative links, acceptance evidence, relationship types and directions, and create, update, or reuse disposition with the confirmed proposal. Correct an in-scope discrepancy when the agreed value and affected record are unambiguous; stop and report a mismatch when correction would require a new user decision, unsupported capability, or mutation of unrelated work.

Repeat the relevant duplicate search and verify two-way source coverage, vertical coherence, independent actionability, observable completion, genuine acyclic blockers, and preservation of unrelated native state. Report exact item links, created, updated, related, and reused records, verification performed, unsupported capabilities, concurrent-state or duplicate uncertainty, and unresolved source limitations.

Stop after the native items and relationships are read back and verified. Do not change product, feature, solution, architecture, or context documents; select or schedule an iteration; estimate or prioritise work; scaffold or implement code; commit or publish changes; release; or deploy.
