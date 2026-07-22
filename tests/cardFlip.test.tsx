import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StrainCard } from "@/app/components/card/StrainCard";
import { strains } from "@/lib/strains";
import { defaultSettings } from "@/lib/storage";

function Harness() {
  const [flipped, setFlipped] = useState(false);
  return <StrainCard strain={strains[0]} flipped={flipped} onFlip={() => setFlipped((value) => !value)} mode="standard" settings={{ ...defaultSettings, reducedMotion: true }} />;
}

describe("strain card", () => {
  it("flips by click and keyboard", () => {
    render(<Harness />);
    const card = screen.getByRole("button", { name: /card.*front showing/i });
    fireEvent.click(card);
    expect(screen.getByRole("button", { name: /details revealed/i })).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(screen.getByRole("button", { name: /details revealed/i }), { key: "Enter" });
    expect(screen.getByRole("button", { name: /front showing/i })).toHaveAttribute("aria-pressed", "false");
  });
});

