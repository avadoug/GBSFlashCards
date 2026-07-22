import { describe, expect, it } from "vitest";
import rawStrains from "@/data/strains.json";
import { strainLibrarySchema, strainSchema } from "@/lib/schema";

describe("strain data validation", () => {
  it("validates the complete starter library", () => {
    const result = strainLibrarySchema.safeParse(rawStrains);
    expect(result.success).toBe(true);
    expect(rawStrains.length).toBeGreaterThanOrEqual(50);
  });

  it("returns a helpful path for malformed records", () => {
    const result = strainSchema.safeParse({ id: "Bad ID", name: "", parentage: {}, overview: "", aroma: {}, effects: {}, cultivation: {}, confidence: {} });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.some((issue) => issue.path.length > 0)).toBe(true);
  });
});

