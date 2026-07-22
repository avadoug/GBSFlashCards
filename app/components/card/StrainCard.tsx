"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Strain } from "@/lib/schema";
import type { Settings, StudyMode } from "@/lib/storage";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";

export function StrainCard({ strain, flipped, onFlip, mode, settings }: { strain: Strain; flipped: boolean; onFlip: () => void; mode: StudyMode; settings: Settings }) {
  const systemReducedMotion = useReducedMotion();
  const reduceMotion = systemReducedMotion || settings.reducedMotion;
  const duration = reduceMotion ? 0.01 : settings.animationIntensity === "low" ? 0.35 : settings.animationIntensity === "high" ? 0.8 : 0.58;
  return (
    <div className="strain-card-scene">
      <motion.div
        className="strain-card"
        animate={{ rotateY: flipped ? 180 : 0, scale: flipped ? 1.005 : 1 }}
        transition={{ duration, type: reduceMotion ? "tween" : "spring", stiffness: 115, damping: 17, mass: 0.8 }}
        role="button"
        tabIndex={0}
        aria-label={`${strain.name} card. ${flipped ? "Details revealed" : "Front showing"}. Press Enter or Space to flip.`}
        aria-pressed={flipped}
        onClick={onFlip}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onFlip(); } }}
      >
        <CardFront strain={strain} mode={mode} />
        <CardBack strain={strain} mode={mode} onFlipBack={onFlip} />
      </motion.div>
    </div>
  );
}

