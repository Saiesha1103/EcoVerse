import type { BiomeType, TerrainKind, ResourceKind } from "../types/simulation";
import type {
  BiomeTheme,
  TerrainStylePalette,
  TerrainDecorationPalette,
  CreatureSpeciesPalette,
  ResourceVisualPalette,
} from "../types/biome";

const ALL_TERRAIN_KINDS: TerrainKind[] = [
  "grass",
  "forest",
  "water",
  "sand",
  "rock",
  "snow",
];

const ALL_RESOURCE_KINDS: ResourceKind[] = ["food", "water", "obstacle"];

function buildTerrainStyles(
  overrides: Partial<Record<TerrainKind, { baseColor: string; accentColor: string; textureVariant: number }>>,
  fallbackBase: string,
  fallbackAccent: string,
): TerrainStylePalette {
  const styles = {} as TerrainStylePalette;
  ALL_TERRAIN_KINDS.forEach((kind) => {
    const override = overrides[kind];
    styles[kind] = {
      kind,
      baseColor: override?.baseColor ?? fallbackBase,
      accentColor: override?.accentColor ?? fallbackAccent,
      textureVariant: override?.textureVariant ?? 1,
    };
  });
  return styles;
}

function buildDecorations(
  overrides: Partial<Record<TerrainKind, { id: string; label: string; color: string; density: number }[]>>,
): TerrainDecorationPalette {
  const decorations = {} as TerrainDecorationPalette;
  ALL_TERRAIN_KINDS.forEach((kind) => {
    decorations[kind] = overrides[kind] ?? [];
  });
  return decorations;
}

function buildResourceVisuals(
  entries: Record<ResourceKind, { icon: string; color: string; glow?: boolean }>,
): ResourceVisualPalette {
  const visuals = {} as ResourceVisualPalette;
  ALL_RESOURCE_KINDS.forEach((kind) => {
    visuals[kind] = {
      kind,
      icon: entries[kind].icon,
      color: entries[kind].color,
      glow: entries[kind].glow,
    };
  });
  return visuals;
}

const meadowTheme: BiomeTheme = {
  biome: "meadow",
  name: "Sunlit Meadow",
  description: "Rolling grasslands under warm daylight, dotted with wildflowers and calm streams.",
  palette: {
    primary: "#7CB518",
    secondary: "#F4D35E",
    accent: "#E27D60",
    background: "#EAF4D3",
  },
  terrainStyles: buildTerrainStyles(
    {
      grass: { baseColor: "#8FC93A", accentColor: "#6FA82E", textureVariant: 1 },
      forest: { baseColor: "#4E8B3E", accentColor: "#3A6B2E", textureVariant: 2 },
      water: { baseColor: "#5FB4D8", accentColor: "#3E8FB0", textureVariant: 1 },
      sand: { baseColor: "#E4D6A7", accentColor: "#CBB77E", textureVariant: 1 },
      rock: { baseColor: "#A9A28F", accentColor: "#8A8371", textureVariant: 1 },
      snow: { baseColor: "#F2F2F2", accentColor: "#D6D6D6", textureVariant: 1 },
    },
    "#8FC93A",
    "#6FA82E",
  ),
  decorations: buildDecorations({
    grass: [
      { id: "wildflowers", label: "Wildflowers", color: "#F4A6C1", density: 0.4 },
      { id: "clover", label: "Clover Patch", color: "#5C9E31", density: 0.3 },
    ],
    forest: [
      { id: "oak-cluster", label: "Oak Cluster", color: "#3A6B2E", density: 0.35 },
    ],
    water: [
      { id: "lily-pads", label: "Lily Pads", color: "#6FBF73", density: 0.2 },
    ],
  }),
  creaturePalette: {
    Rabbit: {
      species: "Rabbit",
      kind: "herbivore",
      primaryColor: "#D9C9A3",
      secondaryColor: "#B89F71",
      iconKey: "rabbit",
    },
    Goat: {
      species: "Goat",
      kind: "herbivore",
      primaryColor: "#E8E2D0",
      secondaryColor: "#C7BE9E",
      iconKey: "goat",
    },
    Wolf: {
      species: "Wolf",
      kind: "predator",
      primaryColor: "#7A7A7A",
      secondaryColor: "#4F4F4F",
      iconKey: "wolf",
    },
  },
  resourceVisuals: buildResourceVisuals({
    food: { icon: "berries", color: "#E85D75" },
    water: { icon: "droplet", color: "#3E8FB0", glow: true },
    obstacle: { icon: "boulder", color: "#8A8371" },
  }),
  atmosphere: {
    fogColor: "#FDF6E3",
    fogDensity: 0.05,
    ambientLight: "#FFF3C4",
    skyGradientStart: "#A8D8F0",
    skyGradientEnd: "#F4E9C1",
    particleEffect: "none",
  },
};

const forestTheme: BiomeTheme = {
  biome: "forest",
  name: "Deep Woodland",
  description: "Dense evergreen canopy filtering dappled light over moss and undergrowth.",
  palette: {
    primary: "#2F5233",
    secondary: "#6B8E4E",
    accent: "#A3B18A",
    background: "#1B2E1A",
  },
  terrainStyles: buildTerrainStyles(
    {
      grass: { baseColor: "#5E7C4A", accentColor: "#47603A", textureVariant: 1 },
      forest: { baseColor: "#2F5233", accentColor: "#1F3A22", textureVariant: 3 },
      water: { baseColor: "#3A6B6B", accentColor: "#264A4A", textureVariant: 1 },
      sand: { baseColor: "#B8A671", accentColor: "#94824F", textureVariant: 1 },
      rock: { baseColor: "#5C5A4E", accentColor: "#403E36", textureVariant: 1 },
      snow: { baseColor: "#DCE5D8", accentColor: "#BFCBB9", textureVariant: 1 },
    },
    "#2F5233",
    "#1F3A22",
  ),
  decorations: buildDecorations({
    forest: [
      { id: "pine-cluster", label: "Pine Cluster", color: "#1F3A22", density: 0.5 },
      { id: "fern-patch", label: "Fern Patch", color: "#4E7C43", density: 0.3 },
      { id: "moss-rock", label: "Moss-Covered Rock", color: "#5C5A4E", density: 0.15 },
    ],
    grass: [
      { id: "undergrowth", label: "Undergrowth", color: "#47603A", density: 0.25 },
    ],
  }),
  creaturePalette: {
    Wolf: {
      species: "Wolf",
      kind: "predator",
      primaryColor: "#4A4A4A",
      secondaryColor: "#2B2B2B",
      iconKey: "wolf",
    },
    Rabbit: {
      species: "Rabbit",
      kind: "herbivore",
      primaryColor: "#8C7B5C",
      secondaryColor: "#6B5D45",
      iconKey: "rabbit",
    },
  },
  resourceVisuals: buildResourceVisuals({
    food: { icon: "berries", color: "#C1444C" },
    water: { icon: "droplet", color: "#3A6B6B", glow: true },
    obstacle: { icon: "fallen-log", color: "#403E36" },
  }),
  atmosphere: {
    fogColor: "#2A3B27",
    fogDensity: 0.35,
    ambientLight: "#8FA37A",
    skyGradientStart: "#3E5844",
    skyGradientEnd: "#6B8E4E",
    particleEffect: "leaves",
  },
};

const wetlandTheme: BiomeTheme = {
  biome: "wetland",
  name: "Misty Wetland",
  description: "Marshy waters and reeds under a low, humid haze.",
  palette: {
    primary: "#4A6B5A",
    secondary: "#7FA895",
    accent: "#C9B458",
    background: "#33473E",
  },
  terrainStyles: buildTerrainStyles(
    {
      grass: { baseColor: "#6C8C6A", accentColor: "#4E6B4C", textureVariant: 1 },
      forest: { baseColor: "#3E5C46", accentColor: "#2A4030", textureVariant: 2 },
      water: { baseColor: "#4A7A72", accentColor: "#2F5A52", textureVariant: 2 },
      sand: { baseColor: "#A99B6E", accentColor: "#877B54", textureVariant: 1 },
      rock: { baseColor: "#6E6B5E", accentColor: "#514F44", textureVariant: 1 },
      snow: { baseColor: "#DFE7E0", accentColor: "#C2CDC5", textureVariant: 1 },
    },
    "#4A6B5A",
    "#2F5A52",
  ),
  decorations: buildDecorations({
    water: [
      { id: "reeds", label: "Reed Cluster", color: "#7FA895", density: 0.4 },
      { id: "lily-pads", label: "Lily Pads", color: "#5E9E6C", density: 0.25 },
    ],
    grass: [
      { id: "cattails", label: "Cattails", color: "#C9B458", density: 0.2 },
    ],
  }),
  creaturePalette: {
    Fish: {
      species: "Fish",
      kind: "herbivore",
      primaryColor: "#6FA5B0",
      secondaryColor: "#4A7C86",
      iconKey: "fish",
    },
    Wolf: {
      species: "Wolf",
      kind: "predator",
      primaryColor: "#5A5A52",
      secondaryColor: "#3A3A34",
      iconKey: "wolf",
    },
  },
  resourceVisuals: buildResourceVisuals({
    food: { icon: "berries", color: "#B98D3E" },
    water: { icon: "droplet", color: "#2F5A52", glow: true },
    obstacle: { icon: "mud-mound", color: "#514F44" },
  }),
  atmosphere: {
    fogColor: "#5C6E63",
    fogDensity: 0.5,
    ambientLight: "#9DB3A4",
    skyGradientStart: "#4A5E54",
    skyGradientEnd: "#7FA895",
    particleEffect: "rain",
  },
};

const desertTheme: BiomeTheme = {
  biome: "desert",
  name: "Sunbaked Desert",
  description: "Vast dunes and cracked earth under a scorching, clear sky.",
  palette: {
    primary: "#D9A441",
    secondary: "#E8C170",
    accent: "#B5651D",
    background: "#F2E1B8",
  },
  terrainStyles: buildTerrainStyles(
    {
      grass: { baseColor: "#B8A96A", accentColor: "#977E42", textureVariant: 1 },
      forest: { baseColor: "#7C7A4A", accentColor: "#5C5A34", textureVariant: 1 },
      water: { baseColor: "#5FA8B0", accentColor: "#3E7E86", textureVariant: 1 },
      sand: { baseColor: "#E8C170", accentColor: "#C99A45", textureVariant: 3 },
      rock: { baseColor: "#A9835A", accentColor: "#87643E", textureVariant: 2 },
      snow: { baseColor: "#EFE6D0", accentColor: "#D6C9A8", textureVariant: 1 },
    },
    "#E8C170",
    "#C99A45",
  ),
  decorations: buildDecorations({
    sand: [
      { id: "cactus-cluster", label: "Cactus Cluster", color: "#5C7A3E", density: 0.15 },
      { id: "dune-ridge", label: "Dune Ridge", color: "#C99A45", density: 0.3 },
    ],
    rock: [
      { id: "mesa-outcrop", label: "Mesa Outcrop", color: "#87643E", density: 0.1 },
    ],
  }),
  creaturePalette: {
    Camel: {
      species: "Camel",
      kind: "herbivore",
      primaryColor: "#C9A063",
      secondaryColor: "#A87F45",
      iconKey: "camel",
    },
    Goat: {
      species: "Goat",
      kind: "herbivore",
      primaryColor: "#DCCBA0",
      secondaryColor: "#B7A578",
      iconKey: "goat",
    },
  },
  resourceVisuals: buildResourceVisuals({
    food: { icon: "cactus-fruit", color: "#7A9E3E" },
    water: { icon: "droplet", color: "#3E7E86", glow: true },
    obstacle: { icon: "sun-bleached-rock", color: "#87643E" },
  }),
  atmosphere: {
    fogColor: "#F2E1B8",
    fogDensity: 0.02,
    ambientLight: "#FFEBB0",
    skyGradientStart: "#7EC8E3",
    skyGradientEnd: "#F2C879",
    particleEffect: "sand",
  },
};

const arcticTheme: BiomeTheme = {
  biome: "arctic",
  name: "Frozen Tundra",
  description: "Snow-blanketed plains and ice under a pale, cold sky.",
  palette: {
    primary: "#A8C6D9",
    secondary: "#E8F1F5",
    accent: "#4A7C9E",
    background: "#DDEAF0",
  },
  terrainStyles: buildTerrainStyles(
    {
      grass: { baseColor: "#B7C9BE", accentColor: "#94A99D", textureVariant: 1 },
      forest: { baseColor: "#3E5C52", accentColor: "#2A4038", textureVariant: 1 },
      water: { baseColor: "#5A8FA8", accentColor: "#3E6F86", textureVariant: 1 },
      sand: { baseColor: "#C7BFA8", accentColor: "#A69C7E", textureVariant: 1 },
      rock: { baseColor: "#7E8A8F", accentColor: "#5E6A6E", textureVariant: 1 },
      snow: { baseColor: "#F4F9FB", accentColor: "#D6E5EB", textureVariant: 3 },
    },
    "#F4F9FB",
    "#D6E5EB",
  ),
  decorations: buildDecorations({
    snow: [
      { id: "ice-crystals", label: "Ice Crystals", color: "#CDEBF5", density: 0.3 },
      { id: "snow-drift", label: "Snow Drift", color: "#E8F1F5", density: 0.35 },
    ],
    rock: [
      { id: "frost-boulder", label: "Frost-Covered Boulder", color: "#5E6A6E", density: 0.1 },
    ],
  }),
  creaturePalette: {
    Goat: {
      species: "Goat",
      kind: "herbivore",
      primaryColor: "#E8F1F5",
      secondaryColor: "#C4D8E0",
      iconKey: "goat",
    },
    Wolf: {
      species: "Wolf",
      kind: "predator",
      primaryColor: "#DDEAF0",
      secondaryColor: "#A8C6D9",
      iconKey: "wolf",
    },
  },
  resourceVisuals: buildResourceVisuals({
    food: { icon: "frozen-berries", color: "#8E5A6E" },
    water: { icon: "droplet", color: "#3E6F86", glow: true },
    obstacle: { icon: "ice-block", color: "#5E6A6E" },
  }),
  atmosphere: {
    fogColor: "#E8F1F5",
    fogDensity: 0.2,
    ambientLight: "#CDE3EE",
    skyGradientStart: "#C7DEE8",
    skyGradientEnd: "#F4F9FB",
    particleEffect: "snow",
  },
};

export const BIOME_THEMES: Record<BiomeType, BiomeTheme> = {
  meadow: meadowTheme,
  forest: forestTheme,
  wetland: wetlandTheme,
  desert: desertTheme,
  arctic: arcticTheme,
};