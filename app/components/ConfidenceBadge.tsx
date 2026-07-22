import { ShieldCheck, ShieldQuestion } from "lucide-react";
import type { ConfidenceLevel } from "@/lib/schema";

const labels: Record<ConfidenceLevel, string> = {
  "breeder-verified": "Breeder verified",
  "strongly-documented": "Strongly documented",
  "widely-accepted": "Widely accepted",
  "community-reported": "Community reported",
  disputed: "Disputed",
  unknown: "Unknown",
};

export function ConfidenceBadge({ level, prefix }: { level: ConfidenceLevel; prefix?: string }) {
  const Icon = level === "breeder-verified" || level === "strongly-documented" ? ShieldCheck : ShieldQuestion;
  return (
    <span className={`confidence confidence-${level}`} title={`${prefix ?? "Confidence"}: ${labels[level]}`}>
      <Icon size={13} aria-hidden="true" />
      {prefix ? `${prefix}: ` : ""}{labels[level]}
    </span>
  );
}

