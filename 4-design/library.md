# Design Library

Shared visual language for the AI Friendly Docs marketing site ([GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility)). Tokens map to Tailwind theme extensions in implementation ([ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling)). Component catalog: [design-strategy.md](design-strategy.md#component-inventory).

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
| `--max-width-content` | `1200px` | Centred main column ([FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05)) |
| `--breakpoint-mobile` | `768px` | Hamburger nav below this width ([FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04)) |
| `--radius-card` | `8px` | Benefit cards and elevated panels |
| `--radius-button` | `6px` | Primary buttons |
