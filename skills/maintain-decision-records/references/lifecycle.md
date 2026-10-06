# Record lifecycle

Read this when correcting or revisiting an existing ADR. Reuse the new-record eligibility and agreement rules from [the skill](../SKILL.md).

- **Correction.** Correct wording, links, or evidenced recording errors in place. Preserve the historical choice and rationale. Resolve unclear historical intent before changing its meaning.
- **Supersession.** When an accepted replacement qualifies and preservation is agreed, create the next numbered ADR. Explain the changed context and link the predecessor in the successor. Mark the predecessor `Status: Superseded by [ADR NNNN](NNNN-slug.md)`, linking to the successor. Retain its historical body and identifier.
- **Deprecation.** When confirmed intent establishes that a decision ceases to apply without an ADR successor, mark it `Status: Deprecated` and add the supported reason and any replacement authority. Retain its historical body. A proposal or contradictory current code does not establish deprecation.

Reuse prior preservation agreement for faithful corrections and confirmed lifecycle metadata updates. A new successor still needs agreement to preserve its new rationale. If a proposed successor fails the new-record gate, report why no ADR was created. Resolve whether the old decision still applies before changing its status.

Read both records back after supersession. Check reciprocal links, actual targets, status, and preserved historical rationale. On repeated invocation, reuse the existing successor instead of creating another record.
