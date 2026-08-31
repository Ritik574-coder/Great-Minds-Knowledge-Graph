import type { EvidenceLevel } from "./types";

export const evidenceLabels: Record<EvidenceLevel, string> = {
  fact: "Fact",
  direct_quote: "Direct quote",
  documented_decision: "Documented decision",
  reported: "Reported",
  research_finding: "Research finding",
  interpretation: "Interpretation",
  inference: "Inference",
  controversy: "Controversy",
  unknown: "Unknown",
};

export const evidenceDescriptions: Record<EvidenceLevel, string> = {
  fact: "Directly documented in primary or authoritative records.",
  direct_quote: "Verbatim statement attributed to a named source.",
  documented_decision: "A decision recorded in contemporaneous documents or filings.",
  reported: "Reported by credible secondary sources; not independently verified here.",
  research_finding: "Published research result or peer-reviewed finding.",
  interpretation: "Analytical reading of evidence — not a direct quote or fact.",
  inference: "Reasonable inference from available evidence; not directly stated.",
  controversy: "Disputed or contested claim with credible disagreement.",
  unknown: "Insufficient evidence to classify confidently.",
};
