import type { Metadata } from "next";
import Link from "next/link";
import CircuitMap from "@/components/CircuitMap";
import Meter from "@/components/Meter";
import SeriesNav from "@/components/SeriesNav";
import { getCircuits, getSchedule, seriesEnabled, seriesUnlisted } from "@/lib/series";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Circuits — Same Sky",
  description:
    "The twelve circuits this season of Same Sky visits: where they are, what shape they are, and what kind of race each one makes.",
  robots: seriesUnlisted ? { index: false, follow: false } : undefined,
};

export default async function CircuitsPage() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  const atlas = schedule ? await getCircuits(schedule.seriesID) : null;

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">The circuits</h1>
      </header>
      <SeriesNav here="/series/circuits/" />

      {!atlas || atlas.circuits.length === 0 ? (
        <section className="card">
          <h2>No season is running yet</h2>
          <p>
            A season draws its calendar when it opens. When one is live, every circuit it visits is
            here.
          </p>
        </section>
      ) : (
        <>
          <p className="lede-note">
            Every circuit in the game is invented, and every shape below is{" "}
            <strong>generated rather than traced</strong> — from a seed, by the same code that draws
            the map you race on. Nothing here is anywhere real.
          </p>

          <div className="tile-grid">
            {atlas.circuits.map((circuit) => (
              <article
                key={circuit.trackID}
                className="tile"
                style={{ borderLeftColor: "var(--accent)" }}
              >
                <h3>{circuit.name}</h3>
                <p className="where">{circuit.country}</p>
                <div className="map">
                  <CircuitMap circuit={circuit} size={168} />
                </div>
                <dl>
                  <dt>Round</dt>
                  <dd>
                    {circuit.rounds.map((round, index) => (
                      <span key={round}>
                        {index > 0 && ", "}
                        <Link href={`/series/round/${round}/`}>{round}</Link>
                      </span>
                    ))}
                  </dd>
                  <dt>Lap</dt>
                  <dd>{circuit.lapDistanceKm.toFixed(3)} km</dd>
                  <dt>Race</dt>
                  <dd>{circuit.laps} laps</dd>
                  <dt>Pit loss</dt>
                  <dd>{circuit.pitLaneLossSeconds.toFixed(1)} s</dd>
                </dl>
                <div style={{ marginTop: 10 }}>
                  <Meter label="Hard to pass" value={circuit.overtakingDifficulty} />
                  <Meter
                    label="Tyre wear"
                    value={circuit.tyreAbrasiveness}
                    tint="var(--soft)"
                  />
                  <Meter label="Rain" value={circuit.rainProbability} tint="var(--wet)" />
                </div>
              </article>
            ))}
          </div>

          <h2>Reading the shapes</h2>
          <p>
            The tick across the road is the start line, which is also where the pit lane is — the
            generator centres a circuit on its longest straight. A high{" "}
            <em>hard&nbsp;to&nbsp;pass</em> is a place where track position is worth more than pace,
            so a bad qualifying costs you the afternoon. A high <em>tyre&nbsp;wear</em> is a place
            where a second stop stops being a mistake.
          </p>
        </>
      )}
    </main>
  );
}
