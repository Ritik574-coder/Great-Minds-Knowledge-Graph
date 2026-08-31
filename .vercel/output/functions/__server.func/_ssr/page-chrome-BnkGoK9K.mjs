import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-chrome-BnkGoK9K.js
var import_jsx_runtime = require_jsx_runtime();
function PageChrome({ back, kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [
				"params" in back ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: back.to,
					params: back.params,
					className: "mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-4",
						"aria-hidden": "true"
					}), back.label]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: back.to,
					className: "mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition hover:text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-4",
						"aria-hidden": "true"
					}), back.label]
				}),
				kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-muted",
					children: kicker
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl leading-tight sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children
				})
			]
		})
	});
}
//#endregion
export { PageChrome as t };
