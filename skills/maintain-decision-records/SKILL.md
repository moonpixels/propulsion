---
name: maintain-decision-records
description: Preserve exceptional technical or architectural rationale when an accepted decision qualifies for an ADR or an existing record needs correction, supersession, or deprecation.
---

# Maintain decision records

Preserve exceptional accepted rationale in concise **architecture decision records**, retaining decision history when choices change.

## Inputs

Take the accepted decision or requested record change from the conversation or caller handoff. Separate documented rationale from inference. Code alone cannot establish why a choice was made.

## Method

1. **Check coverage.** Read relevant existing records and other durable authorities. Reuse existing coverage instead of duplicating it. When correcting or revisiting a recorded decision, read [record lifecycle](references/lifecycle.md) before changing it.
2. **Qualify new records.** Create an ADR only when **all** conditions hold: reversal has meaningful cost, the choice would surprise a future reader without context, viable alternatives created a real trade-off, and no existing durable authority already records it or is its better owner. A routine, unaccepted, or already-owned choice produces no new ADR.
3. **Establish agreement.** Require explicit user agreement to preserve the qualifying rationale. Reuse agreement from the conversation or caller handoff. Acceptance of the choice alone is insufficient. If agreement is missing, ask one direct question within the active dialogue and wait before writing. A refusal produces an explained no-record outcome.
4. **Write the content.** Invoke [$write-prose](../write-prose/SKILL.md) for ADR content, supplying the accepted decision, evidence, future-reader audience, and template or existing structure. For a new record, use [the ADR template](assets/adr-template.md) and create `docs/adr/` lazily. Use `NNNN-decision-shaped-slug.md`, starting at `0001` or one above the largest existing four-digit prefix. Preserve existing identifiers and never overwrite a sibling. Keep sections concise and record only supported rationale, necessary alternatives, material consequences, and useful reconsideration conditions.
5. **Check the result.** Read changed records back against the accepted choice, evidence, eligibility, and agreement. Verify numbering, status, and lifecycle links. Preserve unrelated records and caller-owned artefacts.

## Finish

Return created or changed paths, or why no ADR was warranted, and any missing evidence, agreement, or failed write.

**Done only when** the qualifying agreed rationale or authorised lifecycle change is written and checked, or a supported no-record outcome is reported. Missing prerequisites leave dependent maintenance incomplete.
