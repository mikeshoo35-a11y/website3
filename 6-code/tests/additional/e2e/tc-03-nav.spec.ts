import { expect, test } from "@playwright/test";

test.describe("TC-03: Brand link and active nav state", () => {
  test("tracks active route and brand returns to Home", async ({ page }) => {
    await page.goto("/about");

    const homeLink = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" });
    const aboutLink = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" });

    await expect(aboutLink).toHaveAttribute("aria-current", "page");
    await expect(homeLink).not.toHaveAttribute("aria-current", "page");

    await page.getByRole("link", { name: "AI Friendly Docs" }).click();
    await expect(page).toHaveURL("/");

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
