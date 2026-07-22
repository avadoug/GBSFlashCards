import { D as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import { t as Link } from "./link-0oMwb4X1.js";
import { t as createLucideIcon } from "./createLucideIcon-DHAsida3.js";
import { t as ChartColumn } from "./chart-column-DQInvaY8.js";
import { i as strains, t as Heart } from "./heart-BBpqebZ-.js";
import { n as emptyProgress, r as loadProgress } from "./storage-CFys0fVm.js";
import { n as Flame, t as Target } from "./target-BacBSq_e.js";
//#region node_modules/lucide-react/dist/esm/icons/award.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Award = createLucideIcon("award", [["path", {
	d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	key: "1yiouv"
}], ["circle", {
	cx: "12",
	cy: "8",
	r: "6",
	key: "1vp47v"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
//#endregion
//#region app/statistics/StatisticsDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ icon: Icon, label, value, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "stat-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 19 }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: note })
		]
	});
}
function StatisticsDashboard() {
	const [progress, setProgress] = (0, import_react.useState)(emptyProgress);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => setProgress(loadProgress()));
	}, []);
	const data = (0, import_react.useMemo)(() => {
		const entries = Object.entries(progress.strains);
		const correct = entries.reduce((total, [, value]) => total + value.correct, 0);
		const missed = entries.reduce((total, [, value]) => total + value.missed, 0);
		const studied = entries.filter(([, value]) => value.viewed > 0).length;
		const favorite = entries.filter(([, value]) => value.favorite).length;
		const mastered = entries.filter(([, value]) => value.mastered).length;
		const byBreeder = /* @__PURE__ */ new Map();
		const byFamily = /* @__PURE__ */ new Map();
		for (const [id, value] of entries) {
			if (!value.viewed) continue;
			const strain = strains.find((item) => item.id === id);
			if (!strain) continue;
			byBreeder.set(strain.breeder ?? "Unknown", (byBreeder.get(strain.breeder ?? "Unknown") ?? 0) + value.viewed);
			strain.families?.forEach((family) => byFamily.set(family, (byFamily.get(family) ?? 0) + value.viewed));
		}
		return {
			correct,
			missed,
			studied,
			favorite,
			mastered,
			accuracy: correct + missed ? Math.round(correct / (correct + missed) * 100) : 0,
			breeders: [...byBreeder].sort((a, b) => b[1] - a[1]).slice(0, 6),
			families: [...byFamily].sort((a, b) => b[1] - a[1]).slice(0, 6)
		};
	}, [progress]);
	const max = Math.max(1, ...data.breeders.map(([, value]) => value), ...data.families.map(([, value]) => value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "content-page stats-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 14 }), " Local study intelligence"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Your archive ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "pulse." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Progress stays on this device. Use these signals to find weak lineages and build a more deliberate review set." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "stats-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Target,
						label: "Accuracy",
						value: `${data.accuracy}%`,
						note: `${data.correct} correct answers`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: TrendingUp,
						label: "Strains studied",
						value: data.studied,
						note: `${progress.totalViewed} total card views`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: CircleX,
						label: "Missed answers",
						value: data.missed,
						note: "Weighted review raises these cards"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Award,
						label: "Mastered",
						value: data.mastered,
						note: "3+ correct at a 2:1 ratio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Heart,
						label: "Favorites",
						value: data.favorite,
						note: "Saved to your private set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Flame,
						label: "Study streak",
						value: progress.currentStreak,
						note: progress.lastStudyDate ? `Last session ${progress.lastStudyDate}` : "Start your first session"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "chart-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bar-chart",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chart-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Collection depth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Progress by breeder" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/?mode=breeder",
							children: "Study breeders"
						})]
					}), data.breeders.length ? data.breeders.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bar-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Math.max(8, value / max * 100)}%` } }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })
						]
					}, label)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chart-empty",
						children: "Study a few cards to reveal breeder patterns."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bar-chart",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chart-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Genetic map" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Progress by family" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/library",
							children: "View library"
						})]
					}), data.families.length ? data.families.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bar-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "purple",
								style: { width: `${Math.max(8, value / max * 100)}%` }
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })
						]
					}, label)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chart-empty",
						children: "Your family map will grow as you study."
					})]
				})]
			})
		]
	});
}
//#endregion
export { StatisticsDashboard };
