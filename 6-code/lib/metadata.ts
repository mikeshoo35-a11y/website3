import type { Metadata } from "next";

export const SITE_NAME = "AI Friendly Docs";
export const SITE_DESCRIPTION =
  "Structured documentation for AI-assisted development";

export function getSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}

export type RouteKey = "home" | "about" | "docs" | "not-found";

const ROUTE_LABELS: Record<RouteKey, string> = {
  home: "Home",
  about: "About",
  docs: "Docs",
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
