![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a composable set of Agent Skills for practical software delivery, from product definition and planning to implementation, review, and debugging.

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

Repeat the link for each selected skill in clients that discover `~/.agents/skills`. Check discovery in the client you use; edits in the clone are available through the links without reinstalling.

## Lifecycle skills

The lifecycle areas below are independent entry points, not mandatory phase gates. Invoke the skill for the outcome you need, later stages do not start automatically.

### Establish

#### `$define-product`

Enter here to establish or deliberately revise the product and system requirements foundation:

```text
$define-product
```

The session produces a user-confirmed `PRODUCT.md` and the corresponding project language in `GLOSSARY.md`. It stops before defining individual features, selecting feature-specific architecture, or creating tickets.

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

### Deliver

#### `$implement`

Enter here with one ticket or another small, confirmed body of work:

```text
$implement
```

The session produces a minimal local change with retained tests, applicable quality evidence, and completed independent review. Small, understood work can begin here without a product definition, feature specification, or ticket. Implementation does not commit or publish the change.

`$implement` applies `$modular-design`, uses `$tdd` for behaviour-changing work when a usable suite can exercise it, invokes `$code-cleanup` before final checks, and requires an independent `$code-review`. `$tdd` applies the reusable `$test-design` guidance for durable behavioural tests. Implementation uses existing project infrastructure and reports unavailable evidence instead of installing unrelated tooling or manufacturing confidence.

Once the requested change works, `$measure-code-complexity` measures every function in the changed production files. Its static tools are bundled for macOS and Linux ARM64/x64 and Windows x64. It collects native CRAP through available project tooling, saves full JSON, returns a compact summary and loads interpretation only for signals that warrant attention. The caller owns repeated runs, comparisons and edits. Then `$code-cleanup` uses a fresh read-only agent to challenge the whole affected capability, including unchanged related files. The reviewer loads the detailed techniques, writes a prioritised temporary report and returns only its path. The caller reads the report, adjudicates every candidate, resolves preservation gaps and applies accepted transformations.

#### `$commit`

Enter here when all uncommitted work on the branch is ready to be recorded:

```text
$commit
```

The session records all staged, unstaged, and untracked changes reported by Git in atomic Conventional Commits, including work from earlier sessions. It respects normal ignore rules, lets commit hooks run, and stops before pushing or opening a pull request. It runs no separate repository checks.

#### `$pull-request`

Enter here when the current branch is ready to publish for human review:

```text
$pull-request
```

The session invokes `$commit` for all uncommitted work, pushes the branch, and creates or updates one matching open pull request. It checks the Conventional Commit title and succinct description against the complete branch, refreshing either when needed. The description covers what changed, why, and the resulting behaviour through `$write-prose`. It stops before review, merge, release, or deployment.

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

### Upgrade

#### `$upgrade-dependencies`

Enter here to upgrade package dependencies or the project's full toolchain:

```text
$upgrade-dependencies
```

The session resolves the requested version and toolchain scope, discovers outdated dependencies, checks compatibility and follows official upgrade guidance. It uses official CLI commands first, applies required migrations and verifies the local changes. The handoff reports version changes, validation, blockers and optional code improvements. It stops before publication, deployment or machine-wide changes unless separately authorised.

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

## Supporting skills

These skills are independently invokable outside the main lifecycle path and may also be composed by lifecycle skills when their trigger applies.

| Skill                           | Invoke it to…                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `$review-pull-request`          | Resolve a pull request to fixed revisions and return an independent read-only code review                |
| `$elicit`                       | Resolve material user-held information and decisions one question at a time                              |
| `$elicit-with-context`          | Elicit confirmed project understanding with continuous glossary updates and qualifying ADR maintenance   |
| `$research`                     | Investigate a material subject with high-trust evidence and persist a trusted cited report               |
| `$code-cleanup`                 | Find deletions and simplifications through fresh review and save a report for the caller to assess       |
| `$maintain-agents`              | Create and maintain a lean project AGENTS.md                                                             |
| `$maintain-decision-records`    | Preserve qualifying agreed rationale and maintain ADR history                                            |
| `$maintain-ubiquitous-language` | Sharpen domain language and immediately record resolved meanings in root `GLOSSARY.md`                   |
| `$code-review`                  | Review a fixed candidate independently against engineering standards and available behavioural authority |
| `$measure-code-complexity`      | Measure current code, collect available native CRAP and interpret attention signals                      |
| `$modular-design`               | Choose cohesive ownership, deep interfaces and local changes                                             |
| `$test-design`                  | Design deterministic behavioural tests with stable seams and independent oracles                         |
| `$tdd`                          | Deliver behaviour through valid red-green-refactor cycles using an existing usable suite                 |
| `$write-prose`                  | Write clear, succinct UK English for humans and agents while preserving meaning and required behaviour   |
| `$write-skill`                  | Create or refactor concise skills, validate packaging and exercise their behaviour in a fresh agent      |

Use `$elicit-with-context` to work through questions or decisions within a software project. For non-software work, use `$elicit`.

The project coordinator loads the terminology skill before questioning and keeps the glossary current between questions. The maintainers own glossary entries and ADR history. Callers retain their specifications, implementation, tickets, and downstream checks.

## Development

Run `bun install` to install dependencies, then `bun run checks` after changes. Checks require Bun, Git and Python 3.9 or newer on a supported host. They exercise authoring helpers and the complexity CLI without a separate complexity-tool installation. Skill validation returns one JSON summary with packaging failures and Markdown token counts.

## Acknowledgements

Propulsion is heavily inspired by other great skill sets:

- [obra/superpowers](https://github.com/obra/superpowers)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- [PStack](https://github.com/cursor/plugins/tree/main/pstack)
- [Refactoring Guru](https://refactoring.guru/)
