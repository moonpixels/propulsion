# Plan Template

Write `docs/propulsion/{yyyymmdd}-{feature-name}/plan.md` using this exact section order.

```md
# <Feature Title> Plan

> Source PRD: `docs/propulsion/.../prd.md`

Use the `execute` skill to implement this plan and track progress using the checkboxes.

## Durable Decisions

List decisions that apply globally across all phases.

- Decision 1
- Decision 2

## Relevant Skills

List every agentic skill that may be needed while implementing this plan.

| Skill          | Required For     | Details                                    |
| -------------- | ---------------- | ------------------------------------------ |
| `<skill-name>` | Phase 1, Phase 3 | Declares how UI components should be used. |

## Requirements Coverage Matrix

Every PRD user story, functional requirement, and non-functional requirement MUST be represented here.

Use exact IDs from the PRD. Do NOT rename, merge, or invent IDs.

| PRD ID  | Type                       | Covered By Phase(s) | Covered By Acceptance Criteria | Notes |
| ------- | -------------------------- | ------------------- | ------------------------------ | ----- |
| US-001  | User Story                 | Phase 1             | AC-001, AC-002                 |       |
| FR-001  | Functional Requirement     | Phase 1             | AC-001                         |       |
| NFR-001 | Non-Functional Requirement | Phase 1             | AC-002                         |       |

## Phase 1: <Short Vertical Slice Title>

**Status**: [ ] Phase complete

**Goal**: Describe the narrow end-to-end behaviour this phase implements. The goal MUST describe a complete user-visible, system-visible, or test-verifiable outcome.

**Demo / Verification Outcome**: Describe exactly how someone can verify this phase is complete without inspecting implementation details.

**Skills To Load**:

| Skill          | Why This Phase Needs It |
| -------------- | ----------------------- |
| `<skill-name>` | `<specific reason>`     |

**Likely Areas**:

Use exact file paths only when they are durable and important. Prefer directories or modules when exact files may change.

- `src/...`
- `tests/...`

**Constraints**:

List the durable constraints this phase MUST respect.

- Constraint 1
- Constraint 2

**Implementation Notes**:

Provide enough implementation context that a subagent can start work without rediscovering scope. Do NOT invent product decisions that are absent from the PRD.

- Note 1
- Note 2

**Acceptance Criteria**:

Each acceptance criterion MUST reference at least one PRD user story, functional requirement, or non-functional requirement unless the criterion is purely functional and no NFR applies.

| ID     | Acceptance Criterion                                         | User Story ID(s) | Functional Requirement ID(s) | Non-Functional Requirement ID(s) |
| ------ | ------------------------------------------------------------ | ---------------- | ---------------------------- | -------------------------------- |
| AC-001 | Given <context>, when <action>, then <observable outcome>.   | US-001           | FR-001                       | NFR-001                          |
| AC-002 | Given <edge case>, when <action>, then <expected behaviour>. | US-001           | FR-002                       | NFR-002                          |
| AC-003 | <actor> can <behaviour> <condition>.                         | US-001           | FR-001, FR-002               | NFR-001                          |

**Testing Plan**:

Describe the public behaviours and seams that MUST be tested for this phase.

| Test Level            | Required Coverage |
| --------------------- | ----------------- |
| Unit                  |                   |
| Feature / Integration |                   |
| Browser / UI          |                   |
| Regression            |                   |
| Manual Verification   |                   |
```

## Rules

These rules are MANDATORY.

- MUST decompose the approved PRD into thin vertical slices (tracer bullets).
- Each phase MUST cut through every integration layer needed for that behaviour.
- PREFER many thin vertical phases over few thick phases.
- ONLY identify skills relevant to each phase by their description, DO NOT load the skills now.
- ENSURE every PRD user story, functional requirement, and non-functional requirement is covered in the Requirements Coverage Matrix.
- NEVER invent product decisions, business rules, UX behaviour, or edge-case handling not present in the approved PRD.
- EVERY acceptance criterion MUST have a unique ID.
