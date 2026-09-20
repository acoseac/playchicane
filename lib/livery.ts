/**
 * The app's livery rule, ported.
 *
 * A team's colour is authored as a real colour, and some of them are nearly
 * black — which on a dark page is a hole rather than an identity. This raises
 * luminance only until it clears a floor, preserving hue: a bright team is
 * untouched, a black team becomes a legible dark grey that still reads as
 * black next to the others.
 *
 * It must agree with `Color.livery` in the app (Chicane/Design/Tokens.swift).
 * The same team looking like two different colours in the app and on the site
 * is the bug this duplication exists to avoid, so if one moves, move both.
 */
export function livery(hex: string): string {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return "#9aa0a6";

  const value = parseInt(clean, 16);
  let r = ((value >> 16) & 0xff) / 255;
  let g = ((value >> 8) & 0xff) / 255;
  let b = (value & 0xff) / 255;

  // Perceptual luminance, not a naive average — a saturated blue and a
  // saturated yellow of the same average are nothing like as readable.
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const floor = 0.42;
  if (luminance < floor) {
    const lift = floor - luminance;
    r = Math.min(1, r + lift);
    g = Math.min(1, g + lift);
    b = Math.min(1, b + lift);
  }
  const channel = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}
