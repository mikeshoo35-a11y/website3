import { expect, test } from "@playwright/test";

test.describe("TC-06: Footer frame copyright and tagline", () => {
  test("shows copyright and tagline in footer", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer.getByText(/© 2026 AI Friendly Docs/)).toBeVisible();
    await expect(footer.getByText("Text-first docs for humans and AI")).toBeVisible();
  });
});
