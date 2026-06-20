import { ContentColumn } from "./content-column";
import { ExternalLink } from "./external-link";
import { LINKEDIN_URL } from "@/lib/site-links";

export function SiteFooter() {
  return (
    <footer
      data-shell="footer"
      className="border-t border-border bg-footer-bg"
    >
      <ContentColumn className="py-6">
        <div className="flex flex-col gap-3 mobile:flex-row mobile:items-center mobile:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-small text-text-muted">
              &copy; 2026 AI Friendly Docs
            </p>
            <p className="text-small text-text-muted">
              Text-first docs for humans and AI
            </p>
          </div>
          <ExternalLink href={LINKEDIN_URL}>LinkedIn</ExternalLink>
        </div>
      </ContentColumn>
    </footer>
  );
}
