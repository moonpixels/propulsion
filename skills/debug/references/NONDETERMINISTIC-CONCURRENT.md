# Nondeterministic and Concurrent Faults

Use this reference when nominally identical inputs produce different outcomes or the failure rate changes with timing, order, isolation, load, logging, randomness, clocks, network, shared state, or scheduling. The result is a controlled failure rate or a replayable causal execution, not one passing retry.

## Measure and partition

Run the exact trigger repeatedly. Record attempts, failures, seed, input, order, clock, load, resources, environment, and any captured schedule. Establish a baseline failure rate before changing code.

Vary one likely source at a time:

- replay or sweep randomness and generated inputs;
- permute test order and isolate shared files, ports, processes, or state;
- control time and wait for observable conditions rather than guessed delays;
- constrain parallelism or use a repository-supported race detector;
- capture, replay, or systematically explore schedules when tooling permits; or
- control load, resource pressure, network, filesystem, and dependency state.

Use stress or injected delay only to amplify and capture a failure. Preserve the seed, order, trace, schedule, or invariant violation that makes the execution useful.

## Interpret probability

A passing sample does not prove absence. Added sleeps, longer timeouts, logging, and reduced parallelism can hide a race without removing its cause. Race detectors and schedule explorers cover only the behaviour and nondeterminism they observe or control.

Stop reproduction when a failing execution is replayable or the measured rate is stable enough to compare discriminating experiments. Verify a repair first against the preserved failing execution, then repeat the original trigger under the same controls and report failures per attempts and remaining statistical uncertainty. Reject a repair that does not change the causal execution or measured rate as predicted.
