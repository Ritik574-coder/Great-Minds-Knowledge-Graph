import { builderDecisions } from "./decisions-builders.ts";
import { decisions } from "./decisions.ts";
import { failures } from "./failures.ts";
import { breakthroughs, discoveries, experiments, technologies } from "./knowledge.ts";
import { builderPeople } from "./people-builders.ts";
import { people } from "./people.ts";
import { scientistPeople } from "./people-scientists.ts";
import { lessons, quotes } from "./quotes-lessons.ts";
import { sourceById, sources } from "./sources.ts";
import type {
  Breakthrough,
  Decision,
  Discovery,
  Experiment,
  Failure,
  GraphEdge,
  Lesson,
  Person,
  Quote,
  Source,
  Technology,
} from "./types.ts";

export const allPeople: Person[] = [...people, ...scientistPeople, ...builderPeople];
export const allDecisions: Decision[] = [...decisions, ...builderDecisions];

export const personById = Object.fromEntries(allPeople.map((person) => [person.id, person])) as Record<string, Person>;
export const personBySlug = Object.fromEntries(allPeople.map((person) => [person.slug, person])) as Record<string, Person>;
export const decisionById = Object.fromEntries(allDecisions.map((decision) => [decision.id, decision])) as Record<
  string,
  Decision
>;
export const decisionBySlug = Object.fromEntries(allDecisions.map((decision) => [decision.slug, decision])) as Record<
  string,
  Decision
>;
export const failureById = Object.fromEntries(failures.map((failure) => [failure.id, failure])) as Record<string, Failure>;
export const failureBySlug = Object.fromEntries(failures.map((failure) => [failure.slug, failure])) as Record<
  string,
  Failure
>;
export const lessonById = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson])) as Record<string, Lesson>;
export const quoteById = Object.fromEntries(quotes.map((quote) => [quote.id, quote])) as Record<string, Quote>;
export const experimentById = Object.fromEntries(experiments.map((item) => [item.id, item])) as Record<string, Experiment>;
export const breakthroughById = Object.fromEntries(breakthroughs.map((item) => [item.id, item])) as Record<
  string,
  Breakthrough
>;
export const technologyById = Object.fromEntries(technologies.map((item) => [item.id, item])) as Record<string, Technology>;
export const discoveryById = Object.fromEntries(discoveries.map((item) => [item.id, item])) as Record<string, Discovery>;

export const catalogStats = {
  people: allPeople.length,
  decisions: allDecisions.length,
  failures: failures.length,
  sources: sources.length,
  quotes: quotes.length,
  lessons: lessons.length,
  experiments: experiments.length,
  breakthroughs: breakthroughs.length,
  technologies: technologies.length,
  discoveries: discoveries.length,
};

export function getPerson(idOrSlug: string): Person | undefined {
  return personById[idOrSlug] ?? personBySlug[idOrSlug];
}

export function getDecision(idOrSlug: string): Decision | undefined {
  return decisionById[idOrSlug] ?? decisionBySlug[idOrSlug];
}

export function getFailure(idOrSlug: string): Failure | undefined {
  return failureById[idOrSlug] ?? failureBySlug[idOrSlug];
}

export function getDecisionsForPerson(personId: string): Decision[] {
  return allDecisions.filter((decision) => decision.personId === personId);
}

export function getFailuresForPerson(personId: string): Failure[] {
  return failures.filter((failure) => failure.personId === personId);
}

export function getLessonsForPerson(personId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.personIds.includes(personId));
}

export function getQuotesForPerson(personId: string): Quote[] {
  return quotes.filter((quote) => quote.personId === personId);
}

export function getExperimentsForPerson(personId: string): Experiment[] {
  return experiments.filter((experiment) => experiment.personId === personId);
}

export function getBreakthroughsForPerson(personId: string): Breakthrough[] {
  return breakthroughs.filter((breakthrough) => breakthrough.personId === personId);
}

export function getTechnologiesForPerson(personId: string): Technology[] {
  return technologies.filter((technology) => technology.personIds.includes(personId));
}

export function getDiscoveriesForPerson(personId: string): Discovery[] {
  return discoveries.filter((discovery) => discovery.personId === personId);
}

export function getSources(sourceIds: string[]): Source[] {
  return sourceIds.map((id) => sourceById[id]).filter((source): source is Source => Boolean(source));
}

export function collectPersonSourceIds(person: Person): string[] {
  const ids = new Set<string>();

  for (const item of person.education) item.sourceIds.forEach((id) => ids.add(id));
  for (const event of person.timeline) event.sourceIds.forEach((id) => ids.add(id));
  for (const principle of person.principles) principle.sourceIds.forEach((id) => ids.add(id));
  for (const record of person.communications) record.sourceIds.forEach((id) => ids.add(id));
  for (const controversy of person.controversies) controversy.sourceIds.forEach((id) => ids.add(id));
  for (const factor of person.successFactors) factor.sourceIds.forEach((id) => ids.add(id));

  for (const decision of getDecisionsForPerson(person.id)) {
    decision.sourceIds.forEach((id) => ids.add(id));
  }
  for (const failure of getFailuresForPerson(person.id)) {
    failure.sourceIds.forEach((id) => ids.add(id));
  }
  for (const quote of getQuotesForPerson(person.id)) {
    quote.sourceIds.forEach((id) => ids.add(id));
  }
  for (const experiment of getExperimentsForPerson(person.id)) {
    experiment.sourceIds.forEach((id) => ids.add(id));
  }
  for (const breakthrough of getBreakthroughsForPerson(person.id)) {
    breakthrough.sourceIds.forEach((id) => ids.add(id));
  }
  for (const technology of getTechnologiesForPerson(person.id)) {
    technology.sourceIds.forEach((id) => ids.add(id));
  }
  for (const discovery of getDiscoveriesForPerson(person.id)) {
    discovery.sourceIds.forEach((id) => ids.add(id));
  }

  return [...ids];
}

export function buildPersonGraphEdges(personId: string): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const person = personById[personId];
  if (!person) return edges;

  for (const decision of getDecisionsForPerson(personId)) {
    edges.push({
      id: `${personId}-made-${decision.id}`,
      from: personId,
      to: decision.id,
      rel: "made",
      label: "made decision",
    });

    for (const failureId of decision.relatedFailureIds ?? []) {
      edges.push({
        id: `${decision.id}-resulted-in-${failureId}`,
        from: decision.id,
        to: failureId,
        rel: "resulted-in",
        label: "linked failure",
      });
    }

    for (const experimentId of decision.relatedExperimentIds ?? []) {
      edges.push({
        id: `${decision.id}-enabled-${experimentId}`,
        from: decision.id,
        to: experimentId,
        rel: "enabled",
        label: "enabled experiment",
      });
    }
  }

  for (const failure of getFailuresForPerson(personId)) {
    edges.push({
      id: `${personId}-experienced-${failure.id}`,
      from: personId,
      to: failure.id,
      rel: "experienced",
      label: "experienced failure",
    });

    if (failure.decisionId) {
      edges.push({
        id: `${failure.decisionId}-resulted-in-${failure.id}`,
        from: failure.decisionId,
        to: failure.id,
        rel: "resulted-in",
        label: "contributed to failure",
      });
    }
  }

  for (const breakthrough of getBreakthroughsForPerson(personId)) {
    edges.push({
      id: `${personId}-created-${breakthrough.id}`,
      from: personId,
      to: breakthrough.id,
      rel: "created",
      label: "breakthrough",
    });
  }

  for (const technology of getTechnologiesForPerson(personId)) {
    edges.push({
      id: `${personId}-created-${technology.id}`,
      from: personId,
      to: technology.id,
      rel: "created",
      label: "technology",
    });
  }

  for (const discovery of getDiscoveriesForPerson(personId)) {
    edges.push({
      id: `${personId}-created-${discovery.id}`,
      from: personId,
      to: discovery.id,
      rel: "created",
      label: "discovery",
    });
  }

  for (const collaborator of person.collaborators) {
    if (collaborator.personId) {
      edges.push({
        id: `${personId}-collaborated-${collaborator.personId}`,
        from: personId,
        to: collaborator.personId,
        rel: "collaborated-with",
        label: collaborator.relation,
      });
    }
  }

  return edges;
}

export type TimelineEventWithPerson = Person["timeline"][number] & { personName: string; personId: string };

export function getAllTimelineEvents(limit?: number): TimelineEventWithPerson[] {
  const events = allPeople
    .flatMap((person) =>
      person.timeline.map((event) => ({
        ...event,
        personName: person.name,
        personId: person.id,
      })),
    )
    .sort((a, b) => a.year - b.year);

  return limit ? events.slice(0, limit) : events;
}

export function getPersonTimelineEvents(personId: string): Person["timeline"] {
  return personById[personId]?.timeline ?? [];
}
