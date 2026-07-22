export type StudyMode = "standard" | "reverse" | "parentage" | "missed" | "favorites";

export type StrainProgress = {
  viewed: number;
  correct: number;
  missed: number;
  favorite: boolean;
  mastered: boolean;
  lastViewed?: string;
};

export type ProgressState = {
  version: 1;
  strains: Record<string, StrainProgress>;
  recentIds: string[];
  totalViewed: number;
  currentStreak: number;
  lastStudyDate?: string;
};

export type Settings = {
  weightedReview: boolean;
  historyLength: number;
  sound: boolean;
  reducedMotion: boolean;
  animationIntensity: "low" | "standard" | "high";
  defaultMode: StudyMode;
  density: "comfortable" | "compact";
};

export const defaultSettings: Settings = {
  weightedReview: true,
  historyLength: 15,
  sound: false,
  reducedMotion: false,
  animationIntensity: "standard",
  defaultMode: "standard",
  density: "comfortable",
};

export const emptyProgress: ProgressState = {
  version: 1,
  strains: {},
  recentIds: [],
  totalViewed: 0,
  currentStreak: 0,
};

const PROGRESS_KEY = "gbs-strain-flip:progress:v1";
const SETTINGS_KEY = "gbs-strain-flip:settings:v1";
const QUEUE_KEY = "gbs-strain-flip:queues:v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? ({ ...fallback, ...JSON.parse(value) } as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadProgress() {
  return read<ProgressState>(PROGRESS_KEY, emptyProgress);
}

export function saveProgress(progress: ProgressState) {
  if (typeof window !== "undefined") window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function loadSettings() {
  return read<Settings>(SETTINGS_KEY, defaultSettings);
}

export function saveSettings(settings: Settings) {
  if (typeof window !== "undefined") window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadQueues(): Record<string, string[]> {
  return read<Record<string, string[]>>(QUEUE_KEY, {});
}

export function saveQueues(queues: Record<string, string[]>) {
  if (typeof window !== "undefined") window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queues));
}

export function resetLocalData() {
  if (typeof window === "undefined") return;
  [PROGRESS_KEY, SETTINGS_KEY, QUEUE_KEY].forEach((key) => window.localStorage.removeItem(key));
}

export function recordView(progress: ProgressState, strainId: string, historyLength = 15): ProgressState {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const nextStreak =
    progress.lastStudyDate === today
      ? progress.currentStreak
      : progress.lastStudyDate === yesterday
        ? progress.currentStreak + 1
        : 1;
  const current = progress.strains[strainId] ?? { viewed: 0, correct: 0, missed: 0, favorite: false, mastered: false };
  return {
    ...progress,
    totalViewed: progress.totalViewed + 1,
    currentStreak: nextStreak,
    lastStudyDate: today,
    recentIds: [strainId, ...progress.recentIds.filter((id) => id !== strainId)].slice(0, historyLength),
    strains: {
      ...progress.strains,
      [strainId]: { ...current, viewed: current.viewed + 1, lastViewed: new Date().toISOString() },
    },
  };
}

export function markAnswer(progress: ProgressState, strainId: string, correct: boolean): ProgressState {
  const current = progress.strains[strainId] ?? { viewed: 0, correct: 0, missed: 0, favorite: false, mastered: false };
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
        mastered: nextCorrect >= 3 && nextCorrect >= nextMissed * 2,
      },
    },
  };
}

