---
name: write-skill
description: Create, revise, or maintain reusable agent skills when a workflow needs specialised knowledge, decision rules, or repeatable operations.
---

# Write Skill

Produce a skill bundle that improves a real recurring task. Keep its purpose coherent, its triggers precise, and its required outcome observable. Apply these conventions to this skill and every skill it produces.

## Inputs

Use the requested destination, task examples, source material, user preferences, and target runtime. For maintenance, inspect the affected skill, resources, callers, and available execution evidence. Read only what the task needs. Treat existing instructions as candidates for appraisal, rather than requirements to preserve without evidence.

Resolve discoverable facts directly. When material user-held information or choices remain, invoke `$elicit-with-context` in software projects or `$elicit` elsewhere. Reuse confirmed requirements. Distinguish missing information from missing authorisation; the user's instructions and actual permissions govern the work.

## Method

1. **Define the contract.** Ground the skill in real expertise, successful work, corrections, domain references, or observed failures. Establish inputs, source of truth, intended output or state, scope, required decisions, and task-specific success checks before drafting. Separate invariants from preferred methods. Identify the knowledge or behaviour the skill adds beyond an unassisted agent.
2. **Choose the unit and trigger.** Keep coupled work that serves one outcome together. Split independently useful workflows with different triggers, inputs, resources, or success boundaries. Use a router only when a meaningful branch selection avoids irrelevant guidance. Decide explicit, implicit, or composed invocation from actual use and destination support.
3. **Design the active path.** Keep common essentials and non-obvious gotchas visible before their decisions. Put branch-specific detail behind a pointer that states when to read it and what it supports. Give each normative meaning one authoritative home. Use called skills' public contracts without restating their internal processes. Make cold-context handoffs self-contained.
4. **Write the bundle.** Use the base template below, or the router template for distinct branches. Adapt sections to the task. Use direct verbs, simple concrete language, short headings, and selective bold emphasis. Prefer a clear default with observable exceptions. Retain precise boundaries and fragile sequences; leave other implementation choices open. Include only runtime-useful instructions and knowledge, with explanations where they help decisions generalise.
5. **Validate and evaluate.** Check packaging, reachable resources, dependencies, and destination loading. Run separate trigger and outcome comparisons against no skill and, for revisions, the previous version. Inspect actual artefacts, state, reads, tools, failures, stopping, and cost. Scale repetitions and experiments to the consequences and uncertainty. Correct specific failures and rerun affected checks; keep the smallest tested version that preserves required outcomes and reliability.
6. **Release and maintain.** Place the verified bundle at the requested destination, run applicable project checks, and record its revision, compatibility assumptions, and evaluation configuration outside routine instructions. Revisit it when usage reveals a failure or its model, runtime, tools, or domain contract changes. Remove obsolete guidance rather than accumulating warnings.

## Conditional resources

- Use [the base template](assets/skill-template.md) for one coherent workflow, or [the router template](assets/router-template.md) for genuinely different branches.
- Read [writing guidance](references/writing.md) when drafting or revising instructions, examples, or descriptions.
- Read [packaging guidance](references/packaging.md) when creating, restructuring, or changing discovery, invocation, or compatibility.
- Read [tool guidance](references/tools.md) when the skill uses commands, scripts, authenticated tools, or stateful operations.
- Read [evaluation guidance](references/evaluation.md) when defining success checks, evaluating a candidate, or investigating a regression.
- Read [maintenance guidance](references/maintenance.md) when revising, releasing, pruning, or retiring a skill.
- Read [worked examples](references/examples.md) when a concrete workflow, router, or output format would clarify the design.
- Run [the packaging validator](scripts/validate-skill.js) with `bun /path/to/write-skill/scripts/validate-skill.js /path/to/skill`. It requires Bun with `Bun.YAML`, reads local files, makes no changes or network requests, and returns JSON with exit 0 for valid packaging, 1 for invalid packaging, or 2 for usage errors. Fix reported defects and rerun it. Without that runtime, perform the documented packaging checks and report the unavailable automated check. Validate client extensions separately on their destination.

## Finish

Return the destination, changed files, contract, checks performed, comparison results, material trade-offs, and unresolved evidence. Distinguish verified behaviour from inspection and inconclusive results. If a prerequisite prevents completion, identify the exact blocker and required next step.

Done when the requested bundle is present, its resources are reachable, applicable checks pass, and its behaviour and remaining uncertainty have been assessed against the contract. A successful packaging check alone does not establish useful execution. Stop within the requested scope; installation, publication, or external actions require the corresponding user authorisation.
