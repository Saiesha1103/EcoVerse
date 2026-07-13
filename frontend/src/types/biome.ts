import type {
  BiomeType,
  TerrainKind,
  CreatureKind,
  ResourceKind,
} from "./simulation";

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export type ParticleEffect = "snow" | "rain" | "leaves" | "sand" | "none";

export interface AtmosphereSettings {
  fogColor: string;
  fogDensity: number;
  ambientLight: string;
  skyGradientStart: string;
  skyGradientEnd: string;
  particleEffect: ParticleEffect;
}

export interface TerrainStyle {
  kind: TerrainKind;
  baseColor: string;
  accentColor: string;
  textureVariant: number;
}

export type TerrainStylePalette = Record<TerrainKind, TerrainStyle>;

export interface DecorationPaletteEntry {
  id: string;
  label: string;
  color: string;
  density: number;
}

export type TerrainDecorationPalette = Record<TerrainKind, DecorationPaletteEntry[]>;

export interface CreatureSpeciesVisual {
  species: string;
  kind: CreatureKind;
  primaryColor: string;
  secondaryColor: string;
  iconKey: string;
}

export type CreatureSpeciesPalette = Record<string, CreatureSpeciesVisual>;

export interface ResourceVisual {
  kind: ResourceKind;
  icon: string;
  color: string;
  glow?: boolean;
}

export type ResourceVisualPalette = Record<ResourceKind, ResourceVisual>;

export interface BiomeTheme {
  biome: BiomeType;
  name: string;
  description: string;
  palette: ColorPalette;
  terrainStyles: TerrainStylePalette;
  decorations: TerrainDecorationPalette;
  creaturePalette: CreatureSpeciesPalette;
  resourceVisuals: ResourceVisualPalette;
  atmosphere: AtmosphereSettings;
}