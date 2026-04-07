![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding workflows.

## Skills

- `workflow`
- `exploration`
- `planning`
- `execution`
- `tdd`
- `review`
- `review-response`
- `debugging`

## Install outside OpenCode

Use the public `skills/` directory as the source of truth:

```bash
npx skills add moonpixels/propulsion
```

After install, load the Propulsion skills by name from your agent.

## Install in OpenCode

OpenCode uses the thin adapter in `.opencode/`.

### Project installation

Add Propulsion to the `plugin` field in that project's `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "propulsion@git+https://github.com/moonpixels/propulsion.git"
  ]
}
```

### Global installation

Add Propulsion to the `plugin` field in `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "propulsion@git+https://github.com/moonpixels/propulsion.git"
  ]
}
```

The plugin exposes the top-level Propulsion skills and auto-bootstraps `workflow` once per session.

See `.opencode/INSTALL.md` for the OpenCode-specific instructions.
