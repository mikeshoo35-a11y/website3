import { expect, test } from "@playwright/test";

async function openFeaturesList(page: import("@playwright/test").Page) {
  await page.goto("/docs/1-scope/features-list.md");
  await expect(
    page.getByRole("heading", { name: "Features List", exact: true }),
  ).toBeVisible();
}

test.describe("TC-21: Docs in-viewer relative link navigation", () => {
  test("navigates relative product links without leaving /docs", async ({ page }) => {
    await openFeaturesList(page);

    await page
      .locator('[data-docs="content"]')
      .getByRole("link", { name: "F01-site-shell-layout" })
      .click();

    await expect(page).toHaveURL(/\/docs\/2-features\/F01-site-shell-layout\.md$/);
    await expect(
      page.getByRole("heading", { name: "F01: Site shell & layout", exact: true }),
    ).toBeVisible();
  });

  test("opens external links in a new tab with safe rel attributes", async ({
    page,
  }) => {
    await page.goto("/docs/2-features/F03-about-page.md");
    await expect(
      page.getByRole("heading", { name: "F03: About page", exact: true }),
    ).toBeVisible();

    const externalLink = page
      .locator('[data-docs="content"]')
      .getByRole("link", { name: "Mikhail Shumilov" })
      .first();

    await expect(externalLink).toHaveAttribute("href", /https:\/\//);
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", /noopener/);
  });
});
