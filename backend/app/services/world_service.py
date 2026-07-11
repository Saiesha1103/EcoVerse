import random

from app.models.cell import Cell
from app.models.world import World


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

    for y in range(height):
        for x in range(width):

            terrain = generate_terrain()
            resource = generate_resource(terrain)
            creature = generate_creature(terrain)

            cells.append(
                Cell(
                    x=x,
                    y=y,
                    terrain=terrain,
                    resource=resource,
                    creature=creature
                )
            )

    return World(
        width=width,
        height=height,
        cells=cells
    )import random

from app.models.cell import Cell
from app.models.world import World


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

    for y in range(height):
        for x in range(width):

            terrain = generate_terrain()
            resource = generate_resource(terrain)
            creature = generate_creature(terrain)

            cells.append(
                Cell(
                    x=x,
                    y=y,
                    terrain=terrain,
                    resource=resource,
                    creature=creature
                )
            )

    return World(
        width=width,
        height=height,
        cells=cells
    )