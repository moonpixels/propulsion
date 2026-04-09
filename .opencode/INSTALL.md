# OpenCode installation

Install the Propulsion OpenCode plugin in a project or globally.

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
