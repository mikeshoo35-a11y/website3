import Link from "next/link";
import { ContentColumn } from "@/components/content-column";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("not-found");

export default function NotFound() {
  return (
    <ContentColumn className="flex flex-1 flex-col items-center justify-center py-section-y text-center">
      <h1 className="text-h1 font-semibold text-text">Page not found</h1>
      <p className="mt-4 text-text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 text-body text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Back to Home
      </Link>
    </ContentColumn>
  );
}
