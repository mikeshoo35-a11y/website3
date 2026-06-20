# Business Scenarios and Events

## Context and Boundary

| Actor / System | Type | Role | In / Out |
|----------------|------|------|----------|
| Practitioner visitor | Person | Primary audience — developer, BA, or PM researching documentation practices | In |
| Hiring manager visitor | Person | Secondary audience — evaluates site quality and owner credibility | In |
| Site owner | Person | Author of content; subject of About page | In |
| AI Friendly Docs marketing site | System | Next.js site on Vercel — Home, About, shared layout/footer | In |
| LinkedIn | System | External profile link for optional contact — [Mikhail Shumilov](https://www.linkedin.com/in/mikhail-shumilov-549a57292/) | Interface |
| Sample documentation repository | System | Illustrative doc sets used to *build* the site; not browsable on the public site | Out |
| CMS / admin backend | System | Content management beyond repository source | Out |
| Lead-capture CRM | System | Forms, email marketing, analytics-heavy funnels | Out |

**Boundary:** The product is a **static marketing website** that explains the AI Friendly Docs methodology, its benefits, and the site owner’s background. It does **not** include hosted sample documentation, authenticated areas, or sales automation in MVP.

## Scenarios

### SCN-01: Practitioner discovers the methodology {#scn-01-practitioner-discovers}

**Actor:** Practitioner visitor · **Trigger:** Arrives via search, referral, or direct URL · **Goal:** Quickly understand what AI-friendly documentation is and why it matters

**Main flow:**
1. Visitor lands on **Home** and reads the hero and value proposition.
2. Visitor scans **benefits** — rapid documentation development (PRDs, SDS, business requirements, reviews, interviews, validation, test scenarios, feature descriptions), test-coverage generation and maintenance, higher software quality, legacy-to-manageable modernization.
3. Visitor reads **how it works** — text-first documentation structured for AI agent consumption (answering questions, elaboration, validation).
4. Visitor optionally opens **About** for context on the site owner’s developer/BA/system-analyst background.

**Alternate flows:** Visitor leaves after Home only → partial goal (awareness still achieved)

**Related features:** [F02 Home page](features-list.md), [F03 About page](features-list.md)

### SCN-02: Practitioner evaluates team applicability {#scn-02-evaluate-benefits}

**Actor:** Practitioner visitor · **Trigger:** Has read Home and wants to assess fit for their team or project · **Goal:** Decide whether AI-friendly documentation practices are worth adopting

**Main flow:**
1. Visitor re-reads or deep-dives benefit sections on **Home** (quality, testing coverage, legacy refactoring).
2. Visitor compares implied workflow (structured text docs → AI-assisted elaboration and validation → implementation and tests) to their current documentation pain points.
3. Visitor forms a judgment: adopt, explore further offline, or dismiss.

**Alternate flows:** Visitor navigates to **About** to assess author credibility before forming a judgment

**Related features:** [F02 Home page](features-list.md)

### SCN-03: Hiring manager optional contact {#scn-03-optional-contact}

**Actor:** Hiring manager visitor · **Trigger:** Site quality or About content prompts interest in engaging the site owner · **Goal:** Reach the site owner via LinkedIn without a dedicated sales funnel

**Main flow:**
1. Visitor reviews **Home** and **About** for evidence of professional delivery capability.
2. Visitor finds **LinkedIn** link in About and/or footer (subtle placement — not hero CTA).
3. Visitor opens LinkedIn profile in a new tab to connect or message.

**Alternate flows:** Visitor skips contact → goal not met; no other in-site contact path in MVP

**Related features:** [F02 Home page](features-list.md), [F03 About page](features-list.md), [F04 Optional LinkedIn contact](features-list.md)

## Business Events

| Event ID | Name | Source | Payload | Consumers |
|----------|------|--------|---------|-----------|
| EVT-01 | Page view | Site (static route) | route path, timestamp *(client or host analytics — optional)* | Site owner analytics *(optional, out of MVP scope unless added later)* |

*No server-side business events in MVP; static content only.*
