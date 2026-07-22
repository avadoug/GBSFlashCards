import { beforeEach, describe, expect, it } from "vitest";
import { loadProgress, loadSettings, markAnswer, recordView, saveProgress, saveSettings, defaultSettings, emptyProgress } from "@/lib/storage";

describe("local progress persistence", () => {
  beforeEach(() => localStorage.clear());

  it("persists settings", () => {
    saveSettings({ ...defaultSettings, sound: true, historyLength: 21 });
    expect(loadSettings()).toMatchObject({ sound: true, historyLength: 21 });
  });

  it("persists progress and recent history", () => {
    const viewed = recordView(emptyProgress, "apollo-13", 15);
    saveProgress(viewed);
    expect(loadProgress().strains["apollo-13"].viewed).toBe(1);
    expect(loadProgress().recentIds[0]).toBe("apollo-13");
  });

  it("marks a strain mastered after repeated correct answers", () => {
    let progress = recordView(emptyProgress, "apollo-13");
    progress = markAnswer(progress, "apollo-13", true);
    progress = markAnswer(progress, "apollo-13", true);
    progress = markAnswer(progress, "apollo-13", true);
    expect(progress.strains["apollo-13"].mastered).toBe(true);
  });
});

