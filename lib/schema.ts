import { z } from "zod";

export const confidenceLevelSchema = z.enum([
  "breeder-verified",
  "strongly-documented",
  "widely-accepted",
  "community-reported",
  "disputed",
  "unknown",
]);

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
  sources: z
    .array(
      z.object({
        label: z.string(),
        type: z.enum(["breeder", "archive", "catalog", "interview", "community", "unknown"]),
        url: z.string().url().optional(),
      }),
    )
    .optional(),
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
export type Strain = z.infer<typeof strainSchema>;

