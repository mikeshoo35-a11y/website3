import { launch as launchChrome } from "chrome-launcher";
import lighthouse from "lighthouse";
import { expect, test } from "@playwright/test";

const MIN_SCORE = 0.9;

test.describe("TC-15: Lighthouse mobile audit on Docs", () => {
  test("scores ≥ 90 on Performance, Accessibility, and SEO for /docs", async () => {
    const chrome = await launchChrome({
      chromeFlags: ["--headless=new", "--no-sandbox"],
    });

    try {
      const result = await lighthouse("http://127.0.0.1:3000/docs", {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: ["performance", "accessibility", "seo"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
      });

      const categories = result?.lhr.categories;
      expect(categories?.performance.score).toBeGreaterThanOrEqual(MIN_SCORE);
      expect(categories?.accessibility.score).toBeGreaterThanOrEqual(MIN_SCORE);
      expect(categories?.seo.score).toBeGreaterThanOrEqual(MIN_SCORE);
    } finally {
      try {
        await chrome.kill();
      } catch {
        // Windows may block temp-dir cleanup while Chrome handles settle.
      }
    }
  });
});
