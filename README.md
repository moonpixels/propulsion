![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact, composable set of Agent Skills for practical software delivery. It supports the realistic lifecycle around coding—from establishing a product and defining features to creating tickets, implementation, debugging, and retirement.

Each skill runs one bounded working session and stops with an independently useful outcome. You can enter wherever the necessary inputs already exist and leave when that outcome is complete. Propulsion does not require an end-to-end orchestrator, manifest, setup framework, state machine, or tracker adapter.

Substantial work narrows breadth-first over several sessions: product intent becomes a decision-complete feature specification, then implementation-ready tickets, and finally one implemented body of work per ticket. Small, understood work can begin directly with `$implement`.

## Installation

### Remote

Install Propulsion from GitHub with the skills installer:

```sh
bunx skills@latest add moonpixels/propulsion
```

Choose the skills and coding agents you want when prompted.

### Local

When developing Propulsion from a local clone, link each skill you want to use into the shared Agent Skills directory:

```sh
mkdir -p ~/.agents/skills
ln -s /absolute/path/to/propulsion/skills/elicit ~/.agents/skills/elicit
```

Repeat the link for each selected skill. Codex and OpenCode both discover skills from `~/.agents/skills`; edits in the clone are available through the links without reinstalling or publishing a new version.

## Where to start

| When you need to… | Start with… | Session outcome |
| --- | --- | --- |
| Establish or revise a product | `$define-product` | Confirmed product and system requirements |
| Define a substantial feature | `$specify-feature` | An approved, decision-complete feature specification |
| Make a small understood change | `$implement` | A minimal, reviewed, verified local change |
| Diagnose or repair a defect | `$debug` | A causal diagnosis and, when requested, a verified repair |
| Review another contributor's PR | `$review-pull-request` | Independent findings and verification evidence |
| Remove an obsolete capability | `$plan-retirement` | An approved, safe retirement plan |

## Lifecycle skills

The lifecycle areas are useful entry points, not mandatory phase gates.

### Establish

- `$define-product` turns a new or existing product into the durable breadth-first product and system requirements foundation in `PRODUCT.md`, while `elicit-with-context` maintains applicable project language and qualifying decision records through its own contract.

### Define

- `$specify-feature` turns one high-level request into a single feature specification containing approved feature intent and its selected buildable solution.

### Plan

- `$create-tickets` turns an approved work definition—either a sufficiently complete document or confirmed conversation—into agreed, verified, vertically sliced tickets with Fibonacci complexity.

### Refine

- `$review-architecture` reports a few high-value improvements for an explicitly bounded area without changing it or creating tickets.

### Deliver

- `$implement` produces one minimal, reviewed, verified local change from a ticket or other confirmed work.
- `$commit` records eligible reviewed work as coherent Conventional Commits while preserving unrelated changes.
- `$pull-request` commits eligible remaining work when needed, pushes the branch, and creates or updates one accurate pull request for the whole branch.
- `$review-pull-request` independently assesses someone else's pinned pull request without changing their branch or publishing a review unless requested.

The author's normal delivery flow does not invoke `$review-pull-request`: `$implement` already includes independent code review. The separate pull-request review skill is for work submitted by others.

### Debug

- `$debug` establishes an evidence-backed root cause and, when repair is requested, produces a minimal reviewed and verified local change.

### Retire

- `$plan-retirement` defines the deprecation, migration, communication, removal, archival, recovery, and completion obligations for one obsolete capability. Execution happens in later planning and delivery sessions.

## Representative flows

Establish a product:

```text
define-product
```

Deliver a substantial feature:

```text
specify-feature
    → later create-tickets
    → implement each selected ticket in a separate session
    → commit whenever a coherent unit is ready
    → pull-request when the branch is ready
```

Deliver a small understood change:

```text
implement → commit → pull-request
```

Debug or retire:

```text
debug → commit → pull-request

plan-retirement → later create-tickets → normal delivery sessions
```

Review another contributor's work:

```text
review-pull-request
```

## Reusable utilities

Utilities are independently invokable and are also composed by lifecycle skills when their trigger applies.

| Utility | Use it to… |
| --- | --- |
| `$elicit` | Resolve material user-held information and decisions one question at a time |
| `$elicit-with-context` | Resolve software-project questions while maintaining shared project language |
| `$research` | Investigate a material subject with high-trust evidence and persist a trusted cited report |
| `$maintain-ubiquitous-language` | Keep confirmed project-specific language current in `CONTEXT.md` |
| `$maintain-decision-records` | Preserve rare accepted decisions whose rationale warrants an ADR |
| `$modular-design` | Assess boundaries, ownership, contracts, dependencies, and change propagation |
| `$tdd` | Implement observable behaviour through red-green-refactor when its prerequisites hold |
| `$verify-change` | Run applicable project and risk-triggered quality harnesses against a fixed change |
| `$code-review` | Independently inspect a fixed change for behaviour, regressions, minimality, conventions, and maintainability |
| `$maintain-agents` | Keep confirmed repository-wide agent guidance lean and current |

Software-project skills route questions through `$elicit-with-context`. Base `$elicit` remains available for non-software work and as the router's questioning component.

`$write-skill` develops and evaluates Agent Skills themselves; it is not part of the software-delivery lifecycle.

## Ticket destinations

The root `AGENTS.md` explicitly names the project's ticket destination, such as Linear or local Markdown. If none is named, `$create-tickets` asks the user, records the answer through `$maintain-agents`, and resumes. Local tickets use one file each under `docs/features/<work-slug>/tickets/`; external destinations use their native items, estimates, relationships, and statuses. The skill never guesses, silently falls back, or introduces a Propulsion adapter layer.

## Quality during implementation

`$implement` uses TDD when an existing runnable suite can exercise the change through a meaningful observable boundary. It always subjects the fixed candidate to independent `$code-review` and `$verify-change`, using the repository's required checks plus additional harnesses only when the change's risks justify them.

The workflow does not install unrelated test or quality infrastructure merely to satisfy its process. When meaningful evidence is unavailable, it reports the limitation instead of manufacturing confidence. Implementation stops with a reviewed, verified local change; committing and publication remain separate user-controlled sessions.

## Scope

Propulsion does not release, deploy, merge, or continuously monitor software. Those activities remain project-specific. It also avoids duplicating discoverable code, configuration, CI, tracker, or production state in prose documentation.

## Acknowledgements

Propulsion is heavily inspired by:

- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
