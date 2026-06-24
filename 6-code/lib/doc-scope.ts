export const PHASE_FOLDERS = [
  "1-scope",
  "2-features",
  "3-arch",
  "4-design",
  "5-dev",
] as const;

export const EXCLUDED_SEGMENTS = ["consultation", "6-code"] as const;

export function isExcludedPath(relativePath: string): boolean {
  const segments = relativePath.split(/[/\\]/);
  return EXCLUDED_SEGMENTS.some((segment) => segments.includes(segment));
}
