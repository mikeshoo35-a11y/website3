import type { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-button bg-primary px-6 py-3 text-body font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mobile:w-auto ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
