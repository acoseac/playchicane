import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it plays",
  description:
    "A race weekend in Chicane: practice, knockout qualifying, the race itself with five live decisions, then the debrief, the factory and the money.",
};

const weekend = [
  {
    phase: "Qualifying",
    time: "~90 s",
    body: "Three knockout segments. Per segment: how many runs to spend, which compound, and when to go out. The track rubbers in as the session runs, so later is faster — until it isn't, because later is also busier, and a red flag ends the segment where it stands. Tyre sets come from one weekend allowance, so a second run in Q3 is a set Sunday will not have.",
  },
  {
    phase: "Setup",
    time: "~45 s",
    body: "Wing, suspension and brake bias, plus the starting compound and which engineer runs which car. The defaults are what your own engineers would arrive at, solved from the circuit — this screen is a place to gain an edge by deliberate deviation, not a toll gate. It locks when qualifying starts: trim for one lap and you start well and race badly.",
  },
  {
    phase: "The race",
    time: "6–10 min",
    body: "The main event, at 1×, 2× or skip-to-the-next-incident. Five live verbs and no more: pit now, pace, driver orders, answer a telegraphed event, and the radio. Twenty live controls make a cockpit, not a game.",
  },
  {
    phase: "Debrief",
    time: "~60 s",
    body: "The result, what it did to both championships, the paddock's reaction, and where the money goes next.",
  },
];

const verbs = [
  {
    n: "01",
    t: "Pit now",
    d: "Box this lap, and choose the compound. Your cars never stop on a plan, never for a spent tyre, never even for the wrong compound in the rain. Every stop in your season is one you called.",
  },
  {
    n: "02",
    t: "Pace",
    d: "Push, neutral or conserve as one tap — with engine and tyre modes behind them, because saving the engine and saving the tyres are not the same decision. Mixed settings are the point: maximum power on managed rubber.",
  },
  {
    n: "03",
    t: "Driver orders",
    d: "Attack, hold position, swap, defend. With both championships live, ordering two of your own cars to stop racing each other is a real dilemma rather than a formality.",
  },
  {
    n: "04",
    t: "Answer the telegraph",
    d: "An event arrives one to three laps before it lands, carrying its price. Box now and lose 22 seconds, or run it and risk the tyre. Either way the outcome is yours.",
  },
  {
    n: "05",
    t: "Radio",
    d: "Your engineer offers a quantified, timed trade — “mode push, eight laps, three tenths a lap; it'll cost you tyre” — and every number is computed from the live race, so the simulation delivers exactly what was quoted. Stay silent and the driver decides in character, and you can still countermand it.",
  },
];

export default function HowItPlays() {
  return (
    <>
      <header className="page-head">
        <div className="halftone" aria-hidden />
        <div className="narrow" style={{ position: "relative" }}>
          <p className="eyebrow">The game</p>
          <h1 className="masthead">How it plays</h1>
          <p>
            Twelve fictional teams contest an eighteen-race season for two championships. You own one of
            them and field two drivers. You develop the car between races, choose the strategy before
            each one and make the live calls during it. You do not drive.
          </p>
        </div>
      </header>

      {/* ------------------------------------------------- The weekend */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Ten to fifteen minutes</p>
            <h2 className="masthead">A race weekend</h2>
            <p>
              The hardest constraint in the whole design. Rival management games run 15–25 minutes a
              race, which is a desk session. Chicane has to survive a commute — portrait, one-handed,
              interruptible, and a race that resumes exactly where a phone call left it.
            </p>
          </div>

          <div className="grid two">
            {weekend.map((w) => (
              <div className="card" key={w.phase}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <h3>{w.phase}</h3>
                  <span className="mono" style={{ color: "var(--player)", whiteSpace: "nowrap" }}>
                    {w.time}
                  </span>
                </div>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* --------------------------------------------------- Five verbs */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">During the race</p>
            <h2 className="masthead">Five things you can do</h2>
            <p>
              Deliberately few. Constraining the live controls to a handful is what makes each one weigh
              something, and what keeps the whole race playable with one thumb.
            </p>
          </div>

          <div className="grid two">
            {verbs.map((v, i) => (
              <div
                className="card"
                key={v.n}
                style={i === verbs.length - 1 && verbs.length % 2 === 1 ? { gridColumn: "1 / -1" } : undefined}
              >
                <p
                  className="masthead"
                  style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: 10, opacity: 0.5 }}
                >
                  {v.n}
                </p>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ------------------------------------------------ Shots: money */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Between races</p>
            <h2 className="masthead">The factory, and the money</h2>
            <p>
              One currency runs the team. Broadcast income lands round by round, salaries go out round by
              round, and what banks up funds development programmes across four axes — aerodynamics,
              powertrain, reliability and tyre management, each worth more at some circuits than others.
            </p>
          </div>

          <div className="shots">
            <figure className="shot">
              <Image
                src="/screenshots/development.webp"
                alt="The development screen: four car axes with current ratings, a wind-tunnel share multiplier, the cost cap, and a programme being commissioned with a projected improvement range."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>Commission a programme</b>
                The factory quotes a <em>range</em>, not a number, and the range shown is the range
                honoured. Parts take two to three races to arrive, so a commission is a bet on the second
                half of the season rather than a purchase.
              </figcaption>
            </figure>

            <figure className="shot">
              <Image
                src="/screenshots/paddock-feed.webp"
                alt="The paddock feed showing wire reports, a tabloid story and a race-control technical bulletin about the season's regulations."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>The paddock talks</b>
                A news feed in four voices — the wire, the tabloid, race control and the sponsors — that
                reacts to what actually happened in your season and changes the world underneath you.
              </figcaption>
            </figure>

            <figure className="shot">
              <Image
                src="/screenshots/standings.webp"
                alt="The drivers' championship table after round one, each row carrying the driver's portrait and their team's livery colour."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>Two championships, live</b>
                Points to each driver individually and to the team combined. Late in a season with your
                two drivers fighting each other, that is what turns a team order into a genuine dilemma.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* --------------------------------------------------- Bad days */}
      <section>
        <div className="wrap grid two" style={{ alignItems: "center", gap: 56 }}>
          <div className="phone" style={{ maxWidth: 280 }}>
            <Image
              src="/screenshots/race-moment.webp"
              alt="The post-race screen after a bad result, headlined “Nothing today” — best finish seventeenth, nothing scored."
              width={804}
              height={1748}
            />
          </div>
          <div>
            <p className="eyebrow">And when it goes wrong</p>
            <h2
              className="masthead"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 2.7rem)", marginBottom: 18 }}
            >
              It tells you the truth
            </h2>
            <p style={{ color: "var(--text-dim)" }}>
              This is a real result from the season these screenshots come from. The rain came, the track
              dried, both cars were left out on intermediates far too long, and they finished
              seventeenth and twenty-third. The game does not dress that up.
            </p>
            <p style={{ color: "var(--text-dim)" }}>
              It is also entirely recoverable — one bad race out of eighteen. That balance is the whole
              design: decisions should be legible enough to understand, tense enough to matter, and
              survivable enough that you want the next round rather than a restart.
            </p>
            <p style={{ marginTop: 26 }}>
              <Link className="btn ghost" href="/support/">
                Questions? →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--bg-deep)",
          textAlign: "center",
        }}
      >
        <div className="wrap">
          <h2
            className="masthead"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", marginBottom: 16 }}
          >
            Coming to iPhone
          </h2>
          <p style={{ color: "var(--text-dim)", maxWidth: "44ch", margin: "0 auto 28px" }}>
            Not on the App Store yet. When it is, this page will say so.
          </p>
          <a className="btn" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </div>
      </section>
    </>
  );
}
