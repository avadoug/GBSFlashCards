"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, Dna, ExternalLink, FlaskConical, History, Leaf, Sprout } from "lucide-react";
import type { Strain } from "@/lib/schema";
import type { StudyMode } from "@/lib/storage";
import { AromaSection, BreedingValueSection, CultivationSection, EffectsSection, HistorySection, LineageSection, PhenotypeSection, SourcesSection } from "./sections";

const tabs = [
  { id: "lineage", label: "Lineage", icon: Dna },
  { id: "profile", label: "Profile", icon: Leaf },
  { id: "grow", label: "Grow", icon: Sprout },
  { id: "breed", label: "Breed", icon: FlaskConical },
  { id: "history", label: "History", icon: History },
  { id: "sources", label: "Sources", icon: ExternalLink },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function CardBack({ strain, mode, onFlipBack }: { strain: Strain; mode: StudyMode; onFlipBack: () => void }) {
  const [tab, setTab] = useState<TabId>("lineage");
  const parentageOnly = mode === "parentage";
  return (
    <div className="card-face card-back">
      <div className="back-header">
        <div>
          <p>{parentageOnly ? "Parentage reveal" : "Archive file"}</p>
          <h2>{strain.name}</h2>
        </div>
        <button className="icon-button" onClick={(event) => { event.stopPropagation(); onFlipBack(); }} aria-label="Flip back to card front">
          <ArrowLeft size={18} />
        </button>
      </div>
      {!parentageOnly && (
        <div className="back-tabs" role="tablist" aria-label="Strain information sections">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={(event) => { event.stopPropagation(); setTab(id); }}>
              <Icon size={14} /><span>{label}</span>
            </button>
          ))}
        </div>
      )}
      <div className="back-scroll" onClick={(event) => event.stopPropagation()}>
        {parentageOnly ? <LineageSection strain={strain} /> : (
          <>
            {tab === "lineage" && <LineageSection strain={strain} />}
            {tab === "profile" && <><section className="back-section"><div className="section-title"><BookOpen size={17} /><h3>Strain overview</h3></div><p className="section-copy">{strain.overview}</p></section><AromaSection strain={strain} /><EffectsSection strain={strain} /></>}
            {tab === "grow" && <><CultivationSection strain={strain} /><PhenotypeSection strain={strain} /></>}
            {tab === "breed" && <BreedingValueSection strain={strain} />}
            {tab === "history" && <HistorySection strain={strain} />}
            {tab === "sources" && <SourcesSection strain={strain} />}
          </>
        )}
      </div>
    </div>
  );
}
