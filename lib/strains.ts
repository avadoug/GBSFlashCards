import rawStrains from "@/data/strains.json";
import { strainLibrarySchema, type Strain } from "./schema";

const parsed = strainLibrarySchema.safeParse(rawStrains);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join(".") || "record"}: ${issue.message}`)
    .join("\n");
  throw new Error(`Strain data validation failed:\n${details}`);
}

export const strains: Strain[] = parsed.data;

export const strainById = new Map(strains.map((strain) => [strain.id, strain]));

export const starterDataNotice =
  "Starter archive — historical, sensory, cultivation, and inheritance details require human review before public release.";

export function findStrain(id: string) {
  return strainById.get(id);
}

export function distinctValues(key: "breeder" | "generation" | "strainType") {
  return [...new Set(strains.map((strain) => strain[key]).filter(Boolean) as string[])].sort();
}

export const families = [...new Set(strains.flatMap((strain) => strain.families ?? []))].sort();

