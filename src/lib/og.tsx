import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const mark = (
  <svg width="120" height="190" viewBox="-8 -8 136 216">
    <g fill="none" strokeWidth="13">
      <g stroke="#ffffff">
        <path d="M3.6 94 L34 43" />
        <path d="M116.4 94 L86 43" />
        <path d="M3.6 106 L34 157" />
        <path d="M116.4 106 L86 157" />
      </g>
      <g stroke="#9fd3fb">
        <path d="M76 28 L60 2 L46 25 L77 91 L44 91" />
        <path d="M44 172 L60 198 L74 175 L43 109 L76 109" />
      </g>
    </g>
  </svg>
);

/** Shared Open Graph card used by the home page and app pages. */
export function ogImage({ eyebrow, title, accent = "#5b8def" }: { eyebrow: string; title: string; accent?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: `linear-gradient(150deg, #161b44 0%, #1f2867 55%, ${accent} 140%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#9fd3fb", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>{title}</div>
          <div style={{ fontSize: 28, marginTop: 30, color: "#c9d1ec" }}>One login · One staff list · One audit trail</div>
        </div>
        {mark}
      </div>
    ),
    ogSize,
  );
}
