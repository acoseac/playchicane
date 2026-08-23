import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Chicane collects no personal data, contains no analytics or tracking, and sends nothing anywhere. The full policy, in plain English.",
};

export default function Privacy() {
  return (
    <>
      <header className="page-head">
        <div className="halftone" aria-hidden />
        <div className="narrow" style={{ position: "relative" }}>
          <p className="eyebrow">Policy</p>
          <h1 className="masthead">Privacy</h1>
          <p>
            Chicane does not collect, store or transmit any personal data. There is no analytics, no
            tracking, no advertising identifier and no third-party code in the app. This page explains
            what that means precisely, because &ldquo;we care about your privacy&rdquo; is not a policy.
          </p>
          <p className="updated">Last updated {site.privacyUpdated}</p>
        </div>
      </header>

      <section className="narrow prose">
        <h2>The short version</h2>
        <p>
          Everything you do in Chicane happens on your device and stays there. The developer never
          receives your saves, your results, your device identifiers or any information about how you
          play. There is no account to create and nothing to opt out of.
        </p>

        <h2>What the app stores, and where</h2>
        <p>
          Chicane writes your career saves — teams, drivers, results, championship standings, settings —
          to your device&apos;s own storage, inside the app&apos;s private container. Deleting the app
          deletes them.
        </p>
        <h3>iCloud sync</h3>
        <p>
          Chicane can optionally sync your careers between your own devices using{" "}
          <strong>your personal iCloud account</strong>. This is <strong>off by default</strong> and only
          runs if you turn it on.
        </p>
        <ul>
          <li>
            Synced data goes to Apple&apos;s iCloud under your Apple Account, governed by{" "}
            <a href="https://www.apple.com/legal/privacy/" rel="noopener noreferrer">
              Apple&apos;s privacy policy
            </a>
            . The developer has no access to it and no way to read it.
          </li>
          <li>
            Sync is additive and never destructive: a genuine conflict between two devices keeps both
            copies rather than picking a winner, and nothing is deleted on your behalf.
          </li>
          <li>Turning sync off stops it. Your local saves are unaffected.</li>
        </ul>

        <h2>Race narration</h2>
        <p>
          On devices that support it, Chicane can narrate races using <strong>Apple&apos;s on-device
          language model</strong>. The text is generated on your iPhone. Nothing about your race is sent
          to the developer, to Apple, or to any other server, and no internet connection is involved.
          Narration is optional, and the game is complete without it.
        </p>

        <h2>What Chicane does not do</h2>
        <ul>
          <li>No analytics or telemetry of any kind — no crash reporting SDK, no usage statistics.</li>
          <li>No advertising, no ad identifier (IDFA), and no App Tracking Transparency prompt, because there is nothing to track.</li>
          <li>No third-party SDKs, no social logins, no embedded web trackers.</li>
          <li>No account, no email address, no name, no location.</li>
          <li>
            No data is <strong>sold</strong> or <strong>shared</strong> with anyone, because none is collected.
          </li>
        </ul>

        <h2>Children</h2>
        <p>
          Chicane is suitable for general audiences and collects no personal information from anyone,
          including children under 13. There is nothing in the app that could identify a player.
        </p>

        <h2>This website</h2>
        <p>
          playchicane.com is a static site. It sets no cookies, runs no analytics, embeds no third-party
          scripts, and has no forms. Fonts are served from the site&apos;s own domain rather than fetched
          from a font provider, so loading a page does not tell anyone else that you visited.
        </p>
        <p>
          The site is hosted by Vercel, which — like any web host — processes standard server request
          data such as IP addresses in order to serve the page and to protect against abuse. See{" "}
          <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer">
            Vercel&apos;s privacy policy
          </a>
          . The developer does not receive or review those logs for any analytics purpose.
        </p>

        <h2>App Store purchases</h2>
        <p>
          If Chicane is offered for sale, any transaction is handled entirely by Apple. Payment details
          never pass through the app or reach the developer. Apple may provide the developer with
          aggregate, anonymised sales figures, which contain no information about individual customers.
        </p>

        <h2>Your rights</h2>
        <p>
          Regulations such as the GDPR and the CCPA give you rights to access, correct, export and delete
          personal data a company holds about you. Chicane holds none: there is no database, no user
          record and no identifier tied to you, so there is nothing for the developer to retrieve or
          erase. Your own game data is under your control on your device and, if you enabled sync, in
          your own iCloud account.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If a future version of Chicane ever collects anything, this page will be updated before that
          version ships, and the change will be described here rather than buried. The date at the top of
          this page is the date of the last substantive change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy go to{" "}
          <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>. The data controller is{" "}
          {site.developer}, the independent developer of Chicane.
        </p>
      </section>
    </>
  );
}
