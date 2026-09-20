import type { Metadata } from "next";
import Link from "next/link";
import { livery } from "@/lib/livery";
import {
  formatISO,
  formatMoment,
  getRound,
  getSchedule,
  seriesEnabled,
  seriesUnlisted,
  type RoundEntry,
} from "@/lib/series";

export const revalidate = 600;
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
  return {
    title: `Round ${round} — Same Sky`,
    description: `Every entrant's result from round ${round} of the Same Sky online series.`,
    robots: seriesUnlisted ? { index: false, follow: false } : undefined,
  };
}

export default async function RoundPage({ params }: { params: Promise<{ round: string }> }) {
  const { round: raw } = await params;
  const number = Number.parseInt(raw, 10);
  const schedule = seriesEnabled && Number.isFinite(number) ? await getSchedule() : null;
  const report = schedule ? await getRound(schedule.seriesID, number) : null;

  return (
    <main className="wrap prose" id="main">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/series/">Same Sky</Link>
        </p>
        <h1 className="masthead">Round {Number.isFinite(number) ? number : raw}</h1>
      </header>

      {!report ? (
        <section className="card">
          <h2>Nothing here yet</h2>
          <p>
            This round has not been published. <Link href="/series/">Back to the series</Link>.
          </p>
        </section>
      ) : (
        <>
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
                entrant is measured against.
              </p>
              <table className="series-table">
                <caption className="visually-hidden">The autopilot&apos;s classification</caption>
                <thead>
                  <tr>
                    <th scope="col" className="num">Pos</th>
                    <th scope="col">Car</th>
                  </tr>
                </thead>
                <tbody>
                  {report.reference.classifications.slice(0, 10).map((entry) => (
                    <tr key={entry.driverID}>
                      <td className="num">{entry.position ?? "—"}</td>
                      <td>
                        {entry.driverID}
                        {entry.status !== "finished" && <span className="tag"> {entry.status}</span>}
                      </td>
                    </tr>
                  ))}
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
