import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { ArrowRight, GitCompare, Minus, Plus } from "lucide-react";
import {
  allPeople,
  personBySlug,
  getDecisionsForPerson,
  getFailuresForPerson,
  getBreakthroughsForPerson,
  getTechnologiesForPerson,
  getDiscoveriesForPerson,
  getExperimentsForPerson,
  getLessonsForPerson,
  getQuotesForPerson,
} from "@/lib/data/catalog";
import type { Person } from "@/lib/data/types";

const searchSchema = z.object({
  a: z.string().optional(),
  b: z.string().optional(),
});

export const Route = createFileRoute("/compare")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ComparePage,
});

const DEFAULT_SLUGS = ["alan-turing", "marie-curie"] as const;

function ComparePage() {
  const { a, b } = Route.useSearch();
  const navigate = useNavigate({ from: "/compare" });

  const personA = (a ? personBySlug[a] : undefined) ?? personBySlug[DEFAULT_SLUGS[0]] ?? allPeople[0];
  const personB = (b ? personBySlug[b] : undefined) ?? personBySlug[DEFAULT_SLUGS[1]] ?? allPeople[1];

  function pickA(slug: string) {
    void navigate({ search: (prev) => ({ ...prev, a: slug }) });
  }
  function pickB(slug: string) {
    void navigate({ search: (prev) => ({ ...prev, b: slug }) });
  }

  return (
    <main id="top" className="min-h-dvh bg-bg">
      <div className="border-b border-border bg-surface px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <GitCompare className="size-6 text-accent" aria-hidden />
            <div>
              <h1 className="font-display text-4xl">Compare</h1>
              <p className="mt-1 text-sm text-muted">
                Side-by-side analysis of decision patterns, failure histories, and thinking styles — derived from the
                same evidence-backed catalog.
              </p>
            </div>
          </div>

          {/* Pickers */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <PersonPicker
              label="Person A"
              selected={personA}
              onChange={pickA}
              exclude={personB?.slug}
              accent
            />
            <PersonPicker
              label="Person B"
              selected={personB}
              onChange={pickB}
              exclude={personA?.slug}
            />
          </div>
        </div>
      </div>

      {personA && personB ? (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Header cards */}
          <div className="grid gap-px bg-border sm:grid-cols-2">
            <PersonHeaderCard person={personA} colorClass="bg-accent text-accent-fg" />
            <PersonHeaderCard person={personB} />
          </div>

          {/* Comparison grid */}
          <div className="mt-8 grid gap-6">
            <CompareSection title="Fields & era">
              <CompareRow label="Era" a={personA.era} b={personB.era} />
              <CompareRow label="Fields" a={personA.fields.join(", ")} b={personB.fields.join(", ")} />
              <CompareRow label="Roles" a={personA.roles.join(", ")} b={personB.roles.join(", ")} />
              <CompareRow label="Nationality" a={personA.nationality.join(", ")} b={personB.nationality.join(", ")} />
            </CompareSection>

            <CompareSection title="Research quality">
              <CompareRow label="Confidence" a={personA.research.confidence} b={personB.research.confidence} />
              <CompareRow
                label="Completeness"
                a={`${personA.research.completeness}%`}
                b={`${personB.research.completeness}%`}
              />
              <CompareRow
                label="Primary sources"
                a={String(personA.research.primarySourceCount)}
                b={String(personB.research.primarySourceCount)}
              />
              <CompareRow
                label="Known gaps"
                a={String(personA.research.gaps.length)}
                b={String(personB.research.gaps.length)}
              />
            </CompareSection>

            <CompareSection title="Knowledge record">
              <CompareCountRow label="Decisions" personA={personA} personB={personB} getter={getDecisionsForPerson} />
              <CompareCountRow label="Failures" personA={personA} personB={personB} getter={getFailuresForPerson} />
              <CompareCountRow
                label="Breakthroughs"
                personA={personA}
                personB={personB}
                getter={getBreakthroughsForPerson}
              />
              <CompareCountRow
                label="Experiments"
                personA={personA}
                personB={personB}
                getter={getExperimentsForPerson}
              />
              <CompareCountRow
                label="Technologies"
                personA={personA}
                personB={personB}
                getter={getTechnologiesForPerson}
              />
              <CompareCountRow
                label="Discoveries"
                personA={personA}
                personB={personB}
                getter={getDiscoveriesForPerson}
              />
              <CompareCountRow label="Lessons" personA={personA} personB={personB} getter={getLessonsForPerson} />
              <CompareCountRow label="Quotes" personA={personA} personB={personB} getter={getQuotesForPerson} />
              <CompareRow
                label="Principles"
                a={String(personA.principles.length)}
                b={String(personB.principles.length)}
              />
              <CompareRow
                label="Collaborators"
                a={String(personA.collaborators.length)}
                b={String(personB.collaborators.length)}
              />
            </CompareSection>

            <CompareSection title="Thinking pattern">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                <LongTextCell value={personA.thinking} />
                <LongTextCell value={personB.thinking} />
              </div>
            </CompareSection>

            <CompareSection title="Anti-survivorship note">
              <div className="grid gap-px bg-border sm:grid-cols-2">
                <LongTextCell value={personA.antiSurvivorship} />
                <LongTextCell value={personB.antiSurvivorship} />
              </div>
            </CompareSection>

            {(personA.successFactors.length > 0 || personB.successFactors.length > 0) && (
              <CompareSection title="Success factors">
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  <FactorList factors={personA.successFactors} />
                  <FactorList factors={personB.successFactors} />
                </div>
              </CompareSection>
            )}

            <CompareSection title="Open their profiles">
              <div className="grid gap-4 sm:grid-cols-2">
                <ProfileLink person={personA} />
                <ProfileLink person={personB} />
              </div>
            </CompareSection>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted sm:px-6 lg:px-8">
          Select two people above to compare them.
        </div>
      )}
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PersonPicker({
  label,
  selected,
  onChange,
  exclude,
  accent,
}: {
  label: string;
  selected?: Person;
  onChange: (slug: string) => void;
  exclude?: string;
  accent?: boolean;
}) {
  const options = allPeople.filter((p) => p.slug !== exclude).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      <select
        value={selected?.slug ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full border px-3 py-2.5 text-sm font-medium focus:outline-none ${
          accent
            ? "border-accent bg-accent text-accent-fg"
            : "border-border bg-paper text-ink"
        }`}
      >
        {options.map((p) => (
          <option key={p.id} value={p.slug}>
            {p.name} ({p.era})
          </option>
        ))}
      </select>
    </div>
  );
}

function PersonHeaderCard({ person, colorClass }: { person: Person; colorClass?: string }) {
  return (
    <div className={`p-6 ${colorClass ?? "bg-surface"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wide ${colorClass ? "text-accent-fg/70" : "text-muted"}`}>
            {person.era}
          </p>
          <h2 className="mt-1 font-display text-3xl leading-tight">{person.name}</h2>
          <p className={`mt-2 text-sm leading-6 ${colorClass ? "text-accent-fg/80" : "text-muted"}`}>
            {person.knownFor}
          </p>
        </div>
        <div
          className={`grid size-14 shrink-0 place-items-center border font-display text-xl ${colorClass ? "border-accent-fg/20 bg-accent-fg/10 text-accent-fg" : "border-border bg-paper text-ink"}`}
        >
          {person.initials}
        </div>
      </div>
    </div>
  );
}

function CompareSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl text-ink">{title}</h2>
      <div className="border border-border bg-surface">{children}</div>
    </section>
  );
}

function CompareRow({ label, a, b }: { label: string; a: string; b: string }) {
  const same = a.toLowerCase() === b.toLowerCase();
  return (
    <div className="grid gap-px bg-border sm:grid-cols-[160px_1fr_1fr]">
      <div className="flex items-center bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="flex items-center gap-2 bg-surface px-4 py-3 text-sm text-ink">
        {a}
        {!same && <span className="ml-auto shrink-0"><Minus className="size-3 text-muted" /></span>}
        {same && <span className="ml-auto shrink-0"><Plus className="size-3 text-muted" /></span>}
      </div>
      <div className="flex items-center bg-surface px-4 py-3 text-sm text-ink">{b}</div>
    </div>
  );
}

function CompareCountRow({
  label,
  personA,
  personB,
  getter,
}: {
  label: string;
  personA: Person;
  personB: Person;
  getter: (id: string) => unknown[];
}) {
  const countA = getter(personA.id).length;
  const countB = getter(personB.id).length;
  const higher = countA > countB ? "a" : countB > countA ? "b" : "same";
  return (
    <div className="grid gap-px bg-border sm:grid-cols-[160px_1fr_1fr]">
      <div className="flex items-center bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div
        className={`flex items-center px-4 py-3 text-sm font-medium ${
          higher === "a" ? "bg-accent/10 text-accent" : "bg-surface text-ink"
        }`}
      >
        {countA}
      </div>
      <div
        className={`flex items-center px-4 py-3 text-sm font-medium ${
          higher === "b" ? "bg-accent/10 text-accent" : "bg-surface text-ink"
        }`}
      >
        {countB}
      </div>
    </div>
  );
}

function LongTextCell({ value }: { value: string }) {
  return (
    <div className="bg-surface p-5 text-sm leading-7 text-ink">{value}</div>
  );
}

function FactorList({ factors }: { factors: Person["successFactors"] }) {
  return (
    <div className="bg-surface p-5">
      {factors.length === 0 ? (
        <p className="text-sm text-muted">Not recorded.</p>
      ) : (
        <ul className="grid gap-2">
          {factors.map((f, i) => (
            <li key={i} className="text-sm">
              <span className="font-medium capitalize text-ink">{f.factor.replaceAll("-", " ")}</span>
              <span className="ml-2 text-muted">{f.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProfileLink({ person }: { person: Person }) {
  return (
    <Link
      to="/people/$slug"
      params={{ slug: person.slug }}
      className="group flex items-center justify-between border border-border bg-paper p-5 transition hover:border-rule"
    >
      <div>
        <p className="font-display text-xl group-hover:text-accent">{person.name}</p>
        <p className="mt-1 text-xs text-muted">{person.knownFor}</p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:text-accent" aria-hidden />
    </Link>
  );
}
