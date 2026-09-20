import type { CrestDesign } from "@/lib/series";
import { livery } from "@/lib/livery";

/**
 * A team's crest, drawn from its parts.
 *
 * A port of `CrestView` in the app (Chicane/Design/Insignia.swift): the same
 * five shapes, the same six motifs, the same geometry in a 100×100 box inset
 * by five per cent. It is a port rather than an image because the crest is
 * composed from enum values that travel on the wire — there is no picture to
 * serve, and generating one per entrant would be a pipeline where a few paths
 * will do.
 */
export default function Crest({ design, size = 28 }: { design: CrestDesign; size?: number }) {
  const field = livery(design.fieldHex);
  const motif = `#${design.motifHex.replace(/^#/, "")}`;
  const id = `crest-${design.shape}-${design.fieldHex}`.replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "0 0 auto", display: "block" }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={field} stopOpacity="1" />
          <stop offset="100%" stopColor={field} stopOpacity="0.62" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={shapePath(design.shape)} />
        </clipPath>
      </defs>
      <path d={shapePath(design.shape)} fill={`url(#${id})`} />
      <g clipPath={`url(#${id}-clip)`}>{motifMark(design.motif, motif)}</g>
      <path
        d={shapePath(design.shape)}
        fill="none"
        stroke={motif}
        strokeOpacity="0.55"
        strokeWidth="4.5"
      />
    </svg>
  );
}

/** The box the app draws into: the full square inset by five per cent. */
const X = 5, Y = 5, W = 90, H = 90;
const at = (fx: number, fy: number) => `${X + W * fx},${Y + H * fy}`;

function shapePath(shape: CrestDesign["shape"]): string {
  switch (shape) {
    case "roundel":
      return "M50,5 A45,45 0 1,1 49.99,5 Z";
    case "shield":
      return `M${at(0, 0)} L${at(1, 0)} L${at(1, 0.56)} Q${at(1, 0.9)} ${at(0.5, 1)} Q${at(0, 0.9)} ${at(0, 0.56)} Z`;
    case "hexagon":
      return polygon(
        Array.from({ length: 6 }, (_, corner) => {
          const angle = -Math.PI / 2 + (corner * Math.PI) / 3;
          return [50 + Math.cos(angle) * (W / 2), 50 + Math.sin(angle) * (H / 2)] as const;
        })
      );
    case "chevron":
      return `M${at(0, 0)} L${at(1, 0)} L${at(1, 0.66)} L${at(0.5, 1)} L${at(0, 0.66)} Z`;
    case "lozenge":
      return `M${at(0.5, 0)} L${at(1, 0.5)} L${at(0.5, 1)} L${at(0, 0.5)} Z`;
  }
}

function polygon(points: readonly (readonly [number, number])[]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z";
}

function motifMark(motif: CrestDesign["motif"], colour: string) {
  switch (motif) {
    case "wing":
      return (
        <path
          d={`M${at(0.12, 0.56)} Q${at(0.5, 0.24)} ${at(0.88, 0.44)} L${at(0.88, 0.58)} Q${at(0.5, 0.5)} ${at(0.12, 0.7)} Z`}
          fill={colour}
        />
      );
    case "bolt":
      return (
        <path
          d={`M${at(0.56, 0.16)} L${at(0.3, 0.54)} L${at(0.48, 0.54)} L${at(0.4, 0.86)} L${at(0.7, 0.46)} L${at(0.5, 0.46)} Z`}
          fill={colour}
        />
      );
    case "star":
      return (
        <path
          d={polygon(
            Array.from({ length: 10 }, (_, point) => {
              const angle = -Math.PI / 2 + (point * Math.PI) / 5;
              const r = point % 2 === 0 ? W * 0.3 : W * 0.13;
              return [50 + Math.cos(angle) * r, 50 + Math.sin(angle) * r] as const;
            })
          )}
          fill={colour}
        />
      );
    case "laurel": {
      // Two arcs facing each other, which is what a laurel reads as at this
      // size — leaves would be mud.
      const r = W * 0.3;
      const arc = (from: number, to: number) => {
        const a = (deg: number) => [50 + Math.cos((deg * Math.PI) / 180) * r, 50 + Math.sin((deg * Math.PI) / 180) * r];
        const [sx, sy] = a(from);
        const [ex, ey] = a(to);
        return `M${sx},${sy} A${r},${r} 0 0,1 ${ex},${ey}`;
      };
      return (
        <g fill="none" stroke={colour} strokeWidth={W * 0.09} strokeLinecap="butt">
          <path d={arc(-60, 60)} />
          <path d={arc(120, 240)} />
        </g>
      );
    }
    case "bars":
      return (
        <g fill={colour}>
          {[0, 1, 2].map((index) => (
            <rect
              key={index}
              x={X + W * (0.24 + index * 0.05)}
              y={Y + H * (0.36 + index * 0.14)}
              width={W * (0.52 - index * 0.1)}
              height={H * 0.075}
            />
          ))}
        </g>
      );
    case "mountain":
      return (
        <path
          d={`M${at(0.16, 0.72)} L${at(0.42, 0.3)} L${at(0.58, 0.52)} L${at(0.72, 0.34)} L${at(0.86, 0.72)} Z`}
          fill={colour}
        />
      );
  }
}
