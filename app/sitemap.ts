import type { MetadataRoute } from "next";
import { getSchedule, seriesEnabled, seriesUnlisted } from "@/lib/series";
import { site } from "@/lib/site";

/** Every real page. The OG template is deliberately absent — it isn't content. */
const routes = ["/", "/how-it-plays/", "/press/", "/support/", "/privacy/"];

/**
 * Async now, because the series' round pages exist only when a season does.
 * An unlisted series contributes nothing: a page carrying `noindex` has no
 * business in a sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  if (!seriesEnabled || seriesUnlisted) return entries;

  entries.push(
    { url: `${site.url}/series/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/series/standings/`, changeFrequency: "daily", priority: 0.8 }
  );
  const schedule = await getSchedule();
  for (const round of schedule?.rounds ?? []) {
    if (round.status === "scheduled") continue;
    entries.push({
      url: `${site.url}/series/round/${round.round}/`,
      changeFrequency: round.status === "open" ? "hourly" : "monthly",
      priority: 0.6,
    });
  }
  return entries;
}
