import { expect, test } from "@playwright/test";

test.describe("TC-08: Home route and methodology-first hero", () => {
  test("hero leads with AI-friendly documentation and structured text subhead", async ({
    page,
  }) => {
    await page.goto("/");

    const hero = page.locator('[data-section="hero"]');
    await expect(hero.getByRole("heading", { level: 1 })).toContainText(
      /AI-friendly documentation/i,
    );
    await expect(hero).toContainText(/structured text/i);
    await expect(hero).toContainText(/AI agents?/i);
    await expect(hero.getByRole("link", { name: "LinkedIn" })).toHaveCount(0);
    await expect(hero.getByRole("button", { name: /contact/i })).toHaveCount(0);
  });
});
