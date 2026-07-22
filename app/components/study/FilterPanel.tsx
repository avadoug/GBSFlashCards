"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { families, strains } from "@/lib/strains";
import { collectionOptions } from "@/lib/breeders";
import type { ConfidenceLevel } from "@/lib/schema";

export type Filters = {
  search: string;
  breeder: string;
  family: string;
  generation: string;
  strainType: string;
  effect: string;
  aroma: string;
  flowering: string;
  environment: string;
  confidence: string;
  progress: string;
  material: string;
  collection: string;
  documentationTier: string;
  releaseStatus: string;
  attributionRole: string;
};

export const emptyFilters: Filters = { search: "", breeder: "", family: "", generation: "", strainType: "", effect: "", aroma: "", flowering: "", environment: "", confidence: "", progress: "", material: "", collection: "", documentationTier: "", releaseStatus: "", attributionRole: "" };

const unique = (items: (string | undefined)[]) => [...new Set(items.filter(Boolean) as string[])].sort();
const breeders = unique(strains.map((strain) => strain.breeder));
const generations = unique(strains.map((strain) => strain.generation));
const effects = unique(strains.flatMap((strain) => [...(strain.effects.mental ?? []), ...(strain.effects.mood ?? [])]));
const aromas = unique(strains.flatMap((strain) => [...strain.aroma.dominant, ...(strain.aroma.secondary ?? [])]));

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <label className="filter-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">All</option>{children}</select></label>;
}

export function FilterPanel({ open, filters, onChange, onClose }: { open: boolean; filters: Filters; onChange: (filters: Filters) => void; onClose: () => void }) {
  if (!open) return null;
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });
  const option = (value: string) => <option key={value} value={value}>{value.replaceAll("-", " ")}</option>;
  return (
    <aside className="filter-panel" aria-label="Study filters">
      <div className="panel-heading"><div><span>Archive controls</span><h2><SlidersHorizontal size={18} /> Filter study set</h2></div><button className="icon-button" onClick={onClose} aria-label="Close filters"><X size={18} /></button></div>
      <div className="filter-grid">
        <Select label="Research collection" value={filters.collection} onChange={(value) => set("collection", value)}>{collectionOptions.map((item) => <option key={item.value} value={item.value}>{item.fullLabel}</option>)}</Select>
        <Select label="Documentation tier" value={filters.documentationTier} onChange={(value) => set("documentationTier", value)}><option value="A">Tier A · primary</option><option value="B">Tier B · documented</option><option value="C">Tier C · catalog only</option></Select>
        <Select label="Breeder" value={filters.breeder} onChange={(value) => set("breeder", value)}>{breeders.map(option)}</Select>
        <Select label="Genetic family" value={filters.family} onChange={(value) => set("family", value)}>{families.map(option)}</Select>
        <Select label="Generation" value={filters.generation} onChange={(value) => set("generation", value)}>{generations.map(option)}</Select>
        <Select label="Strain type" value={filters.strainType} onChange={(value) => set("strainType", value)}>{unique(strains.map((strain) => strain.strainType)).map(option)}</Select>
        <Select label="Effect tag" value={filters.effect} onChange={(value) => set("effect", value)}>{effects.map(option)}</Select>
        <Select label="Aroma tag" value={filters.aroma} onChange={(value) => set("aroma", value)}>{aromas.map(option)}</Select>
        <Select label="Flowering time" value={filters.flowering} onChange={(value) => set("flowering", value)}>
          <option value="fast">Up to 60 days</option><option value="medium">61–75 days</option><option value="long">76+ days</option>
        </Select>
        <Select label="Environment" value={filters.environment} onChange={(value) => set("environment", value)}><option value="indoor">Indoor documented</option><option value="outdoor">Outdoor documented</option></Select>
        <Select label="Confidence" value={filters.confidence} onChange={(value) => set("confidence", value)}>{(["breeder-verified", "strongly-documented", "widely-accepted", "community-reported", "disputed", "unknown"] as ConfidenceLevel[]).map(option)}</Select>
        <Select label="Progress" value={filters.progress} onChange={(value) => set("progress", value)}><option value="favorites">Favorites</option><option value="missed">Missed strains</option><option value="mastered">Mastered strains</option></Select>
        <Select label="Material" value={filters.material} onChange={(value) => set("material", value)}><option value="clone">Clone-only</option><option value="seed">Seed line / population</option><option value="gbs">GBS projects</option></Select>
        <Select label="Release status" value={filters.releaseStatus} onChange={(value) => set("releaseStatus", value)}>{unique(strains.map((strain) => strain.releaseStatus)).map(option)}</Select>
        <Select label="Attribution role" value={filters.attributionRole} onChange={(value) => set("attributionRole", value)}>{unique(strains.flatMap((strain) => strain.attributions?.map((item) => item.role) ?? [])).map(option)}</Select>
      </div>
      <button className="text-button" onClick={() => onChange(emptyFilters)}>Clear all filters</button>
    </aside>
  );
}
