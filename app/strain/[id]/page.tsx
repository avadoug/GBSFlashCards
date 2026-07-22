import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dna, Flower2, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { findStrain, strains } from "@/lib/strains";
import { AromaSection, BreedingValueSection, CultivationSection, EffectsSection, HistorySection, LineageSection, PhenotypeSection } from "@/app/components/card/sections";

export function generateStaticParams() { return strains.map((strain) => ({ id: strain.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; const strain = findStrain(id);
  return strain ? { title: strain.name, description: `${strain.name}: ${strain.parentage.display}. Archive lineage, sensory, cultivation, and confidence notes.` } : {};
}

export default async function StrainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const strain = findStrain(id); if (!strain) notFound();
  const flowering = strain.cultivation.floweringDays ? `${strain.cultivation.floweringDays.min ?? "?"}–${strain.cultivation.floweringDays.max ?? "?"} days` : "Not documented";
  return <main className="content-page detail-page">
    <Link href="/library" className="back-link"><ArrowLeft size={16} /> Back to library</Link>
    <section className="detail-hero">
      <div className="detail-seal"><Dna size={52} /></div>
      <div><p className="eyebrow">{strain.project?.isGBSProject ? "GBS breeding project" : "Permanent archive record"}</p><h1>{strain.name}</h1><p>{strain.breeder ?? "Breeder not documented"}</p></div>
    </section>
    <div className="detail-stat-row"><span><Dna size={16} /><small>Generation</small><strong>{strain.generation ?? "Unknown"}</strong></span><span><Leaf size={16} /><small>Type</small><strong>{strain.strainType?.replace("-", " ") ?? "Unknown"}</strong></span><span><Sprout size={16} /><small>Flowering</small><strong>{flowering}</strong></span><span><ShieldCheck size={16} /><small>Lineage confidence</small><strong>{strain.confidence.lineage.replace("-", " ")}</strong></span></div>
    <section className="detail-overview"><p className="eyebrow"><Flower2 size={14} /> Archive overview</p><h2>{strain.parentage.display}</h2><p>{strain.overview}</p></section>
    <div className="detail-sections"><LineageSection strain={strain} /><AromaSection strain={strain} /><EffectsSection strain={strain} /><CultivationSection strain={strain} /><PhenotypeSection strain={strain} /><BreedingValueSection strain={strain} /><HistorySection strain={strain} /></div>
  </main>;
}
