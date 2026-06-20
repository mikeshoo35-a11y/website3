import { expect, test } from "@playwright/test";

test.describe("TC-11: How-it-works steps and About band link", () => {
  test("shows three ordered steps and About band without contact CTAs", async ({
    page,
  }) => {
    await page.goto("/");

    const steps = page.locator('[data-section="how-it-works"] ol li');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText(/structured text documentation/i);
    await expect(steps.nth(1)).toContainText(
      /AI-assisted elaboration and validation/i,
    );
    await expect(steps.nth(2)).toContainText(/implementation and automated tests/i);

    const aboutBand = page.locator('[data-section="about-band"]');
    await expect(aboutBand.getByRole("link")).toHaveAttribute("href", "/about");
    await expect(aboutBand.getByRole("link", { name: "LinkedIn" })).toHaveCount(
      0,
    );
  });

  test("About band navigates to About page", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('[data-section="about-band"]')
      .getByRole("link")
      .click();
    await expect(page).toHaveURL("/about");
  });
});
