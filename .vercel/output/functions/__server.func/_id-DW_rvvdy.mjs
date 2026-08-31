import { _ as Link, b as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { M as personById, r as Route$1, w as getFailuresForPerson, x as getDecisionsForPerson } from "./_ssr/router-BaDMtqh8.mjs";
import { t as PageChrome } from "./_ssr/page-chrome-BnkGoK9K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DW_rvvdy.js
var import_jsx_runtime = require_jsx_runtime();
function LessonPage() {
	const { lesson } = Route$1.useLoaderData();
	const linkedPeople = lesson.personIds.map((id) => personById[id]).filter(Boolean);
	const firstPerson = linkedPeople[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageChrome, {
		back: firstPerson ? {
			to: "/people/$slug",
			params: { slug: firstPerson.slug },
			label: `Back to ${firstPerson.name}`
		} : {
			to: "/",
			label: "Back to archive"
		},
		kicker: "Learning case study",
		title: lesson.title,
		children: [
			linkedPeople.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: linkedPeople.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/people/$slug",
					params: { slug: person.slug },
					className: "inline-flex items-center gap-2 rounded-sm border border-border bg-paper px-3 py-1.5 text-sm font-medium text-accent transition hover:border-rule",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-6 shrink-0 place-items-center bg-accent/10 text-xs font-bold text-accent",
						children: person.initials
					}), person.name]
				}, person.id))
			}),
			lesson.mentalModel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-sm font-medium text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-ink",
						children: "Mental model:"
					}),
					" ",
					lesson.mentalModel
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonSection, {
						title: "What happened",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-ink",
							children: lesson.whatHappened
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonSection, {
						title: "Why it matters",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-ink",
							children: lesson.whyItMatters
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonSection, {
						title: "What to learn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-ink",
							children: lesson.whatToLearn
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonSection, {
						title: "What to question",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-ink",
							children: lesson.whatToQuestion
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LessonSection, {
						title: "Evidence & uncertainty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
							label: "Evidence note",
							value: lesson.evidenceNote
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBlock, {
							label: "What is uncertain",
							value: lesson.uncertain
						})]
					}),
					lesson.reflection.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-border bg-ink p-6 text-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Reflection questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-surface/60",
								children: "These questions resist hero worship — push past the outcome to the process."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 grid gap-4",
								children: lesson.reflection.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border border-surface/15 bg-surface/5 p-4 text-sm leading-7 text-surface/90",
									children: q
								}, i))
							})
						]
					}),
					linkedPeople.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonSection, {
						title: "Explore the people",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: linkedPeople.map((person) => {
								const decisions = getDecisionsForPerson(person.id);
								const personFailures = getFailuresForPerson(person.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/people/$slug",
									params: { slug: person.slug },
									className: "group block border border-border bg-paper p-5 transition hover:border-rule",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl leading-tight group-hover:text-accent",
												children: person.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted",
												children: person.era
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-10 shrink-0 place-items-center border border-border bg-ink font-display text-sm text-surface",
												children: person.initials
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 line-clamp-2 text-sm leading-6 text-muted",
											children: person.knownFor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-xs text-muted",
											children: [
												decisions.length,
												" decisions · ",
												personFailures.length,
												" failures"
											]
										})
									]
								}, person.id);
							})
						})
					})
				]
			})
		]
	});
}
function LessonSection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border border-border bg-surface p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function DetailBlock({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 first:mt-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm leading-7 text-ink",
			children: value
		})]
	});
}
//#endregion
export { LessonPage as component };
