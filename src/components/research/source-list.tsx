import { getSources } from "@/lib/data/catalog";
import type { Source } from "@/lib/data/types";

export function SourceList({ sourceIds, compact = false }: { sourceIds: string[]; compact?: boolean }) {
  const resolved = getSources(sourceIds);
  if (!resolved.length) {
    return <p className="text-sm text-muted">No sources linked.</p>;
  }

  return (
    <ul className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      {resolved.map((source) => (
        <SourceItem key={source.id} source={source} compact={compact} />
      ))}
    </ul>
  );
}

function SourceItem({ source, compact }: { source: Source; compact: boolean }) {
  const content = (
    <>
      <p className="text-xs font-medium uppercase tracking-normal text-muted">{source.type}</p>
      <p className={`mt-1 font-medium text-ink ${compact ? "text-sm" : "font-display text-lg leading-tight"}`}>
        {source.title}
      </p>
      <p className="mt-1 text-sm text-muted">
        {source.author}, {source.year}
      </p>
      {!compact && source.excerpt ? (
        <p className="mt-2 text-sm leading-6 text-muted">{source.excerpt}</p>
      ) : null}
    </>
  );

  if (source.url) {
    return (
      <li>
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="block border border-border bg-paper p-4 transition hover:border-rule"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="border border-border bg-paper p-4">{content}</li>;
}
