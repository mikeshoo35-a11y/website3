import { DocsBrowser } from "@/components/docs/docs-browser";
import { listDocPaths } from "@/lib/doc-index";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata("docs");

export function generateStaticParams() {
  const paths = listDocPaths();

  return [
    {},
    ...paths.map((docPath) => ({
      path: docPath.split("/"),
    })),
  ];
}

export default function DocsPage() {
  return <DocsBrowser />;
}
