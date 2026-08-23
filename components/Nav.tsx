import Link from "next/link";

const links = [
  { href: "/how-it-plays/", label: "How it plays" },
  { href: "/press/", label: "Press kit" },
  { href: "/support/", label: "Support" },
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
