/**
 * One place for the facts the site repeats. Change them here, not in a page —
 * a support address that disagrees with itself across two pages is the bug
 * this file exists to prevent.
 */
export const site = {
  name: "Chicane: Racing Manager",
  shortName: "Chicane",
  tagline: "You run the team. The rules are fair, the weather isn't.",
  url: "https://playchicane.com",
  supportEmail: "support@playchicane.com",
  privacyEmail: "privacy@playchicane.com",
  platform: "iOS 26 or later",
  developer: "Arsenie Coseac",
  /** Last substantive edit to the privacy policy. Move it when the text moves. */
  privacyUpdated: "20 September 2026",
} as const;
