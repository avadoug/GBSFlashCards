import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, Dna, ExternalLink, FlaskConical, ShieldCheck } from "lucide-react";
import { DocumentationTierBadge } from "@/app/components/DocumentationTierBadge";
import { breeders, findBreeder, strainsForBreeder } from "@/lib/breeders";

export function generateStaticParams() {
  return breeders.map((breeder) => ({ slug: breeder.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const breeder = findBreeder((await params).slug);
  return breeder ? { title: breeder.name, description: breeder.thesis } : {};
}

export default async function BreederPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const breeder = findBreeder(slug);
  if (!breeder) notFound();
  const records = strainsForBreeder(slug);
  const signatures = breeder.signatureIds.map((id) => records.find((strain) => strain.id === id)).filter(Boolean);
  const tierCounts = records.reduce<Record<string, number>>((counts, strain) => {
    const tier = strain.documentationTier ?? "—";
    counts[tier] = (counts[tier] ?? 0) + 1;
    return counts;
  }, {});
  const groups = [...new Set(records.map((strain) => strain.collection?.catalogGroup ?? "catalog"))];
  const sources = [...new Map(records.flatMap((strain) => strain.sources ?? []).filter((source) => source.url).map((source) => [source.url, source])).values()];

  return <main className="content-page breeder-detail-page">
    <Link href="/breeders" className="back-link"><ArrowLeft size={16} /> All breeder collections</Link>
    <section className={"breeder-hero breeder-theme-" + breeder.slug}>
      <div className="breeder-hero-mark"><Dna size={50} /></div>
      <div>
        <p className="eyebrow">{breeder.era}</p>
        <h1>{breeder.name}</h1>
        <p>{breeder.thesis}</p>
      </div>
      <Link className="breeder-study-cta" href={"/?collection=" + breeder.slug}>Study this collection <ArrowUpRight size={16} /></Link>
    </section>

    <div className="breeder-stat-strip">
      <span><strong>{records.length}</strong><small>accepted records</small></span>
      <span><strong>{tierCounts.A ?? 0}</strong><small>Tier A · primary</small></span>
      <span><strong>{tierCounts.B ?? 0}</strong><small>Tier B · documented</small></span>
      <span><strong>{tierCounts.C ?? 0}</strong><small>Tier C · catalog</small></span>
    </div>

    <section className="breeder-story-grid">
      <article>
        <p className="eyebrow"><BookOpen size={14} /> Archive context</p>
        <h2>A history with roles attached.</h2>
        <p>{breeder.biography}</p>
      </article>
      <aside>
        <p className="eyebrow"><ShieldCheck size={14} /> Confidence model</p>
        <p>Tier A uses primary breeder or official product evidence. Tier B uses strong release-specific documentation. Tier C confirms catalog existence only and intentionally leaves detailed fields blank.</p>
      </aside>
    </section>

    {signatures.length > 0 && <section className="signature-section">
      <div className="collection-heading"><div><p className="eyebrow"><FlaskConical size={14} /> Signature lines</p><h2>The collection anchors.</h2></div><span>{signatures.length} documented anchors</span></div>
      <div className="signature-grid">
        {signatures.map((strain) => strain && <Link href={"/strain/" + strain.id} key={strain.id} className="signature-card">
          <DocumentationTierBadge tier={strain.documentationTier} compact />
          <h3>{strain.name}</h3>
          <p>{strain.parentage.display}</p>
          <small>{strain.overview}</small>
          <ArrowUpRight size={17} />
        </Link>)}
      </div>
    </section>}

    {groups.map((group) => {
      const groupRecords = records.filter((strain) => (strain.collection?.catalogGroup ?? "catalog") === group);
      return <section className="catalog-section" key={group}>
        <div className="collection-heading"><div><p className="eyebrow">Catalog ledger</p><h2>{group}</h2></div><span>{groupRecords.length} records</span></div>
        <div className="catalog-ledger">
          {groupRecords.map((strain) => <Link href={"/strain/" + strain.id} className="catalog-row" key={strain.id}>
            <DocumentationTierBadge tier={strain.documentationTier} compact />
            <span><strong>{strain.name}</strong><small>{strain.breeder}</small></span>
            <p>{strain.parentage.display}</p>
            <ArrowUpRight size={15} />
          </Link>)}
        </div>
      </section>;
    })}

    <section className="source-docket">
      <div className="collection-heading"><div><p className="eyebrow"><ExternalLink size={14} /> Source docket</p><h2>Public evidence used here.</h2></div><span>{sources.length} linked sources</span></div>
      <div className="source-docket-grid">
        {sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
          <span>{source.type.replaceAll("-", " ")}</span>
          <strong>{source.label}</strong>
          <small>{source.fields?.join(" · ") ?? "Record evidence"}</small>
          <ExternalLink size={14} />
        </a>)}
      </div>
    </section>
  </main>;
}
