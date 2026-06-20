import { expect, test } from "@playwright/test";

test.describe("TC-07: 404 page within site shell", () => {
  test("renders not-found message inside shared shell", async ({ page }) => {
    await page.goto("/missing-page");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });
});
