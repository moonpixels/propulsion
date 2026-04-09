# Additional OpenCode Assets

These are optional OpenCode-only Propulsion skills and commands, including agent-authoring helpers and extra workflow commands.

## Installation

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
