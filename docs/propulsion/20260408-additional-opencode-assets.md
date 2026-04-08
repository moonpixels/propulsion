# Additional OpenCode Assets Plan

## Discovery Context

- Goal: move a set of global OpenCode skills and commands into this repo under version control while keeping them outside the normal public Propulsion install surface.
- Approved direction: store migrated assets in a top-level `additional/` directory with its own `README.md`, and expose them only when the Propulsion plugin is configured with `additional: true`.
- Existing constraints from the repo and OpenCode:
- Core Propulsion skills remain the canonical public skill set in top-level `skills/`.
- The Propulsion plugin currently always registers `skills/` and always injects the `workflow` skill once per session via `.opencode/plugins/propulsion.js`.
- OpenCode supports extra skill discovery through `config.skills.paths`, but commands are exposed through standard command directories or inline `config.command` entries.
- Additional assets to migrate: `agentic-commands`, `agentic-config`, `agentic-skills`, `agentic-subagents`, `code-review`, `pr-creation`, plus commands `commit`, `init`, `pr`, and `review`.
- Rejected options:
- Do not put these assets into top-level `skills/`; that would make them part of the normal Propulsion workflow surface.
- Do not put them under `.opencode/additional/`; the approved direction is a top-level `additional/` directory with isolated docs.
- Do not add a bootstrap toggle; workflow injection stays part of the core Propulsion plugin behavior.
- Success criteria:
- Default plugin installs behave exactly as they do today for public Propulsion skills.
- With `additional: true`, OpenCode can discover the migrated additional skills and commands.
- Additional assets are never injected into the prompt; they are available only through normal skill or command discovery.
- Install and usage instructions for additional assets live in `additional/README.md`, not in the main install docs.

## Decisions

1. Add a new top-level `additional/` directory containing only plugin-optional OpenCode assets.
2. Keep top-level `skills/` unchanged as the public Propulsion skill set.
3. Keep the plugin's workflow bootstrap behavior always on for core Propulsion.
4. Gate additional skills and commands behind a single plugin option: `additional: true|false`.
5. Expose additional skills by appending `additional/skills` to `config.skills.paths` only when `additional` is enabled.
6. Expose additional commands by reading `additional/commands/*.md`, parsing their frontmatter and body, and merging them into `config.command` only when `additional` is enabled.
7. Keep installation guidance for additional assets in `additional/README.md` so the root README and `.opencode/INSTALL.md` stay focused on the default Propulsion workflow.

## Architecture

The implementation adds a second asset surface alongside the existing public Propulsion skills.

The public surface remains unchanged:
- `skills/` continues to hold the canonical public Propulsion skills.
- `.opencode/plugins/propulsion.js` continues to register `skills/` in `config.skills.paths`.
- `.opencode/plugins/propulsion.js` continues to inject the core `workflow` skill once per session.

The new additional surface is opt-in and inert by default:
- `additional/skills/*/SKILL.md` stores the migrated OpenCode-only skills.
- `additional/commands/*.md` stores the migrated command templates.
- `additional/README.md` explains how to enable these assets through the plugin.

Plugin data flow when `additional` is enabled:
1. Resolve `additional/skills` and `additional/commands` relative to `.opencode/plugins/propulsion.js`.
2. If `additional/skills` exists, append that path to `config.skills.paths` if not already present.
3. If `additional/commands` exists, scan `*.md` files in that directory.
4. For each command file, parse YAML frontmatter and markdown body into the OpenCode `config.command[name]` shape:
- `template`: markdown body after frontmatter removal
- `description`: frontmatter `description`
- `agent`: frontmatter `agent` when present
- `model`: frontmatter `model` when present
- `subtask`: frontmatter `subtask` when present
5. Merge parsed commands into `config.command` without modifying the existing public skill bootstrap behavior.

Command parsing must stay minimal and deterministic:
- Support the frontmatter fields already used by the existing command files.
- Ignore unsupported frontmatter keys rather than inventing a wider command compiler.
- Treat the filename without `.md` as the command name.

Packaging and rollout notes:
- The repo currently has no `files` whitelist in `package.json`, so `additional/**` will be included by default in npm and git-based installs.
- Verification must still include `npm pack --dry-run` to catch any future packaging drift.
- Additional assets should preserve their current content verbatim on first migration so behavior changes come only from location and plugin discovery, not prompt rewrites.

## Repo Touch Points

- Create `additional/README.md`: isolated install and usage instructions for additional assets.
- Create `additional/skills/agentic-commands/SKILL.md`: migrated skill content.
- Create `additional/skills/agentic-commands/references/examples.md`: migrated reference content.
- Create `additional/skills/agentic-commands/references/agent-basics.md`: migrated reference content.
- Create `additional/skills/agentic-config/SKILL.md`: migrated skill content.
- Create `additional/skills/agentic-config/references/research-process.md`: migrated reference content.
- Create `additional/skills/agentic-config/references/examples.md`: migrated reference content.
- Create `additional/skills/agentic-skills/SKILL.md`: migrated skill content.
- Create `additional/skills/agentic-skills/assets/template.md`: migrated template asset.
- Create `additional/skills/agentic-skills/scripts/doctor-skill.mjs`: migrated script.
- Create `additional/skills/agentic-skills/scripts/validate-skill.mjs`: migrated script.
- Create `additional/skills/agentic-skills/references/checklist.md`: migrated reference content.
- Create `additional/skills/agentic-skills/references/examples.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/SKILL.md`: migrated skill content.
- Create `additional/skills/agentic-subagents/references/advanced.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/references/agent-files.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/references/description-routing.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/references/examples.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/references/patterns.md`: migrated reference content.
- Create `additional/skills/agentic-subagents/references/permission-recipes.md`: migrated reference content.
- Create `additional/skills/code-review/SKILL.md`: migrated skill content.
- Create `additional/skills/code-review/references/comment-template.md`: migrated reference content.
- Create `additional/skills/code-review/references/issue-schema.md`: migrated reference content.
- Create `additional/skills/code-review/references/mode-selection.md`: migrated reference content.
- Create `additional/skills/code-review/references/validation-rubric.md`: migrated reference content.
- Create `additional/skills/pr-creation/SKILL.md`: migrated skill content.
- Create `additional/skills/pr-creation/references/workflow.md`: migrated reference content.
- Create `additional/commands/commit.md`: migrated command template.
- Create `additional/commands/init.md`: migrated command template.
- Create `additional/commands/pr.md`: migrated command template.
- Create `additional/commands/review.md`: migrated command template.
- Update `.opencode/plugins/propulsion.js`: add `additional` option handling, additional skill-path registration, command-file loading, and markdown command parsing.
- Update `.opencode/INSTALL.md`: add one short pointer to `additional/README.md` for optional additional assets without expanding the default install flow.

## Execution Phases

1. Migrate files without changing behavior.
Create the full `additional/` tree and copy the approved skills, references, scripts, assets, and commands from `~/.config/opencode` into their new repo locations. Keep content unchanged on the first pass.

2. Extend plugin configuration handling.
Update `.opencode/plugins/propulsion.js` so it accepts plugin options, reads `options.additional`, and conditionally exposes `additional/skills` and `additional/commands` while preserving the current core skill registration and workflow bootstrap flow.

3. Implement markdown command loading.
Add a small internal helper in `.opencode/plugins/propulsion.js` to scan `additional/commands/*.md`, parse frontmatter and body, and map the result into `config.command`. Merge without overwriting unrelated existing config state.

4. Add isolated additional documentation.
Write `additional/README.md` with a narrow scope: what the additional assets are, which skills and commands are included, how to enable them through the plugin, and the expectation that they are discoverable but not prompt-injected.

5. Add a minimal default-install pointer.
Update `.opencode/INSTALL.md` to mention that optional additional OpenCode assets are documented separately in `additional/README.md`. Do not move main install instructions into that file or broaden the root README.

## Verification

- Confirm the plugin still exposes only the core Propulsion public skills when installed with no options.
- Confirm the plugin still injects the `workflow` skill exactly once per session after the refactor.
- Confirm `additional: true` adds `additional/skills` to `config.skills.paths` and makes these skill names available: `agentic-commands`, `agentic-config`, `agentic-skills`, `agentic-subagents`, `code-review`, `pr-creation`.
- Confirm `additional: false` leaves those additional skills undiscoverable.
- Confirm `additional: true` exposes `/commit`, `/init`, `/pr`, and `/review` as custom commands with the expected descriptions and agent metadata.
- Confirm the migrated commands execute using their original template content, including `$ARGUMENTS`, shell injections, and file references.
- Confirm additional skills are not injected into the chat prompt and only appear through the normal skill discovery mechanism.
- Run `npm pack --dry-run` from the repo root and verify `additional/**` is included in the package contents.
- Run a local OpenCode smoke test with these two configs:
- default plugin install: public Propulsion only
- plugin install with `additional: true`: public Propulsion plus additional skills and commands

## Review Points

- Review after Phase 1: verify every migrated file from `~/.config/opencode` is present under `additional/` and that no extra public-surface files were touched.
- Review after Phase 2: inspect plugin changes to confirm the default path still only registers `skills/` and that workflow injection logic was not broadened.
- Review after Phase 3: inspect command parsing and merge logic for minimal scope, deterministic behavior, and no assumptions beyond the current command frontmatter fields.
- Review after Phase 4: check that `additional/README.md` is self-contained and that root install docs remain focused on the default Propulsion workflow.
- Final review: run the verification checklist and confirm the additional surface is opt-in, discoverable through the plugin, and absent from the forced prompt bootstrap.
