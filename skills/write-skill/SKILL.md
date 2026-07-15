---
name: write-skill
description: Creates and updates predictable agent skills through confirmed behavioural contracts, evidence-backed concepts, and forward testing. Use when authoring or revising a skill.
metadata:
    invocation: user
disable-model-invocation: true
---

# Write Skill

**Minimalist instruction** turns confirmed behaviours into the smallest skill bundle that reliably teaches them.

## Process

### 1. Establish the behavioural contract

Inspect the request, complete target bundle, discoverable callers, and host conventions. Invoke `$elicit` and use the **main success scenario** to confirm the skill's purpose, trigger, primary behaviour, required inputs, observable result, and resource needs. Apply **YAGNI** to speculative branches: retain an exception only when representative evidence, the primary behaviour, or a necessary safety or permission boundary requires it. Existing and new skills reach one explicit behavioural contract with a dominant thread and only its material exceptions.

### 2. Compare governing methodologies

Use the confirmed behavioural contract as the fixed scope and decision authority for both research passes; evidence selects how to teach the confirmed behaviour. Invoke `$research` to compare credible governing methodologies, then **design it twice**: continue until at least two credible options emerge or the evidence reaches saturation. Present the supported options, behavioural consequences, and recommendation for the user to choose. Offer only evidence-supported alternatives; when one methodology survives, compare it with a methodology-free process. The user's selection or evidence-backed absence is explicit.

### 3. Select supporting concepts

Invoke `$research` to find established principles, theories, methods, or techniques that reinforce distinct concerns without competing with the selected governor. Explain each candidate's intended behavioural effect and let the user decide; let the evidence determine the count. Every retained concept earns a distinct role.

### 4. Confirm the design

Present one complete synthesis of the behavioural contract, selected concepts, structure, resources, main success scenario, material exceptions, and observable success conditions. Obtain explicit confirmation before following the remaining process.

### 5. Write the bundle

Create or update through one path. Treat the confirmed design as closed: encode its main success scenario and retained material exceptions without adding new behaviour during drafting. Give every `SKILL.md` frontmatter, one H1, a concise introduction, and exactly one `## Process`; place a selected governing methodology in bold where it fits naturally in the introduction. Bold each supporting concept at its first behaviour-governing use. Consult [Skill Sections](references/SECTIONS.md) when invocation metadata, optional sections, or resource placement needs detail. The bundle expresses the confirmed design.

### 6. Separate the concerns

Apply **separation of concerns** so each step or subsection carries one coherent behavioural idea and observable outcome. Split independently actionable instructions, concepts, or completion criteria; keep sentences together when they jointly govern the same action. Consult [Skill Craft](references/CRAFT.md) when the split, vocabulary, emphasis, or disclosure boundary is unclear. Every section remains focused and substantial.

### 7. Compress the language

Apply minimalist instruction and **DRY** until every remaining word changes behaviour, preserves a condition, or improves navigation. Replace explanations with canonical leading words when the agent already knows the concept and keep each meaning in one authoritative location. Use **ironic process theory** as a salience check: state the positive target behaviour and pair an essential prohibition with the safe action that satisfies it. Consult [Skill Craft](references/CRAFT.md) when negative framing or semantic duplication remains unclear. Every remaining instruction is behaviourally necessary, authoritative, and positively framed.

### 8. Validate the mechanics

Run [scripts/validate-skill.js](scripts/validate-skill.js), inspect every bundled script, and execute each within a disposable filesystem using inert fixtures, isolated credentials, and an environment incapable of external mutation. When that boundary is unavailable, leave the script unexecuted and report the limitation. The mechanical contract passes within the safe execution boundary.

### 9. Forward-test the behaviour

Give a fresh agent only the finished bundle and a realistic main-success invocation, then compare its observable process and result with the confirmed contract. Add the smallest scenario for each retained material exception. Consult [Forward Testing](references/TESTING.md) when scenario selection, isolation, or pass evidence needs detail. Repair, recompress, revalidate, and retest until the skill reliably invokes the intended behaviour.

### 10. Report the result

Return the changed files, research evidence, mechanical results, forward-test scenarios and outcomes, unexecuted scripts, and remaining uncertainty. The user receives the finished bundle and evidence that its contract holds.
