# Structure File Templates

Copy the relevant block when creating a file. Replace `{{placeholders}}`. Use Mermaid for flows, architecture, and data.

**Related:** [structure.md](structure.md) · [Cursor rules](../.cursor/rules/) · Layers and conventions: [structure.md — Directory tree](structure.md#directory-tree)

Sections marked **tbd** — required filenames in [structure.md](structure.md) and [09-validation-open-questions](../.cursor/rules/09-validation-open-questions.mdc); full bodies added later.

## Table of contents

- [Cross-cutting](#cross-cutting)
  - [open-questions.md](#open-questionsmd)
- [Main structure](#main-structure)
  - [stakeholders-and-goals.md](#stakeholders-and-goalsmd)
  - [business-scenarios.md](#business-scenariosmd)
  - [glossary.md](#glossarymd)
  - [features-list.md](#features-listmd)
  - [F##_feature-slug.md](#f_feature-slugmd)
  - [solution-strategy.md](#solution-strategymd)
  - [building-blocks.md](#building-blocksmd)
  - [runtime-views.md](#runtime-viewsmd)
- [Solution](#solution)
  - [library.md](#librarymd)
  - [mockups.md](#mockupsmd)
  - [user-journeys.md](#user-journeysmd)
  - [db-and-dfd.md](#db-and-dfdmd)
- [5-dev](#5-dev)
  - [backlog.md](#backlogmd)
  - [traceability.md](#traceabilitymd)
  - [testing-plan.md](#testing-planmd)
  - [user-manual.md](#user-manualmd)
- [Deliverables (optional)](#deliverables-optional)
  - [6-code/](#6-code)

---

<a id="open-questionsmd"></a>

## Cross-cutting

### open-questions.md

Single file at **product root** (`<product-root>/open-questions.md`). One `##` section per phase area — do **not** create `open-questions.md` inside phase folders or **Open questions** sections in feature files.

**Policy:** one row per question; **open only** — remove the row when answered and record the answer in the target doc, not here. Prefix `<a id="q-…"></a>` on the `#` cell so links like `open-questions.md#q-v01` resolve.

```markdown
# Open Questions

Unresolved items only. Link format: [Q-V01](open-questions.md#q-v01).

## Scope

| # | Question |
|---|----------|
| <a id="q-s01"></a> Q-S01 | {{question}} |

## Features

| # | Question | Feature |
|---|----------|---------|
| <a id="q-f01-01"></a> Q-F01-01 | {{question}} | [F01-{{slug}}](2-features/F01-{{slug}}.md) |

## Architecture

| # | Question |
|---|----------|
| <a id="q-a01"></a> Q-A01 | {{question}} |

## Design

| # | Question |
|---|----------|
| <a id="q-d01"></a> Q-D01 | {{question}} |

## Development

| # | Question |
|---|----------|
| <a id="q-v01"></a> Q-V01 | {{question}} |
```

| Section | ID prefix | When to use |
|---------|-----------|-------------|
| Scope | `Q-S##` | `1-scope/` gaps |
| Features | `Q-F##-##` | `2-features/` gaps — include **Feature** link |
| Architecture | `Q-A##` | `3-arch/` gaps |
| Design | `Q-D##` | `4-design/` gaps |
| Development | `Q-V##` | `5-dev/` / `6-code/` gaps |

---

## Main structure

<a id="1-scope"></a>

### stakeholders-and-goals.md

```markdown
# Stakeholders and Goals

## Stakeholders

| ID | Name | Role | Interest | Influence |
|----|------|------|----------|-----------|
| STK-01 | {{name}} | {{role}} | {{what they care about}} | High / Medium / Low |

## Goals

| ID | Goal | Success Metric | Stakeholder(s) | Priority |
|----|------|----------------|----------------|----------|
| GOL-01 | {{goal}} | {{measurable outcome}} | STK-01 | Must / Should / Could |

## Goal map

    ```mermaid
    flowchart LR
        STK["{{Stakeholder}}"] --> G1["GOL-01"]
        G1 --> SCN["SCN-…"]
        G1 --> F["F##"]
    ```

## Non-Goals

- {{explicitly out of scope}}

## Assumptions

- {{assumption}}

## Constraints

- {{constraint}}
```

---

### business-scenarios.md

```markdown
# Business Scenarios and Events

## Context and Boundary

| Actor / System | Type | Role | In / Out |
|----------------|------|------|----------|
| {{name}} | Person / Org / System | {{role}} | In / Out / Interface |

**Boundary:** {{solution scope vs external}}

## Scenarios

### SCN-01: {{scenario name}}

**Actor:** {{who}} · **Trigger:** {{what starts}} · **Goal:** {{outcome}}

**Main flow:** 1. {{step}} 2. {{step}}

**Alternate flows:** {{condition}} → {{outcome}}

**Related features:** [F01-{{feature}}](2-features/F01-{{feature}}.md)

## Business Events

| Event ID | Name | Source | Payload | Consumers |
|----------|------|--------|---------|-----------|
| EVT-01 | {{event}} | {{source}} | {{fields}} | {{consumers}} |
```

---

### glossary.md

```markdown
# Glossary

| Term | Definition | Synonyms | Used In |
|------|------------|----------|---------|
| {{Term}} | {{definition}} | {{alt}} | [F01-{{feature}}](2-features/F01-{{feature}}.md) |

## Acronyms

| Acronym | Expansion |
|---------|-----------|
| {{ABC}} | {{full form}} |
```

---

<a id="features-listmd"></a>

### features-list.md

**Generate from:** [stakeholders-and-goals.md](#stakeholders-and-goalsmd) (`GOL-##`, `STK-##`) and [business-scenarios.md](#business-scenariosmd) (`SCN-##`). Procedure: [02-features-list.mdc](../.cursor/rules/02-features-list.mdc).

```markdown
# Features List

| ID | Name | File | Traces to | Status | Summary |
|----|------|------|-----------|--------|---------|
| F01 | {{name}} | [F01-{{slug}}](2-features/F01-{{slug}}.md) | [GOL-01](stakeholders-and-goals.md#gol-01-…) | Draft | {{summary}} |
| F02 | {{name}} | [F02-{{slug}}](2-features/F02-{{slug}}.md) | [SCN-02](business-scenarios.md#scn-02-…) | Specifying | {{summary}} |

**Status:** `Draft` · `Specifying` · `Dev-ready` · `In development` · `Implemented` · `Cancelled` — transitions: [03-feature-lifecycle](../.cursor/rules/03-feature-lifecycle.mdc).

## Dependencies

    ```mermaid
    flowchart TD
        F01 --> F02
    ```


**Rules:** direct deps only; no transitive arrows; no cycles; **Requires** = hard gate for **In development** ([06-traceability](../.cursor/rules/06-traceability.mdc)).
```

---

<a id="2-features"></a>

<a id="f_feature-slugmd"></a>

### F##_feature-slug.md

Filename: `F01-user-login.md` (zero-padded ID + kebab slug).

```markdown
---
id: F01
name: {{Feature Name}}
status: Specifying   # Draft | Specifying | Dev-ready | In development | Implemented | Cancelled
priority: Must
stakeholders: [STK-01]
scenarios: [SCN-01]
requires: []
---

# F01: {{Feature Name}}

## Overview

**Intent:** {{primary outcome — name screens, blocks, key behaviours; defer later features explicitly}}

**Scope:** **In:** {{included}}. **Out:** {{excluded — name F## or scope items}}

**Trace:** [SCN-01](../1-scope/business-scenarios.md#scn-01-…), [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01); [NFR-01](../3-arch/solution-strategy.md#nfr-01) *(if applicable)*

**Blocks:** [BB-01](../3-arch/building-blocks.md#bb-01) {{role}}; [BB-02](../3-arch/building-blocks.md#bb-02) {{role}}

**Requires:** — *(or [F01](F01-{{slug}}.md))*

## Overview trace

    ```mermaid
    flowchart LR
        SCN01["SCN-01"] --> GOL01["GOL-01"]
        GOL01 --> UR["UR-F01-…"]
        BB01["BB-01"] --> F01["F01"]
    ```

## User requirements

| ID | Requirement | Parent |
|----|-------------|--------|
| UR-F01-01 | {{Actor}} can {{need}} so that {{benefit}} | [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01) |

## UR trace

    ```mermaid
    flowchart LR
        GOL01["GOL-01"] --> UR01["UR-F01-01"]
    ```

## Functional requirements

| ID | Type | Requirement | Parent | Block | Acceptance |
|----|------|-------------|--------|-------|------------|
| FR-F01-01 | functional | {{Component}} shall {{behaviour}} | UR-F01-01 | [BB-01](../3-arch/building-blocks.md#bb-01) | Given {{pre}}, when {{act}}, then {{out}} |

## FR trace

    ```mermaid
    flowchart LR
        UR01["UR-F01-01"] --> FR01["FR-F01-01"]
        FR01 --> BB01["BB-01"]
    ```

## UI flow

1. **{{Actor}}** on **{{Screen}}** — {{behaviour}} (FR-F01-01).

**Not in F01:** {{deferred UI}}

**Mockups:** [{{name}}](../4-design/mockups.md#{{anchor}})

## UI flow diagram

    ```mermaid
    sequenceDiagram
        actor User
        participant SCR as {{Screen}}
        User->>SCR: {{action}} FR-F01-01
    ```

## Runtime flow

1. **[BB-02](../3-arch/building-blocks.md#bb-02)** — {{step}} (FR-F01-01).
2. **[BB-01](../3-arch/building-blocks.md#bb-01)** — {{step}} (FR-F01-01).

Shared internals: see [building-blocks.md](../3-arch/building-blocks.md) § Level 2 — BB-01.

## Runtime diagram

    ```mermaid
    sequenceDiagram
        participant BB02 as BB-02
        participant BB01 as BB-01
        BB02->>BB01: {{intent label}} FR-F01-01
    ```

**Notable aspects:** {{auth, data, failure}}

**See also:** [RT-01](../3-arch/runtime-views.md#rt-01) *(if cross-cutting)*

## Data model

### {{EntityName}} (BB-02)

| Attribute | Type | Notes |
|-----------|------|-------|
| {{field}} | {{type}} | {{notes}} (FR-F01-01) |

**Relationships:** {{rule}}

**Full model:** [db-and-dfd.md](../4-design/db-and-dfd.md)

## Data diagram

    ```mermaid
    erDiagram
        ENTITY_A ||--o{ ENTITY_B : "{{rel}}"
    ```
```

---

<a id="3-arch"></a>

### solution-strategy.md

Follow [04-solution-strategy.mdc](../.cursor/rules/04-solution-strategy.mdc). Complete and pass the ready gate before `building-blocks.md`, `runtime-views.md`, or `db-and-dfd.md` work.

```markdown
# Solution Strategy

## Context

{{problem space}}

## Architecture Decision Records

| ID | Title | Decision | Status | Affects |
|----|-------|----------|--------|---------|
| ADR-01 | {{title}} | {{choice}} | Proposed / Accepted | BB-01, F01 |

### ADR-01: {{Title}}

**Context:** {{forces}} · **Decision:** {{choice}} · **Rationale:** {{why}}
**Consequences:** {{trade-offs}} · **Related:** [NFR-01](#nfr-01), [F01](../2-features/F01-{{slug}}.md)

## Technology Stack

| Layer | Choice | ADR |
|-------|--------|-----|
| Frontend | {{tech}} | ADR-01 |

## Non-Functional Requirements

| ID | Category | Requirement | Metric | Priority | Features |
|----|----------|-------------|--------|----------|----------|
| NFR-01 | Security | {{req}} | {{metric}} | Must | F01 |

## Quality Goals

| Priority | Goal | NFR(s) |
|----------|------|--------|
| 1 | {{goal}} | NFR-01 |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| {{risk}} | High / Med / Low | {{plan}} |
```

---

<a id="building-blocksmd"></a>

### building-blocks.md

Follow [05-architecture-docs](../.cursor/rules/05-architecture-docs.mdc). Requires [04-solution-strategy](../.cursor/rules/04-solution-strategy.mdc) ready gate. L1 lists only L1 blocks; each Level 2+ section opens one container.

```markdown
# Building Blocks

## Level 1 — Overall System

### Motivation

{{Why this decomposition}}

### Overview Diagram

    ```mermaid
    flowchart TB
      subgraph L1["L1 — {{Product}}"]
        BB01["BB-01 {{Name}} · container"]
        BB02["BB-02 {{Name}} · leaf"]
      end
      EXT["{{External}} (external)"]
      BB01 --> BB02
      BB02 --> EXT
    ```

### Building Block Summary

| ID | Level | Parent | Type | Name | Responsibility | Features |
|----|-------|--------|------|------|----------------|----------|
| BB-01 | L1 | — | container | {{Name}} | {{purpose}} | F01 |
| BB-02 | L1 | — | leaf | {{Name}} | {{purpose}} | F01 |

### BB-01: {{Block Name}}

**Level:** L1 · **Parent:** — · **Type:** container · **Children:** BB-01.1, BB-01.2

**Responsibility:** {{does / does not}}

**Features:** [F01](../2-features/F01-{{slug}}.md)

**Interfaces (provided):** {{APIs, UI}}

**Interfaces (required):** {{deps}}

**Dependencies:** BB-02

### BB-02: {{Block Name}}

**Level:** L1 · **Parent:** — · **Type:** leaf

**Responsibility:** {{purpose}} · **Interfaces:** {{…}} · **Dependencies:** —

## Level 2 — White Box: BB-01 {{Name}}

### Overview Diagram

    ```mermaid
    flowchart LR
      subgraph BB01["inside BB-01"]
        BB011["BB-01.1"]
        BB012["BB-01.2"]
      end
      BB011 --> BB012
    ```

### Building Block Summary

| ID | Level | Parent | Type | Name | Responsibility |
|----|-------|--------|------|------|----------------|
| BB-01.1 | L2 | BB-01 | leaf | {{Child}} | {{purpose}} |
| BB-01.2 | L2 | BB-01 | leaf | {{Child}} | {{purpose}} |

### BB-01.1: {{Child Name}}

**Level:** L2 · **Parent:** BB-01 · **Type:** leaf · **Responsibility:** {{purpose}} · **Dependencies:** BB-01.2

*(Add Level 3 only when ADRs or features justify — same section pattern.)*

## External Systems

| System | Role | Interface to | Features |
|--------|------|--------------|----------|
| {{External}} | {{role}} | BB-02 | F01 |

## Deployment View *(optional)*

| Block | Runtime | Notes |
|-------|---------|-------|
| BB-01 | {{device}} | {{packaging}} |

**Runtime flows:** [runtime-views.md](runtime-views.md)
```

---

<a id="runtime-viewsmd"></a>

### runtime-views.md

Follow [05-architecture-docs](../.cursor/rules/05-architecture-docs.mdc). Per-feature happy paths stay in **Runtime flow**; consolidate cross-cutting `RT-##` here only.

```markdown
# Runtime Views

## Two-layer model

| Layer | File |
|-------|------|
| Feature | `F##_*.md` → **Runtime flow** |
| Architecture | `runtime-views.md` → `RT-##` |

## What belongs here

**Include:** 2+ blocks or external; async; security; ops; shared errors. **Exclude:** UI-only → feature **UI flow**; static list → `building-blocks.md`.

## Scenario Index

| ID | Name | Category | Trigger | Features | Blocks | Notation |
|----|------|----------|---------|----------|--------|----------|
| RT-01 | {{Name}} | Use case | {{trigger}} | F01, F02 | BB-01, BB-02 | sequence |

## Use case scenarios

### RT-01: {{Scenario Name}}

**Category:** Use case · **Trigger:** {{entry}}

**Building blocks:** [BB-01](building-blocks.md#bb-01), [BB-02](building-blocks.md#bb-02)

**Features:** [F01](../2-features/F01-{{slug}}.md) · **Traces to:** [SCN-01](../1-scope/business-scenarios.md#scn-01-…), [FR-F01-01](../2-features/F01-{{slug}}.md#fr-f01-01)

#### Scenario

    ```mermaid
    sequenceDiagram
        actor User
        participant UI as BB-01
        participant API as BB-02
        User->>UI: {{intent}}
        UI->>API: {{intent}}
        API-->>UI: {{response}}
    ```

#### Notable aspects

- **Auth:** {{checkpoint}} · **Data:** {{entities}} · **Failure:** {{behaviour}}

#### Alternate / error paths

| Condition | Behaviour | Blocks |
|-----------|-----------|--------|
| {{validation fail}} | {{response}} | BB-02 |

## External interface scenarios

### RT-02: {{External Scenario}} *(stub — expand when integration exists)*

**Category:** External interface · **Trigger:** {{webhook}} · **Blocks:** BB-02, adapter · **Features:** F02

*(sequenceDiagram: external → adapter → API → store)*

## Operational scenarios

### RT-03: {{Ops scenario}} *(stub — cold start, migration, batch)*

## Error and degradation patterns

| Pattern | Trigger | Behaviour | RT-## | Blocks |
|---------|---------|-----------|-------|--------|
| Auth required | No session | Redirect login | RT-04 | BB-01, BB-02 |
| Downstream timeout | Slow external | Retry + message | RT-01 | BB-02 |

## Notation reference

| Shape | Prefer |
|-------|--------|
| API chain | `sequenceDiagram` |
| Branching | `flowchart TD` |
| Lifecycle | `stateDiagram-v2` |

**Static ↔ runtime:** new participant → update [building-blocks.md](building-blocks.md) first.
```

---

## Solution

<a id="4-design"></a>

### library.md

```markdown
# Design Library

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| {{--color-primary}} | {{#hex}} | {{usage}} |

## Components

### CMP-01: {{Component Name}}

**Purpose:** {{what}} · **Used in:** F01 · **States:** default, disabled, error

## Patterns

| Pattern | Description | Feature |
|---------|-------------|---------|
| {{pattern}} | {{when}} | F01 |
```

---

<a id="mockupsmd"></a>

### mockups.md

SVG rules: [10-design-mockups](../.cursor/rules/10-design-mockups.mdc).

```markdown
# Mockups

| ID | Screen | File | Feature(s) | Journey | Route | Status |
|----|--------|------|------------|---------|-------|--------|
| MCK-01 | {{name}} | [MCK-01-{{slug}}.svg](mockups/screens/MCK-01-{{slug}}.svg) | F01 | JRN-01 | `/{{route}}` | Draft |

## MCK-01: {{Screen Name}} {#{{anchor}}}

**Feature:** [F01-{{slug}}](../2-features/F01-{{slug}}.md) · **Components:** [CMP-01](library.md#cmp-01-…)

![MCK-01 {{name}}](mockups/screens/MCK-01-{{slug}}.svg)

**Layout (planned):**

- {{regions, CTAs, components}}
```

Use `—` in **File** when spec-only (no SVG yet).

---

<a id="user-journeysmd"></a>

### user-journeys.md

```markdown
# User Journeys

## JRN-01: {{Journey Name}} {#jrn-01-{{anchor}}}

**Persona:** {{who}} · **Goal:** {{goal}} · **Features:** F01

### Steps

| Step | Action | Feature | UI state |
|------|--------|---------|----------|
| 1 | {{action}} | F01 | [MCK-01](mockups.md#{{anchor}}) |

### Visual flow

![JRN-01](mockups/journeys/JRN-01-{{anchor}}.svg)
```

---

### db-and-dfd.md

```markdown
# Database and Data Flow

## Entity-Relationship

    ```mermaid
    erDiagram
      {{ENTITY}} ||--o{ {{OTHER}} : "{{rel}}"
    ```

## Data Flow

    ```mermaid
    flowchart LR
      UI --> API --> DB[(Database)]
    ```

## Data Dictionary

| Entity | Field | Type | Required | Description |
|--------|-------|------|----------|-------------|
| {{Entity}} | {{field}} | {{type}} | Yes | {{desc}} |
```

---

<a id="5-dev"></a>

### backlog.md

Status values: `Todo`, `In Progress`, `Done`. Keep the summary table, dependency diagram, and per-item **Dependencies** in sync (direct deps only; no cycles — same rules as [features-list](templates.md#features-listmd)). When a `BL-##` moves to `In Progress` or `Done`, set linked feature **Status** → `In development` if **Requires** gate passes; when all feature backlog items are `Done`, set feature **Status** → `Implemented` ([03-feature-lifecycle](../.cursor/rules/03-feature-lifecycle.mdc)).

```markdown
# Backlog

| ID | Feature | Title | Type | Priority | Status | Dependencies |
|----|---------|-------|------|----------|--------|--------------|
| BL-01 | F01 | {{title}} | Story | Must | Todo | — |
| BL-02 | F01 | {{title}} | Story | Must | Todo | BL-01 |
| BL-03 | F02 | {{title}} | Story | Must | In Progress | BL-02 |

## Suggested implementation order

1. BL-01
2. BL-02
3. BL-03

Respect **Dependencies** — a `BL-##` is not eligible until every listed dependency is `Done`.

## Dependency diagram

Node fill = **Status** (update `class` lines when status changes).

    ```mermaid
    flowchart TD
        BL01["BL-01 · {{short title}}"]
        BL02["BL-02 · {{short title}}"]
        BL03["BL-03 · {{short title}}"]
        BL01 --> BL02
        BL02 --> BL03

        classDef todo fill:#fef3c7,stroke:#d97706,color:#1f2937
        classDef inprogress fill:#dbeafe,stroke:#2563eb,color:#1f2937
        classDef done fill:#d1fae5,stroke:#059669,color:#1f2937

        class BL01 done
        class BL02 todo
        class BL03 inprogress
    ```

| Status | Color |
|--------|-------|
| Todo | Amber |
| In Progress | Blue |
| Done | Green |

| Item | Depends on | Notes |
|------|------------|-------|
| BL-01 | — | root |
| BL-02 | BL-01 | {{notes}} |
| BL-03 | BL-02 | {{notes}} |

**Rules:** direct deps only; no transitive arrows; no cycles; **Depends on** = hard gate for implementation order.

## BL-01: {{Title}}

**Feature:** [F01-{{slug}}](../2-features/F01-{{slug}}.md)
**Traces to:** [FR-F01-01](../2-features/F01-{{slug}}.md#fr-f01-01)
**Dependencies:** —
**Tests:** [TC-01](testing-plan.md#tc-01)
**Acceptance criteria:**
- [ ] {{verifiable against FR}}

## BL-02: {{Title}}

**Feature:** [F01-{{slug}}](../2-features/F01-{{slug}}.md)
**Traces to:** [FR-F01-02](../2-features/F01-{{slug}}.md#fr-f01-02)
**Dependencies:** BL-01
**Tests:** [TC-02](testing-plan.md#tc-02)
**Acceptance criteria:**
- [ ] {{verifiable against FR}}
```

---

<a id="traceabilitymd"></a>

### traceability.md

```markdown
# Traceability Matrix

See [06-traceability](../.cursor/rules/06-traceability.mdc).

## Matrix

| GOL | SCN | UR | FR | Feature | NFR | ADR | BL | TC |
|-----|-----|----|----|---------|-----|-----|----|----|
| GOL-01 | SCN-01 | UR-F01-01 | FR-F01-01 | F01 | NFR-01 | ADR-01 | BL-01 | TC-01 |

## By Feature

### F01: {{Name}}

| UR | FR | Backlog | Tests |
|----|----|---------|-------|
| UR-F01-01 | FR-F01-01 | BL-01 | TC-01 |
```

---

### testing-plan.md

tbd

### user-manual.md

tbd

---

<a id="deliverables-optional"></a>

## Deliverables *(optional)*

Adopt via interview only. [structure.md](structure.md) · [09-validation-open-questions](../.cursor/rules/09-validation-open-questions.mdc)

### 6-code/

tbd
