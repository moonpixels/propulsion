![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding.

It gives coding agents a stronger workflow: explore unclear work first, write a PRD, turn it into a plan, execute in thin slices, review objectively, and debug from evidence instead of guesses.

## Installation

Install Propulsion outside OpenCode with:

```bash
npx skills add moonpixels/propulsion
```

Install the OpenCode plugin in a project with:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

Or install it globally with:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

See `.opencode/INSTALL.md` for the OpenCode guide.

## Acknowledgements

Propulsion is heavily inspired by:

- [obra/superpowers](https://github.com/obra/superpowers) for workflow discipline, review loops, debugging process, and OpenCode plugin ideas
- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
