import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";

const root = process.cwd();
const reviewedAt = "2026-07-23";
const concurrency = 6;

const breeders = [
  {
    slug: "norstar-genetics",
    collectionSlug: "norstar-genetics",
    name: "NorStar Genetics",
    catalogUrl: "https://seedfinder.eu/en/database/breeder/norstar-genetics",
  },
  {
    slug: "thunderfudge",
    collectionSlug: "thunderfudge",
    name: "Thunderfudge",
    catalogUrl: "https://seedfinder.eu/en/database/breeder/thunderfudge",
  },
  {
    slug: "blackbird-preservations",
    collectionSlug: "blackbird-preservations",
    name: "Blackbird Preservations",
    catalogUrl: "https://seedfinder.eu/en/database/breeder/blackbird-preservations",
  },
  {
    slug: "rare-dankness-seeds",
    collectionSlug: "rare-dankness",
    name: "Rare Dankness Seeds",
    catalogUrl: "https://seedfinder.eu/en/database/breeder/rare-dankness-seeds",
  },
];

function clean(value) {
  return value.replace(/\s+/g, " ").trim();
}

async function fetchText(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "GBS-Strain-Flip-research/1.0 (+catalog-source-audit)",
        },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 750));
      }
    }
  }
  throw new Error(`Could not fetch ${url}: ${lastError?.message || "unknown error"}`);
}

function catalogLinks(html, breeder) {
  const document = new JSDOM(html).window.document;
  const matches = [...document.querySelectorAll('a[href*="/strain-info/"]')]
    .filter((anchor) => new URL(anchor.href).pathname.endsWith(`/${breeder.slug}`))
    .map((anchor) => ({
      name: clean(anchor.textContent),
      url: anchor.href,
    }))
    .filter((item) => item.name);

  return [...new Map(matches.map((item) => [item.url, item])).values()];
}

function directLineage(html) {
  const document = new JSDOM(html).window.document;
  const rootItem = document.querySelector("#lineage ul > li");
  if (!rootItem) {
    return { display: "", parents: [], reason: "No lineage section was present." };
  }

  const directContainer = document.createElement("div");
  for (const node of rootItem.childNodes) {
    if (node.nodeType === 1 && node.tagName === "UL") break;
    directContainer.append(node.cloneNode(true));
  }

  const directText = clean(directContainer.textContent);
  const arrowIndex = directText.indexOf("»»»");
  const display = arrowIndex >= 0 ? clean(directText.slice(arrowIndex + 3)) : "";
  const anchors = [...directContainer.querySelectorAll("a")]
    .map((anchor) => clean(anchor.textContent.replace("»»»", "")))
    .filter(Boolean);
  const parents = [...new Set(anchors.slice(1))];

  if (!display || parents.length === 0) {
    return { display, parents, reason: "No direct parent names were present." };
  }

  if (/\bunknown(?:\s+strain)?\b/i.test(display) || parents.some((parent) => /^unknown\b/i.test(parent))) {
    return { display, parents, reason: "The published lineage contains an unknown parent." };
  }

  return { display, parents, reason: "" };
}

async function inspectStrain(item, breeder) {
  try {
    const html = await fetchText(item.url);
    const lineage = directLineage(html);
    return {
      ...item,
      breeder: breeder.name,
      collectionSlug: breeder.collectionSlug,
      lineageDisplay: lineage.display,
      parents: lineage.parents,
      accepted: !lineage.reason,
      ...(lineage.reason ? { reason: lineage.reason } : {}),
      accessedAt: reviewedAt,
    };
  } catch (error) {
    return {
      ...item,
      breeder: breeder.name,
      collectionSlug: breeder.collectionSlug,
      lineageDisplay: "",
      parents: [],
      accepted: false,
      reason: error.message,
      accessedAt: reviewedAt,
    };
  }
}

async function mapInBatches(items, mapper) {
  const output = [];
  for (let index = 0; index < items.length; index += concurrency) {
    output.push(...(await Promise.all(items.slice(index, index + concurrency).map(mapper))));
  }
  return output;
}

const collections = [];

for (const breeder of breeders) {
  const catalogHtml = await fetchText(breeder.catalogUrl);
  const links = catalogLinks(catalogHtml, breeder);
  const inspected = await mapInBatches(links, (item) => inspectStrain(item, breeder));
  const accepted = inspected.filter((item) => item.accepted);
  const unresolved = inspected.filter((item) => !item.accepted);

  collections.push({
    ...breeder,
    accessedAt: reviewedAt,
    catalogCount: links.length,
    acceptedCount: accepted.length,
    unresolvedCount: unresolved.length,
    accepted,
    unresolved,
  });

  console.log(
    `${breeder.name}: ${accepted.length}/${links.length} releases have complete direct lineage (${unresolved.length} unresolved).`,
  );
}

const output = {
  reviewedAt,
  methodology:
    "Catalog membership and direct parent names were extracted from the public SeedFinder breeder and release pages. Records containing unknown parents were held out.",
  collections,
};

const target = path.join(root, "data", "research", "requested-breeder-lineages.json");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, target)}`);
