# Standards assessment

Assess engineering quality independently of the ticket, specification and request. Use applicable repository instructions, documented standards, architecture decisions, supported interfaces, consumers and conventions. Local sanctioned variations govern over generic heuristics. Existing patterns alone do not justify a defect.

Read [$modular-design](../../modular-design/SKILL.md), [$test-design](../../test-design/SKILL.md) and [$code-cleanup](../../code-cleanup/SKILL.md). Apply their applicability rules and judgement within this review's read-only boundary. Do not dispatch cleanup or execute design, test-writing or implementation workflows. Load their references when the observed code needs the detailed technique.

Inspect correctness, consistency, regressions, security, privacy, reliability, modular ownership, information hiding, dependency direction, interface depth, locality, unnecessary complexity, test validity and evidence integrity. Investigate relevant specialist risks, including resource lifetime, concurrency, performance, accessibility and compatibility. Trace actual inputs to dangerous sinks or effects rather than report hypothetical misuse.

Actively seek meaningful simplifications, including duplicated rules, leaked representations, split ownership and unnecessary layers. Demonstrate the maintenance burden and narrow corrective outcome. Working code can still contain a quality defect. Keep opportunities that remove a concrete burden even without immediate behavioural failure. Leave a dedicated ambitious cleanup review to its caller.

Inspect supplied measurements in source context. A score alone is not a finding or a gate. Check what was measured and whether the evidence supports the claim. Report missing evidence instead of inventing a threshold or starting new measurement runs.
