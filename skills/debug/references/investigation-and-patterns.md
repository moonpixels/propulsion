# Investigation and pattern analysis

Read during the first two phases. Use the examples to recognise a useful signal, trace the origin of bad state and select a credible comparator. Examples are illustrative, not observations from the current task.

## Build an exact oracle

An **oracle** classifies the reported failure, a pass or an inconclusive run. Choose the supported entry that reaches the defect. Reuse a focused test, CLI, HTTP request, UI flow, replay or benchmark. A temporary reproduction harness is investigation equipment. Retained tests belong to the implementation handoff.

Assert the user's actual symptom. For an export that drops its final row, assert the exact rows and order against an independent expected result. Exit zero and a non-empty file cannot catch that defect. A missing output directory is a different failure and makes the experiment inconclusive.

Tighten a slow or noisy loop by reducing unrelated setup and controlling relevant state. Preserve the conditions that make the original failure representative. Before clearing caches, resetting data or changing versions, preserve the failing state and effective configuration. A reset can remove both the symptom and the evidence.

When local reproduction is unavailable, examine the supplied capture's provenance, version, input, correlation identity, completeness and source mapping. Identify the actual transition it records. A complete trace of an invalid value and its producer can distinguish causes. An isolated crash frame or sampled hotspot usually cannot. Seek the smallest missing observation. Absence of reproduction does not establish absence of the defect.

## Trace the origin and isolate boundaries

Start at the observed wrong value, effect or decision. Follow producers, callers, prior state and controlling conditions backwards until the last valid and first invalid states are adjacent. For asynchronous work, follow event and job identities as well as stacks. Identify the responsible operation and the conditions that made it violate the intended contract.

For a path crossing components, correlate one request or datum and inspect the relevant input and output invariants. Walk a short path in order. For a large path, use trustworthy midpoint observations to retain the failing half. Missing, sampled or uncorrelated records leave a gap. Localising one component does not explain its internal cause.

Choose probes for the active uncertainty, rather than collecting undirected data.

| Question                                  | Useful observation                                             |
| ----------------------------------------- | -------------------------------------------------------------- |
| Where did this value become invalid?      | Conditional breakpoint, watchpoint or targeted data-flow trace |
| Which caller supplied it?                 | Relevant stack, event identity or producer trace               |
| Where did configuration stop propagating? | Effective value or presence at adjacent boundaries             |
| Which resource accounts for the delay?    | Matching profiler, wait trace or resource counter              |

Prefer existing telemetry and debugger facilities. Add the fewest temporary probes needed. Give owned probes a searchable tag and capture only discriminating fields. Use presence or a redacted identifier for secrets. Check whether logging, pauses or profiling changes the signal. Remove probes after the observation or record a deliberate diagnostic retention within scope.

## Compare the complete relevant pattern

Choose a working execution or implementation that promises the same property. Hold shared conditions stable and list differences in input, state, configuration, dependency version, lifecycle, ordering and code. Read the entire relevant pattern, including setup and teardown, before adapting it. Account for intentional differences. Both examples can share a defect, and apparent working behaviour may merely avoid its trigger.

Use these patterns to generate questions, not to choose a repair without evidence.

| Failure pattern                       | Investigate                                                     | Tempting symptom patch                           |
| ------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Wrong results after a cache hit       | Identity dimensions in the key, invalidation and stale state    | Filter the final response or clear every cache   |
| Duplicate side effects                | Delivery identity, registrations, retry ownership and atomicity | Add another timeout or suppress duplicate output |
| Failure after restart                 | Persisted schema, migration and effective configuration         | Delete all saved state                           |
| Incorrect output only in a full suite | Setup lifetime, test order and shared files or globals          | Retry the suite                                  |
| Old values after an update            | Snapshot ownership, closure capture and invalidation            | Refresh every consumer                           |
| Cost grows with input size            | Repeated work, fan-out, queues and the actual limiter           | Add caching or concurrency immediately           |

After demonstrating a mechanism, inspect sibling occurrences within the affected capability. Verify that each has the same contract and triggering conditions. Similar syntax alone does not establish the same defect or justify a repository-wide sweep.

## Worked example, trace before adding a guard

The contract requires each tenant to receive its own search results. Searching for the same phrase first as tenant A and then as tenant B returns A's results to B. Searching as B alone works.

```text
Original signal: A searches q, then B searches q, in one fresh process.
Expected: A gets A's rows, B gets B's rows.
Observed: both receive A's rows.

Matched checkpoints:
  HTTP identity       A / B                         correct
  Parsed tenant       A / B                         correct
  Cache lookup key    q / q                         first lost distinction
  Repository query    A on miss, no query for B      downstream consequence

Alternatives:
  Parser loses tenant identity.
  SQL omits the tenant predicate.
  Cache key omits tenant identity.
```

Compare the cached and uncached paths, including their callers. The parser observation excludes one candidate. Execute the repository path for both tenants to test the SQL alternative. Probe the cache by holding the query constant and varying tenant identity. Predict both key separation and correct returned rows. A response filter would hide the visible symptom without restoring correct cache ownership.

The minimal repair may extend the existing key or remove an unnecessary cache. Choose between them using the supported performance and sharing contracts. This is a decision for the implementation handoff after mechanism confirmation.

## Worked example, lifecycle before filesystem retries

A test writes into the source tree instead of its temporary workspace. The failing operation receives an empty directory. Its caller forwards that value from a fixture accessed before setup. The working test reads the fixture after setup.

```text
Wrong file location
  <- filesystem uses current directory for an empty path
  <- workspace operation receives an empty fixture field
  <- test captures the field during module initialisation
  <- setup assigns the temporary directory later
```

Observe the fixture value and lifecycle at both reads. The first invalid transition is premature capture, not the filesystem failure. Predict that reading the existing fixture at the correct lifecycle point changes both the argument and output location. Consider deletion of the early copied field before adding getters, retries or validators across every layer. A boundary check earns its place only if a distinct supported caller can still violate that contract.
