---
title: 'Agent skill authoring methods'
createdAt: 2026-07-15
updatedAt: 2026-07-15
status: current
supersedes: './20260715-agent-skill-authoring-methods.md'
---

# Agent skill authoring methods

## Research question and scope

**Question:** Which governing methodology, supporting concepts, and scenario
boundary best produce predictable agent skills without diluting their primary
behaviour through speculative exceptions?

**Intended use:** Refine Propulsion's `write-skill` workflow and its authored
skill contract.

**Scope:** Skill purpose discovery, methodology selection, scenario admission,
information hierarchy, language, structure, review, and behavioural validation.
Sources were assessed on 2026-07-15. Product-specific invocation metadata and
claims about a universal causal mechanism for leading words are excluded.

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
keeping the core workflow in `SKILL.md` while moving detailed or variant-specific
knowledge into linked resources. A rare exception that passes the materiality
test can therefore remain available without inflating the main instructions.
[Agent Skills specification](https://agentskills.io/specification), [Anthropic
skill architecture](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills),
[Anthropic authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

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
retained material exception. This tests the contract rather than generating a
new inventory of hypothetical branches during evaluation. [Anthropic authoring
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

## Limitations

No primary evidence validates the three-part material-exception threshold
specifically for agent skills. It is an evidence-informed design inference that
requires forward testing. No primary evidence establishes an optimal leading
word, bolding frequency, body length, or reference granularity across
Propulsion's target models.

## Method

The investigation refreshed the prior 2026-07-15 authoring report after observed
elicitation and review behaviour showed that exhaustive scenario discovery
diluted the skill's primary thread. It compared first-party use-case definitions,
Fowler's published account of YAGNI, the current Propulsion bundle, Agent Skills
guidance, and the previously selected methods. Material claims were traced to
original authors, official specifications, first-party documentation, or
published research; adaptations to agent instruction were identified as
inferences.

## Primary sources

- [Creating Minimalist Instruction](https://scholarworks.iu.edu/journals/index.php/ijdl/article/view/12887) — John M. Carroll, 2014, accessed 2026-07-15; minimalist instructional design.
- [Use-Case Foundation](https://www.ivarjacobson.com/publications/use-case-foundation) — Ivar Jacobson and Alistair Cockburn, accessed 2026-07-15; basic flow, alternate flows, and incremental detail.
- [Yagni](https://martinfowler.com/bliki/Yagni.html) — Martin Fowler, 2015, accessed 2026-07-15; presumptive capability and evolutionary design.
- [Discussion of A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/lecture.php?topic=bookReview) — John Ousterhout, Stanford CS 190, 2021, accessed 2026-07-15; Design it twice.
- [EWD 803](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803/EWD803.html) — Edsger W. Dijkstra, accessed 2026-07-15; separation of concerns.
- [Agent Skills specification](https://agentskills.io/specification) — Agent Skills, accessed 2026-07-15; bundle and resource contract.
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic, accessed 2026-07-15; progressive-disclosure architecture.
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Anthropic, accessed 2026-07-15; concise instructions and evaluation.
- [The Pragmatic Programmer: DRY](https://media.pragprog.com/titles/tpp20/dry.pdf) — David Thomas and Andrew Hunt, accessed 2026-07-15; single authoritative representations.
- [Large Language Models are Zero-Shot Reasoners](https://papers.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html) — Kojima et al., NeurIPS 2022; behavioural effect of a compact canonical phrase.
