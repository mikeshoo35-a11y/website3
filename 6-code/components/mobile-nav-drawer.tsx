"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const MOBILE_NAV_DRAWER_ID = "mobile-nav-drawer";

export { MOBILE_NAV_DRAWER_ID };

type NavLink = {
  href: string;
  label: string;
  isActive: boolean;
};

type MobileNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
};

export function MobileNavDrawer({
  isOpen,
  onClose,
  links,
}: MobileNavDrawerProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />
      <div
        id={MOBILE_NAV_DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-border bg-surface-elevated shadow-lg"
      >
        <nav className="flex flex-col">
          {links.map((link, index) => (
            <Link
              key={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={onClose}
              aria-current={link.isActive ? "page" : undefined}
              className={`border-b border-border px-content-x py-4 text-body transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                link.isActive
                  ? "font-medium text-primary"
                  : "text-text hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
