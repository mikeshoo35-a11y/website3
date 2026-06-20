import Link from "next/link";
import { ContentColumn } from "@/components/content-column";
import { ExternalLink } from "@/components/external-link";
import { SectionHeading } from "@/components/section-heading";
import { LINKEDIN_URL } from "@/lib/site-links";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("about");

export default function AboutPage() {
  return (
    <div data-page="about">
      <section
        data-section="hero"
        className="bg-surface-elevated py-section-y"
      >
        <ContentColumn>
          <SectionHeading
            as="h1"
            title="About AI Friendly Docs"
            intro="Methodology, this site, and the author behind the approach"
          />
        </ContentColumn>
      </section>

      <section data-section="methodology" className="py-section-y">
        <ContentColumn>
          <SectionHeading title="What AI Friendly Docs is" className="mb-6" />
          <div className="space-y-4 text-body text-text-muted">
            <p>
              AI Friendly Docs is a text-first approach to structured
              documentation written for human readers and AI agents that
              elaborate, validate, and extend the spec.
            </p>
            <p>
              Prose sections, traceable requirements, and explicit acceptance
              criteria replace ad-hoc wikis and ticket-only knowledge — giving
              teams a shared source of truth that agents can work from reliably.
            </p>
          </div>
        </ContentColumn>
      </section>

      <section data-section="site-narrative" className="py-section-y">
        <ContentColumn>
          <SectionHeading title="Why this site exists" className="mb-6" />
          <div className="space-y-4 text-body text-text-muted">
            <p>
              This marketing site demonstrates enterprise-grade quality through
              its own delivery — layout, accessibility, and clarity.
            </p>
            <p>
              Every page you read here was shaped by the same documentation
              practices the methodology promotes: structured specs, design
              tokens, traceability, and testable acceptance criteria.
            </p>
          </div>
        </ContentColumn>
      </section>

      <section data-section="author" className="py-section-y">
        <ContentColumn>
          <SectionHeading title="About the author" className="mb-6" />
          <div className="space-y-4 text-body text-text-muted">
            <p>
              The site owner brings a developer, business analyst, and system
              analyst background — building documentation practices that teams
              and agents can trust.
            </p>
            <p>
              <ExternalLink href={LINKEDIN_URL}>LinkedIn</ExternalLink>
            </p>
          </div>
        </ContentColumn>
      </section>

      <section data-section="back-link" className="pb-section-y">
        <ContentColumn>
          <div className="rounded-card border border-border bg-surface-elevated px-6 py-8 text-center">
            <Link
              href="/"
              className="text-body text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Back to overview
            </Link>
          </div>
        </ContentColumn>
      </section>
    </div>
  );
}
