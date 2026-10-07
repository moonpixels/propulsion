# Scenario testing

Test whether the candidate performs its confirmed contract. Packaging and behavioural checks are separate completion requirements.

## Prepare

Choose a realistic task with known inputs and an observable expected result. For a revision, include the behaviour that failed. Write the expected questions, actions, output, and stopping condition before running it. For prose or design, use concrete criteria from the user's brief rather than claiming an objective quality score.

Give a **fresh subagent** the candidate path, task request, raw inputs, necessary tools, and a separate scratch destination. Supply the context a real caller would have, rather than the author's conclusions or expected answer. Keep writes and external actions within the scenario's authorised scope.

## Exercise and inspect

Have the subagent use the candidate, including resources its instructions require. For a conversational skill, answer its questions as the scenario user and continue through the completion gate. For an authoring skill, exercise the generated skill too, so a plausible draft does not substitute for the required validation.

Inspect the actual questions, tool actions, artefacts, and resulting state:

- Did it use the required inputs and resolve missing prerequisites before dependent work?
- Did it apply the method and exhibit the intended behaviour?
- Did it produce the explicit output with required coverage?
- Did it continue while required work remained and stop at the agreed boundary?

Check actual file reads when diagnosing missed references. The agent saying it followed the skill is insufficient evidence. Run deterministic checks for mechanical output contracts and changed helpers.

## Repair and finish

Fix the instruction, pointer, or helper responsible for a failure, then rerun the affected scenario and packaging checks. Record the scenario, observed result, and material limitations in the handoff. Keep scratch artefacts and test transcripts outside the runtime bundle.

A successful scenario demonstrates that case. It does not establish universal reliability. Use additional cases when the change or a discovered failure warrants them. Comparative benchmarks and numerical scoring are not required.
