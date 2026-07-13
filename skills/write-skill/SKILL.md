---
name: write-skill
description: Create, review, and improve predictable, composable agent skills. Use when writing a new skill or assessing an existing skill's process, structure, or wording.
metadata:
    invocation: user
disable-model-invocation: true
---

# Write Skill

**Use-case modelling** creates, reviews, and improves skills whose process is
predictable while their context-sensitive outcomes remain open.

## Steps

1. Inspect the request, complete target bundle, discoverable callers, and host
   conventions. Select the `Create`, `Review`, or `Improve` branch from the
   user's authorised outcome.
2. Follow the selected branch.

### Create

1. Invoke `$elicit` to confirm concrete invocations, user goals, inputs,
   outputs, preconditions, main flows, branches, failure paths, composition,
   permissions, observable postconditions, and the governing approach. Once the
   use cases are clear, recall familiar established approaches, recommend one
   dominant method with its canonical author or work, and include the user's
   choice in the confirmed shared understanding. Add a named principle, theory,
   or technique only for a distinct concern; verify a recalled term when its
   precision or attribution is uncertain.
2. Choose a short verb-led name through **ubiquitous language** and an invocation
   policy whose context cost matches its expected use. Place the bundle using
   the established host convention; use `$elicit` when none is discoverable.
3. Map common-path instructions into `SKILL.md`. Add branch-specific resources
   only when an elicited use case requires them, with each resource pointer
   beside the condition that loads or uses it.
4. Write the complete bundle to the skill contract below.

### Review

1. Recover the intended contract from the full bundle, callers, host
   conventions, and representative prompts. Invoke `$elicit` only when a
   material intent decision remains unresolved.
2. Run [scripts/validate-skill.js](scripts/validate-skill.js) for mechanical
   evidence, then assess every rule below against the observable process.
3. Return concise, prioritised findings. For each, name the principle, cite the
   evidence and behavioural consequence, and recommend the smallest effective
   improvement. Affirm the skill plainly when it already meets the standard.

### Improve

1. Complete the `Review` branch, then use **characterization testing** to pin
   the existing invocation and process that should survive the change.
2. Invoke `$elicit` for material changes to intent, behaviour, invocation,
   composition, or scope. Apply mechanical corrections already authorised by
   the request.
3. Update the target and every affected caller while preserving the
   characterised contract outside the confirmed change.

### Validate Create or Improve

1. Apply **lossless compression** until each remaining word changes behaviour,
   preserves a condition, or improves navigation.
2. Run [scripts/validate-skill.js](scripts/validate-skill.js) and exercise every
   script added to the bundle until the mechanical contract passes.
3. Use **acceptance testing** to replay every elicited invocation through its
   branches, pointers, and postconditions. Repeat writing, compression, and
   validation until the latest version passes every scenario and review.
4. For complex or high-risk skills, give a fresh agent only the finished skill
   and a realistic request. Evaluate its observed process independently, then
   resolve material findings through the same loop.
5. Report created or changed files, validation evidence, acceptance scenarios,
   fresh-agent evidence when used, and any remaining uncertainty.

## Skill Contract

- Start `SKILL.md` with frontmatter containing `name`, a one-line
  `description`, `metadata.invocation`, and `disable-model-invocation`.
- Make `name` identical to its directory, at most 64 lowercase letters, digits,
  and single hyphens. Prefer a short verb-led phrase that reads naturally as
  `$skill-name` inside a request.
- Keep `description` at most 200 characters. Start with a strong action verb;
  state what the skill does in third-person, action-oriented language; front-load
  natural trigger terms; and add `Use when`, `Use for`, or `Use to` with its
  invocation conditions.
- Make user invocation the default. Select model invocation when the skill is
  expected across most relevant work and earns permanent description context.

| `metadata.invocation` | `disable-model-invocation` | `policy.allow_implicit_invocation` |
| --------------------- | -------------------------- | ---------------------------------- |
| `user`                | `true`                     | `false`                            |
| `model`               | `false`                    | `true`                             |

- Add `agents/openai.yaml` with `interface.display_name`,
  `interface.short_description`, and the matching
  `policy.allow_implicit_invocation`.
- Follow frontmatter with a human-readable H1 and one concise introductory
  paragraph that makes the governing idea and capability obvious.
- Use the fewest semantically ordered sections that make execution and
  maintenance predictable. Put genuine entry gates in `## Prerequisites`,
  executable work in `## Steps`, skill-wide invariants in `## Rules`, and a
  completed transfer in `## Handoff`. Use descriptive sections when they index
  necessary instructions more clearly.
- Number dependent work, use `###` headings for stages or branches, and use
  bullets for independent actions or checks. End every ordered step in an
  observable postcondition through **design by contract**.
- Put conditional knowledge in `references/`, output templates and static files
  in `assets/`, and deterministic repeated or fragile operations in `scripts/`.
  Link each resource inline from the step or branch that needs it.

## Rules

- **Predictability** governs quality: stabilise the process while preserving
  valid variation in outcomes.
- Choose one dominant established method that governs the process. Add a named
  principle, theory, or technique only for a distinct concern. Prefer familiar
  model knowledge, verifying a recalled term when precision matters.
- **Unix philosophy** governs boundaries: one coherent capability, independently
  invokable and composable through explicit preconditions and postconditions.
- **Leading words** recruit existing model knowledge. Bold each established
  approach where it first governs behaviour and explain only its
  context-specific adaptation. Reinvoke it later only when a branch needs the
  reminder.
- **Progressive disclosure** keeps common-path instructions in `SKILL.md` and
  moves branch-specific detail behind a contextual pointer.
- Calibrate **degrees of freedom** to fragility: exact execution for brittle
  operations, bounded choices for preferred patterns, concise principles for
  judgement-heavy work.
- **Ironic process theory** favours positive target behaviour. Pair an essential
  safety boundary with the safe action that satisfies it.
- **YAGNI** admits resources required by current use cases. A fragile operation
  may justify a deterministic script on first use; other resources earn their
  place through demonstrated need.
- **DRY** gives every meaning one authoritative location. Callers and contextual
  resource pointers reach that source instead of restating it.
- Keep a constraint used by one step beside that step. Put `## Rules`
  constraints across multiple steps or the finished output.
