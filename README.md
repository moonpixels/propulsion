![Propulsion](assets/banner.png)

# Propulsion

Propulsion is a compact skill set for agentic coding workflows.

It is designed to be small enough to respect context windows, but opinionated enough to push agents toward useful behaviour: explore first, write a PRD, plan clearly, execute in tight loops, review rigorously, and debug from evidence instead of guesswork.

The goal is not to be generic prompt paste. The goal is carefully worded skills that give agents a strong direction without loading them up with unnecessary ceremony.

## Goals

- Keep skills short, triggerable, and context-window aware.
- Preserve the strongest process ideas from larger agentic workflows without dragging all of their weight into every session.
- Use crisp wording and stronger defaults, so the agent does the right thing more often with less prompting.
- Support both portable `skills.sh` installs and a first-class OpenCode plugin.

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

After installation, load the Propulsion skills by name from your agent.

## Install in OpenCode

OpenCode uses the thin adapter in `.opencode/`.

### Project installation

Add Propulsion to the `plugin` field in that project's `opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

### Global installation

Add Propulsion to the `plugin` field in `~/.config/opencode/opencode.json`:

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["propulsion@git+https://github.com/moonpixels/propulsion.git"]
}
```

The plugin exposes the top-level Propulsion skills and injects the `workflow` skill once per session as the active workflow contract.

That single bootstrapped skill tells the agent how to move through Propulsion's lifecycle: route unclear work through exploration, write and approve `docs/propulsion/{yyyymmdd}-{plan-name}/prd.md`, turn that into an approved `docs/propulsion/{yyyymmdd}-{plan-name}/plan.md`, run a reviewer-subagent loop before plan approval, execute approved plans in tight loops, send behavior-changing tasks through `tdd`, review meaningful work, and handle review feedback before calling the task done.

`workflow` owns stage order and handoffs. The main agent owns routing and approval gates; subagents do bounded work inside the current stage. Downstream skills hold the detailed methods for each stage.

See `.opencode/INSTALL.md` for the OpenCode-specific instructions.

## Acknowledgements

Propulsion is heavily inspired by:

- [obra/superpowers](https://github.com/obra/superpowers) for workflow discipline, review loops, debugging process, and OpenCode plugin ideas
- [mattpocock/skills](https://github.com/mattpocock/skills) for brevity, wording discipline, and the question-by-question discovery style
