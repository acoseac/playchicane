import type { Metadata } from "next";
import Link from "next/link";
import CircuitMap from "@/components/CircuitMap";
import Meter from "@/components/Meter";
import SeriesNav from "@/components/SeriesNav";
import { livery } from "@/lib/livery";
import {
  circuitIndex,
  driverIndex,
  formatISO,
  formatMoment,
  getCircuits,
  getGrid,
  getRound,
  getSchedule,
  seriesEnabled,
  seriesUnlisted,
  type RoundEntry,
} from "@/lib/series";

export const revalidate = 60;
/**
 * A round that does not exist yet still renders on its first request and is
 * cached from then on — so the week a new round opens, its page is there
 * without a deploy.
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  const schedule = seriesEnabled ? await getSchedule() : null;
  return (schedule?.rounds ?? []).map((round) => ({ round: String(round.round) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ round: string }>;
}): Promise<Metadata> {
  const { round } = await params;
  const number = Number.parseInt(round, 10);
  const schedule = seriesEnabled && Number.isFinite(number) ? await getSchedule() : null;
  const spec = schedule?.rounds.find((r) => r.round === number);
  const circuit = spec ? circuitIndex(await getCircuits(schedule!.seriesID)).get(spec.trackID) : null;
  return {
    title: circuit ? `Round ${round}, ${circuit.name} — Same Sky` : `Round ${round} — Same Sky`,
    description: circuit
      ? `Every entrant's result from round ${round} of Same Sky, at ${circuit.name}, ${circuit.country}.`
      : `Every entrant's result from round ${round} of the Same Sky online series.`,
    robots: seriesUnlisted ? { index: false, follow: false } : undefined,
  };
}

export default async function RoundPage({ params }: { params: Promise<{ round: string }> }) {
  const { round: raw } = await params;
  const number = Number.parseInt(raw, 10);
  const schedule = seriesEnabled && Number.isFinite(number) ? await getSchedule() : null;
  const [report, atlas, grid] = schedule
    ? await Promise.all([
        getRound(schedule.seriesID, number),
        getCircuits(schedule.seriesID),
        getGrid(schedule.seriesID),
      ])
    : [null, null, null];

  const circuit = report ? circuitIndex(atlas).get(report.round.trackID) ?? null : null;
  const drivers = driverIndex(grid);

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">
          Round {Number.isFinite(number) ? number : raw}
          {circuit ? ` · ${circuit.name}` : ""}
        </h1>
      </header>
      <SeriesNav />

      {!report ? (
        <section className="card">
          <h2>Nothing here yet</h2>
          <p>
            This round has not been published. <Link href="/series/">Back to the series</Link>.
          </p>
        </section>
      ) : (
        <>
          {circuit && (
            <article className="tile" style={{ borderLeftColor: "var(--accent)", marginBottom: 20 }}>
              <div className="team-head">
                <h3>{circuit.name}</h3>
                <span className="code">{circuit.country}</span>
              </div>
              <div className="map">
                <CircuitMap circuit={circuit} size={220} />
              </div>
              <dl>
                <dt>Race</dt>
                <dd>
                  {circuit.laps} laps · {(circuit.laps * circuit.lapDistanceKm).toFixed(1)} km
                </dd>
                <dt>Lap</dt>
                <dd>{circuit.lapDistanceKm.toFixed(3)} km</dd>
                <dt>Pit loss</dt>
                <dd>{circuit.pitLaneLossSeconds.toFixed(1)} s</dd>
              </dl>
              <div style={{ marginTop: 10 }}>
                <Meter label="Hard to pass" value={circuit.overtakingDifficulty} />
                <Meter label="Tyre wear" value={circuit.tyreAbrasiveness} tint="var(--soft)" />
                <Meter label="Rain" value={circuit.rainProbability} tint="var(--wet)" />
              </div>
              <p className="detail" style={{ marginTop: 10 }}>
                <Link href="/series/circuits/">Every circuit this season</Link>
              </p>
            </article>
          )}

          <p className="detail">
            Opened <time dateTime={formatISO(report.round.opensAt)}>{formatMoment(report.round.opensAt)}</time>
            {" · "}
            {report.round.status === "open" ? "closes " : "closed "}
            <time dateTime={formatISO(report.round.closesAt)}>{formatMoment(report.round.closesAt)}</time>
          </p>

          {report.round.status === "open" && (
            <section className="card">
              <p>
                This round is still open, so the table below fills as entrants finish. The weather
                and the autopilot&apos;s own race are published when it closes — nobody should be
                able to read the week&apos;s sky here before they have driven it.
              </p>
            </section>
          )}

          <h2>The entrants</h2>
          {report.entries.length === 0 ? (
            <p className="detail">Nobody has finished this round yet.</p>
          ) : (
            <table className="series-table">
              <caption className="visually-hidden">Round {number} results</caption>
              <thead>
                <tr>
                  <th scope="col" className="num">No.</th>
                  <th scope="col">Team</th>
                  <th scope="col">Result</th>
                  <th scope="col" className="num">Points</th>
                </tr>
              </thead>
              <tbody>
                {report.entries.map((entry) => (
                  <tr key={entry.entrantID}>
                    <td className="num">{entry.entryNumber}</td>
                    <td>
                      <span className="entrant">
                        <span className="spine" style={{ background: livery(entry.liveryHex) }} aria-hidden />
                        <span>{entry.teamName}</span>
                      </span>
                    </td>
                    <td className="detail">{describe(entry)}</td>
                    <td className="num strong">{entry.points ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {report.reference && (
            <>
              <h2>The autopilot&apos;s race</h2>
              <p className="detail">
                The same weekend, driven by the game&apos;s own default calls — the line every
                entrant is measured against. <Link href="/series/field/">Who these drivers are</Link>.
              </p>
              <table className="series-table">
                <caption className="visually-hidden">The autopilot&apos;s classification</caption>
                <thead>
                  <tr>
                    <th scope="col" className="num">Pos</th>
                    <th scope="col">Driver</th>
                    <th scope="col">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {report.reference.classifications.slice(0, 12).map((entry) => {
                    const known = drivers.get(entry.driverID);
                    return (
                      <tr key={entry.driverID}>
                        <td className="num">{entry.position ?? "—"}</td>
                        <td>
                          <span className="entrant">
                            <span
                              className="spine"
                              style={{ background: livery(known?.team.liveryHex ?? "9AA0A6") }}
                              aria-hidden
                            />
                            <span>{known?.name ?? entry.driverID}</span>
                          </span>
                          {entry.status !== "finished" && <span className="tag"> {entry.status}</span>}
                        </td>
                        <td className="detail">{known?.team.name ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </main>
  );
}

function describe(entry: RoundEntry): string {
  switch (entry.status) {
    case "open":
      return "still racing";
    case "unfinished":
      return "did not finish the window";
    case "voided":
      return "replaced by a later attempt";
    case "counted": {
      const places = (entry.classifications ?? [])
        .map((c) => (c.position ? `P${c.position}` : c.status))
        .join(" · ");
      const attempt = entry.attemptNumber > 1 ? ` (attempt ${entry.attemptNumber})` : "";
      const verified = entry.verification === "verified" ? " · verified" : "";
      return `${places || "classified"}${attempt}${verified}`;
    }
  }
}
