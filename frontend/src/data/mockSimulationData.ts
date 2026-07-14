import type {
  AlgorithmState,
  Creature,
  EventLogEntry,
  PopulationTrendPoint,
  Resource,
  ResourceHealthRow,
  SimulationMetrics,
  TerrainCell,
  TerrainKind,
} from "../types/simulation";

export const GRID_WIDTH = 32;
export const GRID_HEIGHT = 24;

// Small seeded PRNG so the generated terrain is stable across renders.
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function generateTerrain(): TerrainCell[] {
  const rand = seededRandom(42);
  const cells: TerrainCell[] = [];

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const n = rand();
      let kind: TerrainKind = "grass";

      // Carve a meandering water band
      const waterBand = 9 + Math.sin(x * 0.35) * 3;
      if (Math.abs(y - waterBand) < 1.4) {
        kind = "water";
      } else if (n > 0.86) {
        kind = "forest";
      } else if (n > 0.78) {
        kind = "rock";
      } else if (n < 0.06) {
        kind = "sand";
      }

      cells.push({ x, y, kind });
    }
  }
  return cells;
}

export const TERRAIN: TerrainCell[] = generateTerrain();

export const RESOURCES: Resource[] = [
  { id: "F-01", kind: "food", x: 5, y: 4, level: 62 },
  { id: "F-02", kind: "food", x: 21, y: 6, level: 40 },
  { id: "F-03", kind: "food", x: 12, y: 17, level: 85 },
  { id: "F-04", kind: "food", x: 27, y: 15, level: 28 },
  { id: "F-05", kind: "food", x: 3, y: 19, level: 70 },
  { id: "W-01", kind: "water", x: 16, y: 9 },
  { id: "W-02", kind: "water", x: 24, y: 8 },
  { id: "O-01", kind: "obstacle", x: 9, y: 13 },
  { id: "O-02", kind: "obstacle", x: 18, y: 3 },
  { id: "O-03", kind: "obstacle", x: 26, y: 19 },
  { id: "O-04", kind: "obstacle", x: 6, y: 8 },
  { id: "O-05", kind: "obstacle", x: 29, y: 11 },
  { id: "O-06", kind: "obstacle", x: 14, y: 21 },
  { id: "O-07", kind: "obstacle", x: 22, y: 17 },
];

export const CREATURES: Creature[] = [
  {
    id: "H-08",
    kind: "herbivore",
    x: 14,
    y: 8,
    status: "Seeking Food",
    energy: 78,
    hunger: 42,
    thirst: 31,
    targetId: "F-03",
    algorithm: "A*",
    pathLength: 11,
    nodesExplored: 28,
    path: [
      { x: 14, y: 8 }, { x: 14, y: 9 }, { x: 14, y: 10 }, { x: 14, y: 11 },
      { x: 13, y: 12 }, { x: 13, y: 13 }, { x: 13, y: 14 }, { x: 13, y: 15 },
      { x: 12, y: 16 }, { x: 12, y: 17 },
    ],
  },
  { id: "H-01", kind: "herbivore", x: 4, y: 5, status: "Roaming", energy: 91, hunger: 12, thirst: 18, algorithm: "BFS", pathLength: 0, nodesExplored: 0 },
  { id: "H-02", kind: "herbivore", x: 20, y: 4, status: "Seeking Water", energy: 55, hunger: 38, thirst: 64, algorithm: "A*", pathLength: 6, nodesExplored: 14 },
  { id: "H-03", kind: "herbivore", x: 7, y: 10, status: "Resting", energy: 84, hunger: 20, thirst: 22, algorithm: "BFS", pathLength: 0, nodesExplored: 0 },
  { id: "H-04", kind: "herbivore", x: 25, y: 6, status: "Roaming", energy: 67, hunger: 33, thirst: 40, algorithm: "BFS", pathLength: 4, nodesExplored: 9 },
  { id: "H-05", kind: "herbivore", x: 2, y: 18, status: "Seeking Food", energy: 48, hunger: 61, thirst: 35, targetId: "F-05", algorithm: "A*", pathLength: 3, nodesExplored: 7 },
  { id: "H-06", kind: "herbivore", x: 28, y: 16, status: "Fleeing", energy: 39, hunger: 44, thirst: 30, algorithm: "BFS", pathLength: 5, nodesExplored: 11 },
  { id: "H-07", kind: "herbivore", x: 11, y: 20, status: "Roaming", energy: 72, hunger: 25, thirst: 28, algorithm: "BFS", pathLength: 0, nodesExplored: 0 },
  { id: "P-02", kind: "predator", x: 23, y: 14, status: "Hunting", energy: 58, hunger: 70, thirst: 20, targetId: "H-06", algorithm: "A*", pathLength: 8, nodesExplored: 22 },
  { id: "P-01", kind: "predator", x: 8, y: 3, status: "Roaming", energy: 66, hunger: 45, thirst: 33, algorithm: "BFS", pathLength: 0, nodesExplored: 0 },
  { id: "P-03", kind: "predator", x: 19, y: 20, status: "Resting", energy: 80, hunger: 30, thirst: 25, algorithm: "BFS", pathLength: 0, nodesExplored: 0 },
];

export const SELECTED_CREATURE_ID = "H-08";

export const METRICS: SimulationMetrics = {
  totalPopulation: 42,
  herbivores: 34,
  predators: 8,
  foodAvailability: 68,
  waterAvailability: 74,
  averageEnergy: 76,
  deaths: 3,
  currentTick: 1248,
};

export const RESOURCE_HEALTH: ResourceHealthRow[] = [
  { label: "Food", kind: "food", value: 68, status: "Healthy" },
  { label: "Water", kind: "water", value: 74, status: "Healthy" },
  { label: "Shelter", kind: "shelter", value: 43, status: "Moderate" },
  { label: "Vegetation", kind: "vegetation", value: 29, status: "Low" },
];

export const POPULATION_TREND: PopulationTrendPoint[] = [
  { tick: 1180, herbivores: 30, predators: 7, total: 37 },
  { tick: 1190, herbivores: 31, predators: 7, total: 38 },
  { tick: 1200, herbivores: 33, predators: 8, total: 41 },
  { tick: 1210, herbivores: 32, predators: 8, total: 40 },
  { tick: 1215, herbivores: 34, predators: 7, total: 41 },
  { tick: 1222, herbivores: 33, predators: 8, total: 41 },
  { tick: 1230, herbivores: 35, predators: 8, total: 43 },
  { tick: 1236, herbivores: 34, predators: 9, total: 43 },
  { tick: 1242, herbivores: 33, predators: 8, total: 41 },
  { tick: 1248, herbivores: 34, predators: 8, total: 42 },
];

export const ALGORITHM_STATE: AlgorithmState = {
  active: "A*",
  agentId: "H-08",
  targetId: "F-03",
  nodesExplored: 28,
  pathLength: 11,
  executionTimeMs: 0.42,
  complexity: "O(E log V)",
  searchProgress: 0.72,
};

export const EVENT_LOG: EventLogEntry[] = [
  { id: "e1", timestamp: "12:42:18", category: "pathfinding", message: "Herbivore H-08 detected Food Source F-03" },
  { id: "e2", timestamp: "12:42:18", category: "pathfinding", message: "Dijkstra generated a path of 11 cells" },
  { id: "e3", timestamp: "12:42:17", category: "movement", message: "Predator P-02 changed target" },
  { id: "e4", timestamp: "12:42:15", category: "alerts", message: "Food Source F-01 dropped below 30%" },
  { id: "e5", timestamp: "12:42:12", category: "movement", message: "Herbivore H-03 entered a water region" },
  { id: "e6", timestamp: "12:42:08", category: "resources", message: "Resource node F-04 regenerated" },
  { id: "e7", timestamp: "12:42:04", category: "movement", message: "Herbivore H-05 began roaming near sector C4" },
  { id: "e8", timestamp: "12:41:58", category: "alerts", message: "Predator P-02 hunger exceeded 70%" },
  { id: "e9", timestamp: "12:41:51", category: "pathfinding", message: "BFS explored 14 nodes for Herbivore H-02" },
  { id: "e10", timestamp: "12:41:44", category: "resources", message: "Water source W-02 regeneration rate increased" },
  { id: "e11", timestamp: "12:41:39", category: "movement", message: "Herbivore H-06 fled from Predator P-02" },
  { id: "e12", timestamp: "12:41:30", category: "resources", message: "Food Source F-05 replenished to 70%" },
];
