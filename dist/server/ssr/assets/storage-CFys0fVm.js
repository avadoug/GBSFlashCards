//#region lib/storage.ts
var defaultSettings = {
	weightedReview: true,
	historyLength: 15,
	sound: false,
	reducedMotion: false,
	animationIntensity: "standard",
	defaultMode: "standard",
	density: "comfortable"
};
var emptyProgress = {
	version: 1,
	strains: {},
	recentIds: [],
	totalViewed: 0,
	currentStreak: 0
};
var PROGRESS_KEY = "gbs-strain-flip:progress:v1";
var SETTINGS_KEY = "gbs-strain-flip:settings:v1";
var QUEUE_KEY = "gbs-strain-flip:queues:v1";
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const value = window.localStorage.getItem(key);
		return value ? {
			...fallback,
			...JSON.parse(value)
		} : fallback;
	} catch {
		return fallback;
	}
}
function loadProgress() {
	return read(PROGRESS_KEY, emptyProgress);
}
function saveProgress(progress) {
	if (typeof window !== "undefined") window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
function loadSettings() {
	return read(SETTINGS_KEY, defaultSettings);
}
function saveSettings(settings) {
	if (typeof window !== "undefined") window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
function loadQueues() {
	return read(QUEUE_KEY, {});
}
function saveQueues(queues) {
	if (typeof window !== "undefined") window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queues));
}
function resetLocalData() {
	if (typeof window === "undefined") return;
	[
		PROGRESS_KEY,
		SETTINGS_KEY,
		QUEUE_KEY
	].forEach((key) => window.localStorage.removeItem(key));
}
function recordView(progress, strainId, historyLength = 15) {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const yesterday = (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().slice(0, 10);
	const nextStreak = progress.lastStudyDate === today ? progress.currentStreak : progress.lastStudyDate === yesterday ? progress.currentStreak + 1 : 1;
	const current = progress.strains[strainId] ?? {
		viewed: 0,
		correct: 0,
		missed: 0,
		favorite: false,
		mastered: false
	};
	return {
		...progress,
		totalViewed: progress.totalViewed + 1,
		currentStreak: nextStreak,
		lastStudyDate: today,
		recentIds: [strainId, ...progress.recentIds.filter((id) => id !== strainId)].slice(0, historyLength),
		strains: {
			...progress.strains,
			[strainId]: {
				...current,
				viewed: current.viewed + 1,
				lastViewed: (/* @__PURE__ */ new Date()).toISOString()
			}
		}
	};
}
function markAnswer(progress, strainId, correct) {
	const current = progress.strains[strainId] ?? {
		viewed: 0,
		correct: 0,
		missed: 0,
		favorite: false,
		mastered: false
	};
	const nextCorrect = current.correct + (correct ? 1 : 0);
	const nextMissed = current.missed + (correct ? 0 : 1);
	return {
		...progress,
		strains: {
			...progress.strains,
			[strainId]: {
				...current,
				correct: nextCorrect,
				missed: nextMissed,
				mastered: nextCorrect >= 3 && nextCorrect >= nextMissed * 2
			}
		}
	};
}
//#endregion
export { loadSettings as a, resetLocalData as c, saveSettings as d, loadQueues as i, saveProgress as l, emptyProgress as n, markAnswer as o, loadProgress as r, recordView as s, defaultSettings as t, saveQueues as u };
