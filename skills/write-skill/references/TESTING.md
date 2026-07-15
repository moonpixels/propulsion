# Forward Testing

Use this reference when scenario selection, context isolation, or observable
pass evidence needs more detail than the main success scenario.

## Preserve the evaluation boundary

Give the fresh agent the finished bundle and a realistic user request. Do not
provide the intended answer, design rationale, suspected failure, or prior test
output. Use an inert workspace or read-only artifacts unless the scenario needs
safe local writes. A test demonstrates transferable steering only when hidden
author context cannot supply the result.

## Select scenarios

Run the main success scenario for every created or rewritten skill. Add the
smallest scenario for a retained material exception when it distinguishes:

- an evidenced invocation that changes the required process or result;
- a necessary safety, permission, or prerequisite boundary;
- an optional reference needed by the retained exception;
- a fragile script or deterministic output contract; or
- wording whose effect depends on a leading word.

Prefer one scenario that distinguishes several competing behaviours when its
failure remains diagnosable. The scenario set contains only confirmed behaviour
or material risk rather than hypothetical combinations.

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
