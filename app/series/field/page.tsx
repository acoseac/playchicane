import type { Metadata } from "next";
import Link from "next/link";
import Crest from "@/components/Crest";
import Helmet from "@/components/Helmet";
import Meter from "@/components/Meter";
import SeriesNav from "@/components/SeriesNav";
import { livery } from "@/lib/livery";
import { getGrid, getSchedule, seriesEnabled, seriesUnlisted } from "@/lib/series";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The field — Same Sky",
  description:
    "The eleven teams and twenty-two drivers every Same Sky entrant races against: who they are, where they are from, and what they are good at.",
  robots: seriesUnlisted ? { index: false, follow: false } : undefined,
};

export default async function FieldPage() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  const grid = schedule ? await getGrid(schedule.seriesID) : null;

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">The field</h1>
        <SeriesNav here="/series/field/" />
      </header>

      {!grid || grid.teams.length === 0 ? (
        <section className="card">
          <h2>No season is running yet</h2>
          <p>When a season is live, the grid it races against is here.</p>
        </section>
      ) : (
        <>
          <p className="lede-note">
            These are the {grid.teams.length} teams and{" "}
            {grid.teams.reduce((n, t) => n + t.drivers.length, 0)} drivers on the grid every week.
            They are the same for everybody — the seed that decides the weather decides them too —
            and every one of them is invented. Your entry is a twelfth team with a car built to the
            middle of this field, so what separates the table is your calls and nothing else.
          </p>

          <div className="card-grid">
            {grid.teams.map((team) => {
              const colour = livery(team.liveryHex);
              return (
                <article key={team.teamID} className="tile" style={{ borderLeftColor: colour }}>
                  <div className="team-head">
                    <Crest design={team.crest} size={34} />
                    <h3>{team.name}</h3>
                    <span className="code">{team.shortName}</span>
                  </div>
                  <p className="where">
                    {team.homeNation} · est. {team.foundedYear}
                  </p>

                  <div className="roster">
                    {team.drivers.map((driver) => (
                      <div key={driver.driverID} className="roster-driver">
                        <Helmet design={driver.helmet} size={26} />
                        <span className="who">
                          <strong>{driver.name}</strong>
                          <span>
                            {driver.nationality} · {driver.age}
                            {driver.hometown ? ` · ${driver.hometown}` : ""}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <details className="blurb">
                    <summary>The team, and the drivers</summary>
                    {team.history && <p>{team.history}</p>}
                    {team.drivers.map((driver) => (
                      <div key={driver.driverID} style={{ marginTop: 12 }}>
                        <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: "0.88rem" }}>
                          {driver.name}
                        </p>
                        {driver.biography && <p style={{ marginTop: 0 }}>{driver.biography}</p>}
                        <Meter label="Pace" value={driver.pace} tint={colour} />
                        <Meter label="Racecraft" value={driver.racecraft} tint={colour} />
                        <Meter label="Consistency" value={driver.consistency} tint={colour} />
                        <Meter label="Tyres" value={driver.tyreManagement} tint={colour} />
                        <Meter label="In the wet" value={driver.wetSkill} tint={colour} />
                      </div>
                    ))}
                  </details>
                </article>
              );
            })}
          </div>

          <h2>Why they matter</h2>
          <p>
            You never race another entrant wheel to wheel — everybody runs their own weekend against
            this grid. So the table is not who beat whom, it is who got more out of the same
            afternoon: the same circuit, the same seed, the same sky, and these twenty-two cars
            doing what they were always going to do.
          </p>
        </>
      )}
    </main>
  );
}
