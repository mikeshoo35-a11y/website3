# Test overview

Automated tests for `6-code/` — mapped to [TC-##](../../5-dev/testing-plan.md) rows in the product testing plan.

**Run all:** `npm test` (Vitest unit + Playwright E2E)  
**Unit only:** `npm run test:unit`  
**E2E only:** `npm run test:e2e`

E2E runs against a production build (`npm run build && npm run start`) on `http://127.0.0.1:3000`. Set `CI=true` to always start a fresh server.

---

## Layout

| Path | Runner | Scope |
|------|--------|-------|
| `tests/additional/*.test.ts` | Vitest | Unit / build |
| `tests/additional/e2e/*.spec.ts` | Playwright | Browser E2E |

---

## Unit and build tests

| TC | File | Backlog | Verifies |
|----|------|---------|----------|
| TC-01 | [tc-01-metadata.test.ts](tc-01-metadata.test.ts) | BL-02, BL-03, BL-04 | Shared page title template (`createPageTitle`, `createPageMetadata`) |
| TC-18 | [tc-18-scaffold.test.ts](tc-18-scaffold.test.ts) | BL-01 | Clean `npm run build`, static architecture (no API/DB/CMS), Tailwind tokens |

---

## E2E tests

| TC | File | Backlog | Verifies |
|----|------|---------|----------|
| TC-02 | [e2e/tc-02-landmarks.spec.ts](e2e/tc-02-landmarks.spec.ts) | BL-02 | Header, main, footer landmarks on `/` and `/about` |
| TC-03 | [e2e/tc-03-nav.spec.ts](e2e/tc-03-nav.spec.ts) | BL-02 | Brand link to Home; active nav state |
| TC-04 | [e2e/tc-04-mobile-nav.spec.ts](e2e/tc-04-mobile-nav.spec.ts) | BL-02 | Hamburger drawer on narrow viewports |
| TC-05 | [e2e/tc-05-layout.spec.ts](e2e/tc-05-layout.spec.ts) | BL-02 | Centred content column; consistent shell theme |
| TC-06 | [e2e/tc-06-footer.spec.ts](e2e/tc-06-footer.spec.ts) | BL-02 | Footer copyright and tagline |
| TC-07 | [e2e/tc-07-not-found.spec.ts](e2e/tc-07-not-found.spec.ts) | BL-02 | 404 page inside site shell |
| TC-08 | [e2e/tc-08-home-hero.spec.ts](e2e/tc-08-home-hero.spec.ts) | BL-03 | Methodology-first Home hero |
| TC-09 | [e2e/tc-09-hero-cta.spec.ts](e2e/tc-09-hero-cta.spec.ts) | BL-03 | **Explore benefits** scrolls to `#benefits` |
| TC-10 | [e2e/tc-10-benefits.spec.ts](e2e/tc-10-benefits.spec.ts) | BL-03 | Four benefit cards; responsive stack at 320px |
| TC-11 | [e2e/tc-11-how-it-works.spec.ts](e2e/tc-11-how-it-works.spec.ts) | BL-03 | Three workflow steps; About band link |
| TC-12 | [e2e/tc-12-about-sections.spec.ts](e2e/tc-12-about-sections.spec.ts) | BL-04 | About section order and content |
| TC-13 | [e2e/tc-13-about-linkedin.spec.ts](e2e/tc-13-about-linkedin.spec.ts) | BL-04 | Author LinkedIn link security attributes |
| TC-14 | [e2e/tc-14-footer-linkedin.spec.ts](e2e/tc-14-footer-linkedin.spec.ts) | BL-05 | Footer LinkedIn on all shell routes |
| TC-17 | [e2e/tc-17-journey.spec.ts](e2e/tc-17-journey.spec.ts) | BL-06 | SCN-01 cross-route journey smoke |

---

## Manual tests (not in this folder)

| TC | Type | Notes |
|----|------|-------|
| TC-15 | Lighthouse | Mobile audit on `/` and `/about` — Performance, Accessibility, SEO ≥ 90 |
| TC-16 | axe + keyboard | WCAG 2.1 AA walkthrough on Home and About |

See [testing-plan.md](../../5-dev/testing-plan.md) for full steps and traceability.
