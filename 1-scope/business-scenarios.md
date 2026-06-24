# Business Scenarios and Events

## Context and Boundary

| Actor / System | Type | Role | In / Out |
|----------------|------|------|----------|
| Practitioner visitor | Person | Primary audience — developer, BA, or PM researching documentation practices | In |
| Hiring manager visitor | Person | Secondary audience — evaluates site quality and owner credibility | In |
| Site owner | Person | Author of content; subject of About page | In |
| AI Friendly Docs marketing site | System | Next.js site on Vercel — Home, About, Docs, shared layout/footer | In |
| Product documentation tree | System | Repository markdown and SVG assets under `1-scope/`–`5-dev/` — browsable on `/docs` at build time | In |
| LinkedIn | System | External profile link for optional contact — [Mikhail Shumilov](https://www.linkedin.com/in/mikhail-shumilov-549a57292/) | Interface |
| CMS / admin backend | System | Content management beyond repository source | Out |
| Lead-capture CRM | System | Forms, email marketing, analytics-heavy funnels | Out |

**Boundary:** The product is a **static marketing website** that explains the AI Friendly Docs methodology, its benefits, and the site owner’s background, and exposes a **read-only browser** of this product’s own documentation tree on `/docs`. It does **not** include arbitrary user-uploaded doc sets, authenticated areas, or sales automation in MVP.

## Scenarios

### SCN-01: Practitioner discovers the methodology {#scn-01-practitioner-discovers}

**Actor:** Practitioner visitor · **Trigger:** Arrives via search, referral, or direct URL · **Goal:** Quickly understand what AI-friendly documentation is and why it matters

**Main flow:**
1. Visitor lands on **Home** and reads the hero and value proposition.
2. Visitor scans **benefits** — rapid documentation development (PRDs, SDS, business requirements, reviews, interviews, validation, test scenarios, feature descriptions), test-coverage generation and maintenance, higher software quality, legacy-to-manageable modernization.
3. Visitor reads **how it works** — text-first documentation structured for AI agent consumption (answering questions, elaboration, validation).
4. Visitor optionally opens **About** for context on the site owner’s developer/BA/system-analyst background.
5. Visitor optionally opens **Docs** to browse the live product documentation tree (scope, features, architecture, design, development).

**Alternate flows:** Visitor leaves after Home only → partial goal (awareness still achieved); Visitor opens **Docs** directly from header nav → explores methodology artifacts without reading Home first

**Related features:** [F02 Home page](features-list.md), [F03 About page](features-list.md), [F05 Documentation browser](features-list.md)

### SCN-02: Practitioner evaluates team applicability {#scn-02-evaluate-benefits}

**Actor:** Practitioner visitor · **Trigger:** Has read Home and wants to assess fit for their team or project · **Goal:** Decide whether AI-friendly documentation practices are worth adopting

**Main flow:**
1. Visitor re-reads or deep-dives benefit sections on **Home** (quality, testing coverage, legacy refactoring).
2. Visitor compares implied workflow (structured text docs → AI-assisted elaboration and validation → implementation and tests) to their current documentation pain points.
3. Visitor forms a judgment: adopt, explore further offline, or dismiss.

**Alternate flows:** Visitor navigates to **About** to assess author credibility before forming a judgment

**Related features:** [F02 Home page](features-list.md), [F05 Documentation browser](features-list.md)

### SCN-03: Hiring manager optional contact {#scn-03-optional-contact}

**Actor:** Hiring manager visitor · **Trigger:** Site quality or About content prompts interest in engaging the site owner · **Goal:** Reach the site owner via LinkedIn without a dedicated sales funnel

**Main flow:**
1. Visitor reviews **Home** and **About** for evidence of professional delivery capability.
2. Visitor finds **LinkedIn** link in About and/or footer (subtle placement — not hero CTA).
3. Visitor opens LinkedIn profile in a new tab to connect or message.

**Alternate flows:** Visitor skips contact → goal not met; no other in-site contact path in MVP

**Related features:** [F02 Home page](features-list.md), [F03 About page](features-list.md), [F04 Optional LinkedIn contact](features-list.md)

### SCN-04: Practitioner explores live product documentation {#scn-04-explore-live-docs}

**Actor:** Practitioner visitor · **Trigger:** Wants to see AI Friendly Docs structure in practice after reading Home/About or arriving via Docs nav · **Goal:** Browse this product’s documentation tree with rendered markdown and diagrams to understand how the methodology is organized

**Main flow:**
1. Visitor opens **Docs** from header nav (or follows an in-page link).
2. Visitor sees a **folder tree** (left sidebar on desktop) mirroring `1-scope/` through `5-dev/` — excluding `consultation/` and `6-code/`.
3. Visitor selects a `.md` file — **main pane** renders headings, tables, links, code blocks, Mermaid diagrams, and referenced SVG images.
4. Visitor follows a **relative link** to another product `.md` file — content updates in the docs pane without leaving `/docs`.
5. Visitor optionally opens an **external** link — new browser tab.

**Alternate flows:** Narrow viewport → tree collapses behind a toggle; visitor reads one file only → partial goal (single-artifact awareness)

**Related features:** [F05 Documentation browser](features-list.md)

## Business Events

| Event ID | Name | Source | Payload | Consumers |
|----------|------|--------|---------|-----------|
| EVT-01 | Page view | Site (static route) | route path, timestamp *(client or host analytics — optional)* | Site owner analytics *(optional, out of MVP scope unless added later)* |

*No server-side business events in MVP; static content only.*
