import { expect, test } from "@playwright/test";
import { EXTERNAL_LINK_REL, LINKEDIN_URL } from "../../../lib/site-links";

test.describe("TC-13: About author LinkedIn link security", () => {
  test("author section LinkedIn link is low-emphasis and secure", async ({
    page,
  }) => {
    await page.goto("/about");

    const authorSection = page.locator('[data-section="author"]');
    const linkedIn = authorSection.getByRole("link", { name: "LinkedIn" });

    await expect(linkedIn).toBeVisible();
    await expect(linkedIn).toHaveAttribute("href", LINKEDIN_URL);
    await expect(linkedIn).toHaveAttribute("target", "_blank");
    await expect(linkedIn).toHaveAttribute("rel", EXTERNAL_LINK_REL);
    await expect(linkedIn.locator("svg")).toHaveCount(0);
  });
});
