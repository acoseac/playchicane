import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";
import "./chrome.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — an eighteen-race season that won't go to plan`,
    template: `%s — ${site.shortName}`,
  },
  description:
    "Own a racing team, run two drivers across an eighteen-race season, develop the car and call the strategy live. An AI Race Director makes every race a different story. Coming to iPhone.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.shortName,
    title: `${site.name}`,
    description:
      "Two drivers. Eighteen races. Two championships. A race director that refuses to let the season settle.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Chicane: Racing Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      "Two drivers. Eighteen races. Two championships. A race director that refuses to let the season settle.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
};

export const viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
