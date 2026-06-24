# Backlog

| ID | Feature | Title | Type | Priority | Status | Dependencies |
|----|---------|-------|------|----------|--------|--------------|
| BL-01 | — | Next.js project scaffold | Chore | Must | Done | — |
| BL-02 | F01 | Site shell & layout | Story | Must | Done | BL-01 |
| BL-03 | F02 | Home page | Story | Must | Done | BL-02 |
| BL-04 | F03 | About page | Story | Must | Done | BL-02 |
| BL-05 | F04 | Footer LinkedIn contact | Story | Should | Done | BL-02 |
| BL-06 | — | Quality gates & regression tests | Chore | Must | Done | BL-03, BL-04, BL-05 |
| BL-07 | F05 | Product doc build pipeline | Chore | Must | Todo | BL-01 |
| BL-08 | F05 | Documentation browser page | Story | Must | Todo | BL-02, BL-07, BL-09 |
| BL-09 | F01, F05 | Shell nav Docs link | Story | Must | Todo | BL-02 |
| BL-10 | F05 | Docs quality gates & regression tests | Chore | Must | Todo | BL-08, BL-09 |

## Suggested implementation order

1. BL-01
2. BL-02
3. BL-03
4. BL-04
5. BL-05
6. BL-06
7. BL-07
8. BL-09
9. BL-08
10. BL-10

Respect **Dependencies** — a `BL-##` is not eligible until every listed dependency is `Done`.

## Dependency diagram

Node fill = **Status** (update `class` lines when status changes).

```mermaid
flowchart TD
    BL01["BL-01 · Project scaffold"]
    BL02["BL-02 · Site shell"]
    BL03["BL-03 · Home page"]
    BL04["BL-04 · About page"]
    BL05["BL-05 · Footer LinkedIn"]
    BL06["BL-06 · Quality gates"]
    BL07["BL-07 · Doc pipeline"]
    BL08["BL-08 · Docs browser"]
    BL09["BL-09 · Docs nav"]
    BL10["BL-10 · Docs quality"]
    BL01 --> BL02
    BL02 --> BL03
    BL02 --> BL04
    BL02 --> BL05
    BL02 --> BL09
    BL01 --> BL07
    BL03 --> BL06
    BL04 --> BL06
    BL05 --> BL06
    BL07 --> BL08
    BL09 --> BL08
    BL08 --> BL10
    BL09 --> BL10

    classDef todo fill:#fef3c7,stroke:#d97706,color:#1f2937
    classDef inprogress fill:#dbeafe,stroke:#2563eb,color:#1f2937
    classDef done fill:#d1fae5,stroke:#059669,color:#1f2937

    class BL01,BL02,BL03,BL04,BL05,BL06 done
    class BL07,BL08,BL09,BL10 todo
```

| Status | Color |
|--------|-------|
| Todo | Amber |
| In Progress | Blue |
| Done | Green |

| Item | Depends on | Notes |
|------|------------|-------|
| BL-01 | — | Root — `6-code/` Next.js + TypeScript + Tailwind per [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel)–[ADR-03](../3-arch/solution-strategy.md#adr-03-typescript-implementation) |
| BL-02 | BL-01 | Shared shell before route pages |
| BL-03 | BL-02 | Home renders in shell main slot |
| BL-04 | BL-02 | About renders in shell main slot; may parallel BL-03 after BL-02 |
| BL-05 | BL-02 | Footer LinkedIn extends BB-02.3; Should priority |
| BL-06 | BL-03, BL-04, BL-05 | Lighthouse, a11y, and E2E smoke after feature routes ship |
| BL-07 | BL-01 | Build-time scan of `1-scope/`–`5-dev/`; doc index + SVG staging per [ADR-06](../3-arch/solution-strategy.md#adr-06-build-time-product-doc-browser) |
| BL-08 | BL-02, BL-07 | `/docs` split-pane UI — tree, markdown pane, Mermaid |
| BL-09 | BL-02 | Header/mobile nav **Docs** link and active state |
| BL-10 | BL-08, BL-09 | Lighthouse/a11y/E2E for `/docs`; extend regression suite |

**Rules:** direct deps only; no transitive arrows; no cycles; **Depends on** = hard gate for implementation order.

---

## BL-01: Next.js project scaffold

**Feature:** — (enables F01–F04)
**Traces to:** [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling), [ADR-03](../3-arch/solution-strategy.md#adr-03-typescript-implementation), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture)
**Dependencies:** —
**Tests:** [TC-18](testing-plan.md#tc-18)
**Acceptance criteria:**

- [x] Given an empty `6-code/` folder, when the Next.js App Router project is scaffolded with TypeScript and Tailwind, then `npm run build` completes without errors
- [x] Given [library.md](../4-design/library.md) design tokens, when Tailwind theme is configured, then primary colours, typography, spacing, and `--breakpoint-mobile` (768px) match token values
- [x] Given the project structure, when inspected, then there are no API routes, database dependencies, or CMS integrations ([NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture))

---

## BL-02: Site shell & layout

**Feature:** [F01-site-shell-layout](../2-features/F01-site-shell-layout.md)
**Traces to:** [FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01)–[FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09)
**Dependencies:** BL-01
**Tests:** [TC-01](testing-plan.md#tc-01), [TC-02](testing-plan.md#tc-02), [TC-03](testing-plan.md#tc-03), [TC-04](testing-plan.md#tc-04), [TC-05](testing-plan.md#tc-05), [TC-06](testing-plan.md#tc-06), [TC-07](testing-plan.md#tc-07)
**Acceptance criteria:**

- [x] Given any in-scope route (`/`, `/about`), when the page loads, then header, `<main>`, and footer landmarks are visible and main wraps route content ([FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01))
- [x] Given any page, when the visitor clicks the **AI Friendly Docs** brand, then they navigate to Home ([FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02))
- [x] Given the visitor is on About, when they view the header, then About is marked active and Home is not ([FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03))
- [x] Given a viewport below 768px, when the page loads, then nav links are behind a hamburger menu until opened ([FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04))
- [x] Given desktop width, when content renders, then text blocks do not exceed ~1200px centred while header/footer bands are full-bleed ([FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05))
- [x] Given any page before F04, when the footer renders, then copyright (and tagline if present) appear and no LinkedIn link is shown ([FR-F01-06](../2-features/F01-site-shell-layout.md#fr-f01-06))
- [x] Given Home and About, when the visitor switches routes, then header, footer, and shell styling remain consistent ([FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07))
- [x] Given an invalid path, when the visitor opens it, then they see the shell plus a clear not-found message ([FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08))
- [x] Given Home or About, when the page loads, then the browser title reflects the route name using the shared metadata template ([FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09))

---

## BL-03: Home page

**Feature:** [F02-home-page](../2-features/F02-home-page.md)
**Traces to:** [FR-F02-01](../2-features/F02-home-page.md#fr-f02-01)–[FR-F02-09](../2-features/F02-home-page.md#fr-f02-09)
**Dependencies:** BL-02
**Tests:** [TC-01](testing-plan.md#tc-01), [TC-08](testing-plan.md#tc-08), [TC-09](testing-plan.md#tc-09), [TC-10](testing-plan.md#tc-10), [TC-11](testing-plan.md#tc-11)
**Acceptance criteria:**

- [x] Given the site is loaded, when the visitor opens `/`, then the F01 shell wraps Home sections ([FR-F02-01](../2-features/F02-home-page.md#fr-f02-01))
- [x] Given Home loads, when the visitor reads the hero, then the headline leads with the documentation approach and the subhead mentions structured text and AI agent use ([FR-F02-02](../2-features/F02-home-page.md#fr-f02-02))
- [x] Given Home loads, when the visitor activates the hero **Explore benefits** CTA, then the viewport scrolls to the benefits section and no contact CTA is present in the hero ([FR-F02-03](../2-features/F02-home-page.md#fr-f02-03))
- [x] Given Home loads, when the visitor views benefits, then four distinct cards are visible and reflow on narrow viewports ([FR-F02-04](../2-features/F02-home-page.md#fr-f02-04))
- [x] Given Home loads, when the visitor reads each benefit card, then rapid docs, test coverage, quality, and legacy modernization topics appear with title plus short prose ([FR-F02-05](../2-features/F02-home-page.md#fr-f02-05))
- [x] Given Home loads, when the visitor reads how-it-works, then exactly three ordered steps appear: structured docs → AI elaboration → implementation and tests ([FR-F02-06](../2-features/F02-home-page.md#fr-f02-06))
- [x] Given Home loads, when the visitor reaches the page bottom, then a link to About is visible and no contact form or LinkedIn CTA appears in the band ([FR-F02-07](../2-features/F02-home-page.md#fr-f02-07))
- [x] Given Home loads, when document metadata is inspected, then title reflects Home using the shared template ([FR-F02-08](../2-features/F02-home-page.md#fr-f02-08))
- [x] Given Home loads, when the hero CTA is activated, then the benefits section receives focus without navigation away from Home ([FR-F02-09](../2-features/F02-home-page.md#fr-f02-09))

---

## BL-04: About page

**Feature:** [F03-about-page](../2-features/F03-about-page.md)
**Traces to:** [FR-F03-01](../2-features/F03-about-page.md#fr-f03-01)–[FR-F03-09](../2-features/F03-about-page.md#fr-f03-09)
**Dependencies:** BL-02
**Tests:** [TC-01](testing-plan.md#tc-01), [TC-12](testing-plan.md#tc-12), [TC-13](testing-plan.md#tc-13)
**Acceptance criteria:**

- [x] Given the site is loaded, when the visitor opens `/about`, then the F01 shell wraps About sections ([FR-F03-01](../2-features/F03-about-page.md#fr-f03-01))
- [x] Given About loads, when the visitor reads the top of the page, then a distinct hero heading and intro line appear before section content ([FR-F03-02](../2-features/F03-about-page.md#fr-f03-02))
- [x] Given About loads, when the visitor reads section 1, then the methodology is explained in prose without duplicating the entire Home benefits grid ([FR-F03-03](../2-features/F03-about-page.md#fr-f03-03))
- [x] Given About loads, when the visitor reads section 2, then the narrative states the site demonstrates professional output quality ([FR-F03-04](../2-features/F03-about-page.md#fr-f03-04))
- [x] Given About loads, when the visitor reads section 3, then owner roles and background appear and no author photo is shown ([FR-F03-05](../2-features/F03-about-page.md#fr-f03-05))
- [x] Given About loads, when the visitor views the author section, then a low-emphasis LinkedIn link is present and no contact form or hero-level CTA appears ([FR-F03-06](../2-features/F03-about-page.md#fr-f03-06))
- [x] Given About loads, when the visitor reaches the page bottom, then a link to `/` is visible ([FR-F03-07](../2-features/F03-about-page.md#fr-f03-07))
- [x] Given About loads, when document metadata is inspected, then title reflects About using the shared template ([FR-F03-08](../2-features/F03-about-page.md#fr-f03-08))
- [x] Given About loads, when sections are read top to bottom, then they appear in order: hero → What AI Friendly Docs is → Why this site exists → About the author → Home link band ([FR-F03-09](../2-features/F03-about-page.md#fr-f03-09))

---

## BL-05: Footer LinkedIn contact

**Feature:** [F04-optional-linkedin-contact](../2-features/F04-optional-linkedin-contact.md)
**Traces to:** [FR-F04-01](../2-features/F04-optional-linkedin-contact.md#fr-f04-01)–[FR-F04-07](../2-features/F04-optional-linkedin-contact.md#fr-f04-07)
**Dependencies:** BL-02
**Tests:** [TC-14](testing-plan.md#tc-14)
**Acceptance criteria:**

- [x] Given any in-scope route (Home, About, 404), when the page loads, then the footer includes a LinkedIn link ([FR-F04-01](../2-features/F04-optional-linkedin-contact.md#fr-f04-01))
- [x] Given any page, when the footer renders, then the link text is “LinkedIn” with subdued styling and no LinkedIn icon ([FR-F04-02](../2-features/F04-optional-linkedin-contact.md#fr-f04-02))
- [x] Given desktop width, when the footer renders, then copyright and LinkedIn appear on one row; on mobile they stack readably ([FR-F04-03](../2-features/F04-optional-linkedin-contact.md#fr-f04-03))
- [x] Given the footer link, when its href is inspected, then it matches the site owner LinkedIn profile URL ([FR-F04-04](../2-features/F04-optional-linkedin-contact.md#fr-f04-04))
- [x] Given the visitor clicks the footer LinkedIn link, then a new tab opens to LinkedIn and the link includes `rel="noopener noreferrer"` ([FR-F04-05](../2-features/F04-optional-linkedin-contact.md#fr-f04-05))
- [x] Given any page, when the footer renders, then only the subtle text link appears — no button-style CTA or form ([FR-F04-06](../2-features/F04-optional-linkedin-contact.md#fr-f04-06))
- [x] Given the F01 footer frame, when F04 is implemented, then the link is part of footer content and header/nav are unchanged ([FR-F04-07](../2-features/F04-optional-linkedin-contact.md#fr-f04-07))

---

## BL-06: Quality gates & regression tests

**Feature:** — (cross-cutting)
**Traces to:** [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility), [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo), [ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing), [RT-01](../3-arch/runtime-views.md#rt-01-practitioner-cross-route-journey)
**Dependencies:** BL-03, BL-04, BL-05
**Tests:** [TC-15](testing-plan.md#tc-15), [TC-16](testing-plan.md#tc-16), [TC-17](testing-plan.md#tc-17)
**Acceptance criteria:**

- [x] Given `/` and `/about` on mobile viewport, when Lighthouse audit runs, then Performance, Accessibility, and SEO scores are ≥ 90 ([NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo))
- [x] Given Home and About, when automated a11y checks and keyboard walkthrough run, then WCAG 2.1 AA violations are absent on nav, in-page links, and footer contact ([NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility))
- [x] Given the Playwright and Vitest suites, when `npm test` (or CI equivalent) runs, then all mapped `TC-##` cases pass ([ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing))

---

## BL-07: Product doc build pipeline

**Feature:** [F05-documentation-browser](../2-features/F05-documentation-browser.md)
**Traces to:** [FR-F05-11](../2-features/F05-documentation-browser.md#fr-f05-11), [ADR-06](../3-arch/solution-strategy.md#adr-06-build-time-product-doc-browser), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture)
**Dependencies:** BL-01
**Tests:** [TC-19](testing-plan.md#tc-19)
**Acceptance criteria:**

- [ ] Given the repository product folders, when the build pipeline runs, then a static index is generated for `1-scope/`, `2-features/`, `3-arch/`, `4-design/`, and `5-dev/` excluding `consultation/` and `6-code/`
- [ ] Given indexed `.md` files, when the build completes, then each path has retrievable markdown content without runtime API routes
- [ ] Given SVG files under `4-design/mockups/`, when the build completes, then assets are available for static serving in rendered docs

---

## BL-08: Documentation browser page

**Feature:** [F05-documentation-browser](../2-features/F05-documentation-browser.md)
**Traces to:** [FR-F05-01](../2-features/F05-documentation-browser.md#fr-f05-01)–[FR-F05-10](../2-features/F05-documentation-browser.md#fr-f05-10)
**Dependencies:** BL-02, BL-07, BL-09
**Tests:** [TC-20](testing-plan.md#tc-20), [TC-21](testing-plan.md#tc-21), [TC-01](testing-plan.md#tc-01)
**Acceptance criteria:**

- [ ] Given the site is loaded, when the visitor opens `/docs`, then the F01 shell wraps a split-pane docs layout ([FR-F05-01](../2-features/F05-documentation-browser.md#fr-f05-01))
- [ ] Given Docs loads, when the visitor views the sidebar, then phase folders `1-scope/` through `5-dev/` appear with selectable `.md` files ([FR-F05-03](../2-features/F05-documentation-browser.md#fr-f05-03))
- [ ] Given a `.md` file is selected, when the pane renders, then headings, tables, code blocks, Mermaid diagrams, and SVG images display ([FR-F05-04](../2-features/F05-documentation-browser.md#fr-f05-04)–[FR-F05-06](../2-features/F05-documentation-browser.md#fr-f05-06))
- [ ] Given rendered doc content, when the visitor clicks a relative link to another product `.md` file, then the pane updates without leaving `/docs` ([FR-F05-07](../2-features/F05-documentation-browser.md#fr-f05-07))
- [ ] Given a narrow viewport, when Docs loads, then the folder tree is behind a toggle and the content pane is primary ([FR-F05-09](../2-features/F05-documentation-browser.md#fr-f05-09))
- [ ] Given Docs loads, when metadata is inspected, then title uses the shared template ([FR-F05-10](../2-features/F05-documentation-browser.md#fr-f05-10))

---

## BL-09: Shell nav Docs link

**Feature:** [F01-site-shell-layout](../2-features/F01-site-shell-layout.md), [F05-documentation-browser](../2-features/F05-documentation-browser.md)
**Traces to:** [FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03), [FR-F05-02](../2-features/F05-documentation-browser.md#fr-f05-02)
**Dependencies:** BL-02
**Tests:** [TC-22](testing-plan.md#tc-22)
**Acceptance criteria:**

- [ ] Given any page, when the header renders, then **Home**, **About**, and **Docs** nav links are visible on desktop ([FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03))
- [ ] Given the visitor is on `/docs`, when they view the header, then Docs is marked active ([FR-F05-02](../2-features/F05-documentation-browser.md#fr-f05-02))
- [ ] Given mobile viewport, when the hamburger menu opens, then Docs appears alongside Home and About ([FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04))

---

## BL-10: Docs quality gates & regression tests

**Feature:** [F05-documentation-browser](../2-features/F05-documentation-browser.md) *(cross-cutting)*
**Traces to:** [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility), [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo), [RT-04](../3-arch/runtime-views.md#rt-04-documentation-browser-journey), [ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing)
**Dependencies:** BL-08, BL-09
**Tests:** [TC-15](testing-plan.md#tc-15), [TC-16](testing-plan.md#tc-16), [TC-20](testing-plan.md#tc-20), [TC-21](testing-plan.md#tc-21), [TC-22](testing-plan.md#tc-22)
**Acceptance criteria:**

- [ ] Given `/docs` on mobile viewport, when Lighthouse audit runs, then Performance, Accessibility, and SEO scores are ≥ 90 ([NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo))
- [ ] Given Docs route, when automated a11y checks and keyboard walkthrough run, then WCAG 2.1 AA violations are absent on tree, pane links, and nav ([NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility))
- [ ] Given the extended Playwright suite, when tests run, then all F05-mapped `TC-##` cases pass ([ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing))
