import { expect, test } from "@playwright/test";

test.describe("TC-22: Docs nav link and active state", () => {
  test("shows Docs in global nav with correct active state", async ({ page }) => {
    await page.goto("/");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    const homeLink = primaryNav.getByRole("link", { name: "Home" });
    const aboutLink = primaryNav.getByRole("link", { name: "About" });
    const docsLink = primaryNav.getByRole("link", { name: "Docs" });

    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(docsLink).toBeVisible();

    await docsLink.click();
    await expect(page).toHaveURL("/docs");
    await expect(docsLink).toHaveAttribute("aria-current", "page");
    await expect(homeLink).not.toHaveAttribute("aria-current", "page");
    await expect(aboutLink).not.toHaveAttribute("aria-current", "page");
  });

  test("includes Docs in mobile hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    const docsLink = drawer.getByRole("link", { name: "Docs" });

    await expect(drawer.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "About" })).toBeVisible();
    await expect(docsLink).toBeVisible();

    await docsLink.click();
    await expect(page).toHaveURL("/docs");
    await expect(drawer).toBeHidden();
  });
});
