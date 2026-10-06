# Duplication

Duplication measures repeated token spans within selected files at a minimum of 70 tokens. The report gives each observed group and source location. The summary rate is a fraction from 0 to 1 over the selected token population. It is not a percentage of duplicated lines or a repository-wide rate.

| Observation                              | Interpretation                                            |
| ---------------------------------------- | --------------------------------------------------------- |
| No detected groups                       | No repeats at this detector's span size within this scope |
| One or more groups                       | Inspect whether the locations repeat one domain decision  |
| Shared policy confirmed across locations | Changes must find and update each copy                    |
| Similar syntax with independent policies | Consolidation may create false coupling                   |

There is no universal good or bad rate. Detection depends on language, normalisation, exclusions and span size. Zero detected groups does not prove DRY.

For example, two copies of the same eligibility rule can cause **Shotgun Surgery**. Consider moving the decision to its domain owner and migrating callers together. Similar validation loops for unrelated protocols can be **incidental duplication**, where shared abstraction would couple independent change reasons.

Use **DRY** for knowledge, not visual similarity. The caller inspects authority, callers and compatibility before choosing consolidation. A smaller clone rate alone does not justify an abstraction.
