import Link from "next/link";
import { seriesEnabled, seriesUnlisted } from "@/lib/series";

const links = [
  { href: "/how-it-plays/", label: "How it plays" },
  { href: "/press/", label: "Press kit" },
  { href: "/support/", label: "Support" },
  // Last on purpose: this nav drops its first link under 430px, and losing
  // "How it plays" on a phone would be the wrong thing to lose.
  ...(seriesEnabled && !seriesUnlisted ? [{ href: "/series/", label: "Same Sky" }] : []),
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-mark" aria-label="Chicane — home">
          <span className="masthead nav-word">Chicane</span>
          <span className="nav-sub">Racing Manager</span>
        </Link>
        <nav aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
