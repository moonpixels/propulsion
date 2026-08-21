# Hypothesis-Driven Experiments

Use this reference when more than one causal explanation remains. The result is one observation that changes the ranked hypothesis set.

## Form the prediction

For each plausible cause, state the mechanism and the observation it predicts. Keep a small alternative set grounded in the current evidence; a file, line, component, or recent commit without an explanation is only a location.

Choose the experiment that best partitions the credible alternatives for the least cost and risk. Prefer an invariant check, focused input change, controlled environment difference, intermediate value, or boundary observation over a repair attempt. Hold other material conditions stable.

Record:

- **Hypothesis:** the proposed causal mechanism.
- **Prediction:** the result expected if it is true and, where useful, if it is false.
- **Experiment:** the one controlled observation or intervention.
- **Result:** the exact observation, including conflicting or inconclusive data.
- **Implication:** supported, rejected, or not discriminated, plus the next ranked alternatives.

## Interpret honestly

An experiment supports only what its controls and oracle distinguish. A symptom disappearing after a code change may reflect masking, altered timing, or a bypassed path. A negative result is useful when the experiment was capable of exposing the proposed mechanism.

Remove an owned experimental change after its observation unless it becomes the separately authorised causal repair. Stop when one causal account explains the full signal and trigger conditions and proportionate alternatives have been excluded, or when the next discriminating experiment crosses a named evidence, safety, or authority boundary.
