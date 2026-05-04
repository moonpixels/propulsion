![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding. It gives coding agents a stronger workflow.

## Installation

### Codex CLI

Add the Propulsion marketplace:

```sh
codex plugin marketplace add moonpixels/propulsion
```

Open Codex, run `/plugins`, select the Propulsion marketplace, install
Propulsion, then restart Codex.

To update:

```sh
codex plugin marketplace upgrade propulsion
```

### Codex Desktop

Add the Propulsion marketplace with the Codex CLI:

```sh
codex plugin marketplace add moonpixels/propulsion
```

Open the desktop app's Plugins page, select the Propulsion marketplace, install
Propulsion, then restart the app.

To update:

```sh
codex plugin marketplace upgrade propulsion
```

### OpenCode

Add Propulsion to `opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

## Acknowledgements

Propulsion is heavily inspired by:

- [obra/superpowers](https://github.com/obra/superpowers) for workflow discipline, review loops, debugging process, and OpenCode plugin ideas
- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
