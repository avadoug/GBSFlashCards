"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Dna, Heart, Library, SlidersHorizontal } from "lucide-react";
import { families, strains } from "@/lib/strains";
import { collectionOptions } from "@/lib/breeders";
import { emptyProgress, loadProgress, saveProgress, type ProgressState } from "@/lib/storage";
import { ConfidenceBadge } from "../components/ConfidenceBadge";
import { SearchBar } from "../components/study/SearchBar";
import { DocumentationTierBadge } from "../components/DocumentationTierBadge";

export function LibraryClient() {
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState("");
  const [collection, setCollection] = useState("");
  const [tier, setTier] = useState("");
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  useEffect(() => { queueMicrotask(() => {
    setProgress(loadProgress());
    const requestedCollection = new URLSearchParams(window.location.search).get("collection");
    if (requestedCollection && collectionOptions.some((item) => item.value === requestedCollection)) setCollection(requestedCollection);
  }); }, []);
  const visible = useMemo(() => strains.filter((strain) => {
    const text = [strain.name, strain.breeder, strain.parentage.display, ...(strain.tags ?? []), ...(strain.families ?? [])].join(" ").toLowerCase();
    return (!search || text.includes(search.toLowerCase()))
      && (!family || strain.families?.includes(family))
      && (!collection || strain.collection?.slug === collection)
      && (!tier || strain.documentationTier === tier);
  }), [collection, family, search, tier]);

  const favorite = (id: string) => {
    const current = progress.strains[id] ?? { viewed: 0, correct: 0, missed: 0, favorite: false, mastered: false };
    const next = { ...progress, strains: { ...progress.strains, [id]: { ...current, favorite: !current.favorite } } };
    setProgress(next); saveProgress(next);
  };

  return <main className="content-page library-page">
    <section className="page-hero">
      <p className="eyebrow"><Library size={14} /> Genetic index · {strains.length} records</p>
      <h1>The strain <em>library.</em></h1>
      <p>Browse lineages, breeder families, project records, and confidence notes. Every archive entry is designed to show what is known—and what is not.</p>
    </section>
    <div className="library-toolbar">
      <SearchBar value={search} onChange={setSearch} placeholder="Search strains, lineage, breeders, tags…" />
      <label><SlidersHorizontal size={16} /><select value={family} onChange={(event) => setFamily(event.target.value)}><option value="">All genetic families</option>{families.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label><select aria-label="Research collection" value={collection} onChange={(event) => setCollection(event.target.value)}><option value="">All research collections</option>{collectionOptions.map((item) => <option key={item.value} value={item.value}>{item.fullLabel}</option>)}</select></label>
      <label><select aria-label="Documentation tier" value={tier} onChange={(event) => setTier(event.target.value)}><option value="">All documentation tiers</option><option value="A">Tier A · primary</option><option value="B">Tier B · documented</option><option value="C">Tier C · catalog only</option></select></label>
      <span>{visible.length} records</span>
    </div>
    <section className="library-grid">
      {visible.map((strain) => <article className="strain-tile" key={strain.id}>
        <div className="tile-top"><span>{strain.project?.isGBSProject ? "GBS project" : strain.strainType?.replace("-", " ") ?? "unknown"}</span><DocumentationTierBadge tier={strain.documentationTier} compact /><button onClick={() => favorite(strain.id)} aria-label={`${progress.strains[strain.id]?.favorite ? "Remove" : "Add"} ${strain.name} ${progress.strains[strain.id]?.favorite ? "from" : "to"} favorites`}><Heart size={17} fill={progress.strains[strain.id]?.favorite ? "currentColor" : "none"} /></button></div>
        <div className="tile-seal"><Dna size={26} /></div>
        <h2>{strain.name}</h2><p>{strain.breeder ?? "Breeder not documented"}</p>
        <div className="tile-lineage"><small>Parentage</small><strong>{strain.parentage.display}</strong></div>
        <div className="tile-footer"><ConfidenceBadge level={strain.confidence.lineage} /><Link href={`/strain/${strain.id}`} aria-label={`Open ${strain.name} archive record`}><ArrowUpRight size={18} /></Link></div>
      </article>)}
    </section>
    {!visible.length && <div className="empty-state"><h2>No archive records match</h2><p>Try a broader search or clear one of the collection filters.</p></div>}
  </main>;
}
