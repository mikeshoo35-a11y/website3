import { expect, test } from "@playwright/test";

test.describe("TC-02: Root layout landmarks on Home and About", () => {
  for (const route of ["/", "/about"] as const) {
    test(`renders shell landmarks on ${route}`, async ({ page }) => {
      await page.goto(route);

      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      await expect(page.locator("main [data-page]")).toBeVisible();
    });
  }
});
