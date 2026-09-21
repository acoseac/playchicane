import type { PaperStory } from "@/lib/series";

/**
 * A round's paper.
 *
 * Deliberately printed rather than carded: this is the one part of a series
 * page meant to be *read*, and a grid of tiles is how you get something
 * skimmed. Column rules and a heavier lead, like the front of a section.
 */
export default function Paper({ stories }: { stories: PaperStory[] }) {
  if (stories.length === 0) return null;
  return (
    <div className="paper">
      {stories.map((story, index) => (
        <article key={story.id} className={index === 0 ? "lead" : undefined}>
          <h3>{story.headline}</h3>
          <p>{story.body}</p>
        </article>
      ))}
    </div>
  );
}
