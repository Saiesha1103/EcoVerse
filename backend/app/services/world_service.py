import random

from app.models.cell import Cell
from app.models.creature import Creature
from app.models.world import World
from app.services.simulation_service import set_world

from app.simulation.biome_config import BIOME_CONFIG

_current_world: World | None = None


def generate_terrain() -> str:
    return random.choices(
        population=[
            "Forest",
            "Grassland",
            "River",
            "Mountain",
            "Desert",
        ],
        weights=[30, 30, 15, 15, 10],
        k=1,
    )[0]


<<<<<<< HEAD
def generate_resource(terrain: str) -> str | None:
    resources = {
        "Forest": "Berries",
        "Grassland": "Grass",
        "River": "Water",
        "Mountain": "Stone",
        "Desert": "Cactus",
    }

    return resources.get(terrain)


def generate_creature(terrain: str) -> str | None:
    creatures = {
        "Forest": ["Rabbit", "Wolf", None],
        "Grassland": ["Rabbit", None],
        "River": ["Fish", None],
        "Mountain": ["Goat", None],
        "Desert": ["Camel", None],
    }

    return random.choice(creatures.get(terrain, [None]))
=======
def generate_resource(terrain):
    """Assign resources based on biome configuration."""
    return BIOME_CONFIG.get(terrain, {}).get("resource")

def generate_creature(terrain):
    """Spawn creatures based on biome configuration."""
    allowed_species = BIOME_CONFIG.get(terrain, {}).get("allowed_species", [])

    if not allowed_species:
        return None
>>>>>>> origin/backend-dev

    return random.choice(allowed_species + [None])

<<<<<<< HEAD
def generate_world(width: int = 20, height: int = 20) -> World:
    cells: list[Cell] = []
=======
def generate_world(width=20, height=20):
    """Generate a complete ecosystem world."""

    cells = []
    next_creature_id = 1
>>>>>>> origin/backend-dev

    for y in range(height):
        for x in range(width):
            terrain = generate_terrain()
<<<<<<< HEAD
=======
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
>>>>>>> origin/backend-dev

            cells.append(
                Cell(
                    x=x,
                    y=y,
                    terrain=terrain,
                    resource=generate_resource(terrain),
                    creature=generate_creature(terrain),
                )
            )

    world = World(
        width=width,
        height=height,
<<<<<<< HEAD
        cells=cells,
    )


def get_current_world() -> World:
    global _current_world

    if _current_world is None:
        _current_world = generate_world()

    return _current_world


def reset_world() -> World:
    global _current_world

    _current_world = generate_world()
    return _current_world


def tick_world() -> World:
    world = get_current_world()

    cell_map = {
        (cell.x, cell.y): cell
        for cell in world.cells
    }

    creature_cells = [
        cell for cell in world.cells
        if cell.creature is not None
    ]

    random.shuffle(creature_cells)

    for source_cell in creature_cells:
        if source_cell.creature is None:
            continue

        possible_positions = [
            (source_cell.x + 1, source_cell.y),
            (source_cell.x - 1, source_cell.y),
            (source_cell.x, source_cell.y + 1),
            (source_cell.x, source_cell.y - 1),
        ]

        random.shuffle(possible_positions)

        for position in possible_positions:
            target_cell = cell_map.get(position)

            if target_cell is None:
                continue

            if target_cell.creature is not None:
                continue

            target_cell.creature = source_cell.creature
            source_cell.creature = None
            break
=======
        cells=cells
    )

    set_world(world)
>>>>>>> origin/backend-dev

    return world