import type { Metadata } from "next";
import Link from "next/link";
import CircuitMap from "@/components/CircuitMap";
import SeriesNav from "@/components/SeriesNav";
import { ConstructorsTable, DriversTable } from "@/components/StandingsTable";
import {
  circuitIndex,
  currentRound,
  formatISO,
  formatMoment,
  getCircuits,
  getSchedule,
  getStandings,
  nextRound,
  seriesEnabled,
  seriesUnlisted,
} from "@/lib/series";

/**
 * Regenerated in the background at most every minute.
 *
 * A visitor always gets a prerendered page, never a spinner and never a
 * request to the API — which is what keeps the site's promise (no cookies, no
 * scripts, no forms) literally true while still showing a live season.
 *
 * It was ten minutes, over a fetch layer that cached for five, and the two
 * compound: on the first live round an entrant raced, came here and found a
 * table without their own result in it for a quarter of an hour. A background
 * regeneration of a cached, ETagged document once a minute costs the API
 * almost nothing, and nobody waits for it either way.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Same Sky",
  description:
    "One race a week. Everybody gets the same circuit, the same seed and the same weather. The standings are what your calls were worth.",
  robots: seriesUnlisted ? { index: false, follow: false } : undefined,
};

export default async function SeriesPage() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  const [standings, atlas] = schedule
    ? await Promise.all([getStandings(schedule.seriesID), getCircuits(schedule.seriesID)])
    : [null, null];
  const round = schedule ? currentRound(schedule) : null;
  const upcoming = schedule ? nextRound(schedule) : null;
  const circuits = circuitIndex(atlas);
  const here = round ? circuits.get(round.trackID) ?? null : null;

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">The online series</p>
        <h1 className="masthead">Same Sky</h1>
        <p className="hero-lede">
          One race a week. Everybody gets the same circuit, the same seed and the same weather —
          and races it alone, against the same twenty-two cars. What separates the table is what
          you did with it.
        </p>
        <SeriesNav here="/series/" />
      </header>

      {!schedule ? (
        <section className="card">
          <h2>No season is running yet</h2>
          <p>
            Same Sky opens with the game. When a season is live this page carries the round, the
            tables and every entrant&apos;s result.
          </p>
        </section>
      ) : (
        <>
          <dl className="series-strip">
            <div>
              <dt>Season</dt>
              <dd>{schedule.name}</dd>
            </div>
            <div>
              <dt>Entrants</dt>
              <dd>{schedule.entrantCount}</dd>
            </div>
            <div>
              <dt>Rounds</dt>
              <dd>{schedule.rounds.length}</dd>
            </div>
            <div>
              <dt>Best of</dt>
              <dd>9</dd>
            </div>
          </dl>

          <section className="card">
            {round ? (
              <>
                <p className="eyebrow">
                  {round.status === "open" ? "This round" : `Round ${round.round}`}
                </p>
                <h2>
                  <Link href={`/series/round/${round.round}/`}>
                    Round {round.round}
                    {here ? ` · ${here.name}` : ""}
                  </Link>
                </h2>
                {here && (
                  <>
                    <p className="where">{here.country}</p>
                    <div className="map">
                      <CircuitMap circuit={here} size={190} />
                    </div>
                    <p className="detail">
                      {here.laps} laps of {here.lapDistanceKm.toFixed(3)} km.{" "}
                      <Link href="/series/circuits/">Every circuit this season</Link>.
                    </p>
                  </>
                )}
                <p>
                  {round.status === "open" ? (
                    <>
                      Open until{" "}
                      <time dateTime={formatISO(round.closesAt)}>{formatMoment(round.closesAt)}</time>.
                    </>
                  ) : (
                    <>
                      Closed{" "}
                      <time dateTime={formatISO(round.closesAt)}>{formatMoment(round.closesAt)}</time>.
                    </>
                  )}
                </p>
              </>
            ) : (
              <p>The first round has not opened yet.</p>
            )}
            {upcoming && (
              <p className="detail">
                Round {upcoming.round} opens{" "}
                <time dateTime={formatISO(upcoming.opensAt)}>{formatMoment(upcoming.opensAt)}</time>.
              </p>
            )}
          </section>

          {standings && (
            <>
              <h2>Teams</h2>
              <ConstructorsTable rows={standings.constructors.slice(0, 25)} />
              <h2>Drivers</h2>
              <DriversTable rows={standings.drivers.slice(0, 25)} />
              <p className="detail">
                Through round {standings.throughRound}. <VerificationNote state={standings.verification} />{" "}
                <Link href="/series/standings/">Full tables</Link>, or{" "}
                <Link href="/series/entrants/">every entrant</Link>.
              </p>
            </>
          )}

          <h2>The rounds</h2>
          <ul className="round-list">
            {schedule.rounds.map((r) => (
              <li key={r.round}>
                <Link href={`/series/round/${r.round}/`}>
                  Round {r.round}
                  {circuits.get(r.trackID) ? ` · ${circuits.get(r.trackID)!.name}` : ""}
                </Link>
                <span className={`state${r.status === "open" ? " open" : ""}`}>
                  {r.status === "scheduled"
                    ? formatMoment(r.opensAt)
                    : r.status === "open"
                      ? "open now"
                      : r.status}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>How it works</h2>
      <p>
        Every entrant runs the same weekend: the same circuit, the same seed, the same sky, and the
        same twenty-two rival cars. You set the car up, run qualifying and call the race from the
        pit wall, any time inside the window. Up to three attempts — the last one you start is the
        one that counts, so re-entering is a bet, not a grind. The best nine rounds of twelve make
        your season.
      </p>
      <p>
        Every result on this page was re-run on the server from the inputs the phone recorded, which
        is what &ldquo;verified&rdquo; means beside a team. Nothing you type is ever sent: team and
        driver names are composed by the season from the game&apos;s own pools.
      </p>
      <p>
        You are the twelfth team. The other{" "}
        <Link href="/series/field/">eleven and their twenty-two drivers</Link> are the game&apos;s
        own, the same for everybody, and the{" "}
        <Link href="/series/circuits/">circuits</Link> are generated rather than traced — nothing
        in this championship is anywhere real.
      </p>
      <p className="detail">
        There are no prizes, and there never will be — see the{" "}
        <Link href="/privacy/">privacy policy</Link> for what leaves your device.
      </p>
    </main>
  );
}

function VerificationNote({ state }: { state: "provisional" | "partial" | "verified" }) {
  switch (state) {
    case "provisional":
      return <>Provisional — the server has not re-run these races yet.</>;
    case "partial":
      return <>Some results have been re-run on the server; the rest are provisional.</>;
    case "verified":
      return <>Every counted result has been re-run on the server.</>;
  }
}
