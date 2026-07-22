import { Flame, Target, Trophy } from "lucide-react";
import type { ProgressState } from "@/lib/storage";

export function ProgressPanel({ progress, poolCount }: { progress: ProgressState; poolCount: number }) {
  const records = Object.values(progress.strains);
  const correct = records.reduce((total, record) => total + record.correct, 0);
  const missed = records.reduce((total, record) => total + record.missed, 0);
  const accuracy = correct + missed ? Math.round((correct / (correct + missed)) * 100) : 0;
  const mastered = records.filter((record) => record.mastered).length;
  return (
    <aside className="progress-panel" aria-label="Study progress">
      <div><Target size={16} /><span><strong>{accuracy}%</strong><small>accuracy</small></span></div>
      <div><Flame size={16} /><span><strong>{progress.currentStreak}</strong><small>day streak</small></span></div>
      <div><Trophy size={16} /><span><strong>{mastered}</strong><small>mastered</small></span></div>
      <p>{poolCount} strains in this study set</p>
    </aside>
  );
}

