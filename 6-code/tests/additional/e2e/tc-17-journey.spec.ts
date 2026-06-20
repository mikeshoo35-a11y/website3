import { expect, test } from "@playwright/test";

test.describe("TC-17: Practitioner cross-route journey smoke", () => {
  test("SCN-01 happy path from Home hero to About methodology", async ({
    page,
  }) => {
    await page.goto("/");

    const hero = page.locator('[data-section="hero"]');
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();

    await page.getByRole("link", { name: "Explore benefits" }).click();
    await expect(page.locator("#benefits")).toBeInViewport();
    await expect(page.getByText("Rapid documentation development")).toBeVisible();

    await page
      .locator('[data-section="about-band"]')
      .getByRole("link")
      .click();
    await expect(page).toHaveURL("/about");
    await expect(
      page.locator('[data-section="methodology"]'),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "What AI Friendly Docs is" })).toBeVisible();
  });
});
