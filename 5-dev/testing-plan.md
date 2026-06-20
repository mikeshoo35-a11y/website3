# Testing Plan

Test strategy per [ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing): **Vitest** for unit tests on shared helpers and shell logic; **Playwright** for E2E smoke on critical user paths; **Lighthouse** and **axe** for NFR quality gates.

| ID | Type | Title | Traces to | Backlog |
|----|------|-------|-----------|---------|
| TC-01 | Unit | Shared metadata title template | [FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09), [FR-F02-08](../2-features/F02-home-page.md#fr-f02-08), [FR-F03-08](../2-features/F03-about-page.md#fr-f03-08) | BL-02, BL-03, BL-04 |
| TC-02 | E2E | Root layout landmarks on Home and About | [FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01) | BL-02 |
| TC-03 | E2E | Brand link and active nav state | [FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02), [FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03) | BL-02 |
| TC-04 | E2E | Mobile hamburger navigation | [FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04) | BL-02 |
| TC-05 | E2E | Centred content column and consistent shell theme | [FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05), [FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07) | BL-02 |
| TC-06 | E2E | Footer frame copyright without LinkedIn (pre-F04) | [FR-F01-06](../2-features/F01-site-shell-layout.md#fr-f01-06) | BL-02 |
| TC-07 | E2E | 404 page within site shell | [FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08) | BL-02 |
| TC-08 | E2E | Home route and methodology-first hero | [FR-F02-01](../2-features/F02-home-page.md#fr-f02-01), [FR-F02-02](../2-features/F02-home-page.md#fr-f02-02) | BL-03 |
| TC-09 | E2E | Hero CTA scrolls to benefits anchor | [FR-F02-03](../2-features/F02-home-page.md#fr-f02-03), [FR-F02-09](../2-features/F02-home-page.md#fr-f02-09) | BL-03 |
| TC-10 | E2E | Benefits grid content and responsive layout | [FR-F02-04](../2-features/F02-home-page.md#fr-f02-04), [FR-F02-05](../2-features/F02-home-page.md#fr-f02-05) | BL-03 |
| TC-11 | E2E | How-it-works steps and About band link | [FR-F02-06](../2-features/F02-home-page.md#fr-f02-06), [FR-F02-07](../2-features/F02-home-page.md#fr-f02-07) | BL-03 |
| TC-12 | E2E | About page sections and order | [FR-F03-01](../2-features/F03-about-page.md#fr-f03-01)–[FR-F03-05](../2-features/F03-about-page.md#fr-f03-05), [FR-F03-07](../2-features/F03-about-page.md#fr-f03-07), [FR-F03-09](../2-features/F03-about-page.md#fr-f03-09) | BL-04 |
| TC-13 | E2E | About author LinkedIn link security | [FR-F03-06](../2-features/F03-about-page.md#fr-f03-06), [NFR-05](../3-arch/solution-strategy.md#nfr-05-external-link-security) | BL-04 |
| TC-14 | E2E | Footer LinkedIn contact | [FR-F04-01](../2-features/F04-optional-linkedin-contact.md#fr-f04-01)–[FR-F04-07](../2-features/F04-optional-linkedin-contact.md#fr-f04-07) | BL-05 |
| TC-15 | Manual | Lighthouse mobile ≥ 90 on Home and About | [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo) | BL-06 |
| TC-16 | Manual | WCAG 2.1 AA — axe and keyboard walkthrough | [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility) | BL-06 |
| TC-17 | E2E | Practitioner cross-route journey smoke | [RT-01](../3-arch/runtime-views.md#rt-01-practitioner-cross-route-journey), [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | BL-06 |
| TC-18 | Build | Project scaffold build succeeds | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture) | BL-01 |

---

## TC-01: Shared metadata title template {#tc-01}

**Type:** Unit (Vitest) · **Backlog:** BL-02, BL-03, BL-04

**Traces to:** [FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09), [FR-F02-08](../2-features/F02-home-page.md#fr-f02-08), [FR-F03-08](../2-features/F03-about-page.md#fr-f03-08)

**Steps:**

1. Call metadata helper for Home, About, and 404 route keys
2. Assert returned `title` strings include route-specific segment and shared site suffix

**Pass when:** Title template produces distinct, non-empty titles for `/`, `/about`, and not-found without duplicating raw route paths as the full title.

---

## TC-02: Root layout landmarks on Home and About {#tc-02}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01)

**Steps:**

1. Navigate to `/` and `/about`
2. Assert visible `header`, `main`, and `footer` landmarks exist on each route
3. Assert route-specific content renders inside `main`

**Pass when:** Shell chrome wraps page content on both MVP routes.

---

## TC-03: Brand link and active nav state {#tc-03}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02), [FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03)

**Steps:**

1. On About, assert About nav link has active styling and Home does not
2. Click **AI Friendly Docs** brand; assert URL is `/`
3. Navigate to About via nav; assert About becomes active

**Pass when:** Brand returns to Home and active state tracks current route.

---

## TC-04: Mobile hamburger navigation {#tc-04}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04)

**Steps:**

1. Set viewport width below 768px
2. Assert inline Home/About links are hidden and menu button is visible
3. Open menu, select About, assert navigation succeeds and menu closes

**Pass when:** Hamburger exposes nav on narrow viewports only.

---

## TC-05: Centred content column and consistent shell theme {#tc-05}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05), [FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07)

**Steps:**

1. At 1280px width, assert main content column max width ≈ 1200px centred
2. Switch between Home and About; assert header/footer background and typography classes unchanged

**Pass when:** Layout column and shell styling stay consistent across routes.

---

## TC-06: Footer frame copyright without LinkedIn (pre-F04) {#tc-06}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-06](../2-features/F01-site-shell-layout.md#fr-f01-06)

**Steps:**

1. Complete BL-02 before BL-05, or skip when BL-05 is Done
2. Assert footer shows copyright (and tagline if present)
3. Assert no LinkedIn link in footer when F04 is not yet implemented

**Pass when:** F01 footer frame renders without contact link until BL-05 lands.

**Note:** Re-run after BL-05 only to confirm LinkedIn appears per TC-14; do not fail BL-02 closure if BL-05 is still Todo.

---

## TC-07: 404 page within site shell {#tc-07}

**Type:** E2E (Playwright) · **Backlog:** BL-02

**Traces to:** [FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08)

**Steps:**

1. Navigate to a non-existent path (e.g. `/missing-page`)
2. Assert header and footer still render
3. Assert clear not-found message and link back to Home

**Pass when:** Unknown routes show 404 inside the shared shell.

---

## TC-08: Home route and methodology-first hero {#tc-08}

**Type:** E2E (Playwright) · **Backlog:** BL-03

**Traces to:** [FR-F02-01](../2-features/F02-home-page.md#fr-f02-01), [FR-F02-02](../2-features/F02-home-page.md#fr-f02-02)

**Steps:**

1. Open `/`
2. Assert hero headline leads with AI-friendly documentation concept
3. Assert subhead references structured text and AI agents
4. Assert no contact or LinkedIn CTA in hero

**Pass when:** Home hero matches methodology-first intent.

---

## TC-09: Hero CTA scrolls to benefits anchor {#tc-09}

**Type:** E2E (Playwright) · **Backlog:** BL-03

**Traces to:** [FR-F02-03](../2-features/F02-home-page.md#fr-f02-03), [FR-F02-09](../2-features/F02-home-page.md#fr-f02-09)

**Steps:**

1. On Home, click **Explore benefits**
2. Assert URL remains `/`
3. Assert benefits section is in viewport (stable anchor id)

**Pass when:** In-page scroll targets benefits without route change.

---

## TC-10: Benefits grid content and responsive layout {#tc-10}

**Type:** E2E (Playwright) · **Backlog:** BL-03

**Traces to:** [FR-F02-04](../2-features/F02-home-page.md#fr-f02-04), [FR-F02-05](../2-features/F02-home-page.md#fr-f02-05)

**Steps:**

1. Assert exactly four benefit cards with expected topic titles
2. Assert each card has title plus prose blurb (not bullet-only)
3. At 320px width, assert cards stack without horizontal scroll

**Pass when:** Four benefit topics render responsively with prose blurbs.

---

## TC-11: How-it-works steps and About band link {#tc-11}

**Type:** E2E (Playwright) · **Backlog:** BL-03

**Traces to:** [FR-F02-06](../2-features/F02-home-page.md#fr-f02-06), [FR-F02-07](../2-features/F02-home-page.md#fr-f02-07)

**Steps:**

1. Assert three numbered steps in correct sequence
2. Assert soft About band link navigates to `/about`
3. Assert no contact form or LinkedIn in the band

**Pass when:** Workflow section and About band match F02 scope.

---

## TC-12: About page sections and order {#tc-12}

**Type:** E2E (Playwright) · **Backlog:** BL-04

**Traces to:** [FR-F03-01](../2-features/F03-about-page.md#fr-f03-01)–[FR-F03-05](../2-features/F03-about-page.md#fr-f03-05), [FR-F03-07](../2-features/F03-about-page.md#fr-f03-07), [FR-F03-09](../2-features/F03-about-page.md#fr-f03-09)

**Steps:**

1. Open `/about` inside shell
2. Assert section headings appear in order: hero → What AI Friendly Docs is → Why this site exists → About the author → back link
3. Assert author section has text-only bio, no photo
4. Assert back link targets `/`

**Pass when:** About content and section order match F03.

---

## TC-13: About author LinkedIn link security {#tc-13}

**Type:** E2E (Playwright) · **Backlog:** BL-04

**Traces to:** [FR-F03-06](../2-features/F03-about-page.md#fr-f03-06), [NFR-05](../3-arch/solution-strategy.md#nfr-05-external-link-security)

**Steps:**

1. Locate subtle LinkedIn link in author section
2. Assert `href` matches configured profile URL
3. Assert `target="_blank"` and `rel` includes `noopener noreferrer`

**Pass when:** About LinkedIn link is low-emphasis and secure.

---

## TC-14: Footer LinkedIn contact {#tc-14}

**Type:** E2E (Playwright) · **Backlog:** BL-05

**Traces to:** [FR-F04-01](../2-features/F04-optional-linkedin-contact.md#fr-f04-01)–[FR-F04-07](../2-features/F04-optional-linkedin-contact.md#fr-f04-07)

**Steps:**

1. On Home, About, and 404, assert footer **LinkedIn** text link present
2. Assert muted styling — no icon or button chrome
3. At desktop width, assert copyright left and LinkedIn right on one row
4. Assert click opens new tab with correct URL and `rel="noopener noreferrer"`

**Pass when:** Footer contact matches F04 on all shell routes.

---

## TC-15: Lighthouse mobile ≥ 90 on Home and About {#tc-15}

**Type:** Manual (Lighthouse CLI or Chrome DevTools) · **Backlog:** BL-06

**Traces to:** [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo)

**Steps:**

1. Run Lighthouse mobile audit on `/` and `/about`
2. Record Performance, Accessibility, and SEO scores

**Pass when:** All three categories score ≥ 90 on both routes.

---

## TC-16: WCAG 2.1 AA — axe and keyboard walkthrough {#tc-16}

**Type:** Manual (axe-core + keyboard) · **Backlog:** BL-06

**Traces to:** [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility)

**Steps:**

1. Run axe (or equivalent) on Home and About
2. Tab through header nav, in-page links, hero CTA, and footer LinkedIn
3. Assert visible focus indicators and logical focus order

**Pass when:** No critical axe violations; keyboard path covers nav and links.

---

## TC-17: Practitioner cross-route journey smoke {#tc-17}

**Type:** E2E (Playwright) · **Backlog:** BL-06

**Traces to:** [RT-01](../3-arch/runtime-views.md#rt-01-practitioner-cross-route-journey), [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers)

**Steps:**

1. Land on Home; read hero
2. Click **Explore benefits**; scan benefit headings
3. Navigate to About via header or About band
4. Assert About methodology section visible

**Pass when:** End-to-end SCN-01 happy path completes without error.

---

## TC-18: Project scaffold build succeeds {#tc-18}

**Type:** Build · **Backlog:** BL-01

**Traces to:** [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture)

**Steps:**

1. Run `npm run build` in `6-code/`
2. Assert exit code 0 and static output for App Router

**Pass when:** Clean production build with no API or database dependencies.
