import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} | ${site.roles.join(" · ")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "76px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "#E5E7EB",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {site.headlineLead}
          </div>
          <div
            style={{
              color: "#E5E7EB",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              marginTop: 6,
            }}
          >
            {site.headlineAccent}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {site.roles.map((role) => (
            <div
              key={role}
              style={{
                border: "1px solid #6B7280",
                borderRadius: 999,
                padding: "12px 24px",
                color: "#E5E7EB",
                fontSize: 24,
              }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
