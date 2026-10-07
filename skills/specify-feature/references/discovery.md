# Feature discovery

Use **goal-oriented use cases** for complete journeys and **Example Mapping** for rules, concrete examples and unresolved questions. Keep questioning within the feature boundary while exposing material details the user has not anticipated.

## Establish the desired change

Find the user's problem, beneficiary, intended outcome, current alternative and explicit exclusions. Test a foggy request with a concrete story about when the feature is used and what would count as success. Then follow the story into its rules and interactions.

For “let users cancel bookings”, clarify what cancellation changes, who can cancel, when it is allowed and the outcome of refusal. Determine whether charges, notifications or freed capacity belong in scope. Do not infer a policy from the word “cancel”.

## Follow every material path

Use these lenses to construct the decision tree, rather than asking every prompt mechanically:

- **Actors and entry:** who acts, through which supported interface, under what permissions and preconditions. Include external events and scheduled work.
- **Normal flow:** inputs, validation, defaults, rules, outputs, visibility, feedback and success.
- **State and time:** allowed and forbidden transitions, expiry, timezones, ordering, simultaneous actions and repeat execution.
- **Information:** definitions, ownership, sensitivity, lifecycle, retention and effects on existing data.
- **Adverse paths:** denial, missing or invalid input, cancellation, timeout, unavailable dependency, partial success, retries, recovery and effects that must never occur.
- **Experience and quality:** material interaction and content requirements, accessibility, operating conditions, measurable performance and compatibility.
- **Neighbours:** shared invariants, affected existing features, external contracts, migration and operations.

Vary concrete examples at boundaries and search for counterexamples. If one condition changes the result, expose the rule that governs it. If combinations matter, use a decision table. If lifecycle matters, model states and transitions. Preserve general rules alongside examples so later agents can reason beyond the examples supplied.

## Deepen consequential design

Settle a design choice here when its alternatives change acceptance, shared contracts, state ownership, safeguards, migration, verification or the dependency graph.

For an import, atomic failure versus partial success changes behaviour and later tickets. A private helper's name ordinarily does not. A concrete API contract or state table may be essential. A complete file inventory usually is not. Depth follows consequences rather than whether a detail is “technical”.

## Test the handoff

Walk the specification as a new planner. Can every trigger reach a defined result? Do examples agree with rules? Are all exits and forbidden effects covered? Can tickets share the same data and contracts without inventing policy? Are intentional exclusions and delegated coding choices clear?
