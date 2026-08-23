import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Fact sheet, descriptions, screenshots and artwork for Chicane: Racing Manager — free to use in coverage of the game.",
};

const shots = [
  { file: "race-radio-decision", label: "Race — the engineer offers a timed trade" },
  { file: "race-director", label: "Race — an incident telegraphed a lap out" },
  { file: "race-pitwindow", label: "Race — an engine window offered on lap 46" },
  { file: "race-lap1", label: "Race — the opening laps, field still packed" },
  { file: "weather-radar", label: "Race — the Met Radar" },
  { file: "setup-preRace", label: "Pre-race — circuit and setup" },
  { file: "qualifying-plan", label: "Qualifying — planning a segment" },
  { file: "qualifying-gridset", label: "Qualifying — the grid, explained" },
  { file: "development", label: "Factory — commissioning a programme" },
  { file: "standings", label: "Championship — drivers' table" },
  { file: "classification", label: "Race — full classification" },
  { file: "race-moment", label: "Race — an honest bad day" },
  { file: "paddock-feed", label: "Between races — the paddock feed" },
  { file: "hub-season2", label: "Season hub — the calendar" },
];

const facts: [string, string][] = [
  ["Title", site.name],
  ["Developer", `${site.developer} — independent, one person`],
  ["Platform", `iPhone, ${site.platform}`],
  ["Genre", "Racing team management / simulation"],
  ["Release", "Unannounced — in development"],
  ["Price", "Not yet decided"],
  ["Languages", "English"],
  ["Press contact", site.supportEmail],
];

export default function Press() {
  return (
    <>
      <header className="page-head">
        <div className="halftone" aria-hidden />
        <div className="narrow" style={{ position: "relative" }}>
          <p className="eyebrow">For writers</p>
          <h1 className="masthead">Press kit</h1>
          <p>
            Everything here is free to use in coverage of Chicane, without asking. If you need something
            that isn&apos;t on this page — a specific screenshot, a build, an answer — just email.
          </p>
        </div>
      </header>

      {/* ---------------------------------------------------- Fact sheet */}
      <section>
        <div className="wrap">
          <div className="grid two" style={{ gap: 44, alignItems: "start" }}>
            <div>
              <h2 className="masthead" style={{ fontSize: "1.7rem", marginBottom: 22 }}>
                Fact sheet
              </h2>
              <dl className="factsheet">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>
                      {k === "Press contact" ? <a href={`mailto:${v}`}>{v}</a> : v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div style={{ textAlign: "center" }}>
              <Image
                src="/art/chicane-app-icon.webp"
                alt="The Chicane app icon: a comic-style racing line arcing past a red and white kerb."
                width={560}
                height={560}
                style={{ borderRadius: 56, margin: "0 auto 18px", maxWidth: 280 }}
              />
              <a className="btn ghost" href="/art/chicane-app-icon-1024.png" download>
                App icon · 1024px PNG
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* -------------------------------------------------- Descriptions */}
      <section>
        <div className="narrow prose" style={{ padding: 0 }}>
          <h2 style={{ marginTop: 0 }}>Descriptions</h2>

          <h3>One line</h3>
          <p style={{ fontSize: "1.05rem" }}>
            You run a racing team. The rules are fair, the weather isn&apos;t, and the commentator
            remembers what happened last time.
          </p>

          <h3>Short — about 50 words</h3>
          <p>
            Chicane is a racing team management game for iPhone. You own one of twelve fictional teams,
            field two drivers across an eighteen-race season, develop the car between rounds and call the
            strategy live. An AI Race Director spends a drama budget on weather, failures and safety cars
            so that no two seasons tell the same story.
          </p>

          <h3>Long — about 150 words</h3>
          <p>
            Chicane is a racing team management game built for a phone rather than a desk: a full race
            weekend — knockout qualifying, setup, the race, the debrief — takes ten to fifteen minutes,
            in portrait, one-handed, and survives being interrupted.
          </p>
          <p>
            The problem it sets out to solve is that management sims become spreadsheets. Once you
            understand the model, the season resolves itself. Chicane&apos;s answer is a race director
            sitting above the simulation, spending a drama budget on weather fronts, mechanical failures,
            safety cars, stewards&apos; decisions and the occasional genuine freak incident — always
            telegraphed one to three laps out, so that what arrives is a decision rather than a
            punishment.
          </p>
          <p>
            Underneath it is a fully deterministic simulation: every race runs from a seed, so the same
            inputs reproduce the same race exactly. Optional narration comes from Apple&apos;s on-device
            model and is never permitted to change an outcome — it only describes one.
          </p>

          <h3>Key points</h3>
          <ul>
            <li>
              <strong>Two championships, both live</strong> — points to each driver and to the team
              combined, which is what makes a team order a dilemma.
            </li>
            <li>
              <strong>Five live decisions and no more</strong> — pit, pace, orders, answering an incoming
              event, and the radio.
            </li>
            <li>
              <strong>An engineer who quotes real numbers</strong> — every projection offered on the
              radio is computed from live race state, so the simulation delivers exactly what was quoted.
            </li>
            <li>
              <strong>Deterministic and replayable</strong> — one seeded generator drives every race, and
              a source-level test enforces it.
            </li>
            <li>
              <strong>Entirely on-device</strong> — including narration. No connection needed, no
              analytics, no tracking of any kind.
            </li>
            <li>
              <strong>Entirely fictional</strong> — every team, driver, circuit and sponsor is invented,
              and circuit layouts are generated from each track&apos;s simulation parameters rather than
              traced.
            </li>
          </ul>
        </div>
      </section>

      <hr className="rule" />

      {/* -------------------------------------------------- Screenshots */}
      <section>
        <div className="wrap">
          <div className="head">
            <p className="eyebrow">Assets</p>
            <h2 className="masthead">Screenshots</h2>
            <p>
              Captured from a real career on an iPhone 17 Pro, unretouched. Click any image for the file.
            </p>
          </div>

          <div className="presskit-grid">
            {shots.map((s) => (
              <figure key={s.file} className="shot">
                <a href={`/screenshots/${s.file}.webp`} download>
                  <Image
                    src={`/screenshots/${s.file}.webp`}
                    alt={s.label}
                    width={804}
                    height={1748}
                  />
                </a>
                <figcaption>{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* -------------------------------------------------------- Legal */}
      <section>
        <div className="narrow prose" style={{ padding: 0 }}>
          <h2 style={{ marginTop: 0 }}>A note on names</h2>
          <p>
            Chicane contains no real-world motorsport intellectual property, by design and as an enforced
            rule of the codebase. The series, the twelve teams, the twenty-four drivers, the engineers,
            the eighteen circuits and every sponsor are invented. Circuit layouts are synthesised from
            each track&apos;s own simulation parameters, never traced from real venues.
          </p>
          <p>
            The game is not affiliated with, endorsed by or connected to any real motorsport series,
            team, driver or organisation. Please don&apos;t describe it as being one.
          </p>

          <h2>Contact</h2>
          <p>
            Review builds, interviews, questions and anything else:{" "}
            <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
