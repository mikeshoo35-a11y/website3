"use client";

import { useEffect, useId, useRef } from "react";

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "strict",
      });

      if (cancelled || !containerRef.current) {
        return;
      }

      const { svg } = await mermaid.render(`mermaid-${diagramId}`, chart.trim());
      if (!cancelled && containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  return (
    <div
      ref={containerRef}
      data-testid="mermaid-diagram"
      className="doc-mermaid my-4 overflow-x-auto"
    />
  );
}
