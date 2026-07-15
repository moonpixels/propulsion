# Forward Testing

Use this reference when scenario selection, context isolation, or observable
pass evidence needs more detail than a single representative invocation.

## Preserve the evaluation boundary

Give the fresh agent the finished bundle and a realistic user request. Do not
provide the intended answer, design rationale, suspected failure, or prior test
output. Use an inert workspace or read-only artifacts unless the scenario needs
safe local writes. A test demonstrates transferable steering only when hidden
author context cannot supply the result.

## Select scenarios

Run at least one common-path invocation for every created or rewritten skill.
Add the smallest scenarios that expose each distinct risk:

- alternate and failure branches;
- optional reference-loading conditions;
- composition with another skill;
- permission or prerequisite boundaries;
- fragile scripts or deterministic output contracts; and
- wording whose effect depends on a leading word.

Prefer one scenario that distinguishes several competing behaviours when its
failure remains diagnosable.

## Define evidence

Translate the confirmed contract into observable pass conditions before reading
the result. Inspect the agent's actions, resource reads, decisions, output, and
postconditions. A plausible final answer does not pass when the skill invoked the
wrong process, loaded irrelevant context, skipped a required branch, or relied
on leaked information.

## Repair the smallest cause

Trace each failure to the smallest instruction, pointer, section boundary, or
missing resource that explains it. Repair that cause, then rerun the failed
scenario and a common-path scenario. Recompress and mechanically revalidate
after every material change.

Stop when every confirmed scenario passes or when remaining variance cannot be
reduced without changing the confirmed contract. Report unresolved variance
plainly.
