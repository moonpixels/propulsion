---
name: define-product
description: Discovers and maintains a durable product definition centred on high-level feature descriptions. Use when externalising a new product idea or refining an existing product.
metadata:
    invocation: user
disable-model-invocation: true
---

# Define Product

A product definition externalises product knowledge into a durable reference for later planning and development. Concise strategic framing leads into a complete catalogue of high-level features without becoming a delivery plan.

## Process

### 1. Inspect existing knowledge

Inspect the request, root `PRODUCT.md` and `CONTEXT.md`, applicable research and decisions, and the smallest representative repository evidence. Treat code and tests as evidence of current behaviour and the user as the authority on intent; surface contradictions between them. Derive available facts before questioning so the user supplies decisions and knowledge the existing material cannot establish. The known product and unresolved discovery surface are explicit.

### 2. Frame the product

Invoke `$elicit-with-context` and use the **Product Vision Board** dimensions to confirm the executive summary, vision, intended users and needs, value proposition, market position, business model, goals, success signals, pricing, boundaries, and non-goals. Invoke `$research` when external evidence could materially inform a decision about competitors, market conditions, pricing, regulation, or another product claim; keep its report authoritative and link applicable findings. When a framing dimension stalls, load only the relevant section of [Discovery Techniques](references/DISCOVERY.md). The concise product frame is user-confirmed and externally supported where material.

### 3. Map the whole product

Use **User Story Mapping's big-picture techniques** without adopting its backlog or delivery workflow. Map the product mile-wide and inch-deep: inventory the known user-facing areas and candidate features before exploring any one feature in depth. Arrange the areas as a narrative backbone following the natural user journey; place a genuinely cross-cutting feature in the smallest coherent user-facing area rather than inventing a false sequence. Include observed features, confirmed direction, and product ideas from the inspected material and the user. Load the feature-mapping guidance in [Discovery Techniques](references/DISCOVERY.md) when the product surface is difficult to expose. The whole feature surface is visible at low resolution.

### 4. Explore each feature

Work through the mapped features with `$elicit-with-context`, asking only for unresolved knowledge. For each feature, confirm its user value, high-level behaviour, meaningful boundaries, and one status: `Current` for observed product behaviour, `Confirmed direction` for intended behaviour the user has decided, or `Idea` for direction retained without commitment. Stop at the information needed for a concise feature description; leave prioritisation, sequencing, release slicing, estimates, tickets, architecture, implementation, user-story decomposition, and acceptance criteria to downstream work. Each feature is ready to become a self-contained mini-brief.

### 5. Walk the catalogue

Narrate the complete product journey area by area with the user. Correct missing, duplicate, misplaced, or contradictory features and resolve every exposed question through `$elicit-with-context`; represent genuine uncertainty through `Idea` and contextual product language rather than an unanswered-questions inventory. Obtain final confirmation of the strategic frame and complete feature catalogue. The product definition is coherent and ready to persist.

### 6. Write the product definition

After final confirmation, create or update the single root `PRODUCT.md` from the [Product Definition Template](assets/product-template.md). Write the executive summary beneath the title, then the strategic sections, followed by feature areas as `##` headings and individual features as `###` headings. Give every feature its status and concise prose covering user value, high-level behaviour, and meaningful boundaries. Present user-confirmed decisions as ordinary product prose, cite useful repository evidence for current claims, and link external claims to their research reports. Preserve canonical language from `CONTEXT.md` and one authoritative meaning for each statement. The durable document makes the product and its features easy to understand and use in later work.

### 7. Verify the definition

Verify useful `Current` claims against repository evidence, intended direction against user confirmation, `Idea` statuses against the confirmed catalogue, and external claims against linked research. Check that every mapped feature has one mini-brief, the feature order tells a coherent product story, and excluded delivery detail has stayed downstream. Reconcile the finished document with `CONTEXT.md` and applicable decisions, then return changed files, supporting research, and any limitations in repository verification. The user receives a complete product foundation ready to inform feature planning.
