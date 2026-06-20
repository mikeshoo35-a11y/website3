# Solution Strategy

## Context

The product is a **static marketing website** for the **AI Friendly Docs** methodology — Home and About routes inside a shared shell, deployed on Vercel. Primary visitors are practitioners researching documentation practices; secondary visitors are hiring managers assessing author credibility.

**Forces:**

- **GOL-02** requires enterprise-grade, trust-focused presentation on desktop and mobile — the site must demonstrate quality through its own delivery.
- **Constraints** fix English-only MVP scope, repository-authored content, no CMS/auth/analytics funnel, and understated LinkedIn contact only.
- **Features** (F01–F04) decompose a small static surface: shared Next.js shell, Home marketing sections, About credibility content, and footer LinkedIn link.
- **Boundary** excludes hosted sample documentation, lead capture, and server-side business logic — architecture stays lean and pre-rendered.

**Strategy:** Next.js App Router with build-time static generation, TypeScript + Tailwind, marketing copy in TSX components, WCAG 2.1 AA and Lighthouse quality gates, Playwright + Vitest for regression coverage.

## Architecture Decision Records

| ID | Title | Decision | Status | Affects |
|----|-------|----------|--------|---------|
| ADR-01 | Next.js App Router with SSG on Vercel | Pre-render Home, About, and 404 at build time; deploy via standard Vercel Next.js pipeline | Accepted | F01, F02, F03, F04 |
| ADR-02 | Tailwind CSS styling | Utility-first CSS with shared design tokens for light corporate theme | Accepted | F01, F02, F03, F04 |
| ADR-03 | TypeScript implementation | All application source in TypeScript (.tsx/.ts) | Accepted | F01, F02, F03, F04 |
| ADR-04 | TSX component content model | Marketing copy authored in React page/section components; no MDX pipeline in MVP | Accepted | F02, F03 |
| ADR-05 | Playwright and Vitest testing | Playwright E2E smoke on critical paths; Vitest unit tests for shell and shared components | Accepted | F01, F02, F03, F04 |

### ADR-01: Next.js App Router with SSG on Vercel

**Context:** MVP is a small static marketing site (Home, About, 404) with shared root layout, metadata template, and client navigation for active nav state. Hosting is fixed to Vercel; no server-side business logic or authenticated areas.

**Decision:** Use **Next.js App Router** with **static generation (SSG)** — routes pre-rendered at build time; standard Vercel deploy (not `output: 'export'`).

**Rationale:** Features already specify root layout, Metadata API, and App Router patterns (F01, F02, F03). SSG on Vercel gives fast CDN delivery, simple ops, and room for future server features without MVP complexity.

**Consequences:** Requires Node build step; no dynamic per-request rendering in MVP. Preview and production deploys depend on Vercel (or compatible Next.js host).

**Related:** [NFR-03](#nfr-03-performance-seo), [NFR-04](#nfr-04-static-architecture), [F01](../2-features/F01-site-shell-layout.md)

### ADR-02: Tailwind CSS styling

**Context:** GOL-02 demands consistent light corporate theme, responsive breakpoints, and polished typography/spacing across shell and page sections.

**Decision:** **Tailwind CSS** for styling — shared colour/spacing/type tokens and responsive utilities.

**Rationale:** Fast iteration on marketing layout; consistent tokens across F01 shell and F02/F03 sections; common pairing with Next.js + TypeScript.

**Consequences:** Team must discipline utility usage to avoid bundle bloat; design tokens live in Tailwind config. No separate CSS-in-JS or component library in MVP.

**Related:** [NFR-01](#nfr-01-responsive-layout), [NFR-03](#nfr-03-performance-seo), [F01](../2-features/F01-site-shell-layout.md)

### ADR-03: TypeScript implementation

**Context:** Site demonstrates professional, enterprise-grade output quality (GOL-02); codebase is small but should model maintainable practices.

**Decision:** Implement the application in **TypeScript** — typed React components, config, and tests.

**Rationale:** Aligns with quality-demo goal; catches layout/component errors early; standard for modern Next.js projects.

**Consequences:** Slightly higher setup cost than plain JavaScript; build toolchain includes type checking.

**Related:** [ADR-05](#adr-05-playwright-and-vitest-testing), [F01](../2-features/F01-site-shell-layout.md)

### ADR-04: TSX component content model

**Context:** Content is static marketing copy authored in the repository; no CMS or MDX workflow exists in scope.

**Decision:** Author Home and About prose in **TSX page and section components** — no MDX pipeline in MVP.

**Rationale:** Simplest path for a two-page static site; layout and copy co-locate in familiar React components; avoids MDX compiler and content-routing overhead.

**Consequences:** Copy edits require component changes (not markdown files); acceptable for MVP page count. MDX can be revisited if content volume grows.

**Related:** [NFR-04](#nfr-04-static-architecture), [F02](../2-features/F02-home-page.md), [F03](../2-features/F03-about-page.md)

### ADR-05: Playwright and Vitest testing

**Context:** Quality goals include accessibility, responsive layout, and Lighthouse targets that must not regress; backlog will map verifiable acceptance criteria to `TC-##` rows.

**Decision:** **Playwright** for E2E smoke tests (Home, About, nav, footer LinkedIn, 404) and **Vitest** for unit tests on shell and shared components.

**Rationale:** E2E covers cross-route user paths (SCN-01, SCN-03); unit tests give fast feedback on shell behaviour (nav active state, metadata helpers) without full browser runs.

**Consequences:** CI or pre-deploy must run both suites; initial test authoring is a backlog item before **In development**.

**Related:** [NFR-02](#nfr-02-accessibility), [NFR-03](#nfr-03-performance-seo), [F01](../2-features/F01-site-shell-layout.md)

## Technology Stack

| Layer | Choice | ADR |
|-------|--------|-----|
| Frontend framework | Next.js (App Router, SSG) | ADR-01 |
| UI library | React | ADR-01 |
| Language | TypeScript | ADR-03 |
| Styling | Tailwind CSS | ADR-02 |
| Hosting / deploy | Vercel | ADR-01 |
| E2E testing | Playwright | ADR-05 |
| Unit testing | Vitest | ADR-05 |

## Non-Functional Requirements

| ID | Category | Requirement | Metric | Priority | Features |
|----|----------|-------------|--------|----------|----------|
| <a id="nfr-01-responsive-layout"></a> NFR-01 | Usability | Layout shall remain polished and usable on desktop and mobile viewports without broken or overlapping shell and page content | No horizontal scroll or clipped primary content at 320px and 1280px widths; hamburger nav functional below mobile breakpoint | Must | F01, F02, F03, F04 |
| <a id="nfr-02-accessibility"></a> NFR-02 | Accessibility | Site shall meet **WCAG 2.1 Level AA** for MVP routes — semantic landmarks, heading order, keyboard navigation, visible focus, and sufficient colour contrast | Automated a11y checks pass on Home and About; manual keyboard walkthrough of nav, in-page links, and footer contact | Must | F01, F02, F03, F04 |
| <a id="nfr-03-performance-seo"></a> NFR-03 | Performance / SEO | Home and About shall score **Lighthouse ≥ 90** on Performance, Accessibility, and SEO when measured on mobile | Lighthouse mobile audit ≥ 90 on `/` and `/about` before production deploy | Must | F01, F02, F03 |
| <a id="nfr-04-static-architecture"></a> NFR-04 | Architecture | MVP shall be a static marketing site — no authentication, CMS backend, server-side business logic, or persistent application data store | Zero runtime API routes or database dependencies in MVP; content shipped at build time | Must | F01, F02, F03, F04 |
| <a id="nfr-05-external-link-security"></a> NFR-05 | Security | External profile links shall open in a new browsing context with `rel="noopener noreferrer"` | All LinkedIn anchors include `target="_blank"` and `rel="noopener noreferrer"` | Must | F03, F04 |

## Quality Goals

| Priority | Goal | NFR(s) |
|----------|------|--------|
| 1 | Demonstrate enterprise-grade polish and responsive quality through the site itself | NFR-01, NFR-02 |
| 2 | Deliver fast, discoverable static pages that reinforce credibility | NFR-03 |
| 3 | Keep architecture simple, repository-driven, and free of unnecessary backend surface | NFR-04 |
| 4 | Provide safe, understated external contact without compromising page security | NFR-05 |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tailwind and client JS bundle size reduces Lighthouse Performance | Med | Purge unused utilities; minimize client components; prefer static server components where possible; audit Lighthouse before deploy |
| Content or styling edits regress WCAG or Lighthouse scores | Med | Map `TC-##` to NFR-02/NFR-03 checks; run Playwright smoke and Lighthouse in pre-deploy checklist |
| LinkedIn availability or URL change breaks contact paths | Low | Single configured profile URL in shared constant; verify link in E2E tests (F03, F04) |
| No analytics in MVP limits quantitative success metrics for GOL-01 | Low | Accept for MVP per scope non-goals; optional EVT-01 deferred until explicitly scoped |
