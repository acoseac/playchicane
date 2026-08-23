/**
 * OG-image template. Not linked from anywhere and excluded from the sitemap —
 * it exists so the social card can be rendered at 1200x630 with the site's own
 * type rather than approximated in an image editor. Capture with:
 *   chrome --headless --screenshot --window-size=1200,630 http://localhost:3000/og-template/
 */
export const metadata = { title: "OG", robots: { index: false, follow: false } };

export default function OG() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        alignItems: "center",
        gap: 40,
        padding: "0 64px",
        background:
          "radial-gradient(760px 460px at 74% 20%, rgba(51,184,255,0.20), transparent 62%)," +
          "radial-gradient(520px 360px at 8% 88%, rgba(255,199,51,0.10), transparent 60%), #0a0a0c",
        overflow: "hidden",
      }}
    >
      {/* The card is the whole frame — site chrome would only crop badly at 1200x630. */}
      <style>{`.nav, .footer, .skip { display: none !important; }`}</style>
      <div className="halftone" style={{ ["--dot" as string]: "#ffffff14" }} />
      <div style={{ position: "relative" }}>
        <p
          className="eyebrow"
          style={{ fontSize: "0.95rem", letterSpacing: "0.22em", marginBottom: 20 }}
        >
          Coming to iPhone
        </p>
        <h1 className="masthead" style={{ fontSize: "5.1rem", marginBottom: 26 }}>
          Chicane
        </h1>
        <p
          style={{
            fontFamily: "var(--display)",
            fontVariationSettings: '"wdth" 88, "wght" 600',
            fontSize: "1.72rem",
            lineHeight: 1.25,
            color: "#f4f4f6",
            margin: 0,
            maxWidth: "17ch",
          }}
        >
          You run the team.
          <br />
          <span style={{ color: "var(--accent)" }}>You don&apos;t drive.</span>
        </p>
        <p
          className="mono"
          style={{ color: "var(--text-faint)", marginTop: 30, fontSize: "1rem" }}
        >
          Two drivers · 18 races · 2 championships
        </p>
      </div>

      <div
        className="phone"
        style={{ maxWidth: 340, transform: "rotate(2.5deg) translateY(64px)", margin: 0, alignSelf: "start", marginTop: 56 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/screenshots/race-radio-decision.webp" alt="" width={804} height={1748} />
      </div>
    </div>
  );
}
