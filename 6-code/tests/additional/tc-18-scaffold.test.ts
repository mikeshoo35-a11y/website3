import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");

describe("TC-18: Project scaffold build succeeds", () => {
  it(
    "runs npm run build with exit code 0",
    () => {
      execSync("npm run build", { cwd: root, stdio: "pipe" });
    },
    120_000,
  );

  it("has no API routes (NFR-04 static architecture)", () => {
    expect(fs.existsSync(path.join(root, "app", "api"))).toBe(false);
  });

  it("has no database or CMS dependencies", () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(root, "package.json"), "utf-8"),
    ) as { dependencies?: Record<string, string> };
    const deps = Object.keys(pkg.dependencies ?? {});
    const blocked = deps.filter((name) =>
      /prisma|mongoose|postgres|mysql|sqlite|mongodb|contentful|sanity|strapi|payload/i.test(
        name,
      ),
    );
    expect(blocked).toEqual([]);
  });
});

describe("BL-01: Tailwind theme matches library.md tokens", () => {
  const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf-8");

  it.each([
    ["--color-primary", "#0d9488"],
    ["--color-primary-hover", "#0f766e"],
    ["--color-text", "#1f2937"],
    ["--color-text-muted", "#6b7280"],
    ["--color-surface", "#fafaf9"],
    ["--max-width-content", "1200px"],
    ["--breakpoint-mobile", "768px"],
    ["--spacing-section-y", "4rem"],
    ["--spacing-content-x", "1.5rem"],
    ["--font-size-h1", "2.25rem"],
    ["--radius-card", "8px"],
    ["--radius-button", "6px"],
  ])("defines %s as %s", (token, value) => {
    expect(css).toContain(`${token}: ${value}`);
  });
});
