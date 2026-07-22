import { Dna, Rotate3D } from "lucide-react";
import type { Strain } from "@/lib/schema";
import type { StudyMode } from "@/lib/storage";
import { DocumentationTierBadge } from "../DocumentationTierBadge";

const typeLabels: Record<string, string> = {
  "sativa-leaning": "Sativa-leaning",
  "indica-leaning": "Indica-leaning",
  balanced: "Balanced hybrid",
  landrace: "Landrace",
  heirloom: "Heirloom",
  "clone-only": "Clone-only",
  unknown: "Unknown",
};

export function CardFront({ strain, mode }: { strain: Strain; mode: StudyMode }) {
  const reverse = mode === "reverse";
  return (
    <div className="card-face card-front">
      <div className="card-foil" aria-hidden="true" />
      <div className="card-corner corner-top">GBS / {strain.id.slice(0, 3).toUpperCase()}</div>
      <div className="card-badges">
        {strain.project?.isGBSProject && <span className="badge badge-gbs">GBS Project</span>}
        <DocumentationTierBadge tier={strain.documentationTier} compact />
        <span className="badge">{typeLabels[strain.strainType ?? "unknown"]}</span>
        {strain.generation && <span className="badge badge-gold">{strain.generation}</span>}
      </div>
      <div className="front-center">
        <div className="botanical-seal" aria-hidden="true">
          <span className="seal-ring" />
          <Dna size={40} strokeWidth={1.2} />
        </div>
        {reverse ? (
          <>
            <p className="eyebrow">Reverse study · identify the strain</p>
            <h1 className="reverse-lineage">{strain.parentage.display}</h1>
            <p className="breeder-line">{strain.breeder ?? "Breeder not documented"}</p>
          </>
        ) : (
          <>
            <p className="eyebrow">Genetic archive specimen</p>
            <h1>{strain.name}</h1>
            <p className="breeder-line">{strain.breeder ?? "Breeder not documented"}</p>
          </>
        )}
      </div>
      <div className="tap-prompt"><Rotate3D size={16} /> Tap to reveal</div>
      <div className="card-corner corner-bottom">Learn the lineage · Know the plant</div>
    </div>
  );
}
