import { describe, expect, it } from "vitest";
import rawStrains from "@/data/strains.json";
import breederStrains from "@/data/breeder-strains.json";
import { strainLibrarySchema, strainSchema } from "@/lib/schema";

describe("strain data validation", () => {
  it("validates the complete merged library", () => {
    const merged = new Map(rawStrains.map((strain) => [strain.id, strain]));
    for (const strain of breederStrains) merged.set(strain.id, strain);
    const result = strainLibrarySchema.safeParse([...merged.values()]);
    expect(result.success).toBe(true);
    expect(merged.size).toBeGreaterThanOrEqual(250);
  });

  it("keeps every researched breeder record sourced and tiered", () => {
    for (const strain of breederStrains) {
      expect(strain.documentationTier).toMatch(/^[ABC]$/);
      expect(strain.sources.length).toBeGreaterThan(0);
      expect(strain.sources.some((source) => Boolean(source.url))).toBe(true);
      if (strain.documentationTier === "C") {
        expect(strain.overview).toBe("Catalog existence confirmed. Detailed information has not yet been documented.");
      }
    }
  });

  it("keeps generated IDs unique and separates the Subcool Space Queen release", () => {
    expect(new Set(breederStrains.map((strain) => strain.id)).size).toBe(breederStrains.length);
    expect(breederStrains.some((strain) => strain.id === "space-queen-subcool-release")).toBe(true);
  });

  it("returns a helpful path for malformed records", () => {
    const result = strainSchema.safeParse({ id: "Bad ID", name: "", parentage: {}, overview: "", aroma: {}, effects: {}, cultivation: {}, confidence: {} });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.some((issue) => issue.path.length > 0)).toBe(true);
  });
});
