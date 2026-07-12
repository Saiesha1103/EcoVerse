export type Terrain = "Forest" | "Grassland" | "River" | "Mountain" | "Desert";

export type Resource = "Berries" | "Water" | "Stone" | "Grass" | "Cactus" | null;

export type CreatureSpecies = "Rabbit" | "Wolf" | "Fish" | "Goat" | "Camel";

export interface Creature {
  id: number;
  species: CreatureSpecies;
  position_x: number;
  position_y: number;
  energy: number;
  hunger: number;
  thirst: number;
  alive: boolean;
}

export interface Cell {
  x: number;
  y: number;
  terrain: Terrain;
  resource: Resource;
  creature: CreatureSpecies | null;
}

export interface World {
  width: number;
  height: number;
  cells: Cell[];
}