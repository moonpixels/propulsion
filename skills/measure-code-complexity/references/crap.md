# CRAP

Change Risk Anti-Patterns combines a method's cyclomatic complexity and automated test coverage to describe exposure when changing code. Its conventional formula uses coverage fraction `c` from 0 to 1.

```text
CRAP = CC² × (1 − c)³ + CC
```

| Score  | Advisory band   | Meaning                                                  |
| ------ | --------------- | -------------------------------------------------------- |
| <30    | Below attention | Lower combined complexity and uncovered-code exposure    |
| 30–<60 | Attention       | Inspect complexity and protection of supported behaviour |
| ≥60    | High            | Prioritise understanding the combined change exposure    |

Apply these advisory bands to method scores. Aggregate sums and file-level averages change with population size and can hide individual high scores.

At CC 10, the conventional formula gives 110 with no coverage, 22.5 with half coverage and 10 with full coverage. Full coverage leaves complexity visible. It does not prove that assertions check the right behaviour.

Producers can use different coverage definitions or formula adjustments. Interpret the reported score using its recorded provenance. Preserve the native value rather than calculating a replacement from separate measurements.

Consider whether the caller can simplify accidental complexity or improve behavioural protection within its authorised task. Testing decisions remain with the caller. Do not add tests just to lower CRAP. A score is an inspection signal, not a defect, assurance of correctness or permission to finish.
