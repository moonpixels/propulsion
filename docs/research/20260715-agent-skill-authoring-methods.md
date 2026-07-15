---
title: 'Agent skill authoring methods'
createdAt: 2026-07-15
updatedAt: 2026-07-15
status: superseded
supersededBy: './20260715-agent-skill-authoring-methods-2.md'
---

# Agent skill authoring methods

## Research question and scope

**Question:** Which governing methodology, supporting concepts, and bundle
structure best produce predictable, context-aware agent skills with compressed
behavioural language and progressive disclosure?

**Intended use:** Redesign Propulsion's `write-skill` workflow and its authored
skill contract.

**Scope:** Skill purpose discovery, methodology selection, information
hierarchy, language, structure, and behavioural validation. Sources were
assessed on 2026-07-15. Product-specific invocation metadata and claims about a
universal causal mechanism for leading words are excluded.

## Conclusion

**Minimalist instruction** is the strongest governor for `write-skill`. It
organises instructions around action, prior knowledge, error recovery, and the
smallest useful instructional surface rather than treating brevity as an end in
itself. **Use-case modelling**, **Design it twice**, **Separation of concerns**,
**DRY**, progressive disclosure, contracts, and evaluation-driven iteration
support distinct authoring concerns. Research should seek and compare credible
methods without forcing a methodology or supporting-concept count when the
evidence does not justify one.

## Findings

### Minimalist instruction governs the authoring workflow

John Carroll's account of minimalist instruction describes designs that use
learner initiative and prior knowledge and treat error recognition, diagnosis,
and recovery as resources rather than attempting to control every action. That
directly supports compact skills which recruit an agent's existing knowledge
while retaining explicit behavioural bounds and recovery paths. [Carroll,
“Creating Minimalist Instruction”](https://scholarworks.iu.edu/journals/index.php/ijdl/article/view/12887)

### Use cases recover behaviour before prose is written

Jacobson and Cockburn define a use case around an actor's goal and the complete
set of successful, challenged, and failure scenarios. They recommend beginning
with a sketch and adding detail when circumstances require it. This supplies the
contract-discovery method without governing the later language and information
hierarchy. [Use-Case Foundation](https://alistaircockburn.com/Use%20Case%20Foundation.pdf)

### Credible alternatives expose methodological trade-offs

Ousterhout includes **Design it twice** among the principal practices in _A
Philosophy of Software Design_. Applied here, the concept requires real
methodology alternatives rather than accepting the first plausible match. The
specific rule to continue until multiple credible candidates emerge or research
reaches saturation is an adaptation to this workflow. [Stanford CS 190 lecture
notes](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/lecture.php?topic=bookReview)

### Each section should isolate a coherent concern

Dijkstra describes separation of concerns as isolating aspects so each is small
enough to reason about yet substantial enough to deserve focused attention.
Applied to a skill, one step or subsection should carry one coherent behavioural
idea and observable outcome without fragmenting supporting sentences into
ceremonial headings. [Dijkstra, EWD
803](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803/EWD803.html)

### Progressive disclosure is an execution hierarchy

The Agent Skills specification permits optional `scripts/`, `references/`, and
`assets/` beside the required `SKILL.md`. Anthropic describes skills as using
progressive disclosure so metadata, instructions, and resources enter context
at different times, and recommends keeping core workflow in `SKILL.md` while
moving detailed or variant-specific knowledge into linked files. The inference
for Propulsion is that branch need and decision depth—not reluctance or a fixed
size threshold—should govern extraction. [Agent Skills
specification](https://agentskills.io/specification), [Anthropic skill
architecture](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills),
[Anthropic authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

### Compression requires semantic and empirical checks

The Pragmatic Programmer defines DRY as keeping each piece of knowledge in one
authoritative representation. This supports removing duplicated meanings while
allowing deliberate reuse of a compact canonical term. Anthropic's authoring
guidance recommends evaluation before and after skill changes, including tests
for triggering and instruction compliance. Together they support sentence-level
no-op review followed by context-isolated forward testing. [The Pragmatic
Programmer, DRY chapter](https://media.pragprog.com/titles/tpp20/dry.pdf),
[Anthropic authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

### Leading words remain an evidence-tested heuristic

Kojima et al. show that a short canonical phrase can substantially change model
behaviour in a bounded reasoning setting. It is an inference—not a demonstrated
universal law—that established methodology names reliably recruit equivalent
pretraining across agent tasks. Propulsion should therefore use canonical terms
to avoid restated explanations, then forward-test whether the finished wording
changes behaviour. [Kojima et al., “Large Language Models are Zero-Shot
Reasoners”](https://papers.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html)

## Conflicts

The [Matt Pocock
exemplar](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-great-skills)
treats predictability as the root virtue and allows skills made entirely from
reference, while Propulsion requires a common H1, introduction, and `## Process`
spine. [Obra's writing-skills
workflow](https://github.com/obra/superpowers/tree/main/skills/writing-skills)
makes baseline-first testing central and carries more process inline;
Anthropic's guidance favours concise core instructions, conditional references,
and evaluation-driven iteration. These are design differences rather than
factual conflicts. Propulsion adopts the fixed outer spine, conditional runtime
depth, and final forward testing confirmed by the user.

## Limitations

No primary evidence establishes an optimal leading-word vocabulary, bolding
frequency, body length, or reference granularity across Propulsion's target
models. Those choices require representative forward tests. Ousterhout's public
lecture notes establish **Design it twice** as a published practice but do not
reproduce the book chapter's full argument.

## Method

The investigation compared the current Propulsion bundle and vocabulary, Matt
Pocock's local `writing-great-skills` bundle, the public Propulsion, Matt Pocock,
and Obra exemplars, and current Agent Skills guidance. Secondary programming-book
roundups were treated only as discovery aids. Material claims were traced to
original authors, official specifications, first-party documentation, or
published research; competing structures were tested against the confirmed use
cases and context constraints on 2026-07-15.

## Primary sources

- [Creating Minimalist Instruction](https://scholarworks.iu.edu/journals/index.php/ijdl/article/view/12887) — John M. Carroll, 2014, accessed 2026-07-15; minimalist instructional design.
- [Use-Case Foundation](https://alistaircockburn.com/Use%20Case%20Foundation.pdf) — Ivar Jacobson and Alistair Cockburn, version 1.1, accessed 2026-07-15; goals, scenarios, extensions, and progressive detail.
- [Discussion of A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/lecture.php?topic=bookReview) — John Ousterhout, Stanford CS 190, 2021, accessed 2026-07-15; Design it twice.
- [EWD 803](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803/EWD803.html) — Edsger W. Dijkstra, accessed 2026-07-15; separation of concerns.
- [Agent Skills specification](https://agentskills.io/specification) — Agent Skills, accessed 2026-07-15; bundle and resource contract.
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic, accessed 2026-07-15; progressive-disclosure architecture.
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Anthropic, accessed 2026-07-15; concise instructions and evaluation.
- [The Pragmatic Programmer: DRY](https://media.pragprog.com/titles/tpp20/dry.pdf) — David Thomas and Andrew Hunt, accessed 2026-07-15; single authoritative representations.
- [Large Language Models are Zero-Shot Reasoners](https://papers.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html) — Kojima et al., NeurIPS 2022, accessed 2026-07-15; behavioural effect of a compact canonical phrase.
