import React from "react";
import { PixelSprite } from "./PixelSprite";
import { CREATURE_MATRICES } from "../../data/spriteMatrices";
import { BIOME_THEMES } from "../../data/biomeThemes";
import { pickSpeciesVariant } from "../../utils/biomeRandomizer";
import type { CreatureKind, BiomeType } from "../../types/simulation";

export interface CreatureSpriteProps {
  id: string;
  kind: CreatureKind;
  biome: BiomeType;
  visualSeed: number;
  className?: string;
}

export function CreatureSprite({
  id,
  kind,
  biome,
  visualSeed,
  className,
}: CreatureSpriteProps): React.ReactElement | null {
  const theme = BIOME_THEMES[biome];

  const matchingSpecies = Object.values(theme.creaturePalette).filter(
    (entry) => entry.kind === kind,
  );

  if (matchingSpecies.length === 0) {
    return null;
  }

  const variantIndex = pickSpeciesVariant(id, visualSeed, matchingSpecies.length);
  const selectedSpecies = matchingSpecies[variantIndex];

  const matrixEntry = CREATURE_MATRICES[selectedSpecies.iconKey];

  if (!matrixEntry) {
    return null;
  }

  const palette: Record<string, string> = {
    "1": selectedSpecies.primaryColor,
    "2": selectedSpecies.secondaryColor,
    "3": theme.palette.accent,
  };

  return (
    <PixelSprite
      matrix={matrixEntry.matrix}
      palette={palette}
      className={className}
    />
  );
}