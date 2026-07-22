"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Award, BarChart3, Flame, Heart, Target, TrendingUp, XCircle } from "lucide-react";
import { strains } from "@/lib/strains";
import { emptyProgress, loadProgress, type ProgressState } from "@/lib/storage";

function StatCard({ icon: Icon, label, value, note }: { icon: typeof Target; label: string; value: string | number; note: string }) {
  return <article className="stat-card"><span><Icon size={19} /></span><small>{label}</small><strong>{value}</strong><p>{note}</p></article>;
}

export function StatisticsDashboard() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  useEffect(() => { queueMicrotask(() => setProgress(loadProgress())); }, []);
  const data = useMemo(() => {
    const entries = Object.entries(progress.strains);
    const correct = entries.reduce((total, [, value]) => total + value.correct, 0);
    const missed = entries.reduce((total, [, value]) => total + value.missed, 0);
    const studied = entries.filter(([, value]) => value.viewed > 0).length;
    const favorite = entries.filter(([, value]) => value.favorite).length;
    const mastered = entries.filter(([, value]) => value.mastered).length;
    const byBreeder = new Map<string, number>(); const byFamily = new Map<string, number>();
    for (const [id, value] of entries) {
      if (!value.viewed) continue; const strain = strains.find((item) => item.id === id); if (!strain) continue;
      byBreeder.set(strain.breeder ?? "Unknown", (byBreeder.get(strain.breeder ?? "Unknown") ?? 0) + value.viewed);
      strain.families?.forEach((family) => byFamily.set(family, (byFamily.get(family) ?? 0) + value.viewed));
    }
    return { correct, missed, studied, favorite, mastered, accuracy: correct + missed ? Math.round(correct / (correct + missed) * 100) : 0, breeders: [...byBreeder].sort((a, b) => b[1] - a[1]).slice(0, 6), families: [...byFamily].sort((a, b) => b[1] - a[1]).slice(0, 6) };
  }, [progress]);
  const max = Math.max(1, ...data.breeders.map(([, value]) => value), ...data.families.map(([, value]) => value));
  return <main className="content-page stats-page">
    <section className="page-hero"><p className="eyebrow"><BarChart3 size={14} /> Local study intelligence</p><h1>Your archive <em>pulse.</em></h1><p>Progress stays on this device. Use these signals to find weak lineages and build a more deliberate review set.</p></section>
    <section className="stats-grid">
      <StatCard icon={Target} label="Accuracy" value={`${data.accuracy}%`} note={`${data.correct} correct answers`} />
      <StatCard icon={TrendingUp} label="Strains studied" value={data.studied} note={`${progress.totalViewed} total card views`} />
      <StatCard icon={XCircle} label="Missed answers" value={data.missed} note="Weighted review raises these cards" />
      <StatCard icon={Award} label="Mastered" value={data.mastered} note="3+ correct at a 2:1 ratio" />
      <StatCard icon={Heart} label="Favorites" value={data.favorite} note="Saved to your private set" />
      <StatCard icon={Flame} label="Study streak" value={progress.currentStreak} note={progress.lastStudyDate ? `Last session ${progress.lastStudyDate}` : "Start your first session"} />
    </section>
    <section className="chart-grid">
      <article className="bar-chart"><div className="chart-heading"><div><small>Collection depth</small><h2>Progress by breeder</h2></div><Link href="/?mode=breeder">Study breeders</Link></div>{data.breeders.length ? data.breeders.map(([label, value]) => <div className="bar-row" key={label}><span>{label}</span><div><i style={{ width: `${Math.max(8, value / max * 100)}%` }} /></div><strong>{value}</strong></div>) : <p className="chart-empty">Study a few cards to reveal breeder patterns.</p>}</article>
      <article className="bar-chart"><div className="chart-heading"><div><small>Genetic map</small><h2>Progress by family</h2></div><Link href="/library">View library</Link></div>{data.families.length ? data.families.map(([label, value]) => <div className="bar-row" key={label}><span>{label}</span><div><i className="purple" style={{ width: `${Math.max(8, value / max * 100)}%` }} /></div><strong>{value}</strong></div>) : <p className="chart-empty">Your family map will grow as you study.</p>}</article>
    </section>
  </main>;
}
