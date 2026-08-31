import { _ as Link, b as require_jsx_runtime, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Plus, s as Minus, u as GitCompare, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as getExperimentsForPerson, D as getQuotesForPerson, N as personBySlug, S as getDiscoveriesForPerson, T as getLessonsForPerson, c as allPeople, k as getTechnologiesForPerson, o as Route$4, w as getFailuresForPerson, x as getDecisionsForPerson, y as getBreakthroughsForPerson } from "./router-BaDMtqh8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-CgeebpWF.js
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_SLUGS = ["alan-turing", "marie-curie"];
function ComparePage() {
	const { a, b } = Route$4.useSearch();
	const navigate = useNavigate({ from: "/compare" });
	const personA = (a ? personBySlug[a] : void 0) ?? personBySlug[DEFAULT_SLUGS[0]] ?? allPeople[0];
	const personB = (b ? personBySlug[b] : void 0) ?? personBySlug[DEFAULT_SLUGS[1]] ?? allPeople[1];
	function pickA(slug) {
		navigate({ search: (prev) => ({
			...prev,
			a: slug
		}) });
	}
	function pickB(slug) {
		navigate({ search: (prev) => ({
			...prev,
			b: slug
		}) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "top",
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-surface px-4 py-8 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompare, {
						className: "size-6 text-accent",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl",
						children: "Compare"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Side-by-side analysis of decision patterns, failure histories, and thinking styles — derived from the same evidence-backed catalog."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonPicker, {
						label: "Person A",
						selected: personA,
						onChange: pickA,
						exclude: personB?.slug,
						accent: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonPicker, {
						label: "Person B",
						selected: personB,
						onChange: pickB,
						exclude: personA?.slug
					})]
				})]
			})
		}), personA && personB ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-px bg-border sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonHeaderCard, {
					person: personA,
					colorClass: "bg-accent text-accent-fg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonHeaderCard, { person: personB })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CompareSection, {
						title: "Fields & era",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Era",
								a: personA.era,
								b: personB.era
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Fields",
								a: personA.fields.join(", "),
								b: personB.fields.join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Roles",
								a: personA.roles.join(", "),
								b: personB.roles.join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Nationality",
								a: personA.nationality.join(", "),
								b: personB.nationality.join(", ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CompareSection, {
						title: "Research quality",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Confidence",
								a: personA.research.confidence,
								b: personB.research.confidence
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Completeness",
								a: `${personA.research.completeness}%`,
								b: `${personB.research.completeness}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Primary sources",
								a: String(personA.research.primarySourceCount),
								b: String(personB.research.primarySourceCount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Known gaps",
								a: String(personA.research.gaps.length),
								b: String(personB.research.gaps.length)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CompareSection, {
						title: "Knowledge record",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Decisions",
								personA,
								personB,
								getter: getDecisionsForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Failures",
								personA,
								personB,
								getter: getFailuresForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Breakthroughs",
								personA,
								personB,
								getter: getBreakthroughsForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Experiments",
								personA,
								personB,
								getter: getExperimentsForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Technologies",
								personA,
								personB,
								getter: getTechnologiesForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Discoveries",
								personA,
								personB,
								getter: getDiscoveriesForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Lessons",
								personA,
								personB,
								getter: getLessonsForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCountRow, {
								label: "Quotes",
								personA,
								personB,
								getter: getQuotesForPerson
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Principles",
								a: String(personA.principles.length),
								b: String(personB.principles.length)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareRow, {
								label: "Collaborators",
								a: String(personA.collaborators.length),
								b: String(personB.collaborators.length)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareSection, {
						title: "Thinking pattern",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-px bg-border sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongTextCell, { value: personA.thinking }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongTextCell, { value: personB.thinking })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareSection, {
						title: "Anti-survivorship note",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-px bg-border sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongTextCell, { value: personA.antiSurvivorship }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LongTextCell, { value: personB.antiSurvivorship })]
						})
					}),
					(personA.successFactors.length > 0 || personB.successFactors.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareSection, {
						title: "Success factors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-px bg-border sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactorList, { factors: personA.successFactors }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactorList, { factors: personB.successFactors })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareSection, {
						title: "Open their profiles",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileLink, { person: personA }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileLink, { person: personB })]
						})
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 py-16 text-center text-muted sm:px-6 lg:px-8",
			children: "Select two people above to compare them."
		})]
	});
}
function PersonPicker({ label, selected, onChange, exclude, accent }) {
	const options = allPeople.filter((p) => p.slug !== exclude).sort((a, b) => a.name.localeCompare(b.name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "block text-xs font-semibold uppercase tracking-wide text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value: selected?.slug ?? "",
		onChange: (e) => onChange(e.target.value),
		className: `mt-2 w-full border px-3 py-2.5 text-sm font-medium focus:outline-none ${accent ? "border-accent bg-accent text-accent-fg" : "border-border bg-paper text-ink"}`,
		children: options.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
			value: p.slug,
			children: [
				p.name,
				" (",
				p.era,
				")"
			]
		}, p.id))
	})] });
}
function PersonHeaderCard({ person, colorClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `p-6 ${colorClass ?? "bg-surface"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs font-medium uppercase tracking-wide ${colorClass ? "text-accent-fg/70" : "text-muted"}`,
					children: person.era
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl leading-tight",
					children: person.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-2 text-sm leading-6 ${colorClass ? "text-accent-fg/80" : "text-muted"}`,
					children: person.knownFor
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid size-14 shrink-0 place-items-center border font-display text-xl ${colorClass ? "border-accent-fg/20 bg-accent-fg/10 text-accent-fg" : "border-border bg-paper text-ink"}`,
				children: person.initials
			})]
		})
	});
}
function CompareSection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-3 font-display text-2xl text-ink",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border border-border bg-surface",
		children
	})] });
}
function CompareRow({ label, a, b }) {
	const same = a.toLowerCase() === b.toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-px bg-border sm:grid-cols-[160px_1fr_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 bg-surface px-4 py-3 text-sm text-ink",
				children: [
					a,
					!same && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3 text-muted" })
					}),
					same && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3 text-muted" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center bg-surface px-4 py-3 text-sm text-ink",
				children: b
			})
		]
	});
}
function CompareCountRow({ label, personA, personB, getter }) {
	const countA = getter(personA.id).length;
	const countB = getter(personB.id).length;
	const higher = countA > countB ? "a" : countB > countA ? "b" : "same";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-px bg-border sm:grid-cols-[160px_1fr_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center bg-paper px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex items-center px-4 py-3 text-sm font-medium ${higher === "a" ? "bg-accent/10 text-accent" : "bg-surface text-ink"}`,
				children: countA
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex items-center px-4 py-3 text-sm font-medium ${higher === "b" ? "bg-accent/10 text-accent" : "bg-surface text-ink"}`,
				children: countB
			})
		]
	});
}
function LongTextCell({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-surface p-5 text-sm leading-7 text-ink",
		children: value
	});
}
function FactorList({ factors }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-surface p-5",
		children: factors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Not recorded."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-2",
			children: factors.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium capitalize text-ink",
					children: f.factor.replaceAll("-", " ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-muted",
					children: f.role
				})]
			}, i))
		})
	});
}
function ProfileLink({ person }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/people/$slug",
		params: { slug: person.slug },
		className: "group flex items-center justify-between border border-border bg-paper p-5 transition hover:border-rule",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl group-hover:text-accent",
			children: person.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: person.knownFor
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
			className: "size-4 shrink-0 text-muted transition group-hover:text-accent",
			"aria-hidden": true
		})]
	});
}
//#endregion
export { ComparePage as component };
