"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ContentColumn } from "./content-column";
import { MobileNavDrawer, MOBILE_NAV_DRAWER_ID } from "./mobile-nav-drawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

function navLinkClassName(isActive: boolean): string {
  return `rounded-sm px-3 py-2 text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    isActive
      ? "font-medium text-primary"
      : "text-text-muted hover:text-primary"
  }`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = NAV_LINKS.map((link) => ({
    ...link,
    isActive: isActivePath(pathname, link.href),
  }));

  return (
    <header
      data-shell="header"
      className="border-b border-border bg-surface-elevated"
    >
      <ContentColumn>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-body font-semibold text-text transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            AI Friendly Docs
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 mobile:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.isActive ? "page" : undefined}
                className={navLinkClassName(link.isActive)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mobile:hidden"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_NAV_DRAWER_ID}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </ContentColumn>

      <MobileNavDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </header>
  );
}
