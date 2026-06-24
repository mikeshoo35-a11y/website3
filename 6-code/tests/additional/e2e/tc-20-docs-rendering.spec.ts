import { expect, test } from "@playwright/test";

async function expandFolder(page: import("@playwright/test").Page, folderName: string) {
  await page
    .getByRole("navigation", { name: "Documentation tree" })
    .getByRole("button", { name: folderName, exact: true })
    .click();
}

async function selectDoc(page: import("@playwright/test").Page, fileName: string) {
  await page
    .getByRole("navigation", { name: "Documentation tree" })
    .getByRole("button", { name: fileName, exact: true })
    .click();
}

test.describe("TC-20: Docs route tree and markdown rendering", () => {
  test("shows split-pane docs layout with tree, markdown, Mermaid, and SVG", async ({
    page,
  }) => {
    await page.goto("/docs");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator('[data-docs="layout"]')).toBeVisible();
    await expect(page.locator('[data-docs="tree"]')).toBeVisible();
    await expect(page.locator('[data-docs="content"]')).toBeVisible();

    await expandFolder(page, "1-scope/");
    await selectDoc(page, "features-list.md");

    await expect(page).toHaveURL(/\/docs\/1-scope\/features-list\.md$/);
    await expect(
      page.getByRole("heading", { name: "Features List", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(
      page.locator('[data-docs="content"]').getByRole("cell", { name: "F01", exact: true }),
    ).toBeVisible();

    await expect(page.getByTestId("mermaid-diagram").locator("svg")).toBeVisible({
      timeout: 15_000,
    });

    await expandFolder(page, "4-design/");
    await selectDoc(page, "mockups.md");

    await expect(page).toHaveURL(/\/docs\/4-design\/mockups\.md$/);
    await expect(page.locator('[data-docs="content"] img').first()).toBeVisible();
  });

  test("hides the tree behind a toggle on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/docs");

    await expect(page.locator('[data-docs="tree"]')).toBeHidden();
    await expect(page.getByRole("button", { name: "Browse files" })).toBeVisible();

    await page.getByRole("button", { name: "Browse files" }).click();
    await expect(page.getByRole("dialog", { name: "Documentation tree" })).toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Documentation tree" }).getByRole("button", {
        name: "1-scope/",
        exact: true,
      }),
    ).toBeVisible();
  });
});
