# Additional OpenCode Assets

This directory contains plugin-optional OpenCode skills and commands that are versioned with Propulsion but are not part of the default public `skills/` surface.

These assets are ignored unless the Propulsion plugin is configured with `additional: true`.

## Included Skills

- `agentic-commands`
- `agentic-config`
- `agentic-skills`
- `agentic-subagents`
- `code-review`
- `pr-creation`

## Included Commands

- `/commit`
- `/init`
- `/pr`
- `/review`

## Enable In OpenCode

Add Propulsion to your OpenCode config with the `additional` option enabled:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": [
        [
            "propulsion@git+https://github.com/moonpixels/propulsion.git",
            {
                "additional": true
            }
        ]
    ]
}
```

## Behavior

- Core Propulsion public skills still load normally.
- Core Propulsion still bootstraps `workflow` once per session.
- Additional skills are only discoverable through normal skill loading.
- Additional commands are exposed as custom OpenCode commands.
- This directory is not used by `npx skills add moonpixels/propulsion`.

## Notes

- `additional/skills` is exposed to OpenCode through the plugin's `config.skills.paths` hook.
- `additional/commands/*.md` is parsed by the plugin and merged into `config.command` when `additional` is enabled.
- If you already define a command with the same name in your own OpenCode config, your existing command stays in place.
