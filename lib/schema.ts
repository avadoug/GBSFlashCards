import { z } from "zod";

export const confidenceLevelSchema = z.enum([
  "breeder-verified",
  "strongly-documented",
  "widely-accepted",
  "community-reported",
  "disputed",
  "unknown",
]);

export const documentationTierSchema = z.enum(["A", "B", "C"]);

export const attributionRoleSchema = z.enum([
  "breeder",
  "co-breeder",
  "release-partner",
  "selection",
  "preservation",
  "catalog-attribution",
]);

export const sourceTypeSchema = z.enum([
  "breeder",
  "archive",
  "catalog",
  "interview",
  "community",
  "unknown",
  "official-breeder",
  "official-product",
  "breeder-interview",
  "retailer-breeder-page",
  "seed-database",
  "forum-primary-post",
  "grow-report",
]);

const sourceSchema = z.object({
  label: z.string().min(1),
  type: sourceTypeSchema,
  url: z.string().url().optional(),
  accessedAt: z.string().optional(),
  fields: z.array(z.string().min(1)).optional(),
  reliability: z.enum(["primary", "strong-secondary", "secondary", "community", "unknown"]).optional(),
  notes: z.string().optional(),
});

const parentSchema = z.object({
  name: z.string().min(1),
  breeder: z.string().optional(),
  type: z.enum(["strain", "clone", "selection", "unknown"]).optional(),
  notes: z.string().optional(),
});

const documentedList = z.array(z.string().min(1)).optional();

export const strainSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Use a lowercase kebab-case ID"),
  name: z.string().min(1),
  aliases: documentedList,
  breeder: z.string().optional(),
  releaseEra: z.string().optional(),
  parentage: z.object({
    mother: parentSchema.optional(),
    father: parentSchema.optional(),
    display: z.string().min(1),
    notes: z.string().optional(),
    reportedVersions: z
      .array(
        z.object({
          display: z.string().min(1),
          sourceLabel: z.string().min(1),
          confidence: confidenceLevelSchema,
          notes: z.string().optional(),
        }),
      )
      .optional(),
  }),
  generation: z.string().optional(),
  strainType: z
    .enum([
      "sativa-leaning",
      "indica-leaning",
      "balanced",
      "landrace",
      "heirloom",
      "clone-only",
      "unknown",
    ])
    .optional(),
  overview: z.string().min(1),
  aroma: z.object({
    dominant: z.array(z.string()),
    secondary: documentedList,
    flavorInhale: documentedList,
    flavorExhale: documentedList,
    phenotypeVariation: z.string().optional(),
    terpenes: documentedList,
  }),
  effects: z.object({
    onset: z.string().optional(),
    mental: documentedList,
    physical: documentedList,
    energy: z.string().optional(),
    clarity: z.string().optional(),
    mood: documentedList,
    duration: z.string().optional(),
    bestTime: documentedList,
    useCases: documentedList,
    possibleNegatives: documentedList,
  }),
  cultivation: z.object({
    floweringDays: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
    stretch: z.string().optional(),
    structure: z.string().optional(),
    branching: z.string().optional(),
    internodalSpacing: z.string().optional(),
    leafShape: z.string().optional(),
    height: z.string().optional(),
    feeding: z.string().optional(),
    overwatering: z.string().optional(),
    stressSensitivity: z.string().optional(),
    trainingResponse: z.string().optional(),
    yield: z.string().optional(),
    resin: z.string().optional(),
    budDensity: z.string().optional(),
    moldRisk: z.string().optional(),
    cloning: z.string().optional(),
    indoor: z.string().optional(),
    outdoor: z.string().optional(),
    harvestWindow: z.string().optional(),
    difficulty: z.string().optional(),
    notes: documentedList,
  }),
  phenotypes: z
    .array(
      z.object({
        name: z.string().optional(),
        aroma: z.string().optional(),
        structure: z.string().optional(),
        effect: z.string().optional(),
        flowering: z.string().optional(),
        keeperTraits: documentedList,
        weaknesses: documentedList,
      }),
    )
    .optional(),
  breedingValue: z
    .object({
      passes: documentedList,
      strengths: documentedList,
      weaknesses: documentedList,
      pairingIdeas: documentedList,
      notes: z.string().optional(),
    })
    .optional(),
  history: z
    .object({
      summary: z.string().optional(),
      notableCuts: documentedList,
      disputes: documentedList,
      reputation: z.string().optional(),
    })
    .optional(),
  families: documentedList,
  tags: documentedList,
  confidence: z.object({
    lineage: confidenceLevelSchema,
    information: confidenceLevelSchema,
    notes: z.string().optional(),
  }),
  documentationTier: documentationTierSchema.optional(),
  attributions: z
    .array(
      z.object({
        name: z.string().min(1),
        role: attributionRoleSchema,
        confidence: confidenceLevelSchema,
        notes: z.string().optional(),
      }),
    )
    .optional(),
  collection: z
    .object({
      slug: z.enum([
        "dominion-duke-diamond",
        "subcool-tga-the-dank",
        "bless-coast",
        "lemon-hoko",
        "norstar-genetics",
        "thunderfudge",
        "blackbird-preservations",
        "rare-dankness",
      ]),
      label: z.string().min(1),
      catalogGroup: z.string().optional(),
      signature: z.boolean().optional(),
    })
    .optional(),
  releaseStatus: z.enum(["released", "archived", "preservation", "unreleased", "unknown"]).optional(),
  fieldConfidence: z
    .object({
      existence: confidenceLevelSchema.optional(),
      name: confidenceLevelSchema.optional(),
      breeder: confidenceLevelSchema.optional(),
      parentage: confidenceLevelSchema.optional(),
      version: confidenceLevelSchema.optional(),
      history: confidenceLevelSchema.optional(),
      cultivation: confidenceLevelSchema.optional(),
      aroma: confidenceLevelSchema.optional(),
      effects: confidenceLevelSchema.optional(),
    })
    .optional(),
  relationships: z
    .object({
      collaborators: documentedList,
      releasePartners: documentedList,
      preservationBy: documentedList,
      relatedVersionIds: documentedList,
    })
    .optional(),
  researchStatus: z
    .object({
      reviewState: z.enum(["accepted", "needs-review"]),
      completenessScope: z.string().min(1),
      lastReviewed: z.string().min(1),
    })
    .optional(),
  sources: z.array(sourceSchema).optional(),
  project: z
    .object({
      isGBSProject: z.boolean(),
      status: z.enum(["concept", "active-hunt", "selection", "stabilization", "archived"]),
      generation: z.string().optional(),
      huntSize: z.number().int().positive().optional(),
      keeperNotes: z.string().optional(),
    })
    .optional(),
});

export const strainLibrarySchema = z.array(strainSchema).min(1).superRefine((strains, context) => {
  const ids = new Set<string>();
  for (const [index, strain] of strains.entries()) {
    if (ids.has(strain.id)) {
      context.addIssue({
        code: "custom",
        path: [index, "id"],
        message: `Duplicate strain ID: ${strain.id}`,
      });
    }
    ids.add(strain.id);
  }
});

export type ConfidenceLevel = z.infer<typeof confidenceLevelSchema>;
export type DocumentationTier = z.infer<typeof documentationTierSchema>;
export type SourceType = z.infer<typeof sourceTypeSchema>;
export type Strain = z.infer<typeof strainSchema>;
