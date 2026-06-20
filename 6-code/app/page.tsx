import Link from "next/link";
import { BenefitCard } from "@/components/benefit-card";
import { ContentColumn } from "@/components/content-column";
import { PrimaryButton } from "@/components/primary-button";
import { SectionHeading } from "@/components/section-heading";
import { HOME_BENEFITS, HOME_HOW_IT_WORKS_STEPS } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("home");

export default function Home() {
  return (
    <div data-page="home">
      <section
        data-section="hero"
        className="bg-surface-elevated py-section-y"
      >
        <ContentColumn className="text-center">
          <h1 className="text-h1 font-semibold text-text">
            AI-friendly documentation built for humans and AI
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-body text-text-muted">
            Structured text-first docs that agents can read, validate, and
            extend — written so practitioners and AI agents share one source of
            truth.
          </p>
          <div className="mt-8">
            <PrimaryButton href="#benefits">Explore benefits</PrimaryButton>
          </div>
        </ContentColumn>
      </section>

      <section
        id="benefits"
        data-section="benefits"
        className="scroll-mt-16 py-section-y"
      >
        <ContentColumn>
          <SectionHeading
            title="Benefits"
            intro="What AI-friendly documentation delivers"
            className="mb-8"
          />
          <div
            data-testid="benefits-grid"
            className="grid grid-cols-1 gap-6 mobile:grid-cols-2"
          >
            {HOME_BENEFITS.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </ContentColumn>
      </section>

      <section data-section="how-it-works" className="py-section-y">
        <ContentColumn>
          <SectionHeading title="How it works" className="mb-8" />
          <ol className="space-y-6">
            {HOME_HOW_IT_WORKS_STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-small font-semibold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-1 text-body text-text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </ContentColumn>
      </section>

      <section data-section="about-band" className="pb-section-y">
        <ContentColumn>
          <div className="rounded-card border border-border bg-surface-elevated px-6 py-8 text-center">
            <Link
              href="/about"
              className="text-body text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Who built this? About the author
            </Link>
          </div>
        </ContentColumn>
      </section>
    </div>
  );
}
