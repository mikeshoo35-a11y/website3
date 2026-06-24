"use client";

import type { DocTreeNode } from "@/lib/doc-index-types";

type DocTreeProps = {
  tree: DocTreeNode[];
  selectedPath: string | null;
  expandedPaths: Set<string>;
  onToggleFolder: (folderPath: string) => void;
  onSelectFile: (filePath: string) => void;
};

function TreeNode({
  node,
  selectedPath,
  expandedPaths,
  onToggleFolder,
  onSelectFile,
  depth,
}: {
  node: DocTreeNode;
  selectedPath: string | null;
  expandedPaths: Set<string>;
  onToggleFolder: (folderPath: string) => void;
  onSelectFile: (filePath: string) => void;
  depth: number;
}) {
  if (node.kind === "file") {
    if (!node.path.endsWith(".md")) {
      return null;
    }

    const isSelected = selectedPath === node.path;

    return (
      <li>
        <button
          type="button"
          onClick={() => onSelectFile(node.path)}
          aria-current={isSelected ? "page" : undefined}
          className={`block w-full rounded-sm border-l-2 px-2 py-1.5 text-left text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            isSelected
              ? "border-primary bg-surface font-medium text-text"
              : "border-transparent text-text-muted hover:bg-surface hover:text-text"
          }`}
          style={{ paddingLeft: `${depth * 0.75 + 0.5}rem` }}
        >
          {node.name}
        </button>
      </li>
    );
  }

  const isExpanded = expandedPaths.has(node.path);
  const label = node.path ? `${node.name}/` : node.name;

  return (
    <li>
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => onToggleFolder(node.path)}
        className="flex w-full items-center gap-1 rounded-sm px-2 py-1.5 text-left text-small font-medium text-text transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        style={{ paddingLeft: `${depth * 0.75 + 0.5}rem` }}
      >
        <span aria-hidden="true" className="w-3 text-text-muted">
          {isExpanded ? "▾" : "▸"}
        </span>
        {label}
      </button>
      {isExpanded ? (
        <ul className="mt-0.5 space-y-0.5">
          {node.children.map((child) => (
            <TreeNode
              key={child.path || child.name}
              node={child}
              selectedPath={selectedPath}
              expandedPaths={expandedPaths}
              onToggleFolder={onToggleFolder}
              onSelectFile={onSelectFile}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function DocTree({
  tree,
  selectedPath,
  expandedPaths,
  onToggleFolder,
  onSelectFile,
}: DocTreeProps) {
  return (
    <nav aria-label="Documentation tree">
      <ul className="space-y-0.5">
        {tree.map((node) => (
          <TreeNode
            key={node.path || node.name}
            node={node}
            selectedPath={selectedPath}
            expandedPaths={expandedPaths}
            onToggleFolder={onToggleFolder}
            onSelectFile={onSelectFile}
            depth={0}
          />
        ))}
      </ul>
    </nav>
  );
}
