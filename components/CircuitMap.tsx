import type { CircuitCard } from "@/lib/series";

/**
 * A circuit, drawn from the layout the season publishes.
 *
 * The shapes are **generated, never traced** (invariant 7 in the game's
 * CLAUDE.md), which is exactly why they can be drawn here at all: they are the
 * game's own circuits rather than anybody's, and the layout is already on the
 * wire as normalised points because the app draws its race map from the same
 * numbers.
 *
 * Two strokes, not one: a wide dark casing and a lighter road over it, which
 * is what makes a hairpin read as road crossing under road rather than as a
 * line crossing a line. The start line is a tick at progress zero, because the
 * generator centres progress 0 on the longest straight and that is where the
 * pit lane is.
 */
export default function CircuitMap({
  circuit,
  size = 180,
  tint = "var(--accent)",
}: {
  circuit: CircuitCard;
  size?: number;
  tint?: string;
}) {
  const points = pairs(circuit.layout);
  if (points.length < 3) return null;

  // Fit the shape to the box with a margin, preserving aspect: a circuit is a
  // shape and stretching one to fill a square makes two circuits look alike.
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const margin = 8;
  const scale = (100 - margin * 2) / span;
  const offsetX = margin + ((span - (maxX - minX)) * scale) / 2;
  const offsetY = margin + ((span - (maxY - minY)) * scale) / 2;
  const at = (p: readonly [number, number]) =>
    [(p[0] - minX) * scale + offsetX, (p[1] - minY) * scale + offsetY] as const;

  const d =
    points.map((p, i) => `${i === 0 ? "M" : "L"}${fixed(at(p))}`).join("") + "Z";

  // The start tick, square across the road at the first point.
  const start = at(points[0]);
  const next = at(points[1 % points.length]);
  const angle = Math.atan2(next[1] - start[1], next[0] - start[0]) + Math.PI / 2;
  const tick = 4.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <path d={d} fill="none" stroke="var(--bg-deep)" strokeWidth={7} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={tint} strokeWidth={3.4} strokeLinejoin="round" />
      <line
        x1={start[0] + Math.cos(angle) * tick}
        y1={start[1] + Math.sin(angle) * tick}
        x2={start[0] - Math.cos(angle) * tick}
        y2={start[1] - Math.sin(angle) * tick}
        stroke="var(--text)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function pairs(flat: number[]): (readonly [number, number])[] {
  const out: (readonly [number, number])[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) out.push([flat[i], flat[i + 1]] as const);
  return out;
}

function fixed(p: readonly [number, number]): string {
  return `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
}
