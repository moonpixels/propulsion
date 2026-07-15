---
name: write-skill
description: Creates, reviews, and improves predictable agent skills through approved use cases and established methodologies. Use when authoring or assessing a skill's behaviour, structure, or wording.
metadata:
    invocation: user
disable-model-invocation: true
---

# Write Skill

**Use-case modelling** turns confirmed needs into skills with predictable
processes and context-sensitive outcomes.

## Steps

1. Inspect the request, complete target bundle, discoverable callers, and host
   conventions. Select the `Create`, `Review`, or `Improve` branch from the
   user's authorised outcome. Before executing a bundled script, establish a
   disposable filesystem, inert fixtures, blocked external mutation, and no
   production credentials; when that boundary is unavailable, leave the script
   unexecuted and record the limitation. The branch, evidence, change boundary,
   and script-execution boundary are explicit.
2. Follow the selected branch.

### Create

1. Invoke `$elicit` to confirm concrete invocations, goals, inputs, outputs,
   prerequisites, flows, branches, failures, composition, permissions,
   postconditions, and resource needs. During the interview, invoke `$research`
   when selecting the methodology or another material question warrants durable
   evidence. Recommend one governing methodology and supporting concepts only
   for distinct concerns; `$elicit`'s final confirmation approves the complete
   contract and authorises writing.
2. Choose a short verb-led name through **ubiquitous language** and an invocation
   policy whose context cost matches expected use. Read
   [Skill Sections](references/SECTIONS.md), then use **Unix philosophy** and
   **YAGNI** to choose the smallest independently useful bundle. The name,
   invocation, structure, and resources serve the confirmed use cases.
3. Write the bundle with canonical **leading words** where they govern
   behaviour. Apply **progressive disclosure** to conditional knowledge,
   **degrees of freedom** to instruction precision, **DRY** to authority, and
   **ironic process theory** to steer language toward the intended action. The
   complete bundle expresses the confirmed contract through canonical terms;
   source provenance remains in the research evidence.
4. Follow `Validate Create or Improve`.

### Review

1. Recover the intended contract from the complete bundle, callers, host
   conventions, and representative prompts. Invoke `$elicit` only when a
   material intent decision remains unresolved. The review scope and available
   contract are explicit.
2. Read [Skill Sections](references/SECTIONS.md), run
   [scripts/validate-skill.js](scripts/validate-skill.js), inspect every bundled
   script, execute each safely isolated script, and acceptance-test the
   representative invocations. Assess the governing methodology, supporting
   concepts, predictability, composition, structure, language, resources, and
   observable postconditions while preserving the bundle and user work unchanged.
3. Return concise, prioritised findings. For each, name the governing concept,
   cite the evidence and behavioural consequence, and recommend the smallest
   effective improvement. Affirm the skill plainly when no material finding
   remains.

### Improve

1. Complete `Review`, then use **characterization testing** to fix the existing
   invocation and behaviour that should survive the change.
2. Invoke `$elicit` for material changes to intent, behaviour, invocation,
   composition, or scope. Apply already-authorised mechanical corrections, then
   use the `Create` branch's naming, structure, and language guidance to write
   the confirmed change while preserving the characterised contract.
3. Follow `Validate Create or Improve`.

### Validate Create or Improve

1. Apply **lossless compression** until every remaining word changes behaviour,
   preserves a condition, or improves navigation. Each meaning has one
   authoritative location.
2. Run [scripts/validate-skill.js](scripts/validate-skill.js) and execute each
   safely isolated bundled script until the mechanical contract passes. Report
   any script that the common isolation boundary leaves unexecuted.
3. Use **acceptance testing** to replay every confirmed invocation through its
   branches, resource pointers, and postconditions. Repeat writing, compression,
   and validation until every scenario passes.
4. Forward-test complex or high-risk skills with a fresh agent given only the
   finished bundle and a realistic request. Resolve material evidence through
   the same loop; let simple skills and thin routers finish without this extra
   test.
5. Report changed files, mechanical results, acceptance scenarios, forward-test
   evidence when used, and any remaining uncertainty.
