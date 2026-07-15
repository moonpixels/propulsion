---
name: write-skill
description: Creates, reviews, and rewrites predictable agent skills through confirmed behavioural contracts, evidence-backed concepts, and forward testing. Use when authoring or assessing a skill.
metadata:
    invocation: user
disable-model-invocation: true
---

# Write Skill

**Minimalist instruction** turns confirmed behaviours into the smallest skill
bundle that reliably teaches them.

## Process

### 1. Establish the behavioural contract

Inspect the request, complete target bundle, discoverable callers, and host
conventions. Invoke `$elicit` and use **use-case modelling** to confirm the
skill's purpose, intended agent behaviour, representative invocations, inputs,
outputs, prerequisites, branches, failures, composition, permissions,
postconditions, and resource needs. Existing and new skills reach the same
explicit behavioural contract.

### 2. Compare governing methodologies

Invoke `$research` to compare credible governing methodologies, then **design it
twice**: continue until at least two credible options emerge or the evidence
reaches saturation. Present the supported options, behavioural consequences,
and recommendation for the user to choose. Never manufacture a weak alternative;
when only one survives, also offer no governing methodology. The user's
selection or evidence-backed absence is explicit.

### 3. Select supporting concepts

Invoke `$research` to find established principles, theories, methods, or
techniques that reinforce distinct concerns without competing with the selected
governor. Explain each candidate's intended behavioural effect and let the user
decide; require no minimum or maximum count. Every retained concept earns a
distinct role.

### 4. Confirm the design

Present one complete synthesis of the behavioural contract, selected concepts,
structure, resources, scenarios, and observable success conditions. For an
existing skill, include concise evidence-backed findings against that contract.
Obtain explicit confirmation before following the remaining process.

### 5. Write the bundle

Create or rewrite through one path. Give every `SKILL.md` frontmatter, one H1, a
concise introduction, and exactly one `## Process`; place a selected governing
methodology in bold where it fits naturally in the introduction. Bold each
supporting concept at its first behaviour-governing use. Consult [Skill
Sections](references/SECTIONS.md) when invocation metadata, optional sections,
or resource placement needs detail. The bundle expresses the confirmed design.

### 6. Separate the concerns

Apply **separation of concerns** so each step or subsection carries one coherent
behavioural idea and observable outcome. Split independently actionable
instructions, concepts, or completion criteria; keep sentences together when
they jointly govern the same action. Consult [Skill Craft](references/CRAFT.md)
when the split, vocabulary, emphasis, or disclosure boundary is unclear. Every
section is focused without becoming fragmentary.

### 7. Compress the language

Apply minimalist instruction and **DRY** until every remaining word changes
behaviour, preserves a condition, or improves navigation. Replace explanations
with canonical leading words when the agent already knows the concept, state the
positive target behaviour, and keep each meaning in one authoritative location.
The bundle contains no behavioural no-op or duplicated meaning.

### 8. Validate the mechanics

Run [scripts/validate-skill.js](scripts/validate-skill.js), inspect every bundled
script, and execute each within a disposable filesystem using inert fixtures,
blocked external mutation, and no production credentials. When that boundary is
unavailable, leave the script unexecuted and report the limitation. The
mechanical contract passes without unsafe execution.

### 9. Forward-test the behaviour

Give a fresh agent only the finished bundle and a realistic invocation, then
compare its observable process and result with every confirmed scenario. Test
additional branches and reference-loading conditions in proportion to their
variety and risk. Consult [Forward Testing](references/TESTING.md) when scenario
selection, isolation, or pass evidence needs detail. Repair, recompress,
revalidate, and retest until the skill reliably invokes the intended behaviour.

### 10. Report the result

Return the changed files, research evidence, mechanical results, forward-test
scenarios and outcomes, unexecuted scripts, and remaining uncertainty. The user
receives the finished bundle and evidence that its contract holds.
