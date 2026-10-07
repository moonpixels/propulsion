# Function size

**NLOC** counts non-comment source lines in a function. Formatting, language syntax and nested-function attribution can affect the count. Compare measurements with the same definition and scope.

| NLOC   | Advisory band | Meaning                                                         |
| ------ | ------------- | --------------------------------------------------------------- |
| ≤30    | Compact       | Little source to scan                                           |
| 31–60  | Substantial   | More material to retain while reading                           |
| 61–100 | Large         | Inspect whether distinct responsibilities obscure the operation |
| >100   | Very large    | Substantial source-reading burden                               |

These are local review heuristics, not language-independent quality limits. A cohesive algorithm can earn its size.

For example, a 75-line operation that decodes an invoice and separately implements carrier policy may have two change reasons. Consider separating the carrier decision. A 75-line invoice grammar may be clearer as one deep operation with private phases.

Consider deletion of dead branches, consolidation of repeated work or **Extract Function** for a complete, nameable responsibility. Preserve state, effects, ordering and the supported interface. Minifying code, deleting useful explanations or creating a chain of shallow helpers improves a count without reducing reader burden.
