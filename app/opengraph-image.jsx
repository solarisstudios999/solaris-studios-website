import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Solaris Studios — Brand, Web, and Content Systems";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 78% 18%, rgba(255,59,48,0.42) 0%, transparent 55%), radial-gradient(circle at 18% 82%, rgba(255,59,48,0.18) 0%, transparent 55%), #000",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#fff",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Solaris Studios
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              width: 120,
              height: 4,
              background: "#ff3b30",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
              textTransform: "uppercase",
            }}
          >
            Brand systems that feel inevitable.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.74)",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Independent studio · Bangalore · Brand, Web, Content
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(255,255,255,0.55)",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span>solarisstudios.co.in</span>
          <span>est. 2026</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
