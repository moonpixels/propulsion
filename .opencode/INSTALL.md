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
- auto-injects the `workflow` skill once per session
- keeps the bootstrap limited to `workflow` only

Optional additional OpenCode-only skills and commands are documented separately in [`additional/README.md`](../additional/README.md).

Non-OpenCode agents should install Propulsion with:

```bash
npx skills add moonpixels/propulsion
```
