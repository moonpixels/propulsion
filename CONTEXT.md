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
The point at which further elicitation reveals no new material branches, allowing the complete shared understanding to be presented for confirmation.
_Avoid_: Question limit, exhaustive questioning

### Skill anatomy

**Authoring workflow**:
A skill that guides an agent through creating, reviewing, or improving another skill with an explicit process. It makes execution predictable without prescribing the authored skill's outcome.
_Avoid_: Design guide, skill reference

**Composable skill**:
An independently useful skill that may be invoked alone or coordinated by another skill without requiring the rest of a prescribed workflow.
_Avoid_: Workflow stage, mandatory step

**Implement skill**:
The user-invoked workflow that uses tracer bullets to deliver a clear implementation request in verified slices, applying TDD when appropriate. It remediates review findings until verified and elicits user intent when a finding would change behaviour, contracts, architecture, or scope.

**TDD skill**:
The model-invoked workflow that applies red-green-refactor to behaviour changes when the repository has a runnable test suite. It uses Test Desiderata to favour valuable tests that respond to behaviour without coupling to code structure.

**Review skill**:
The model-invoked workflow that assesses a scoped code change independently for requirements and code health, then reports evidence-validated findings including code smells and refactor opportunities without changing the code.

**Description**:
A concise statement of what a skill does and the conditions under which it should be invoked.
_Avoid_: Summary, tagline

**Skill name**:
A short command that states the skill's action and fits naturally into a user instruction. Prefer one imperative verb, then a short imperative phrase, with established nouns reserved for operations they already name clearly.
_Avoid_: Title, label

**Branch**:
A distinct route through a skill for a particular use case or condition. Branches share the skill's common process without duplicating it.
_Avoid_: Separate workflow, mode

**Leading word**:
A recognised term from an established method, principle, theory, or technique, specific enough to invoke the agent's existing knowledge without further explanation. A skill explains only its context-specific adaptation or constraints.
_Avoid_: Coined term, theme, slogan

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
An action the agent performs as part of the skill, ordered when sequence matters and ended by an observable postcondition.
_Avoid_: Instruction, rule

**Postcondition**:
An observable state that marks a step complete without requiring a separate completion section.
_Avoid_: Completion criterion, completion gate

**Rule**:
A cross-cutting invariant that constrains multiple steps or the finished output.
_Avoid_: Step, reminder

**Handoff**:
A transfer or route that becomes available after the skill's steps are complete.
_Avoid_: Next step, final step

**Reference**:
Focused supporting documentation linked once beside the condition that requires it and loaded only when that branch is reached.
_Avoid_: Background, resource

**Acceptance testing**:
A semantic validation that traces every elicited invocation through a finished skill's branches, resource pointers, and observable postconditions.
_Avoid_: Checklist, structural validation

**Characterization testing**:
Capturing an existing skill's observable invocation and process before improvement so intentional changes remain distinct from regressions.
_Avoid_: Snapshot, preservation rule
