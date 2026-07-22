import rawStrains from "@/data/strains.json";
import breederStrains from "@/data/breeder-strains.json";
import { strainLibrarySchema, type Strain } from "./schema";

const mergedStrains = new Map<string, unknown>(
  rawStrains.map((strain) => [strain.id, strain]),
);

for (const strain of breederStrains) {
  mergedStrains.set(strain.id, strain);
}

const parsed = strainLibrarySchema.safeParse([...mergedStrains.values()]);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "record"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Strain data validation failed:\n${details}`);
}

export const strains: Strain[] = parsed.data;

export const strainById = new Map(strains.map((strain) => [strain.id, strain]));

export const starterDataNotice =
  "Research archive — Tier C confirms catalog existence only; blank fields are deliberate and unresolved claims remain outside the production library.";

export function findStrain(id: string) {
  return strainById.get(id);
}

export function distinctValues(key: "breeder" | "generation" | "strainType") {
  return [...new Set(strains.map((strain) => strain[key]).filter(Boolean) as string[])].sort();
}

export const families = [...new Set(strains.flatMap((strain) => strain.families ?? []))].sort();
