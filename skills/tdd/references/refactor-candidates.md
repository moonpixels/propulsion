# Refactor Candidates

Use this guide only after red-green is green. Refactor to remove present design pressure while preserving behaviour.

## When To Refactor

Refactor when all relevant checks are green and you can name a real improvement.

Good reasons:

- the next change is harder than it should be;
- a rule is duplicated and starting to drift;
- names hide the behaviour proven by tests;
- setup or tests are noisy because responsibilities are misplaced;
- branches or data shapes obscure the domain rule;
- a small move would reduce current risk or confusion.

Do one structural idea at a time. Stop when the current pain is removed.

## When Not To Refactor

Do not refactor when:

- tests or fallback checks are red;
- the improvement is hypothetical;
- the abstraction has one caller and no present pressure;
- you cannot describe the behaviour-preserving move;
- the code is awkward but isolated and not blocking current work;
- the refactor would expand scope beyond the requested slice.

Use YAGNI: reject abstractions for futures the code does not need today.

## Signals To Spot

### Duplicated Knowledge

Look for the same decision, validation, calculation, workflow, or domain phrase in multiple places.

Why it matters: copies drift and fixes land in only one place.

Improve it by extracting the shared rule, moving it to the owner, or introducing a small abstraction only after real call sites need it.

### Mixed Responsibilities

Look for one function or module that validates, calculates, persists, formats, and coordinates at once.

Why it matters: unrelated changes collide and tests need excessive setup.

Improve it by separating orchestration from decisions, moving behaviour to the module with the strongest reason to change, and keeping coordinators thin.

### Poor Names

Look for placeholders, abbreviations, stale names, or test names that describe mechanics instead of behaviour.

Why it matters: unclear names hide intent and make future changes slower.

Improve it by renaming variables, functions, types, files, and tests to match domain meaning.

### Long Or Tangled Flow

Look for deep nesting, repeated conditions, order-sensitive branches, or methods that require scrolling and memory.

Why it matters: bugs hide in paths readers cannot follow.

Improve it with guard clauses, extracted predicates, named steps, or split cases. Use polymorphism only after duplication makes the cases real.

### Feature Envy

Look for logic that repeatedly pulls fields from another object to make decisions for it.

Why it matters: behaviour lives away from the data it depends on.

Improve it by moving the behaviour closer to the data or replacing field chains with messages to the owner.

### Primitive Obsession

Look for strings, booleans, numbers, or loose parameter groups that repeatedly encode a domain concept.

Why it matters: validation and meaning scatter across the codebase.

Improve it with a small value object, enum, named type, or parameter object when the concept already has behaviour or repeated validation.

### Test Friction

Look for tests that need heavy setup, many mocks, private seams, or fragile assertions to prove simple behaviour.

Why it matters: test pain often exposes design pain.

Improve production design first when it has real value; do not add test-only seams.

## Safe Moves

Prefer small behaviour-preserving moves:

- rename;
- extract function or predicate;
- inline unnecessary indirection;
- move behaviour to its owner;
- split orchestration from domain rules;
- replace magic values with named concepts;
- collapse duplicated rules;
- simplify conditionals;
- replace partial mocks with realistic fakes when it improves design pressure.

Run the narrowest relevant check after each meaningful move. If a check fails, fix or revert the last refactor step before continuing.

## Filters

Use these filters before changing structure:

- DRY: remove repeated knowledge, not every repeated line.
- SOLID: improve ownership only where current design already shows pressure.
- YAGNI: do not build for imagined futures.
- Refactor-safe tests: existing tests should still prove the same behaviour after the move.
