import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookMarked, Dna, ShieldCheck } from "lucide-react";
import { breeders, strainsForBreeder } from "@/lib/breeders";

export const metadata: Metadata = {
  title: "Breeder collections",
  description: "Research-backed breeder catalogs with explicit attribution, versioning, and documentation tiers.",
};

export default function BreedersPage() {
  return <main className="content-page breeders-page">
    <section className="page-hero breeder-index-hero">
      <p className="eyebrow"><BookMarked size={14} /> {breeders.length} research collections</p>
      <h1>Breeder histories,<br /><em>without the blur.</em></h1>
      <p>Creator credit, company eras, release partners, preservation versions, and unresolved claims stay separate. Each collection shows what the public record supports—and where it stops.</p>
    </section>

    <section className="breeder-index-grid">
      {breeders.map((breeder, index) => {
        const records = strainsForBreeder(breeder.slug);
        const tiers = records.reduce<Record<string, number>>((counts, strain) => {
          const tier = strain.documentationTier ?? "—";
          counts[tier] = (counts[tier] ?? 0) + 1;
          return counts;
        }, {});
        return <Link href={"/breeders/" + breeder.slug} className="breeder-index-card" key={breeder.slug}>
          <div className="breeder-card-number">0{index + 1}</div>
          <div className="breeder-card-icon"><Dna size={26} /></div>
          <p>{breeder.era}</p>
          <h2>{breeder.name}</h2>
          <span>{breeder.thesis}</span>
          <div className="breeder-card-stats">
            <small><strong>{records.length}</strong> records</small>
            <small><ShieldCheck size={12} /> A {tiers.A ?? 0} · B {tiers.B ?? 0} · C {tiers.C ?? 0}</small>
            <ArrowUpRight size={18} />
          </div>
        </Link>;
      })}
    </section>

    <aside className="research-manifesto">
      <p className="eyebrow">Research boundary</p>
      <h2>Comprehensive by method. Honest about limits.</h2>
      <p>This is a best-effort reconstruction of public catalogs, not a claim of literal completeness. Catalog-only records remain intentionally sparse, disputed versions stay visible, and ambiguous candidates live in a separate review queue.</p>
    </aside>
  </main>;
}
