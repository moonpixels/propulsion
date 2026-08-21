# Contracts and Data

## Contracts and compatibility

Name the contract, producer and consumer directions, supported versions, serialization or transport, optional and unknown-field policy, and compatibility promise. Apply existing consumer/provider tests, schema checks, golden examples, matrix runs, or real round trips to every material changed or relied-upon cell.

Confirm that examples are current, independently owned where possible, and serialized through the real boundary rather than reconstructed from the same implementation. Inspect defaulting, ordering, precision, encoding, unknown fields, errors, feature negotiation, generated clients, and changed normalisation. Record every producer, consumer, version, runtime, browser, database, or platform actually exercised and every promised cell omitted.

A clean result supports only those named examples or matrix cells. Agreement between implementations that share code or assumptions can be jointly wrong. Unchanged public syntax does not establish unchanged semantics.

Representative contrast: current and previous event examples passing supports those two payloads; it does not support all historical `v2` events or unknown downstream interpretations.

## Migration and data integrity

Identify source states, target invariants, scale and distribution assumptions, mixed-version behaviour, interruption points, and the promised rollback or forward-recovery path. Use maintained fixtures or safe representative copies containing ordinary, boundary, duplicate, null, malformed, legacy, and partially processed states that are plausible under project authority.

For each exercised state, check row and aggregate counts, identifiers, uniqueness, referential integrity, semantic values, ordering, permissions, timestamps, and other domain invariants before and after transformation. Exercise idempotent rerun or resume, constraint timing, mixed application versions, interrupted execution, and rollback or forward recovery when promised. Record engine version, transaction mode, data scale, duration, locks, warnings, and cleanup.

Never run destructive migration experiments against durable or production data without explicit authority and a safe boundary. Passing fixtures cannot represent every production distribution, invalid state, scale, lock interaction, or irreversible operational effect. When automation cannot faithfully appraise operational safety or domain meaning, also apply [Manual and Specialist QA](HUMAN-SPECIALIST.md#manual-and-specialist-qa); if unavailable, preserve the gap.

Representative contrast: a deterministic backfill over ordinary and duplicate legacy fixtures is evidence for those states; absent null and malformed fixtures leave their transformation unassessed.
