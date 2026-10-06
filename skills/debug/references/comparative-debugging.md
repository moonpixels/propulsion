# Comparative Debugging

Use this reference when a credible working version, implementation, configuration, platform, tenant, request, or input can be compared with the failing case. The result is the first material divergence relevant to the defect.

## Control the comparison

State why the comparator is trustworthy for the property under investigation. Hold inputs and environment stable where possible and list intentional differences before observing internal state.

Compare external outcomes first. Then place equivalent checkpoints along both paths and narrow toward the first difference in output, state, dependency, configuration, control flow, or timing. When many differences exist, partition them or combine this technique with bisection. Reduce a differing case when a smaller comparison retains the same divergence.

## Test the divergence

Either side can be wrong, both can share a defect, and intentional or nondeterministic differences create noise. A difference therefore produces a causal candidate, not a verdict.

Record the shared conditions, relevant differences, first divergence, and why later differences are consequences rather than causes. Return to origin tracking or a controlled hypothesis experiment that introduces or removes the divergence and predicts the original signal. Stop when the first explainable divergence is found or the comparator proves unreliable.
