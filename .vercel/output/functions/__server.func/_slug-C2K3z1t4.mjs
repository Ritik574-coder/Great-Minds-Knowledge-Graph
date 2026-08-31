import { _ as Link, b as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as getPerson, b as getDecision, i as Route$2 } from "./_ssr/router-BaDMtqh8.mjs";
import { t as PageChrome } from "./_ssr/page-chrome-BnkGoK9K.mjs";
import { t as EvidenceBadge } from "./_ssr/evidence-badge-DQvS5edw.mjs";
import { t as SourceList } from "./_ssr/source-list-BJhp_4a2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C2K3z1t4.js
var import_jsx_runtime = require_jsx_runtime();
function FailurePage() {
	const { failure } = Route$2.useLoaderData();
	const person = getPerson(failure.personId);
	const linkedDecision = failure.decisionId ? getDecision(failure.decisionId) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageChrome, {
		back: person ? {
			to: "/people/$slug",
			params: { slug: person.slug },
			label: `Back to ${person.name}`
		} : {
			to: "/",
			label: "Back to archive"
		},
		kicker: person ? `${person.name} · ${failure.year}` : String(failure.year),
		title: failure.title,
		children: [
			person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/people/$slug",
				params: { slug: person.slug },
				className: "mb-4 inline-block text-sm text-accent",
				children: "View full person profile"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, {
					evidence: failure.evidence,
					confidence: failure.confidence
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-sm border border-border bg-paper px-2 py-1 text-xs text-muted",
					children: ["Repeated: ", failure.repeated]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "What happened",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Event",
							value: failure.whatHappened
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Why",
							value: failure.why
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "What was known & misunderstood",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Known beforehand",
								value: failure.knownBefore
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Misunderstood",
								value: failure.misunderstood
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "External factors",
								value: failure.externalFactors
							})
						]
					}),
					linkedDecision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Contributing decision",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/decisions/$slug",
							params: { slug: linkedDecision.slug },
							className: "block border border-border bg-paper p-4 transition hover:border-rule",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: linkedDecision.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: linkedDecision.problem
							})]
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Adaptation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "What changed afterward",
							value: failure.changedAfter
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "What was learned",
							value: failure.learned
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Sources",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sourceIds: failure.sourceIds })
					})
				]
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border border-border bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4",
			children
		})]
	});
}
function Detail({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-sm font-medium text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm leading-7 text-ink",
		children: value
	})] });
}
//#endregion
export { FailurePage as component };
