import { D as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import { t as Link } from "./link-0oMwb4X1.js";
import { t as createLucideIcon } from "./createLucideIcon-DHAsida3.js";
import { t as Library } from "./library-C7bNftoE.js";
import { a as SlidersHorizontal, i as Dna, r as ConfidenceBadge, t as SearchBar } from "./SearchBar-Ba0-C8wR.js";
import { i as strains, n as families, t as Heart } from "./heart-BBpqebZ-.js";
import { l as saveProgress, n as emptyProgress, r as loadProgress } from "./storage-CFys0fVm.js";
//#region node_modules/lucide-react/dist/esm/icons/arrow-up-right.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
//#endregion
//#region app/library/LibraryClient.tsx
var import_jsx_runtime = require_jsx_runtime();
function LibraryClient() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [family, setFamily] = (0, import_react.useState)("");
	const [progress, setProgress] = (0, import_react.useState)(emptyProgress);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => setProgress(loadProgress()));
	}, []);
	const visible = (0, import_react.useMemo)(() => strains.filter((strain) => {
		const text = [
			strain.name,
			strain.breeder,
			strain.parentage.display,
			...strain.tags ?? [],
			...strain.families ?? []
		].join(" ").toLowerCase();
		return (!search || text.includes(search.toLowerCase())) && (!family || strain.families?.includes(family));
	}), [family, search]);
	const favorite = (id) => {
		const current = progress.strains[id] ?? {
			viewed: 0,
			correct: 0,
			missed: 0,
			favorite: false,
			mastered: false
		};
		const next = {
			...progress,
			strains: {
				...progress.strains,
				[id]: {
					...current,
					favorite: !current.favorite
				}
			}
		};
		setProgress(next);
		saveProgress(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "content-page library-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { size: 14 }),
							" Genetic index · ",
							strains.length,
							" records"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["The strain ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "library." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Browse lineages, breeder families, project records, and confidence notes. Every archive entry is designed to show what is known—and what is not." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "library-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						value: search,
						onChange: setSearch,
						placeholder: "Search strains, lineage, breeders, tags…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: family,
						onChange: (event) => setFamily(event.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All genetic families"
						}), families.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item,
							children: item
						}, item))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [visible.length, " records"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "library-grid",
				children: visible.map((strain) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "strain-tile",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tile-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: strain.project?.isGBSProject ? "GBS project" : strain.strainType?.replace("-", " ") ?? "unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => favorite(strain.id),
								"aria-label": `${progress.strains[strain.id]?.favorite ? "Remove" : "Add"} ${strain.name} ${progress.strains[strain.id]?.favorite ? "from" : "to"} favorites`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									size: 17,
									fill: progress.strains[strain.id]?.favorite ? "currentColor" : "none"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tile-seal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dna, { size: 26 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: strain.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: strain.breeder ?? "Breeder not documented" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tile-lineage",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Parentage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: strain.parentage.display })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tile-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { level: strain.confidence.lineage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: `/strain/${strain.id}`,
								"aria-label": `Open ${strain.name} archive record`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
							})]
						})
					]
				}, strain.id))
			}),
			!visible.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-state",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No archive records match" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try a broader search or clear the family filter." })]
			})
		]
	});
}
//#endregion
export { LibraryClient };
