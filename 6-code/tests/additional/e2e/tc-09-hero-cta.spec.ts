import { expect, test } from "@playwright/test";

test.describe("TC-09: Hero CTA scrolls to benefits anchor", () => {
  test("Explore benefits scrolls to benefits section without route change", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Explore benefits" }).click();
    expect(new URL(page.url()).pathname).toBe("/");

    const benefits = page.locator("#benefits");
    await expect(benefits).toBeInViewport();
  });
});
