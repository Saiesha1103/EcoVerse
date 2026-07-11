import random

from app.models.cell import Cell
from app.models.creature import Creature
from app.models.world import World
from app.services.simulation_service import set_world


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
    """Assign resources based on terrain."""

    if terrain == "Forest":
        return "Berries"

    elif terrain == "Grassland":
        return "Grass"

    elif terrain == "River":
        return "Water"

    elif terrain == "Mountain":
        return "Stone"

    elif terrain == "Desert":
        return "Cactus"

    return None


def generate_creature(terrain):
    """Spawn creatures based on terrain."""

    if terrain == "Forest":
        return random.choice([
            "Rabbit",
            "Wolf",
            None
        ])

    elif terrain == "Grassland":
        return random.choice([
            "Rabbit",
            None
        ])

    elif terrain == "River":
        return random.choice([
            "Fish",
            None
        ])

    elif terrain == "Mountain":
        return random.choice([
            "Goat",
            None
        ])

    elif terrain == "Desert":
        return random.choice([
            "Camel",
            None
        ])

    return None


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