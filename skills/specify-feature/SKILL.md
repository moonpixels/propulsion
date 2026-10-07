---
name: specify-feature
description: Specify and document one software feature when its behaviour and consequential technical decisions need definition or a durable specification.
---

# Specify feature

Produce a confirmed, **decision-complete** specification for one feature. Preserve enough intent, solution and rationale for ticket planning in a fresh conversation.

## Inputs

Take the feature from the request and its supplied context, including confirmed discussion. Read relevant project guidance, linked authorities and current-system evidence.

## Method

1. **Prepare coverage.** Read [feature discovery](references/discovery.md) and [the specification template](assets/specification-template.md) before mapping the decision tree. Resolve discoverable facts through inspection or [$research](../research/SKILL.md).
2. **Elicit intent.** Invoke [$elicit-with-context](../elicit-with-context/SKILL.md) for the feature's scoped behaviour and constraints, using the discovery guidance. Use **goal-oriented use cases** and **Example Mapping** to connect flows, rules, examples and open questions.
3. **Settle the consequential solution.** Resolve choices that change observable behaviour, shared contracts, state ownership, safeguards, migration, verification or ticket dependencies. Invoke [$modular-design](../modular-design/SKILL.md) for material ownership and interface choices. Record the selected approach, load-bearing contracts, reasons and relevant rejected alternatives. Leave reversible internal coding choices and the per-slice implementation plan to tickets. Reopen intent when design exposes a gap.
4. **Check the complete specification.** Check rules against concrete acceptance examples and inherited constraints. Supply feature intent and the consequential solution to the active dialogue for confirmation.
5. **Write and connect.** Invoke [$write-prose](../write-prose/SKILL.md) with confirmed decisions, evidence and template. Follow project document conventions, defaulting to `docs/features/<feature-slug>/specification.md`. Link precise authorities and give referenced requirements stable IDs. When a matching product-index entry exists, fill its specification link. Preserve existing ticket checklists during revisions and report affected tickets when a decision changes.

## Finish

Re-read the saved specification for faithful decisions, complete scoped behaviour, observable acceptance, consequential solution rationale and valid links. Return its path, index update, checks and material limitations. Stop before ticket creation or implementation.

**Done only when** contextual elicitation and applicable design work are complete, and the saved document permits ticket planning without inventing behaviour or choosing a consequential solution. Explicitly delegated coding choices may remain. Report any unmet prerequisite and dependent work instead of declaring readiness.
