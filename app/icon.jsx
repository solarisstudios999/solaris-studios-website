import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: -2,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          borderRadius: 12,
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
