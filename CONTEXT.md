# Propulsion

Propulsion is an agentic coding workflow composed of skills that steer a coding agent through repeatable engineering work.

## Language

**Predictability**:
The degree to which a skill makes the agent follow the same process on every run, without requiring the same output.
_Avoid_: Consistency, output determinism

**User-invoked skill**:
A skill the user selects explicitly. This is the default skill type in Propulsion.
_Avoid_: Manual skill, command

**Model-invoked skill**:
A skill the agent may select autonomously or invoke from another skill. Use this exception for skills expected to be invoked often enough that automatic discovery earns its permanent context cost.
_Avoid_: Automatic skill

**Invocation policy**:
Client-specific metadata within a skill bundle that controls whether an agent may select that skill implicitly. The same intent may require different policy fields in different clients.
_Avoid_: Invocation flag, frontmatter setting

**Skill-only distribution**:
Distributing Propulsion directly as Agent Skills, using the skills installer for remote sources and filesystem links for local sources. Propulsion does not require client-specific plugin packaging.
_Avoid_: Plugin distribution

**Elicitation**:
Requirements elicitation adapted to establish discoverable facts, resolve a dependency-ordered decision tree with the user, and confirm shared understanding before downstream action.
_Avoid_: Interrogation, clarification

**Theoretical saturation**:
The point at which further elicitation within the agreed scope reveals no new material decisions, allowing the shared understanding to be presented for confirmation.
_Avoid_: Question limit, exhaustive questioning

**Main success scenario**:
The representative invocation path that delivers a skill's intended outcome and remains dominant during design, refinement, and forward testing.
_Avoid_: Every possible path, exhaustive scenario set

**Material exception**:
A non-common path that earns explicit skill behaviour because representative evidence, the main success scenario, or a necessary safety or permission boundary requires it. Speculative variation remains agent judgement.
_Avoid_: Edge case, hypothetical branch

### Skill anatomy

**Authoring workflow**:
A skill that guides an agent through creating or updating another skill with an explicit process. It makes execution predictable without prescribing the authored skill's outcome.
_Avoid_: Design guide, skill reference

**Composable skill**:
An independently useful skill that may be invoked alone or coordinated by another skill without requiring the rest of a prescribed workflow.
_Avoid_: Workflow stage, mandatory step

**Router skill**:
A lightweight skill that invokes other skills to produce a combined outcome. It contains only coordination unique to that outcome; called skills remain authoritative and the router neither repeats nor overrides their context.
_Avoid_: Pipeline skill

**Implement skill**:
The user-invoked workflow that uses tracer bullets to deliver a clear implementation request in verified slices, applying TDD when appropriate. It remediates code-review findings until verified and elicits user intent when a finding would change behaviour, contracts, architecture, or scope.

**TDD skill**:
The model-invoked workflow that applies red-green-refactor when an existing runnable test suite can exercise the behaviour change through a stable public seam. It uses Test Desiderata to favour valuable tests that respond to behaviour without coupling to code structure.

**Code-review skill**:
The model-invoked workflow that assesses a scoped code change independently for requirements and code health, then reports evidence-validated findings including code smells and refactor opportunities without changing the code.
_Avoid_: Review skill

**Review-architecture skill**:
The user-invoked workflow that analyses a project's architecture and produces an HTML report of high-value, context-aware redesign opportunities without changing the implementation.
_Avoid_: Improve-architecture skill

**Architecture review report**:
A single-file interactive artifact named `docs/architecture/YYYYMMDD-{scope}-architecture-review.html` that guides the user through a small set of prioritised recommendations in concise plain language. It uses visualisation and progressive disclosure to explain affected architecture, expected improvements, evidence, and trade-offs without presenting a wall of technical detail. Verified CDN dependencies may supply scripts, styles, fonts, and diagram libraries.
_Avoid_: Static architecture audit

**Architecture module**:
A cohesive capability with a small explicit contract and a hidden implementation. Other modules depend on the contract rather than its internal classes, adapters, or framework wiring.
_Avoid_: Directory, namespace

**Deep module**:
An architecture module whose small, stable interface hides substantial cohesive implementation. The implementation may be decomposed into focused internal actions for reuse and maintainability without exposing that decomposition to consumers.
_Avoid_: Large class, shallow module

**Debug skill**:
The user-invoked workflow that reproduces a code issue, establishes its root cause, applies the smallest correction, and verifies the result. An explicit diagnosis-only request stops before mutation.
_Avoid_: Diagnose skill

**Maintain-agents skill**:
The user-invoked workflow that creates or aggressively compresses the root `AGENTS.md` into project-wide runtime guidance and one canonical completion check. It removes narrower workflows from permanent context and reports their appropriate destinations.

**Define-product skill**:
The user-invoked Product Vision Board workflow that composes contextual elicitation and conditional research to maintain an evidence-aware root `PRODUCT.md` and domain language in `CONTEXT.md`. It defines strategic direction and capabilities without becoming a roadmap or implementation plan.

**Primary source**:
Original high-trust evidence such as official documentation, source code, standards, publications, first-party APIs, or first-party data. Secondary sources may aid discovery but findings trace their claims back to primary evidence.
_Avoid_: Trusted write-up

**Research report**:
A cited Markdown snapshot named `docs/research/YYYYMMDD-{research-title}.md` that answers a research question from primary evidence and records its scope, findings, and unresolved limitations. Substantive re-research creates a linked superseding snapshot; minor corrections update the existing report and its metadata.
_Avoid_: Research answer

**Research skill**:
The model-invoked workflow that uses evidence synthesis to answer a scoped question from primary sources and writes a cited research report. It delegates source discovery, appraisal, and report writing to a background agent when available so the caller receives only the durable report and concise findings; other skills invoke it only when the evidence warrants that durable record.
_Avoid_: Web search

**Description**:
A concise statement of what a skill does and the conditions under which it should be invoked.
_Avoid_: Summary, tagline

**Skill name**:
A short command that states the skill's action and fits naturally into a user instruction. Prefer one imperative verb, then a short imperative phrase, with established nouns reserved for operations they already name clearly.
_Avoid_: Title, label

**Branch**:
A distinct route through a skill for a particular use case or condition. Branches share the skill's common process without duplicating it.
_Avoid_: Separate workflow, mode

**Process section**:
The required `## Process` section that contains a skill's instructions. It uses numbered subheadings only when order matters and descriptive subheadings or direct prose otherwise.
_Avoid_: Steps section, instructions section

**Leading word**:
A recognised term from an established method, principle, theory, or technique, specific enough to invoke the agent's existing knowledge without further explanation. A skill explains only its context-specific adaptation or constraints.
_Avoid_: Coined term, theme, slogan

**Governing methodology**:
An established methodology selected through research to determine a skill's process when one credibly fits. Research may conclude that none is suitable; a selected methodology appears by canonical name in the skill without source attribution.
_Avoid_: Core concept, main theme

**Supporting concept**:
An established principle, theory, or technique that reinforces the governing methodology for a distinct concern without competing with it.
_Avoid_: Secondary concept

**Skills plan**:
The self-contained high-level handoff for Propulsion's fixed v1 skill suite. It records suite principles, the skill catalogue and standard briefs, composition and invocation, implementation order, and acceptance criteria without carrying source citations, discarded scope, or finished skill instructions.
_Avoid_: Skill specification, backlog

**Lossless compression**:
Reducing a skill to the fewest words and structures that preserve its behaviour, conditions, constraints, and technical meaning.
_Avoid_: Trimming, shortening, minimalism

**Degrees of freedom**:
The amount of judgement a skill leaves to the agent. Match it to the work's fragility so the process is predictable without predetermining valid outcomes.
_Avoid_: Flexibility, strictness

**Ironic process theory**:
The tendency for a negated concept to become more salient. Skills state the positive target behaviour and pair an essential safety boundary with the safe action that satisfies it.
_Avoid_: Prohibition-only rule, negative prompting

**Prerequisite**:
A condition that must be true before a skill can begin. Its failure stops the skill or routes the work elsewhere.
_Avoid_: Setup step, pre-flight check

**Step**:
A numbered subheading used when actions within a process or branch must occur in order. It isolates one coherent behavioural concern, describes the action, and ends in an observable postcondition.
_Avoid_: Instruction, rule

**Postcondition**:
An observable state that marks a step complete without requiring a separate completion section.
_Avoid_: Completion criterion, completion gate

**Rule**:
A cross-cutting invariant that constrains multiple instructions or the finished output.
_Avoid_: Step, reminder

**Handoff**:
A transfer or route that becomes available after the skill's process is complete.
_Avoid_: Next step, final step

**Reference**:
Conditional or extensive runtime guidance linked once beside a precise loading condition. The agent loads it only when that branch or decision needs the additional depth.
_Avoid_: Background, resource

**Acceptance testing**:
A semantic validation that traces every elicited invocation through a finished skill's branches, resource pointers, and observable postconditions.
_Avoid_: Checklist, structural validation

**Characterization testing**:
Capturing an existing skill's observable invocation and process before improvement so intentional changes remain distinct from regressions.
_Avoid_: Snapshot, preservation rule
