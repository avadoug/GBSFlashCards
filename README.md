# GBS Strain Flip

GBS Strain Flip is an interactive cannabis genetics learning archive built around tactile, animated flash cards. It helps growers, breeders, smokers, and collectors study lineage, sensory observations, cultivation traits, phenotype variation, breeding context, history, and source confidence without presenting uncertain claims as fact.

> The validated 479-record library combines a 66-record base archive with 419 sourced breeder records and explicit overlays for shared records. Tier C entries confirm catalog existence only; their blank fields are deliberate.

## Technology

- Next.js App Router and TypeScript
- Tailwind CSS 4 plus a project-level visual system
- Framer Motion for 3D card movement and transitions
- Zod for build-time strain validation
- Local JSON for the strain archive
- `localStorage` for progress, settings, queues, favorites, and streaks
- Vitest and React Testing Library
- Web app manifest and a cache-first fallback service worker

No account, database, analytics service, or backend is required for version one.

## Install and run

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

Production checks:

```bash
npm run lint
npm test
npm run build
```

## Routes

- `/` — interactive study card with modes, keyboard controls, filters, smart shuffle, and local progress
- `/library` — searchable strain index
- `/breeders` — eight research-backed breeder collections
- `/breeders/[slug]` — collection history, signature lines, catalog ledger, and source docket
- `/strain/[id]` — permanent archive detail record
- `/statistics` — local accuracy, streak, mastery, breeder, and family progress
- `/about` — product purpose and principles
- `/data-guide` — sourcing and confidence methodology
- `/settings` — motion, sound, review, density, and reset controls

## Project structure

```text
app/
  components/          Shared header, card, study, and state components
  strain/[id]/         Permanent strain pages
  library/             Searchable index
  statistics/          Local progress dashboard
  settings/            Device-local preferences
data/strains.json      All starter and GBS project records
data/breeder-strains.json  Generated, source-linked breeder records and overlays
data/breeders.json     Breeder collection summaries
data/research/         Candidate, alias, source, unresolved, and rejected ledgers
docs/                  Research method and reconciliation report
scripts/               Reproducible breeder research generator
lib/schema.ts          Zod schemas and TypeScript types
lib/strains.ts         Validated data loader and index
lib/shuffleBag.ts      Shuffle-bag and anti-repeat logic
lib/storage.ts         Local progress and preference model
public/                PWA files, icons, offline page, and social card
tests/                 Logic, persistence, schema, and card tests
```

## How the shuffle bag works

The app does not choose a fresh `Math.random()` card on every click.

1. It creates a shuffled bag from the full filtered strain set.
2. In pure mode, every eligible strain appears once before the bag is rebuilt.
3. The immediately previous strain is moved away from the first position.
4. Recent IDs are placed behind fresh IDs when a new bag is created.
5. The recent-history window defaults to 15 and is configurable from 3–50.
6. Smart weighting adds extra bag entries for strains with more missed than correct answers and a small optional favorite boost. Mastered strains do not receive boosts.
7. Filter changes remove ineligible queued IDs and create a new filter-specific bag only when needed.
8. Empty, one-strain, and small filtered collections use explicit safe paths.

Queues and recent history are stored locally so a reload does not restart repetition control.

## Add or edit a strain

Edit `data/strains.json`. Each record must pass `strainSchema` in `lib/schema.ts`.

At minimum, provide:

```json
{
  "id": "lowercase-kebab-id",
  "name": "Strain Name",
  "parentage": { "display": "Parent A × Parent B" },
  "overview": "A cautious, source-aware 50–120 word overview.",
  "aroma": { "dominant": [] },
  "effects": {},
  "cultivation": {},
  "confidence": {
    "lineage": "unknown",
    "information": "unknown",
    "notes": "Explain what still needs verification."
  }
}
```

Run `npm test` and `npm run build`. Validation errors include the record index and field path. IDs must be unique lowercase kebab-case. Do not put strain facts inside components.

For a GBS project, add:

```json
"project": {
  "isGBSProject": true,
  "status": "active-hunt",
  "generation": "F2",
  "huntSize": 48,
  "keeperNotes": "Direct observations only."
}
```

Valid project states are `concept`, `active-hunt`, `selection`, `stabilization`, and `archived`.

## Confidence levels

- `breeder-verified` — attributable breeder material for that release
- `strongly-documented` — several consistent archival or first-hand sources
- `widely-accepted` — repeated consistently without complete primary documentation
- `community-reported` — useful grower or collector reporting that needs stronger sourcing
- `disputed` — meaningful sources or communities disagree
- `unknown` — the archive cannot make a responsible conclusion

Lineage confidence and information confidence are deliberately separate. A famous clone can have a strongly documented history and unknown genetic parents.

## Local progress

The app stores the following browser-local records under versioned `gbs-strain-flip:*` keys:

- per-strain views, correct answers, missed answers, favorite state, mastery, and last view
- total card views, recent IDs, current streak, and last study date
- filter-specific queues
- motion, sound, weighting, history length, default mode, and density preferences

No data leaves the device. Clearing site data or using **Reset all progress** removes it.

## Breeder research workflow

1. Add public sources and candidates to `scripts/generate-breeder-research.mjs`.
2. Keep exact generations, backcrosses, selfed releases, preservation versions, and unrelated same-name cultivars as distinct records.
3. Route ambiguous candidates to `data/research/*/unresolved.json`; never invent missing details.
4. Regenerate with `node scripts/generate-breeder-research.mjs`.
5. Review `docs/breeder-catalog-research.md`, then run lint, tests, and both production builds.

## PWA and offline behavior

Production builds register `public/sw.js`. The service worker precaches the core routes and then stores pages as they are opened. The main library and previously visited detail pages remain usable offline; uncached navigation falls back to `public/offline.html`.

When changing the offline strategy, bump the cache name in `public/sw.js`.

## Vercel deployment

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Use `npm run build` as the build command and leave the output directory at the Next.js default.
5. No environment variables are required.
6. Deploy, then replace the example `metadataBase` in `app/layout.tsx` with the production origin if your platform does not provide it automatically.

The default scripts use the native Next.js toolchain for Vercel. The included Sites/vinext adapter remains available through `npm run dev:sites` and `npm run build:sites` for the bundled hosting workflow.

## Known limitations

- Tier C records are catalog-existence records, not complete profiles.
- Progress does not sync across browsers or devices.
- A service worker can cache an older data bundle until the cache version changes.
- Sounds are synthesized browser tones, not production audio files.
- The app does not yet support user-authored notes, imports, exports, photos, or team collaboration.
- Some sample generation records exist only to demonstrate schema and filter behavior and are labeled accordingly.

## Suggested next steps

- Continue source-by-source editorial review to promote eligible Tier C records.
- Add JSON import/export with a dry-run validation report.
- Support accession IDs and parent record relationships instead of display strings alone.
- Add opt-in encrypted sync for progress and private project notes.
- Add documented phenohunt tables, photos, and keeper comparisons for GBS projects.
- Add a small administrative editor that writes schema-valid JSON.

## Human verification queue

Before public release, verify:

- all historical release eras and breeder attributions
- exact parent sequence, generation, and named selections
- flowering ranges and environmental recommendations
- phenotype frequency, keeper traits, and weaknesses
- effect and sensory descriptions against multiple direct observations
- breeding-value claims and whether they apply to a specific cut or population
- every GBS project's parent order, generation, hunt size, status, and keeper notes
- all six records labeled `(example line)`, which should be replaced or removed
