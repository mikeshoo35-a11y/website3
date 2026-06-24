"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EXTERNAL_LINK_REL } from "@/lib/site-links";
import {
  docPathToUrl,
  resolveDocAssetPath,
  resolveDocLink,
} from "@/lib/doc-paths";
import { MermaidDiagram } from "./mermaid-diagram";

type DocContentPaneProps = {
  docPath: string;
  markdown: string;
  availablePaths: ReadonlySet<string>;
  onNavigate: (docPath: string) => void;
};

export function DocContentPane({
  docPath,
  markdown,
  availablePaths,
  onNavigate,
}: DocContentPaneProps) {
  return (
    <article className="doc-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            if (!href) {
              return <span>{children}</span>;
            }

            if (href.startsWith("http://") || href.startsWith("https://")) {
              return (
                <a href={href} target="_blank" rel={EXTERNAL_LINK_REL}>
                  {children}
                </a>
              );
            }

            const resolved = resolveDocLink(docPath, href, availablePaths);
            if (resolved) {
              const [targetPath, ...hashParts] = resolved.split("#");
              const hash = hashParts.length ? hashParts.join("#") : "";
              const url = docPathToUrl(targetPath) + (hash ? `#${hash}` : "");

              return (
                <a
                  href={url}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(resolved);
                  }}
                >
                  {children}
                </a>
              );
            }

            return <a href={href}>{children}</a>;
          },
          code({ className, children }) {
            const text = String(children).replace(/\n$/, "");
            const match = /language-(\w+)/.exec(className ?? "");

            if (match?.[1] === "mermaid") {
              return <MermaidDiagram chart={text} />;
            }

            return <code className={className}>{children}</code>;
          },
          pre({ children }) {
            return <pre>{children}</pre>;
          },
          img({ src, alt }) {
            const resolvedSrc =
              typeof src === "string"
                ? resolveDocAssetPath(docPath, src)
                : src;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolvedSrc}
                alt={alt ?? ""}
                className="my-4 h-auto max-w-full rounded-card border border-border"
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
