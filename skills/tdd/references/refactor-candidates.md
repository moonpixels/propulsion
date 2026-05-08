# Refactor Candidates

Use this guide after tests are green. Refactor to make current behaviour easier to change, not to satisfy hypotheticals.

## Start Here

Refactor only when all relevant tests are passing.

Ask these gate questions before changing structure:

- Is there a present pain in the code or test suite?
- Can I describe the change without changing behaviour?
- Is this the smallest move that removes that pain?
- Will the existing tests still prove the same behaviour?
- If I stop after this step, is the code already better?

If any answer is no, do less or stop.

## Good Signals

### Duplication of meaning

The same decision, rule, or workflow appears in more than one place and the copies are drifting.

Useful moves:

- Extract a function for repeated logic.
- Move behaviour to the module that owns it.
- Introduce a small abstraction only after at least two real call sites need it.

### Long or mixed methods

A method is hard to scan, mixes decisions with orchestration, or carries too much state.

Useful moves:

- Extract helpers around named steps.
- Separate orchestration from detail.
- Name domain concepts before adding abstractions.

### Poor names

Names hide intent, use placeholders, or no longer match behaviour proven by the tests.

Useful moves:

- Rename variables, functions, types, and tests to match business meaning.

### Feature envy

Logic repeatedly reaches into another object’s data to do work that belongs there.

Useful moves:

- Move behaviour closer to the data.
- Replace field chains with messages to the owner.

### Primitive obsession

Primitives travel together, repeat validation, or encode a domain concept informally.

Useful moves:

- Introduce a small value object.
- Replace flags or magic strings with a named concept.

### Brittle conditionals

Branches are nested, repeated, order-sensitive, or awkward to extend.

Useful moves:

- Add guard clauses.
- Extract predicates.
- Split distinct cases into focused helpers.
- Use polymorphism only after real duplication appears.

### Misplaced responsibility

One unit has unrelated reasons to change, or one change forces edits in many places.

Useful moves:

- Move behaviour to the module with the strongest reason to change.
- Let coordinators coordinate and workers work.

## When Not To Refactor

Do not refactor when:

- tests are not green;
- the pain is hypothetical;
- the abstraction serves one caller only;
- you cannot explain the improvement clearly;
- the code is awkward but isolated and not blocking current work.

## DRY, SOLID, YAGNI As Filters

- DRY: remove repeated knowledge, not every repeated line.
- SOLID: improve ownership when the current design already shows pressure.
- YAGNI: reject abstractions for futures the code does not need today.

## Safe Refactor Rules

- Keep refactors behaviour-preserving.
- Change one structural idea at a time.
- Run relevant tests after each meaningful step.
- Prefer rename, extract, move, and simplify before new abstractions.
- Stop when the current pain is removed.
