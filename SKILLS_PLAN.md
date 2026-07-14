# Propulsion Skills Plan

This plan defines the fixed v1 Propulsion skill suite. It is the high-level
handoff for implementing each skill independently, not a copy of the finished
skill instructions.

## Purpose

Propulsion gives coding agents short, predictable workflows grounded in
well-known methods. Each skill stabilises the process while leaving
context-sensitive outcomes open.

The v1 suite contains exactly these twelve skills:

1. **write-skill**
2. **elicit**
3. **maintain-context**
4. **commit**
5. **tdd**
6. **code-review**
7. **elicit-with-context**
8. **pr**
9. **implement**
10. **debug**
11. **research**
12. **review-architecture**

## Suite Principles

### Methodology hierarchy

Every skill has one **governing methodology** that determines its process.
Add a **supporting concept** only when it governs a distinct concern without
competing with that methodology.

Research validates each choice during design. Plans and skills use canonical
methodology names without author, book, or source attribution. The research
skill is the exception at output level because its reports cite their claims.

### Behavioural language

Use familiar terms as leading words to recruit the agent's existing knowledge.
Apply lossless compression until every remaining word or sentence changes
behaviour, preserves a condition, or improves navigation. Keep language plain,
tight, and context-aware rather than explaining concepts the agent already
knows.

### Predictable composition

Every skill remains directly useful on its own. A **router skill** contains only
coordination unique to its combined outcome; called skills remain authoritative
and the router neither repeats nor overrides them.

### Invocation

User invocation is the default. Permit model invocation only when a skill is a
composed dependency or a broadly reusable workflow whose context cost is
justified.

| User-invoked        | Model-invoked    |
| ------------------- | ---------------- |
| write-skill         | elicit           |
| elicit-with-context | maintain-context |
| pr                  | commit           |
| implement           | tdd              |
| debug               | code-review      |
| review-architecture | research         |

Model-invoked skills remain directly invokable by the user.

### Resources

Keep common-path behaviour in SKILL.md. Add a reference, asset, or script only
when a confirmed use case requires it:

- references hold conditional guidance;
- assets hold reusable output material;
- scripts hold deterministic, repeated, or fragile operations.

## Skill Catalogue

| Skill               | Outcome                                                    | Composition                                          |
| ------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| write-skill         | Create, review, and improve predictable skills             | elicit; research when durable evidence is warranted  |
| commit              | Create coherent conventional commits from uncommitted work | None                                                 |
| pr                  | Publish a ready GitHub pull request                        | commit                                               |
| elicit              | Resolve requirements to confirmed shared understanding     | None                                                 |
| maintain-context    | Keep project language and decisions current                | None                                                 |
| elicit-with-context | Elicit while maintaining durable context                   | elicit, maintain-context                             |
| implement           | Deliver a verified implementation through reviewed slices  | tdd, code-review                                     |
| tdd                 | Build observable behaviour through red-green-refactor      | None                                                 |
| code-review         | Report validated requirements and code-health findings     | None                                                 |
| debug               | Reproduce, isolate, repair, and verify a code issue        | tdd when applicable                                  |
| research            | Persist primary-source findings in a cited report          | Background agent when available                      |
| review-architecture | Produce an interactive report of high-value redesigns      | research when durable external evidence is warranted |

## Standard Skill Brief

Every implementation handoff below records:

- proposed name;
- intended outcome;
- use cases;
- boundaries and exclusions;
- governing methodology;
- supporting concepts;
- invocation and composition;
- high-level workflow;
- implementation success criteria;
- open research or design questions.

## Skill Briefs

### write-skill

**Proposed name:** write-skill

**Intended outcome:** Guide the user through creating, reviewing, or improving a
skill whose process is predictable, whose outcome remains context-sensitive,
and whose language is behaviourally dense.

**Use cases:** Create a new skill from a need; review an existing skill; improve
an existing skill without unintentionally changing its contract.

**Boundaries and exclusions:** It authors skill bundles, not the domain work the
new skill will later perform. It does not select a governing methodology without
the user's approval or retain source attribution in the finished skill.

**Governing methodology:** Use-case modelling.

**Supporting concepts:** Ubiquitous language, Unix philosophy, leading words,
progressive disclosure, degrees of freedom, ironic process theory, YAGNI, DRY,
design by contract, lossless compression, characterization testing, and
acceptance testing.

**Invocation and composition:** User-invoked. Invoke **elicit** to resolve the
skill's concrete need and use cases. Invoke **research** when methodology
selection or another material question warrants a durable evidence record;
perform only bounded source verification for smaller factual checks.

**High-level workflow:**

1. Establish whether the user is creating, reviewing, or improving a skill.
2. Elicit goals, callers, inputs, preconditions, flows, branches, failure paths,
   composition, permissions, outputs, and postconditions.
3. Research candidate governing methodologies and supporting concepts when
   needed, recommend the strongest fit, and obtain the user's approval.
4. Choose the name, invocation policy, bundle shape, and necessary resources.
5. Write the bundle from the confirmed use cases and concepts.
6. Compress and semantically test every use case until the skill is concise,
   complete, and predictable.

**Implementation success criteria:** A finished skill handles every confirmed
use case, names one approved governing methodology, uses supporting concepts
only for distinct concerns, contains no repeated authority, and passes
mechanical and semantic validation.

**Open questions:** None.

### commit

**Proposed name:** commit

**Intended outcome:** Inspect uncommitted work and create one or more coherent
conventional commits without losing or conflating changes.

**Use cases:** Commit one coherent working-tree change; separate mixed concerns
into multiple commits; provide the commit operation used by **pr**.

**Boundaries and exclusions:** It does not push, open a pull request, discard
changes, or force unrelated work into one commit.

**Governing methodology:** Conventional Commits.

**Supporting concepts:** Atomic commits and interactive staging.

**Invocation and composition:** Model-invoked and directly user-invokable. It
has no skill dependencies and is called by **pr**.

**High-level workflow:**

1. Inspect tracked, staged, unstaged, and untracked changes plus repository
   instructions and recent commit conventions.
2. Group changes by coherent intent and identify anything that should remain
   uncommitted.
3. Use file- or hunk-level staging to create each atomic change.
4. Write an accurate conventional commit message and verify the resulting
   commit before continuing to another concern.

**Implementation success criteria:** Every created commit is coherent,
conventional, and traceable to the inspected diff; excluded work remains
untouched; mixed changes are not hidden inside a misleading commit.

**Open questions:** None.

### pr

**Proposed name:** pr

**Intended outcome:** Publish the current GitHub branch as a concise,
ready-for-review pull request.

**Use cases:** Commit eligible local work, push the branch, and create a pull
request; create a draft only when explicitly requested.

**Boundaries and exclusions:** GitHub repositories only. Use the configured
default branch unless the user explicitly supplies another base. Stop clearly
when the branch, remote, authentication, or diff prerequisites are not met.

**Governing methodology:** GitHub flow.

**Supporting concepts:** Conventional Commits and BLUF.

**Invocation and composition:** User-invoked. Invoke **commit** for uncommitted
work and leave its staging and atomicity guidance authoritative.

**High-level workflow:**

1. Resolve the GitHub remote, current branch, requested or default base branch,
   authentication, and repository pull-request instructions.
2. Invoke **commit** when eligible uncommitted changes exist.
3. Inspect the complete branch diff and commit history from the base branch's
   merge base.
4. Push the current branch and create a ready pull request, or a draft when
   explicitly requested.
5. Use a conventional title and honour a required repository template;
   otherwise write one short paragraph explaining what changed and why.

**Implementation success criteria:** The remote branch exists, the pull request
targets the correct base, its title and body accurately describe the complete
diff, and the resulting URL is returned.

**Open questions:** None.

### elicit

**Proposed name:** elicit

**Intended outcome:** Turn unresolved requirements into confirmed shared
understanding by closing every material branch one decision at a time.

**Use cases:** Resolve requirements, constraints, trade-offs, boundaries,
dependencies, terminology, and success conditions before downstream action.

**Boundaries and exclusions:** It does not begin downstream implementation
before confirmation. It remains unconfirmed when the user pauses, cancels, or
redirects the interview.

**Governing methodology:** Requirements elicitation.

**Supporting concepts:** Decision trees, Socratic questioning, falsification,
and theoretical saturation.

**Invocation and composition:** Model-invoked and directly user-invokable. It is
called by **write-skill** and **elicit-with-context**.

**High-level workflow:**

1. Inspect the environment until discoverable facts for the current branch are
   known.
2. Build and order the material decision tree.
3. Ask exactly one highest-impact resolved-prerequisite question at a time,
   recommending the strongest answer and meaningful alternatives.
4. Test each answer through scenarios, counterexamples, and edge cases.
5. Repeat until theoretical saturation, then present one concise synthesis for
   explicit confirmation.

**Implementation success criteria:** Material branches, constraints, and
success conditions are either confirmed or explicitly unresolved; downstream
work begins only after the user's final confirmation.

**Open questions:** None.

### maintain-context

**Proposed name:** maintain-context

**Intended outcome:** Keep the codebase's ubiquitous language and consequential
architecture decisions accurate as understanding changes.

**Use cases:** Resolve project terminology; update the single root CONTEXT.md;
create, supersede, and link concise ADRs.

**Boundaries and exclusions:** Record project-specific language rather than
general programming definitions. Create an ADR only when changing the decision
would be costly, the choice would surprise a future reader, and viable
alternatives created a genuine trade-off.

**Governing methodology:** Ubiquitous language.

**Supporting concepts:** Architecture Decision Records, single source of truth,
progressive disclosure, and inverted pyramid.

**Invocation and composition:** Model-invoked and directly user-invokable. It is
called by **elicit-with-context**.

**High-level workflow:**

1. Compare conversation language with CONTEXT.md and relevant code evidence.
2. Challenge ambiguous or conflicting terms and persist each confirmed term
   immediately.
3. Test accepted decisions against the ADR gates.
4. Write brief sequential ADRs only for qualifying decisions and preserve
   superseded history in both directions.
5. Re-read changed artifacts for consistency and report unresolved
   contradictions.

**Implementation success criteria:** The root glossary reflects confirmed
language as it resolves; ADRs are brief, accepted, sequential, and historically
linked; inferred or unresolved claims are not persisted.

**Open questions:** None.

### elicit-with-context

**Proposed name:** elicit-with-context

**Intended outcome:** Elicit confirmed shared understanding while keeping
project language and decisions current.

**Use cases:** Deliberate interviews whose confirmed terms and qualifying
decisions should become durable project context.

**Boundaries and exclusions:** It is a router and repeats none of the called
skills' process, terminology rules, or persistence mechanics.

**Governing methodology:** Inherited requirements elicitation.

**Supporting concepts:** Inherited from **elicit** and **maintain-context**;
none are restated by the router.

**Invocation and composition:** User-invoked. Invoke **elicit**, applying
**maintain-context** throughout.

**High-level workflow:** Route the interview through **elicit** and
**maintain-context**. Treat **elicit**'s final confirmation as the acceptance
boundary for qualifying ADRs, then return the elicitation state, context
changes, and unresolved language or decisions.

**Implementation success criteria:** The router contains only its composition
and shared acceptance boundary; called skills remain the sole authority for
their own behaviour.

**Open questions:** None.

### implement

**Proposed name:** implement

**Intended outcome:** Deliver a clear software request through the smallest
verified end-to-end slices and close the review-remediation loop.

**Use cases:** Implement features, bug fixes, refactors, documentation, or
configuration after the desired outcome is sufficiently clear.

**Boundaries and exclusions:** It does not duplicate TDD or code-review
instructions, add speculative scope, or commit and publish work without a
separate request.

**Governing methodology:** Tracer bullets.

**Supporting concepts:** Feedback loops and YAGNI.

**Invocation and composition:** User-invoked. Invoke **tdd** for applicable
observable behaviour changes and **code-review** after implementation.

**High-level workflow:**

1. Confirm the requested outcome, authorised scope, repository rules, and
   verification evidence.
2. Deliver the smallest end-to-end slice; use **tdd** when applicable and the
   smallest direct verified change otherwise.
3. Repeat until the requested behaviour is complete.
4. Invoke **code-review**, remediate in-scope findings, and repeat review and
   verification until clean.
5. Run the repository's prescribed final checks and report exact evidence.

**Implementation success criteria:** Every requested behaviour is implemented,
relevant verification passes or has an exact blocker, and the latest review has
no unresolved in-scope finding.

**Open questions:** None.

### tdd

**Proposed name:** tdd

**Intended outcome:** Build observable behaviour one test at a time through
durable red-green-refactor cycles.

**Use cases:** Features and bug fixes in repositories that already have a
runnable test suite.

**Boundaries and exclusions:** Do not create a test harness merely to make TDD
applicable. Documentation, configuration-only changes, and
behaviour-preserving refactors remain outside unless they also change observable
behaviour.

**Governing methodology:** Test-driven development through red-green-refactor.

**Supporting concepts:** Classicist TDD, Test Desiderata, and
Arrange-Act-Assert.

**Invocation and composition:** Model-invoked and directly user-invokable. It is
called by **implement** and **debug**.

**High-level workflow:**

1. Establish a known baseline and select one smallest observable behaviour.
2. Test through a stable public seam, using real internal collaborators and
   doubles mainly at uncontrollable boundaries.
3. Observe the expected red failure, implement only enough for green, then
   refactor while green.
4. Repeat one behaviour at a time and finish with the complete relevant suite.

**Implementation success criteria:** Every cycle demonstrates meaningful red
and green evidence; retained tests satisfy the Test Desiderata and remain
sensitive to behaviour rather than implementation structure.

**Open questions:** None.

### code-review

**Proposed name:** code-review

**Intended outcome:** Return prioritised, evidence-validated findings for a
scoped code change without modifying it.

**Use cases:** Review uncommitted work, a branch, pull request, revision range,
or a caller-supplied implementation.

**Boundaries and exclusions:** Read-only. Report only issues introduced by or
materially relevant to the scoped change; omit personal preferences, unsupported
speculation, and unrelated pre-existing debt.

**Governing methodology:** Google code review centred on code health.

**Supporting concepts:** Requirements traceability, code smells, Test
Desiderata, falsification, and risk-based prioritisation.

**Invocation and composition:** Model-invoked and directly user-invokable. It is
called by **implement**.

**High-level workflow:**

1. Pin the exact diff and recover the best available requirements source.
2. Inspect repository instructions, changed files, relevant surrounding code,
   tests, and verification.
3. Perform separate requirements and code-health passes so neither suppresses
   the other.
4. Try to disprove every candidate finding with code evidence and targeted
   non-mutating checks.
5. Report only actionable findings with priority, evidence, consequence, and
   the smallest effective correction.

**Implementation success criteria:** The report states its scope and
requirements source, every finding is evidenced and actionable, both review
axes are explicit, and a clean review says so plainly.

**Open questions:** None.

### debug

**Proposed name:** debug

**Intended outcome:** Own the full debugging workflow from reproducible failure
through verified repair.

**Use cases:** Diagnose and fix incorrect behaviour, failing tests, runtime
errors, regressions, performance faults, or integration issues. Stop before
mutation only when the user explicitly requests diagnosis alone.

**Boundaries and exclusions:** Do not guess and patch symptoms, change multiple
variables without an experiment, or expand beyond the demonstrated cause.

**Governing methodology:** Scientific method.

**Supporting concepts:** Minimal reproducible example, hypothesis testing,
binary search, delta debugging, root-cause analysis, feedback loops, and
regression testing.

**Invocation and composition:** User-invoked. Invoke **tdd** for the regression
test and repair when applicable.

**High-level workflow:**

1. Reproduce the issue and record the expected and observed behaviour.
2. Gather evidence, state falsifiable hypotheses, and run the cheapest
   discriminating experiment.
3. Narrow the failing input, change, component, or boundary until the root cause
   is established.
4. Add a regression test and apply the smallest causal correction.
5. Verify the original reproduction, relevant regression coverage, and wider
   checks.

**Implementation success criteria:** The failure is reproducible, the root cause
is supported by experiments, the fix addresses that cause, and verification
proves both repair and regression protection.

**Open questions:** None.

### research

**Proposed name:** research

**Intended outcome:** Investigate a scoped question against high-trust primary
evidence and persist concise, cited findings in the repository.

**Use cases:** Research a user-requested topic; gather documentation, API,
source-code, standard, publication, or first-party data evidence; provide
durable reading legwork to another skill.

**Boundaries and exclusions:** Do not trigger for every factual lookup. Secondary
sources are discovery aids whose material claims must be traced to primary
sources. Whenever the skill is invoked, it produces a durable report.

**Governing methodology:** Evidence synthesis.

**Supporting concepts:** Source criticism, citation chaining, triangulation,
falsification, reproducibility, and provenance.

**Invocation and composition:** Model-invoked and directly user-invokable. Spawn
a background agent when the host supports delegation; otherwise perform the
same workflow inline. Other skills invoke it only when the evidence warrants a
durable record.

**High-level workflow:**

1. Define the research question, scope, currency needs, and source hierarchy.
2. Give a background agent the question, repository context, primary-source
   standard, and report contract while the caller continues independent work.
3. Discover, appraise, compare, and synthesize primary evidence; use secondary
   writing only to locate original sources.
4. Write docs/research/YYYYMMDD-{research-title}.md from
   assets/research-report-template.md with claim-level citations, method,
   conflicts, limitations, and source list.
5. Return only the report path and concise concrete findings to the caller,
   which validates the conclusions and citations without loading the raw search
   trail.

The template uses createdAt, updatedAt, and status frontmatter, plus relative
supersedes or supersededBy links only when applicable. Its body contains the
research question and scope, conclusion, cited findings, method, limitations,
conflicts, and primary-source list.

**Implementation success criteria:** The report maps material claims to primary
sources, exposes uncertainty and conflicts, and is reproducible from its
recorded method. A substantive refresh creates a linked superseding snapshot;
a minor correction preserves createdAt and changes updatedAt without rewriting
history.

**Open questions:** None.

### review-architecture

**Proposed name:** review-architecture

**Intended outcome:** Analyse a codebase and produce a concise interactive HTML
report of the highest-value architecture redesigns.

**Use cases:** Review a whole project or explicit scope; expose weak module
boundaries, leaked implementation, shallow interfaces, harmful coupling, and
missing seams; propose framework-aware improvements.

**Boundaries and exclusions:** Read-only. It recommends a small set of
high-value changes rather than exhaustively cataloguing debt or forcing one
framework-specific implementation pattern.

**Governing methodology:** Information hiding.

**Supporting concepts:** Deep modules, design it twice, cohesion and coupling,
single responsibility principle, dependency inversion, seams, ports and
adapters, ATAM, architecture fitness functions, strangler fig pattern,
progressive disclosure, and information visualisation.

**Invocation and composition:** User-invoked. Invoke **research** only when
external framework, language, or architecture evidence warrants a durable
report.

**High-level workflow:**

1. Inspect code, context, decisions, dependency direction, framework
   conventions, runtime boundaries, and existing verification.
2. Map cohesive capabilities, public contracts, hidden implementations,
   adapters, seams, coupling, and quality-attribute drivers.
3. Generate alternative boundaries through design it twice, then evaluate
   benefits, risks, trade-offs, effort, and migration paths.
4. Keep only the highest-value recommendations and define architecture fitness
   evidence for each.
5. Generate a self-contained interactive report at
   docs/architecture/YYYYMMDD-{scope}-architecture-review.html using
   references/report-design.md for tone, hierarchy, accessibility, diagrams,
   interaction patterns, and visual QA.

Each recommendation explains the evidenced problem, affected modules and
contracts, target design, framework fit, quality improvements, costs and risks,
incremental migration, dependencies, and fitness checks. The initial view is
short and plain; diagrams, filters, and expandable evidence disclose complexity
only when requested.

**Implementation success criteria:** A human can understand and compare the
prioritised recommendations without reading a wall of technical prose; every
recommendation is evidence-backed, framework-aware, trade-off explicit,
incrementally actionable, and visually verified.

**Open questions:** None.

## Composition Map

| Caller              | Called skill     | Condition                                                       |
| ------------------- | ---------------- | --------------------------------------------------------------- |
| write-skill         | elicit           | Resolve the skill need and use cases                            |
| write-skill         | research         | Methodology or another material question needs durable evidence |
| elicit-with-context | elicit           | Run the interview                                               |
| elicit-with-context | maintain-context | Maintain language and decisions throughout                      |
| pr                  | commit           | Eligible uncommitted work exists                                |
| implement           | tdd              | An applicable observable behaviour change has a runnable suite  |
| implement           | code-review      | The implementation is ready for independent assessment          |
| debug               | tdd              | The repair can be driven by a regression test                   |
| review-architecture | research         | External evidence warrants a durable report                     |

## Suggested Implementation Order

1. **write-skill**
2. **elicit**
3. **maintain-context**
4. **commit**
5. **tdd**
6. **code-review**
7. **elicit-with-context**
8. **pr**
9. **implement**
10. **debug**
11. **research**
12. **review-architecture**

The order establishes the authoring workflow first, then independently useful
dependencies, routers, and larger specialised workflows.

## Suite Acceptance Criteria

The v1 suite is complete when:

- all twelve bundles exist under skills/ with the proposed canonical names;
- every skill has one governing methodology and only necessary supporting
  concepts;
- descriptions state both capability and invocation conditions;
- invocation metadata matches the agreed user/model map in every supported
  client;
- every skill is directly usable and every router contains only unique
  coordination;
- callers reference dependencies without repeating or overriding them;
- common-path instructions stay in SKILL.md and every additional resource earns
  its place through a confirmed use case;
- research owns assets/research-report-template.md and review-architecture owns
  references/report-design.md;
- finished skill text names methodologies without author, book, or source
  attribution;
- semantic dry runs exercise normal, branch, failure, and composition paths;
- mechanical validation and every bundle script pass;
- repository context, skill names, and composition agree; and
- bun run checks passes after each implemented skill.
