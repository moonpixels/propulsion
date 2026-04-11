![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding.

It gives coding agents a stronger workflow: explore unclear work first, write a PRD, turn it into a plan, execute in thin slices with an objective implementation-review loop, and debug from evidence instead of guesses.

## Installation

Propulsion is installed as an OpenCode plugin.

Install it for a project by adding it to that project's `opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

Or install it globally in `~/.config/opencode/opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

Optional extras, including agent-authoring helpers and extra workflow commands, are documented in [`additional/README.md`](additional/README.md).

## Acknowledgements

Propulsion is heavily inspired by:

- [obra/superpowers](https://github.com/obra/superpowers) for workflow discipline, review loops, debugging process, and OpenCode plugin ideas
- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
