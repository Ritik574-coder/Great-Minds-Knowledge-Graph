import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as personById } from "./router-DvDRwfPC.mjs";
import { t as EvidenceBadge } from "./evidence-badge-DQvS5edw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timeline-row-CUonXA4T.js
var import_jsx_runtime = require_jsx_runtime();
function DecisionCard({ decision }) {
	const person = personById[decision.personId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border border-border bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: person?.name ?? decision.personId
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, {
					evidence: decision.evidence,
					confidence: decision.confidence
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-display text-2xl leading-tight",
				children: decision.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-6 text-muted",
				children: decision.problem
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-px bg-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionFact, {
						label: "Uncertainty",
						value: decision.uncertainty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionFact, {
						label: "Outcome",
						value: decision.outcome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionFact, {
						label: "Quality",
						value: decision.decisionQuality.replaceAll("-", " ")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-6 text-muted",
				children: decision.qualityVsOutcome
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/decisions/$slug",
				params: { slug: decision.slug },
				className: "mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent",
				children: ["Inspect reasoning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
					className: "size-4",
					"aria-hidden": "true"
				})]
			})
		]
	});
}
function DecisionFact({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 bg-paper px-3 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right font-medium capitalize",
			children: value
		})]
	});
}
function TimelineRow({ event, personName, personSlug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid grid-cols-[5rem_1fr] gap-4 border border-border bg-paper p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl",
			children: event.year
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, {
					evidence: event.evidence,
					confidence: event.confidence
				})]
			}),
			personSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/people/$slug",
				params: { slug: personSlug },
				className: "mt-1 inline-block text-sm text-accent",
				children: personName
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: personName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-6 text-muted",
				children: event.summary
			})
		] })]
	});
}
//#endregion
export { TimelineRow as n, DecisionCard as t };
