import type { ProgressState } from "./storage";

export type RandomSource = () => number;

export function shuffle<T>(items: T[], random: RandomSource = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createShuffleBag(
  ids: string[],
  recentIds: string[] = [],
  progress?: ProgressState,
  weighted = true,
  random: RandomSource = Math.random,
) {
  if (ids.length <= 1) return [...ids];

  const recentSet = new Set(recentIds);
  const ordinary: string[] = [];
  const recent: string[] = [];

  for (const id of shuffle(ids, random)) {
    const stats = progress?.strains[id];
    const missedBoost = weighted && stats && stats.missed > stats.correct ? Math.min(2, stats.missed - stats.correct) : 0;
    const favoriteBoost = weighted && stats?.favorite ? 1 : 0;
    const masteredPenalty = weighted && stats?.mastered;
    const copies = masteredPenalty ? 1 : 1 + missedBoost + favoriteBoost;
    const destination = recentSet.has(id) ? recent : ordinary;
    for (let copy = 0; copy < copies; copy += 1) destination.push(id);
  }

  const bag = [...shuffle(ordinary, random), ...shuffle(recent, random)];
  const previous = recentIds[0];
  if (bag[0] === previous) {
    const replacement = bag.findIndex((id) => id !== previous);
    if (replacement > 0) [bag[0], bag[replacement]] = [bag[replacement], bag[0]];
  }
  return bag;
}

export function takeNext(queue: string[], allowedIds: string[], recentIds: string[], random: RandomSource = Math.random) {
  if (allowedIds.length === 0) return { id: undefined, queue: [] as string[] };
  if (allowedIds.length === 1) return { id: allowedIds[0], queue: [] as string[] };

  const allowed = new Set(allowedIds);
  const usableQueue = queue.filter((id) => allowed.has(id));
  const nextQueue = usableQueue.length ? usableQueue : createShuffleBag(allowedIds, recentIds, undefined, false, random);
  let index = nextQueue.findIndex((id) => id !== recentIds[0]);
  if (index < 0) index = 0;
  const id = nextQueue[index];
  return { id, queue: nextQueue.filter((_, queueIndex) => queueIndex !== index) };
}

