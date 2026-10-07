# Product discovery

Use these lenses to prepare a broad **story map** before deepening one feature.

## Find the problem and boundary

Explore the idea through the problem it solves, who experiences it, concrete situations, current alternatives and the change sought. Challenge a proposed feature that lacks a need. Distinguish confirmed intentions from evidence of demand. Consider whether a simpler product, manual process or no new software could meet the goal.

Establish users, relevant system actors, accessibility needs, channels and operating conditions. Separate product responsibilities from external systems. Distinguish required constraints from preferences, including commercial limits when they change the product.

For an existing product, inspect representative entry points, public contracts, tests, data and operations. Reconstruct actual journeys without turning every code structure or old configuration into a target requirement.

## Walk the whole lifecycle

Tell each user's journey from its trigger to value and exit. Explore setup and onboarding, recurring use, changes and cancellation, refusal, failure, recovery, support, export and retirement where relevant. Include administrator and system-initiated paths that the main user journey hides.

Ask what each activity requires the product to do. Group those responsibilities into high-level features. Then walk the map backwards to find features with no purpose and needs with no feature. A feature can support several journeys. A journey can require several features.

For example, “a place to book rooms” can expose finding availability, booking, changing or cancelling, conflict prevention, room administration and outage recovery. Confirm which belong before diving into booking fields. Authentication and notifications earn entries only when their responsibilities are needed.

## Probe shared requirements

Check what must remain true across features and implementations:

- Qualities in their actual operating context, such as accessibility, availability, responsiveness and scale.
- Data purpose, ownership, sensitivity, retention, deletion, export and residency.
- External exchanges, trust boundaries, provider limits and failure consequences.
- Security, privacy, safety and applicable obligations.
- Mandated platforms, supported clients, hosting and other hard constraints.
- Operations, observability, support, recovery and eventual retirement.

Turn “fast” or “secure” into the required response or guarantee in a concrete situation. Resolve uncertain factual obligations through evidence. Ask the user to decide intent and trade-offs.

## Keep depth deliberate

Product definition establishes the full high-level map. Feature specification settles detailed policies and consequential solution choices for selected features. Record an unresolved detail at the later level only when its alternatives leave the product boundary and high-level requirements coherent.

For room booking, establish whether fair access is required and recurring bookings belong in scope. Reserve exact duration, advance-booking and cancellation-cutoff rules for feature specification unless a product-wide mandate already fixes them.
