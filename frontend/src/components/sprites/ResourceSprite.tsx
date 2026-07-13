import React from "react";
import { PixelSprite } from "./PixelSprite";
import { RESOURCE_MATRICES } from "../../data/spriteMatrices";
import { BIOME_THEMES } from "../../data/biomeThemes";
import type { ResourceKind, BiomeType } from "../../types/simulation";

export interface ResourceSpriteProps {
  kind: ResourceKind;
  biome: BiomeType;
  className?: string;
}

export function ResourceSprite({
  kind,
  biome,
  className,
}: ResourceSpriteProps): React.ReactElement | null {
  const theme = BIOME_THEMES[biome];
  const visual = theme.resourceVisuals[kind];

  if (!visual) {
    return null;
  }

  const matrixEntry = RESOURCE_MATRICES[visual.icon];

  if (!matrixEntry) {
    return null;
  }

  const palette: Record<string, string> = {
    "1": visual.color,
    "2": theme.palette.secondary,
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