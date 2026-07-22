import rawBreeders from "@/data/breeders.json";
import { strains } from "./strains";

export type BreederProfile = {
  slug: "dominion-duke-diamond" | "subcool-tga-the-dank" | "bless-coast" | "lemon-hoko";
  name: string;
  shortName: string;
  era: string;
  thesis: string;
  biography: string;
  sourceIds: string[];
  signatureIds: string[];
};

export const breeders = rawBreeders as BreederProfile[];

export const breederBySlug = new Map<string, BreederProfile>(breeders.map((breeder) => [breeder.slug, breeder]));

export function findBreeder(slug: string) {
  return breederBySlug.get(slug);
}

export function strainsForBreeder(slug: string) {
  return strains.filter((strain) => strain.collection?.slug === slug);
}

export const collectionOptions = breeders.map((breeder) => ({
  value: breeder.slug,
  label: breeder.shortName,
  fullLabel: breeder.name,
}));
