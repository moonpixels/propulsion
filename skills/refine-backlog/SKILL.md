---
name: refine-backlog
description: Refines a bounded software backlog into verified current, prioritised, and honestly ready native tracker work. Use for recurring backlog health and ordering sessions before iteration planning.
metadata:
    invocation: user
disable-model-invocation: true
---

# Refine Backlog

Keeps a selected backlog aligned, coherent, and usable for later delivery decisions without committing work to an iteration or manufacturing missing product or technical definition.

## Prerequisites

Require an explicitly bounded native backlog view or item set. Resolve only the selection when scope is unclear; do not inspect or mutate work outside it.

Require the project's task-management tool to be named in the root `AGENTS.md`. When the preference is absent, ask the user which tool the project uses, treat their answer as authority to record that confirmed preference, invoke `$maintain-agents`, verify the root instruction, and resume without a separate permission question. Never guess a tool or add a Propulsion manifest, adapter, configuration, or state model. When the configured tool, selected backlog, linked authority, or required read or write operation is unavailable, stop the affected work with the exact access, connection, or evidence needed rather than falling back to Markdown or another tracker.

## Process

### 1. Establish the refinement surface

Inspect the request, repository guidance, configured tool, bounded backlog, and current project direction before mutation. Inspect the tool's native item types, fields, statuses, priorities or ordering, parent and split concepts, duplicate and related relationships, blocker direction, readiness signals, and read-back capabilities. Use only meanings supported by the current project and tool; do not invent a universal workflow or Definition of Ready.

Read every selected item, its discussion and evidence, linked feature, product, solution, architecture, or other owning authorities, and its native relationships. Search relevant open and closed work for duplicates and overlap. Inspect only enough current product, documentation, code, tests, or operational evidence to judge whether the item remains current. Treat stale tracker text and reporter wording as claims rather than authority.

The bounded items, available native operations, current authorities, and access limits are explicit.

### 2. Assess every selected item

Assess each item against the evidence applicable to its lifecycle position:

- whether the work is still needed and aligned with current project direction;
- whether its scope expresses one coherent observable outcome;
- whether linked intent and technical design are sufficient for the next step it claims to be ready for;
- whether its acceptance evidence makes completion observable;
- whether its size and internal coherence support one bounded later session;
- whether it duplicates or overlaps existing work;
- whether dependencies and blockers are genuine, acyclic, and represented in the correct direction;
- how its priority compares with the other bounded work under the user's current product direction; and
- whether it is honestly ready for its next step using project-native evidence and fields, assessed separately from availability unless the project's native meaning explicitly includes blockers.

Do not derive priority from age, reporter urgency, effort, tracker order, or agent preference. Priority is a relative product decision owned by the user or another explicit project authority. Do not invent missing feature intent or technical design, estimates, acceptance evidence, or readiness claims. Identify the exact source gap, keep the item honestly not ready using a supported native representation, and route resolution to a later `$specify-feature`, `$design-feature`, or other owning session without invoking it. Preserve the distinction between an item that is sufficiently refined but blocked and one whose definition is incomplete; do not lower readiness merely to duplicate a separately represented blocker unless that is the project's confirmed native meaning.

Classify matching work as an exact duplicate, partial overlap, related work, or unrelated work from discriminating evidence. Split an existing overbroad implementation item only into coherent outcomes already authorised by its sources. When a feature-level placeholder links approved specification and solution work but has no implementation tickets, do not create children or otherwise perform its initial decomposition: leave that outcome to a later `$create-tickets` session. Renaming the proposed children does not make that decomposition refinement.

Every item has an evidence-led health assessment, relative-priority basis or open decision, and honest next-step readiness.

### 3. Form the complete proposal

Prepare the smallest native change set that makes the bounded backlog current. It may clarify an item, split supported scope, reconcile or close obsolete, duplicate, invalid, or fully superseded work with evidence, correct relationships and blocker directions, set an agreed native priority or order, and represent honest readiness. Preserve a no-op when current state already expresses the supported result.

Invoke `$elicit-with-context` only when a material scope, priority, or readiness decision depends on user-held knowledge or authority. Supply inspected evidence, viable options, and consequences; let it ask one question at a time and use only its confirmed synthesis. Retain responsibility for the complete proposal, mutation, verification, and stopping.

Recheck duplicates and affected relationships, then present one complete proposal containing every create, update, split, reconciliation, closure, link, priority, readiness, and no-op action; exact relationship meanings and directions; evidence-led reasons; later routes; and native capability limitations. Keep the tracker unchanged while decisions remain open. Obtain explicit user confirmation of the whole set. Selecting one earlier option is not confirmation. If the user rejects or revises any part, reopen every affected assessment and relationship, then present the complete revised set. Confirmation authorises exactly the agreed native mutations without another application prompt.

The user and agent share one exact, duplicate-aware refinement plan.

### 4. Refresh and apply the agreed changes

Immediately before writing, re-read every affected item, matching candidate, and relationship. When drift materially changes an agreed action, leave that item and its coupled mutations unchanged and return its complete revised proposal for confirmation. Continue only independent batch items whose agreed changes remain safe.

Apply only the confirmed native mutations and preserve unrelated content, discussion, fields, and metadata. Create only relationships required to express an evidenced split, reconciliation, duplicate, overlap, or genuine blocker; native parent or split structure does not also justify an incidental related link between siblings. Use a different supported native operation only when it preserves the exact confirmed meaning; otherwise leave that part unapplied and report the capability limit. Do not turn a convenient ordering preference into a blocker or extend the mutation to adjacent backlog work.

The configured tracker contains every still-valid agreed refinement or an explicit item-level blocker.

### 5. Read back and verify the backlog

Read every affected record and relationship back from the tool. Compare scope, observable outcome, authority links, acceptance evidence, state, priority or order, readiness, parent or split structure, duplicate disposition, and blocker type, target, and direction with the confirmed proposal. Correct an exact in-scope discrepancy when the agreed value and target are unambiguous; otherwise stop the affected item and report the mismatch.

Repeat the relevant duplicate and overlap search. Verify that each selected item is current, supported at its claimed lifecycle position, coherent, relatively prioritised where authority permits, honest about readiness, and connected only by genuine blockers. Verify closure reasons and preservation of unrelated native state. A blocked item does not erase verified independent progress.

The refined backlog and any partial completion are reproducibly verified in the owning tracker.

### 6. Report and stop before planning

Report each selected item with its native link, applied or no-op disposition, evidence basis, resulting priority and readiness, duplicates or overlap, dependencies and blockers, later owning route, read-back evidence, limitations, and unresolved decisions. Distinguish completed, blocked, drifted, and unchanged work.

Stop after backlog health and relative ordering are current and verified. Do not select or assign a sprint, cycle, milestone, iteration, release, or delivery body; establish implementation sequence beyond genuine blockers; invoke feature specification, solution design, or ticket creation; implement, debug, commit, publish, release, or deploy. Live backlog state remains in the configured tracker rather than a repository mirror.
