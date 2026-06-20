type BenefitCardProps = {
  title: string;
  description: string;
};

export function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <article
      data-testid="benefit-card"
      className="rounded-card border border-border bg-surface-elevated p-6"
    >
      <div
        aria-hidden="true"
        className="mb-4 h-8 w-8 rounded border border-border bg-surface"
      />
      <h3 className="text-body font-semibold text-text">{title}</h3>
      <p className="mt-2 text-body text-text-muted">{description}</p>
    </article>
  );
}
