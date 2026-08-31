import { Link } from "@tanstack/react-router";
import type { TimelineEvent } from "@/lib/data/types";
import { EvidenceBadge } from "./evidence-badge";

export function TimelineRow({
  event,
  personName,
  personSlug,
}: {
  event: TimelineEvent;
  personName: string;
  personSlug?: string;
}) {
  return (
    <article className="grid grid-cols-[5rem_1fr] gap-4 border border-border bg-paper p-4">
      <div className="font-display text-2xl">{event.year}</div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{event.title}</h3>
          <EvidenceBadge evidence={event.evidence} confidence={event.confidence} />
        </div>
        {personSlug ? (
          <Link to="/people/$slug" params={{ slug: personSlug }} className="mt-1 inline-block text-sm text-accent">
            {personName}
          </Link>
        ) : (
          <p className="mt-1 text-sm text-muted">{personName}</p>
        )}
        <p className="mt-3 text-sm leading-6 text-muted">{event.summary}</p>
      </div>
    </article>
  );
}
