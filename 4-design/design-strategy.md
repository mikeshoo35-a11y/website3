# Design Strategy

Assumptions, UI intent, screen inventory, and component catalog for the **AI Friendly Docs** marketing site. Design tokens live in [library.md](library.md).

## Assumptions and agreements

| ID | Assumption / agreement | Source | Impact |
|----|------------------------|--------|--------|
| DSA-01 | English-only MVP — all copy, nav labels, and metadata in English | [Constraints](../1-scope/stakeholders-and-goals.md#constraints), [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | No locale switcher; single typography scale |
| DSA-02 | Light corporate consulting theme — warm off-white surface, white elevated bands, teal accent | [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility), [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling) | Token palette in [library.md](library.md); no dark mode in MVP |
| DSA-03 | Methodology-first content hierarchy — educational sections lead; no hero-level hire-me or contact CTAs | [Non-Goals](../1-scope/stakeholders-and-goals.md#non-goals), [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | Home hero CTA scrolls to benefits only; contact paths are understated |
| DSA-04 | Optional LinkedIn contact only — subtle text links in About author section and footer; no forms or icons | [GOL-03](../1-scope/stakeholders-and-goals.md#gol-03-optional-contact), [NFR-05](../3-arch/solution-strategy.md#nfr-05-external-link-security) | [CMP-08](#cmp-08-external-link) styling; `target="_blank"` + `rel="noopener noreferrer"` |
| DSA-05 | Static marketing site — two primary routes (Home, About) plus 404 inside shared shell | [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture), [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | No auth UI, CMS chrome, or dynamic nav |
| DSA-06 | Responsive breakpoint at 768px — inline nav at desktop; hamburger drawer below | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout), [FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04) | [CMP-02](#cmp-02-mobile-nav-drawer) replaces inline nav; layouts stack on mobile |
| DSA-07 | Centred content column max ~1200px; header and footer bands full-bleed | [FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05), [Constraints](../1-scope/stakeholders-and-goals.md#constraints) | Main slot constrained; chrome spans viewport width |

## UI intent

The site presents **AI Friendly Docs** as a credible, enterprise-grade methodology — the visual language must demonstrate the quality it advocates ([GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility)). Direction is **corporate consulting**: light theme, generous whitespace, Inter typography, and a restrained teal accent for navigation and primary actions. Layout prioritises readable prose and scannable section structure over decorative chrome, so practitioners can grasp the approach in one visit ([GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners)).

Interaction stays simple and accessible: semantic landmarks, keyboard-navigable header and links, visible focus rings, and responsive reflow without horizontal scroll ([NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout), [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility)). Home leads with a methodology-first hero and in-page scroll to benefits; About deepens context in linear sections. Contact is deliberately low-emphasis — muted LinkedIn text in the footer and author bio — so educational content remains primary ([GOL-03](../1-scope/stakeholders-and-goals.md#gol-03-optional-contact)).

## Screen inventory

Every Must-path view from feature **UI flow**. Section-level mockups support journeys and composition; full-page rows are primary route views.

| ID | Screen | Route | Feature(s) | Mockup | Journey |
|----|--------|-------|------------|--------|---------|
| MCK-01 | Site shell (header + footer frame) | `*` | F01, F04 | [MCK-01](mockups.md#mck-01-site-shell) | JRN-01, JRN-03 |
| MCK-02 | Mobile nav overlay (open state) | `*` | F01 | [MCK-02](mockups.md#mck-02-mobile-nav) | JRN-01 |
| MCK-03 | Home — hero section | `/` | F02 | [MCK-03](mockups.md#mck-03-home-hero) | JRN-01 |
| MCK-04 | Home — benefits grid | `/` | F02 | [MCK-04](mockups.md#mck-04-home-benefits) | JRN-01, JRN-02 |
| MCK-05 | Home — how it works + About band | `/` | F02 | [MCK-05](mockups.md#mck-05-home-how-it-works) | JRN-01, JRN-02 |
| MCK-06 | Home — full page (desktop) | `/` | F02 | [MCK-06](mockups.md#mck-06-home-full-desktop) | JRN-01, JRN-02, JRN-03 |
| MCK-07 | Home — full page (mobile) | `/` | F02 | [MCK-07](mockups.md#mck-07-home-full-mobile) | JRN-01 |
| MCK-08 | About — page hero | `/about` | F03 | [MCK-08](mockups.md#mck-08-about-hero) | JRN-02 |
| MCK-09 | About — methodology section | `/about` | F03 | [MCK-09](mockups.md#mck-09-about-methodology) | JRN-01 |
| MCK-10 | About — site narrative | `/about` | F03 | [MCK-10](mockups.md#mck-10-about-site-narrative) | JRN-01, JRN-02 |
| MCK-11 | About — author section | `/about` | F03 | [MCK-11](mockups.md#mck-11-about-author) | JRN-01, JRN-02, JRN-03 |
| MCK-12 | About — full page (desktop) | `/about` | F03 | [MCK-12](mockups.md#mck-12-about-full-desktop) | JRN-01, JRN-02, JRN-03 |
| MCK-13 | About — full page (mobile) | `/about` | F03 | [MCK-13](mockups.md#mck-13-about-full-mobile) | JRN-02 |
| MCK-14 | 404 not found | `*` | F01 | [MCK-14](mockups.md#mck-14-not-found) | — |

## Component inventory {#component-inventory}

Structured catalog — each component answers **What**, **Looks**, **Behaves**. IDs `CMP-01`…; anchors `#cmp-##-slug`.

### CMP-01: Site Header {#cmp-01-site-header}

**Used in:** F01 · **Screens:** MCK-01, MCK-06, MCK-07, MCK-12, MCK-13, MCK-14

| Aspect | Description |
|--------|-------------|
| **What** | Global chrome band with **AI Friendly Docs** brand (links to Home) and primary nav (**Home**, **About**). Establishes consistent orientation on every route. |
| **Looks** | Full-bleed band on `--color-surface-elevated` with bottom border `--color-border`. Brand left; nav links right at ≥768px using `--font-size-small` and `--color-text`. Active route link uses `--color-primary` (teal text or underline). Horizontal padding `--spacing-content-x`; inner row respects `--max-width-content` centred. |
| **Behaves** | Brand click navigates to `/`. Nav links use client routing with active state on current path. Below `--breakpoint-mobile` (768px), inline links hide and hamburger control appears ([CMP-02](#cmp-02-mobile-nav-drawer)). Keyboard: Tab through brand and links; visible `:focus-visible` ring. Landmarks: `<header>` with `nav` for primary navigation. |

### CMP-02: Mobile Nav Drawer {#cmp-02-mobile-nav-drawer}

**Used in:** F01 · **Screens:** MCK-02, MCK-07, MCK-13

| Aspect | Description |
|--------|-------------|
| **What** | Hamburger-triggered overlay exposing stacked Home/About links on narrow viewports when inline header nav is hidden. |
| **Looks** | Hamburger icon button in header (right side). Open state: semi-transparent scrim over page content; white drawer panel (`--color-surface-elevated`) with stacked links using `--font-size-body`, generous vertical padding, `--color-border` dividers between items. |
| **Behaves** | **Closed:** only hamburger visible. **Open:** scrim + drawer; focus trapped inside drawer; Escape closes; scrim click closes. Link selection navigates and closes drawer. Active route styled same as desktop ([CMP-01](#cmp-01-site-header)). `aria-expanded` on menu button; drawer labelled for screen readers. |

### CMP-03: Footer Frame {#cmp-03-footer-frame}

**Used in:** F01, F04 · **Screens:** MCK-01, MCK-06, MCK-07, MCK-12, MCK-13, MCK-14

| Aspect | Description |
|--------|-------------|
| **What** | Full-bleed bottom band with copyright, optional methodology tagline, and understated LinkedIn text link (F04). Frames every shell route. |
| **Looks** | Background `--color-footer-bg`; top border `--color-border`. Desktop: copyright (and tagline if present) left, [CMP-08](#cmp-08-external-link) **LinkedIn** right on one row. Mobile: stack vertically with readable gap. Text `--font-size-small`, `--color-text-muted`. |
| **Behaves** | Static on all routes; no collapse or interaction beyond LinkedIn link. Semantic `<footer>` landmark. Layout reflows at `--breakpoint-mobile` without clipping or overlap. |

### CMP-04: Primary Button {#cmp-04-primary-button}

**Used in:** F02 · **Screens:** MCK-03, MCK-06

| Aspect | Description |
|--------|-------------|
| **What** | Single hero call-to-action — **Explore benefits** — scrolls to benefits anchor. Only primary button on Home; no contact CTAs in hero. |
| **Looks** | Filled button: background `--color-primary`, white label, `--radius-button`, padding comfortable for touch. `--font-size-body`, medium weight. Mobile: may span full content width below hero text. |
| **Behaves** | **Default:** teal fill. **Hover:** `--color-primary-hover`. **Focus-visible:** outline ring meeting contrast requirements. Click/Enter activates smooth scroll to benefits section id (no route change). Not used for external links or About navigation. |

### CMP-05: Benefit Card {#cmp-05-benefit-card}

**Used in:** F02 · **Screens:** MCK-04, MCK-06, MCK-07

| Aspect | Description |
|--------|-------------|
| **What** | One of four benefit summaries in the Home grid — icon placeholder, title, and 2–3 sentence prose blurb (rapid docs, test coverage, quality, legacy modernization). |
| **Looks** | Panel on `--color-surface-elevated` with `--color-border` outline and `--radius-card`. Internal padding ~1.5rem. Icon placeholder (simple shape, not emoji). Title `--font-size-h2` weight; body `--font-size-body`, `--color-text`. Grid: 2×2 desktop; single column stack mobile with consistent gap. |
| **Behaves** | Static display — no expand/collapse or click action in MVP. Cards reflow at `--breakpoint-mobile` without horizontal scroll. Heading level appropriate within section hierarchy (card title below section H2). |

### CMP-06: Section Heading {#cmp-06-section-heading}

**Used in:** F02, F03 · **Screens:** MCK-03, MCK-04, MCK-05, MCK-08, MCK-09, MCK-10, MCK-11

| Aspect | Description |
|--------|-------------|
| **What** | Section or page title block — H1 for page/hero contexts, H2 for content sections — with optional one-line intro below. |
| **Looks** | H1 uses `--font-size-h1`, `--color-text`; H2 uses `--font-size-h2`. Optional intro line `--font-size-body`, `--color-text-muted`. Vertical spacing above/below follows `--spacing-section-y` rhythm. Centred in hero contexts; left-aligned in linear About sections. |
| **Behaves** | Static text; no interaction. Preserves logical heading order (single H1 per page; section H2s follow). Responsive: headline may scale down slightly on mobile while remaining readable at 320px width. |

### CMP-07: Text Link {#cmp-07-text-link}

**Used in:** F02, F03, F01 · **Screens:** MCK-05, MCK-06, MCK-11, MCK-12, MCK-14

| Aspect | Description |
|--------|-------------|
| **What** | In-page anchor target and soft cross-route links — **Who built this?** / **About the author** band to `/about`, **Back to overview** to `/`, 404 **Back to Home**. Low-emphasis credibility navigation, not primary CTAs. |
| **Looks** | Teal text (`--color-primary`) or underlined `--color-text` per context; no button chrome. `--font-size-body` or `--font-size-small` in bands. Sits in soft credibility band with extra vertical padding above/below section content. |
| **Behaves** | **Default / hover / focus-visible:** colour shift to `--color-primary-hover`; underline on hover where appropriate. Internal routes use client navigation. Keyboard activatable. Distinct from [CMP-04](#cmp-04-primary-button) (no filled button style) and [CMP-08](#cmp-08-external-link) (same-site only). |

### CMP-08: External Link {#cmp-08-external-link}

**Used in:** F03, F04 · **Screens:** MCK-01, MCK-11, MCK-12

| Aspect | Description |
|--------|-------------|
| **What** | Subtle LinkedIn text link to site owner profile — in About author section and footer. Plain label **LinkedIn**; no icon or banner. |
| **Looks** | Muted styling: `--color-text-muted` default, `--color-primary` on hover. `--font-size-small` in footer; inline within author prose on About. No button shape or hire-me banner. |
| **Behaves** | Opens `https://www.linkedin.com/in/mikhail-shumilov-549a57292/` in new tab with `target="_blank"` and `rel="noopener noreferrer"`. **Hover / focus-visible:** colour emphasis only. Same URL in footer (F04) and author section (F03). |

## Layout patterns {#layout-patterns}

| Pattern | Description | Feature |
|---------|-------------|---------|
| Full-bleed chrome bands | Header and footer span viewport width; main content in centred `--max-width-content` column | F01 |
| Centered hero | Full-width elevated band; centred H1, subhead, single primary CTA; no contact CTAs | F02 |
| Benefits 2×2 grid | Four equal cards in two columns on desktop; single column stack on mobile | F02 |
| Numbered steps | Three ordered steps with step number, title, and short prose | F02 |
| Linear content sections | Page hero then stacked prose sections with `--spacing-section-y` rhythm | F03 |
| Soft credibility band | Low-emphasis [CMP-07](#cmp-07-text-link) to About or Home at page bottom — not a hero CTA | F02, F03 |
