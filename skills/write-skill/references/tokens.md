# Token counting

Use the [counter](../scripts/count-tokens.js) to compare wording. The packaging validator already reports root and total Markdown counts.

Requires Bun. Install dependencies once from the repository root with `bun install`, or for a standalone skill:

```sh
bun install --cwd /path/to/write-skill
```

Count candidate text:

```sh
bun /path/to/write-skill/scripts/count-tokens.js --encoding o200k_base /path/to/candidate/SKILL.md
```

Keep the encoding fixed across comparisons. `o200k_base` is a comparison basis, not an exact count for every model. Use `--help` for the CLI contract.

Compare the root separately from references loaded by a scenario. Unread references cost no active context. The Markdown total describes stored text. These counts do not measure a run's messages, tools, or reasoning. Prefer fewer tokens between equally effective candidates that meet the contract and pass their scenario. No token target overrides required behaviour.
