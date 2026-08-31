import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as getSources } from "./router-BaDMtqh8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/source-list-BJhp_4a2.js
var import_jsx_runtime = require_jsx_runtime();
function SourceList({ sourceIds, compact = false }) {
	const resolved = getSources(sourceIds);
	if (!resolved.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No sources linked."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: `grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`,
		children: resolved.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceItem, {
			source,
			compact
		}, source.id))
	});
}
function SourceItem({ source, compact }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-normal text-muted",
			children: source.type
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 font-medium text-ink ${compact ? "text-sm" : "font-display text-lg leading-tight"}`,
			children: source.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted",
			children: [
				source.author,
				", ",
				source.year
			]
		}),
		!compact && source.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-6 text-muted",
			children: source.excerpt
		}) : null
	] });
	if (source.url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: source.url,
		target: "_blank",
		rel: "noreferrer",
		className: "block border border-border bg-paper p-4 transition hover:border-rule",
		children: content
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "border border-border bg-paper p-4",
		children: content
	});
}
//#endregion
export { SourceList as t };
