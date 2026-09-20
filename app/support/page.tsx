import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Chicane: Racing Manager — how to report a bug, where saves live, how iCloud sync works, and what the game needs to run.",
};

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "What do I need to run it?",
    a: (
      <>
        An iPhone running {site.platform}. Chicane is built for portrait, one-handed play — a race
        weekend is designed to fit in a commute rather than a desk session.
      </>
    ),
  },
  {
    q: "Does it need an internet connection?",
    a: (
      <>
        Not for the career. The whole game runs on your device, including race narration, which uses
        Apple&apos;s on-device model where the hardware supports it. In aeroplane mode you get the
        complete game — that is a deliberate rule, not a happy accident. The online series needs a
        connection twice: once to enter, and once per round to take your ticket. Racing itself never
        does, and the result waits on your device until there is a signal.
      </>
    ),
  },
  {
    q: "How are the online series' results checked?",
    a: (
      <>
        Your phone sends the inputs of your weekend — the setup, the tyre choices and the timeline
        of your calls — not just the result. The server re-runs that weekend with the same
        simulation and compares what it gets. A result marked <em>verified</em> is one the server
        reproduced. It is also why cheating buys nothing: the record is the race the server can
        reproduce, and there are no prizes at any point.
      </>
    ),
  },
  {
    q: "Can I move my series entry to a new phone?",
    a: (
      <>
        Usually it moves by itself: your entry is held in your iCloud Keychain, so signing in to the
        same Apple Account brings it with you. If that is off, or you are moving to a device that
        does not share it, open <strong>Settings → Online series</strong> before you switch and copy
        the recovery key. That key is the entry — nobody can reissue it, so write it down somewhere
        that is not the phone it came from.
      </>
    ),
  },
  {
    q: "Where are my saves, and can I lose them?",
    a: (
      <>
        Saves live in the app&apos;s own storage on your iPhone and are included in your device backup.
        Deleting the app deletes them. If you turn on iCloud sync, a copy also lives in your personal
        iCloud account, and sync is never destructive — a genuine conflict between two devices keeps
        both careers rather than choosing one.
      </>
    ),
  },
  {
    q: "A race was interrupted. Did I lose it?",
    a: (
      <>
        No. Race state is stored as a lap and sector position rather than a wall clock, so a phone call,
        a lock screen or a day away all resume exactly where you stopped.
      </>
    ),
  },
  {
    q: "Is any of this based on a real series?",
    a: (
      <>
        None of it. Every team, driver, engineer, circuit and sponsor is invented, and the circuit
        layouts are generated from each track&apos;s own simulation parameters rather than traced from
        real venues — which is why a circuit that is hard to overtake at also <em>looks</em> hard to
        overtake at.
      </>
    ),
  },
  {
    q: "What accessibility support is there?",
    a: (
      <>
        Dynamic Type is honoured on every screen, up to the accessibility sizes — at the largest
        settings the race screen restacks so the timing tower keeps its space instead of squeezing the
        map into a letterbox. VoiceOver reads each timing-tower row as one element rather than four
        stray labels. Reduce Motion is respected wherever the map and the comic panels animate. Tyre
        compounds always carry their letter as well as their colour, so nothing depends on colour alone.
      </>
    ),
  },
  {
    q: "Will there be an iPad or Mac version?",
    a: <>Nothing to announce. The first release is an iPhone game, designed around that screen.</>,
  },
  {
    q: "How much will it cost?",
    a: (
      <>
        Not decided yet, and deliberately so — pricing a game before it is finished tends to distort the
        design toward the price. One thing is settled: no version of Chicane will ever sell competitive
        advantage. No bought upgrades, no result re-rolls, no paid penalty waivers.
      </>
    ),
  },
];

export default function Support() {
  return (
    <>
      <header className="page-head">
        <div className="halftone" aria-hidden />
        <div className="narrow" style={{ position: "relative" }}>
          <p className="eyebrow">Help</p>
          <h1 className="masthead">Support</h1>
          <p>
            Chicane is made by one person, and every message is read by that person. If something is
            broken, confusing or just annoying, write — bug reports and &ldquo;this bit doesn&apos;t
            feel right&rdquo; are equally welcome.
          </p>
        </div>
      </header>

      <section className="narrow prose">
        <div
          className="card"
          style={{ borderColor: "var(--accent)", background: "rgba(51,184,255,0.07)", marginBottom: 8 }}
        >
          <h3 style={{ marginBottom: 6 }}>Get in touch</h3>
          <p style={{ marginBottom: 18 }}>
            The fastest way to get help, and the only address you need.
          </p>
          <a className="btn" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </div>

        <h2>Reporting a bug</h2>
        <p>
          Chicane&apos;s simulation is fully deterministic: every race is driven by a seed, so the same
          seed and the same decisions reproduce the same race exactly, down to the lap. That makes bug
          reports unusually powerful — with enough detail, a problem can be replayed rather than guessed
          at.
        </p>
        <p>Useful things to include, in rough order of value:</p>
        <ul>
          <li>
            <strong>Where it happened</strong> — the season, round number and circuit, plus which lap if
            it was during a race.
          </li>
          <li>
            <strong>What you did just before</strong> — the pit call, the pace change, the radio answer.
          </li>
          <li>
            <strong>What you expected, and what happened instead.</strong> Both halves matter; a number
            that looks wrong is sometimes a number that is right and badly explained, and that is still
            a bug worth fixing.
          </li>
          <li>
            <strong>A screenshot.</strong> Side button and volume up.
          </li>
          <li>
            <strong>Your iOS version and iPhone model</strong>, and your text size if the problem is a
            layout one.
          </li>
        </ul>

        <h2>Frequently asked</h2>
        {faqs.map(({ q, a }) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}

        <h2>Privacy and data</h2>
        <p>
          Chicane collects nothing at all — no analytics, no tracking, no account. The full explanation
          is on the <Link href="/privacy/">privacy page</Link>. If you email support, that message sits
          in an ordinary mailbox and is used only to answer you.
        </p>
      </section>
    </>
  );
}
