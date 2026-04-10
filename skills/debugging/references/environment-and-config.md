# Environment And Config

Use this reference when the bug differs across local, CI, staging, production, tenants, deploy targets, or runtime configuration.

Run this branch when the same code behaves differently under different surroundings.

1. Diff the environments explicitly.

- Compare runtime versions, OS facts, dependency versions, feature flags, env vars, config files, secrets sources, and deployment metadata.
- Record only the differences that could affect reproduction.
- Treat missing data as a gap to close, not as proof that environments match.

2. Verify propagation across boundaries.

- Check where config is loaded, transformed, cached, injected, or overridden.
- Confirm the active value at each process, container, service, or request boundary.
- Use `references/multi-component-boundaries.md` when config crosses multiple layers.

3. Reduce the mismatch.

- Reproduce with the smallest config surface that still fails.
- Remove unrelated flags and overrides one variable at a time.
- Build one broken-vs-working comparison table in `debug.md`.

4. Trace to the first bad application of config.

- Find the last boundary where the effective value is still correct.
- Then find the first boundary where it is wrong, missing, stale, or interpreted differently.
- Record the exact transition that changed the value or environment contract.

## Rules

- Never assume local, CI, and production are comparable without evidence.
- Compare effective runtime values, not just checked-in config files.
- Keep the diagnosis focused on the first bad config or environment divergence, not the late symptom it triggers.
