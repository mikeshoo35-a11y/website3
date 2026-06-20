# Traceability Matrix

See [06-traceability](../.cursor/rules/06-traceability.mdc).

**Must scope** (`GOL-01`, `GOL-02`) — full chain through `FR`; `BL` and `TC` pending until [backlog.md](backlog.md) and [testing-plan.md](testing-plan.md) exist.

## Matrix

| GOL | SCN | UR | FR | Feature | NFR | ADR | BL | TC |
|-----|-----|----|----|---------|-----|-----|----|----|
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F01-02 | [FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01) | F01 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F01-01 | [FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02) | F01 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F01-01 | [FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03) | F01 | [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-02 | [FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04) | F01 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-02 | [FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05) | F01 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-02 | [FR-F01-06](../2-features/F01-site-shell-layout.md#fr-f01-06) | F01 | — | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-02 | [FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07) | F01 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-03 | [FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08) | F01 | — | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | — | UR-F01-03 | [FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09) | F01 | [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-01 | [FR-F02-01](../2-features/F02-home-page.md#fr-f02-01) | F02 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-01 | [FR-F02-02](../2-features/F02-home-page.md#fr-f02-02) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-01 | [FR-F02-03](../2-features/F02-home-page.md#fr-f02-03) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-02](../1-scope/business-scenarios.md#scn-02-evaluate-benefits) | UR-F02-02 | [FR-F02-04](../2-features/F02-home-page.md#fr-f02-04) | F02 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-02](../1-scope/business-scenarios.md#scn-02-evaluate-benefits) | UR-F02-02 | [FR-F02-05](../2-features/F02-home-page.md#fr-f02-05) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-03 | [FR-F02-06](../2-features/F02-home-page.md#fr-f02-06) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers), [SCN-02](../1-scope/business-scenarios.md#scn-02-evaluate-benefits) | UR-F02-04 | [FR-F02-07](../2-features/F02-home-page.md#fr-f02-07) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-01 | [FR-F02-08](../2-features/F02-home-page.md#fr-f02-08) | F02 | [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F02-01 | [FR-F02-09](../2-features/F02-home-page.md#fr-f02-09) | F02 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-01](../2-features/F03-about-page.md#fr-f03-01) | F03 | [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout), [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-02](../2-features/F03-about-page.md#fr-f03-02) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-03](../2-features/F03-about-page.md#fr-f03-03) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-02 | [FR-F03-04](../2-features/F03-about-page.md#fr-f03-04) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-03 | [FR-F03-05](../2-features/F03-about-page.md#fr-f03-05) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-04 | [FR-F03-06](../2-features/F03-about-page.md#fr-f03-06) | F03 | [NFR-05](../3-arch/solution-strategy.md#nfr-05-external-link-security) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-07](../2-features/F03-about-page.md#fr-f03-07) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-08](../2-features/F03-about-page.md#fr-f03-08) | F03 | [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo) | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) | — | — |
| [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners) | [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) | UR-F03-01 | [FR-F03-09](../2-features/F03-about-page.md#fr-f03-09) | F03 | — | [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) | — | — |

## By Feature

### F01: Site shell & layout

| UR | FR | Backlog | Tests |
|----|----|---------|-------|
| UR-F01-01 | [FR-F01-02](../2-features/F01-site-shell-layout.md#fr-f01-02), [FR-F01-03](../2-features/F01-site-shell-layout.md#fr-f01-03) | — | — |
| UR-F01-02 | [FR-F01-01](../2-features/F01-site-shell-layout.md#fr-f01-01), [FR-F01-04](../2-features/F01-site-shell-layout.md#fr-f01-04), [FR-F01-05](../2-features/F01-site-shell-layout.md#fr-f01-05), [FR-F01-06](../2-features/F01-site-shell-layout.md#fr-f01-06), [FR-F01-07](../2-features/F01-site-shell-layout.md#fr-f01-07) | — | — |
| UR-F01-03 | [FR-F01-08](../2-features/F01-site-shell-layout.md#fr-f01-08), [FR-F01-09](../2-features/F01-site-shell-layout.md#fr-f01-09) | — | — |

**Traces to:** [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility), [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers)

### F02: Home page

| UR | FR | Backlog | Tests |
|----|----|---------|-------|
| UR-F02-01 | [FR-F02-01](../2-features/F02-home-page.md#fr-f02-01), [FR-F02-02](../2-features/F02-home-page.md#fr-f02-02), [FR-F02-03](../2-features/F02-home-page.md#fr-f02-03), [FR-F02-08](../2-features/F02-home-page.md#fr-f02-08), [FR-F02-09](../2-features/F02-home-page.md#fr-f02-09) | — | — |
| UR-F02-02 | [FR-F02-04](../2-features/F02-home-page.md#fr-f02-04), [FR-F02-05](../2-features/F02-home-page.md#fr-f02-05) | — | — |
| UR-F02-03 | [FR-F02-06](../2-features/F02-home-page.md#fr-f02-06) | — | — |
| UR-F02-04 | [FR-F02-07](../2-features/F02-home-page.md#fr-f02-07) | — | — |

**Traces to:** [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners), [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers), [SCN-02](../1-scope/business-scenarios.md#scn-02-evaluate-benefits) · **Requires:** [F01](../2-features/F01-site-shell-layout.md)

### F03: About page

| UR | FR | Backlog | Tests |
|----|----|---------|-------|
| UR-F03-01 | [FR-F03-01](../2-features/F03-about-page.md#fr-f03-01), [FR-F03-02](../2-features/F03-about-page.md#fr-f03-02), [FR-F03-03](../2-features/F03-about-page.md#fr-f03-03), [FR-F03-07](../2-features/F03-about-page.md#fr-f03-07), [FR-F03-08](../2-features/F03-about-page.md#fr-f03-08), [FR-F03-09](../2-features/F03-about-page.md#fr-f03-09) | — | — |
| UR-F03-02 | [FR-F03-04](../2-features/F03-about-page.md#fr-f03-04) | — | — |
| UR-F03-03 | [FR-F03-05](../2-features/F03-about-page.md#fr-f03-05) | — | — |
| UR-F03-04 | [FR-F03-06](../2-features/F03-about-page.md#fr-f03-06) | — | — |

**Traces to:** [GOL-01](../1-scope/stakeholders-and-goals.md#gol-01-educate-practitioners), [GOL-02](../1-scope/stakeholders-and-goals.md#gol-02-brand-credibility), [SCN-01](../1-scope/business-scenarios.md#scn-01-practitioner-discovers) · **Requires:** [F01](../2-features/F01-site-shell-layout.md)

### F04: Optional LinkedIn contact *(Should — outside Must matrix)*

| UR | FR | Backlog | Tests |
|----|----|---------|-------|
| UR-F04-01 | [FR-F04-01](../2-features/F04-optional-linkedin-contact.md#fr-f04-01), [FR-F04-04](../2-features/F04-optional-linkedin-contact.md#fr-f04-04), [FR-F04-05](../2-features/F04-optional-linkedin-contact.md#fr-f04-05) | — | — |
| UR-F04-02 | [FR-F04-02](../2-features/F04-optional-linkedin-contact.md#fr-f04-02), [FR-F04-03](../2-features/F04-optional-linkedin-contact.md#fr-f04-03), [FR-F04-06](../2-features/F04-optional-linkedin-contact.md#fr-f04-06), [FR-F04-07](../2-features/F04-optional-linkedin-contact.md#fr-f04-07) | — | — |

**Traces to:** [GOL-03](../1-scope/stakeholders-and-goals.md#gol-03-optional-contact), [SCN-03](../1-scope/business-scenarios.md#scn-03-optional-contact) · **Requires:** [F01](../2-features/F01-site-shell-layout.md)

## Cross-cutting

| NFR | Features | ADR |
|-----|----------|-----|
| [NFR-01](../3-arch/solution-strategy.md#nfr-01-responsive-layout) | F01, F02, F03, F04 | [ADR-02](../3-arch/solution-strategy.md#adr-02-tailwind-css-styling) |
| [NFR-02](../3-arch/solution-strategy.md#nfr-02-accessibility) | F01, F02, F03, F04 | [ADR-05](../3-arch/solution-strategy.md#adr-05-playwright-and-vitest-testing) |
| [NFR-03](../3-arch/solution-strategy.md#nfr-03-performance-seo) | F01, F02, F03 | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel) |
| [NFR-04](../3-arch/solution-strategy.md#nfr-04-static-architecture) | F01, F02, F03, F04 | [ADR-01](../3-arch/solution-strategy.md#adr-01-nextjs-app-router-with-ssg-on-vercel), [ADR-04](../3-arch/solution-strategy.md#adr-04-tsx-component-content-model) |
| [NFR-05](../3-arch/solution-strategy.md#nfr-05-external-link-security) | F03, F04 | — |
