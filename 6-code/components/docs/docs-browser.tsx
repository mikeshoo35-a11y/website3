"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DocContentPane } from "@/components/docs/doc-content-pane";
import { DocTree } from "@/components/docs/doc-tree";
import { getDocIndex } from "@/lib/doc-index";
import {
  docPathToUrl,
  isProductDocPath,
  pathnameToDocPath,
} from "@/lib/doc-paths";

function parentFolderPaths(docPath: string): string[] {
  const parts = docPath.split("/");
  const folders: string[] = [];

  for (let index = 0; index < parts.length - 1; index += 1) {
    folders.push(parts.slice(0, index + 1).join("/"));
  }

  return folders;
}

export function DocsBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const index = getDocIndex();
  const selectedPath = pathnameToDocPath(pathname);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => new Set());
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);

  const navigateToDoc = useCallback(
    (docPath: string) => {
      const [filePath] = docPath.split("#");
      if (!isProductDocPath(filePath)) {
        return;
      }

      setExpandedPaths((current) => {
        const next = new Set(current);
        for (const folder of parentFolderPaths(filePath)) {
          next.add(folder);
        }
        return next;
      });

      router.push(docPathToUrl(filePath), { scroll: false });
      setMobileTreeOpen(false);
    },
    [router],
  );

  useEffect(() => {
    if (!selectedPath) {
      return;
    }

    setExpandedPaths((current) => {
      const next = new Set(current);
      for (const folder of parentFolderPaths(selectedPath)) {
        next.add(folder);
      }
      return next;
    });
  }, [selectedPath]);

  useEffect(() => {
    if (!mobileTreeOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileTreeOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileTreeOpen]);

  const availablePaths = useMemo(
    () => new Set(Object.keys(index.content)),
    [index.content],
  );

  const markdown = useMemo(() => {
    if (!selectedPath || !isProductDocPath(selectedPath)) {
      return null;
    }
    return index.content[selectedPath] ?? null;
  }, [index.content, selectedPath]);

  const toggleFolder = (folderPath: string) => {
    setExpandedPaths((current) => {
      const next = new Set(current);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  };

  const treePanel = (
    <DocTree
      tree={index.tree}
      selectedPath={selectedPath}
      expandedPaths={expandedPaths}
      onToggleFolder={toggleFolder}
      onSelectFile={navigateToDoc}
    />
  );

  return (
    <div
      data-page="docs"
      data-docs="layout"
      className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col mobile:flex-row"
    >
      <aside
        data-docs="tree"
        className="hidden w-full shrink-0 border-b border-border bg-surface-elevated mobile:block mobile:w-72 mobile:border-r mobile:border-b-0"
      >
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-content-x py-4">
          {treePanel}
        </div>
      </aside>

      {mobileTreeOpen ? (
        <>
          <button
            type="button"
            aria-label="Close documentation tree"
            className="fixed inset-0 z-40 bg-black/40 mobile:hidden"
            onClick={() => setMobileTreeOpen(false)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Documentation tree"
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-border bg-surface-elevated p-content-x py-4 shadow-lg mobile:hidden"
          >
            {treePanel}
          </aside>
        </>
      ) : null}

      <div data-docs="content" className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border bg-surface-elevated px-content-x py-3 mobile:hidden">
          <button
            type="button"
            onClick={() => setMobileTreeOpen(true)}
            className="rounded-button border border-border px-3 py-2 text-small font-medium text-text transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse files
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-content-x py-6">
          {!selectedPath ? (
            <p className="text-body text-text-muted">
              Select a document from the tree to begin reading.
            </p>
          ) : null}

          {selectedPath && !markdown ? (
            <p className="text-body text-text-muted">
              Document not found: <code>{selectedPath}</code>
            </p>
          ) : null}

          {selectedPath && markdown ? (
            <DocContentPane
              docPath={selectedPath}
              markdown={markdown}
              availablePaths={availablePaths}
              onNavigate={navigateToDoc}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
