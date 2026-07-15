# Discovery Techniques

Load only the technique needed by the active elicitation branch. These methods
support product-specific discovery; `$elicit-with-context` remains authoritative
for questioning, confirmation, language, and qualifying architecture decisions.

## Establish an existing product

Use **repository archaeology** to recover observed behaviour before asking the
user to restate it. Start with root documentation and manifests, then sample
user entry points, routes or commands, public contracts, data boundaries,
tests, and operational configuration. Follow evidence only until the major
actors and capability groups are stable. Treat absence from the repository as
unknown rather than proof, distinguish shipped behaviour from abandoned or
planned code, and present contradictions with stated intent for resolution.

## Shape the product strategy

Use the **Product Vision Board** in needs-first order after establishing the
vision:

1. State the positive change and enduring purpose.
2. Separate users, customers, and other influential actors.
3. Identify and prioritise their main needs or desired outcomes.
4. Describe the product type and the few capabilities that make it stand out.
5. Define the product or business outcomes that justify investment.

For an existing product, distinguish the observed current strategy from the
user's confirmed future strategy instead of blending them.

## Clarify users and value

When needs or differentiation remain vague, use the **Value Proposition
Canvas** one segment at a time. Ask what the actor is trying to accomplish,
which pains or risks obstruct that outcome, which gains define success, and how
the product relieves the important pains or creates the important gains. Rank
the few that materially influence adoption; preserve unsupported claims as
hypotheses.

## Trace strategic features

Use **Impact Mapping** to test each high-level capability or feature concept:

1. Why: which product or business goal does it support?
2. Who: which actor can help or hinder that goal?
3. How: what observable behaviour or outcome should change?
4. What: which capability might cause or enable that impact?

Discard an untraceable feature from the definition or record the missing link
as an open question. Keep multiple plausible capabilities as hypotheses; this
is strategic scope, not a roadmap, backlog, or implementation specification.

## Establish differentiation

Compare the product with the alternatives users employ today, including manual
work and doing nothing. Invoke `$research` when competitor capabilities,
market conditions, standards, regulation, or user evidence would materially
change the conclusion. Retain only differentiators that serve a prioritised
need and can plausibly influence choice; label the remainder as hypotheses.

## Expose product risk

Test the emerging definition against four product-discovery risks:

- **Value**: users or customers may not choose, adopt, or pay for it.
- **Usability**: users may not understand or successfully use it.
- **Feasibility**: the product may not be buildable with the available
  technology, skills, time, or constraints.
- **Viability**: it may not work for the organisation, operating model, legal
  obligations, economics, channels, or brand.

For each material risk, record the available evidence, the remaining
hypothesis, and the smallest evidence that could resolve it. The definition may
finish with uncertainty when that uncertainty is visible and actionable.
