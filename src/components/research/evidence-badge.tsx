import { evidenceDescriptions, evidenceLabels } from "@/lib/data/evidence";
import type { Confidence, EvidenceLevel } from "@/lib/data/types";

export function EvidenceBadge({
  evidence,
  confidence,
  className = "",
}: {
  evidence: EvidenceLevel;
  confidence?: Confidence;
  className?: string;
}) {
  const title = confidence
    ? `${evidenceLabels[evidence]} (${confidence} confidence). ${evidenceDescriptions[evidence]}`
    : `${evidenceLabels[evidence]}. ${evidenceDescriptions[evidence]}`;

  return (
    <span
      title={title}
      className={`rounded-sm border border-border bg-surface-2 px-2 py-1 text-xs font-medium text-muted ${className}`}
    >
      {evidenceLabels[evidence]}
      {confidence ? ` · ${confidence}` : ""}
    </span>
  );
}
