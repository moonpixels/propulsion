---
name: write-skill
description: User-invoked workflow for predictable agent-skill authoring. Use when creating or updating a skill.
metadata:
    invocation: user
disable-model-invocation: true
---

A skill makes an agent's process predictable without fixing the outcome.

## Steps

Start with the applicable discovery branch, then complete the shared stages.

### Create — use-case modeling

Ground the skill in concrete prompts and expected agent behaviour. Identify its job, inputs, outputs, invocation conditions, branches, and constraints until every intended use case has an explicit route.

### Update — characterization

Read the complete skill bundle, direct references, callers, and reported failures. Distinguish behaviour that remains intentional or relied upon from obsolete material until every current branch and requested change is accounted for.

### Design

Read [the skill format](references/FORMAT.md), then choose the name, invocation policy, description, structure, and bundled resources. Choose one dominant **leading word** grounded in a proven methodology or technique from sources including, but not limited to, The Pragmatic Programmer, Martin Fowler, Robert C. Martin's Clean Code, The Mythical Man-Month, Code Complete, or The Art of Computer Programming. It must be recognised terminology that invokes the agent's existing knowledge; add another only when it governs a distinct concern. Give fragile work narrow degrees of freedom and judgement-heavy work explicit boundaries. Finish when every use case has a route and every ordered step has a clear postcondition.

### Write

Write an explicit workflow using the natural structure of the work. Keep common instructions inline, link each branch-specific reference once beside its condition, and delete obsolete files. Frame instructions around the desired behaviour; pair every necessary prohibition with its positive correction. Continue until the complete bundle expresses the designed process.

### Validate

Dry-run every use case through the finished bundle. Confirm that the invocation conditions, branches, rules, references, and postconditions produce the requested process and that each meaning appears once. Exercise executable helpers, run applicable repository checks, and forward-test complex or uncertain behaviour. Apply final lossless compression, then repeat the dry runs until the shortest wording preserves every behaviour and constraint.

## Rules

- Keep the authored skill self-contained: place required guidance in its shipped bundle rather than relying on repository-only context.
- Apply DRY to instructions and definitions, YAGNI to speculative branches and files, and lossless compression to the entire bundle.
