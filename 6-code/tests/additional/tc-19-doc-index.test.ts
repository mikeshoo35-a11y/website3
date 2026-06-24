import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { DocIndex } from "@/lib/doc-index-types";
import {
  EXCLUDED_SEGMENTS,
  PHASE_FOLDERS,
} from "@/lib/doc-scope";
import { runBuildDocIndex } from "@/lib/build-doc-index";

const root = path.resolve(__dirname, "../..");

function loadGeneratedIndex(): DocIndex {
  return JSON.parse(
    fs.readFileSync(path.join(root, "generated", "doc-index.json"), "utf-8"),
  ) as DocIndex;
}

function collectPaths(nodes: DocIndex["tree"]): string[] {
  const paths: string[] = [];
  for (const node of nodes) {
    if (node.kind === "file") {
      paths.push(node.path);
    } else {
      paths.push(node.path);
      paths.push(...collectPaths(node.children));
    }
  }
  return paths;
}

describe("TC-19: Product doc index generation", () => {
  it("builds a static doc index at build time", () => {
    runBuildDocIndex(root);
    expect(fs.existsSync(path.join(root, "generated", "doc-index.json"))).toBe(
      true,
    );
  });

  it("includes paths under all phase folders", () => {
    const index = loadGeneratedIndex();
    const paths = [...Object.keys(index.content), ...collectPaths(index.tree)];

    for (const phase of PHASE_FOLDERS) {
      expect(paths.some((entry) => entry.startsWith(`${phase}/`))).toBe(true);
    }
  });

  it("excludes consultation/ and 6-code/ paths", () => {
    const index = loadGeneratedIndex();
    const paths = [...Object.keys(index.content), ...collectPaths(index.tree)];

    for (const segment of EXCLUDED_SEGMENTS) {
      expect(paths.some((entry) => entry.includes(`${segment}/`))).toBe(false);
      expect(paths.some((entry) => entry.startsWith(`${segment}/`))).toBe(
        false,
      );
    }
  });

  it("stores non-empty markdown for a known file", () => {
    const index = loadGeneratedIndex();
    const sample = index.content["1-scope/features-list.md"];

    expect(sample).toBeDefined();
    expect(sample!.trim().length).toBeGreaterThan(0);
  });

  it("stages SVG mockups for static serving", () => {
    const index = loadGeneratedIndex();

    expect(index.assets.svg.length).toBeGreaterThan(0);
    expect(
      index.assets.svg.some((asset) =>
        asset.includes("mockups/screens/MCK-01-site-shell.svg"),
      ),
    ).toBe(true);

    const stagedSvg = path.join(
      root,
      "public",
      "product-docs",
      "4-design",
      "mockups",
      "screens",
      "MCK-01-site-shell.svg",
    );
    expect(fs.existsSync(stagedSvg)).toBe(true);
  });
});
