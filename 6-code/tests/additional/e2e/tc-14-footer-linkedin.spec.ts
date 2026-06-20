import { expect, test } from "@playwright/test";
import { EXTERNAL_LINK_REL, LINKEDIN_URL } from "../../../lib/site-links";

const ROUTES = ["/", "/about", "/does-not-exist"] as const;

test.describe("TC-14: Footer LinkedIn contact", () => {
  for (const route of ROUTES) {
    test(`footer LinkedIn present on ${route}`, async ({ page }) => {
      await page.goto(route);

      const footer = page.locator("footer");
      const linkedIn = footer.getByRole("link", { name: "LinkedIn" });

      await expect(linkedIn).toBeVisible();
      await expect(linkedIn).toHaveAttribute("href", LINKEDIN_URL);
      await expect(linkedIn).toHaveAttribute("target", "_blank");
      await expect(linkedIn).toHaveAttribute("rel", EXTERNAL_LINK_REL);
      await expect(linkedIn.locator("svg")).toHaveCount(0);
    });
  }

  test("desktop layout places copyright left and LinkedIn right", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const footer = page.locator("footer");
    const row = footer.locator('[data-testid="content-column"] > div').first();
    const box = await row.boundingBox();
    expect(box).not.toBeNull();

    const copyright = footer.getByText(/© 2026 AI Friendly Docs/);
    const linkedIn = footer.getByRole("link", { name: "LinkedIn" });

    const copyrightBox = await copyright.boundingBox();
    const linkedInBox = await linkedIn.boundingBox();
    expect(copyrightBox).not.toBeNull();
    expect(linkedInBox).not.toBeNull();

    expect(copyrightBox!.x).toBeLessThan(linkedInBox!.x);
    expect(Math.abs(copyrightBox!.y - linkedInBox!.y)).toBeLessThan(40);
  });

  test("LinkedIn opens in a new tab", async ({ page, context }) => {
    await page.goto("/");

    const popupPromise = context.waitForEvent("page");
    await page.locator("footer").getByRole("link", { name: "LinkedIn" }).click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/linkedin\.com.*mikhail-shumilov-549a57292/);
    await popup.close();
  });
});
