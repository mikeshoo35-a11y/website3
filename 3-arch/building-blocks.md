# Building Blocks

## Level 1 — Overall System

### Motivation

The MVP is a **static Next.js marketing site** (Home, About, Docs, 404) with shared shell chrome and repository-authored content ([ADR-01](solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [NFR-04](solution-strategy.md#nfr-04-static-architecture)). Decomposition separates **application hosting** (BB-01), **shared shell** (BB-02), **route page modules** (BB-03, BB-04, BB-06), **doc ingestion** (BB-06.3), and **cross-cutting presentation tokens** (BB-05) so F01–F05 map to testable units without inventing backend blocks the scope excludes.

### Overview Diagram

```mermaid
flowchart TB
  subgraph L1["L1 — AI Friendly Docs site"]
    BB01["BB-01 Marketing Web App · container"]
    BB02["BB-02 Site Shell · container"]
    BB03["BB-03 Home Page · leaf"]
    BB04["BB-04 About Page · leaf"]
    BB06["BB-06 Documentation Browser · leaf"]
    BB05["BB-05 Design System · cross-cutting"]
  end
  Vercel["Vercel CDN (external)"]
  LI["LinkedIn (external)"]
  BB01 --> BB02
  BB01 --> BB03
  BB01 --> BB04
  BB01 --> BB06
  BB02 --> BB05
  BB03 --> BB02
  BB04 --> BB02
  BB06 --> BB02
  BB06 --> BB063["BB-06.3 Doc index"]
  BB03 --> BB05
  BB04 --> BB05
  BB06 --> BB05
  BB01 --> Vercel
  BB02 --> LI
  BB04 --> LI
```

### Building Block Summary

| ID | Level | Parent | Type | Name | Responsibility | Features |
|----|-------|--------|------|------|----------------|----------|
| BB-01 | L1 | — | container | Marketing Web Application | Next.js App Router app — SSG routes, client navigation, Vercel deploy unit | F01, F02, F03, F04, F05 |
| BB-02 | L1 | — | container | Site Shell | Shared root layout, header/nav, footer frame, 404, metadata template | F01, F04, F05 |
| BB-03 | L1 | — | leaf | Home Page | `/` marketing sections — hero, benefits, how-it-works, About band | F02 |
| BB-04 | L1 | — | leaf | About Page | `/about` credibility sections — methodology, site narrative, author bio | F03 |
| BB-05 | L1 | — | cross-cutting | Design System | Tailwind tokens — light corporate theme, typography, spacing, breakpoints | F01, F02, F03, F04, F05 |
| BB-06 | L1 | — | leaf | Documentation Browser | `/docs` read-only product doc tree — sidebar navigation and markdown pane | F05 |

### BB-01: Marketing Web Application

**Level:** L1 · **Parent:** — · **Type:** container · **Children:** BB-02, BB-03, BB-04, BB-06

**Responsibility:** Hosts the Next.js App Router application — static generation of Home, About, Docs, and not-found routes at build time; client-side route transitions for nav active state and in-page anchors. Does **not** include CMS, API routes, auth, or persistent data stores.

**Features:** [F01](../2-features/F01-site-shell-layout.md), [F02](../2-features/F02-home-page.md), [F03](../2-features/F03-about-page.md), [F04](../2-features/F04-optional-linkedin-contact.md), [F05](../2-features/F05-documentation-browser.md), [F05](../2-features/F05-documentation-browser.md)

**Interfaces (provided):** HTTP static pages (`/`, `/about`, `/docs`, `/docs/*`, 404) via Vercel CDN

**Interfaces (required):** Vercel build/deploy pipeline; BB-02 shell wraps BB-03/BB-04/BB-06 page output

**Dependencies:** BB-02, BB-03, BB-04, BB-06, BB-05

### BB-02: Site Shell

**Level:** L1 · **Parent:** — · **Type:** container · **Children:** BB-02.1, BB-02.2, BB-02.3

**Responsibility:** Shared responsive chrome on every MVP route — header brand and nav, main `{children}` slot, footer frame (copyright, tagline, optional LinkedIn), semantic landmarks, 404 within shell, shared metadata template. Does **not** own Home/About marketing copy (BB-03, BB-04).

**Features:** [F01](../2-features/F01-site-shell-layout.md), [F04](../2-features/F04-optional-linkedin-contact.md), [F05](../2-features/F05-documentation-browser.md)

**Interfaces (provided):** Root layout component; `{children}` main slot for route pages; document metadata template

**Interfaces (required):** Next.js App Router layout and Metadata API; BB-05 design tokens

**Dependencies:** BB-05

### BB-03: Home Page

**Level:** L1 · **Parent:** — · **Type:** leaf

**Responsibility:** Home route (`/`) marketing content — methodology-first hero, four-card benefits grid, three-step how-it-works, soft About band, benefits anchor for in-page scroll. Static TSX-authored copy ([ADR-04](solution-strategy.md#adr-04-tsx-component-content-model)).

**Features:** [F02](../2-features/F02-home-page.md)

**Interfaces (provided):** Home page React tree rendered into BB-02 main slot

**Interfaces (required):** BB-02 root layout; BB-05 styling tokens; client anchor scroll for hero CTA

**Dependencies:** BB-02, BB-05

### BB-04: About Page

**Level:** L1 · **Parent:** — · **Type:** leaf

**Responsibility:** About route (`/about`) credibility content — page hero, methodology explanation, site-as-demo narrative, author background, subtle in-page LinkedIn link, Back to Home band. Static TSX-authored copy.

**Features:** [F03](../2-features/F03-about-page.md)

**Interfaces (provided):** About page React tree rendered into BB-02 main slot; external LinkedIn anchor in author section

**Interfaces (required):** BB-02 root layout; BB-05 styling tokens; LinkedIn profile URL (shared constant)

**Dependencies:** BB-02, BB-05

### BB-06: Documentation Browser

**Level:** L1 · **Parent:** — · **Type:** leaf · **Children:** BB-06.1, BB-06.2, BB-06.3

**Responsibility:** Docs route (`/docs`, `/docs/[...path]`) — Cursor-style folder tree for product documentation, markdown content pane with Mermaid and SVG support, in-viewer relative link navigation. Read-only; content from build-time index ([ADR-06](solution-strategy.md#adr-06-build-time-product-doc-browser)).

**Features:** [F05](../2-features/F05-documentation-browser.md)

**Interfaces (provided):** Docs page React tree in BB-02 main slot; static doc paths and assets

**Interfaces (required):** BB-02 root layout; BB-06.3 doc index; BB-05 styling tokens; markdown/Mermaid libraries

**Dependencies:** BB-02, BB-05, BB-06.3

### BB-05: Design System

**Level:** L1 · **Parent:** — · **Type:** cross-cutting

**Responsibility:** Shared Tailwind configuration and utility patterns — light corporate colour palette, typography scale, spacing rhythm, responsive breakpoints (including mobile nav threshold). Ensures shell and page modules stay visually consistent ([ADR-02](solution-strategy.md#adr-02-tailwind-css-styling), [NFR-01](solution-strategy.md#nfr-01-responsive-layout)).

**Features:** [F01](../2-features/F01-site-shell-layout.md), [F02](../2-features/F02-home-page.md), [F03](../2-features/F03-about-page.md), [F04](../2-features/F04-optional-linkedin-contact.md), [F05](../2-features/F05-documentation-browser.md)

**Interfaces (provided):** Tailwind theme tokens and shared component styling conventions

**Interfaces (required):** Tailwind CSS build integration in Next.js

**Dependencies:** —

## Level 2 — White Box: BB-02 Site Shell

### Overview Diagram

```mermaid
flowchart LR
  subgraph BB02["inside BB-02"]
    BB021["BB-02.1 Root Layout & Metadata"]
    BB022["BB-02.2 Header & Navigation"]
    BB023["BB-02.3 Footer Frame"]
  end
  BB021 --> BB022
  BB021 --> BB023
  BB022 --> BB021
  BB023 --> BB021
```

### Building Block Summary

| ID | Level | Parent | Type | Name | Responsibility |
|----|-------|--------|------|------|----------------|
| BB-02.1 | L2 | BB-02 | leaf | Root Layout & Metadata | Root layout wrapper, main slot, max-width column, 404 route, shared title/description template |
| BB-02.2 | L2 | BB-02 | leaf | Header & Navigation | Brand link, Home/About nav, active route state, hamburger menu on narrow viewports |
| BB-02.3 | L2 | BB-02 | leaf | Footer Frame | Copyright, methodology tagline, footer LinkedIn link (F04), responsive footer row/stack layout |

### BB-02.1: Root Layout & Metadata

**Level:** L2 · **Parent:** BB-02 · **Type:** leaf

**Responsibility:** App Router root layout — renders header, `{children}` main landmark, footer; centered ~1200px content column with full-bleed header/footer bands; `not-found` page within shell; per-route metadata via shared template ([FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01), [FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08), [FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09)).

**Dependencies:** BB-02.2, BB-02.3, BB-05

### BB-02.2: Header & Navigation

**Level:** L2 · **Parent:** BB-02 · **Type:** leaf

**Responsibility:** Site brand (**AI Friendly Docs** → Home), Home/About/**Docs** navigation with active state, hamburger collapse below mobile breakpoint ([FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02)–[FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04), [FR-F05-02](../2-features/F05-documentation-browser.md#fr-f05-02)).

**Dependencies:** BB-05; Next.js client router for active nav updates

### BB-02.3: Footer Frame

**Level:** L2 · **Parent:** BB-02 · **Type:** leaf

**Responsibility:** Footer band on all shell routes — copyright and optional methodology tagline (F01); muted **LinkedIn** text link with desktop left/right layout and mobile stack (F04); external link opens new tab with `rel="noopener noreferrer"` ([NFR-05](solution-strategy.md#nfr-05-external-link-security)).

**Dependencies:** BB-05; shared LinkedIn profile URL constant

## Level 2 — White Box: BB-06 Documentation Browser

### Overview Diagram

```mermaid
flowchart LR
  subgraph BB06["inside BB-06"]
    BB063["BB-06.3 Build-time Doc Index"]
    BB061["BB-06.1 Doc Tree Navigation"]
    BB062["BB-06.2 Markdown Content Pane"]
  end
  BB063 --> BB061
  BB063 --> BB062
  BB061 --> BB062
```

### Building Block Summary

| ID | Level | Parent | Type | Name | Responsibility |
|----|-------|--------|------|------|----------------|
| BB-06.1 | L2 | BB-06 | leaf | Doc Tree Navigation | Expandable folder tree for `1-scope/`–`5-dev/`; highlights current file; mobile toggle |
| BB-06.2 | L2 | BB-06 | leaf | Markdown Content Pane | Renders markdown, Mermaid, SVG images; intercepts relative `.md` links |
| BB-06.3 | L2 | BB-06 | process | Build-time Doc Index | Build script walks product folders, emits tree + content map; copies SVG assets |

### BB-06.1: Doc Tree Navigation

**Level:** L2 · **Parent:** BB-06 · **Type:** leaf

**Responsibility:** Left sidebar (desktop) or toggle drawer (mobile) listing allowed product doc paths; expands/collapses folders; syncs selection with URL and content pane ([FR-F05-03](../2-features/F05-documentation-browser.md#fr-f05-03), [FR-F05-09](../2-features/F05-documentation-browser.md#fr-f05-09)).

**Dependencies:** BB-06.3, BB-05

### BB-06.2: Markdown Content Pane

**Level:** L2 · **Parent:** BB-06 · **Type:** leaf

**Responsibility:** Main reading area — GFM markdown, syntax-highlighted code fences, Mermaid diagrams, inline SVG images; rewrites relative product `.md` links for client navigation; external links open new tab ([FR-F05-04](../2-features/F05-documentation-browser.md#fr-f05-04)–[FR-F05-08](../2-features/F05-documentation-browser.md#fr-f05-08)).

**Dependencies:** BB-06.3, BB-05

### BB-06.3: Build-time Doc Index

**Level:** L2 · **Parent:** BB-06 · **Type:** process

**Responsibility:** Runs during `next build` (or prebuild script) — scans `1-scope/`, `2-features/`, `3-arch/`, `4-design/`, `5-dev/`; excludes `consultation/` and `6-code/`; outputs JSON index and markdown source map; stages SVG files for static serving ([FR-F05-11](../2-features/F05-documentation-browser.md#fr-f05-11), [ADR-06](solution-strategy.md#adr-06-build-time-product-doc-browser)).

**Dependencies:** Repository product folders at build time

## External Systems

| System | Role | Interface to | Features |
|--------|------|--------------|----------|
| Vercel | Host CDN and Next.js build/deploy pipeline for SSG pages | BB-01 | F01, F02, F03, F04, F05 |
| LinkedIn | Site owner profile — optional contact destination | BB-02.3, BB-04 | F03, F04 |

## Deployment View

| Block | Runtime | Notes |
|-------|---------|-------|
| BB-01 | Vercel serverless/edge static assets | Pre-rendered HTML/JS at build; no runtime API or database |
| BB-02–BB-06 | Browser (React hydration for client nav, hamburger, anchor scroll, doc tree, Mermaid) | Prefer React Server Components where possible per [ADR-01](solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) |

**Runtime flows:** [runtime-views.md](runtime-views.md)
