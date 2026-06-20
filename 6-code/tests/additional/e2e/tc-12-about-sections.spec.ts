import { expect, test } from "@playwright/test";

const SECTION_HEADINGS = [
  "About AI Friendly Docs",
  "What AI Friendly Docs is",
  "Why this site exists",
  "About the author",
];

test.describe("TC-12: About page sections and order", () => {
  test("renders sections in order inside the shell", async ({ page }) => {
    await page.goto("/about");

    await expect(page.locator('header[data-shell="header"]')).toBeVisible();
    await expect(page.locator('[data-page="about"]')).toBeVisible();

    const headings = page.locator('[data-page="about"] h1, [data-page="about"] h2');
    const headingTexts = await headings.allTextContents();
    expect(headingTexts).toEqual(SECTION_HEADINGS);

    await expect(page.locator('[data-page="about"] img')).toHaveCount(0);

    const backLink = page
      .locator('[data-section="back-link"]')
      .getByRole("link", { name: "Back to overview" });
    await expect(backLink).toHaveAttribute("href", "/");
  });
});
