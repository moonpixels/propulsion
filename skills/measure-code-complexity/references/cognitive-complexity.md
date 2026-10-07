# Cognitive complexity

Cognitive Complexity weights breaks in linear flow and nesting to approximate understanding burden. A straight-line function starts at 0. A nested decision costs more than the same decision at the outer level. It complements CC, which describes independent paths.

| Score | Advisory band | Meaning                                             |
| ----- | ------------- | --------------------------------------------------- |
| 0–7   | Low           | Little structural flow to hold in mind              |
| 8–15  | Moderate      | Several flow changes need attention                 |
| 16–25 | High          | Inspect nested decisions and mixed levels of detail |
| >25   | Very high     | Substantial structural reasoning burden             |

These bands are advisory heuristics. Language conventions and domain difficulty affect reading burden, so no score establishes a universal readability boundary.

**Replace Nested Conditional with Guard Clauses** can flatten rejection paths. This illustrative transformation preserves outcome and failure precedence. CC stays 3 while Cognitive Complexity falls from 3 to 2.

```ts
// Before
function offer(active: boolean, held: boolean) {
    if (active) {
        if (held) return 'held';
        return 'offer';
    }
    return 'inactive';
}

// After
function offer(active: boolean, held: boolean) {
    if (!active) return 'inactive';
    if (held) return 'held';
    return 'offer';
}
```

Also consider naming a compound condition or separating unrelated decisions. Preserve evaluation order and cleanup. A low score can still hide state, indirection or a difficult domain rule. Extract meaningful knowledge, not arbitrary chunks solely to reduce a score.
