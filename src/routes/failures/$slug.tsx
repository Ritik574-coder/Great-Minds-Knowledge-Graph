import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageChrome } from "@/components/research/page-chrome";
import { EvidenceBadge } from "@/components/research/evidence-badge";
import { SourceList } from "@/components/research/source-list";
import { getDecision, getFailure, getPerson } from "@/lib/data/catalog";

export const Route = createFileRoute("/failures/$slug")({
  loader: ({ params }) => {
    const failure = getFailure(params.slug);
    if (!failure) throw notFound();
    return { failure };
  },
  component: FailurePage,
});

function FailurePage() {
  const { failure } = Route.useLoaderData();
  const person = getPerson(failure.personId);
  const linkedDecision = failure.decisionId ? getDecision(failure.decisionId) : undefined;

  return (
    <PageChrome
      back={
        person
          ? { to: "/people/$slug", params: { slug: person.slug }, label: `Back to ${person.name}` }
          : { to: "/", label: "Back to archive" }
      }
      kicker={person ? `${person.name} · ${failure.year}` : String(failure.year)}
      title={failure.title}
    >
      {person ? (
        <Link to="/people/$slug" params={{ slug: person.slug }} className="mb-4 inline-block text-sm text-accent">
          View full person profile
        </Link>
      ) : null}

      <header className="flex flex-wrap items-center gap-2">
        <EvidenceBadge evidence={failure.evidence} confidence={failure.confidence} />
        <span className="rounded-sm border border-border bg-paper px-2 py-1 text-xs text-muted">
          Repeated: {failure.repeated}
        </span>
      </header>

      <div className="mt-8 grid gap-6">
        <Section title="What happened">
          <Detail label="Event" value={failure.whatHappened} />
          <Detail label="Why" value={failure.why} />
        </Section>

        <Section title="What was known & misunderstood">
          <Detail label="Known beforehand" value={failure.knownBefore} />
          <Detail label="Misunderstood" value={failure.misunderstood} />
          <Detail label="External factors" value={failure.externalFactors} />
        </Section>

        {linkedDecision ? (
          <Section title="Contributing decision">
            <Link
              to="/decisions/$slug"
              params={{ slug: linkedDecision.slug }}
              className="block border border-border bg-paper p-4 transition hover:border-rule"
            >
              <p className="font-medium">{linkedDecision.title}</p>
              <p className="mt-2 text-sm text-muted">{linkedDecision.problem}</p>
            </Link>
          </Section>
        ) : null}

        <Section title="Adaptation">
          <Detail label="What changed afterward" value={failure.changedAfter} />
          <Detail label="What was learned" value={failure.learned} />
        </Section>

        <Section title="Sources">
          <SourceList sourceIds={failure.sourceIds} />
        </Section>
      </div>
    </PageChrome>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-surface p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <h3 className="text-sm font-medium text-muted">{label}</h3>
      <p className="mt-1 text-sm leading-7 text-ink">{value}</p>
    </div>
  );
}
