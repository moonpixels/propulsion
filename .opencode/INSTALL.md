# OpenCode installation

Propulsion's canonical skills live in the repo root at `skills/`. OpenCode support is just the adapter in `.opencode/plugins/propulsion.ts`.

## Project installation

Add Propulsion to the `plugin` field in that project's `opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

Restart OpenCode after updating the config.

## Global installation

Add Propulsion to the `plugin` field in `~/.config/opencode/opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

## What it does

- registers the top-level Propulsion skills directory
- auto-injects the `workflow` skill once per session as the active workflow contract
- keeps the bootstrap limited to that single `workflow` skill; downstream skills are still loaded on demand

The injected `workflow` body is not passive reference text. It is the session contract that tells the agent to route work through the Propulsion lifecycle and load the detailed downstream skills only when the current stage calls for them.

Optional additional OpenCode-only skills and commands are documented separately in [`additional/README.md`](../additional/README.md).

Non-OpenCode agents should install Propulsion with:

```bash
npx skills add moonpixels/propulsion
```
