# Change Bisection

Use this reference when the same crisp property is reliably absent in one ordered state and present in another. States may be revisions, versions, configurations, datasets, or ordered inputs. The result is the smallest reliably classified transition.

## Freeze the classifier

Define one command or observation that classifies a state as good, bad, or untestable against the original signal. Confirm trustworthy endpoints before searching. A flaky, environment-sensitive, or changed classifier invalidates ordinary bisection; stabilise it or route to nondeterministic guidance first.

Test the midpoint, retain its exact state and verdict, keep the half containing the transition, and repeat. For Git history, prefer the repository's supported build and test procedure; use `git bisect run` only when the command's exit statuses faithfully encode good, bad, and untestable. Preserve the log and exit bisect state when finished.

Apply any compatibility adjustment consistently and keep it separate from the states under test. Do not discard unrelated work or rewrite a user's worktree to make historical states runnable; use an isolated worktree or disposable copy when necessary.

## Interpret the boundary

Skipped or broken states near the boundary may leave several candidate transitions. Non-monotonic behaviour or interacting changes may make the result misleading. Environment drift can cause an old state to receive the wrong verdict.

The first bad state is localisation evidence, not automatic root cause. Inspect the semantic difference and run a discriminating experiment that connects it to the causal mechanism. Stop when the transition is reliable or when the remaining untestable range is explicit.
