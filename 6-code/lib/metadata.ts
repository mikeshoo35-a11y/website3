import type { Metadata } from "next";

export const SITE_NAME = "AI Friendly Docs";
export const SITE_DESCRIPTION =
  "Structured documentation for AI-assisted development";

export type RouteKey = "home" | "about" | "not-found";

const ROUTE_LABELS: Record<RouteKey, string> = {
  home: "Home",
  about: "About",
  "not-found": "Page not found",
};

export function createPageTitle(routeKey: RouteKey): string {
  return `${ROUTE_LABELS[routeKey]} | ${SITE_NAME}`;
}

export function createPageMetadata(routeKey: RouteKey): Metadata {
  return {
    title: {
      absolute: createPageTitle(routeKey),
    },
    description: SITE_DESCRIPTION,
  };
}
