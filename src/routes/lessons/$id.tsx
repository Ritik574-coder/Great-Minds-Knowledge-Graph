import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageChrome } from "@/components/research/page-chrome";
import {
  lessonById,
  personById,
  getDecisionsForPerson,
  getFailuresForPerson,
} from "@/lib/data/catalog";

export const Route = createFileRoute("/lessons/$id")({
  loader: ({ params }) => {
    const lesson = lessonById[params.id];
    if (!lesson) throw notFound();
    return { lesson };
  },
  component: LessonPage,
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const linkedPeople = lesson.personIds.map((id) => personById[id]).filter(Boolean);
  const firstPerson = linkedPeople[0];

  return (
    <PageChrome
      back={
        firstPerson
          ? { to: "/people/$slug", params: { slug: firstPerson.slug }, label: `Back to ${firstPerson.name}` }
          : { to: "/", label: "Back to archive" }
      }
      kicker="Learning case study"
      title={lesson.title}
    >
      {linkedPeople.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {linkedPeople.map((person) => (
            <Link
              key={person.id}
              to="/people/$slug"
              params={{ slug: person.slug }}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-paper px-3 py-1.5 text-sm font-medium text-accent transition hover:border-rule"
            >
              <span className="grid size-6 shrink-0 place-items-center bg-accent/10 text-xs font-bold text-accent">
                {person.initials}
              </span>
              {person.name}
            </Link>
          ))}
        </div>
      )}

      {lesson.mentalModel && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-muted">
          <span className="font-semibold text-ink">Mental model:</span> {lesson.mentalModel}
        </p>
      )}

      <div className="mt-8 grid gap-6">
        <LessonSection title="What happened">
          <p className="text-sm leading-7 text-ink">{lesson.whatHappened}</p>
        </LessonSection>

        <LessonSection title="Why it matters">
          <p className="text-sm leading-7 text-ink">{lesson.whyItMatters}</p>
        </LessonSection>

        <LessonSection title="What to learn">
          <p className="text-sm leading-7 text-ink">{lesson.whatToLearn}</p>
        </LessonSection>

        <LessonSection title="What to question">
          <p className="text-sm leading-7 text-ink">{lesson.whatToQuestion}</p>
        </LessonSection>

        <LessonSection title="Evidence & uncertainty">
          <DetailBlock label="Evidence note" value={lesson.evidenceNote} />
          <DetailBlock label="What is uncertain" value={lesson.uncertain} />
        </LessonSection>

        {lesson.reflection.length > 0 && (
          <section className="border border-border bg-ink p-6 text-surface">
            <h2 className="font-display text-2xl">Reflection questions</h2>
            <p className="mt-2 text-sm text-surface/60">
              These questions resist hero worship — push past the outcome to the process.
            </p>
            <ul className="mt-6 grid gap-4">
              {lesson.reflection.map((q, i) => (
                <li
                  key={i}
                  className="border border-surface/15 bg-surface/5 p-4 text-sm leading-7 text-surface/90"
                >
                  {q}
                </li>
              ))}
            </ul>
          </section>
        )}

        {linkedPeople.length > 0 && (
          <LessonSection title="Explore the people">
            <div className="grid gap-4 sm:grid-cols-2">
              {linkedPeople.map((person) => {
                const decisions = getDecisionsForPerson(person.id);
                const personFailures = getFailuresForPerson(person.id);
                return (
                  <Link
                    key={person.id}
                    to="/people/$slug"
                    params={{ slug: person.slug }}
                    className="group block border border-border bg-paper p-5 transition hover:border-rule"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl leading-tight group-hover:text-accent">{person.name}</p>
                        <p className="mt-1 text-xs text-muted">{person.era}</p>
                      </div>
                      <div className="grid size-10 shrink-0 place-items-center border border-border bg-ink font-display text-sm text-surface">
                        {person.initials}
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{person.knownFor}</p>
                    <p className="mt-3 text-xs text-muted">
                      {decisions.length} decisions · {personFailures.length} failures
                    </p>
                  </Link>
                );
              })}
            </div>
          </LessonSection>
        )}
      </div>
    </PageChrome>
  );
}

function LessonSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-surface p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mt-4 first:mt-0">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-7 text-ink">{value}</dd>
    </div>
  );
}
