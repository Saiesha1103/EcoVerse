import random

from app.models.cell import Cell
from app.models.world import World


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


def generate_world(width: int = 20, height: int = 20) -> World:
    cells: list[Cell] = []

    for y in range(height):
        for x in range(width):
            terrain = generate_terrain()

            cells.append(
                Cell(
                    x=x,
                    y=y,
                    terrain=terrain,
                    resource=generate_resource(terrain),
                    creature=generate_creature(terrain),
                )
            )

    return World(
        width=width,
        height=height,
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

    return world