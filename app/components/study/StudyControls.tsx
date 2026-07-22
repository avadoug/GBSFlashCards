"use client";

import { ArrowRight, Check, Heart, RotateCcw, SlidersHorizontal, X } from "lucide-react";

export function StudyControls({ favorite, flipped, onCorrect, onMissed, onFavorite, onNext, onFlipBack, onFilters }: {
  favorite: boolean; flipped: boolean; onCorrect: () => void; onMissed: () => void; onFavorite: () => void; onNext: () => void; onFlipBack: () => void; onFilters: () => void;
}) {
  return (
    <div className="study-controls" aria-label="Study controls">
      <button className="control-button success" onClick={onCorrect}><Check size={18} /><span>I knew it<kbd>1</kbd></span></button>
      <button className="control-button missed" onClick={onMissed}><X size={18} /><span>I missed it<kbd>2</kbd></span></button>
      <button className={`control-button favorite ${favorite ? "active" : ""}`} onClick={onFavorite} aria-pressed={favorite}><Heart size={18} fill={favorite ? "currentColor" : "none"} /><span>{favorite ? "Favorited" : "Favorite"}<kbd>F</kbd></span></button>
      <button className="control-button next" onClick={onNext}><ArrowRight size={18} /><span>Next strain<kbd>→</kbd></span></button>
      <button className="control-button utility" onClick={onFlipBack} disabled={!flipped}><RotateCcw size={17} /><span>Flip back</span></button>
      <button className="control-button utility" onClick={onFilters}><SlidersHorizontal size={17} /><span>Filters</span></button>
    </div>
  );
}

