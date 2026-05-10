# Refactor Candidates

Use only after red-green is green. Refactor to remove present design pressure while preserving behaviour.

## When To Refactor

Refactor when checks are green and you can name a real improvement. Good reasons:

- the next change is harder than it should be;
- a rule is duplicated and starting to drift;
- names hide the behaviour proven by tests;
- setup or tests are noisy because responsibilities are misplaced;
- branches or data shapes obscure the domain rule;
- a small move would reduce current risk or confusion.

Do one structural idea at a time; stop when current pain is removed.

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

Look for the same decision, validation, calculation, workflow, or domain phrase in multiple places. Copies drift and fixes land in one place. Improve by extracting the shared rule, moving it to the owner, or introducing a small abstraction only after real call sites need it.

### Mixed Responsibilities

Look for one function/module that validates, calculates, persists, formats, and coordinates. Unrelated changes collide and tests need excessive setup. Improve by separating orchestration from decisions, moving behaviour to the strongest owner, and keeping coordinators thin.

### Poor Names

Look for placeholders, abbreviations, stale names, or tests named for mechanics instead of behaviour. Unclear names hide intent and slow changes. Rename variables, functions, types, files, and tests to match domain meaning.

### Long Or Tangled Flow

Look for deep nesting, repeated conditions, order-sensitive branches, or methods that require scrolling. Bugs hide in unreadable paths. Improve with guard clauses, predicates, named steps, or split cases; use polymorphism only after duplication makes cases real.

### Feature Envy

Look for logic repeatedly pulling fields from another object to decide for it. Move behaviour closer to the data or replace field chains with messages to the owner.

### Primitive Obsession

Look for strings, booleans, numbers, or loose parameter groups repeatedly encoding a domain concept. Use a small value object, enum, named type, or parameter object when the concept has behaviour or repeated validation.

### Test Friction

Look for tests needing heavy setup, many mocks, private seams, or fragile assertions for simple behaviour. Test pain often exposes design pain; improve production design when valuable, not test-only seams.

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

Run the narrowest relevant check after each meaningful move. If it fails, fix or revert the last refactor step before continuing.

## Filters

Use these filters before changing structure:

- DRY: remove repeated knowledge, not every repeated line.
- SOLID: improve ownership only where current design already shows pressure.
- YAGNI: do not build for imagined futures.
- Refactor-safe tests: existing tests should still prove the same behaviour after the move.
