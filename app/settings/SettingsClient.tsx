"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw, Settings, Volume2 } from "lucide-react";
import { defaultSettings, loadSettings, resetLocalData, saveSettings, type Settings as SettingsType, type StudyMode } from "@/lib/storage";

export function SettingsClient() {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [saved, setSaved] = useState(false);
  useEffect(() => { queueMicrotask(() => setSettings(loadSettings())); }, []);
  const update = <K extends keyof SettingsType>(key: K, value: SettingsType[K]) => { const next = { ...settings, [key]: value }; setSettings(next); saveSettings(next); setSaved(true); window.setTimeout(() => setSaved(false), 1400); };
  const reset = () => { if (window.confirm("Reset all study history, favorites, queues, and preferences on this device?")) { resetLocalData(); setSettings(defaultSettings); window.location.reload(); } };
  return <main className="content-page settings-page">
    <section className="page-hero"><p className="eyebrow"><Settings size={14} /> Archive preferences</p><h1>Tune your <em>study room.</em></h1><p>Preferences and progress live only in this browser. Sound is off by default and no account is required.</p></section>
    <section className="settings-grid">
      <article className="settings-card"><div className="settings-heading"><span>Motion & feel</span><h2>Card experience</h2></div>
        <label><span><strong>Animation intensity</strong><small>Adjust the weight of card movement.</small></span><select value={settings.animationIntensity} onChange={(event) => update("animationIntensity", event.target.value as SettingsType["animationIntensity"])}><option value="low">Low</option><option value="standard">Standard</option><option value="high">Cinematic</option></select></label>
        <label><span><strong>Reduced motion</strong><small>Minimize flips and page transitions.</small></span><input type="checkbox" checked={settings.reducedMotion} onChange={(event) => update("reducedMotion", event.target.checked)} /></label>
        <label><span><strong>Information density</strong><small>Control spacing in archive panels.</small></span><select value={settings.density} onChange={(event) => update("density", event.target.value as SettingsType["density"])}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label>
      </article>
      <article className="settings-card"><div className="settings-heading"><span>Review logic</span><h2>Study behavior</h2></div>
        <label><span><strong>Weighted review</strong><small>Raise missed cards and slightly favor saved cards.</small></span><input type="checkbox" checked={settings.weightedReview} onChange={(event) => update("weightedReview", event.target.checked)} /></label>
        <label><span><strong>Recent-history length</strong><small>Protect recent cards from early reshuffles.</small></span><input type="number" min={3} max={50} value={settings.historyLength} onChange={(event) => update("historyLength", Math.max(3, Math.min(50, Number(event.target.value))))} /></label>
        <label><span><strong>Default study mode</strong><small>How a new session opens.</small></span><select value={settings.defaultMode} onChange={(event) => update("defaultMode", event.target.value as StudyMode)}><option value="standard">Standard</option><option value="reverse">Reverse</option><option value="parentage">Parentage only</option><option value="missed">Missed strains</option><option value="favorites">Favorites</option></select></label>
      </article>
      <article className="settings-card"><div className="settings-heading"><span>Optional audio</span><h2><Volume2 size={20} /> Quiet cues</h2></div>
        <label><span><strong>Sound effects</strong><small>Soft synthesized flip and answer tones. Off by default.</small></span><input type="checkbox" checked={settings.sound} onChange={(event) => update("sound", event.target.checked)} /></label>
      </article>
      <article className="settings-card danger-card"><div className="settings-heading"><span>Local data</span><h2>Reset archive progress</h2></div><p>Removes study history, answer counts, favorites, queues, streaks, and saved preferences from this browser.</p><button onClick={reset}><RotateCcw size={17} /> Reset all progress</button></article>
    </section>
    {saved && <div className="save-toast"><Check size={16} /> Preference saved locally</div>}
  </main>;
}
