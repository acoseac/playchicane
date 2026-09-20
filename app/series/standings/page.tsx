import type { Metadata } from "next";
import Link from "next/link";
import { ConstructorsTable, DriversTable } from "@/components/StandingsTable";
import { formatMoment, getSchedule, getStandings, seriesEnabled, seriesUnlisted } from "@/lib/series";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Standings — Same Sky",
  description: "Both championships in the Same Sky online series, with every entrant.",
  robots: seriesUnlisted ? { index: false, follow: false } : undefined,
};

export default async function StandingsPage() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  const standings = schedule ? await getStandings(schedule.seriesID) : null;

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">Standings</h1>
      </header>

      {!standings ? (
        <section className="card">
          <h2>No tables yet</h2>
          <p>They arrive once the first round has been raced.</p>
        </section>
      ) : (
        <>
          <p className="detail">
            Through round {standings.throughRound} · {standings.entrantCount}{" "}
            {standings.entrantCount === 1 ? "entrant" : "entrants"} · computed{" "}
            {formatMoment(standings.computedAt)}
          </p>
          <h2>Teams</h2>
          <ConstructorsTable rows={standings.constructors} />
          <h2>Drivers</h2>
          <DriversTable rows={standings.drivers} />
          <p className="detail">
            The best nine rounds of twelve count. Ties are settled by countback, then by cumulative
            race time over the counted rounds, then by fewer attempts used, then by entry number.
            The autopilot races every round from the same canonical world and is shown as a
            pace-setter, never as an entrant.
          </p>
        </>
      )}
    </main>
  );
}
