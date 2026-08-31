import { allDecisions, allPeople } from "./catalog.ts";
import { failures } from "./failures.ts";
import { breakthroughs, discoveries, experiments, technologies } from "./knowledge.ts";
import { lessons, quotes } from "./quotes-lessons.ts";
import { sourceById, sources } from "./sources.ts";

export type ValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export function validateData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const personIds = new Set(allPeople.map((person) => person.id));
  const decisionIds = new Set(allDecisions.map((decision) => decision.id));
  const failureIds = new Set(failures.map((failure) => failure.id));
  const decisionSlugCounts = new Map<string, number>();
  for (const decision of allDecisions) decisionSlugCounts.set(decision.slug, (decisionSlugCounts.get(decision.slug) ?? 0) + 1);
  const failureSlugCounts = new Map<string, number>();
  for (const failure of failures) failureSlugCounts.set(failure.slug, (failureSlugCounts.get(failure.slug) ?? 0) + 1);
  const sourceIds = new Set(sources.map((source) => source.id));

  const slugCounts = new Map<string, number>();
  for (const person of allPeople) slugCounts.set(person.slug, (slugCounts.get(person.slug) ?? 0) + 1);
  for (const [slug, count] of slugCounts) {
    if (count > 1) {
      issues.push({ severity: "error", code: "duplicate-person-slug", message: `Duplicate person slug: ${slug}` });
    }
  }

  for (const person of allPeople) {
    for (const id of person.decisionIds) {
      if (!decisionIds.has(id)) {
        issues.push({ severity: "error", code: "orphan-decision-ref", message: `Person ${person.id} references missing decision ${id}` });
      }
    }

    for (const id of person.failureIds) {
      if (!failureIds.has(id)) {
        issues.push({ severity: "error", code: "orphan-failure-ref", message: `Person ${person.id} references missing failure ${id}` });
      }
    }

    const years = person.timeline.map((event) => event.year);
    for (let index = 1; index < years.length; index++) {
      if (years[index]! < years[index - 1]!) {
        issues.push({
          severity: "warning",
          code: "timeline-order",
          message: `Person ${person.id} timeline may be out of order near year ${years[index]}`,
        });
        break;
      }
    }

    for (const event of person.timeline) {
      for (const sourceId of event.sourceIds) {
        if (!sourceIds.has(sourceId)) {
          issues.push({
            severity: "error",
            code: "missing-source",
            message: `Timeline event ${event.id} references missing source ${sourceId}`,
          });
        }
      }
      if (!event.sourceIds.length) {
        issues.push({
          severity: "warning",
          code: "missing-provenance",
          message: `Timeline event ${event.id} has no source IDs`,
        });
      }
    }
  }

  for (const [slug, count] of decisionSlugCounts) {
    if (count > 1) {
      issues.push({ severity: "error", code: "duplicate-decision-slug", message: `Duplicate decision slug: ${slug}` });
    }
  }
  for (const [slug, count] of failureSlugCounts) {
    if (count > 1) {
      issues.push({ severity: "error", code: "duplicate-failure-slug", message: `Duplicate failure slug: ${slug}` });
    }
  }

  for (const decision of allDecisions) {
    if (!personIds.has(decision.personId)) {
      issues.push({ severity: "error", code: "orphan-decision-person", message: `Decision ${decision.id} has unknown personId ${decision.personId}` });
    }
    for (const sourceId of decision.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        issues.push({ severity: "error", code: "missing-source", message: `Decision ${decision.id} references missing source ${sourceId}` });
      }
    }
    if (!decision.sourceIds.length) {
      issues.push({ severity: "warning", code: "missing-provenance", message: `Decision ${decision.id} has no source IDs` });
    }
    for (const failureId of decision.relatedFailureIds ?? []) {
      if (!failureIds.has(failureId)) {
        issues.push({ severity: "error", code: "orphan-failure-ref", message: `Decision ${decision.id} references missing failure ${failureId}` });
      }
    }
  }

  for (const failure of failures) {
    if (!personIds.has(failure.personId)) {
      issues.push({ severity: "error", code: "orphan-failure-person", message: `Failure ${failure.id} has unknown personId ${failure.personId}` });
    }
    if (failure.decisionId && !decisionIds.has(failure.decisionId)) {
      issues.push({ severity: "error", code: "orphan-decision-ref", message: `Failure ${failure.id} references missing decision ${failure.decisionId}` });
    }
    for (const sourceId of failure.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        issues.push({ severity: "error", code: "missing-source", message: `Failure ${failure.id} references missing source ${sourceId}` });
      }
    }
  }

  for (const source of sources) {
    if (!sourceById[source.id]) {
      issues.push({ severity: "error", code: "broken-source-index", message: `Source index missing ${source.id}` });
    }
    if (!source.url) {
      issues.push({ severity: "warning", code: "source-without-url", message: `Source ${source.id} has no URL` });
    }
  }

  for (const entity of [...experiments, ...breakthroughs, ...technologies, ...discoveries, ...quotes, ...lessons]) {
    const sourceIdsOnEntity = "sourceIds" in entity ? entity.sourceIds : [];
    for (const sourceId of sourceIdsOnEntity) {
      if (!sourceIds.has(sourceId)) {
        issues.push({
          severity: "error",
          code: "missing-source",
          message: `Entity ${"id" in entity ? entity.id : "unknown"} references missing source ${sourceId}`,
        });
      }
    }
  }

  return issues;
}

export function assertValidData(): void {
  const issues = validateData();
  const errors = issues.filter((issue) => issue.severity === "error");
  if (errors.length) {
    const summary = errors.map((issue) => `- ${issue.code}: ${issue.message}`).join("\n");
    throw new Error(`Data validation failed with ${errors.length} error(s):\n${summary}`);
  }
}
