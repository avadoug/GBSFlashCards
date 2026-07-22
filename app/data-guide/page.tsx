import type { Metadata } from "next";
import { Archive, BookOpen, CircleAlert, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Data guide",
  description: "How GBS Strain Flip handles sources, documentation tiers, attribution, disputed lineage, and catalog-only records.",
};

const levels = [
  { label: "Breeder verified", text: "Directly stated in attributable breeder material for that specific release." },
  { label: "Strongly documented", text: "Supported by consistent release-specific archival or first-hand sources." },
  { label: "Widely accepted", text: "Repeated consistently, but without complete primary documentation." },
  { label: "Community reported", text: "Useful grower or collector reporting that still needs stronger sourcing." },
  { label: "Disputed", text: "Substantive sources or communities disagree on the claim." },
  { label: "Unknown", text: "No responsible conclusion can be made from the available public record." },
];

export default function DataGuidePage() {
  return <main className="content-page editorial-page guide-page">
    <section className="page-hero">
      <p className="eyebrow"><BookOpen size={14} /> Evidence before certainty</p>
      <h1>Read the archive<br /><em>with context.</em></h1>
      <p>Cannabis history traveled through catalogs, clones, forums, interviews, collaborations, and oral memory. This guide explains how the archive avoids turning repetition into fact.</p>
    </section>

    <section className="guide-callout">
      <CircleAlert />
      <div>
        <h2>Catalog presence is not a complete strain profile.</h2>
        <p>Tier C records confirm only a public catalog association. Their blank sensory, effect, cultivation, and parentage fields are deliberate. Ambiguous names and unreleased testers remain in the research review queue rather than the production library.</p>
      </div>
    </section>

    <section className="confidence-guide">
      <div className="section-kicker"><ShieldCheck /><span>Field confidence system</span></div>
      {levels.map((level, index) => <article key={level.label}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{level.label}</h3>
        <p>{level.text}</p>
      </article>)}
    </section>

    <section className="source-method">
      <div><Archive /><h2>What a strong record keeps</h2></div>
      <ul>
        <li>The exact seed maker, release, cut, generation, or accession—not only the popular strain name.</li>
        <li>Separate creator, co-breeder, release-partner, selection, preservation, and catalog-attribution roles.</li>
        <li>Field-level confidence and direct links showing what each source actually supports.</li>
        <li>Separate records for generations, backcrosses, selfed releases, and materially different recreations.</li>
        <li>Unresolved alternatives and naming collisions without forcing a false consensus.</li>
        <li>Selection-specific breeding hypotheses, never inheritance or effect guarantees.</li>
      </ul>
    </section>
  </main>;
}
