import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="masthead footer-word">Chicane</p>
          <p className="footer-note">
            An eighteen-race season that refuses to go to plan.
            <br />
            Coming to iPhone.
          </p>
        </div>
        <nav aria-label="Footer">
          <Link href="/how-it-plays/">How it plays</Link>
          <Link href="/press/">Press kit</Link>
          <Link href="/support/">Support</Link>
          <Link href="/privacy/">Privacy</Link>
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </nav>
      </div>
      <div className="wrap footer-fine">
        <p>
          © {new Date().getFullYear()} {site.developer}. Chicane is a work of fiction: every team,
          driver, circuit and sponsor in it is invented. It is not affiliated with, endorsed by or
          connected to any real motorsport series, team or organisation.
        </p>
      </div>
    </footer>
  );
}
