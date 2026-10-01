# Estimation Reference

Estimate the complexity of the agreed vertical outcome, including the implementation, verification, and rollout obligations needed to accept it. Buckets are stable, ordered comparisons, not ratios, hours, dates, or duration promises.

## Calibration rule

Choose the lowest bucket that accounts for the outcome's known behaviour and material difficulty. Raise it only for an explicit driver in the approved work or current-system evidence. A higher bucket needs evidence that the lower bucket does not describe the work.

- Treat normal traversal through UI, API, persistence, and tests as one vertical outcome, not additive complexity.
- Include routine testing at every level. Raise for difficult states, failure modes, concurrency, compatibility, or specialist quality constraints, not for test quantity alone.
- Use the established patterns and capabilities that apply. Do not estimate an imagined redesign, unknown requirement, or optional robustness.
- Resolve material scope ambiguity before estimating. Use a higher bucket for bounded implementation difficulty, not as a buffer for missing decisions or low confidence.
- Compare sibling tickets after anchoring them. Correct estimates that differ without a material difference in their drivers; do not grade the set on a curve.
- Split work above `8`. Before assigning `8`, also split any independently valuable outcome that removes a distinct risk or preserves a valid intermediate state.

## Buckets

The indicators are evidence, not a scorecard. One strong driver can matter more than several routine ones.

| Bucket | Meaning and evidence                                                                                                                                                                                                                                                              | Vertical-slice example                                                                                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`    | Routine, direct outcome using an established path. One simple rule or state, no meaningful integration or transition risk, and obvious boundary checks.                                                                                                                           | Expose an already-stored preference in the existing settings API and UI, and verify that changing it affects the existing behaviour.                                              |
| `2`    | Small bounded outcome using established patterns across the layers it needs. May add one simple data or contract change, with few predictable branches and a routine rollout.                                                                                                     | Add a new boolean email preference through persistence, the settings API and UI, delivery enforcement, and standard feature tests.                                                |
| `3`    | Moderate outcome with a new internal model or contract, several interacting rules or states, or non-trivial boundary verification. Migration or compatibility work is limited and well understood.                                                                                | Add user-owned saved searches with naming rules, persistence, CRUD through the existing API and UI, ownership checks, and boundary tests.                                         |
| `5`    | High-complexity but bounded outcome with a difficult lifecycle, integration, transition, or quality boundary. Evidence may include concurrency or idempotency, timezone or security rules, several failure paths, or substantive design judgement.                                | Deliver a daily account-summary email at a user's local time, including DST-safe scheduling, duplicate prevention, last-sent status, queued delivery, and failure-boundary tests. |
| `8`    | Exceptional coherent outcome with broad system impact or a high-risk transition that cannot be split into independently valid slices. Evidence includes several coupled hard boundaries such as live compatibility, recovery, data correction, and cross-system failure handling. | Replace a live authorisation model while API requests and workers remain active, including compatible reads and writes, backfill verification, cutover, recovery, and rollback.   |

Do not raise a bucket because the ticket touches many files, crosses several application layers, has numerous acceptance criteria, or feels large in prose. Those are consequences of a vertical slice, not complexity evidence by themselves.
