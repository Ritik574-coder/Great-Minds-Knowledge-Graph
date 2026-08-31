import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evidence-badge-DQvS5edw.js
var import_jsx_runtime = require_jsx_runtime();
var evidenceLabels = {
	fact: "Fact",
	direct_quote: "Direct quote",
	documented_decision: "Documented decision",
	reported: "Reported",
	research_finding: "Research finding",
	interpretation: "Interpretation",
	inference: "Inference",
	controversy: "Controversy",
	unknown: "Unknown"
};
var evidenceDescriptions = {
	fact: "Directly documented in primary or authoritative records.",
	direct_quote: "Verbatim statement attributed to a named source.",
	documented_decision: "A decision recorded in contemporaneous documents or filings.",
	reported: "Reported by credible secondary sources; not independently verified here.",
	research_finding: "Published research result or peer-reviewed finding.",
	interpretation: "Analytical reading of evidence — not a direct quote or fact.",
	inference: "Reasonable inference from available evidence; not directly stated.",
	controversy: "Disputed or contested claim with credible disagreement.",
	unknown: "Insufficient evidence to classify confidently."
};
function EvidenceBadge({ evidence, confidence, className = "" }) {
	const title = confidence ? `${evidenceLabels[evidence]} (${confidence} confidence). ${evidenceDescriptions[evidence]}` : `${evidenceLabels[evidence]}. ${evidenceDescriptions[evidence]}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title,
		className: `rounded-sm border border-border bg-surface-2 px-2 py-1 text-xs font-medium text-muted ${className}`,
		children: [evidenceLabels[evidence], confidence ? ` · ${confidence}` : ""]
	});
}
//#endregion
export { EvidenceBadge as t };
