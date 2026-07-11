export type BiomeType = "meadow" | "forest" | "wetland" | "desert" | "arctic";

export type GridSize = "small" | "medium" | "large";

export type ToolType =
  | "select"
  | "herbivore"
  | "predator"
  | "food"
  | "water"
  | "obstacle"
  | "eraser";

export type TerrainKind = "grass" | "forest" | "water" | "sand" | "rock" | "snow";

export interface TerrainCell {
  x: number;
  y: number;
  kind: TerrainKind;
  highlighted?: boolean;
}

export type CreatureKind = "herbivore" | "predator";

export type CreatureStatus =
  | "Seeking Food"
  | "Seeking Water"
  | "Fleeing"
  | "Hunting"
  | "Resting"
  | "Roaming";

export interface Creature {
  id: string;
  kind: CreatureKind;
  x: number;
  y: number;
  status: CreatureStatus;
  energy: number;
  hunger: number;
  thirst: number;
  targetId?: string;
  algorithm: AlgorithmName;
  pathLength: number;
  nodesExplored: number;
  path?: { x: number; y: number }[];
}

export type ResourceKind = "food" | "water" | "obstacle";

export interface Resource {
  id: string;
  kind: ResourceKind;
  x: number;
  y: number;
  level?: number;
}

export type AlgorithmName = "BFS" | "DFS" | "Dijkstra";

export interface AlgorithmState {
  active: AlgorithmName;
  agentId: string;
  targetId: string;
  nodesExplored: number;
  pathLength: number;
  executionTimeMs: number;
  complexity: string;
  searchProgress: number;
}

export interface SimulationMetrics {
  totalPopulation: number;
  herbivores: number;
  predators: number;
  foodAvailability: number;
  waterAvailability: number;
  averageEnergy: number;
  deaths: number;
  currentTick: number;
}

export interface ResourceHealthRow {
  label: string;
  kind: "food" | "water" | "shelter" | "vegetation";
  value: number;
  status: "Healthy" | "Moderate" | "Low" | "Critical";
}

export interface PopulationTrendPoint {
  tick: number;
  herbivores: number;
  predators: number;
  total: number;
}

export type EventCategory = "movement" | "resources" | "pathfinding" | "alerts";

export interface EventLogEntry {
  id: string;
  timestamp: string;
  category: EventCategory;
  message: string;
}

export type SimulationStatus = "ready" | "running" | "paused";

export type SimulationSpeed = 0.5 | 1 | 2 | 4;

export interface SimulationState {
  status: SimulationStatus;
  speed: SimulationSpeed;
  currentTick: number;
  elapsedSeconds: number;
}

export interface WorldControls {
  biome: BiomeType;
  gridSize: GridSize;
  terrainDensity: number;
  obstacleDensity: number;
  herbivoreCount: number;
  predatorCount: number;
  startingEnergy: number;
  hungerRate: number;
  thirstRate: number;
  movementCost: number;
  temperature: number;
  rainfall: number;
  vegetationDensity: number;
  waterAvailability: number;
  resourceRegenRate: number;
}
