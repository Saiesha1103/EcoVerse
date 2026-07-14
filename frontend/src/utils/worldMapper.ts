import {
  World,
  Terrain,
  CreatureSpecies,
  Resource as BackendResource,
} from "../types/world";

import type {
  TerrainCell,
  TerrainKind,
  Creature,
  CreatureKind,
  Resource,
  ResourceKind,
} from "../types/simulation";


export interface MappedWorld {
  terrain: TerrainCell[];
  creatures: Creature[];
  resources: Resource[];
}


function mapTerrainKind(terrain: Terrain): TerrainKind {
  switch (terrain) {
    case "Forest":
      return "forest";

    case "Grassland":
      return "grass";

    case "River":
      return "water";

    case "Mountain":
      return "rock";

    case "Desert":
      return "sand";
  }
}


function mapResourceKind(
  resource: Exclude<BackendResource, null>,
): ResourceKind {
  switch (resource) {
    case "Water":
      return "water";

    case "Stone":
      return "obstacle";

    case "Berries":
    case "Grass":
    case "Cactus":
      return "food";
  }
}


function mapCreatureKind(
  species: CreatureSpecies,
): CreatureKind {
  return species === "Wolf"
    ? "predator"
    : "herbivore";
}


export function mapWorldToSimulationData(
  world: World,
): MappedWorld {
  const terrain: TerrainCell[] = [];
  const creatures: Creature[] = [];
  const resources: Resource[] = [];

  for (const cell of world.cells) {
    terrain.push({
      x: cell.x,
      y: cell.y,
      kind: mapTerrainKind(cell.terrain),
    });

    if (cell.resource !== null) {
      resources.push({
        id: `resource-${cell.resource.toLowerCase()}-${cell.x}-${cell.y}`,
        x: cell.x,
        y: cell.y,
        kind: mapResourceKind(cell.resource),
        level: 100,
      });
    }

    const backendCreature = cell.creature;

    if (backendCreature !== null) {
      creatures.push({
        id: `creature-${backendCreature.id}`,
        kind: mapCreatureKind(backendCreature.species),
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
  }

  return {
    terrain,
    creatures,
    resources,
  };
}