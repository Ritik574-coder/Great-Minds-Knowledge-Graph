import { Link } from "@tanstack/react-router";
import { searchHitHref, searchHitLabel } from "@/lib/data/search";
import type { SearchHit } from "@/lib/data/types";

export function SearchResults({
  results,
  onSelectPerson,
}: {
  results: SearchHit[];
  onSelectPerson?: (personId: string) => void;
}) {
  if (!results.length) {
    return <p className="border border-border bg-paper p-4 text-sm text-muted">No results found.</p>;
  }

  return (
    <ul className="grid gap-2">
      {results.map((item) => {
        const href = searchHitHref(item);
        const label = searchHitLabel(item.kind);

        if (item.kind === "person" && onSelectPerson) {
          return (
            <li key={`${item.kind}-${item.id}`}>
              <button
                type="button"
                onClick={() => onSelectPerson(item.id)}
                className="w-full border border-border bg-surface p-4 text-left transition hover:border-rule"
              >
                <SearchResultBody item={item} label={label} />
              </button>
            </li>
          );
        }

        if (href.params) {
          return (
            <li key={`${item.kind}-${item.id}`}>
              <Link
                to={href.to}
                params={href.params}
                className="block border border-border bg-surface p-4 transition hover:border-rule"
              >
                <SearchResultBody item={item} label={label} />
              </Link>
            </li>
          );
        }

        return (
          <li key={`${item.kind}-${item.id}`}>
            <Link to={href.to} hash={item.kind === "source" ? "sources" : item.kind === "lesson" ? "learning" : undefined} className="block border border-border bg-surface p-4 transition hover:border-rule">
              <SearchResultBody item={item} label={label} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SearchResultBody({ item, label }: { item: SearchHit; label: string }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm border border-border bg-paper px-2 py-0.5 text-xs font-medium text-muted">{label}</span>
        <span className="font-medium">{item.title}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{item.snippet}</p>
    </>
  );
}
