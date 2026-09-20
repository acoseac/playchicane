import Crest from "@/components/Crest";
import { livery } from "@/lib/livery";
import type { DriverStanding, EntrantStanding } from "@/lib/series";

/**
 * One championship table.
 *
 * The autopilot rides along as a ranked row and is styled as what it is: a
 * pace-setter, not an entrant. A table of one human and the autopilot is still
 * a competition, which is the whole reason it is in here.
 */
export function ConstructorsTable({ rows }: { rows: EntrantStanding[] }) {
  if (!rows.length) return <p className="detail">No teams have scored yet.</p>;
  return (
    <table className="series-table">
      <caption className="visually-hidden">Constructors&apos; championship</caption>
      <thead>
        <tr>
          <th scope="col" className="num">#</th>
          <th scope="col">Team</th>
          <th scope="col" className="num">Wins</th>
          <th scope="col" className="num">Podiums</th>
          <th scope="col" className="num">Points</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.entrantID} className={row.isReference ? "ghost" : undefined}>
            <td className="num">{row.position}</td>
            <td>
              <span className="entrant">
                <Crest design={row.crest} size={22} />
                <span className="spine" style={{ background: livery(row.liveryHex) }} aria-hidden />
                <span>
                  {row.teamName}
                  {row.isReference && <span className="tag"> autopilot</span>}
                  {row.verified && (
                    <span className="tag verified" title="Re-run on the server"> verified</span>
                  )}
                </span>
              </span>
            </td>
            <td className="num">{row.wins}</td>
            <td className="num">{row.podiums}</td>
            <td className="num strong">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DriversTable({ rows }: { rows: DriverStanding[] }) {
  if (!rows.length) return <p className="detail">No drivers have scored yet.</p>;
  return (
    <table className="series-table">
      <caption className="visually-hidden">Drivers&apos; championship</caption>
      <thead>
        <tr>
          <th scope="col" className="num">#</th>
          <th scope="col">Driver</th>
          <th scope="col">Team</th>
          <th scope="col" className="num">Points</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`${row.entrantID}-${row.driverID}`} className={row.isReference ? "ghost" : undefined}>
            <td className="num">{row.position}</td>
            <td>
              <span className="entrant">
                <span className="spine" style={{ background: livery(row.liveryHex) }} aria-hidden />
                <span>{row.name}</span>
              </span>
            </td>
            <td className="detail">
              {row.teamName}
              {row.isReference && <span className="tag"> autopilot</span>}
            </td>
            <td className="num strong">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
