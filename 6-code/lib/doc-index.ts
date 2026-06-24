import type { DocIndex } from "./doc-index-types";
import generatedIndex from "@/generated/doc-index.json";

export type { DocFileNode, DocFolderNode, DocIndex, DocTreeNode } from "./doc-index-types";

const index = generatedIndex as DocIndex;

export function getDocIndex(): DocIndex {
  return index;
}

export function getDocContent(docPath: string): string | undefined {
  return index.content[docPath];
}

export function listDocPaths(): string[] {
  return Object.keys(index.content).sort();
}
