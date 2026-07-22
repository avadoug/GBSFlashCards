import type { DocumentationTier } from "@/lib/schema";

const labels: Record<DocumentationTier, string> = {
  A: "Tier A · primary",
  B: "Tier B · documented",
  C: "Tier C · catalog",
};

export function DocumentationTierBadge({ tier, compact = false }: { tier?: DocumentationTier; compact?: boolean }) {
  if (!tier) return null;
  return <span className={"tier-badge tier-" + tier.toLowerCase()} title={labels[tier]}>{compact ? "Tier " + tier : labels[tier]}</span>;
}
