import random

from app.models.cell import Cell
from app.models.creature import Creature
from app.models.world import World
from app.services.simulation_service import set_world

from app.simulation.biome_config import BIOME_CONFIG

def generate_terrain():
    """Generate terrain using weighted probabilities."""
    return random.choices(
        population=[
            "Forest",
            "Grassland",
            "River",
            "Mountain",
            "Desert"
        ],
        weights=[30, 30, 15, 15, 10],
        k=1
    )[0]


def generate_resource(terrain):
    """Assign resources based on biome configuration."""
    return BIOME_CONFIG.get(terrain, {}).get("resource")

def generate_creature(terrain):
    """Spawn creatures based on biome configuration."""
    allowed_species = BIOME_CONFIG.get(terrain, {}).get("allowed_species", [])

    if not allowed_species:
        return None

    return random.choice(allowed_species + [None])

def generate_world(width=20, height=20):
    """Generate a complete ecosystem world."""

    cells = []
    next_creature_id = 1

    for y in range(height):
        for x in range(width):

            terrain = generate_terrain()
            resource = generate_resource(terrain)
            species = generate_creature(terrain)

            creature = None
            if species is not None:
                creature = Creature(
                    id=next_creature_id,
                    species=species,
                    position_x=x,
                    position_y=y,
                    energy=100,
                    hunger=0,
                    thirst=0,
                    alive=True
                )
                next_creature_id += 1

            cells.append(
                Cell(
                    x=x,
                    y=y,
                    terrain=terrain,
                    resource=resource,
                    creature=creature
                )
            )

    world = World(
        width=width,
        height=height,
        cells=cells
    )

    set_world(world)

    return world