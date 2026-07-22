import { describe, expect, it } from "vitest";
import { createShuffleBag, takeNext } from "@/lib/shuffleBag";
import { emptyProgress, type ProgressState } from "@/lib/storage";

const zero = () => 0;

describe("shuffle bag", () => {
  it("returns an empty queue for an empty collection", () => {
    expect(createShuffleBag([])).toEqual([]);
    expect(takeNext([], [], [])).toEqual({ id: undefined, queue: [] });
  });

  it("handles a one-strain collection", () => {
    expect(takeNext([], ["only"], ["only"])).toEqual({ id: "only", queue: [] });
  });

  it("never selects the immediately previous strain when alternatives exist", () => {
    const bag = createShuffleBag(["a", "b", "c"], ["a"], undefined, false, zero);
    expect(bag[0]).not.toBe("a");
  });

  it("shows every pure-bag strain before a reshuffle", () => {
    const ids = ["a", "b", "c", "d"];
    const bag = createShuffleBag(ids, [], undefined, false, zero);
    expect(new Set(bag)).toEqual(new Set(ids));
    expect(bag).toHaveLength(ids.length);
  });

  it("moves recently seen IDs behind fresh IDs", () => {
    const bag = createShuffleBag(["a", "b", "c", "d"], ["a", "b"], undefined, false, zero);
    expect(bag.slice(0, 2).every((id) => id === "c" || id === "d")).toBe(true);
  });

  it("weights missed strains more heavily", () => {
    const progress: ProgressState = { ...emptyProgress, strains: { a: { viewed: 3, correct: 0, missed: 3, favorite: false, mastered: false } } };
    const bag = createShuffleBag(["a", "b"], [], progress, true, zero);
    expect(bag.filter((id) => id === "a").length).toBeGreaterThan(bag.filter((id) => id === "b").length);
  });

  it("drops queued IDs that no longer match a filter", () => {
    const next = takeNext(["a", "b", "c"], ["b", "c"], ["a"], zero);
    expect(next.id).not.toBe("a");
    expect(next.queue).not.toContain("a");
  });

  it("handles small filtered collections without looping", () => {
    const first = takeNext([], ["a", "b"], ["a"], zero);
    expect(first.id).toBe("b");
    const second = takeNext(first.queue, ["a", "b"], ["b"], zero);
    expect(second.id).toBe("a");
  });
});

