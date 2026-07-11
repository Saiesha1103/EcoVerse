export type TerrainType =
  | "Forest"
  | "Grassland"
  | "River"
  | "Mountain"
  | "Desert";

export type ResourceType = "Berries" | "Water" | "Wood" | "Stone" | "None";

export type CreatureType =
  | "Rabbit"
  | "Wolf"
  | "Fish"
  | "Goat"
  | "Camel"
  | null;

export interface Cell {
  x: number;
  y: number;
  terrain: TerrainType;
  resource: ResourceType;
  creature: CreatureType;
}

export interface World {
  width: number;
  height: number;
  cells: Cell[];
}