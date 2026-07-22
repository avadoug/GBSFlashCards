import { D as __toESM, b as require_react, t as require_jsx_runtime } from "../index.js";
import { t as createLucideIcon } from "./createLucideIcon-DHAsida3.js";
import { t as Settings } from "./settings-L8rQYziL.js";
import { a as loadSettings, c as resetLocalData, d as saveSettings, t as defaultSettings } from "./storage-CFys0fVm.js";
import { n as Check, t as RotateCcw } from "./rotate-ccw-CXbkoANB.js";
//#region node_modules/lucide-react/dist/esm/icons/volume-2.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Volume2 = createLucideIcon("volume-2", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["path", {
		d: "M16 9a5 5 0 0 1 0 6",
		key: "1q6k2b"
	}],
	["path", {
		d: "M19.364 18.364a9 9 0 0 0 0-12.728",
		key: "ijwkga"
	}]
]);
//#endregion
//#region app/settings/SettingsClient.tsx
var import_jsx_runtime = require_jsx_runtime();
function SettingsClient() {
	const [settings, setSettings] = (0, import_react.useState)(defaultSettings);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => setSettings(loadSettings()));
	}, []);
	const update = (key, value) => {
		const next = {
			...settings,
			[key]: value
		};
		setSettings(next);
		saveSettings(next);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1400);
	};
	const reset = () => {
		if (window.confirm("Reset all study history, favorites, queues, and preferences on this device?")) {
			resetLocalData();
			setSettings(defaultSettings);
			window.location.reload();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "content-page settings-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 14 }), " Archive preferences"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Tune your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "study room." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Preferences and progress live only in this browser. Sound is off by default and no account is required." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "settings-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "settings-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "settings-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Motion & feel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Card experience" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Animation intensity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Adjust the weight of card movement." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: settings.animationIntensity,
								onChange: (event) => update("animationIntensity", event.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "low",
										children: "Low"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "standard",
										children: "Standard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "high",
										children: "Cinematic"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reduced motion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Minimize flips and page transitions." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: settings.reducedMotion,
								onChange: (event) => update("reducedMotion", event.target.checked)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Information density" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Control spacing in archive panels." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: settings.density,
								onChange: (event) => update("density", event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "comfortable",
									children: "Comfortable"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "compact",
									children: "Compact"
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "settings-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "settings-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review logic" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Study behavior" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Weighted review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Raise missed cards and slightly favor saved cards." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: settings.weightedReview,
								onChange: (event) => update("weightedReview", event.target.checked)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Recent-history length" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Protect recent cards from early reshuffles." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 3,
								max: 50,
								value: settings.historyLength,
								onChange: (event) => update("historyLength", Math.max(3, Math.min(50, Number(event.target.value))))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Default study mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "How a new session opens." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: settings.defaultMode,
								onChange: (event) => update("defaultMode", event.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "standard",
										children: "Standard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "reverse",
										children: "Reverse"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "parentage",
										children: "Parentage only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "missed",
										children: "Missed strains"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "favorites",
										children: "Favorites"
									})
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "settings-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "settings-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Optional audio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 20 }), " Quiet cues"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sound effects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Soft synthesized flip and answer tones. Off by default." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: settings.sound,
							onChange: (event) => update("sound", event.target.checked)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "settings-card danger-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "settings-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Local data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Reset archive progress" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Removes study history, answer counts, favorites, queues, streaks, and saved preferences from this browser." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: reset,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 17 }), " Reset all progress"]
							})
						]
					})
				]
			}),
			saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "save-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), " Preference saved locally"]
			})
		]
	});
}
//#endregion
export { SettingsClient };
