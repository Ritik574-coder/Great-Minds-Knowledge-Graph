import { i as __toESM } from "./_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "./_libs/@tanstack/react-router+[...].mjs";
import { _ as getFailuresForPerson, g as getDecisionsForPerson, l as collectPersonSourceIds, n as Route, y as getQuotesForPerson } from "./_ssr/router-DvDRwfPC.mjs";
import { n as SourceList, t as PageChrome } from "./_ssr/source-list-xKLX-Wyt.mjs";
import { t as EvidenceBadge } from "./_ssr/evidence-badge-DQvS5edw.mjs";
import { n as TimelineRow, t as DecisionCard } from "./_ssr/timeline-row-CUonXA4T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BUwEw2sx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		id: "trajectory",
		label: "Trajectory"
	},
	{
		id: "decisions",
		label: "Decisions"
	},
	{
		id: "failures",
		label: "Failures"
	},
	{
		id: "principles",
		label: "Principles"
	},
	{
		id: "sources",
		label: "Sources"
	},
	{
		id: "controversies",
		label: "Controversies"
	}
];
function PersonPage() {
	const { person } = Route.useLoaderData();
	const [activeTab, setActiveTab] = (0, import_react.useState)("trajectory");
	const decisions = getDecisionsForPerson(person.id);
	const personFailures = getFailuresForPerson(person.id);
	const quotes = getQuotesForPerson(person.id);
	const sourceIds = collectPersonSourceIds(person);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageChrome, {
		back: {
			to: "/",
			label: "Back to archive"
		},
		kicker: person.era,
		title: person.name,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border border-border bg-surface p-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: person.knownFor
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-7 text-muted",
							children: person.summary
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-16 place-items-center border border-border bg-paper font-display text-2xl",
						children: person.initials
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-px bg-border sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Primary sources",
							value: person.research.primarySourceCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Completeness",
							value: `${person.research.completeness}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Known gaps",
							value: person.research.gaps.length
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Person sections",
				children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": activeTab === tab.id,
					onClick: () => setActiveTab(tab.id),
					className: `min-h-11 border px-4 text-sm font-medium transition ${activeTab === tab.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-paper text-muted hover:text-ink"}`,
					children: tab.label
				}, tab.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				role: "tabpanel",
				children: [
					activeTab === "trajectory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Thinking pattern",
								body: person.thinking
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
								title: "Anti-survivorship note",
								body: person.antiSurvivorship
							}),
							person.education.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Education"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 grid gap-4",
									children: person.education.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border border-border bg-paper p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-medium",
													children: item.institution
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, { evidence: item.evidence })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted",
												children: item.years
											}),
											item.focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-6 text-muted",
												children: item.focus
											}) : null,
											item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-6 text-muted",
												children: item.notes
											}) : null
										]
									}, `${item.institution}-${item.years}`))
								})]
							}) : null,
							person.career.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Career"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 grid gap-4",
									children: person.career.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border border-border bg-paper p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-medium",
												children: item.role
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-muted",
												children: [
													item.org,
													" · ",
													item.years
												]
											}),
											item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-6 text-muted",
												children: item.notes
											}) : null
										]
									}, `${item.org}-${item.years}`))
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Timeline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid gap-3",
									children: person.timeline.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineRow, {
										event,
										personName: person.name
									}, event.id))
								})]
							}),
							person.research.gaps.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Research gaps"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted",
									children: person.research.gaps.map((gap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: gap }, gap))
								})]
							}) : null,
							quotes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Quotes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 grid gap-4",
									children: quotes.map((quote) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border border-border bg-paper p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
												className: "font-display text-lg leading-relaxed",
												children: [
													"“",
													quote.text,
													"”"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted",
												children: quote.context
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, { evidence: quote.evidence })
											})
										]
									}, quote.id))
								})]
							}) : null
						]
					}) : null,
					activeTab === "decisions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: decisions.length ? decisions.map((decision) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionCard, { decision }, decision.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No decisions recorded for this person yet." })
					}) : null,
					activeTab === "failures" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: personFailures.length ? personFailures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl",
										children: failure.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, {
										evidence: failure.evidence,
										confidence: failure.confidence
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-6 text-muted",
									children: failure.whatHappened
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/failures/$slug",
									params: { slug: failure.slug },
									className: "mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent",
									children: "Explore failure analysis"
								})
							]
						}, failure.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No failures recorded for this person yet." })
					}) : null,
					activeTab === "principles" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: person.principles.length ? person.principles.map((principle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl",
										children: principle.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, { evidence: principle.evidence })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-7 text-muted",
									children: principle.statement
								}),
								principle.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-6 text-muted",
									children: principle.notes
								}) : null
							]
						}, principle.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No principles recorded for this person yet." })
					}) : null,
					activeTab === "sources" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-border bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-2xl",
								children: [
									"Linked sources (",
									sourceIds.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Aggregated from timeline events, decisions, failures, principles, and related records for this person."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sourceIds })
							})
						]
					}) : null,
					activeTab === "controversies" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: person.controversies.length ? person.controversies.map((controversy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "border border-border bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: controversy.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 grid gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Documented facts",
											value: controversy.facts
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Criticisms",
											value: controversy.criticisms
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Counterarguments",
											value: controversy.counterarguments
										}),
										controversy.legal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Legal findings",
											value: controversy.legal
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Uncertainty",
											value: controversy.uncertainty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
											label: "Historical context",
											value: controversy.historicalContext
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, {
										sourceIds: controversy.sourceIds,
										compact: true
									})
								})
							]
						}, controversy.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { message: "No controversies recorded for this person." })
					}) : null
				]
			})
		]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-paper p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-3xl",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm text-muted",
			children: label
		})]
	});
}
function Panel({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border border-border bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-7 text-muted",
			children: body
		})]
	});
}
function DetailBlock({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-sm font-medium text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm leading-7 text-ink",
		children: value
	})] });
}
function EmptyState({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-border bg-surface p-6 text-sm text-muted",
		children: message
	});
}
//#endregion
export { PersonPage as component };
