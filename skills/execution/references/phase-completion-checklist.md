# Phase Completion Checklist

Use this as a quick completion reference. The authoritative review-loop and completion-gate rules stay in `skills/execution/SKILL.md`.

Mark a phase complete only after all of these are true:

- the requested behavior is implemented
- every phase acceptance criterion is checked off in `plan.md` by the main orchestrator
- implementer and reviewer evidence supports each checked-off acceptance criterion
- targeted checks passed
- review returned `clear`
- any review findings were fixed and re-reviewed
- the main agent updated `plan.md`

Keep each phase shaped as a thin vertical slice where possible.

After the last phase:

- infer and run the repo's real final checks
- only then claim the full plan is complete
