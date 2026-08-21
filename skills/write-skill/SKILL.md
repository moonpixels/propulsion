---
name: write-skill
description: Creates and revises effective agent skills through confirmed requirements, minimum-sufficient design, and baseline-controlled evaluation. Use when authoring or maintaining a reusable agent skill.
disable-model-invocation: true
---

# Write Skill

Creates minimum-sufficient agent skills whose observed behaviour justifies their context and execution cost.

## Process

### 1. Confirm the contract

Inspect the request, an existing skill and its direct composition when revising, and task-scoped evidence without changing the target. Invoke `$elicit` to confirm the recurring job or capability gap; user and model triggers plus non-triggers; inputs and prerequisites; required actions, material branches, authority, and stopping boundary; expected output or handoff; direct composition; necessary resources; and observable success evidence. Keep the target unchanged until `$elicit` returns the confirmed synthesis. The authoring contract is explicit and closed.

### 2. Establish the matched baseline

Freeze one representative common-path task, harness, tools, permissions, and task-scoped inputs from the confirmed success evidence. Before designing the candidate, run isolated fresh agents:

- New skill: no skill.
- Revised skill: no skill and the current skill.

Record each result, loaded path, output, tool calls, and iterations. Design only against observed failure or excess burden. Stop when no skill fulfils the confirmed behaviour and no current-skill defect, contract change, or burden remains.

### 3. Bound one capability

Apply the **KISS principle**: retain the common path and material branches; remove speculative edge cases, unnecessary artefacts, and ceremony that cannot change the evaluated outcome. Keep coupled actions and artefacts together when they serve one outcome. Split independently useful capabilities when their trigger families, outcomes, authority, or success boundaries differ. The candidate has one coherent behavioural purpose.

Choose invocation from actual use. Make regularly useful skills model-invoked. Make occasional, deliberate, or composition-only skills user-invoked. Set `disable-model-invocation` and `agents/openai.yaml` consistently. The skill enters context only through its intended route.

### 4. Design the loading path

Use a 1-64 character lowercase name with single hyphen separators and match the directory name. Write the description as one line that starts with a third-person action verb, says what the skill does, includes `Use when`, `Use for`, or `Use to`, and front-loads natural trigger words. Add a human-readable display name and short description to `agents/openai.yaml`.

Use **progressive disclosure**:

- Put concise discovery and invocation metadata in frontmatter and `agents/openai.yaml`.
- Put every-run decisions, actions, authority, branches, and stopping conditions in `SKILL.md`.
- Link conditional detail inline at the branch that needs it.
- Put reusable output material in `assets/`.
- Put deterministic transformations and checks in `scripts/`.

Keep required coupled guidance together. Prefer direct one-level references. Remove unreachable and unlinked resources. Trace direct composition across trigger, inputs, authority, result, owner, and stopping boundary. The smallest sufficient context is reachable when needed.

### 5. Draft the isolated candidate

Create the candidate outside the requested destination. For revisions, start from the current bundle and preserve behaviour outside the confirmed change.

Use [the skill template](assets/skill-template.md). Load [the section guide](references/SECTIONS.md) only when optional sections or subsection layout are needed. Write commands, not essays:

- Use direct verbs such as _Load_, _Check_, _Run_, _Fix_, _Stop_, and _Return_.
- Give each step or subsection one coherent behavioural idea and one observable outcome.
- Use short concrete words and clear fragments; expand conditions, risks, and handoffs that compression could hide.
- State each normative meaning once. Remove filler, hedging, generic knowledge, and repeated enforcement.
- State the intended action first. Retain prohibitions only for essential safety, permission, scope, factual, or deterministic boundaries, paired with the safe action.
- Use a recognised method, principle, theory, or technique only when its canonical name replaces explanation or sharpens a decision, action, or stopping condition. Bold key concepts where they occur naturally. Remove terms that forward testing shows are decorative.
- Match **degrees of freedom** to variability and fragility. Use exact commands or scripts only when the operation requires them.
- Apply **context isolation** to every independently actionable step. Write an explicit fresh-agent step when task-scoped inputs are sufficient and main-thread context is irrelevant or could bias the result; pass only the required inputs and retain only its result. Keep shared understanding, user authority, accumulated state, and process continuity in the main thread. Name the execution boundary instead of leaving delegation optional.
- Give agents a direct result and stopping condition. Add review or feedback only in response to observable evidence, never as recurring ceremony.

The candidate contains only behaviour-changing instructions and reachable resources.

### 6. Validate and measure

Run [scripts/validate-skill.js](scripts/validate-skill.js) and [scripts/measure-context.js](scripts/measure-context.js) with Bun:

```sh
bun scripts/validate-skill.js /path/to/candidate-skill
bun scripts/measure-context.js /path/to/skill \
  --include references/loaded-reference.md \
  --output /path/to/agent-output.md
```

Fix mechanical failures. Repeat `--include` for every reference an arm loaded and `--output` for every arm output; omit unused options. Tokenize a no-skill output through an evaluated bundle and record its discovery and loaded-path cost as zero. Treat exact `o200k_base` counts as comparative evidence, not a target or quality score. Keep discovery metadata, selected path, generated output, and bundle inventory separate.

### 7. Complete the forward comparison

Run the candidate on the frozen common-path task in an isolated fresh agent with the same harness, tools, permissions, and task-scoped inputs as the recorded arms. Record its result, loaded path, agent output, tool calls, and iterations.

Give the anonymised no-skill and candidate results, plus the current-skill result for revisions, to a separate fresh evaluator with only the confirmed behaviour, expected outcome, and efficiency criteria. Require a meaningful behavioural shift over no skill; for revisions, also require preserved or improved behaviour over the current skill. Among behaviourally equivalent candidates, prefer the lower context and execution burden. The candidate's effect is independently evidenced.

### 8. Refine and publish

Change the candidate only to correct a specific evaluator failure or remove measured burden, then rerun the affected mechanical and forward checks. Stop when the candidate passes, a smaller equivalent candidate wins, or further change lacks observed justification.

Publish the passing candidate to the requested destination and rerun validation and measurement there. When the candidate is not justified, keep the existing destination unchanged and return the evidence. The published bundle is the smallest evaluated version that fulfils the confirmed contract.

## Rules

- Preserve exact technical meaning: required keywords, paths, commands, API names, error text, safety boundaries, and ordering constraints.
- Treat output tokens, tool calls, and iterations as part of skill cost. Accept extra work only when it changes the required outcome.
- Keep mechanical checks deterministic. Judge semantic force, routing language, useful concepts, and unnecessary ceremony through the forward comparison.

## Handoff

Return the destination, confirmed contract, validation result, published files, evaluator verdict, residual uncertainty, and this comparison. Use `n/a` for Current on new skills. Compare Candidate delta with No skill for creation and Current for revision; also state a revision's behavioural shift over No skill.

| Metric                                    | No skill | Current | Candidate | Candidate delta |
| ----------------------------------------- | -------- | ------- | --------- | --------------- |
| Behavioural result and evaluator evidence |          |         |           |                 |
| Discovery metadata tokens                 |          |         |           |                 |
| Loaded skill-path tokens                  |          |         |           |                 |
| Agent output tokens                       |          |         |           |                 |
| Tool calls                                |          |         |           |                 |
| Iterations                                |          |         |           |                 |
| Total measured token burden               |          |         |           |                 |
