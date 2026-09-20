/**
 * The series, as the site reads it.
 *
 * These types mirror the wire documents in `ChicaneSeries`; the server is the
 * only writer and this is a reader, so they carry no behaviour. Every fetch
 * can fail and every page must survive it: a season that has not started, an
 * API being deployed, a network hiccup at revalidation time. The answer is
 * always the same — return null, render the honest empty state, and let Next
 * keep serving the last good page.
 */

export type CrestDesign = {
  shape: "shield" | "roundel" | "hexagon" | "chevron" | "lozenge";
  motif: "wing" | "bolt" | "star" | "laurel" | "bars" | "mountain";
  fieldHex: string;
  motifHex: string;
};

export type DriverIdentity = {
  driverID: string;
  name: string;
  nationality: string;
  hometown: string;
};

export type EntrantIdentity = {
  entrantID: string;
  teamName: string;
  shortName: string;
  liveryHex: string;
  crest: CrestDesign;
  drivers: DriverIdentity[];
};

export type RoundSpec = {
  round: number;
  trackID: string;
  stateHash: string | null;
  opensAt: number;
  closesAt: number;
  uploadDeadline: number;
  attemptsAllowed: number;
  status: "scheduled" | "open" | "closed" | "final";
};

export type SeriesSchedule = {
  wireVersion: number;
  seriesID: string;
  name: string;
  /** A UInt64 carried as a decimal string — it does not fit in a JS number. */
  seed: string;
  seasonYear: number;
  packID: string;
  contentHash: string;
  engineVersion: number;
  minAppBuild: number;
  registrationOpen: boolean;
  entrantCount: number;
  liveries: string[];
  rounds: RoundSpec[];
  serverTime: number;
};

export type EntrantStanding = {
  position: number;
  entrantID: string;
  teamName: string;
  shortName: string;
  liveryHex: string;
  crest: CrestDesign;
  points: number;
  roundPoints: (number | null)[];
  wins: number;
  podiums: number;
  verified: boolean;
  isReference: boolean;
};

export type DriverStanding = {
  position: number;
  entrantID: string;
  driverID: string;
  name: string;
  teamName: string;
  liveryHex: string;
  points: number;
  roundPoints: (number | null)[];
  wins: number;
  podiums: number;
  isReference: boolean;
};

export type StandingsSnapshot = {
  seriesID: string;
  computedAt: number;
  throughRound: number;
  entrantCount: number;
  verification: "provisional" | "partial" | "verified";
  constructors: EntrantStanding[];
  drivers: DriverStanding[];
};

export type Classification = {
  driverID: string;
  teamID: string;
  position: number | null;
  status: string;
  gridPosition: number;
};

export type RaceResult = {
  round: number;
  trackID: string;
  classifications: Classification[];
  fastestLapDriverID: string | null;
};

export type RoundEntry = {
  entryNumber: number;
  entrantID: string;
  teamName: string;
  shortName: string;
  liveryHex: string;
  attemptNumber: number;
  status: "open" | "counted" | "voided" | "unfinished";
  points: number | null;
  classifications: Classification[] | null;
  fastestLap: boolean;
  verification: "submitted" | "verified" | "rejected" | "error" | null;
};

export type RoundReport = {
  seriesID: string;
  round: RoundSpec;
  entries: RoundEntry[];
  reference: RaceResult | null;
  serverTime: number;
};

/** Set in Vercel to take the series pages down entirely. */
export const seriesEnabled = process.env.SERIES_DISABLED !== "1";

/**
 * Reachable by URL, but not announced: no nav link, not in the sitemap, and
 * `noindex` on every series page. This is the state to be in while the season
 * is being tested — the pages are real and the season is not, and a
 * half-populated table is not what should greet a search engine. Remove the
 * variable on the day the series opens.
 */
export const seriesUnlisted = process.env.SERIES_UNLISTED === "1";

const api = process.env.SERIES_API_URL ?? "https://api.playchicane.com";

/**
 * Ten seconds, then give up.
 *
 * This runs during a background regeneration, not in front of a visitor, so
 * the cost of waiting is a stale page rather than a spinner — and a stale page
 * is exactly what we want when the API is unwell.
 */
async function fetchJSON<T>(path: string, revalidate = 600): Promise<T | null> {
  if (!seriesEnabled) return null;
  try {
    const response = await fetch(`${api}${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(10_000),
      headers: { accept: "application/json" },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export const getSchedule = () => fetchJSON<SeriesSchedule>("/v1/series/current", 300);
export const getStandings = (seriesID: string) =>
  fetchJSON<StandingsSnapshot>(`/v1/series/${seriesID}/standings`, 300);
export const getRound = (seriesID: string, round: number) =>
  fetchJSON<RoundReport>(`/v1/series/${seriesID}/rounds/${round}`, 300);

/** The round a visitor means when they arrive: the open one, else the last to open. */
export function currentRound(schedule: SeriesSchedule): RoundSpec | null {
  const now = schedule.serverTime;
  const open = schedule.rounds.find((r) => r.opensAt <= now && now < r.closesAt);
  if (open) return open;
  const started = schedule.rounds.filter((r) => r.opensAt <= now);
  return started.length ? started[started.length - 1] : null;
}

export function nextRound(schedule: SeriesSchedule): RoundSpec | null {
  return schedule.rounds.find((r) => r.opensAt > schedule.serverTime) ?? null;
}

/** Epoch seconds as a date a reader can act on, in UTC, spelled out. */
export function formatMoment(epoch: number): string {
  return new Date(epoch * 1000).toLocaleString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }) + " UTC";
}

export function formatISO(epoch: number): string {
  return new Date(epoch * 1000).toISOString();
}
