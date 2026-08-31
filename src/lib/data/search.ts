import {
  allDecisions,
  allPeople,
  personById,
} from "./catalog.ts";
import { failures } from "./failures.ts";
import { breakthroughs, discoveries, experiments, technologies } from "./knowledge.ts";
import { lessons, quotes } from "./quotes-lessons.ts";
import { sources } from "./sources.ts";
import type { SearchHit } from "./types.ts";

function hit(
  kind: SearchHit["kind"],
  id: string,
  slug: string,
  title: string,
  snippet: string,
  personId?: string,
): SearchHit {
  return { kind, id, slug, title, snippet, personId };
}

export const searchIndex: SearchHit[] = [
  ...allPeople.map((person) =>
    hit(
      "person",
      person.id,
      person.slug,
      person.name,
      [person.knownFor, person.summary, person.thinking, person.fields.join(", ")].join(" · "),
      person.id,
    ),
  ),
  ...allDecisions.map((decision) =>
    hit(
      "decision",
      decision.id,
      decision.slug,
      decision.title,
      [decision.problem, decision.context, decision.reasoning].join(" · "),
      decision.personId,
    ),
  ),
  ...failures.map((failure) =>
    hit(
      "failure",
      failure.id,
      failure.slug,
      failure.title,
      [failure.whatHappened, failure.why, failure.learned].join(" · "),
      failure.personId,
    ),
  ),
  ...experiments.map((experiment) =>
    hit(
      "experiment",
      experiment.id,
      experiment.id,
      experiment.title,
      [experiment.question, experiment.method, experiment.result].join(" · "),
      experiment.personId,
    ),
  ),
  ...breakthroughs.map((item) =>
    hit("breakthrough", item.id, item.slug, item.title, [item.summary, item.impact].join(" · "), item.personId),
  ),
  ...technologies.map((item) =>
    hit("technology", item.id, item.slug, item.name, [item.problem, item.novelIdea, item.impact].join(" · ")),
  ),
  ...discoveries.map((item) =>
    hit("discovery", item.id, item.slug, item.title, [item.question, item.result, item.impact].join(" · "), item.personId),
  ),
  ...quotes.map((quote) =>
    hit("quote", quote.id, quote.id, quote.text.slice(0, 80), quote.context, quote.personId),
  ),
  ...lessons.map((lesson) =>
    hit("lesson", lesson.id, lesson.id, lesson.title, [lesson.whatToLearn, lesson.whyItMatters].join(" · ")),
  ),
  ...sources.map((source) =>
    hit("source", source.id, source.id, source.title, [source.author, String(source.year), source.excerpt ?? ""].join(" · ")),
  ),
];

export type SearchFilters = {
  query: string;
  mode: "all" | "scientist" | "entrepreneur" | "inventor" | "social";
  kinds?: SearchHit["kind"][];
  personId?: string;
  limit?: number;
};

export function searchArchive(filters: SearchFilters): SearchHit[] {
  const normalized = filters.query.trim().toLowerCase();
  const limit = filters.limit ?? 20;

  let results = searchIndex;

  if (filters.mode !== "all") {
    results = results.filter((item) => {
      if (!item.personId) return item.kind === "source" || item.kind === "lesson" || item.kind === "technology";
      const person = personById[item.personId];
      return person?.mode.includes(filters.mode as (typeof person.mode)[number]);
    });
  }

  if (filters.personId) {
    results = results.filter(
      (item) => item.personId === filters.personId || (item.kind === "person" && item.id === filters.personId),
    );
  }

  if (filters.kinds?.length) {
    results = results.filter((item) => filters.kinds!.includes(item.kind));
  }

  if (normalized) {
    results = results.filter((item) => [item.title, item.snippet, item.kind].join(" ").toLowerCase().includes(normalized));
  }

  return results.slice(0, limit);
}

export function searchHitHref(item: SearchHit): { to: "/" | "/people/$slug" | "/decisions/$slug" | "/failures/$slug"; params?: { slug: string } } {
  switch (item.kind) {
    case "person":
      return { to: "/people/$slug", params: { slug: item.slug } };
    case "decision":
      return { to: "/decisions/$slug", params: { slug: item.slug } };
    case "failure":
      return { to: "/failures/$slug", params: { slug: item.slug } };
    default:
      if (item.personId) {
        const person = personById[item.personId];
        if (person) return { to: "/people/$slug", params: { slug: person.slug } };
      }
      return { to: "/" };
  }
}

export function searchHitLabel(kind: SearchHit["kind"]): string {
  const labels: Record<SearchHit["kind"], string> = {
    person: "Person",
    decision: "Decision",
    failure: "Failure",
    technology: "Technology",
    discovery: "Discovery",
    quote: "Quote",
    lesson: "Lesson",
    source: "Source",
    topic: "Topic",
    breakthrough: "Breakthrough",
    experiment: "Experiment",
  };
  return labels[kind];
}
