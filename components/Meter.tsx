/**
 * A 0–1 rating as a bar.
 *
 * The number itself is not printed: these are the game's own ratings and they
 * are comparative, not absolute — "harder to pass here than there" is the
 * whole of what a reader can use, and a bar says that in one glance where
 * "0.72" invites arithmetic nobody can check.
 */
export default function Meter({
  label,
  value,
  tint = "var(--accent)",
}: {
  label: string;
  value: number;
  tint?: string;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="meter">
      <span>{label}</span>
      <span
        className="track"
        role="img"
        aria-label={`${label}: ${pct} out of 100`}
      >
        <span style={{ width: `${pct}%`, background: tint }} />
      </span>
    </div>
  );
}
