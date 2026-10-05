# Token counting

Use the [counter](../scripts/count-tokens.py) when comparing plausible wording or checking how much text a skill would load. It uses OpenAI's [tiktoken](https://github.com/openai/tiktoken), pinned to 0.14.0. Requires Python 3.9+ and [uv](https://docs.astral.sh/uv/).

```sh
uv run --script /path/to/write-skill/scripts/count-tokens.py --encoding o200k_base /path/to/candidate/SKILL.md
```

Select a named encoding explicitly and keep it fixed across comparisons. `o200k_base` is a useful comparison basis; it does not establish an exact count for every model. Pass additional UTF-8 files to report their counts separately and their sum. Omit paths or pass `-` to read stdin. Use `--help` for the CLI contract. Files are counted exactly as supplied, including frontmatter and newlines; special-token spellings are treated as ordinary text.

The command returns JSON with the encoding, tokenizer version, per-input counts, and total. Exit 0 means success, 1 means an input or tokenizer failure, and 2 means incorrect usage. Input files remain unchanged. The first run may download dependencies and the encoding vocabulary into local caches. Once cached, add `--offline` to `uv run` to prevent dependency downloads; the tokenizer vocabulary must already be cached too.

Compare the root separately from references loaded by a particular scenario. Unread references cost no active context. These are text token counts, not a measurement of an agent run's messages, tools, or reasoning. Retain the clearest wording that meets the confirmed contract and passes its scenario; use the count to choose between equally effective candidates. No token target overrides required behaviour.
