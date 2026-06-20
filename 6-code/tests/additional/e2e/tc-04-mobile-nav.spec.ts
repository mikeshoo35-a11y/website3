import { expect, test } from "@playwright/test";

test.describe("TC-04: Mobile hamburger navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("exposes nav behind hamburger on narrow viewports", async ({ page }) => {
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeHidden();
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Navigation menu" }).getByRole("link", { name: "About" })).toBeVisible();

    await page.getByRole("dialog", { name: "Navigation menu" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeHidden();
  });
});
