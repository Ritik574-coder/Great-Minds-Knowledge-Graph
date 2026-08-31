import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BookOpenCheck, a as Scale, d as GitBranch, f as Funnel, i as Search, m as CircleHelp, p as Database, r as ShieldCheck, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { F as sources, I as technologies, M as personById, P as quotes, _ as failures, c as allPeople, d as catalogStats, h as experiments, j as lessons, l as breakthroughs, m as discoveries, s as allDecisions, v as getAllTimelineEvents, w as getFailuresForPerson, x as getDecisionsForPerson } from "./router-BaDMtqh8.mjs";
import { n as TimelineRow, t as DecisionCard } from "./timeline-row-CO6Y2KXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D92c9ZCE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function hit(kind, id, slug, title, snippet, personId) {
	return {
		kind,
		id,
		slug,
		title,
		snippet,
		personId
	};
}
var searchIndex = [
	...allPeople.map((person) => hit("person", person.id, person.slug, person.name, [
		person.knownFor,
		person.summary,
		person.thinking,
		person.fields.join(", ")
	].join(" · "), person.id)),
	...allDecisions.map((decision) => hit("decision", decision.id, decision.slug, decision.title, [
		decision.problem,
		decision.context,
		decision.reasoning
	].join(" · "), decision.personId)),
	...failures.map((failure) => hit("failure", failure.id, failure.slug, failure.title, [
		failure.whatHappened,
		failure.why,
		failure.learned
	].join(" · "), failure.personId)),
	...experiments.map((experiment) => hit("experiment", experiment.id, experiment.id, experiment.title, [
		experiment.question,
		experiment.method,
		experiment.result
	].join(" · "), experiment.personId)),
	...breakthroughs.map((item) => hit("breakthrough", item.id, item.slug, item.title, [item.summary, item.impact].join(" · "), item.personId)),
	...technologies.map((item) => hit("technology", item.id, item.slug, item.name, [
		item.problem,
		item.novelIdea,
		item.impact
	].join(" · "))),
	...discoveries.map((item) => hit("discovery", item.id, item.slug, item.title, [
		item.question,
		item.result,
		item.impact
	].join(" · "), item.personId)),
	...quotes.map((quote) => hit("quote", quote.id, quote.id, quote.text.slice(0, 80), quote.context, quote.personId)),
	...lessons.map((lesson) => hit("lesson", lesson.id, lesson.id, lesson.title, [lesson.whatToLearn, lesson.whyItMatters].join(" · "))),
	...sources.map((source) => hit("source", source.id, source.id, source.title, [
		source.author,
		String(source.year),
		source.excerpt ?? ""
	].join(" · ")))
];
function searchArchive(filters) {
	const normalized = filters.query.trim().toLowerCase();
	const limit = filters.limit ?? 20;
	let results = searchIndex;
	if (filters.mode !== "all") results = results.filter((item) => {
		if (!item.personId) return item.kind === "source" || item.kind === "lesson" || item.kind === "technology";
		return personById[item.personId]?.mode.includes(filters.mode);
	});
	if (filters.personId) results = results.filter((item) => item.personId === filters.personId || item.kind === "person" && item.id === filters.personId);
	if (filters.kinds?.length) results = results.filter((item) => filters.kinds.includes(item.kind));
	if (normalized) results = results.filter((item) => [
		item.title,
		item.snippet,
		item.kind
	].join(" ").toLowerCase().includes(normalized));
	return results.slice(0, limit);
}
function searchHitHref(item) {
	switch (item.kind) {
		case "person": return {
			to: "/people/$slug",
			params: { slug: item.slug }
		};
		case "decision": return {
			to: "/decisions/$slug",
			params: { slug: item.slug }
		};
		case "failure": return {
			to: "/failures/$slug",
			params: { slug: item.slug }
		};
		default:
			if (item.personId) {
				const person = personById[item.personId];
				if (person) return {
					to: "/people/$slug",
					params: { slug: person.slug }
				};
			}
			return { to: "/" };
	}
}
function searchHitLabel(kind) {
	return {
		person: "Person",
		decision: "Decision",
		failure: "Failure",
		technology: "Technology",
		discovery: "Discovery",
		quote: "Quote",
		lesson: "Lesson",
		source: "Source",
		topic: "Topic",
		breakthrough: "Breakthrough",
		experiment: "Experiment"
	}[kind];
}
function SearchResults({ results, onSelectPerson }) {
	if (!results.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-border bg-paper p-4 text-sm text-muted",
		children: "No results found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-2",
		children: results.map((item) => {
			const href = searchHitHref(item);
			const label = searchHitLabel(item.kind);
			if (item.kind === "person" && onSelectPerson) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSelectPerson(item.id),
				className: "w-full border border-border bg-surface p-4 text-left transition hover:border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResultBody, {
					item,
					label
				})
			}) }, `${item.kind}-${item.id}`);
			if (href.params) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: href.to,
				params: href.params,
				className: "block border border-border bg-surface p-4 transition hover:border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResultBody, {
					item,
					label
				})
			}) }, `${item.kind}-${item.id}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: href.to,
				hash: item.kind === "source" ? "sources" : item.kind === "lesson" ? "learning" : void 0,
				className: "block border border-border bg-surface p-4 transition hover:border-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResultBody, {
					item,
					label
				})
			}) }, `${item.kind}-${item.id}`);
		})
	});
}
function SearchResultBody({ item, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-sm border border-border bg-paper px-2 py-0.5 text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: item.title
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 line-clamp-2 text-sm leading-6 text-muted",
		children: item.snippet
	})] });
}
function SectionTitle({ icon: Icon, kicker, title, inverted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: `flex items-center gap-2 text-sm font-medium ${inverted ? "text-surface/65" : "text-muted"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-4",
			"aria-hidden": "true"
		}), kicker]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mt-2 font-display text-4xl leading-tight sm:text-5xl",
		children: title
	})] });
}
[...new Set(allPeople.flatMap((p) => p.fields))].sort();
[...new Set(allPeople.map((p) => p.era))].sort();
function Home() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("all");
	const [selectedPersonId, setSelectedPersonId] = (0, import_react.useState)(allPeople[0]?.id ?? "");
	const [timelineScope, setTimelineScope] = (0, import_react.useState)("all");
	const [showSearchResults, setShowSearchResults] = (0, import_react.useState)(false);
	const [facetsOpen, setFacetsOpen] = (0, import_react.useState)(false);
	const [activeKinds, setActiveKinds] = (0, import_react.useState)([]);
	const [activeFields, setActiveFields] = (0, import_react.useState)([]);
	const [activeConfidence, setActiveConfidence] = (0, import_react.useState)([]);
	activeKinds.length > 0 || activeFields.length > 0 || activeConfidence.length;
	const selectedPerson = allPeople.find((person) => person.id === selectedPersonId) ?? allPeople[0];
	const selectedPersonDecisions = selectedPerson ? getDecisionsForPerson(selectedPerson.id) : [];
	const selectedPersonFailures = selectedPerson ? getFailuresForPerson(selectedPerson.id) : [];
	const searchResults = (0, import_react.useMemo)(() => {
		const normalized = query.trim();
		let results = searchArchive({
			query: normalized || " ",
			mode,
			kinds: activeKinds.length > 0 ? activeKinds : void 0,
			limit: 40
		});
		if (activeFields.length > 0) results = results.filter((item) => {
			if (!item.personId) return true;
			return allPeople.find((p) => p.id === item.personId)?.fields.some((f) => activeFields.includes(f));
		});
		if (activeConfidence.length > 0) results = results.filter((item) => {
			if (item.kind !== "person") return true;
			const person = allPeople.find((p) => p.id === item.id);
			return person && activeConfidence.includes(person.research.confidence);
		});
		if (!normalized && activeKinds.length === 0 && activeFields.length === 0 && activeConfidence.length === 0) {
			const matchesMode = (person) => mode === "all" || person.mode.includes(mode);
			return allPeople.filter(matchesMode).slice(0, 8).map((person) => ({
				kind: "person",
				id: person.id,
				slug: person.slug,
				title: person.name,
				snippet: person.knownFor,
				personId: person.id
			}));
		}
		return results.slice(0, 20);
	}, [
		mode,
		query,
		activeKinds,
		activeFields,
		activeConfidence
	]);
	const peopleResults = (0, import_react.useMemo)(() => {
		const matchesMode = (person) => mode === "all" || person.mode.includes(mode);
		const normalized = query.trim().toLowerCase();
		const pool = allPeople.filter(matchesMode);
		if (!normalized) return pool.slice(0, 8);
		return pool.filter((person) => [
			person.name,
			person.knownFor,
			person.summary,
			person.thinking,
			person.fields.join(" "),
			person.countries.join(" ")
		].join(" ").toLowerCase().includes(normalized)).slice(0, 8);
	}, [mode, query]);
	const timelineEvents = (0, import_react.useMemo)(() => {
		const events = getAllTimelineEvents();
		return (timelineScope === "selected" && selectedPerson ? events.filter((event) => event.personId === selectedPerson.id) : events).slice(0, timelineScope === "selected" ? 24 : 12);
	}, [selectedPerson, timelineScope]);
	const qualityStats = [
		{
			label: "People",
			value: catalogStats.people
		},
		{
			label: "Decisions",
			value: catalogStats.decisions
		},
		{
			label: "Sources",
			value: catalogStats.sources
		},
		{
			label: "Failures",
			value: catalogStats.failures
		},
		{
			label: "Quotes",
			value: catalogStats.quotes
		}
	];
	const graphNodes = [
		...selectedPerson ? [{
			id: selectedPerson.id,
			label: selectedPerson.name,
			x: 48,
			y: 50,
			kind: "person"
		}] : [],
		...selectedPersonDecisions.slice(0, 3).map((decision, index) => ({
			id: decision.id,
			label: decision.title,
			x: 210,
			y: 30 + index * 52,
			kind: "decision"
		})),
		...selectedPersonFailures.slice(0, 2).map((failure, index) => ({
			id: failure.id,
			label: failure.title,
			x: 405,
			y: 58 + index * 68,
			kind: "failure"
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "archive-grid border-b border-border bg-bg px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-4xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-5 inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "size-4",
									"aria-hidden": "true"
								}), "Evidence-backed research knowledge graph"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-5xl leading-none tracking-normal text-ink sm:text-6xl lg:text-7xl",
								children: "Study how exceptional minds decide, fail, revise, and build."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-3xl text-lg leading-8 text-muted",
								children: "Lattice turns biographies into inspectable research objects: decisions, assumptions, risks, experiments, failures, sources, confidence, and lessons are separated so success never gets mistaken for proof."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-5 lg:grid-cols-2",
						children: qualityStats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-border bg-surface p-4 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl",
								children: stat.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted",
								children: stat.label
							})]
						}, stat.label))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-border bg-surface px-4 py-6 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-3 lg:grid-cols-[1fr_auto] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-12 items-center gap-3 border border-border bg-paper px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "size-5 text-muted",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search the archive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => {
									setQuery(event.target.value);
									setShowSearchResults(Boolean(event.target.value.trim()));
								},
								onFocus: () => setShowSearchResults(Boolean(query.trim())),
								placeholder: "Search people, decisions, failures, technologies, lessons, and sources",
								className: "w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-subtle"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-12 flex-wrap items-center gap-2",
						children: [
							"all",
							"scientist",
							"entrepreneur",
							"inventor",
							"social"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode(item),
							className: `min-h-11 border px-3 text-sm font-medium capitalize transition ${mode === item ? "border-accent bg-accent text-accent-fg" : "border-border bg-paper text-muted hover:text-ink"}`,
							children: item
						}, item))
					})]
				}), showSearchResults && query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-4 max-w-7xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResults, {
						results: searchResults,
						onSelectPerson: (personId) => {
							setSelectedPersonId(personId);
							setShowSearchResults(false);
							document.getElementById("people")?.scrollIntoView({ behavior: "smooth" });
						}
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "people",
				className: "bg-bg px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						icon: Funnel,
						kicker: "People",
						title: "Browse by evidence, not mythology"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-3",
						children: peopleResults.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedPersonId(person.id),
							className: `border p-4 text-left transition ${selectedPerson?.id === person.id ? "border-accent bg-surface shadow-[var(--shadow-border-hover)]" : "border-border bg-surface hover:border-rule"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl leading-tight",
									children: person.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-sm leading-6 text-muted",
									children: person.knownFor
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-sm border border-border bg-paper px-2 py-1 text-xs text-muted",
									children: person.research.confidence
								})]
							})
						}, person.id))
					})] }), selectedPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border border-border bg-surface shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-muted",
											children: selectedPerson.era
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-2 font-display text-4xl leading-tight",
											children: selectedPerson.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-3xl text-base leading-7 text-muted",
											children: selectedPerson.summary
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-16 place-items-center border border-border bg-paper font-display text-2xl",
										children: selectedPerson.initials
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-px bg-border md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchMetric, {
										label: "Primary sources",
										value: selectedPerson.research.primarySourceCount
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchMetric, {
										label: "Completeness",
										value: `${selectedPerson.research.completeness}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchMetric, {
										label: "Known gaps",
										value: selectedPerson.research.gaps.length
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-px bg-border md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisPanel, {
									title: "Thinking pattern",
									body: selectedPerson.thinking
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisPanel, {
									title: "Anti-survivorship note",
									body: selectedPerson.antiSurvivorship
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/people/$slug",
									params: { slug: selectedPerson.slug },
									className: "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent",
									children: ["Open full profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										className: "size-4",
										"aria-hidden": "true"
									})]
								})
							})
						]
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "timeline",
				className: "border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
							icon: Database,
							kicker: "Timeline",
							title: "Chronology with evidence labels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: ["all", "selected"].map((scope) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTimelineScope(scope),
								disabled: scope === "selected" && !selectedPerson,
								className: `min-h-11 border px-3 text-sm font-medium capitalize transition disabled:opacity-50 ${timelineScope === scope ? "border-accent bg-accent text-accent-fg" : "border-border bg-paper text-muted hover:text-ink"}`,
								children: scope === "all" ? "All people" : selectedPerson ? selectedPerson.name.split(" ").slice(-1)[0] : "Selected"
							}, scope))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-3 lg:grid-cols-2",
						children: timelineEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineRow, {
							event,
							personName: event.personName,
							personSlug: allPeople.find((person) => person.id === event.personId)?.slug
						}, event.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "decisions",
				className: "bg-bg px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						icon: Scale,
						kicker: "Decision analysis",
						title: "Separate decision quality from outcome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 lg:grid-cols-3",
						children: allDecisions.slice(0, 9).map((decision) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecisionCard, { decision }, decision.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "graph",
				className: "border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
							icon: GitBranch,
							kicker: "Knowledge graph",
							title: "Relationships are first-class objects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-7 text-muted",
							children: "This prototype renders a local subgraph for the selected person: decisions connect to failures and lessons instead of being flattened into a single story."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3 sm:grid-cols-2",
							children: [
								catalogStats.experiments,
								catalogStats.technologies,
								catalogStats.discoveries,
								catalogStats.breakthroughs
							].map((count, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-paper p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-3xl",
									children: count
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-muted",
									children: [
										"Experiments",
										"Technologies",
										"Discoveries",
										"Breakthroughs"
									][index]
								})]
							}, index))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphPreview, {
						nodes: graphNodes,
						selectedPersonSlug: selectedPerson?.slug
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "sources",
				className: "bg-bg px-4 py-12 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						icon: BookOpenCheck,
						kicker: "Source explorer",
						title: "Every claim keeps provenance attached"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 lg:grid-cols-3",
						children: sources.slice(0, 9).map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: source.url ?? "#sources",
							target: source.url ? "_blank" : void 0,
							rel: source.url ? "noreferrer" : void 0,
							className: "group border border-border bg-surface p-5 shadow-[var(--shadow-border)] transition hover:border-rule",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-normal text-muted",
									children: source.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-2xl leading-tight group-hover:text-accent",
									children: source.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm leading-6 text-muted",
									children: [
										source.author,
										", ",
										source.year
									]
								}),
								source.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 line-clamp-3 text-sm leading-6 text-muted",
									children: source.excerpt
								}) : null
							]
						}, source.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "learning",
				className: "border-t border-border bg-ink px-4 py-12 text-surface sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						icon: CircleHelp,
						kicker: "Learning mode",
						title: "Questions that resist hero worship",
						inverted: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: lessons.slice(0, 6).map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-surface/15 bg-surface/5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl leading-tight",
									children: lesson.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-6 text-surface/70",
									children: lesson.whatToLearn
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm font-medium text-surface",
									children: lesson.reflection[0]
								})
							]
						}, lesson.id))
					})]
				})
			})
		]
	});
}
function ResearchMetric({ label, value }) {
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
function AnalysisPanel({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-7 text-muted",
			children: body
		})]
	});
}
function GraphPreview({ nodes, selectedPersonSlug }) {
	const root = nodes[0];
	const visibleNodes = nodes.slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden border border-border bg-paper p-4 shadow-[var(--shadow-border)]",
		children: [selectedPersonSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/people/$slug",
			params: { slug: selectedPersonSlug },
			className: "mb-3 inline-flex text-sm font-medium text-accent",
			children: [
				"Explore ",
				root?.label ?? "person",
				" in full profile"
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 560 220",
			role: "img",
			"aria-label": "Knowledge graph preview",
			className: "h-auto w-full",
			children: [root ? visibleNodes.slice(1).map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: root.x + 45,
				y1: root.y + 15,
				x2: node.x,
				y2: node.y + 15,
				className: "stroke-rule",
				strokeWidth: "1.5"
			}, `${root.id}-${node.id}`)) : null, visibleNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: node.x,
				y: node.y,
				width: node.kind === "person" ? 126 : 134,
				height: "32",
				rx: "4",
				className: node.kind === "person" ? "fill-accent" : "fill-surface stroke-border"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: node.x + 10,
				y: node.y + 21,
				className: node.kind === "person" ? "fill-accent-fg" : "fill-ink",
				fontSize: "10",
				fontWeight: "600",
				children: node.label.length > 20 ? `${node.label.slice(0, 20)}...` : node.label
			})] }, node.id))]
		})]
	});
}
//#endregion
export { Home as component };
