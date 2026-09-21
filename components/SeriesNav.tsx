import Link from "next/link";

/**
 * The series' own sub-navigation.
 *
 * The site's top nav carries one "Series" link, because a season is one thing
 * from outside; once you are inside it there are five pages and they are only
 * useful if you can move between them. Plain links and `aria-current` — the
 * whole of the interactivity, and the site still runs no scripts.
 */
const PAGES = [
  { href: "/series/", label: "This week" },
  { href: "/series/standings/", label: "Tables" },
  { href: "/series/entrants/", label: "Entrants" },
  { href: "/series/field/", label: "The field" },
  { href: "/series/circuits/", label: "Circuits" },
] as const;

export default function SeriesNav({ here }: { here?: string }) {
  return (
    <nav aria-label="The series">
      <ul className="series-nav">
        {PAGES.map((page) => (
          <li key={page.href}>
            <Link href={page.href} aria-current={page.href === here ? "page" : undefined}>
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
