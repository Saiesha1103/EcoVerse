from app.services.simulation_service import get_world, get_tick
from app.services.pathfinding_service import get_algorithm


PREDATOR_SPECIES = {"Wolf"}
HERBIVORE_SPECIES = {"Rabbit", "Goat", "Camel", "Fish"}
FOOD_RESOURCES = {"Berries", "Grass", "Cactus"}
WATER_RESOURCES = {"Water"}
TERRAIN_TYPES = ["Forest", "Grassland", "River", "Mountain", "Desert"]


def get_analytics() -> dict:
    """
    Compute a snapshot of ecosystem analytics for the current
    simulation state: population counts, energy averages, resource
    availability, and terrain distribution.

    Returns an error dict if no world has been loaded.
    """
    world = get_world()

    if world is None:
        return {
            "error": "No world loaded"
        }

    population = 0
    alive_count = 0
    dead_count = 0
    predator_count = 0
    herbivore_count = 0
    total_energy_alive = 0

    food_resource_count = 0
    water_resource_count = 0

    terrain_counts: dict[str, int] = {terrain: 0 for terrain in TERRAIN_TYPES}

    for cell in world.cells:
        if cell.terrain in terrain_counts:
            terrain_counts[cell.terrain] += 1

        if cell.resource in FOOD_RESOURCES:
            food_resource_count += 1
        elif cell.resource in WATER_RESOURCES:
            water_resource_count += 1

        creature = cell.creature
        if creature is None:
            continue

        population += 1

        if creature.alive:
            alive_count += 1
            total_energy_alive += creature.energy
        else:
            dead_count += 1

        if creature.species in PREDATOR_SPECIES:
            predator_count += 1
        elif creature.species in HERBIVORE_SPECIES:
            herbivore_count += 1

    average_energy = (
    round(total_energy_alive / alive_count, 2)
    if alive_count > 0
    else 0
)

    return {
        "tick": get_tick(),
        "population": population,
        "alive": alive_count,
        "dead": dead_count,
        "predators": predator_count,
        "herbivores": herbivore_count,
        "average_energy": average_energy,
        "food_resources": food_resource_count,
        "water_resources": water_resource_count,
        "terrain": terrain_counts,
        "algorithm": get_algorithm(),
    }