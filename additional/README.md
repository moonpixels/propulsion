# Additional OpenCode Assets

These assets are separate from the default Propulsion workflow.

They are optional skills and commands, including agent-authoring helpers and extra workflow commands, and are only included when you explicitly enable them.

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
