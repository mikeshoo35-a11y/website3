import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("TC-16: Docs accessibility — axe and keyboard", () => {
  test("reports no axe violations in the docs layout", async ({ page }) => {
    await page.goto("/docs");

    const results = await new AxeBuilder({ page })
      .include('[data-docs="layout"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("reports no axe violations in docs tree and content pane", async ({ page }) => {
    await page.goto("/docs/1-scope/features-list.md");
    await expect(
      page.getByRole("heading", { name: "Features List", exact: true }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[data-docs="tree"]')
      .include('[data-docs="content"]')
      .exclude('[data-testid="mermaid-diagram"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("supports keyboard navigation through nav, tree, and content links", async ({
    page,
  }) => {
    await page.goto("/docs/1-scope/features-list.md");

    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Docs" }).focus();
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Docs" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const treeFile = page
      .getByRole("navigation", { name: "Documentation tree" })
      .getByRole("button", { name: "features-list.md", exact: true });
    await treeFile.focus();
    await expect(treeFile).toBeFocused();

    const contentLink = page
      .locator('[data-docs="content"]')
      .getByRole("link", { name: "F01-site-shell-layout" });
    await contentLink.focus();
    await expect(contentLink).toBeFocused();
    await expect(contentLink).toBeVisible();
  });

  test("mobile tree toggle is keyboard reachable", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/docs");

    const browseButton = page.getByRole("button", { name: "Browse files" });
    await browseButton.focus();
    await expect(browseButton).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Documentation tree" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Documentation tree" })).toBeHidden();
  });
});
