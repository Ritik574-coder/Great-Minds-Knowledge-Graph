import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { personById } from "@/lib/data/catalog";
import type { Decision } from "@/lib/data/types";
import { EvidenceBadge } from "./evidence-badge";

export function DecisionCard({ decision }: { decision: Decision }) {
  const person = personById[decision.personId];

  return (
    <article className="border border-border bg-surface p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{person?.name ?? decision.personId}</p>
        <EvidenceBadge evidence={decision.evidence} confidence={decision.confidence} />
      </div>
      <h3 className="mt-4 font-display text-2xl leading-tight">{decision.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{decision.problem}</p>
      <div className="mt-5 grid gap-px bg-border">
        <DecisionFact label="Uncertainty" value={decision.uncertainty} />
        <DecisionFact label="Outcome" value={decision.outcome} />
        <DecisionFact label="Quality" value={decision.decisionQuality.replaceAll("-", " ")} />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{decision.qualityVsOutcome}</p>
      <Link
        to="/decisions/$slug"
        params={{ slug: decision.slug }}
        className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent"
      >
        Inspect reasoning <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function DecisionFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-paper px-3 py-2 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium capitalize">{value}</span>
    </div>
  );
}
