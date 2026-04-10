# Regression Isolation

Use this reference when a credible known-good and known-bad history window exists.

Run this branch as soon as you know the bug used to work.

1. Establish the window.

- Identify the nearest known-good and known-bad commit, build, image, config, or dependency version.
- Confirm both ends with the same reproduction when practical.
- Record the window in `debug.md` before exploring more code.

2. Turn the reproduction into a pass/fail check.

- Prefer one command, script, or probe that exits clearly.
- Keep the check narrow so the bisect result is trustworthy.
- If full automation is impossible, write the exact manual decision rule.

3. Bisect the history.

- Use binary search across commits, builds, or config revisions.
- Prefer `git bisect run` when the reproduction can be automated.
- Record the first bad revision and the comparison points that made it credible.

4. Compare the change, not just the symptom.

- Diff the first bad revision against the last good revision.
- Trace the changed code path, config propagation, or dependency behavior to the first bad state.
- If the first bad revision is only an enabler, continue tracing until the mechanism is grounded.

5. Feed the result back into the core diagnosis.

- Use the isolated window to narrow hypotheses.
- Record whether the regression came from code, config, data, dependency, or deployment drift.

## Rules

- Use regression isolation before broad code reading when a good/bad window exists.
- Do not trust a history window that was never confirmed with the same reproduction.
- The introducing revision is evidence, not the full diagnosis; still prove the first bad state.
