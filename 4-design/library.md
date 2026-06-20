# Design Library

Shared visual language for the AI Friendly Docs marketing site ([GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility)). Tokens map to Tailwind theme extensions in implementation ([ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling)).

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0d9488` | Primary CTA buttons, active nav link, accent borders |
| `--color-primary-hover` | `#0f766e` | Button and link hover states |
| `--color-text` | `#1f2937` | Headings, body copy |
| `--color-text-muted` | `#6b7280` | Subheads, footer text, secondary labels |
| `--color-surface` | `#fafaf9` | Page background (warm off-white) |
| `--color-surface-elevated` | `#ffffff` | Header, cards, hero bands on surface |
| `--color-border` | `#e5e7eb` | Header/footer dividers, card outlines |
| `--color-footer-bg` | `#f3f4f6` | Footer frame band |
| `--font-family` | `Inter, system-ui, sans-serif` | Headings and body ([ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling)) |
| `--font-size-h1` | `2.25rem` / `36px` | Page and hero headlines (desktop) |
| `--font-size-h2` | `1.5rem` / `24px` | Section headings |
| `--font-size-body` | `1rem` / `16px` | Body copy |
| `--font-size-small` | `0.875rem` / `14px` | Nav links, footer, captions |
| `--spacing-section-y` | `4rem` / `64px` | Vertical padding between major sections |
| `--spacing-content-x` | `1.5rem` / `24px` | Horizontal gutter inside content column |
| `--max-width-content` | `1200px` | Centred main column ([FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07)) |
| `--breakpoint-mobile` | `768px` | Hamburger nav below this width ([FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04)) |
| `--radius-card` | `8px` | Benefit cards and elevated panels |
| `--radius-button` | `6px` | Primary buttons |

## Components

### CMP-01: Site Header {#cmp-01-site-header}

**Purpose:** Brand lockup and global nav (Home, About) in a full-bleed top band · **Used in:** F01 · **States:** default, active route (teal underline or colour on current page)

### CMP-02: Mobile Nav Drawer {#cmp-02-mobile-nav-drawer}

**Purpose:** Hamburger-triggered overlay with stacked nav links on narrow viewports · **Used in:** F01 · **States:** closed, open (overlay + focus trap)

### CMP-03: Footer Frame {#cmp-03-footer-frame}

**Purpose:** Copyright, methodology tagline, optional understated LinkedIn text link · **Used in:** F01, F04 · **States:** default

### CMP-04: Primary Button {#cmp-04-primary-button}

**Purpose:** Single hero CTA (**Explore benefits**) — teal fill, white label · **Used in:** F02 · **States:** default, hover, focus-visible

### CMP-05: Benefit Card {#cmp-05-benefit-card}

**Purpose:** Icon placeholder, title, 2–3 sentence blurb in a bordered panel · **Used in:** F02 · **States:** default

### CMP-06: Section Heading {#cmp-06-section-heading}

**Purpose:** H2 section title with optional one-line intro below · **Used in:** F02, F03 · **States:** default

### CMP-07: Text Link {#cmp-07-text-link}

**Purpose:** In-page anchor and soft cross-route links (About band, Back to overview) — teal or underlined text · **Used in:** F02, F03 · **States:** default, hover, focus-visible

### CMP-08: External Link {#cmp-08-external-link}

**Purpose:** Subtle LinkedIn text link with `target="_blank"` and `rel="noopener noreferrer"` · **Used in:** F03, F04 · **States:** default, hover

## Patterns

| Pattern | Description | Feature |
|---------|-------------|---------|
| Centered hero | Full-width elevated band; centred H1, subhead, single primary CTA; no contact CTAs | F02 |
| Benefits 2×2 grid | Four equal cards in two columns on desktop; single column stack on mobile | F02 |
| Numbered steps | Three ordered steps with step number, title, and short prose | F02 |
| Linear content sections | Page hero then stacked prose sections with generous vertical rhythm | F03 |
| Full-bleed chrome bands | Header and footer span viewport width; main content in centred max-width column | F01 |
| Soft credibility band | Low-emphasis text link to About or Home at page bottom — not a hero CTA | F02, F03 |
