import { i as __toESM } from "./_runtime.mjs";
import { B as require_react, _ as Link, b as require_jsx_runtime, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as getExperimentsForPerson, D as getQuotesForPerson, M as personById, S as getDiscoveriesForPerson, f as collectPersonSourceIds, g as failureById, k as getTechnologiesForPerson, n as Route, p as decisionById, u as buildPersonGraphEdges, w as getFailuresForPerson, x as getDecisionsForPerson, y as getBreakthroughsForPerson } from "./_ssr/router-BaDMtqh8.mjs";
import { t as PageChrome } from "./_ssr/page-chrome-BnkGoK9K.mjs";
import { t as EvidenceBadge } from "./_ssr/evidence-badge-DQvS5edw.mjs";
import { t as SourceList } from "./_ssr/source-list-BJhp_4a2.mjs";
import { n as TimelineRow, t as DecisionCard } from "./_ssr/timeline-row-CO6Y2KXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BZYMJZ-4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function nodeRoute(id) {
	const person = personById[id];
	if (person) return {
		to: "/people/$slug",
		params: { slug: person.slug }
	};
	const decision = decisionById[id];
	if (decision) return {
		to: "/decisions/$slug",
		params: { slug: decision.slug }
	};
	const failure = failureById[id];
	if (failure) return {
		to: "/failures/$slug",
		params: { slug: failure.slug }
	};
}
function buildNodes(personId) {
	const person = personById[personId];
	if (!person) return {
		nodes: [],
		edges: []
	};
	const items = [
		{
			id: person.id,
			label: person.name,
			kind: "person"
		},
		...getDecisionsForPerson(personId).map((item) => ({
			id: item.id,
			label: item.title,
			kind: "decision"
		})),
		...getFailuresForPerson(personId).map((item) => ({
			id: item.id,
			label: item.title,
			kind: "failure"
		})),
		...getExperimentsForPerson(personId).map((item) => ({
			id: item.id,
			label: item.title,
			kind: "experiment"
		})),
		...getBreakthroughsForPerson(personId).map((item) => ({
			id: item.id,
			label: item.title,
			kind: "breakthrough"
		})),
		...getTechnologiesForPerson(personId).map((item) => ({
			id: item.id,
			label: item.name,
			kind: "technology"
		})),
		...getDiscoveriesForPerson(personId).map((item) => ({
			id: item.id,
			label: item.title,
			kind: "discovery"
		}))
	].slice(0, 10);
	const edges = buildPersonGraphEdges(personId).filter((edge) => items.some((node) => node.id === edge.from) && items.some((node) => node.id === edge.to));
	const centerX = 280;
	const centerY = 120;
	const radius = 150;
	return {
		nodes: items.map((item, index) => {
			const angle = index === 0 ? -Math.PI / 2 : (index - 1) / Math.max(items.length - 1, 1) * Math.PI * 1.35 - Math.PI * .9;
			const x = index === 0 ? 220 : centerX + Math.cos(angle) * radius - 60;
			const y = index === 0 ? 104 : centerY + Math.sin(angle) * radius - 16;
			return {
				...item,
				label: item.label.length > 28 ? `${item.label.slice(0, 28)}…` : item.label,
				x,
				y,
				route: nodeRoute(item.id)
			};
		}),
		edges
	};
}
function GraphNodeShape({ node, onNavigate }) {
	const interactive = Boolean(node.route);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		role: interactive ? "link" : void 0,
		tabIndex: interactive ? 0 : void 0,
		className: interactive ? "cursor-pointer" : void 0,
		onClick: () => node.route && onNavigate(node.route),
		onKeyDown: (event) => {
			if (interactive && (event.key === "Enter" || event.key === " ")) {
				event.preventDefault();
				node.route && onNavigate(node.route);
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: node.x,
			y: node.y,
			width: 120,
			height: "32",
			rx: "4",
			className: node.kind === "person" ? "fill-accent" : "fill-surface stroke-border"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: node.x + 8,
			y: node.y + 20,
			className: node.kind === "person" ? "fill-accent-fg" : "fill-ink",
			fontSize: "9",
			fontWeight: "600",
			children: node.label
		})]
	});
}
function PersonGraph({ personId }) {
	const navigate = useNavigate();
	const { nodes, edges } = buildNodes(personId);
	const person = personById[personId];
	if (!nodes.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No graph data for this person."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto border border-border bg-paper p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 560 240",
				role: "img",
				"aria-label": "Interactive knowledge graph",
				className: "h-auto min-w-[320px] w-full",
				children: [edges.map((edge) => {
					const from = nodes.find((node) => node.id === edge.from);
					const to = nodes.find((node) => node.id === edge.to);
					if (!from || !to) return null;
					const x1 = from.x + 60;
					const y1 = from.y + 16;
					const x2 = to.x + 60;
					const y2 = to.y + 16;
					const mx = (x1 + x2) / 2;
					const my = (y1 + y2) / 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1,
						y1,
						x2,
						y2,
						className: "stroke-rule",
						strokeWidth: "1.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: mx,
						y: my - 4,
						fontSize: "8",
						className: "fill-muted",
						children: edge.label
					})] }, edge.id);
				}), nodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphNodeShape, {
					node,
					onNavigate: (route) => navigate(route)
				}, node.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Click person, decision, or failure nodes to drill down. Edge labels describe relationships."
			}),
			person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/people/$slug",
				params: { slug: person.slug },
				className: "mt-2 inline-flex text-sm font-medium text-accent",
				children: "Open full profile"
			}) : null
		]
	});
}
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
		id: "graph",
		label: "Graph"
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
					activeTab === "graph" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Knowledge graph"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Nodes represent decisions, failures, breakthroughs, technologies, and discoveries linked to this person. Click any node to navigate to its detail page."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonGraph, { personId: person.id })
								})
							]
						})
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
