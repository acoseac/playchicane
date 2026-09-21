import type { Metadata } from "next";
import Link from "next/link";
import Crest from "@/components/Crest";
import Helmet from "@/components/Helmet";
import SeriesNav from "@/components/SeriesNav";
import { livery } from "@/lib/livery";
import {
  getEntrants,
  getSchedule,
  getStandings,
  seriesEnabled,
  seriesUnlisted,
  type EntrantStanding,
} from "@/lib/series";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Entrants — Same Sky",
  description:
    "Every team entered in this season of Same Sky: the crest, the livery, the two drivers, and the season so far.",
  robots: seriesUnlisted ? { index: false, follow: false } : undefined,
};

export default async function EntrantsPage() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  const [entrants, standings] = schedule
    ? await Promise.all([getEntrants(schedule.seriesID), getStandings(schedule.seriesID)])
    : [null, null];

  const byID = new Map<string, EntrantStanding>(
    (standings?.constructors ?? []).map((row) => [row.entrantID, row])
  );
  const rounds = schedule?.rounds.length ?? 0;
  // Standing order where there is one, entry order otherwise — a season that
  // has not scored yet should read as the order people arrived, not as a
  // ranking of zeroes.
  const listed = [...(entrants?.entrants ?? [])].sort((a, b) => {
    const left = byID.get(a.identity.entrantID)?.position;
    const right = byID.get(b.identity.entrantID)?.position;
    if (left && right && left !== right) return left - right;
    return a.entryNumber - b.entryNumber;
  });

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">The entrants</h1>
      </header>
      <SeriesNav here="/series/entrants/" />

      {listed.length === 0 ? (
        <section className="card">
          <h2>Nobody has entered yet</h2>
          <p>
            An entry appears here the moment it is made — before it has raced a lap.{" "}
            <Link href="/series/">How the season works</Link>.
          </p>
        </section>
      ) : (
        <>
          <p className="lede-note">
            {listed.length} {listed.length === 1 ? "team" : "teams"} in the season. Every name,
            crest, livery and driver below was composed by the season from the game&apos;s own
            pools — nothing an entrant typed is ever sent, so nothing an entrant typed is ever
            here.
          </p>

          <div className="card-grid">
            {listed.map((entrant) => {
              const row = byID.get(entrant.identity.entrantID);
              const colour = livery(entrant.identity.liveryHex);
              return (
                <article
                  key={entrant.identity.entrantID}
                  className="tile"
                  style={{ borderLeftColor: colour }}
                >
                  <div className="team-head">
                    <Crest design={entrant.identity.crest} size={34} />
                    <h3>{entrant.identity.teamName}</h3>
                    {/* A position only once it means something. Everybody on
                        zero is separated by tiebreaks nobody raced for, and
                        printing "P1" against a blank season reads as a lead. */}
                    <span className="code">
                      {row && row.points > 0 ? `P${row.position}` : `No. ${entrant.entryNumber}`}
                    </span>
                  </div>
                  <p className="where">
                    Entry {entrant.entryNumber}
                    {row ? ` · ${row.points} ${row.points === 1 ? "point" : "points"}` : ""}
                    {entrant.status !== "active" ? ` · ${entrant.status}` : ""}
                  </p>

                  <div className="roster">
                    {entrant.identity.drivers.map((driver) => (
                      <div key={driver.driverID} className="roster-driver">
                        {driver.helmet && <Helmet design={driver.helmet} size={26} />}
                        <span className="who">
                          <strong>{driver.name}</strong>
                          <span>
                            {[driver.nationality, driver.hometown].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {row && rounds > 0 && <SeasonLine points={row.roundPoints} rounds={rounds} />}
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

/** The season round by round: a cell each, a link on the ones that happened. */
function SeasonLine({ points, rounds }: { points: (number | null)[]; rounds: number }) {
  return (
    <ul className="season-line">
      {Array.from({ length: rounds }, (_, index) => {
        const scored = points[index];
        return (
          <li key={index} className={scored != null ? "scored" : undefined}>
            <span className="r">R{index + 1}</span>
            {scored != null ? (
              <Link href={`/series/round/${index + 1}/`}>{scored}</Link>
            ) : (
              "—"
            )}
          </li>
        );
      })}
    </ul>
  );
}
