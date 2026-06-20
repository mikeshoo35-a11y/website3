import type { HTMLAttributes, ReactNode } from "react";

type ContentColumnProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function ContentColumn({
  children,
  className = "",
  ...props
}: ContentColumnProps) {
  return (
    <div
      data-testid="content-column"
      className={`mx-auto w-full max-w-[var(--max-width-content)] px-content-x ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
