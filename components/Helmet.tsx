import type { HelmetDesign } from "@/lib/series";

/**
 * A driver's helmet, in profile, facing left.
 *
 * The six patterns are the app's (`HelmetDesign.Pattern` in ChicaneCore), and
 * they exist because they are each readable at marker size — which is exactly
 * the size a table wants. Like the crest this is drawn rather than served: the
 * design is enum values on the wire, and there is no picture to fetch.
 *
 * **Not a pixel port, unlike `Crest`.** The app draws a three-quarter view in
 * a Canvas (`HelmetView` in Chicane/Design/Insignia.swift); this is a simpler
 * silhouette. What has to agree is the identity — the pattern and the two
 * colours — and that does.
 *
 * **Raw hex, no livery floor.** `HelmetView` uses the authored colours
 * directly where `CrestView` runs its field through `Color.livery`. Lifting a
 * dark helmet here would make the same driver a different colour in the two
 * places, which is the bug that rule exists to avoid, not an instance of it.
 */
export default function Helmet({ design, size = 22 }: { design: HelmetDesign; size?: number }) {
  const base = hex(design.baseHex);
  const accent = hex(design.accentHex);
  const id = `helm-${design.pattern}-${design.baseHex}-${design.accentHex}`.replace(
    /[^a-zA-Z0-9-]/g,
    ""
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <defs>
        <clipPath id={id}>
          <path d={SHELL} />
        </clipPath>
      </defs>
      <path d={SHELL} fill={base} />
      <g clipPath={`url(#${id})`}>{mark(design.pattern, accent)}</g>
      {/* The visor last, so no pattern paints over it. */}
      <path
        d="M22 46 Q22 38 32 36 L54 33 Q60 33 60 40 L60 50 Q60 55 54 55 L30 55 Q22 55 22 46 Z"
        fill="var(--bg-deep)"
        opacity="0.82"
      />
      <path d={SHELL} fill="none" stroke="var(--bg-deep)" strokeWidth="4" />
    </svg>
  );
}

/** A six-digit hex from the wire, or a neutral if it is not one. */
function hex(value: string): string {
  const clean = value.replace(/^#/, "");
  return /^[0-9a-fA-F]{6}$/.test(clean) ? `#${clean}` : "#9aa0a6";
}

/** Crown, jaw and chin bar — one closed shape, facing left. */
const SHELL =
  "M50 14 Q84 14 86 48 L86 66 Q86 80 72 82 L34 82 Q18 82 16 66 L16 52 Q16 14 50 14 Z";

function mark(pattern: HelmetDesign["pattern"], accent: string) {
  switch (pattern) {
    case "stripe":
      return <path d="M38 10 L62 10 L62 86 L38 86 Z" fill={accent} />;
    case "chevron":
      return <path d="M14 78 L50 40 L86 78 L86 92 L50 56 L14 92 Z" fill={accent} />;
    case "halo":
      return <path d="M10 26 L92 20 L92 34 L10 40 Z" fill={accent} />;
    case "split":
      return <path d="M10 92 L92 10 L92 96 L10 96 Z" fill={accent} />;
    case "flash":
      return <path d="M28 88 L74 22 L90 34 L44 96 Z" fill={accent} />;
    case "star":
      return <path d={STAR} fill={accent} />;
  }
}

/** A five-point star on the temple, at the back where no visor covers it. */
const STAR = "M70 62 L75 74 L88 75 L78 84 L81 96 L70 89 L59 96 L62 84 L52 75 L65 74 Z";
