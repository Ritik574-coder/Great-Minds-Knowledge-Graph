import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Database,
  Filter,
  GitBranch,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { DecisionCard } from "@/components/research/decision-card";
import { SearchResults } from "@/components/research/search-results";
import { SectionTitle } from "@/components/research/section-title";
import { TimelineRow } from "@/components/research/timeline-row";
import {
  allDecisions,
  allPeople,
  catalogStats,
  getAllTimelineEvents,
  getDecisionsForPerson,
  getFailuresForPerson,
  lessonById,
} from "@/lib/data/catalog";
import { searchArchive } from "@/lib/data/search";
import type { SearchHit } from "@/lib/data/types";
import { sources } from "@/lib/data/sources";
import { lessons } from "@/lib/data/quotes-lessons";
import type { Person } from "@/lib/data/types";

export const Route = createFileRoute("/")({
  component: Home,
});

// Derive available facet values from catalog — no hardcoding
const ALL_KINDS: SearchHit["kind"][] = [
  "person",
  "decision",
  "failure",
  "experiment",
  "breakthrough",
  "technology",
  "discovery",
  "quote",
  "lesson",
];
const ALL_FIELDS = [...new Set(allPeople.flatMap((p) => p.fields))].sort() as string[];
const ALL_ERAS = [...new Set(allPeople.map((p) => p.era))].sort();
const ALL_CONFIDENCE = ["high", "medium", "low", "disputed"] as const;

function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"all" | "scientist" | "entrepreneur" | "inventor" | "social">("all");
  const [selectedPersonId, setSelectedPersonId] = useState(allPeople[0]?.id ?? "");
  const [timelineScope, setTimelineScope] = useState<"all" | "selected">("all");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [facetsOpen, setFacetsOpen] = useState(false);
  const [activeKinds, setActiveKinds] = useState<SearchHit["kind"][]>([]);
  const [activeFields, setActiveFields] = useState<string[]>([]);
  const [activeConfidence, setActiveConfidence] = useState<string[]>([]);

  function toggleKind(kind: SearchHit["kind"]) {
    setActiveKinds((prev) => (prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind]));
  }
  function toggleField(field: string) {
    setActiveFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]));
  }
  function toggleConfidence(conf: string) {
    setActiveConfidence((prev) => (prev.includes(conf) ? prev.filter((c) => c !== conf) : [...prev, conf]));
  }
  function clearFacets() {
    setActiveKinds([]);
    setActiveFields([]);
    setActiveConfidence([]);
  }

  const hasFacets = activeKinds.length > 0 || activeFields.length > 0 || activeConfidence.length > 0;

  const selectedPerson = allPeople.find((person) => person.id === selectedPersonId) ?? allPeople[0];
  const selectedPersonDecisions = selectedPerson ? getDecisionsForPerson(selectedPerson.id) : [];
  const selectedPersonFailures = selectedPerson ? getFailuresForPerson(selectedPerson.id) : [];

  const searchResults = useMemo(() => {
    const normalized = query.trim();
    let results = searchArchive({
      query: normalized || " ",
      mode,
      kinds: activeKinds.length > 0 ? activeKinds : undefined,
      limit: 40,
    });

    // Field filter — only applies to results with a personId
    if (activeFields.length > 0) {
      results = results.filter((item) => {
        if (!item.personId) return true;
        const person = allPeople.find((p) => p.id === item.personId);
        return person?.fields.some((f) => activeFields.includes(f));
      });
    }

    // Confidence filter — only applies to person items for now
    if (activeConfidence.length > 0) {
      results = results.filter((item) => {
        if (item.kind !== "person") return true;
        const person = allPeople.find((p) => p.id === item.id);
        return person && activeConfidence.includes(person.research.confidence);
      });
    }

    if (!normalized && activeKinds.length === 0 && activeFields.length === 0 && activeConfidence.length === 0) {
      const matchesMode = (person: Person) => mode === "all" || person.mode.includes(mode);
      return allPeople.filter(matchesMode).slice(0, 8).map((person) => ({
        kind: "person" as const,
        id: person.id,
        slug: person.slug,
        title: person.name,
        snippet: person.knownFor,
        personId: person.id,
      }));
    }

    return results.slice(0, 20);
  }, [mode, query, activeKinds, activeFields, activeConfidence]);



  const peopleResults = useMemo(() => {
    const matchesMode = (person: Person) => mode === "all" || person.mode.includes(mode);
    const normalized = query.trim().toLowerCase();
    const pool = allPeople.filter(matchesMode);
    if (!normalized) return pool.slice(0, 8);
    return pool
      .filter((person) =>
        [person.name, person.knownFor, person.summary, person.thinking, person.fields.join(" "), person.countries.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 8);
  }, [mode, query]);

  const timelineEvents = useMemo(() => {
    const events = getAllTimelineEvents();
    const scoped =
      timelineScope === "selected" && selectedPerson
        ? events.filter((event) => event.personId === selectedPerson.id)
        : events;
    return scoped.slice(0, timelineScope === "selected" ? 24 : 12);
  }, [selectedPerson, timelineScope]);

  const qualityStats = [
    { label: "People", value: catalogStats.people },
    { label: "Decisions", value: catalogStats.decisions },
    { label: "Sources", value: catalogStats.sources },
    { label: "Failures", value: catalogStats.failures },
    { label: "Quotes", value: catalogStats.quotes },
  ];

  const graphNodes = [
    ...(selectedPerson ? [{ id: selectedPerson.id, label: selectedPerson.name, x: 48, y: 50, kind: "person" }] : []),
    ...selectedPersonDecisions.slice(0, 3).map((decision, index) => ({
      id: decision.id,
      label: decision.title,
      x: 210,
      y: 30 + index * 52,
      kind: "decision",
    })),
    ...selectedPersonFailures.slice(0, 2).map((failure, index) => ({
      id: failure.id,
      label: failure.title,
      x: 405,
      y: 58 + index * 68,
      kind: "failure",
    })),
  ];

  return (
    <main id="top">
      <section className="archive-grid border-b border-border bg-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-muted">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Evidence-backed research knowledge graph
            </p>
            <h1 className="font-display text-5xl leading-none tracking-normal text-ink sm:text-6xl lg:text-7xl">
              Study how exceptional minds decide, fail, revise, and build.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Lattice turns biographies into inspectable research objects: decisions, assumptions, risks, experiments,
              failures, sources, confidence, and lessons are separated so success never gets mistaken for proof.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-5 lg:grid-cols-2">
            {qualityStats.map((stat) => (
              <div key={stat.label} className="border border-border bg-surface p-4 shadow-[var(--shadow-border)]">
                <div className="font-display text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="flex min-h-12 items-center gap-3 border border-border bg-paper px-4">
            <Search className="size-5 text-muted" aria-hidden="true" />
            <span className="sr-only">Search the archive</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSearchResults(Boolean(event.target.value.trim()));
              }}
              onFocus={() => setShowSearchResults(Boolean(query.trim()))}
              placeholder="Search people, decisions, failures, technologies, lessons, and sources"
              className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-subtle"
            />
          </label>
          <div className="flex min-h-12 flex-wrap items-center gap-2">
            {(["all", "scientist", "entrepreneur", "inventor", "social"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`min-h-11 border px-3 text-sm font-medium capitalize transition ${
                  mode === item ? "border-accent bg-accent text-accent-fg" : "border-border bg-paper text-muted hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {showSearchResults && query.trim() ? (
          <div className="mx-auto mt-4 max-w-7xl">
            <SearchResults
              results={searchResults}
              onSelectPerson={(personId) => {
                setSelectedPersonId(personId);
                setShowSearchResults(false);
                document.getElementById("people")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        ) : null}
      </section>

      <section id="people" className="bg-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionTitle icon={Filter} kicker="People" title="Browse by evidence, not mythology" />
            <div className="mt-5 grid gap-3">
              {peopleResults.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelectedPersonId(person.id)}
                  className={`border p-4 text-left transition ${
                    selectedPerson?.id === person.id
                      ? "border-accent bg-surface shadow-[var(--shadow-border-hover)]"
                      : "border-border bg-surface hover:border-rule"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl leading-tight">{person.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{person.knownFor}</p>
                    </div>
                    <span className="shrink-0 rounded-sm border border-border bg-paper px-2 py-1 text-xs text-muted">
                      {person.research.confidence}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedPerson ? (
            <article className="border border-border bg-surface shadow-[var(--shadow-border)]">
              <div className="border-b border-border p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted">{selectedPerson.era}</p>
                    <h2 className="mt-2 font-display text-4xl leading-tight">{selectedPerson.name}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{selectedPerson.summary}</p>
                  </div>
                  <div className="grid size-16 place-items-center border border-border bg-paper font-display text-2xl">
                    {selectedPerson.initials}
                  </div>
                </div>
              </div>
              <div className="grid gap-px bg-border md:grid-cols-3">
                <ResearchMetric label="Primary sources" value={selectedPerson.research.primarySourceCount} />
                <ResearchMetric label="Completeness" value={`${selectedPerson.research.completeness}%`} />
                <ResearchMetric label="Known gaps" value={selectedPerson.research.gaps.length} />
              </div>
              <div className="grid gap-px bg-border md:grid-cols-2">
                <AnalysisPanel title="Thinking pattern" body={selectedPerson.thinking} />
                <AnalysisPanel title="Anti-survivorship note" body={selectedPerson.antiSurvivorship} />
              </div>
              <div className="border-t border-border p-6">
                <Link
                  to="/people/$slug"
                  params={{ slug: selectedPerson.slug }}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent"
                >
                  Open full profile <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section id="timeline" className="border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle icon={Database} kicker="Timeline" title="Chronology with evidence labels" />
            <div className="flex flex-wrap gap-2">
              {(["all", "selected"] as const).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setTimelineScope(scope)}
                  disabled={scope === "selected" && !selectedPerson}
                  className={`min-h-11 border px-3 text-sm font-medium capitalize transition disabled:opacity-50 ${
                    timelineScope === scope
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border bg-paper text-muted hover:text-ink"
                  }`}
                >
                  {scope === "all" ? "All people" : selectedPerson ? selectedPerson.name.split(" ").slice(-1)[0] : "Selected"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {timelineEvents.map((event) => (
              <TimelineRow
                key={event.id}
                event={event}
                personName={event.personName}
                personSlug={allPeople.find((person) => person.id === event.personId)?.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="decisions" className="bg-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle icon={Scale} kicker="Decision analysis" title="Separate decision quality from outcome" />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {allDecisions.slice(0, 9).map((decision) => (
              <DecisionCard key={decision.id} decision={decision} />
            ))}
          </div>
        </div>
      </section>

      <section id="graph" className="border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle icon={GitBranch} kicker="Knowledge graph" title="Relationships are first-class objects" />
            <p className="mt-4 text-base leading-7 text-muted">
              This prototype renders a local subgraph for the selected person: decisions connect to failures and lessons
              instead of being flattened into a single story.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                catalogStats.experiments,
                catalogStats.technologies,
                catalogStats.discoveries,
                catalogStats.breakthroughs,
              ].map((count, index) => (
                <div key={index} className="border border-border bg-paper p-4">
                  <div className="font-display text-3xl">{count}</div>
                  <div className="mt-1 text-sm text-muted">
                    {["Experiments", "Technologies", "Discoveries", "Breakthroughs"][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <GraphPreview nodes={graphNodes} selectedPersonSlug={selectedPerson?.slug} />
        </div>
      </section>

      <section id="sources" className="bg-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle icon={BookOpenCheck} kicker="Source explorer" title="Every claim keeps provenance attached" />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {sources.slice(0, 9).map((source) => (
              <a
                key={source.id}
                href={source.url ?? "#sources"}
                target={source.url ? "_blank" : undefined}
                rel={source.url ? "noreferrer" : undefined}
                className="group border border-border bg-surface p-5 shadow-[var(--shadow-border)] transition hover:border-rule"
              >
                <p className="text-xs font-medium uppercase tracking-normal text-muted">{source.type}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight group-hover:text-accent">{source.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {source.author}, {source.year}
                </p>
                {source.excerpt ? <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{source.excerpt}</p> : null}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="learning" className="border-t border-border bg-ink px-4 py-12 text-surface sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionTitle icon={CircleHelp} kicker="Learning mode" title="Questions that resist hero worship" inverted />
          <div className="grid gap-4 md:grid-cols-2">
            {lessons.slice(0, 6).map((lesson) => (
              <div key={lesson.id} className="border border-surface/15 bg-surface/5 p-5">
                <h3 className="font-display text-2xl leading-tight">{lesson.title}</h3>
                <p className="mt-3 text-sm leading-6 text-surface/70">{lesson.whatToLearn}</p>
                <p className="mt-4 text-sm font-medium text-surface">{lesson.reflection[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ResearchMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-paper p-5">
      <div className="font-display text-3xl">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

function AnalysisPanel({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-surface p-6">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
    </section>
  );
}

function GraphPreview({
  nodes,
  selectedPersonSlug,
}: {
  nodes: { id: string; label: string; x: number; y: number; kind: string }[];
  selectedPersonSlug?: string;
}) {
  const root = nodes[0];
  const visibleNodes = nodes.slice(0, 6);
  return (
    <div className="overflow-hidden border border-border bg-paper p-4 shadow-[var(--shadow-border)]">
      {selectedPersonSlug ? (
        <Link
          to="/people/$slug"
          params={{ slug: selectedPersonSlug }}
          className="mb-3 inline-flex text-sm font-medium text-accent"
        >
          Explore {root?.label ?? "person"} in full profile
        </Link>
      ) : null}
      <svg viewBox="0 0 560 220" role="img" aria-label="Knowledge graph preview" className="h-auto w-full">
        {root
          ? visibleNodes.slice(1).map((node) => (
              <line
                key={`${root.id}-${node.id}`}
                x1={root.x + 45}
                y1={root.y + 15}
                x2={node.x}
                y2={node.y + 15}
                className="stroke-rule"
                strokeWidth="1.5"
              />
            ))
          : null}
        {visibleNodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.kind === "person" ? 126 : 134}
              height="32"
              rx="4"
              className={node.kind === "person" ? "fill-accent" : "fill-surface stroke-border"}
            />
            <text
              x={node.x + 10}
              y={node.y + 21}
              className={node.kind === "person" ? "fill-accent-fg" : "fill-ink"}
              fontSize="10"
              fontWeight="600"
            >
              {node.label.length > 20 ? `${node.label.slice(0, 20)}...` : node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
