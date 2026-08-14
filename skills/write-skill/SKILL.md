---
name: write-skill
description: Creates and updates compact agent skills through confirmed behavioural contracts, evidence-backed choices, and fresh-agent evaluation. Use when authoring or revising a skill.
metadata:
    invocation: user
disable-model-invocation: true
---

# Write Skill

Creates or updates the smallest skill bundle that reliably teaches a confirmed process while leaving project-dependent results to runtime evidence and user decisions.

## Process

### 1. Establish the behavioural contract

Inspect the request, complete target bundle, direct callers and callees, and host conventions. Invoke `$elicit` to confirm the skill's purpose, trigger, required inputs, common successful path, observable result, and resource needs. Retain an exception only when representative evidence, the primary behaviour, or a necessary safety, permission, or prerequisite boundary requires it. Existing and new skills reach one explicit behavioural contract with a dominant path and only its material exceptions.

### 2. Compare governing methodologies

Use the confirmed behavioural contract as the fixed scope and decision authority for both research passes; evidence selects how to teach the confirmed behaviour. Invoke `$research` to compare credible governing methodologies and a methodology-free process until further evidence is unlikely to change the decision set. Analyse the report against the contract. Call a recommendation strong only when one option materially fits better than every credible alternative; otherwise state that no strong recommendation exists. Present the supported options, behavioural consequences, trade-offs, and recommendation strength for the user to choose. The user's selection, including no methodology, is explicit.

### 3. Select supporting concepts

Invoke `$research` to find established principles, theories, methods, or techniques that reinforce distinct concerns without competing with the selected methodology or replacing an evidence-backed absence. Analyse whether each name changes behaviour, overlaps another concept, or is more precise in plain language. Apply the same recommendation-strength rule, explain each candidate's behavioural job, and let the user decide. Zero concepts is valid; every retained concept earns a distinct role.

### 4. Confirm the design

Present one complete synthesis of the behavioural contract, selected methodology or absence, supporting concepts, structure, resources, common successful path, material exceptions, constraint levels, and observable success conditions. Obtain explicit confirmation before following the remaining process.

### 5. Write the bundle

Create or update through one path. Treat the confirmed design as closed: encode its common successful path and retained material exceptions without adding behaviour during drafting. Give every `SKILL.md` frontmatter, one H1, a concise introduction, and exactly one `## Process`; when the user selected a governing methodology, place it in bold where it fits naturally in the introduction. Bold each supporting concept at its first behaviour-governing use. Consult [Skill Sections](references/SECTIONS.md) for invocation metadata, optional sections, and resource placement. The bundle expresses the confirmed design in the fewest instructions that reliably change behaviour.

### 6. Place runtime information

Apply **progressive disclosure** to the Agent Skills loading model: keep discovery conditions in metadata, instructions required on every invocation in `SKILL.md`, and conditional detail in task-needed resources. Link every resource beside the condition that loads it. The common path remains complete without loading an irrelevant branch.

### 7. Calibrate the instructions

Apply **degrees of freedom** to each instruction and evaluation criterion. Keep project-dependent reasoning and results flexible; make required sequences, safety, permissions, fixed formats, schemas, scripts, and other fragile deterministic behaviour correspondingly exact. Give each step one coherent action and observable outcome, keep each rule in one authoritative location, state the desired action first, and pair an essential prohibition with the permitted route. Consult [Skill Craft](references/CRAFT.md) when recommendation strength, wording, structure, authority, or composition remains unclear. Every constraint is no stronger than the confirmed behaviour requires.

### 8. Validate the mechanics

Run [scripts/validate-skill.js](scripts/validate-skill.js), inspect every bundled script, and execute each within a disposable filesystem using inert fixtures, isolated credentials, and an environment incapable of external mutation. When that boundary is unavailable, leave the script unexecuted and report the limitation. The mechanical contract passes within the safe execution boundary.

### 9. Verify direct composition

Trace every direct caller and callee across trigger, supplied inputs and authority, promised result, responsibility owner, and stopping boundary. Remove overlap, omissions, contradictions, and invented obligations. Exercise the least restrictive connected path that would expose a genuine incompatibility. Direct compositions preserve the confirmed contract.

### 10. Evaluate the behaviour

Give a fresh agent only the finished bundle, a realistic request, and task-local evidence. Compare its observable process and result with the confirmed contract. Judge variable results by their correctness and suitability for the supplied evidence; inspect exact content only where the contract fixes it. Evaluate the common successful path and the smallest scenario for each retained material exception. Consult [Fresh-Agent Behavioural Evaluation](references/TESTING.md) for isolation, evidence, and repair. Repair the smallest steering cause, recompress, revalidate, and reevaluate until the contract holds.

### 11. Report the result

Return the changed files, research evidence, mechanical and composition results, behavioural-evaluation scenarios and outcomes, unexecuted scripts, and remaining uncertainty. The user receives the finished bundle and evidence that its contract holds.
