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

test.describe("RT-04: Documentation browser journey", () => {
  test("SCN-04 happy path from header through tree to in-viewer link", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Docs" })
      .click();
    await expect(page).toHaveURL("/docs");

    await expandFolder(page, "1-scope/");
    await selectDoc(page, "features-list.md");
    await expect(page).toHaveURL(/\/docs\/1-scope\/features-list\.md$/);

    await page
      .locator('[data-docs="content"]')
      .getByRole("link", { name: "F01-site-shell-layout" })
      .click();

    await expect(page).toHaveURL(/\/docs\/2-features\/F01-site-shell-layout\.md$/);
    await expect(
      page.getByRole("heading", { name: "F01: Site shell & layout", exact: true }),
    ).toBeVisible();
  });
});
