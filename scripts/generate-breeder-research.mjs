import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reviewedAt = "2026-07-23";
const base = JSON.parse(fs.readFileSync(path.join(root, "data", "strains.json"), "utf8"));
const requestedBreederResearch = JSON.parse(
  fs.readFileSync(path.join(root, "data", "research", "requested-breeder-lineages.json"), "utf8"),
);

const catalogs = {
  "dominion-duke-diamond": {
    label: "Duke Diamond / Dominion Seed Company",
    breeder: "Dominion Seed Company",
    names: [
      "6 Mill", "187", "Airborne G13 x SSGH", "Beefcake D", "Burnout Chem", "Capital G", "Chi-Chi's",
      "Deadband", "Defcon 4", "Delta Blues", "Dominion Diesel", "Dominion G", "Dominion Skunk", "Figure Four",
      "FreeBird", "Fruit Cup", "G-Rind", "G13 Skunk", "Gooey x C99", "Granny Skunk", "Helena", "Hoodoo",
      "Imperial Eagle", "Kief Sweat", "Kough Drop", "Local H", "Local Skunk",
      "Lonestar Sharon's White Widow x Cinderella 99", "Mountain Berry", "Munson", "PineBomb", "Polecat 91 BX",
      "Princess X Eugenics", "Punch Band", "Purple Dahlia", "Rowdy Chem", "Sangria Punch", "Savage Headband",
      "Screaming Eagle", "Shineapple", "Sis Skunk", "Skunkband", "Skunkband V2", "SmuckHead", "Sour Skunk",
      "Stash Plant", "Supa Fly", "Swayze",
      "Princess x SSGH", "Gooey x Afghani", "OG Kush x Afghani", "Headband x Afghani",
      "Lonestar's BGCA Killer Queen x TGA Vortex", "Black Lotus x TGA Vortex", "Lavender x Afghani",
      "North End Punch"
    ],
    sources: [
      {
        id: "dominion-seedfinder-catalog",
        label: "SeedFinder — Dominion Seed Company catalog",
        type: "seed-database",
        url: "https://seedfinder.eu/en/database/breeder/dominion-seed-company",
        reliability: "strong-secondary",
        fields: ["existence", "name", "breeder", "catalog membership"],
        accessedAt: reviewedAt
      },
      {
        id: "duke-leaf-profile",
        label: "Leaf Magazine — Duke Diamond profile",
        type: "breeder-interview",
        url: "https://leafmagazines.com/profiles/duke-diamond-of-dominion-seed-company/",
        reliability: "strong-secondary",
        fields: ["biography", "era", "signature releases"],
        accessedAt: reviewedAt
      },
      {
        id: "dominion-current-retailer",
        label: "Growers Seeds — Dominion Seed Company products",
        type: "retailer-breeder-page",
        url: "https://growersseeds.com/product-category/dominion-seed-company/",
        reliability: "secondary",
        fields: ["current listing", "parentage", "generation"],
        accessedAt: reviewedAt
      },
      {
        id: "duke-vault-retailer",
        label: "Growers Seeds — Duke Diamond's Vault products",
        type: "retailer-breeder-page",
        url: "https://growersseeds.com/product-category/duke-diamonds-vault/",
        reliability: "secondary",
        fields: ["current listing", "parentage", "catalog grouping"],
        accessedAt: reviewedAt
      }
    ]
  },
  "subcool-tga-the-dank": {
    label: "Subcool / TGA / The Dank",
    breeder: "SubCool's The Dank",
    names: [
      "Ace of Spades", "Afgoo Overdrive", "Alchemy", "Apollo 13 BX", "Asian Persuasion", "Astro Queen", "Astroboy",
      "Astrosnaps", "Banana Jack OG", "Batgirl", "Blood Berries", "Blood Wreck", "Butter Cup", "Cheese Quake",
      "Chernobyl", "Chernobyl F2", "Chernobyl S1", "Cherry Cordial", "Cherry Lemonade", "Cherrygasm",
      "Conquistador", "Conspiracy Kush", "Cosmic Glue", "Cuvee", "Dairy Queen", "Dannyboy", "Dawggone Sour",
      "Deadlights", "Deep Purple", "Doc Holidaze", "Double Purple Doja", "Dr Who", "Galactic Jack", "Grape Inferno",
      "Grape Lime Ricky", "Hazy Margarita", "Hurkle", "Jack Skellington", "Jack Skellington F2", "Jack Straw",
      "Jack The Ripper BX", "Jack The Ripper F3", "Jacked-Up", "Jacks Cleaner", "Jacks Cleaner 2",
      "Jacks Cleaner Bx", "Jack the Ripper", "Jesus OG", "Jesus OG BX", "Jesus OG S1", "Kaboom", "Kaffir Lime",
      "Killer Grape", "Lemon Freeze", "Lemon Stilton", "Locomotion", "Marionberry Kush", "Mickey Kush",
      "My Sharona", "Neon Super Skunk", "Nepali Queen", "Nurse Jackie", "Old Family Querkle", "Ozzy",
      "Pandoras Box", "Pandora's Box F2", "Peace Train", "Pennywise", "Pennywise F2", "Pina Rita", "PineSol Piff",
      "Professor Chaos", "Purgatory", "Qleaner", "Qrazy Train", "Qrazytrain F2", "Quantum K9", "Quantum Kush",
      "Queen Anne's Revenge", "Querkle", "Querkle BX", "Querkle F2", "Qush", "Ripped Bubba", "Roswell",
      "Sangeria", "Scarlet Queen", "Slymer BX", "Slymer S1", "Sonic Screwdriver", "Space Bomb", "Space Candy",
      "Space Queen", "Space Queen BX", "Spacedawg", "Spacetooth", "Sputnik 1.0", "Sputnik 2.0",
      "Strawberry Daiquiri", "Subcool OG", "The Flav", "The Rapture", "The Third Dimension", "The Void",
      "Third Dimension F2", "Tinto De Verano", "UVA", "Vanilla Tart", "Vortex", "Vortex F2", "Zinger",
      "Jillybean", "Agent Orange"
    ],
    sources: [
      {
        id: "subcool-seedfinder-catalog",
        label: "SeedFinder — SubCool's The Dank catalog",
        type: "seed-database",
        url: "https://seedfinder.eu/index.php/en/database/breeder/subcools-the-dank",
        reliability: "strong-secondary",
        fields: ["existence", "name", "breeder", "catalog membership"],
        accessedAt: reviewedAt
      },
      {
        id: "subcool-leafly-brand",
        label: "Leafly — The Dank / TGA brand history",
        type: "archive",
        url: "https://www.leafly.com/brands/tga-subcool",
        reliability: "secondary",
        fields: ["history", "era", "collaborations"],
        accessedAt: reviewedAt
      },
      {
        id: "mzjill-about",
        label: "MzJill Genetics — About",
        type: "official-breeder",
        url: "https://mzjill.com/about/",
        reliability: "primary",
        fields: ["creator attribution", "Jillybean", "Agent Orange", "TGA history"],
        accessedAt: reviewedAt
      },
      {
        id: "subcool-legacy-profile",
        label: "Weedmaps — Subcool profile and TGA transition",
        type: "interview",
        url: "https://weedmaps.com/news/2021/02/who-is-subcool-the-legendary-cannabis-breeder-explained",
        reliability: "strong-secondary",
        fields: ["history", "rights transition", "collaborations"],
        accessedAt: reviewedAt
      }
    ]
  },
  "bless-coast": {
    label: "Bless Coast Seeds",
    breeder: "Bless Coast Seeds",
    names: [
      "Samurai Sour F1", "Samurai Sour F2", "Samurai Sour F3 #9", "Sour Samurai F3 Reaper Edition",
      "Komorebi", "SourRain", "Cheddar Wheel", "Titan's Katana", "Hatchimaki V2", "Sakura Sour", "Shibui",
      "GluJitsu", "NumbChuck", "Blueberry Samurai V3", "Pineapple Splitter"
    ],
    sources: [
      {
        id: "bless-official-story",
        label: "Bless Coast Seeds — Sour Samurai story",
        type: "official-breeder",
        url: "https://www.blesscoastseeds.com/sour-samurai/",
        reliability: "primary",
        fields: ["program history", "parentage", "F1–F4 development", "selection"],
        accessedAt: reviewedAt
      },
      {
        id: "bless-official-store",
        label: "Bless Coast Seeds — official store",
        type: "official-product",
        url: "https://www.blesscoastseeds.com/",
        reliability: "primary",
        fields: ["current releases", "parentage", "availability"],
        accessedAt: reviewedAt
      },
      {
        id: "bless-retailer",
        label: "Seeds Here Now — Bless Coast breeder page",
        type: "retailer-breeder-page",
        url: "https://seedsherenow.com/breeders/bless-coast-seeds/",
        reliability: "secondary",
        fields: ["older releases", "parentage", "breeder biography"],
        accessedAt: reviewedAt
      },
      {
        id: "bless-older-retailer",
        label: "SeedsBreeders — Bless Coast catalog",
        type: "retailer-breeder-page",
        url: "https://seedsbreeders.com/product-category/bless-coast-seeds/",
        reliability: "secondary",
        fields: ["older releases", "parentage"],
        accessedAt: reviewedAt
      }
    ]
  },
  "lemon-hoko": {
    label: "Lemon Hoko Genetix",
    breeder: "Lemon Hoko Genetix",
    names: [
      "Berry White IX", "Black Sur Holy Weed", "Black Sur Holy Weed F2", "Blueberry BX3", "Blueberry IX",
      "Dogon", "Glue DD F2", "Chem DD F2", "Chem DD F3", "Chem DD BX1", "Chem DD BX2", "Royal Chem DD"
    ],
    sources: [
      {
        id: "hoko-seedfinder-catalog",
        label: "SeedFinder — Lemon Hoko Genetix catalog",
        type: "seed-database",
        url: "https://seedfinder.eu/en/database/breeder/lemon-hoko-genetix",
        reliability: "strong-secondary",
        fields: ["existence", "name", "breeder", "catalog membership"],
        accessedAt: reviewedAt
      },
      {
        id: "hoko-retailer",
        label: "Growers Seeds — Lemon Hoko catalog",
        type: "retailer-breeder-page",
        url: "https://growersseeds.com/product-category/lemon-hoko/",
        reliability: "secondary",
        fields: ["current releases", "parentage", "generation"],
        accessedAt: reviewedAt
      },
      {
        id: "hoko-seedsherenow",
        label: "Seeds Here Now — Lemon Hoko products",
        type: "retailer-breeder-page",
        url: "https://seedsherenow.com/product-category/cannabis-seed-breeders/lemon-hoko/",
        reliability: "secondary",
        fields: ["current and archived releases", "parentage"],
        accessedAt: reviewedAt
      },
      {
        id: "hoko-chemdd-diary",
        label: "ICMag — Lemon Hoko Chem DD BX2 grow diary",
        type: "grow-report",
        url: "https://www.icmag.com/threads/lemonhokos-chem-dd-bx2.366471/",
        reliability: "community",
        fields: ["Chem DD version existence", "grow observations"],
        accessedAt: reviewedAt
      },
      {
        id: "hoko-chemdd-f3",
        label: "Goose Seeds — Lemon Hoko Chem DD F3",
        type: "retailer-breeder-page",
        url: "https://gooseseeds.com/product/chem-dd-f3/",
        reliability: "secondary",
        fields: ["Chem DD F3 existence", "parentage"],
        accessedAt: reviewedAt
      }
    ]
  }
};

const requestedCollectionProfiles = {
  "norstar-genetics": {
    label: "NorStar Genetics",
    breeder: "NorStar Genetics",
    era: "California medical era to current genetics library",
    thesis: "California catalog work spanning classic clone preservation, OG families, Colombian influence, and wide-ranging hybrid projects.",
    biography: "NorStar describes its program as a continuing hunt built around testing, elite acquisition, and breeding for California's medical community. The collection includes both new hybrids and preservation-style releases, so attribution roles remain explicit.",
    aliases: [{ canonical: "NorStar Genetics", aliases: ["Norstar Genetics", "NorStar"], kind: "company" }],
    signatureIds: ["alcatraz-og", "bubba-fresh", "frisco-og", "grand-poobah", "the-mission"],
    extraSources: [
      {
        id: "norstar-official-about",
        label: "NorStar Genetics — About",
        type: "official-breeder",
        url: "https://norstargenetics.com/about/",
        reliability: "primary",
        fields: ["breeder biography", "program scope", "California medical context"],
        accessedAt: reviewedAt,
      },
    ],
  },
  thunderfudge: {
    label: "Thunderfudge",
    breeder: "Thunderfudge",
    era: "Contemporary U.S. hybrid catalog",
    thesis: "Chem, Sour Larry, WiFi, strawberry, haze, and fire-family combinations organized around recurring working lines.",
    biography: "Thunderfudge's public catalog is reconstructed from release-specific lineage pages and archive indexes. The records preserve compound parentage exactly as published rather than simplifying multi-stage crosses.",
    aliases: [{ canonical: "Thunderfudge", aliases: ["Thunder Fudge"], kind: "breeder/brand" }],
    signatureIds: ["black-fire-alien-strawberry", "couch-slouch", "super-lemon-haze-bx1", "ultimate-chem-08", "ultrabrite"],
    extraSources: [
      {
        id: "thunderfudge-thcfarmer-catalog",
        label: "THCFarmer — Thunderfudge catalog profile",
        type: "archive",
        url: "https://www.thcfarmer.com/strains/breeders/thunderfudge.2290/",
        reliability: "secondary",
        fields: ["catalog count", "breeder attribution"],
        accessedAt: reviewedAt,
      },
    ],
  },
  "blackbird-preservations": {
    label: "Blackbird Preservations",
    breeder: "Blackbird Preservations",
    era: "Contemporary preservation archive",
    thesis: "Preservation-minded releases spanning classic clones, heirlooms, landrace-derived accessions, and old building-block genetics.",
    biography: "Blackbird frames the work as preservation: seed increases and carefully documented releases intended to keep classic, heirloom, farmed, and clone-only material available. Records therefore use preservation attribution instead of implying original creation.",
    aliases: [{ canonical: "Blackbird Preservations", aliases: ["Blackbird"], kind: "preservation project" }],
    signatureIds: ["alberni-borealis", "baghlan-hindu", "northern-lights-5-blackbird", "purple-pakistani-chitral", "vietnamese-black"],
    extraSources: [],
  },
  "rare-dankness": {
    label: "Rare Dankness",
    breeder: "Rare Dankness Seeds",
    era: "Colorado medical era to current international archive",
    thesis: "Colorado breeding built around Rare Dankness males, Ghost OG, Chem, Triangle Kush, Afghani, and long-flowering haze families.",
    biography: "Founded in 2010, Rare Dankness describes a program built from decades of collected genetics and selected males designed to complement elite mothers. The archive distinguishes the Rare Dankness #1 and #2 breeding lines and preserves numbered releases separately.",
    aliases: [{ canonical: "Rare Dankness", aliases: ["Rare Dankness Seeds", "RD Genetics"], kind: "company/brand" }],
    signatureIds: ["501st-og", "ghost-train-haze-1", "rare-darkness", "scotts-og", "venom-og"],
    extraSources: [
      {
        id: "rare-dankness-official-about",
        label: "Rare Dankness — official history",
        type: "official-breeder",
        url: "https://raredankness.com/",
        reliability: "primary",
        fields: ["founding year", "breeding philosophy", "company history"],
        accessedAt: reviewedAt,
      },
    ],
  },
};

for (const collection of requestedBreederResearch.collections) {
  const profile = requestedCollectionProfiles[collection.collectionSlug];
  catalogs[collection.collectionSlug] = {
    label: profile.label,
    breeder: profile.breeder,
    names: collection.accepted.map((item) => item.name),
    sources: [
      {
        id: `${collection.collectionSlug}-seedfinder-catalog`,
        label: `SeedFinder — ${profile.label} catalog`,
        type: "seed-database",
        url: collection.catalogUrl,
        reliability: "strong-secondary",
        fields: ["existence", "name", "catalog membership", "lineage index"],
        accessedAt: reviewedAt,
      },
      ...profile.extraSources,
    ],
  };
}

const aliases = {
  "dominion-duke-diamond": [
    { canonical: "Duke Diamond", aliases: ["Duke", "Duke Diamond VA"], kind: "person" },
    { canonical: "Dominion Seed Company", aliases: ["Dominion Seeds", "Dominion"], kind: "company" },
    { canonical: "Stash Plant", aliases: ["Stashplant"], kind: "strain" }
  ],
  "subcool-tga-the-dank": [
    { canonical: "Subcool", aliases: ["SubCool", "Subcool Seeds"], kind: "person/brand" },
    { canonical: "SubCool's The Dank", aliases: ["The Dank", "TGA Subcool"], kind: "company/era" },
    { canonical: "TGA Genetics", aliases: ["TGA Seeds", "The Green Avengers"], kind: "company/era" },
    { canonical: "Jack the Ripper", aliases: ["JTR"], kind: "strain" },
    { canonical: "Jacks Cleaner", aliases: ["Jack's Cleaner", "JC"], kind: "strain" },
    { canonical: "Pandoras Box", aliases: ["Pandora's Box"], kind: "strain" }
  ],
  "bless-coast": [
    { canonical: "Bless Coast Seeds", aliases: ["Bless Coast"], kind: "company" },
    { canonical: "Samurai Sour", aliases: ["Sour Samurai", "Atom Splitter"], kind: "program/earlier name", notes: "Atom Splitter is retained as a historical alias pending evidence for a separate commercial release." },
    { canonical: "Titan", aliases: ["Bless Coast Titan"], kind: "person", notes: "Do not conflate with THC Titan." }
  ],
  "lemon-hoko": [
    { canonical: "Lemon Hoko Genetix", aliases: ["Lemon Hoko", "Lemonhoko"], kind: "company/person" },
    { canonical: "Berry White IX", aliases: ["BerryWhite IX"], kind: "strain" },
    { canonical: "Blueberry IX", aliases: ["Lemon Hoko's Blueberry IX"], kind: "strain" }
  ]
};

const unresolved = {
  "dominion-duke-diamond": [
    { candidate: "Thunderhole F2 + William's Wonder", reason: "Retail title appears to bundle two releases; no single canonical cultivar can be inferred." },
    { candidate: "Delta Blues + Shineapple", reason: "Retail title and cross notation conflict; hold until the breeder or retailer clarifies whether this is a bundle or a named cross." },
    { candidate: "Screaming Eagle alternate parentage", reason: "Search snippets conflict; the SeedFinder lineage tree is used provisionally and the dispute remains visible." }
  ],
  "subcool-tga-the-dank": [
    { candidate: "9 Pound Hammer", reason: "Strongly associated with the wider TGA/MzJill catalog, but not present in the selected SubCool's The Dank master list; needs creator-specific primary sourcing." },
    { candidate: "Catalog ownership after the TGA split", reason: "Creator, release, and later rights-holder credits vary by era; records use separate attribution roles instead of a single ownership claim." }
  ],
  "bless-coast": [
    { candidate: "Atom Splitter", reason: "Official/community history describes it as an earlier Samurai Sour name; no separate retail release was confirmed." },
    { candidate: "Samurai Sour F4", reason: "Development is described by the breeder, but a distinct public release was not confirmed." }
  ],
  "lemon-hoko": [
    { candidate: "Chem DD F4", reason: "Tester activity was found, but a public release was not confirmed." },
    { candidate: "Blueberry BX4", reason: "Community references only; no stable catalog or product source confirmed." },
    { candidate: "HogDawg Alien", reason: "Community reference only; breeder attribution and release status remain unresolved." }
  ]
};

const rejected = {
  "dominion-duke-diamond": [
    { candidate: "Unlabeled retailer bundles", reason: "Bundles are not normalized into cultivar records." }
  ],
  "subcool-tga-the-dank": [
    { candidate: "Later third-party recreations presented as originals", reason: "Preservation and recreation versions require distinct records and attribution." }
  ],
  "bless-coast": [
    { candidate: "THC Titan catalog entries", reason: "Name collision with Bless Coast's Titan; not the same breeder." }
  ],
  "lemon-hoko": [
    { candidate: "Duplicate storefront SKUs", reason: "Repeated inventory entries are merged into one canonical release record." }
  ]
};

for (const collection of requestedBreederResearch.collections) {
  const profile = requestedCollectionProfiles[collection.collectionSlug];
  aliases[collection.collectionSlug] = profile.aliases;
  unresolved[collection.collectionSlug] = collection.unresolved.map((item) => ({
    candidate: item.name,
    reason: `${item.reason}${item.lineageDisplay ? ` Published lineage: ${item.lineageDisplay}.` : ""}`,
  }));
  rejected[collection.collectionSlug] = [];
}

const details = {
  "6 Mill": { parents: ["Local H", "Screaming Eagle"], generation: "F1", tier: "B", signature: true, sourcePath: "https://seedfinder.eu/en/strain-info/6-mill/dominion-seed-company", flowering: [60, 68], aroma: ["sour grapefruit", "gas", "skunk"], overview: "A Dominion release pairing Local H with Screaming Eagle, documented as a stretching, resin-forward line with sour grapefruit and fuel notes." },
  "Burnout Chem": { parents: ["Chemdog D", "Dominion Skunk"], generation: "F1", tier: "B", signature: true, sourcePath: "https://seedfinder.eu/en/strain-info/burnout-chem/dominion-seed-company", flowering: [60, 68], aroma: ["burnt rubber", "asphalt", "chem"], overview: "A Chemdog D and Dominion Skunk cross documented by Dominion with lateral branching and a burnt-rubber chem profile." },
  "Delta Blues": { parents: ["88 G13 Hashplant", "Screaming Eagle"], generation: "F1", tier: "B", signature: true, sourcePath: "https://seedfinder.eu/en/strain-info/delta-blues/dominion-seed-company", flowering: [58, 64], aroma: ["grape", "hash", "cocoa"], overview: "A Dominion pairing of 88 G13 Hashplant and Screaming Eagle, archived with grape, hash, and cocoa-leaning expressions." },
  "PineBomb": { parents: ["Sensi Durban Poison", "Screaming Eagle"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/dominion-seed-company-pinebomb-reg/" },
  "Hoodoo": { parents: ["Crossroad Chem", "Dominion Skunk"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/dominion-seed-company-hoodoo-reg/", collaborators: ["Dominion Seed Company collaborator; partner not named in retained source"] },
  "Stash Plant": { parents: ["Puck", "Screaming Eagle"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/dominion-seed-company-stash-plant-reg/" },
  "Sangria Punch": { parents: ["Killer Queen", "Screaming Eagle"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/dominion-seed-company-sangria-punch-reg/" },
  "Supa Fly": { parents: ["CrossRoads Chem", "Figure Four"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/dominion-seed-company-supa-fly-reg/" },
  "North End Punch": { parents: ["Hoodoo", "Sangria Punch"], tier: "B", sourcePath: "https://growersseeds.com/product/dominion-seed-company-north-end-punch-reg/" },
  "Screaming Eagle": { parents: ["Airborne G13", "88 G13 Hashplant × Afghani"], tier: "B", signature: true, sourcePath: "https://seedfinder.eu/en/strain-info/screaming-eagle/dominion-seed-company", notes: "An alternate parentage snippet was found during research; this representation follows the catalog lineage tree and remains flagged for review." },

  "Chernobyl": { parents: ["Blood Wreck (Trainwreck × Trinity)", "Jack the Ripper"], tier: "B", signature: true, sourcePath: "https://seedfinder.eu/index.php/en/strain-info/chernobyl/subcools-the-dank", flowering: [56, 63], aroma: ["lime", "citrus", "sweet"], overview: "A Subcool catalog line combining Blood Wreck with Jack the Ripper; the retained catalog description frames it through Trainwreck, Trinity, Jack's Cleaner, and Space Queen ancestry." },
  "Jack the Ripper": { parents: ["Jacks Cleaner", "Space Queen"], tier: "B", signature: true, aliases: ["JTR"], sourcePath: "https://seedfinder.eu/index.php/en/strain-info/jack-the-ripper/subcools-the-dank", flowering: [56, 70], aroma: ["lemon", "mango", "pine"], overview: "A signature Subcool outcross of Jacks Cleaner and Space Queen, built around the Cleaner line rather than treated as a generic Jack-named hybrid." },
  "Querkle": { parents: ["Purple Urkle", "Space Queen"], tier: "B", signature: true, sourcePath: "https://seedfinder.eu/index.php/en/strain-info/querkle/subcools-the-dank", flowering: [56, 56], aroma: ["grape", "fruit", "must"], overview: "A Purple Urkle and Space Queen cross documented as an attempt to carry the Urkle profile into a faster seed line." },
  "Vortex": { parents: ["Apollo 13", "Space Queen"], tier: "B", signature: true, sourcePath: "https://seedfinder.eu/index.php/en/strain-info/vortex/subcools-the-dank", flowering: [45, 55], aroma: ["mango", "lemon", "fermented fruit"], overview: "A Subcool cross of Apollo 13 and Space Queen with a documented tendency toward vine-like structure and wide expression." },
  "Apollo 13 BX": { parents: ["Apollo 13", "Vortex"], tier: "B", sourcePath: "https://seedfinder.eu/index.php/en/strain-info/vortex/subcools-the-dank" },
  "Cheese Quake": { parents: ["Cheese", "Querkle"], tier: "B", sourcePath: "https://seedfinder.eu/index.php/en/strain-info/querkle/subcools-the-dank" },
  "Deep Purple": { parents: ["Purple Urkle", "Querkle"], tier: "B", sourcePath: "https://seedfinder.eu/index.php/en/strain-info/querkle/subcools-the-dank" },
  "Space Queen": { id: "space-queen-subcool-release", parents: ["Romulan", "Cinderella 99"], tier: "B", signature: true, sourcePath: "https://seedfinder.eu/index.php/en/database/breeder/subcools-the-dank", notes: "This record represents the Subcool catalog release/working line and remains distinct from the Vic High archive record." },
  "Jillybean": { id: "jillybean", breeder: "MzJill Genetics", parents: ["Orange Velvet", "Space Queen"], tier: "A", signature: true, sourcePath: "https://mzjill.com/about/", attributions: [{ name: "MzJill", role: "breeder" }, { name: "TGA Genetics", role: "release-partner" }], releasePartners: ["TGA Genetics"], overview: "MzJill identifies Jilly Bean as her first and best-known creation; its historical release belongs in the TGA partnership story without erasing creator credit." },
  "Agent Orange": { id: "agent-orange", breeder: "MzJill Genetics", parents: ["Orange Velvet", "Jack the Ripper"], tier: "A", signature: true, sourcePath: "https://mzjill.com/about/", attributions: [{ name: "MzJill", role: "breeder" }, { name: "TGA Genetics", role: "release-partner" }], releasePartners: ["TGA Genetics"], overview: "MzJill's official history identifies Agent Orange as a personal creation made in honor of her father; TGA is retained as the historical release partnership." },

  "Samurai Sour F1": { parents: ["Rez Sour Diesel 2007 IBL × Headbanger", "Sour Power OG"], tier: "A", signature: true, sourcePath: "https://www.blesscoastseeds.com/sour-samurai/", generation: "F1" },
  "Samurai Sour F2": { parents: ["Samurai Sour F1", "Samurai Sour F1"], tier: "A", signature: true, sourcePath: "https://www.blesscoastseeds.com/sour-samurai/", generation: "F2" },
  "Samurai Sour F3 #9": { parents: ["Samurai Sour F2", "Samurai Sour F2"], tier: "B", signature: true, sourcePath: "https://seedsbreeders.com/product-category/bless-coast-seeds/", generation: "F3" },
  "Sour Samurai F3 Reaper Edition": { parents: ["Samurai Sour F2 Reaper", "Samurai Sour F2 Reaper"], tier: "A", signature: true, sourcePath: "https://www.blesscoastseeds.com/product/sour-samurai-test-product/", generation: "F3" },
  "Komorebi": { parents: ["Sour Diesel", "Samurai Sour F2"], tier: "B", sourcePath: "https://seedsherenow.com/shop/bless-coast-seeds-komorebi-reg-10pk/" },
  "SourRain": { parents: ["Candy Rain", "Samurai Sour F1"], tier: "B", sourcePath: "https://seedsherenow.com/shop/bless-coast-seeds-sourrain-reg-10pk/" },
  "Cheddar Wheel": { parents: ["UK Cheese", "Samurai Sour F2"], tier: "B", sourcePath: "https://seedsherenow.com/shop/bless-coast-seeds-cheddar-wheel-reg-10pk/" },
  "Titan's Katana": { parents: ["ECSD", "Samurai Sour F2"], tier: "B", sourcePath: "https://seedsherenow.com/shop/bless-coast-seeds-titans-katana-reg-10pk/" },
  "Hatchimaki V2": { parents: ["Headband", "Samurai Sour F2 Reaper"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/hatchimaki/" },
  "Sakura Sour": { parents: ["Black Cherry Cheesecake", "Blueberry Sativa BC3"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/sakura-sour-2/" },
  "Shibui": { parents: ["Exodus Cheese", "Blueberry Sativa BC3"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/shibui/" },
  "GluJitsu": { parents: ["GG4 × Samurai Sour F1", "Samurai Sour F2"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/glujitsu/" },
  "NumbChuck": { parents: ["Chem Dog", "Samurai Sour F2"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/numbchuck/" },
  "Blueberry Samurai V3": { parents: ["Blueberry Sativa BC3", "Samurai Sour F2 Reaper"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/sakura-sour/" },
  "Pineapple Splitter": { parents: ["Schnappy Pineapple", "Samurai Sour F2 Reaper"], tier: "A", sourcePath: "https://www.blesscoastseeds.com/product/pineapple-splitter/" },

  "Berry White IX": { parents: ["Berry White F4", "Blueberry BX2"], tier: "B", sourcePath: "https://growersseeds.com/product/lemon-hoko-berry-white-ix-reg/" },
  "Black Sur Holy Weed F2": { parents: ["Black Triangle × Big Sur Holy Weed P1", "Black Triangle × Big Sur Holy Weed P1"], tier: "B", sourcePath: "https://growersseeds.com/product/lemon-hoko-black-sur-holy-weed-f2/", generation: "F2" },
  "Blueberry BX3": { parents: ["Pre-99 Sativa Blueberry", "Blueberry BX2"], tier: "B", signature: true, sourcePath: "https://growersseeds.com/product/lemon-hoko-blueberry-bx3-reg/", generation: "BX3" },
  "Blueberry IX": { parents: ["Blueberry", "Blueberry"], tier: "B", sourcePath: "https://seedsherenow.com/shop/lemon-hoko-blueberry-ix/" },
  "Glue DD F2": { parents: ["Gorilla Glue #4", "Chem DD BX2"], tier: "B", sourcePath: "https://growersseeds.com/product/lemon-hoko-glue-dd-f2-reg-2/", generation: "F2" },
  "Chem DD F3": { parents: ["Chem DD F2", "Chem DD F2"], tier: "B", signature: true, sourcePath: "https://gooseseeds.com/product/chem-dd-f3/", generation: "F3", notes: "The retailer history traces the underlying work to Chem D and a Rez Sour Diesel IBL male." },
  "Royal Chem DD": { parents: ["Chem 91 × Deadhead OG", "Chem DD F3"], tier: "C", sourcePath: "https://strainly.io/en/listings/488337-lemon-hoko-royal-chem-dd" }
};

const requestedDetails = new Map();
for (const collection of requestedBreederResearch.collections) {
  const profile = requestedCollectionProfiles[collection.collectionSlug];
  for (const item of collection.accepted) {
    const isPreservation =
      collection.collectionSlug === "blackbird-preservations"
      || (item.parents.length === 1 && item.parents[0].toLowerCase() === item.name.toLowerCase());
    requestedDetails.set(`${collection.collectionSlug}:${item.name}`, {
      parents: item.parents,
      parentageDisplay: item.lineageDisplay,
      tier: "B",
      signature: profile.signatureIds.includes(slugify(item.name)),
      sourcePath: item.url,
      sourceLabel: `SeedFinder — ${item.name} lineage`,
      sourceType: "seed-database",
      sourceReliability: "strong-secondary",
      overview: `A lineage-backed ${profile.label} catalog record. Direct parentage is preserved as published by the cited release archive.`,
      attributions: [{ name: profile.breeder, role: isPreservation ? "preservation" : "breeder" }],
      releaseStatus: isPreservation ? "preservation" : "released",
      catalogGroup: collection.collectionSlug === "blackbird-preservations" ? "preservation archive" : "lineage-backed catalog",
      ...(item.parents.length > 2
        ? { notes: "The source renders this as a compound cross; the display lineage is preserved without forcing it into a two-parent structure." }
        : {}),
    });
  }
}

function slugify(value) {
  return value.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function publicSource(source) {
  const copy = { ...source };
  delete copy.id;
  return copy;
}

function baselineId(name, catalogSlug) {
  const candidate = slugify(name);
  const collision = base.find((record) => record.id === candidate);
  if (!collision) return candidate;
  if ((collision.breeder || "").toLowerCase().includes("subcool") || ["Jillybean", "Agent Orange", "Querkle", "Vortex", "Jacks Cleaner", "Space Bomb"].includes(name)) return candidate;
  return candidate + "-" + catalogSlug.split("-")[0];
}

function makeRecord(name, catalogSlug, catalog) {
  const detail = requestedDetails.get(`${catalogSlug}:${name}`) || details[name] || {};
  const tier = detail.tier || "C";
  const source = detail.sourcePath
    ? {
        label: detail.sourceLabel || (detail.sourcePath.includes("blesscoastseeds.com") ? "Official Bless Coast record" : "Release-specific catalog record"),
        type: detail.sourceType || (detail.sourcePath.includes("blesscoastseeds.com") ? "official-product" : detail.sourcePath.includes("seedfinder") ? "seed-database" : "retailer-breeder-page"),
        url: detail.sourcePath,
        accessedAt: reviewedAt,
        fields: ["existence", "name", "breeder", ...(detail.parents || detail.parentageDisplay ? ["parentage"] : [])],
        reliability: detail.sourceReliability || (detail.sourcePath.includes("blesscoastseeds.com") ? "primary" : "strong-secondary")
      }
    : publicSource(catalog.sources[0]);
  const firstSource = publicSource(catalog.sources[0]);
  const existingId = detail.id || baselineId(name, catalogSlug);
  const existing = base.find((record) => record.id === existingId);
  const breeder = detail.breeder || catalog.breeder;
  const parentage = detail.parents || detail.parentageDisplay
    ? {
        ...(detail.parents?.length === 1 ? { mother: { name: detail.parents[0], type: "strain" } } : {}),
        ...(detail.parents?.length === 2
          ? {
              mother: { name: detail.parents[0], type: "strain" },
              father: { name: detail.parents[1], type: "strain" },
            }
          : {}),
        display: detail.parentageDisplay || detail.parents.join(" × "),
        ...(detail.notes ? { notes: detail.notes } : {})
      }
    : {
        display: "Parentage not publicly confirmed",
        notes: "Catalog existence is documented; parentage was not promoted from ambiguous or single-snippet evidence."
      };
  const generic = {
    id: existingId,
    name,
    ...(detail.aliases ? { aliases: detail.aliases } : {}),
    breeder,
    parentage,
    ...(detail.generation ? { generation: detail.generation } : {}),
    strainType: existing?.strainType || "unknown",
    overview: detail.overview || (tier === "C"
      ? "Catalog existence confirmed. Detailed information has not yet been documented."
      : "A documented release in the " + catalog.label + " collection. The record is intentionally limited to facts supported by the linked release source."),
    aroma: detail.aroma ? { dominant: detail.aroma } : { dominant: [] },
    effects: { mental: [], physical: [], mood: [] },
    cultivation: detail.flowering ? { floweringDays: { min: detail.flowering[0], max: detail.flowering[1] } } : {},
    families: existing?.families || [],
    tags: [...new Set([...(existing?.tags || []), "researched catalog", catalogSlug])],
    confidence: {
      lineage: detail.parents ? (tier === "A" ? "breeder-verified" : "strongly-documented") : "unknown",
      information: tier === "A" ? "breeder-verified" : tier === "B" ? "strongly-documented" : "unknown",
      notes: tier === "C" ? "Tier C confirms catalog existence only; blank fields are deliberate." : "Field-level confidence and sources identify exactly what is supported."
    },
    documentationTier: tier,
    attributions: (detail.attributions || [{ name: breeder, role: "breeder" }]).map((item) => ({
      ...item,
      confidence: item.role === "release-partner" ? "strongly-documented" : tier === "A" ? "breeder-verified" : "strongly-documented"
    })),
    collection: {
      slug: catalogSlug,
      label: catalog.label,
      catalogGroup: detail.catalogGroup || (catalogSlug === "dominion-duke-diamond" && !catalog.names.slice(0, 48).includes(name) ? "Duke Diamond's Vault / current retail" : catalogSlug === "subcool-tga-the-dank" && ["Jillybean", "Agent Orange"].includes(name) ? "TGA collaboration / MzJill authorship" : "master catalog"),
      signature: Boolean(detail.signature)
    },
    releaseStatus: detail.releaseStatus || "released",
    fieldConfidence: {
      existence: tier === "A" ? "breeder-verified" : "strongly-documented",
      name: tier === "A" ? "breeder-verified" : "strongly-documented",
      breeder: tier === "A" ? "breeder-verified" : "strongly-documented",
      parentage: detail.parents || detail.parentageDisplay ? (tier === "A" ? "breeder-verified" : "strongly-documented") : "unknown",
      version: detail.generation ? (tier === "A" ? "breeder-verified" : "strongly-documented") : "unknown",
      history: "unknown",
      cultivation: detail.flowering ? "strongly-documented" : "unknown",
      aroma: detail.aroma ? "strongly-documented" : "unknown",
      effects: "unknown"
    },
    relationships: {
      ...(detail.collaborators ? { collaborators: detail.collaborators } : {}),
      ...(detail.releasePartners ? { releasePartners: detail.releasePartners } : {})
    },
    researchStatus: {
      reviewState: detail.notes?.includes("review") ? "needs-review" : "accepted",
      completenessScope: "Best-effort public-web catalog research; not a claim of literal completeness.",
      lastReviewed: reviewedAt
    },
    sources: [...new Map([source, firstSource].map((item) => [item.url || item.label, item])).values()]
  };
  if (!existing) return generic;
  return {
    ...existing,
    ...generic,
    aliases: [...new Set([...(existing.aliases || []), ...(generic.aliases || [])])],
    aroma: detail.aroma ? { ...existing.aroma, dominant: detail.aroma } : existing.aroma,
    effects: existing.effects,
    cultivation: detail.flowering ? { ...existing.cultivation, floweringDays: generic.cultivation.floweringDays } : existing.cultivation,
    families: [...new Set([...(existing.families || []), ...(generic.families || [])])],
    tags: generic.tags,
    sources: [...new Map([...(existing.sources || []), ...generic.sources].map((item) => [item.url || item.label, item])).values()]
  };
}

const records = [];
for (const [catalogSlug, catalog] of Object.entries(catalogs)) {
  for (const name of catalog.names) records.push(makeRecord(name, catalogSlug, catalog));
}

const duplicateIds = records.map((record) => record.id).filter((id, index, all) => all.indexOf(id) !== index);
if (duplicateIds.length) throw new Error("Duplicate generated IDs: " + [...new Set(duplicateIds)].join(", "));

function writeJson(relative, value) {
  const target = path.join(root, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(value, null, 2) + "\n");
}

writeJson("data/breeder-strains.json", records);
writeJson("data/breeders.json", [
  {
    slug: "dominion-duke-diamond",
    name: "Duke Diamond / Dominion Seed Company",
    shortName: "Dominion",
    era: "Early online-forum era to current archive releases",
    thesis: "Southern U.S. preservation work centered on Chem, Skunk, G13/Hashplant, Afghani, and old clone-line material.",
    biography: "Duke Diamond was active in early grow forums, later helped the Brothers Grimm reboot, and built Dominion Seed Company around preserved and recombined old-school material.",
    sourceIds: ["duke-leaf-profile", "dominion-seedfinder-catalog"],
    signatureIds: ["6-mill", "burnout-chem", "delta-blues", "screaming-eagle", "stash-plant"]
  },
  {
    slug: "subcool-tga-the-dank",
    name: "Subcool / TGA / The Dank",
    shortName: "The Dank",
    era: "TGA Genetics era through The Dank rebuild",
    thesis: "Flavor-forward American polyhybrids organized around Jacks Cleaner, Space Queen, Querkle, and related working families.",
    biography: "The archive spans multiple business eras and collaborators. Creator credit, TGA release history, later The Dank releases, and MzJill-authored lines are represented as separate facts.",
    sourceIds: ["subcool-seedfinder-catalog", "subcool-leafly-brand", "mzjill-about", "subcool-legacy-profile"],
    signatureIds: ["jack-the-ripper", "chernobyl", "querkle", "vortex", "space-queen-subcool-release"]
  },
  {
    slug: "bless-coast",
    name: "Bless Coast Seeds",
    shortName: "Bless Coast",
    era: "Contemporary small-batch catalog",
    thesis: "A focused Sour Diesel and Samurai Sour program documented through line-work, selections, and current official releases.",
    biography: "Bless Coast's public record centers on Titan's Samurai Sour program, with a breeder-authored progression from the original composite cross through selected later generations.",
    sourceIds: ["bless-official-story", "bless-official-store", "bless-retailer"],
    signatureIds: ["samurai-sour-f1", "samurai-sour-f2", "sour-samurai-f3-reaper-edition"]
  },
  {
    slug: "lemon-hoko",
    name: "Lemon Hoko Genetix",
    shortName: "Lemon Hoko",
    era: "Forum-era preservation work through current retail archives",
    thesis: "Compact catalog work around Blueberry and Chem DD families, with release/version evidence scattered across retailers and grow forums.",
    biography: "Lemon Hoko's public catalog is smaller and less centralized. Records therefore distinguish stable catalog proof from community-only version references.",
    sourceIds: ["hoko-seedfinder-catalog", "hoko-retailer", "hoko-chemdd-diary"],
    signatureIds: ["blueberry-bx3", "chem-dd-f3", "berry-white-ix"]
  },
  {
    slug: "norstar-genetics",
    name: requestedCollectionProfiles["norstar-genetics"].label,
    shortName: "NorStar",
    era: requestedCollectionProfiles["norstar-genetics"].era,
    thesis: requestedCollectionProfiles["norstar-genetics"].thesis,
    biography: requestedCollectionProfiles["norstar-genetics"].biography,
    sourceIds: ["norstar-genetics-seedfinder-catalog", "norstar-official-about"],
    signatureIds: requestedCollectionProfiles["norstar-genetics"].signatureIds
  },
  {
    slug: "thunderfudge",
    name: requestedCollectionProfiles.thunderfudge.label,
    shortName: "Thunderfudge",
    era: requestedCollectionProfiles.thunderfudge.era,
    thesis: requestedCollectionProfiles.thunderfudge.thesis,
    biography: requestedCollectionProfiles.thunderfudge.biography,
    sourceIds: ["thunderfudge-seedfinder-catalog", "thunderfudge-thcfarmer-catalog"],
    signatureIds: requestedCollectionProfiles.thunderfudge.signatureIds
  },
  {
    slug: "blackbird-preservations",
    name: requestedCollectionProfiles["blackbird-preservations"].label,
    shortName: "Blackbird",
    era: requestedCollectionProfiles["blackbird-preservations"].era,
    thesis: requestedCollectionProfiles["blackbird-preservations"].thesis,
    biography: requestedCollectionProfiles["blackbird-preservations"].biography,
    sourceIds: ["blackbird-preservations-seedfinder-catalog"],
    signatureIds: requestedCollectionProfiles["blackbird-preservations"].signatureIds
  },
  {
    slug: "rare-dankness",
    name: requestedCollectionProfiles["rare-dankness"].label,
    shortName: "Rare Dankness",
    era: requestedCollectionProfiles["rare-dankness"].era,
    thesis: requestedCollectionProfiles["rare-dankness"].thesis,
    biography: requestedCollectionProfiles["rare-dankness"].biography,
    sourceIds: ["rare-dankness-seedfinder-catalog", "rare-dankness-official-about"],
    signatureIds: requestedCollectionProfiles["rare-dankness"].signatureIds
  }
]);

const sourceMap = new Map();
for (const [slug, catalog] of Object.entries(catalogs)) {
  const researchDir = "data/research/" + slug;
  const collectionRecords = records.filter((record) => record.collection.slug === slug);
  const candidates = catalog.names.map((name) => {
    const record = records.find((item) => item.name === name && item.collection.slug === slug);
    return {
      submittedName: name,
      canonicalId: record.id,
      canonicalName: record.name,
      decision: "accepted",
      documentationTier: record.documentationTier,
      evidence: record.sources.map((source) => source.url || source.label)
    };
  });
  writeJson(researchDir + "/candidates.json", candidates);
  const collectionSourceMap = new Map();
  for (const source of catalog.sources) {
    collectionSourceMap.set(source.url || source.label, { ...source, recordIds: [] });
  }
  for (const record of collectionRecords) {
    for (const source of record.sources) {
      const key = source.url || source.label;
      const current = collectionSourceMap.get(key);
      if (current) current.recordIds = [...new Set([...(current.recordIds || []), record.id])];
      else collectionSourceMap.set(key, { ...source, recordIds: [record.id] });
    }
  }
  const collectionSources = [...collectionSourceMap.values()];
  writeJson(researchDir + "/source-log.json", collectionSources);
  writeJson(researchDir + "/aliases.json", aliases[slug]);
  writeJson(researchDir + "/unresolved.json", unresolved[slug]);
  writeJson(researchDir + "/rejected.json", rejected[slug]);
  for (const source of collectionSources) {
    const key = source.url || source.label;
    const current = sourceMap.get(key);
    if (current) {
      current.collections = [...new Set([...(current.collections || []), slug])];
      current.recordIds = [...new Set([...(current.recordIds || []), ...(source.recordIds || [])])];
    } else {
      sourceMap.set(key, { ...source, collections: [slug] });
    }
  }
}

const sourceIndex = [...sourceMap.values()].sort((a, b) => a.label.localeCompare(b.label));

const tierCounts = records.reduce((counts, record) => {
  counts[record.documentationTier] = (counts[record.documentationTier] || 0) + 1;
  return counts;
}, {});
const collectionCounts = records.reduce((counts, record) => {
  counts[record.collection.slug] = (counts[record.collection.slug] || 0) + 1;
  return counts;
}, {});
const summary = {
  reviewedAt,
  scope: `Best-effort public-web reconstruction of ${Object.keys(catalogs).length} named breeder collections. This is not a claim of literal completeness.`,
  generatedRecords: records.length,
  productionLibraryRecords: new Set([...base.map((record) => record.id), ...records.map((record) => record.id)]).size,
  overlaidBaseRecords: records.filter((record) => base.some((baseRecord) => baseRecord.id === record.id)).length,
  collectionCounts,
  documentationTierCounts: tierCounts,
  unresolvedCount: Object.values(unresolved).flat().length,
  rejectedCount: Object.values(rejected).flat().length,
  aliasGroupCount: Object.values(aliases).flat().length,
  collaborationRecordCount: records.filter((record) => (record.attributions?.length || 0) > 1 || (record.relationships?.collaborators?.length || 0) > 0 || (record.relationships?.releasePartners?.length || 0) > 0).length,
  sourceCount: sourceIndex.length,
  linkedSourceCount: sourceIndex.filter((source) => source.url).length,
  legacyUnlinkedSourceCount: sourceIndex.filter((source) => !source.url).length
};
writeJson("data/research/summary.json", summary);
writeJson("data/research/source-index.json", sourceIndex);
writeJson("data/research/unresolved.json", Object.entries(unresolved).flatMap(([collection, items]) => items.map((item) => ({ collection, ...item }))));
writeJson("data/research/rejected-candidates.json", Object.entries(rejected).flatMap(([collection, items]) => items.map((item) => ({ collection, ...item }))));

const reportLines = [
  "# Breeder catalog research",
  "",
  "Reviewed: " + reviewedAt,
  "",
  "This archive is a best-effort reconstruction from public sources. It does not claim literal completeness, and it never upgrades ambiguous snippets into facts.",
  "",
  "## Import summary",
  "",
  "- Generated breeder records: " + summary.generatedRecords,
  "- Production library records after overlays: " + summary.productionLibraryRecords,
  "- Existing records enriched by overlays: " + summary.overlaidBaseRecords,
  "- Documentation tiers: A " + (tierCounts.A || 0) + ", B " + (tierCounts.B || 0) + ", C " + (tierCounts.C || 0),
  "- Unresolved candidates: " + summary.unresolvedCount,
  "- Rejected candidate groups: " + summary.rejectedCount,
  "- Source ledger entries: " + summary.sourceCount + " (" + summary.linkedSourceCount + " linked; " + summary.legacyUnlinkedSourceCount + " retained legacy labels)",
  "- Collaboration/release-partner records: " + summary.collaborationRecordCount,
  "",
  "## Collection counts",
  "",
  ...Object.entries(collectionCounts).map(([slug, count]) => "- " + catalogs[slug].label + ": " + count),
  "",
  "## Method",
  "",
  "1. Build a candidate ledger from breeder pages, seed databases, current and archived retailer pages, interviews, and public grow forums.",
  "2. Normalize names without collapsing generations, backcrosses, selfed releases, preservation versions, or materially different releases.",
  "3. Separate breeder, co-breeder, release-partner, selection, preservation, and catalog-attribution roles.",
  "4. Assign Tier A only to primary-source-supported records, Tier B to strong release-specific documentation, and Tier C to catalog-existence records.",
  "5. Leave unsupported fields empty and route uncertain names or versions to unresolved review.",
  "",
  "## Known attribution decisions",
  "",
  "- Jillybean and Agent Orange credit MzJill as creator and TGA Genetics as the historical release partner.",
  "- The Subcool catalog Space Queen record is versioned separately from the original Vic High archive entry.",
  "- Duke Diamond's Vault listings are grouped separately from the core Dominion master catalog.",
  "- Atom Splitter remains a Samurai Sour historical alias until evidence supports a separate release.",
  "- Blackbird Preservations records use preservation attribution rather than implying original creation of the underlying material.",
  "- The four added catalogs admit only releases with named direct lineage; entries with unknown parents remain in the review queue.",
  "",
  "## Review queue",
  "",
  ...Object.entries(unresolved).flatMap(([slug, items]) => ["### " + catalogs[slug].label, "", ...items.map((item) => "- " + item.candidate + ": " + item.reason), ""]),
  "## Source policy",
  "",
  "Every generated record carries at least one URL-backed source and field-level confidence. Community grow reports can support observations or version existence but do not, by themselves, establish breeder intent or definitive parentage."
];
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs", "breeder-catalog-research.md"), reportLines.join("\n") + "\n");

console.log(JSON.stringify(summary, null, 2));
