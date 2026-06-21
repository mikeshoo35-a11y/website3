import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_IMAGE_ALT = `${SITE_NAME} — ${SITE_DESCRIPTION}`;

export function createOgImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #ffffff 0%, #fafaf9 55%, #f3f4f6 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 12,
              height: 48,
              borderRadius: 6,
              background: "#0d9488",
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#1f2937",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#1f2937",
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            AI-friendly documentation built for humans and AI
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#6b7280",
              maxWidth: 880,
            }}
          >
            Structured text-first docs that agents can read, validate, and extend.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#0d9488",
              fontWeight: 600,
            }}
          >
            Traceability · Testable specs · AI-assisted delivery
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#9ca3af",
            }}
          >
            Personal methodology site
          </div>
        </div>
      </div>
    ),
    OG_IMAGE_SIZE,
  );
}
