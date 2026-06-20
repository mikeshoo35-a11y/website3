import { expect, test } from "@playwright/test";

const BENEFIT_TITLES = [
  "Rapid documentation development",
  "Test coverage generation and maintenance",
  "Higher software quality",
  "Legacy modernization",
];

test.describe("TC-10: Benefits grid content and responsive layout", () => {
  test("renders four benefit cards with prose blurbs", async ({ page }) => {
    await page.goto("/");

    const cards = page.getByTestId("benefit-card");
    await expect(cards).toHaveCount(4);

    for (const title of BENEFIT_TITLES) {
      const card = cards.filter({ hasText: title });
      await expect(card).toHaveCount(1);
      await expect(card.locator("p")).not.toBeEmpty();
    }
  });

  test("stacks cards without horizontal scroll at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalScroll).toBe(false);

    const grid = page.getByTestId("benefits-grid");
    await expect(grid.getByTestId("benefit-card")).toHaveCount(4);
  });
});
