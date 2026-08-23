import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="hero">
        <div className="halftone" aria-hidden />
        <div className="wrap hero-inner">
          <div>
            <span className="badge">
              <span className="dot" aria-hidden />
              Coming to the App&nbsp;Store
            </span>
            <h1 className="masthead" style={{ marginTop: 24 }}>
              You run the team.
              <span className="line2">You don&apos;t drive.</span>
            </h1>
            <p className="hero-lede">
              Two drivers. Eighteen races. Two championships. And a race director whose whole job is
              to make sure the season you&apos;re playing is never the season you planned.
            </p>
            <div className="hero-cta">
              <Link href="/how-it-plays/" className="btn">
                See how it plays
              </Link>
              <Link href="/press/" className="btn ghost">
                Press kit
              </Link>
            </div>
            <p className="hero-meta">
              iPhone · {site.platform} · a race weekend fits in a commute
            </p>
          </div>

          <div className="phone tilt">
            <Image
              src="/screenshots/race-radio-decision.webp"
              alt="A race in progress on lap 17. The circuit map places cars at their real gap to the leader, the timing tower runs alongside, and race engineer Ren Okada is on the radio: “Aya, that’s enough of that — this set won’t reach the flag and I don’t want to gamble. Manage them for 14 laps — buys you 2 laps.” The projection reads +0.32s a lap for +2 laps of tyre, with three answers: fourteen laps, hold it, or keep pushing."
              width={804}
              height={1748}
              priority
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Facts */}
      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <dl className="facts">
            <div>
              <dt>Teams</dt>
              <dd>12</dd>
            </div>
            <div>
              <dt>Races a season</dt>
              <dd>18</dd>
            </div>
            <div>
              <dt>Championships live</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>Minutes a weekend</dt>
              <dd>10–15</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------ Race director */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">The hook</p>
            <h2 className="masthead">A race director that won&apos;t let the season settle</h2>
            <p>
              The problem with management games is that they become spreadsheets. Once you understand
              the model, the season resolves itself and there is nothing left to be present for.
              Chicane&apos;s answer is a director sitting above the simulation, spending a drama budget
              on weather, failures, safety cars, stewards&apos; decisions and the occasional genuine
              freak incident.
            </p>
          </div>

          <div className="grid three">
            <div className="card">
              <h3>It telegraphs</h3>
              <p>
                An event that simply happens to you is punishment. The same event, called one to three
                laps out, is a decision — and the outcome is yours either way. &ldquo;Vibration
                reported: box now and lose 22 seconds, or run it and risk the tyre.&rdquo;
              </p>
            </div>
            <div className="card">
              <h3>It plays fair</h3>
              <p>
                A fairness governor stops the drama from piling onto one team, and every roll comes
                from a seeded generator — so a race can be replayed exactly. Nothing is invented to
                punish you for leading.
              </p>
            </div>
            <div className="card">
              <h3>It never decides the result</h3>
              <p>
                The simulation produces the outcome; the director only chooses which pressures the
                race is under. Optional on-device narration writes about what happened — it is never
                allowed to change it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ----------------------------------------------------- Weather */}
      <section>
        <div className="wrap grid two" style={{ alignItems: "center", gap: 60 }}>
          <div>
            <p className="eyebrow">Legible, tense, survivable</p>
            <h2 className="masthead" style={{ fontSize: "clamp(1.9rem, 4.4vw, 2.7rem)", marginBottom: 18 }}>
              Rain you can see coming
            </h2>
            <p style={{ color: "var(--text-dim)" }}>
              Weather arrives on a radar that tells the truth in stages: a window band while the front
              is still a guess, the exact lap once it is telegraphed, live per-sector arcs only when the
              rain is genuinely on the road. A front three laps out is a decision. Rain with no warning
              is a dice roll, and dice rolls are how players quit.
            </p>
            <p style={{ color: "var(--text-dim)" }}>
              The same rule runs through everything: a wrong call should cost you positions, never the
              season.
            </p>
            <figure className="pull" style={{ marginTop: 30 }}>
              <p>Track&apos;s dry. Slicks for anyone still on wets.</p>
              <cite>Lap 39 · Circuito de Valmara · the race that produced these screenshots</cite>
            </figure>
          </div>
          <figure className="detail">
            <Image
              src="/screenshots/weather-radar-detail.webp"
              alt="The Met Radar sheet, headed “The sky” and marked settled. The circuit sits inside two dashed range rings with an arrow showing which way the wind is carrying the front, above a timeline running from lap 1 to lap 58. Underneath, two separately labelled lines: Now — “The whole lap is dry.” Next — “Nothing more on the radar.”"
              width={980}
              height={1120}
            />
            <figcaption>
              Two tenses, and neither is allowed to stand in for the other: <b>now</b> is what this lap
              is doing, <b>next</b> is what changes and roughly when.
            </figcaption>
          </figure>
        </div>
      </section>

      <hr className="rule" />

      {/* -------------------------------------------------- Screenshots */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">On the phone</p>
            <h2 className="masthead">A weekend, start to finish</h2>
            <p>
              Portrait, one-handed, and fully interruptible — a race survives a phone call without
              losing its place. These are real screenshots from a real season.
            </p>
          </div>

          <div className="shots">
            <figure className="shot">
              <Image
                src="/screenshots/setup-preRace.webp"
                alt="The pre-race screen for Circuito de Valmara, showing overtaking difficulty, downforce and tyre-wear ratings, the rain forecast, a starting-tyre choice and three setup sliders."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>Set up the car</b>
                Every property on this screen changes a decision. Wing, suspension and brake bias each
                curve, so the optimum sits inside the range — and the defaults are already what your own
                engineers would arrive at.
              </figcaption>
            </figure>

            <figure className="shot">
              <Image
                src="/screenshots/qualifying-plan.webp"
                alt="Knockout qualifying: two driver cards side by side choosing number of runs, tyre compound and when to go out, above the entry list."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>Qualify</b>
                Three knockout segments, three decisions each: how many runs, which compound, when to go
                out. The track rubbers in, so later is faster — until a red flag ends the segment where
                it stands.
              </figcaption>
            </figure>

            <figure className="shot">
              <Image
                src="/screenshots/race-director.webp"
                alt="Lap 28 of 58 at Arunta Flats. A yellow banner across the top of the race screen reads “A car is reporting a slow puncture — expected next lap.” Below it, the circuit map, the timing tower, and a car sitting in sixth place with nothing left on its tyres."
                width={804}
                height={1748}
              />
              <figcaption>
                <b>Race</b>
                The banner is the director giving you a lap&apos;s warning. Underneath it, a car in sixth
                with nothing left on its tyres — cars sit on the map at their real gap to the leader, so
                the map and the tower are two views of one truth.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* --------------------------------------------------- Principles */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">What it refuses to do</p>
            <h2 className="masthead">The promises</h2>
            <p>
              Some of these are engineering decisions and some are design ones. All of them are load-bearing,
              and none of them are going to quietly change.
            </p>
          </div>
          <div className="grid two">
            <div className="card">
              <h3>Nothing will ever sell you an advantage</h3>
              <p>
                Whatever Chicane eventually costs, no version of it will sell development points, driver
                upgrades, result re-rolls or penalty waivers. It is a settled decision, written down before
                the price was.
              </p>
            </div>
            <div className="card">
              <h3>It works with the aeroplane mode on</h3>
              <p>
                The entire game runs on your device. Narration — when your iPhone supports it — comes from
                Apple&apos;s on-device model, and the race never waits for it. No connection, no missing
                features.
              </p>
            </div>
            <div className="card">
              <h3>It doesn&apos;t watch you play</h3>
              <p>
                No analytics, no tracking, no advertising identifier, no third-party SDKs. There is nothing
                in the app that reports back, which is why the privacy policy is short.
              </p>
            </div>
            <div className="card">
              <h3>Every name in it is invented</h3>
              <p>
                Teams, drivers, circuits, sponsors — all fictional, deliberately, down to the circuit layouts,
                which are generated from each track&apos;s own simulation parameters rather than traced from
                anywhere real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA */}
      <section
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--bg-deep)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="halftone" aria-hidden style={{ ["--dot" as string]: "#ffffff0d" }} />
        <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
          <h2 className="masthead" style={{ fontSize: "clamp(2.1rem, 5.5vw, 3.4rem)", marginBottom: 18 }}>
            Not out yet
          </h2>
          <p style={{ color: "var(--text-dim)", maxWidth: "48ch", margin: "0 auto 30px" }}>
            Chicane is finished enough to play a full career and not yet finished enough to sell. When it
            reaches the App Store this page will say so — and if you want to be told, or want to ask
            something before then, write to me.
          </p>
          <a className="btn" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </div>
      </section>
    </>
  );
}
