![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact, composable set of Agent Skills for practical software delivery. It supports the realistic lifecycle around coding—from establishing a product and defining features to creating tickets, implementation, and debugging.

Each skill runs one bounded working session and stops with an independently useful outcome. You can enter wherever the necessary inputs already exist and leave when that outcome is complete.

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

## Lifecycle skills

The lifecycle areas below are independent entry points, not mandatory phase gates. Invoke the skill for the outcome you need, later stages do not start automatically.

### Establish

#### `$define-product`

Enter here to establish or deliberately revise the product and system requirements foundation:

```text
$define-product
```

The session produces a user-confirmed `PRODUCT.md` and the corresponding project language in `CONTEXT.md`. It stops before defining individual features, selecting feature-specific architecture, or creating tickets.

### Define

#### `$specify-feature`

Enter here when a high-level feature request needs enough behavioural and technical definition for planning:

```text
$specify-feature
```

The session produces one approved, decision-complete feature specification containing visibly distinct feature intent and selected solution sections. No earlier lifecycle artefact is mandatory, and the skill stops before ticket creation or implementation.

### Plan

#### `$create-tickets`

Enter here when an approved document or confirmed conversation is complete enough to decompose without inventing behaviour or material solution decisions:

```text
$create-tickets
```

The session creates and verifies small, vertically sliced, dependency-aware tickets with Fibonacci complexity in the destination named by the project's root `AGENTS.md`. It stops before scheduling or implementing them.

Local Markdown destinations use one file per ticket under `docs/features/<work-slug>/tickets/`. External destinations use their native items, estimates, relationships, and statuses. If `AGENTS.md` does not name the destination, the skill asks and records it.

### Refine

#### `$review-architecture`

Enter here to assess an explicitly bounded part of the current architecture:

```text
$review-architecture
```

The session produces an evidence-backed report containing a small number of prioritised, high-value improvements and their trade-offs. It does not refactor the code or create speculative tickets.

### Deliver

#### `$implement`

Enter here with one ticket or another small, confirmed body of work:

```text
$implement
```

The session produces a minimal local change with retained tests, applicable quality evidence, and completed independent review. Small, understood work can begin here without a product definition, feature specification, or ticket. Implementation does not commit or publish the change.

`$implement` applies `$modular-design` and `$quality-harnesses`, uses `$tdd` for behaviour-changing work when a usable suite can exercise it, and requires an independent `$code-review`. It uses existing project infrastructure and reports unavailable evidence instead of installing unrelated tooling or manufacturing confidence.

#### `$commit`

Enter here when eligible reviewed work is ready to be recorded:

```text
$commit
```

The session creates and verifies coherent Conventional Commits while preserving unrelated staged, unstaged, and untracked work. It does not push or open a pull request.

#### `$pull-request`

Enter here when the current branch is ready to publish for human review:

```text
$pull-request
```

The session commits eligible remaining work when needed, pushes the branch, and creates or updates one pull request describing the complete branch. It does not merge, release, or deploy the work.

A substantial feature commonly moves through separate sessions:

```text
$specify-feature
    → later $create-tickets
    → $implement each selected ticket
    → $commit whenever a coherent unit is ready
    → $pull-request when the branch is ready
```

A small, understood change may start later:

```text
$implement → $commit → $pull-request
```

### Debug

#### `$debug`

Enter here with observed and expected behaviour or another usable failure signal:

```text
$debug
```

The session establishes an evidence-backed root cause and stops there when diagnosis is the requested outcome. When repair is authorised, it produces a minimal, reviewed local change with regression evidence and stops before commit or publication.

```text
$debug → $commit → $pull-request
```

## Utility skills

These skills are independently invokable outside the main lifecycle path and may also be composed by lifecycle skills when their trigger applies.

| Skill                  | Invoke it to…                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$review-pull-request` | Independently assess someone else's pinned pull request without changing their branch or publishing a review unless requested                             |
| `$elicit`              | Resolve material user-held information and decisions one question at a time                                                                               |
| `$elicit-with-context` | Resolve software-project questions through `$elicit`, applying `$maintain-ubiquitous-language` and `$maintain-decision-records` when their triggers apply |
| `$research`            | Investigate a material subject with high-trust evidence and persist a trusted cited report                                                                |
| `$maintain-agents`     | Keep confirmed repository-wide agent guidance lean and current                                                                                            |

Use `$elicit-with-context` to work through questions or decisions within a software project. For non-software work, use `$elicit`.

## Acknowledgements

Propulsion is heavily inspired by other great skill sets:

- [obra/superpowers](https://github.com/obra/superpowers)
- [mattpocock/skills](https://github.com/mattpocock/skills)
