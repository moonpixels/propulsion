![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a set of composable Agent Skills for software delivery, from product definition and planning to implementation, review and maintenance.

Each skill has a narrow scope and a clear outcome. Lifecycle entry points bring supporting skills together, so you can ask for an outcome without managing every step yourself.

Planning works breadth-first. Establish the product's scope, explore a selected feature, then break it into small executable tickets. Start wherever you have enough context. A small, understood change can go straight to `$implement`.

## Installation

### Skills CLI

Install the full set with the [Skills CLI](https://github.com/vercel-labs/skills), including the supporting skills used by lifecycle entry points:

```sh
bunx skills@latest add moonpixels/propulsion --skill '*'
```

Choose your coding agents when prompted. Add `--global` to make the skills available across projects.

### Local symlinks

From the root of a local Propulsion clone, link the skills into the shared Agent Skills directory:

```sh
mkdir -p "$HOME/.agents/skills"
for skill_path in "$PWD"/skills/*; do
    ln -s "$skill_path" "$HOME/.agents/skills/"
done
```

Use this with clients that discover `~/.agents/skills`. Edits in the clone are available through the links without reinstalling.

## Lifecycle entry points

Choose the skill for the outcome you need. Each invocation finishes its own task. You decide when to move to the next one.

| Skill                                                         | Start here to…                                                                                                                                       |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [$define-product](skills/define-product/SKILL.md)             | Explore a new app idea or revisit an existing product. Establish its goals, journeys, shared requirements and feature index in `PRODUCT.md`.         |
| [$specify-feature](skills/specify-feature/SKILL.md)           | Define one feature's behaviour, acceptance examples and consequential technical choices. Produce a specification ready for ticket planning.          |
| [$create-tickets](skills/create-tickets/SKILL.md)             | Break requested work into small vertical slices. Create executable tickets with acceptance criteria and dependencies.                                |
| [$implement](skills/implement/SKILL.md)                       | Deliver a ticket or another understood change. Produce a minimal local implementation with applicable checks, simplification and independent review. |
| [$commit](skills/commit/SKILL.md)                             | Record all uncommitted branch changes in atomic Conventional Commits.                                                                                |
| [$pull-request](skills/pull-request/SKILL.md)                 | Publish the branch for review. Commit any remaining changes, push the branch, and create or update its pull request.                                 |
| [$review-pull-request](skills/review-pull-request/SKILL.md)   | Independently assess an existing PR against engineering standards and available requirements. Return findings for you to act on.                     |
| [$simplify-code](skills/simplify-code/SKILL.md)               | Aggressively simplify a feature, module or codebase while preserving behaviour. Produce verified changes and a durable running report.               |
| [$debug](skills/debug/SKILL.md)                               | Investigate a failure and establish its cause. Ask for diagnosis alone or a repair with implementation and verification.                             |
| [$upgrade-dependencies](skills/upgrade-dependencies/SKILL.md) | Update dependencies and build or CI tooling through checked migrations. Include language or runtime upgrades when requested.                         |

## Example workflow

Imagine building **Shelf**, a personal reading list app. The following prompts follow the same idea from planning to maintenance. Use each in a separate session when you are ready, replacing the illustrative document, ticket and PR references with your own.

Start with the whole app, then select its first feature:

```text
$define-product Shelf, an app for saving books I want to read and tracking my progress
```

```text
$specify-feature the reading list in @PRODUCT.md, including adding books and marking them as read
```

Turn the feature into tickets, then implement them in dependency order. For example, start with the ticket for adding a book:

```text
$create-tickets for @docs/features/reading-list/specification.md
```

```text
$implement @docs/features/reading-list/tickets/TKT-007-add-book.md
```

Record completed work when it forms a coherent unit. Publish the branch when it is ready for review:

```text
$commit
```

```text
$pull-request for Shelf's reading list feature
```

Review the resulting PR:

```text
$review-pull-request #12 against @docs/features/reading-list/specification.md
```

As Shelf grows, use the maintenance entry points for specific needs:

```text
$simplify-code Shelf's reading list feature
```

```text
$debug and fix Shelf adding the same book twice when I submit the form once
```

```text
$upgrade-dependencies in Shelf to the newest compatible stable versions
```

## Supporting skills

Lifecycle entry points invoke these focused capabilities when needed. You can also call them directly.

| Skill                                                                         | Purpose                                                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [$elicit](skills/elicit/SKILL.md)                                             | Resolve material questions and decisions through a confirmed dialogue.                         |
| [$elicit-with-context](skills/elicit-with-context/SKILL.md)                   | Clarify a software task while maintaining project terminology and qualifying decision records. |
| [$research](skills/research/SKILL.md)                                         | Produce a durable cited research report.                                                       |
| [$modular-design](skills/modular-design/SKILL.md)                             | Design simple interfaces that hide domain knowledge and complexity.                            |
| [$test-design](skills/test-design/SKILL.md)                                   | Design minimal tests for observable behaviour.                                                 |
| [$measure-code-complexity](skills/measure-code-complexity/SKILL.md)           | Measure code complexity and interpret signals that warrant attention.                          |
| [$code-cleanup](skills/code-cleanup/SKILL.md)                                 | Independently identify deletions and simplifications that preserve behaviour.                  |
| [$code-review](skills/code-review/SKILL.md)                                   | Independently assess code against requirements and engineering standards.                      |
| [$maintain-agents](skills/maintain-agents/SKILL.md)                           | Keep project instructions in `AGENTS.md` concise and current.                                  |
| [$maintain-ubiquitous-language](skills/maintain-ubiquitous-language/SKILL.md) | Sharpen project terminology and maintain `GLOSSARY.md`.                                        |
| [$maintain-decision-records](skills/maintain-decision-records/SKILL.md)       | Preserve significant technical rationale and decision history.                                 |
| [$write-prose](skills/write-prose/SKILL.md)                                   | Write clear, succinct UK English.                                                              |
| [$write-skill](skills/write-skill/SKILL.md)                                   | Create or refactor concise skills and verify their behaviour.                                  |

## Sources and acknowledgements

Propulsion draws on these skill collections and resources:

- [obra/superpowers](https://github.com/obra/superpowers)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- [PStack](https://github.com/cursor/plugins/tree/main/pstack)
- [Refactoring Guru](https://refactoring.guru/)
