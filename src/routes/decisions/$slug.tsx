import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageChrome } from "@/components/research/page-chrome";
import { EvidenceBadge } from "@/components/research/evidence-badge";
import { SourceList } from "@/components/research/source-list";
import { failureById, getDecision, getPerson, lessonById } from "@/lib/data/catalog";

export const Route = createFileRoute("/decisions/$slug")({
  loader: ({ params }) => {
    const decision = getDecision(params.slug);
    if (!decision) throw notFound();
    return { decision };
  },
  component: DecisionPage,
});

function DecisionPage() {
  const { decision } = Route.useLoaderData();
  const person = getPerson(decision.personId);
  const relatedFailures = (decision.relatedFailureIds ?? [])
    .map((id) => failureById[id])
    .filter(Boolean);
  const relatedLessons = (decision.lessons ?? [])
    .map((id) => lessonById[id])
    .filter(Boolean);

  return (
    <PageChrome
      back={
        person
          ? { to: "/people/$slug", params: { slug: person.slug }, label: `Back to ${person.name}` }
          : { to: "/", label: "Back to archive" }
      }
      kicker={person ? `${person.name} · ${decision.year}` : String(decision.year)}
      title={decision.title}
    >
      {person ? (
        <Link to="/people/$slug" params={{ slug: person.slug }} className="mb-4 inline-block text-sm text-accent">
          View full person profile
        </Link>
      ) : null}

      <header className="flex flex-wrap items-center gap-2">
        <EvidenceBadge evidence={decision.evidence} confidence={decision.confidence} />
        {decision.categories.map((category) => (
          <span key={category} className="rounded-sm border border-border bg-paper px-2 py-1 text-xs capitalize text-muted">
            {category.replaceAll("-", " ")}
          </span>
        ))}
      </header>

      <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Meta label="Uncertainty" value={decision.uncertainty} />
        <Meta label="Reversibility" value={decision.reversibility.replaceAll("-", " ")} />
        <Meta label="Outcome" value={decision.outcome} />
        <Meta label="Decision quality" value={decision.decisionQuality.replaceAll("-", " ")} />
      </div>

      <p className="mt-6 border border-border bg-paper p-4 text-sm leading-7 text-muted">{decision.qualityVsOutcome}</p>

      <div className="mt-8 grid gap-6">
        <Section title="Context & problem">
          <Detail label="Context" value={decision.context} />
          <Detail label="Problem" value={decision.problem} />
          <Detail label="Goal" value={decision.goal} />
        </Section>

        <Section title="Information at decision time">
          <Detail label="Available information" value={decision.availableInformation} />
          <Detail label="Unknown information" value={decision.unknownInformation} />
          <Detail label="Assumptions" value={decision.assumptions.join(" · ")} />
        </Section>

        <Section title="Options considered">
          <ul className="grid gap-3">
            {decision.options.map((option) => (
              <li
                key={option.id}
                className={`border p-4 ${option.chosen ? "border-accent bg-surface" : "border-border bg-paper"}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">
                    {option.label}
                    {option.chosen ? " (chosen)" : ""}
                  </p>
                  <EvidenceBadge evidence={option.evidence} />
                </div>
                {option.reasoning ? <p className="mt-2 text-sm leading-6 text-muted">{option.reasoning}</p> : null}
              </li>
            ))}
          </ul>
          <Detail label="Chosen path" value={decision.chosen} />
          {decision.rejected.length ? (
            <Detail label="Rejected options" value={decision.rejected.join(" · ")} />
          ) : null}
          <Detail label="Reasoning" value={decision.reasoning} />
        </Section>

        <Section title="Risks, resources & constraints">
          <Detail label="Risks accepted" value={decision.risksAccepted.join(" · ")} />
          <Detail label="Risks rejected" value={decision.risksRejected.join(" · ")} />
          <Detail label="Resources" value={decision.resources} />
          <Detail label="Constraints" value={decision.constraints} />
          <Detail label="Time pressure" value={decision.timePressure} />
          <Detail label="People involved" value={decision.peopleInvolved.join(", ")} />
        </Section>

        <Section title="Execution & communication">
          <Detail label="Communication" value={decision.communication} />
          <Detail label="Execution" value={decision.execution} />
        </Section>

        <Section title="Outcomes">
          <Detail label="Short-term result" value={decision.shortTerm} />
          <Detail label="Long-term result" value={decision.longTerm} />
          <Detail label="What worked" value={decision.whatWorked} />
          <Detail label="What failed" value={decision.whatFailed} />
          <Detail label="What changed afterward" value={decision.whatChanged} />
        </Section>

        {relatedFailures.length ? (
          <Section title="Linked failures">
            <ul className="grid gap-3">
              {relatedFailures.map((failure) => (
                <li key={failure.id}>
                  <Link
                    to="/failures/$slug"
                    params={{ slug: failure.slug }}
                    className="block border border-border bg-paper p-4 transition hover:border-rule"
                  >
                    <p className="font-medium">{failure.title}</p>
                    <p className="mt-2 text-sm text-muted">{failure.whatHappened}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {relatedLessons.length ? (
          <Section title="Lessons">
            <ul className="grid gap-3">
              {relatedLessons.map((lesson) => (
                <li key={lesson.id} className="border border-border bg-paper p-4">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="mt-2 text-sm text-muted">{lesson.whatToLearn}</p>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section title="Sources">
          <SourceList sourceIds={decision.sourceIds} />
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-medium capitalize">{value}</p>
    </div>
  );
}
