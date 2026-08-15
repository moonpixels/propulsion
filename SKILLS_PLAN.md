# Propulsion skills plan

## Status

This is the authoritative implementation brief for the Propulsion lifecycle skill set. It fixes the intended outcomes, composition, boundaries and acceptance conditions without prescribing the finished wording or detailed process of each skill.

The existing suite may be changed or replaced where necessary. Skill authoring remains responsible for researching credible governing methodologies, allowing a methodology-free design when none fits, testing the common successful path and handling only material exceptions.

## Objective

Propulsion is a compact, composable set of Agent Skills for practical software delivery. It supports work from initial product discovery through feature definition, planning, backlog refinement, implementation, pull-request publication and review, debugging, incident response and retirement.

Propulsion is not a workflow platform. It does not carry a product automatically through its lifecycle, maintain its own work state or require a setup framework. A user may enter at any point where the necessary inputs already exist and leave when that session's outcome is complete.

## Design principles

1. **One bounded session outcome.** Each lifecycle skill represents a natural working session and ends with one independently useful outcome.
2. **Narrow progressively.** Product intent narrows into a feature specification, solution design, implementation-ready tickets and, finally, one implemented body of work.
3. **Enter proportionately.** Substantial work uses the complete applicable chain. Small, understood work may begin directly with implementation.
4. **Compose within the requested outcome.** A skill may invoke another skill when its outcome is required to complete the requested session. It must not silently advance into a later lifecycle outcome.
5. **Keep authorities separate.** Product documents own intent, code and tests own implemented behaviour, Git owns change history and the task-management tool owns work state.
6. **Document what cannot be inferred safely.** Durable documents preserve intent, language, constraints and rationale without copying observable code, configuration, CI or tracker state.
7. **Use native project tools.** Propulsion does not introduce a manifest, tracker adapter, lifecycle state model or completion-horizon schema.
8. **Treat agreement as authority.** Invoking a skill authorises the mutations intrinsic to its agreed outcome. Questions resolve the outcome; they are not followed by a redundant application gate.
9. **Make quality evidence cumulative.** Implementation satisfies project checks and adds proportionate evidence without weakening existing constraints or installing unrelated infrastructure merely to make a check available.
10. **Keep the public surface clear.** Lifecycle skills are the primary entry points. Reusable utilities remain independently useful and may be composed where their explicit trigger applies.

## Lifecycle coverage

| Area | Purpose |
| --- | --- |
| Establish | Create the durable product and technical foundations for a new or existing system. |
| Define | Turn one product capability or enhancement into an approved statement of intended behaviour. |
| Plan | Select a buildable solution and decompose it into implementation-ready work. |
| Refine | Keep incoming and existing work current, prioritised, ready and feasible for the next delivery period. |
| Deliver | Implement agreed work, record it, publish it for review and review work submitted by others. |
| Debug and Respond | Diagnose and repair defects, stabilise active incidents and learn from them afterwards. |
| Retire | Plan the safe removal of an obsolete capability and route its execution through normal delivery. |

These areas are entry points, not mandatory phase gates. Release, deployment and continuous production monitoring are outside Propulsion's core lifecycle.

## Session and authority model

Lifecycle skills are explicitly user-invokable. A lifecycle skill may call another lifecycle skill only when the subordinate outcome is necessary to finish the invoked session. For example, `pull-request` may call `commit` for eligible uncommitted work, while `create-tickets` must not silently manufacture a missing feature specification or solution design.

Reusable utilities are user-invokable and may be model-invoked when their documented trigger is present. A caller remains responsible for verifying the utility's result and completing its own outcome.

Invoking a skill grants authority for its expected repository and external mutations once the skill has reached shared understanding. Material product, architecture, priority or scope questions remain with the user, but an agreed decision does not require a second permission prompt before it is applied. Work outside the invoked outcome remains unauthorised.

Every skill:

1. Inspects the request, repository guidance, existing artefacts and available tools before asking questions.
2. Reuses current authoritative inputs rather than recreating earlier lifecycle work.
3. Invokes required and triggered supporting skills.
4. Persists its outcome in the owning document or system.
5. Verifies the resulting artefact or external state.
6. Stops at its stated boundary and identifies the next available session without starting it automatically.

## Documentation and tool authorities

### Living project foundations

| Authority | Owns |
| --- | --- |
| `PRODUCT.md` | Product purpose, users, needs, value, outcomes, boundaries, journeys and high-level capability catalogue. |
| `CONTEXT.md` | Canonical project terms and their concise project-specific meanings. |
| `ARCHITECTURE.md` | Enduring architecture drivers, system context, responsibilities, technology strategy, data ownership, integrations and cross-cutting technical constraints. |

`CONTEXT.md` remains live throughout the lifecycle. Any skill that establishes or changes consequential domain language invokes `maintain-context` inline.

Architecture documentation records boundaries, constraints and rationale that cannot be inferred reliably. It does not mirror classes, files, framework wiring, executable configuration or other implementation detail. Focused ADRs are created only when a consequential or surprising decision needs durable rationale beyond `ARCHITECTURE.md`.

### Feature records

A substantial feature uses the project convention where one exists, otherwise:

```text
docs/features/<feature-slug>/
├── specification.md
└── solution-design.md
```

The feature specification owns externally observable intent and constraints. The solution design owns the selected system-specific implementation. A useful test is whether a statement would remain true if the feature were rebuilt using a different architecture: if so, it normally belongs in the specification.

Small, understood changes do not require feature documents merely to enter implementation.

### Bounded supporting records

Research reports, architecture reviews, incident reviews and retirement plans are repository artefacts only when their conclusions and rationale need to survive the session. They must not duplicate live operational, tracker or implementation state.

### Task-management tool

The project's task-management tool must be named in `AGENTS.md`. A tracker-backed skill that cannot find this preference asks the user which tool the project uses, invokes `maintain-agents` to record it and then resumes its original outcome.

The skill uses the selected tool's native issues, relationships, statuses, priorities, sprints, cycles, milestones or queues. If the named tool is unavailable or not writable, the skill stops with the exact access requirement. It does not guess or fall back silently to Markdown or another tracker.

## Lifecycle skill catalogue

### Establish

#### `define-product`

- **Outcome:** A user-confirmed product foundation broad enough to guide later feature definition without becoming a roadmap or delivery plan.
- **Inputs:** The product idea, existing `PRODUCT.md` and `CONTEXT.md`, representative repository evidence and applicable external evidence.
- **Output:** `PRODUCT.md` and the corresponding ubiquitous language in `CONTEXT.md`.
- **Composition:** Requires `elicit` and `maintain-context`; conditionally invokes `research` and `prototype`.
- **Stops:** After product purpose, users, needs, value, outcomes, boundaries, journeys and high-level capabilities are documented. It does not define technical architecture, detailed features, priorities or tickets.

#### `define-architecture`

- **Outcome:** A user-confirmed technical foundation capable of constraining later feature solutions without duplicating the implementation.
- **Inputs:** `PRODUCT.md`, `CONTEXT.md`, existing system evidence and material technical, organisational or regulatory constraints.
- **Output:** `ARCHITECTURE.md` and any warranted focused ADRs.
- **Composition:** Requires `elicit` and `modular-design`; conditionally invokes `research`, `prototype` and `maintain-context`.
- **Stops:** After the system context, principal boundaries, ownership, technology strategy, data, integrations and cross-cutting quality approach are established. It does not scaffold the system or create implementation work.

### Define

#### `specify-feature`

- **Outcome:** One approved feature or enhancement expressed as externally observable intent.
- **Inputs:** A capability from `PRODUCT.md`, an already-elicited conversation or another agreed feature idea, plus `CONTEXT.md`, relevant current behaviour and supporting evidence.
- **Output:** `docs/features/<feature-slug>/specification.md`, or the project's equivalent.
- **Composition:** Requires `elicit` and `maintain-context`; conditionally invokes `research` and `prototype`.
- **Stops:** After the problem, actors, behaviour, rules, states, scenarios, acceptance conditions, constraints and exclusions are unambiguous. It does not select the implementation or create tickets.

### Plan

#### `design-feature`

- **Outcome:** An approved, buildable technical solution for one feature specification.
- **Inputs:** The approved feature specification, `ARCHITECTURE.md`, `CONTEXT.md`, applicable ADRs and current implementation evidence.
- **Output:** `docs/features/<feature-slug>/solution-design.md` and any warranted ADRs.
- **Composition:** Requires `modular-design`; conditionally invokes `elicit`, `research`, `prototype` and `maintain-context`.
- **Stops:** After affected boundaries, interfaces, data, integrations, security, migration, operational effects and verification seams are resolved. It does not decompose or implement the work.

#### `create-tickets`

- **Outcome:** An approved feature is represented by implementation-ready, dependency-aware work in the project's task-management tool.
- **Inputs:** The approved feature specification and solution design, plus relevant project guidance and current tracker state.
- **Output:** Native tracker items linked to their authoritative feature documents, each describing one coherent vertical outcome, acceptance evidence and genuine blocking relationships.
- **Composition:** Conditionally invokes `elicit` for unresolved decomposition and `maintain-agents` when the task-management preference is missing.
- **Stops:** After the created items and relationships are read back and verified. It does not select an iteration or begin implementation.

### Refine

#### `triage-work`

- **Outcome:** Each incoming request in scope is closed with an evidence-backed reason or routed to the appropriate lifecycle area.
- **Inputs:** The selected incoming items, their source evidence, current product and implementation authorities and the configured task-management tool.
- **Output:** Verified native dispositions, classifications, links and next routes.
- **Composition:** Conditionally invokes `elicit`, `research`, `maintain-context` and `maintain-agents`.
- **Stops:** After disposition. It does not perform feature specification, debugging, implementation, retirement planning or incident response.

#### `refine-backlog`

- **Outcome:** The selected backlog is current, prioritised and honest about scope, readiness, dependencies and blockers.
- **Inputs:** A bounded backlog view, its linked authorities, current project direction and native tracker relationships.
- **Output:** Verified updates, splits, closures, dependencies, priorities and readiness represented in the task-management tool.
- **Composition:** Conditionally invokes `elicit` for unresolved readiness, scope or priority decisions and `maintain-agents` when the task-management preference is missing.
- **Stops:** After backlog health and ordering are current. It does not commit the project to a sprint, cycle, milestone or implementation sequence.

#### `plan-iteration`

- **Outcome:** A feasible body of ready, unblocked work is selected for the project's next delivery period.
- **Inputs:** The refined backlog, current priorities, dependencies, available capacity and the project's native planning mechanism.
- **Output:** A verified sprint, cycle, milestone or ordered next-work queue in the task-management tool.
- **Composition:** Conditionally invokes `elicit` for selection trade-offs and `maintain-agents` when the task-management preference is missing.
- **Stops:** After the selected body of work is recorded. It does not implement any item.

#### `review-architecture`

- **Outcome:** A bounded, evidence-backed assessment identifies a small number of high-value architecture or maintainability improvements.
- **Inputs:** An explicitly scoped codebase area, `ARCHITECTURE.md`, `CONTEXT.md`, applicable ADRs and current implementation evidence.
- **Output:** An independently useful architecture review report with prioritised findings, evidence, benefits and trade-offs.
- **Composition:** Requires `modular-design`; conditionally invokes `research`.
- **Stops:** After reporting. It does not refactor the code or create speculative tickets automatically.

### Deliver

#### `implement`

- **Outcome:** One ticket or small agreed body of work exists as a minimal, verified local change.
- **Inputs:** The stated ticket or confirmed work, linked product and technical authorities, repository guidance and current code.
- **Output:** Working code, tests and other in-scope artefacts with reproducible verification and no unresolved required review finding.
- **Composition:** Requires `verify-change` and independent `code-review`; conditionally invokes `elicit`, `research`, `prototype`, `modular-design`, `tdd` and `maintain-context`.
- **Stops:** After the agreed behaviour is implemented and verified. It does not commit or publish the change.

#### `commit`

- **Outcome:** Eligible reviewed work is recorded in one or more coherent Conventional Commits.
- **Inputs:** The current Git state, repository guidance, recent history and any user-supplied scope.
- **Output:** Verified atomic commits that preserve unrelated staged, unstaged and untracked work.
- **Composition:** No required utility.
- **Stops:** After reporting created commits and remaining work. It does not push or create a pull request.

#### `pull-request`

- **Outcome:** The current branch and its complete committed work are represented by one accurate pull request.
- **Inputs:** The current branch, its base, full branch history, repository guidance and any existing pull request.
- **Output:** A pushed branch and created or updated pull request whose title and body describe the whole branch.
- **Composition:** Conditionally invokes `commit` when eligible uncommitted work remains.
- **Stops:** When the published head, base, content and review state are verified. It does not merge, release or deploy the work.

#### `review-pull-request`

- **Outcome:** Someone else's pinned pull request receives an independent, evidence-backed assessment.
- **Inputs:** The complete pull-request change, originating specification or work item, repository standards and relevant product and technical authorities.
- **Output:** Prioritised findings covering behavioural conformance, regressions, minimality, conventions, maintainability, architecture and verification evidence.
- **Composition:** Requires `verify-change` and `code-review`; conditionally invokes `modular-design` and `research`.
- **Stops:** After reporting findings. It does not change the contributor's branch or publish comments, approvals or requested changes unless the user's invocation includes that outcome.

### Debug and Respond

#### `debug`

- **Outcome:** A defect has an evidence-backed root cause and, when authorised by the requested outcome, a minimal verified repair.
- **Inputs:** Expected and observed behaviour, the failing signal, relevant environment evidence and current implementation authorities.
- **Output:** A reproducible diagnosis and, for repair work, regression protection plus a reviewed local change.
- **Composition:** Repair requires `verify-change` and `code-review`; conditionally invokes `research`, `prototype`, `modular-design`, `tdd` and `maintain-context`.
- **Stops:** At the diagnosis boundary when requested, otherwise after the original failure and regression evidence verify the repair. It does not commit or publish the change.

#### `respond-to-incident`

- **Outcome:** An active production incident is understood sufficiently to stabilise service safely and verify the resulting service state.
- **Inputs:** The incident signal, production evidence, affected systems, available operational controls and current communications.
- **Output:** A verified mitigation or recovery, concise timeline, current impact and explicit unresolved risks or follow-up needs in the owning incident system.
- **Composition:** Conditionally invokes `debug`, `verify-change` and `research` when they are necessary to stabilise the incident.
- **Stops:** When service is stable or the exact external blocker is established. It does not perform the later learning review.

#### `review-incident`

- **Outcome:** A stabilised incident produces a blameless, evidence-based explanation and owned follow-up work.
- **Inputs:** The incident timeline, technical and operational evidence, mitigations, communications and current product and architecture context.
- **Output:** A durable incident review and verified follow-up items routed into the normal lifecycle.
- **Composition:** Conditionally invokes `research`, `maintain-context` and `maintain-agents` when tracker-backed follow-up work lacks a configured task-management preference.
- **Stops:** After learning and follow-up ownership are recorded. It does not implement the resulting changes.

### Retire

#### `plan-retirement`

- **Outcome:** An obsolete capability has an approved plan for safe retirement.
- **Inputs:** The capability, product intent, users, dependencies, interfaces, data, integrations, support obligations and current implementation evidence.
- **Output:** A retirement plan covering deprecation, migration, communication, removal, archival, access, recovery and observable completion conditions.
- **Composition:** Requires `elicit`; conditionally invokes `research` and `maintain-context`.
- **Stops:** After the retirement outcome and obligations are approved. Execution returns to `create-tickets`, `implement`, `commit` and `pull-request` in later sessions.

## Reusable utility catalogue

| Utility | Independently useful outcome |
| --- | --- |
| `elicit` | Resolves dependency-ordered material information and user decisions one question at a time until shared understanding is confirmed. |
| `research` | Answers a material question using high-trust evidence and creates a cited report when the conclusion must survive the session. |
| `prototype` | Creates a deliberately disposable experiment or mock-up to resolve one bounded uncertainty and preserves its conclusion. |
| `maintain-context` | Keeps `CONTEXT.md` aligned inline with confirmed ubiquitous language. |
| `modular-design` | Applies evidence-backed modularity, information hiding, cohesion, coupling and maintainability principles to a scoped design decision. |
| `tdd` | Drives red-green-refactor through a stable observable boundary and runnable test suite. |
| `verify-change` | Selects and executes the applicable project and risk-triggered quality harnesses and reports reproducible evidence and limitations. |
| `code-review` | Independently assesses a scoped change for required behaviour, regressions, minimality, conventions, maintainability, code smells and architecture. |
| `maintain-agents` | Records confirmed, non-inferable repository-wide agent guidance while keeping permanent context lean. |

`write-skill` remains a separate suite-development tool. It is not presented as part of the software-delivery lifecycle.

## Quality model

### Research prerequisite

Before finalising `implement`, `tdd`, `verify-change` or `code-review`, conduct focused research using primary technical sources, established standards and credible field practices. Persist one cited report that establishes:

- a small universal quality baseline
- selection triggers for additional harnesses
- what each harness can and cannot demonstrate
- ways metrics and tests can be gamed
- how executable evidence and engineering judgement complement each other
- how to report incomplete confidence when required infrastructure is absent

The research evaluates practices used successfully in real projects without turning every available harness into mandatory ceremony.

### Verification portfolio

`verify-change` discovers the repository's existing commands, tests, CI-equivalent checks and QA procedures, then selects the applicable portfolio for the changed behaviour and risk. The portfolio may include:

- unit, acceptance, integration, contract and system tests
- executable business examples such as Gherkin where they improve precision
- static types, linting, formatting and framework diagnostics
- coverage analysis and mutation testing
- security, accessibility, performance, compatibility and resilience checks
- reproducible manual or specialist QA procedures

The repository's existing constraints remain authoritative. A skill may strengthen evidence for the current change but must not weaken or skip required checks silently.

When an existing project cannot support meaningful verification, the skill reports the limitation and recommends explicit planned work. It does not install a project-wide test framework or quality tool merely to satisfy its own process. New projects establish required infrastructure through their architecture and initial delivery tickets.

### Maintainability judgement

Passing checks does not prove that a change is well designed. `code-review` and `modular-design` also require the implementation to:

- contain only the behaviour and code needed for the agreed outcome
- follow the language, framework and repository conventions
- reuse established helpers and abstractions where they fit
- avoid duplication, speculative generality and recognised code smells
- preserve or improve information hiding and module boundaries
- remain understandable and economical to change

Review findings are corrected through the relevant implementation and verification loop until no required finding remains unresolved.

## Representative flows

### Establish a product

```text
define-product
    → later define-architecture
```

Product and architecture planning are separate sessions and stop after their respective documents.

### Deliver a substantial feature

```text
specify-feature
    → later design-feature
    → later create-tickets
    → implement each selected ticket in a separate session
    → commit whenever a coherent unit is ready
    → pull-request when the branch is ready for human review
```

### Deliver a small understood change

```text
elicit when needed
    → implement
    → commit
    → pull-request
```

### Refine team work

```text
triage-work
    → refine-backlog
    → plan-iteration when the project uses a delivery period
```

The skills may be invoked independently. Triage may route a valid defect directly to `debug` or a new capability to `specify-feature`.

### Debug a known defect

```text
debug
    → commit
    → pull-request
```

### Respond to an incident

```text
respond-to-incident
    → later review-incident
    → follow-up work enters Define, Plan, Refine or Deliver
```

### Retire a capability

```text
plan-retirement
    → later create-tickets
    → normal implementation and publication sessions
```

### Review another contributor's work

```text
review-pull-request
```

The author's normal flow does not invoke `review-pull-request`; `implement` already includes independent change review.

## Implementation order

1. Complete the quality-harness research and use its conclusions to fix the engineering-quality utility contracts.
2. Align the shared utilities: `elicit`, `research`, `prototype`, `maintain-context`, `modular-design`, `tdd`, `verify-change`, `code-review` and `maintain-agents`.
3. Build the progressive foundation path: `define-product`, `define-architecture`, `specify-feature`, `design-feature` and `create-tickets`.
4. Build the delivery path: `implement`, `commit`, `pull-request` and `review-pull-request`.
5. Build recurring team workflows: `triage-work`, `refine-backlog`, `plan-iteration` and `review-architecture`.
6. Build the exceptional paths: `debug`, `respond-to-incident`, `review-incident` and `plan-retirement`.
7. Remove `elicit-with-context`, update the README around the lifecycle areas and independently invokable utilities, and run the suite-wide acceptance pass.

### Implementation checklist

- [x] Complete quality-harness research
- [x] Update `elicit` skill
- [x] Update `research` skill
- [ ] Create `prototype` skill
- [ ] Update `maintain-context` skill
- [ ] Update `modular-design` skill
- [ ] Update `tdd` skill
- [ ] Create `verify-change` skill
- [ ] Update `code-review` skill
- [ ] Update `maintain-agents` skill
- [ ] Update `define-product` skill
- [ ] Create `define-architecture` skill
- [ ] Create `specify-feature` skill
- [ ] Create `design-feature` skill
- [ ] Create `create-tickets` skill
- [ ] Update `implement` skill
- [ ] Update `commit` skill
- [ ] Replace `pr` with `pull-request`
- [ ] Create `review-pull-request` skill
- [ ] Create `triage-work` skill
- [ ] Create `refine-backlog` skill
- [ ] Create `plan-iteration` skill
- [ ] Update `review-architecture` skill
- [ ] Update `debug` skill
- [ ] Create `respond-to-incident` skill
- [ ] Create `review-incident` skill
- [ ] Create `plan-retirement` skill
- [ ] Delete `elicit-with-context` skill
- [ ] Update the README
- [ ] Run the suite-wide acceptance pass

Each skill is authored and forward-tested as one coherent work unit. The rewrite branch may contain incomplete groups during development, but the public cutover occurs only when the final catalogue composes coherently and replaces obsolete guidance.

## Acceptance conditions

The revised suite is ready when:

- every common lifecycle task has one obvious user-facing entry point
- every lifecycle skill produces one bounded outcome and stops at its documented boundary
- substantial work narrows cleanly from product foundation through specification, design, tickets and per-item implementation
- small, clear work can enter implementation without ceremonial documents or tickets
- required and conditional composition is explicit and does not duplicate supporting skill instructions
- task-management skills use the project tool named in `AGENTS.md` and its native concepts without Propulsion configuration
- documentation preserves enduring intent without copying observable implementation or live tool state
- implementation always completes applicable verification and independent review
- absent quality infrastructure is reported honestly and never causes unrelated tooling to be installed implicitly
- external mutations remain within the outcome authorised by the invoked skill and are read back after application
- release, deployment and continuous monitoring remain outside the suite
- each skill passes a fresh-agent common-path test and every material permission, missing-input and stopping boundary identified during authoring
- representative cross-session flows pass without transcript dependency or an orchestrating lifecycle skill
- `bun run checks` and `git diff --check` pass

## Explicit non-goals

Propulsion will not:

- provide a lifecycle navigator or end-to-end delivery orchestrator
- require a Propulsion manifest, setup skill, state model, completion horizon or tracker adapter
- impose Scrum, sprints or another project-management method
- create separate skills for individual test types, metrics or quality commands
- require discovery, architecture or feature documents for small work that is already sufficiently understood
- duplicate code, CI, tracker or production state in prose documents
- release, deploy or continuously monitor software
- merge a pull request merely because it has been created or reviewed
- turn incident response and incident learning into one session
- perform retirement implementation or production decommissioning inside `plan-retirement`
