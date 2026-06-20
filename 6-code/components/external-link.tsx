import type { AnchorHTMLAttributes, ReactNode } from "react";
import { EXTERNAL_LINK_REL } from "@/lib/site-links";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ExternalLink({
  children,
  className = "",
  target = "_blank",
  rel = EXTERNAL_LINK_REL,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target={target}
      rel={rel}
      className={`text-small text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
