import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageChrome } from "@/components/research/page-chrome";
import { DecisionCard } from "@/components/research/decision-card";
import { EvidenceBadge } from "@/components/research/evidence-badge";
import { PersonGraph } from "@/components/research/person-graph";
import { SourceList } from "@/components/research/source-list";
import { TimelineRow } from "@/components/research/timeline-row";
import {
  collectPersonSourceIds,
  getDecisionsForPerson,
  getFailuresForPerson,
  getPerson,
  getQuotesForPerson,
} from "@/lib/data/catalog";

const tabs = [
  { id: "trajectory", label: "Trajectory" },
  { id: "decisions", label: "Decisions" },
  { id: "failures", label: "Failures" },
  { id: "principles", label: "Principles" },
  { id: "graph", label: "Graph" },
  { id: "sources", label: "Sources" },
  { id: "controversies", label: "Controversies" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export const Route = createFileRoute("/people/$slug")({
  loader: ({ params }) => {
    const person = getPerson(params.slug);
    if (!person) throw notFound();
    return { person };
  },
  component: PersonPage,
});

function PersonPage() {
  const { person } = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<TabId>("trajectory");
  const decisions = getDecisionsForPerson(person.id);
  const personFailures = getFailuresForPerson(person.id);
  const quotes = getQuotesForPerson(person.id);
  const sourceIds = collectPersonSourceIds(person);

  return (
    <PageChrome back={{ to: "/", label: "Back to archive" }} kicker={person.era} title={person.name}>
      <header className="border border-border bg-surface p-6 shadow-[var(--shadow-border)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm text-muted">{person.knownFor}</p>
            <p className="mt-4 text-base leading-7 text-muted">{person.summary}</p>
          </div>
          <div className="grid size-16 place-items-center border border-border bg-paper font-display text-2xl">
            {person.initials}
          </div>
        </div>
        <div className="mt-6 grid gap-px bg-border sm:grid-cols-3">
          <Metric label="Primary sources" value={person.research.primarySourceCount} />
          <Metric label="Completeness" value={`${person.research.completeness}%`} />
          <Metric label="Known gaps" value={person.research.gaps.length} />
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Person sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`min-h-11 border px-4 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-paper text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {activeTab === "trajectory" ? (
          <div className="grid gap-6">
            <Panel title="Thinking pattern" body={person.thinking} />
            <Panel title="Anti-survivorship note" body={person.antiSurvivorship} />
            {person.education.length ? (
              <section className="border border-border bg-surface p-6">
                <h2 className="font-display text-2xl">Education</h2>
                <ul className="mt-4 grid gap-4">
                  {person.education.map((item) => (
                    <li key={`${item.institution}-${item.years}`} className="border border-border bg-paper p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-medium">{item.institution}</h3>
                        <EvidenceBadge evidence={item.evidence} />
                      </div>
                      <p className="mt-1 text-sm text-muted">{item.years}</p>
                      {item.focus ? <p className="mt-2 text-sm leading-6 text-muted">{item.focus}</p> : null}
                      {item.notes ? <p className="mt-2 text-sm leading-6 text-muted">{item.notes}</p> : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {person.career.length ? (
              <section className="border border-border bg-surface p-6">
                <h2 className="font-display text-2xl">Career</h2>
                <ul className="mt-4 grid gap-4">
                  {person.career.map((item) => (
                    <li key={`${item.org}-${item.years}`} className="border border-border bg-paper p-4">
                      <h3 className="font-medium">{item.role}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {item.org} · {item.years}
                      </p>
                      {item.notes ? <p className="mt-2 text-sm leading-6 text-muted">{item.notes}</p> : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="border border-border bg-surface p-6">
              <h2 className="font-display text-2xl">Timeline</h2>
              <div className="mt-4 grid gap-3">
                {person.timeline.map((event) => (
                  <TimelineRow key={event.id} event={event} personName={person.name} />
                ))}
              </div>
            </section>
            {person.research.gaps.length ? (
              <section className="border border-border bg-surface p-6">
                <h2 className="font-display text-2xl">Research gaps</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                  {person.research.gaps.map((gap) => (
                    <li key={gap}>{gap}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {quotes.length ? (
              <section className="border border-border bg-surface p-6">
                <h2 className="font-display text-2xl">Quotes</h2>
                <ul className="mt-4 grid gap-4">
                  {quotes.map((quote) => (
                    <li key={quote.id} className="border border-border bg-paper p-4">
                      <blockquote className="font-display text-lg leading-relaxed">&ldquo;{quote.text}&rdquo;</blockquote>
                      <p className="mt-2 text-sm text-muted">{quote.context}</p>
                      <div className="mt-3">
                        <EvidenceBadge evidence={quote.evidence} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}

        {activeTab === "decisions" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {decisions.length ? (
              decisions.map((decision) => <DecisionCard key={decision.id} decision={decision} />)
            ) : (
              <EmptyState message="No decisions recorded for this person yet." />
            )}
          </div>
        ) : null}

        {activeTab === "failures" ? (
          <div className="grid gap-4">
            {personFailures.length ? (
              personFailures.map((failure) => (
                <article key={failure.id} className="border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-2xl">{failure.title}</h3>
                    <EvidenceBadge evidence={failure.evidence} confidence={failure.confidence} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{failure.whatHappened}</p>
                  <Link
                    to="/failures/$slug"
                    params={{ slug: failure.slug }}
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent"
                  >
                    Explore failure analysis
                  </Link>
                </article>
              ))
            ) : (
              <EmptyState message="No failures recorded for this person yet." />
            )}
          </div>
        ) : null}

        {activeTab === "principles" ? (
          <div className="grid gap-4">
            {person.principles.length ? (
              person.principles.map((principle) => (
                <article key={principle.id} className="border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-2xl">{principle.title}</h3>
                    <EvidenceBadge evidence={principle.evidence} />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{principle.statement}</p>
                  {principle.notes ? <p className="mt-3 text-sm leading-6 text-muted">{principle.notes}</p> : null}
                </article>
              ))
            ) : (
              <EmptyState message="No principles recorded for this person yet." />
            )}
          </div>
        ) : null}

        {activeTab === "graph" ? (
          <div className="grid gap-6">
            <section className="border border-border bg-surface p-6">
              <h2 className="font-display text-2xl">Knowledge graph</h2>
              <p className="mt-2 text-sm text-muted">
                Nodes represent decisions, failures, breakthroughs, technologies, and discoveries linked to this person.
                Click any node to navigate to its detail page.
              </p>
              <div className="mt-6">
                <PersonGraph personId={person.id} />
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "sources" ? (
          <section className="border border-border bg-surface p-6">
            <h2 className="font-display text-2xl">Linked sources ({sourceIds.length})</h2>
            <p className="mt-2 text-sm text-muted">
              Aggregated from timeline events, decisions, failures, principles, and related records for this person.
            </p>
            <div className="mt-6">
              <SourceList sourceIds={sourceIds} />
            </div>
          </section>
        ) : null}

        {activeTab === "controversies" ? (
          <div className="grid gap-4">
            {person.controversies.length ? (
              person.controversies.map((controversy) => (
                <article key={controversy.id} className="border border-border bg-surface p-6">
                  <h3 className="font-display text-2xl">{controversy.title}</h3>
                  <dl className="mt-4 grid gap-4">
                    <DetailBlock label="Documented facts" value={controversy.facts} />
                    <DetailBlock label="Criticisms" value={controversy.criticisms} />
                    <DetailBlock label="Counterarguments" value={controversy.counterarguments} />
                    {controversy.legal ? <DetailBlock label="Legal findings" value={controversy.legal} /> : null}
                    <DetailBlock label="Uncertainty" value={controversy.uncertainty} />
                    <DetailBlock label="Historical context" value={controversy.historicalContext} />
                  </dl>
                  <div className="mt-4">
                    <SourceList sourceIds={controversy.sourceIds} compact />
                  </div>
                </article>
              ))
            ) : (
              <EmptyState message="No controversies recorded for this person." />
            )}
          </div>
        ) : null}
      </div>
    </PageChrome>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-paper p-5">
      <div className="font-display text-3xl">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <section className="border border-border bg-surface p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
    </section>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-7 text-ink">{value}</dd>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="border border-border bg-surface p-6 text-sm text-muted">{message}</p>;
}
