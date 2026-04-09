# Slice Completion Checklist

Mark a slice complete only after all of these are true:

- the requested behavior is implemented
- targeted verification passed
- review returned `clear`
- any review findings were fixed and re-reviewed
- the main agent updated `plan.md`

After the last slice:

- run `bun run checks`
- only then claim the full plan is complete
