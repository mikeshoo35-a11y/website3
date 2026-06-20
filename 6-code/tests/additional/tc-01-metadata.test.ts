import { describe, expect, it } from "vitest";
import {
  createPageMetadata,
  createPageTitle,
  SITE_NAME,
} from "@/lib/metadata";

describe("TC-01: Shared metadata title template", () => {
  it.each([
    ["home", "Home"],
    ["about", "About"],
    ["not-found", "Page not found"],
  ] as const)("produces a distinct title for %s", (routeKey, segment) => {
    const title = createPageTitle(routeKey);

    expect(title).toContain(segment);
    expect(title).toContain(SITE_NAME);
    expect(title).not.toBe(segment);
    expect(title).not.toBe(`/${routeKey}`);
  });

  it("returns non-empty metadata titles for all route keys", () => {
    for (const routeKey of ["home", "about", "not-found"] as const) {
      const metadata = createPageMetadata(routeKey);
      const title =
        typeof metadata.title === "object" && metadata.title !== null
          ? metadata.title.absolute
          : metadata.title;

      expect(title).toBeTruthy();
      expect(String(title)).toContain(SITE_NAME);
    }
  });
});
