import { Dna, ExternalLink, FlaskConical, Flower2, History, Leaf, Sprout, Users } from "lucide-react";
import type { Strain } from "@/lib/schema";
import { ConfidenceBadge } from "../ConfidenceBadge";

const Missing = () => <span className="undocumented">Not yet documented</span>;
const Value = ({ children }: { children?: React.ReactNode }) => children ? <>{children}</> : <Missing />;

function Tags({ values }: { values?: string[] }) {
  if (!values?.length) return <Missing />;
  return <div className="tag-list">{values.map((value) => <span key={value}>{value}</span>)}</div>;
}

export function LineageSection({ strain }: { strain: Strain }) {
  return (
    <section className="back-section">
      <div className="section-title"><Dna size={17} /><h3>Lineage ledger</h3></div>
      <div className="lineage-hero">{strain.parentage.display}</div>
      <div className="data-grid">
        <div><small>Mother / first parent</small><strong><Value>{strain.parentage.mother?.name}</Value></strong></div>
        <div><small>Father / second parent</small><strong><Value>{strain.parentage.father?.name}</Value></strong></div>
        <div><small>Breeder</small><strong><Value>{strain.breeder}</Value></strong></div>
        <div><small>Generation</small><strong><Value>{strain.generation}</Value></strong></div>
        <div><small>Material</small><strong>{strain.strainType === "clone-only" ? "Known cut / clone-only" : "Seed line or population"}</strong></div>
        <div><small>Era</small><strong><Value>{strain.releaseEra}</Value></strong></div>
      </div>
      {strain.parentage.notes && <p className="archive-note">{strain.parentage.notes}</p>}
      <div className="field-group"><small>Genetic families</small><Tags values={strain.families} /></div>
      {strain.project && (
        <div className="project-ledger">
          <div><small>Project status</small><strong>{strain.project.status.replace("-", " ")}</strong></div>
          <div><small>Hunt size</small><strong><Value>{strain.project.huntSize}</Value></strong></div>
          <div><small>Keeper notes</small><strong><Value>{strain.project.keeperNotes}</Value></strong></div>
        </div>
      )}
    </section>
  );
}

export function AromaSection({ strain }: { strain: Strain }) {
  return (
    <section className="back-section">
      <div className="section-title"><Flower2 size={17} /><h3>Aroma & flavor</h3></div>
      <div className="sensory-grid">
        <div><small>Dominant</small><Tags values={strain.aroma.dominant} /></div>
        <div><small>Secondary</small><Tags values={strain.aroma.secondary} /></div>
        <div><small>Inhale</small><Tags values={strain.aroma.flavorInhale} /></div>
        <div><small>Exhale</small><Tags values={strain.aroma.flavorExhale} /></div>
      </div>
      {strain.aroma.phenotypeVariation && <p className="archive-note">{strain.aroma.phenotypeVariation}</p>}
      {strain.aroma.terpenes?.length ? <div className="field-group"><small>Reported terpene tags · not effect predictions</small><Tags values={strain.aroma.terpenes} /></div> : null}
    </section>
  );
}

export function EffectsSection({ strain }: { strain: Strain }) {
  const effects = strain.effects;
  return (
    <section className="back-section">
      <div className="section-title"><Leaf size={17} /><h3>Effect profile</h3></div>
      <div className="data-grid compact">
        <div><small>Onset</small><strong><Value>{effects.onset}</Value></strong></div>
        <div><small>Energy</small><strong><Value>{effects.energy}</Value></strong></div>
        <div><small>Clarity</small><strong><Value>{effects.clarity}</Value></strong></div>
        <div><small>Duration</small><strong><Value>{effects.duration}</Value></strong></div>
      </div>
      <div className="sensory-grid">
        <div><small>Mental</small><Tags values={effects.mental} /></div>
        <div><small>Physical</small><Tags values={effects.physical} /></div>
        <div><small>Best time</small><Tags values={effects.bestTime} /></div>
        <div><small>Possible negatives</small><Tags values={effects.possibleNegatives} /></div>
      </div>
      <p className="microcopy">Descriptive archive language only. No medical claims or terpene-based effect guarantees.</p>
    </section>
  );
}

export function CultivationSection({ strain }: { strain: Strain }) {
  const grow = strain.cultivation;
  const flowering = grow.floweringDays ? `${grow.floweringDays.min ?? "?"}–${grow.floweringDays.max ?? "?"} days` : undefined;
  return (
    <section className="back-section">
      <div className="section-title"><Sprout size={17} /><h3>Cultivation</h3></div>
      <div className="data-grid">
        {[
          ["Flowering", flowering], ["Stretch", grow.stretch], ["Structure", grow.structure], ["Branching", grow.branching],
          ["Internodes", grow.internodalSpacing], ["Feeding", grow.feeding], ["Training", grow.trainingResponse], ["Yield", grow.yield],
          ["Resin", grow.resin], ["Bud density", grow.budDensity], ["Mold risk", grow.moldRisk], ["Cloning", grow.cloning],
          ["Indoor", grow.indoor], ["Outdoor", grow.outdoor], ["Difficulty", grow.difficulty], ["Harvest", grow.harvestWindow],
        ].map(([label, value]) => <div key={label}><small>{label}</small><strong><Value>{value}</Value></strong></div>)}
      </div>
      {grow.notes?.map((note) => <p className="archive-note" key={note}>{note}</p>)}
    </section>
  );
}

export function PhenotypeSection({ strain }: { strain: Strain }) {
  return (
    <section className="back-section">
      <div className="section-title"><FlaskConical size={17} /><h3>Phenotype variation</h3></div>
      {!strain.phenotypes?.length ? <Missing /> : (
        <div className="phenotype-list">
          {strain.phenotypes.map((phenotype, index) => (
            <article key={`${phenotype.name}-${index}`}>
              <h4>{phenotype.name ?? `Expression ${index + 1}`}</h4>
              <p>{[phenotype.aroma, phenotype.structure, phenotype.effect, phenotype.flowering].filter(Boolean).join(" · ")}</p>
              <small>Keeper traits</small><Tags values={phenotype.keeperTraits} />
              {phenotype.weaknesses?.length ? <><small>Watch for</small><Tags values={phenotype.weaknesses} /></> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function BreedingValueSection({ strain }: { strain: Strain }) {
  const value = strain.breedingValue;
  return (
    <section className="back-section">
      <div className="section-title"><Dna size={17} /><h3>Breeding value</h3></div>
      {!value ? <Missing /> : <div className="sensory-grid">
        <div><small>Reported to pass</small><Tags values={value.passes} /></div>
        <div><small>Strengths</small><Tags values={value.strengths} /></div>
        <div><small>Potential weaknesses</small><Tags values={value.weaknesses} /></div>
        <div><small>Pairing directions</small><Tags values={value.pairingIdeas} /></div>
      </div>}
      {value?.notes && <p className="archive-note">{value.notes}</p>}
      <p className="microcopy">Inheritance is selection- and population-dependent. These notes are hypotheses, not guarantees.</p>
    </section>
  );
}

export function HistorySection({ strain }: { strain: Strain }) {
  return (
    <section className="back-section">
      <div className="section-title"><History size={17} /><h3>History & confidence</h3></div>
      <p className="section-copy"><Value>{strain.history?.summary}</Value></p>
      {strain.history?.reputation && <p className="archive-note">{strain.history.reputation}</p>}
      {strain.history?.disputes?.length ? <div className="field-group"><small>Disagreements</small><Tags values={strain.history.disputes} /></div> : null}
      <div className="confidence-row">
        <ConfidenceBadge level={strain.confidence.lineage} prefix="Lineage" />
        <ConfidenceBadge level={strain.confidence.information} prefix="Info" />
      </div>
      {strain.confidence.notes && <p className="archive-note warning-note">{strain.confidence.notes}</p>}
      <div className="field-group"><small>Source types</small><Tags values={strain.sources?.map((source) => `${source.label} · ${source.type}`)} /></div>
    </section>
  );
}

export function SourcesSection({ strain }: { strain: Strain }) {
  const fields = Object.entries(strain.fieldConfidence ?? {});
  return (
    <section className="back-section sources-section">
      <div className="section-title"><ExternalLink size={17} /><h3>Sources & attribution</h3></div>
      {strain.attributions?.length ? <div className="attribution-ledger">
        {strain.attributions.map((attribution, index) => <article key={attribution.name + attribution.role + index}>
          <Users size={14} />
          <span><strong>{attribution.name}</strong><small>{attribution.role.replaceAll("-", " ")}</small></span>
          <ConfidenceBadge level={attribution.confidence} />
          {attribution.notes && <p>{attribution.notes}</p>}
        </article>)}
      </div> : <Missing />}
      {fields.length ? <div className="field-confidence-grid">
        {fields.map(([field, level]) => <div key={field}><small>{field}</small><ConfidenceBadge level={level} /></div>)}
      </div> : null}
      <div className="source-link-list">
        {(strain.sources ?? []).map((source, index) => source.url ? <a href={source.url} target="_blank" rel="noreferrer" key={source.url + index}>
          <span><strong>{source.label}</strong><small>{source.type.replaceAll("-", " ")}{source.accessedAt ? " · accessed " + source.accessedAt : ""}</small></span>
          <ExternalLink size={14} />
          {source.fields?.length ? <p>Supports: {source.fields.join(" · ")}</p> : null}
          {source.notes ? <p>{source.notes}</p> : null}
        </a> : <div className="source-unlinked" key={source.label + index}><strong>{source.label}</strong><small>{source.type.replaceAll("-", " ")}</small></div>)}
      </div>
      <p className="microcopy">Sources support only the fields named on each record. A listing is not treated as proof of every profile claim.</p>
    </section>
  );
}
