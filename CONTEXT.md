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

### Skill anatomy

**Authoring workflow**:
A skill that guides an agent through creating or updating another skill with an explicit process. It makes execution predictable without prescribing the authored skill's outcome.
_Avoid_: Design guide, skill reference

**Composable skill**:
An independently useful skill that may be invoked alone or coordinated by another skill without requiring the rest of a prescribed workflow.
_Avoid_: Workflow stage, mandatory step

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
A recognised term from a proven methodology or technique in established literature, specific enough to invoke the agent's existing knowledge without further explanation. A skill explains only its Propulsion-specific adaptation or constraints.
_Avoid_: Coined term, theme, slogan

**Lossless compression**:
Reducing a skill to the fewest words and structures that preserve its behaviour, conditions, constraints, and technical meaning.
_Avoid_: Trimming, shortening, minimalism

**Degrees of freedom**:
The amount of judgement a skill leaves to the agent. Match it to the work's fragility so the process is predictable without predetermining valid outcomes.
_Avoid_: Flexibility, strictness

**Positive framing**:
Steering that states the desired behaviour directly. Use a negative instruction only for a necessary hard guardrail and pair it with the corrective behaviour.
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

**Dry run**:
A semantic validation that traces concrete use cases through a finished skill before handoff.
_Avoid_: Checklist, structural validation

### Work tracking

**Project**:
A documented initiative that gives a related group of tickets a shared outcome, scope, and constraints. Every ticket belongs to exactly one project through its project key.
_Avoid_: Epic, ticket group

**Ticket**:
A durable Markdown record of a coherent unit of work, containing the context and completion conditions an agent needs to deliver it.
_Avoid_: Issue, task

**Ticket tracker**:
The repository-native system that stores tickets in status directories and treats moving a ticket between them as a workflow transition.
_Avoid_: Issue tracker, external tracker

**Ticket status**:
The current lifecycle state of a ticket, determined solely by the status directory containing its file. The canonical states are `backlog`, `ready`, `in-progress`, `blocked`, `done`, and `cancelled`.
_Avoid_: Frontmatter status, ticket state field

**Backlog ticket**:
A fully specified, actionable ticket that has been deliberately postponed rather than selected for execution.
_Avoid_: Draft ticket, incomplete ticket

**Backlog refinement**:
The recurring review that keeps backlog tickets current, ordered, and aligned with project goals, and selects appropriate work for promotion to `ready`.
_Avoid_: Ticket completion, requirements discovery

**Ready ticket**:
A fully specified, actionable ticket that has been selected for execution and whose blocking dependencies have been completed.
_Avoid_: Todo ticket, open ticket

**Blocked ticket**:
A selected or in-progress ticket that encounters an unexpected impediment and cannot continue until an explicitly recorded dependency, decision, or external condition is resolved.
_Avoid_: Stalled ticket, paused ticket

**Done ticket**:
A ticket whose implementation, executable verification, and material review findings are complete. Commit and pull-request state do not affect ticket status.
_Avoid_: Committed ticket, merged ticket

**Project key**:
A short uppercase identifier that prefixes related ticket IDs so their files remain grouped and recognisable across the ticket tracker.
_Avoid_: Project prefix, namespace

**Ticket ID**:
The stable identifier formed from a project key and project-local sequence number, such as `CACHE-001`. References use the ticket ID even if the descriptive filename slug changes.
_Avoid_: Filename, ticket number

**Ticket filename**:
The path-safe representation of a ticket in the form `{PROJECT-KEY}-{SEQUENCE}-{SLUG}.md`, such as `CACHE-001-add-redis-driver.md`.
_Avoid_: Ticket ID, title

**Ticket estimate**:
An evidence-based relative size on the Fibonacci scale `1, 2, 3, 5, 8`, calibrated without contingency padding. Work above 5 points should be considered for decomposition when it can be split into independently verifiable outcomes.
_Avoid_: Time estimate, deadline, buffer

**Material review finding**:
An evidence-backed issue whose effect on intent, correctness, security, reliability, or maintainability justifies resolving it before the current implementation is considered complete.
_Avoid_: Nit, optional suggestion
