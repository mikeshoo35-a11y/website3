type SectionHeadingProps = {
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  title,
  intro,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  const headingClass =
    Tag === "h1"
      ? "text-h1 font-semibold text-text"
      : "text-h2 font-semibold text-text";

  return (
    <div className={className}>
      <Tag className={headingClass}>{title}</Tag>
      {intro ? <p className="mt-2 text-body text-text-muted">{intro}</p> : null}
    </div>
  );
}
