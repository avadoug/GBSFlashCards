"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Rotate3D, Shuffle, SlidersHorizontal, Sparkles } from "lucide-react";
import { strains, starterDataNotice } from "@/lib/strains";
import { createShuffleBag, takeNext } from "@/lib/shuffleBag";
import { defaultSettings, emptyProgress, loadProgress, loadQueues, loadSettings, markAnswer, recordView, saveProgress, saveQueues, type ProgressState, type Settings, type StudyMode } from "@/lib/storage";
import { playTone } from "@/lib/sound";
import { StrainCard } from "./card/StrainCard";
import { EmptyState } from "./EmptyState";
import { FilterPanel, emptyFilters, type Filters } from "./study/FilterPanel";
import { ProgressPanel } from "./study/ProgressPanel";
import { SearchBar } from "./study/SearchBar";
import { StudyControls } from "./study/StudyControls";

const modes: { value: StudyMode; label: string; description: string }[] = [
  { value: "standard", label: "Standard mode", description: "Name → full archive" },
  { value: "reverse", label: "Reverse mode", description: "Lineage → name" },
  { value: "parentage", label: "Parentage only", description: "Name → lineage" },
  { value: "missed", label: "Missed strains", description: "Review weak spots" },
  { value: "favorites", label: "Favorites", description: "Study saved cards" },
];

function matchesText(haystack: (string | undefined)[], needle: string) {
  return haystack.filter(Boolean).join(" ").toLowerCase().includes(needle.toLowerCase());
}

export function StudyExperience() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [queues, setQueues] = useState<Record<string, string[]>>({});
  const [mode, setMode] = useState<StudyMode>("standard");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(strains[0]?.id);
  const [hydrated, setHydrated] = useState(false);
  const viewedCurrent = useRef<string | undefined>(undefined);

  useEffect(() => {
    const storedSettings = loadSettings();
    queueMicrotask(() => {
      setSettings(storedSettings);
      setMode(storedSettings.defaultMode);
      setProgress(loadProgress());
      setQueues(loadQueues());
      setHydrated(true);
    });
  }, []);

  const filtered = useMemo(() => strains.filter((strain) => {
    const stats = progress.strains[strain.id];
    if (mode === "missed" && !stats?.missed) return false;
    if (mode === "favorites" && !stats?.favorite) return false;
    if (filters.search && !matchesText([strain.name, strain.parentage.display, strain.breeder, ...(strain.tags ?? []), ...(strain.families ?? []), ...strain.aroma.dominant, ...(strain.aroma.secondary ?? [])], filters.search)) return false;
    if (filters.breeder && strain.breeder !== filters.breeder) return false;
    if (filters.family && !strain.families?.includes(filters.family)) return false;
    if (filters.generation && strain.generation !== filters.generation) return false;
    if (filters.strainType && strain.strainType !== filters.strainType) return false;
    if (filters.effect && ![...(strain.effects.mental ?? []), ...(strain.effects.mood ?? [])].includes(filters.effect)) return false;
    if (filters.aroma && ![...strain.aroma.dominant, ...(strain.aroma.secondary ?? [])].includes(filters.aroma)) return false;
    const maxDays = strain.cultivation.floweringDays?.max;
    if (filters.flowering === "fast" && (!maxDays || maxDays > 60)) return false;
    if (filters.flowering === "medium" && (!maxDays || maxDays <= 60 || maxDays > 75)) return false;
    if (filters.flowering === "long" && (!maxDays || maxDays <= 75)) return false;
    if (filters.environment === "indoor" && !strain.cultivation.indoor) return false;
    if (filters.environment === "outdoor" && !strain.cultivation.outdoor) return false;
    if (filters.confidence && strain.confidence.lineage !== filters.confidence) return false;
    if (filters.progress === "favorites" && !stats?.favorite) return false;
    if (filters.progress === "missed" && !stats?.missed) return false;
    if (filters.progress === "mastered" && !stats?.mastered) return false;
    if (filters.material === "clone" && strain.strainType !== "clone-only") return false;
    if (filters.material === "seed" && strain.strainType === "clone-only") return false;
    if (filters.material === "gbs" && !strain.project?.isGBSProject) return false;
    return true;
  }), [filters, mode, progress.strains]);

  const queueKey = useMemo(() => JSON.stringify({ mode, ...filters }), [filters, mode]);
  const current = strains.find((strain) => strain.id === currentId);

  const persistProgress = useCallback((next: ProgressState) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const advance = useCallback(() => {
    const allowedIds = filtered.map((strain) => strain.id);
    if (!allowedIds.length) { setCurrentId(undefined); setFlipped(false); return; }
    let queue = queues[queueKey] ?? [];
    if (!queue.some((id) => allowedIds.includes(id))) {
      queue = createShuffleBag(allowedIds, [currentId ?? "", ...progress.recentIds].filter(Boolean), progress, settings.weightedReview);
    }
    const result = takeNext(queue, allowedIds, [currentId ?? "", ...progress.recentIds].filter(Boolean));
    const nextQueues = { ...queues, [queueKey]: result.queue };
    setQueues(nextQueues);
    saveQueues(nextQueues);
    setCurrentId(result.id);
    setFlipped(false);
    playTone("next", settings.sound);
  }, [currentId, filtered, progress, queueKey, queues, settings.sound, settings.weightedReview]);

  useEffect(() => {
    if (!hydrated) return;
    if (!currentId || !filtered.some((strain) => strain.id === currentId)) queueMicrotask(advance);
  }, [advance, currentId, filtered, hydrated]);

  useEffect(() => {
    if (!hydrated || !currentId || viewedCurrent.current === currentId) return;
    viewedCurrent.current = currentId;
    persistProgress(recordView(progress, currentId, settings.historyLength));
    // The current ID is the only intentional trigger; progress is read at the moment a new card arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, hydrated]);

  const flip = useCallback(() => {
    setFlipped((value) => !value);
    playTone("flip", settings.sound);
  }, [settings.sound]);

  const answer = useCallback((correct: boolean) => {
    if (!currentId) return;
    persistProgress(markAnswer(progress, currentId, correct));
    playTone(correct ? "correct" : "missed", settings.sound);
    advance();
  }, [advance, currentId, persistProgress, progress, settings.sound]);

  const toggleFavorite = useCallback(() => {
    if (!currentId) return;
    const existing = progress.strains[currentId] ?? { viewed: 0, correct: 0, missed: 0, favorite: false, mastered: false };
    persistProgress({ ...progress, strains: { ...progress.strains, [currentId]: { ...existing, favorite: !existing.favorite } } });
  }, [currentId, persistProgress, progress]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "ArrowRight") { event.preventDefault(); advance(); }
      if (event.key === "1") answer(true);
      if (event.key === "2") answer(false);
      if (event.key.toLowerCase() === "f") toggleFavorite();
      if (event.key.toLowerCase() === "r") setMode((value) => value === "reverse" ? "standard" : "reverse");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance, answer, toggleFavorite]);

  const selectedMode = modes.find((item) => item.value === mode) ?? modes[0];
  const favorite = currentId ? Boolean(progress.strains[currentId]?.favorite) : false;
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <main className="study-page">
      <section className="study-intro">
        <div>
          <p className="eyebrow"><Sparkles size={14} /> Private breeder archive · 001</p>
          <h1>Learn the lineage.<br /><em>Know the plant.</em></h1>
          <p>Flip one strain at a time. Build a memory for the genetics, not just the name.</p>
        </div>
        <ProgressPanel progress={progress} poolCount={filtered.length} />
      </section>

      <section className="study-toolbar" aria-label="Study setup">
        <label className="mode-select">
          <Rotate3D size={18} />
          <span><small>Study mode</small><select value={mode} onChange={(event) => setMode(event.target.value as StudyMode)}>{modes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></span>
          <ChevronDown size={16} />
        </label>
        <span className="mode-description">{selectedMode.description}</span>
        <SearchBar value={filters.search} onChange={(search) => setFilters({ ...filters, search })} placeholder="Search name, lineage, breeder…" />
        <button className="filter-toggle" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} /> Filters {activeFilterCount ? <b>{activeFilterCount}</b> : null}</button>
        <span className="shuffle-indicator"><Shuffle size={15} /> {settings.weightedReview ? "Smart shuffle" : "Pure shuffle"}</span>
      </section>

      <div className="card-stage">
        <div className="stage-orbit orbit-one" aria-hidden="true" />
        <div className="stage-orbit orbit-two" aria-hidden="true" />
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div key={current.id} initial={{ opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.985 }} transition={{ duration: settings.reducedMotion ? 0 : 0.28 }}>
              <StrainCard strain={current} flipped={flipped} onFlip={flip} mode={mode} settings={settings} />
            </motion.div>
          ) : <EmptyState />}
        </AnimatePresence>
      </div>

      {current && <StudyControls favorite={favorite} flipped={flipped} onCorrect={() => answer(true)} onMissed={() => answer(false)} onFavorite={toggleFavorite} onNext={advance} onFlipBack={() => setFlipped(false)} onFilters={() => setFiltersOpen(true)} />}
      <p className="starter-notice">{starterDataNotice}</p>
      <div className="sr-only" aria-live="polite">{current ? `${current.name}. ${flipped ? "Details revealed." : "Front showing."}` : "No strains in the current study set."}</div>
      <FilterPanel open={filtersOpen} filters={filters} onChange={setFilters} onClose={() => setFiltersOpen(false)} />
      {filtersOpen && <button className="panel-scrim" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />}
    </main>
  );
}
