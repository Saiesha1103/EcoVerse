import { World } from "../types/world";
import type {
  TerrainCell,
  Creature,
  Resource,
} from "../types/simulation";

export interface MappedWorld {
  terrain: TerrainCell[];
  creatures: Creature[];
  resources: Resource[];
}

export function mapWorldToSimulationData(world: World): MappedWorld {
  const terrain: TerrainCell[] = [];
  const creatures: Creature[] = [];
  const resources: Resource[] = [];

  world.cells.forEach((cell) => {
    // Terrain
    terrain.push({
      x: cell.x,
      y: cell.y,
      kind:
        cell.terrain === "Forest"
          ? "forest"
          : cell.terrain === "Grassland"
          ? "grass"
          : cell.terrain === "River"
          ? "water"
          : cell.terrain === "Mountain"
          ? "rock"
          : "sand",
    });

    // Resources
    if (cell.resource) {
      resources.push({
        id: `resource-${cell.x}-${cell.y}`,
        x: cell.x,
        y: cell.y,
        kind:
          cell.resource === "Water"
            ? "water"
            : "food",
        level: 100,
      });
    }

    // Creatures
    if (cell.creature) {
      creatures.push({
        id: `creature-${cell.x}-${cell.y}`,

        kind:
          cell.creature === "Wolf"
            ? "predator"
            : "herbivore",

        x: cell.x,
        y: cell.y,

        status: "Roaming",

        energy: 100,
        hunger: 0,
        thirst: 0,

        algorithm: "BFS",

        pathLength: 0,
        nodesExplored: 0,

        path: [],
      });
    }
  });

  return {
    terrain,
    creatures,
    resources,
  };
}