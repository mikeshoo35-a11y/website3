import { expect, test } from "@playwright/test";

test.describe("TC-05: Centred content column and consistent shell theme", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("keeps centred column and consistent shell styling", async ({ page }) => {
    await page.goto("/");

    const column = page.getByTestId("content-column").first();
    const box = await column.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(1180);
    expect(box!.width).toBeLessThanOrEqual(1200);

    const headerClass = await page.locator("header").getAttribute("class");
    const footerClass = await page.locator("footer").getAttribute("class");

    await page.goto("/about");
    await expect(page.locator("header")).toHaveAttribute("class", headerClass ?? "");
    await expect(page.locator("footer")).toHaveAttribute("class", footerClass ?? "");
  });
});
