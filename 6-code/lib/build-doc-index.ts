import fs from "node:fs";
import path from "node:path";
import type { DocFolderNode, DocIndex, DocTreeNode } from "./doc-index-types";
import { EXCLUDED_SEGMENTS, isExcludedPath, PHASE_FOLDERS } from "./doc-scope";

export { EXCLUDED_SEGMENTS, isExcludedPath, PHASE_FOLDERS } from "./doc-scope";

const DOC_EXTENSIONS = new Set([".md", ".svg"]);

export function resolveRepoRoot(codeRoot: string): string {
  return path.resolve(codeRoot, "..");
}

function insertNode(
  root: DocFolderNode,
  relativePath: string,
  fileName: string,
): void {
  const parts = relativePath.split("/").filter(Boolean);
  let current = root;

  for (const part of parts) {
    let child = current.children.find(
      (node): node is DocFolderNode =>
        node.kind === "folder" && node.name === part,
    );
    if (!child) {
      child = {
        kind: "folder",
        name: part,
        path: current.path ? `${current.path}/${part}` : part,
        children: [],
      };
      current.children.push(child);
    }
    current = child;
  }

  const filePath = relativePath ? `${relativePath}/${fileName}` : fileName;
  current.children.push({
    kind: "file",
    name: fileName,
    path: filePath,
  });
}

function sortTree(nodes: DocTreeNode[]): void {
  nodes.sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind === "folder" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  for (const node of nodes) {
    if (node.kind === "folder") {
      sortTree(node.children);
    }
  }
}

function walkPhaseFolder(
  repoRoot: string,
  phaseFolder: string,
  content: Record<string, string>,
  files: string[],
): void {
  const phasePath = path.join(repoRoot, phaseFolder);
  if (!fs.existsSync(phasePath)) {
    return;
  }

  const stack: string[] = [phasePath];

  while (stack.length > 0) {
    const currentDir = stack.pop()!;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      const relativePath = path
        .relative(repoRoot, absolutePath)
        .split(path.sep)
        .join("/");

      if (isExcludedPath(relativePath)) {
        continue;
      }

      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      if (!DOC_EXTENSIONS.has(extension)) {
        continue;
      }

      files.push(relativePath);
      if (extension === ".md") {
        content[relativePath] = fs.readFileSync(absolutePath, "utf-8");
      }
    }
  }
}

function copySvgAssets(
  repoRoot: string,
  codeRoot: string,
): { publicPaths: string[] } {
  const mockupsRoot = path.join(repoRoot, "4-design", "mockups");
  const outputRoot = path.join(codeRoot, "public", "product-docs", "4-design");
  const publicPaths: string[] = [];

  if (!fs.existsSync(mockupsRoot)) {
    return { publicPaths };
  }

  const stack: string[] = [mockupsRoot];

  while (stack.length > 0) {
    const currentDir = stack.pop()!;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }

      if (path.extname(entry.name).toLowerCase() !== ".svg") {
        continue;
      }

      const relativeFromDesign = path
        .relative(path.join(repoRoot, "4-design"), absolutePath)
        .split(path.sep)
        .join("/");
      const destination = path.join(outputRoot, relativeFromDesign);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(absolutePath, destination);
      publicPaths.push(`/product-docs/4-design/${relativeFromDesign}`);
    }
  }

  publicPaths.sort();
  return { publicPaths };
}

export function buildDocIndex(codeRoot: string): DocIndex {
  const repoRoot = resolveRepoRoot(codeRoot);
  const content: Record<string, string> = {};
  const files: string[] = [];

  for (const phaseFolder of PHASE_FOLDERS) {
    walkPhaseFolder(repoRoot, phaseFolder, content, files);
  }

  const treeRoot: DocFolderNode = {
    kind: "folder",
    name: "",
    path: "",
    children: [],
  };

  for (const filePath of files) {
    const fileName = path.posix.basename(filePath);
    const parentPath = path.posix.dirname(filePath);
    insertNode(treeRoot, parentPath === "." ? "" : parentPath, fileName);
  }

  sortTree(treeRoot.children);

  const { publicPaths } = copySvgAssets(repoRoot, codeRoot);

  return {
    tree: treeRoot.children,
    content,
    assets: {
      svg: publicPaths,
    },
  };
}

export function writeDocIndex(codeRoot: string, index: DocIndex): void {
  const generatedDir = path.join(codeRoot, "generated");
  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(
    path.join(generatedDir, "doc-index.json"),
    JSON.stringify(index, null, 2),
    "utf-8",
  );
}

export function runBuildDocIndex(codeRoot = process.cwd()): DocIndex {
  const index = buildDocIndex(codeRoot);
  writeDocIndex(codeRoot, index);
  return index;
}
