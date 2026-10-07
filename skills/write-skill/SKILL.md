---
name: write-skill
description: Create or refactor reusable agent skills when a recurring task needs specific methods, behaviour, or repeatable operations.
---

# Write skill

Produce a concise skill bundle that reliably performs its **confirmed contract**. Keep it brief without weakening the method, required behaviour, or completion gate.

## Inputs

Take the recurring task or requested revision from the request. For revisions, inspect the existing bundle and its callers. Retain, rewrite, or delete instructions and resources to meet the confirmed contract.

## Method

1. **Establish the contract.** Resolve discoverable facts, then invoke [$elicit](../elicit/SKILL.md) for material user-held information and decisions. Propose inputs, outputs, triggers, scope, required behaviour, and observable completion conditions. Recognise methodologies in the user's description and check their fit. Draft only after the complete contract is confirmed.
2. **Choose the structure.** Keep one coherent outcome per skill. Use [the template](assets/skill-template.md) with an overview, Inputs, Method, and Finish. Depart only when a section has no useful job, as in a tiny reference skill, or distinct branches need a router. Keep the purpose and completion gate explicit in either case.
3. **Write direct instructions.** Apply [$write-prose](../write-prose/SKILL.md) to authored prose while preserving the confirmed contract and technical literals. Name the task input and where to obtain it. Include additional inputs only when they govern a concrete action or prerequisite. Remove generic context inventories. Recruit established **leading words**, such as TDD, YAGNI, and decision tree, instead of explaining familiar methods from scratch. State the required intensity and coverage. For example, “ask questions” is weaker than “relentlessly traverse every material branch”. Give defaults, consequential exceptions, and fragile sequences. Leave routine implementation choices to the agent. Prune generic advice. Keep only instructions that change execution, add missing knowledge, or make completion checkable.
4. **Show and package.** Demonstrate important rules that allow competing interpretations. Keep short examples inline and fuller fenced examples in references. Use [writing examples](references/writing.md) to sharpen wording and [the worked examples](references/examples.md) to shape a complete bundle. Keep common essentials in the root and branch detail behind a pointer saying when to read it. Apply **DRY**: give each rule one authoritative home. Reuse tools or bundle tested scripts for repeatable mechanical work. Follow [packaging guidance](references/packaging.md), including `agents/openai.yaml`.
5. **Validate the candidate.** Run [the packaging validator](scripts/validate-skill.js) with `bun /path/to/write-skill/scripts/validate-skill.js /path/to/candidate`. Fix defects and rerun. Follow [scenario testing](references/evaluation.md). A fresh subagent must exercise the candidate on a realistic task, including the reported regression when revising. Inspect actual questions, actions, artefacts, and stopping against the contract. Fix failures and rerun affected checks. Use [token counting](references/tokens.md) to compare plausible wordings. Prefer fewer tokens when clarity, the contract, and scenario behaviour hold. Run applicable repository checks.

## Finish

Return the destination, changes, packaging result, scenario and observed behaviour, and remaining limitations.

**Done only when** the bundle matches the confirmed inputs, method, behaviour, and output, packaging passes, and scenario evidence demonstrates its completion gate. Report missing prerequisites or failed checks as blockers. Stop within the requested scope.
