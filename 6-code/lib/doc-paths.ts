import path from "node:path";
import { isExcludedPath, PHASE_FOLDERS } from "./doc-scope";

const DOCS_PREFIX = "/docs";

export function docPathToUrl(docPath: string): string {
  const encoded = docPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${DOCS_PREFIX}/${encoded}`;
}

export function pathnameToDocPath(pathname: string): string | null {
  if (pathname === DOCS_PREFIX || pathname === `${DOCS_PREFIX}/`) {
    return null;
  }

  if (!pathname.startsWith(`${DOCS_PREFIX}/`)) {
    return null;
  }

  return pathname
    .slice(`${DOCS_PREFIX}/`.length)
    .split("/")
    .map((segment) => decodeURIComponent(segment))
    .join("/");
}

export function isProductDocPath(docPath: string): boolean {
  const phase = docPath.split("/")[0];
  return (
    PHASE_FOLDERS.includes(phase as (typeof PHASE_FOLDERS)[number]) &&
    !isExcludedPath(docPath) &&
    docPath.endsWith(".md")
  );
}

export function resolveDocLink(
  fromDocPath: string,
  href: string,
  availablePaths: ReadonlySet<string>,
): string | null {
  if (!href || href.startsWith("http://") || href.startsWith("https://")) {
    return null;
  }

  if (href.startsWith("#")) {
    return null;
  }

  const [pathPart, ...hashParts] = href.split("#");
  if (!pathPart.endsWith(".md")) {
    return null;
  }

  const hash = hashParts.length ? hashParts.join("#") : "";
  const candidates = [
    path.posix.normalize(path.posix.join(path.posix.dirname(fromDocPath), pathPart)),
    path.posix.normalize(pathPart),
  ];

  for (const candidate of candidates) {
    if (availablePaths.has(candidate)) {
      return hash ? `${candidate}#${hash}` : candidate;
    }
  }

  return null;
}

export function resolveDocAssetPath(fromDocPath: string, src: string): string {
  if (!src || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  const fromDir = path.posix.dirname(fromDocPath);
  const resolved = path.posix.normalize(path.posix.join(fromDir, src));
  return `/product-docs/${resolved}`;
}
