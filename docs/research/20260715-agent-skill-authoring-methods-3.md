---
title: 'Agent skill authoring methods'
createdAt: 2026-07-15
updatedAt: 2026-07-15
status: current
supersedes: './20260715-agent-skill-authoring-methods-2.md'
---

# Agent skill authoring methods

## Research question and scope

**Question:** Which governing methodology, supporting concepts, and scenario
boundary best produce predictable agent skills without diluting their primary
behaviour through speculative exceptions, and can ironic process theory support
a requirement for positive behavioural instructions during compression?

**Intended use:** Refine Propulsion's `write-skill` workflow and the skills it
creates or updates. The workflow may assess an existing bundle as evidence for
an update, but standalone skill review is outside this report's intended scope.

**Scope:** Skill purpose discovery, methodology selection, scenario admission,
information hierarchy, language, structure, update-oriented assessment, and
behavioural validation. Human thought-suppression research, original
language-model negation studies, and first-party model guidance were assessed on
2026-07-15. Product-specific invocation metadata, standalone review outputs, and
claims that human mental-control mechanisms explain transformer behaviour are
excluded.

## Conclusion

The evidence-informed design conclusion is to retain **minimalist instruction**
as the governor for `write-skill`, use the **main success scenario** as its
behavioural backbone, and apply **YAGNI** to presumptive exceptions. Propulsion
adapts these sources into a three-part admission rule: retain an exception only
when representative evidence, success of the primary behaviour, or a necessary
safety or permission boundary requires it. **Progressive disclosure** keeps rare
retained exceptions available without competing with the common path. **Design
it twice**, **separation of concerns**, and **DRY** continue to govern
methodology choice, structure, and semantic compression.

During compression, express an executable target affirmatively when that wording
preserves the contract. Retain a negative prohibition when safety, permission,
or precision makes the prohibition material, and pair it with the intended
alternative when one exists. **Ironic process theory** is credible evidence
about human mental control and a useful analogy for this preference; it is not
evidence of a transformer mechanism and cannot by itself justify an agent-skill
rule. The rule is instead a bounded engineering adaptation supported by direct,
but non-universal, evidence that language models can mishandle negation,
first-party prompting guidance, and representative forward tests.

`write-skill` creates a new skill or updates an existing one. Assessment of an
existing skill serves that update path rather than becoming a standalone review
deliverable. This is a normative Propulsion scope decision, not an empirical
finding from the cited literature.

The confirmed behavioural contract remains the fixed scope and decision
authority for methodology and supporting-concept research. Sources determine how
the skill teaches that behaviour; source-discovered possibilities do not become
new product requirements. This is a normative workflow boundary reinforced by a
forward test in which method research otherwise expanded a concise summary skill
with unrequested empty states, ambiguity rules, reversals, and compliance scope.
The confirmed design remains closed during drafting for the same reason: wording
and structure may improve its expression, while new behaviour returns to design
confirmation before entering the bundle.

## Findings

### Minimalist instruction governs the authoring workflow

John Carroll's minimalist instruction leverages learner initiative and prior
knowledge rather than controlling every action through warnings and ordered
steps. It also treats error recognition, diagnosis, and recovery as resources.
That supports a small behavioural surface which recruits an agent's existing
knowledge while retaining necessary bounds. [Carroll, “Creating Minimalist
Instruction”](https://scholarworks.iu.edu/journals/index.php/ijdl/article/view/12887)

### The main success scenario provides the behavioural backbone

Jacobson and Cockburn define the basic flow as the normal path to value, also
called the main scenario or happy path. Their use-case guidance permits starting
with a sketch, adding detail as needed, and delivering key flows before less
used or less critical ones. The adaptation for skill authoring is to make that
main scenario the dominant contract rather than treating every conceivable
alternate flow as equally instruction-worthy. [Use-Case
Foundation](https://www.ivarjacobson.com/publications/use-case-foundation)

### YAGNI filters presumptive exceptions

Martin Fowler describes YAGNI as the Extreme Programming practice of withholding
presumptive capability until it is needed because speculative support adds
complexity before its requirements are understood. Applied to skills, a
hypothetical branch is presumptive instructional capability: it should not enter
the contract merely because it can be imagined. This is an adaptation, not a
claim that YAGNI itself defines skill design. [Fowler,
“Yagni”](https://martinfowler.com/bliki/Yagni.html)

### Materiality preserves necessary exceptions

YAGNI does not justify omitting behaviour already required by the present
contract. A candidate exception remains material when a representative
invocation evidences it, the main behaviour cannot succeed without it, or a
necessary safety or permission boundary requires explicit handling. This
three-part admission rule is an inference combining present need under YAGNI
with the use-case distinction between a basic flow and less critical flows; its
safety and permission condition is a normative Propulsion boundary rather than
a sourced YAGNI rule. [Fowler,
“Yagni”](https://martinfowler.com/bliki/Yagni.html), [Use-Case
Foundation](https://www.ivarjacobson.com/publications/use-case-foundation)

### Progressive disclosure protects the common path

The Agent Skills specification permits optional `scripts/`, `references/`, and
`assets/` beside `SKILL.md`. Anthropic describes staged loading and recommends
keeping the core workflow in `SKILL.md` while moving detailed or
variant-specific knowledge into linked resources. A rare exception that passes
the materiality test can therefore remain available without inflating the main
instructions. [Agent Skills specification](https://agentskills.io/specification),
[Anthropic skill
architecture](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills),
[Anthropic authoring
guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

### Ironic process theory is human evidence, not a model mechanism

Wegner's theory proposes two human mental-control processes: a capacity-demanding
operator seeks content consistent with the intended state, while a less
demanding monitor searches for signs of failure; under reduced capacity, the
monitor can increase sensitivity to the unwanted content. The original
white-bear experiments found incomplete suppression and a later rebound, while
a specific replacement thought reduced that rebound. A 31-study meta-analysis
found rebound effects regardless of cognitive load, but immediate enhancement
during suppression only under load. This makes ironic process theory a credible,
qualified concept about human thought suppression rather than a general claim
that every negative instruction backfires. [Wegner, “Ironic Processes of Mental
Control”](https://doi.org/10.1037/0033-295X.101.1.34), [Wegner et al.,
“Paradoxical Effects of Thought
Suppression”](https://doi.org/10.1037/0022-3514.53.1.5), [Wang, Hagger, and
Chatzisarantis, “Ironic Effects of Thought Suppression: A
Meta-Analysis”](https://doi.org/10.1177/1745691619898795)

Applying that human theory to a language model would require an unsupported
assumption that transformer inference contains the theory's operator, monitor,
and capacity dynamics. Propulsion therefore uses the theory only as an analogy
that makes the positive-target preference memorable; it does not cite the theory
as the cause of model failures. This boundary is an inference from the mismatch
between the theory's stated human mechanism and the architecture under
instruction.

### Model evidence supports testing positive targets, not banning negation

Jang, Ye, and Seo tested nine NLP tasks across pretrained, instruction-tuned,
few-shot, and fine-tuned language models and found materially worse performance
on negated prompts, including an inverse scaling pattern in the tested model
families. Truong et al. likewise found insensitivity to negation and failures of
negation semantics and reasoning across GPT-Neo, GPT-3, and InstructGPT. These
are direct model findings, independent of ironic process theory, but they test
bounded benchmark transformations rather than compressed agent-skill
instructions or current models. [Jang, Ye, and Seo, “Can Large Language Models
Truly Follow your
Instructions?”](https://openreview.net/forum?id=89qDzjrWHLs), [Truong et al.,
“Language models are not
naysayers”](https://aclanthology.org/2023.starsem-1.10/)

Anthropic's current prompting guidance tells authors to specify what Claude
should do instead of only what it should not do, while the same guidance still
uses negative constraints where they precisely define boundaries. That supports
affirmative targets as a model-specific engineering practice, not a universal
causal law. Propulsion adapts the combined evidence into a compression rule:
prefer the positive executable behaviour, preserve material prohibitions, and
forward-test the exact wording. [Anthropic prompting best
practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

### Credible alternatives expose methodological trade-offs

Ousterhout includes **Design it twice** among the principal practices in _A
Philosophy of Software Design_. Propulsion infers from that practice a
requirement to compare credible methodology alternatives rather than accept the
first plausible match. [Stanford CS 190 lecture
notes](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/lecture.php?topic=bookReview)

### Structure and compression retain distinct authorities

Dijkstra's separation of concerns supports giving each skill section one
coherent behavioural idea. The Pragmatic Programmer's DRY principle supports
one authoritative expression of each meaning. Together they keep the dominant
thread legible while preventing rare retained exceptions or repeated guidance
from competing with it. [Dijkstra, EWD
803](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803/EWD803.html),
[The Pragmatic Programmer, DRY
chapter](https://media.pragprog.com/titles/tpp20/dry.pdf)

### Forward testing follows the same scenario boundary

Anthropic recommends evaluation before and after skill changes, including tests
for triggering and instruction compliance. The scenario-admission inference is
to forward-test the main success scenario first and add a scenario only for a
retained material exception. Positive and negative variants should be compared
when polarity could change the contract. This tests the finished wording rather
than treating either human psychology or a benchmark result as universally
predictive. [Anthropic authoring
guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

### Leading words remain an evidence-tested heuristic

Kojima et al. show that a short canonical phrase can substantially change model
behaviour in a bounded reasoning setting. It remains an inference, not a
universal law, that methodology names reliably recruit equivalent pretraining
across agent tasks; representative forward tests must validate the finished
wording. [Kojima et al., “Large Language Models are Zero-Shot
Reasoners”](https://papers.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html)

## Conflicts

Jacobson and Cockburn define a complete use case as including successful,
challenged, and failure paths. Propulsion deliberately applies only its main
success scenario as the authoring backbone, then admits exceptions through a
materiality test; it should not describe this narrower adaptation as exhaustive
use-case modelling. Fowler also limits YAGNI to presumptive capability and does
not use it to reject present requirements or enabling work. The safety,
permission, and primary-behaviour conditions preserve those present needs.

Ironic process theory predicts a human counterintentional effect especially
when mental capacity is reduced, but it supplies no transformer mechanism. The
model studies show negation failures without establishing Wegner's cause, while
Anthropic's own examples retain negative constraints when a prohibition is the
precise requirement. Positive phrasing is therefore a preference for an
explicit executable target, not a ban on `not`, `never`, or `avoid`.

## Limitations

No primary evidence validates the three-part material-exception threshold or a
positive-instruction requirement specifically for agent skills. The direct
model studies cover older model families and bounded negation benchmarks; they
do not establish the effect for current Propulsion hosts, long skill bundles,
tool-using agents, safety constraints, or semantically equivalent positive and
negative rewrites. First-party prompting guidance reports recommended practice
rather than a reproducible causal experiment. No primary evidence establishes
an optimal leading word, bolding frequency, body length, or reference
granularity across Propulsion's target models.

## Method

The investigation refreshed the prior 2026-07-15 snapshot after the proposed
compression rule was linked to ironic process theory and the intended
`write-skill` scope was narrowed to creation and updates. It citation-chained
from Wegner's original experiment to his theory and a later meta-analysis,
then sought original language-model negation studies and current first-party
prompting guidance. Falsification focused on whether the human mechanism had
been demonstrated in transformers, whether immediate human effects occurred
without cognitive load, and whether direct model evidence justified removing
material negative constraints. It did not. Material claims were traced to
original publications, original empirical syntheses, official specifications,
or first-party documentation; every transfer to skill authoring is labelled as
an adaptation or inference.

## Primary sources

- [Creating Minimalist Instruction](https://scholarworks.iu.edu/journals/index.php/ijdl/article/view/12887) — John M. Carroll, 2014, accessed 2026-07-15; minimalist instructional design.
- [Use-Case Foundation](https://www.ivarjacobson.com/publications/use-case-foundation) — Ivar Jacobson and Alistair Cockburn, accessed 2026-07-15; basic flow, alternate flows, and incremental detail.
- [Yagni](https://martinfowler.com/bliki/Yagni.html) — Martin Fowler, 2015, accessed 2026-07-15; presumptive capability and evolutionary design.
- [Ironic Processes of Mental Control](https://doi.org/10.1037/0033-295X.101.1.34) — Daniel M. Wegner, _Psychological Review_, 1994, accessed 2026-07-15; original human mental-control theory.
- [Paradoxical Effects of Thought Suppression](https://doi.org/10.1037/0022-3514.53.1.5) — Daniel M. Wegner et al., _Journal of Personality and Social Psychology_, 1987, accessed 2026-07-15; original white-bear experiments.
- [Ironic Effects of Thought Suppression: A Meta-Analysis](https://doi.org/10.1177/1745691619898795) — Deming Wang, Martin S. Hagger, and Nikos L. D. Chatzisarantis, _Perspectives on Psychological Science_, 2020, accessed 2026-07-15; 31-study synthesis of load, immediate enhancement, and rebound.
- [Can Large Language Models Truly Follow your Instructions?](https://openreview.net/forum?id=89qDzjrWHLs) — Joel Jang, Seonghyeon Ye, and Minjoon Seo, NeurIPS 2022 ML Safety Workshop, accessed 2026-07-15; original negated-prompt experiments.
- [Language models are not naysayers](https://aclanthology.org/2023.starsem-1.10/) — Thinh Hung Truong et al., \*SEM 2023, accessed 2026-07-15; original language-model negation evaluation.
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) — Anthropic, accessed 2026-07-15; current first-party positive-instruction guidance and counterexamples retaining precise negative constraints.
- [Discussion of A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/lecture.php?topic=bookReview) — John Ousterhout, Stanford CS 190, 2021, accessed 2026-07-15; Design it twice.
- [EWD 803](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803/EWD803.html) — Edsger W. Dijkstra, accessed 2026-07-15; separation of concerns.
- [Agent Skills specification](https://agentskills.io/specification) — Agent Skills, accessed 2026-07-15; bundle and resource contract.
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic, accessed 2026-07-15; progressive-disclosure architecture.
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Anthropic, accessed 2026-07-15; concise instructions and evaluation.
- [The Pragmatic Programmer: DRY](https://media.pragprog.com/titles/tpp20/dry.pdf) — David Thomas and Andrew Hunt, accessed 2026-07-15; single authoritative representations.
- [Large Language Models are Zero-Shot Reasoners](https://papers.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html) — Kojima et al., NeurIPS 2022; behavioural effect of a compact canonical phrase.
