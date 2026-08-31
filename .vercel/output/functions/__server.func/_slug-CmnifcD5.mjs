import { _ as Link, y as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { f as failureById, i as Route$2, v as getPerson, x as lessonById } from "./_ssr/router-DvDRwfPC.mjs";
import { n as SourceList, t as PageChrome } from "./_ssr/source-list-xKLX-Wyt.mjs";
import { t as EvidenceBadge } from "./_ssr/evidence-badge-DQvS5edw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CmnifcD5.js
var import_jsx_runtime = require_jsx_runtime();
function DecisionPage() {
	const { decision } = Route$2.useLoaderData();
	const person = getPerson(decision.personId);
	const relatedFailures = (decision.relatedFailureIds ?? []).map((id) => failureById[id]).filter(Boolean);
	const relatedLessons = (decision.lessons ?? []).map((id) => lessonById[id]).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageChrome, {
		back: person ? {
			to: "/people/$slug",
			params: { slug: person.slug },
			label: `Back to ${person.name}`
		} : {
			to: "/",
			label: "Back to archive"
		},
		kicker: person ? `${person.name} · ${decision.year}` : String(decision.year),
		title: decision.title,
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
					evidence: decision.evidence,
					confidence: decision.confidence
				}), decision.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-sm border border-border bg-paper px-2 py-1 text-xs capitalize text-muted",
					children: category.replaceAll("-", " ")
				}, category))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Uncertainty",
						value: decision.uncertainty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Reversibility",
						value: decision.reversibility.replaceAll("-", " ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Outcome",
						value: decision.outcome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Decision quality",
						value: decision.decisionQuality.replaceAll("-", " ")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 border border-border bg-paper p-4 text-sm leading-7 text-muted",
				children: decision.qualityVsOutcome
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Context & problem",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Context",
								value: decision.context
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Problem",
								value: decision.problem
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Goal",
								value: decision.goal
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Information at decision time",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Available information",
								value: decision.availableInformation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Unknown information",
								value: decision.unknownInformation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Assumptions",
								value: decision.assumptions.join(" · ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Options considered",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "grid gap-3",
								children: decision.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: `border p-4 ${option.chosen ? "border-accent bg-surface" : "border-border bg-paper"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											children: [option.label, option.chosen ? " (chosen)" : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceBadge, { evidence: option.evidence })]
									}), option.reasoning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-6 text-muted",
										children: option.reasoning
									}) : null]
								}, option.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Chosen path",
								value: decision.chosen
							}),
							decision.rejected.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Rejected options",
								value: decision.rejected.join(" · ")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Reasoning",
								value: decision.reasoning
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Risks, resources & constraints",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Risks accepted",
								value: decision.risksAccepted.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Risks rejected",
								value: decision.risksRejected.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Resources",
								value: decision.resources
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Constraints",
								value: decision.constraints
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Time pressure",
								value: decision.timePressure
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "People involved",
								value: decision.peopleInvolved.join(", ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Execution & communication",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Communication",
							value: decision.communication
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Execution",
							value: decision.execution
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: "Outcomes",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Short-term result",
								value: decision.shortTerm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "Long-term result",
								value: decision.longTerm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "What worked",
								value: decision.whatWorked
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "What failed",
								value: decision.whatFailed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
								label: "What changed afterward",
								value: decision.whatChanged
							})
						]
					}),
					relatedFailures.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Linked failures",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: relatedFailures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/failures/$slug",
								params: { slug: failure.slug },
								className: "block border border-border bg-paper p-4 transition hover:border-rule",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: failure.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: failure.whatHappened
								})]
							}) }, failure.id))
						})
					}) : null,
					relatedLessons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Lessons",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-3",
							children: relatedLessons.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border border-border bg-paper p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: lesson.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: lesson.whatToLearn
								})]
							}, lesson.id))
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Sources",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, { sourceIds: decision.sourceIds })
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
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-paper p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium capitalize",
			children: value
		})]
	});
}
//#endregion
export { DecisionPage as component };
