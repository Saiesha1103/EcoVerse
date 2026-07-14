import random
from app.services.pathfinding_service import find_path

from app.models.world import World
from app.simulation.biome_config import BIOME_CONFIG

current_world: World | None = None
current_tick: int = 0
running: bool = False
simulation_speed: int = 1


def set_world(world: World) -> None:
    """Store a new world as the current simulation state and reset the tick counter."""
    global current_world, current_tick
    current_world = world
    current_tick = 0


def get_world() -> World | None:
    """Return the current world, or None if no world has been set."""
    return current_world


def start() -> None:
    """Mark the simulation as running."""
    global running
    running = True


def pause() -> None:
    """Mark the simulation as paused."""
    global running
    running = False


def reset() -> None:
    """Reset the tick counter to 0 and stop the simulation."""
    global current_tick, running
    current_tick = 0
    running = False


def is_valid_terrain(species: str, terrain: str) -> bool:
    """Return True if the species is allowed in the given biome."""
    allowed_species = BIOME_CONFIG.get(terrain, {}).get("allowed_species", [])
    return species in allowed_species
def is_walkable(cell) -> bool:
    return cell.creature is None
def find_nearest_resource(start_pos, resource_name):
    if current_world is None:
        return None

    nearest = None
    best_distance = float("inf")

    for cell in current_world.cells:
        if cell.resource != resource_name:
            continue

        distance = abs(cell.x - start_pos[0]) + abs(cell.y - start_pos[1])

        if distance < best_distance:
            best_distance = distance
            nearest = (cell.x, cell.y)

    return nearest
def find_nearest_creature(start_pos, species):
    if current_world is None:
        return None

    nearest = None
    best_distance = float("inf")

    for cell in current_world.cells:
        if cell.creature is None:
            continue

        if cell.creature.species != species:
            continue

        distance = abs(cell.x - start_pos[0]) + abs(cell.y - start_pos[1])

        if distance < best_distance:
            best_distance = distance
            nearest = (cell.x, cell.y)

    return nearest
def predator_attack():
    if current_world is None:
        return

    cell_map = {(cell.x, cell.y): cell for cell in current_world.cells}

    for cell in current_world.cells:
        predator = cell.creature

        if predator is None or predator.species != "Wolf":
            continue

        neighbours = [
            (cell.x, cell.y - 1),
            (cell.x, cell.y + 1),
            (cell.x - 1, cell.y),
            (cell.x + 1, cell.y),
        ]

        for pos in neighbours:
            if pos not in cell_map:
                continue

            target = cell_map[pos].creature

            if (
                target is not None
                and target.alive
                and target.species in {"Rabbit", "Goat", "Camel"}
            ):
                target.alive = False
                predator.energy = min(predator.energy + 30, 100)
                break

def move_creatures() -> None:
    """
    Move each creature one step towards its target using the
    currently selected pathfinding algorithm.
    """
    if current_world is None:
        return

    width = current_world.width
    height = current_world.height

    cell_map = {(cell.x, cell.y): cell for cell in current_world.cells}

    occupied = {
        (cell.x, cell.y)
        for cell in current_world.cells
        if cell.creature is not None
    }

    creature_cells = [
        cell
        for cell in current_world.cells
        if cell.creature is not None
    ]

    for cell in creature_cells:

        if cell.creature is None or not cell.creature.alive:
            continue

        x, y = cell.x, cell.y

        candidate_positions = [
            (x, y - 1),
            (x, y + 1),
            (x - 1, y),
            (x + 1, y),
        ]

        valid_neighbours = [
            cell_map[pos]
            for pos in candidate_positions
            if (
                0 <= pos[0] < width
                and 0 <= pos[1] < height
                and pos in cell_map
                and pos not in occupied
                and is_valid_terrain(
                    cell.creature.species,
                    cell_map[pos].terrain,
                )
            )
        ]

        if not valid_neighbours:
            continue

        goal = None

        if cell.creature.species == "Rabbit":
            goal = (
                find_nearest_resource((x, y), "Grass")
                or find_nearest_resource((x, y), "Berries")
            )

        elif cell.creature.species == "Goat":
            goal = (
                find_nearest_resource((x, y), "Grass")
                or find_nearest_resource((x, y), "Berries")
            )

        elif cell.creature.species == "Camel":
            goal = (
                find_nearest_resource((x, y), "Water")
                or find_nearest_resource((x, y), "Cactus")
            )

        elif cell.creature.species == "Wolf":
            goal = find_nearest_creature((x, y), "Rabbit")

        if goal is not None:

            path = find_path(
                cell_map,
                (x, y),
                goal,
                lambda c: (
                    c.creature is None
                    and is_valid_terrain(
                        cell.creature.species,
                        c.terrain,
                    )
                ),
            )

            if len(path) >= 2:
                next_pos = path[1]

                if next_pos in cell_map and next_pos not in occupied:
                    target_cell = cell_map[next_pos]
                else:
                    target_cell = random.choice(valid_neighbours)
            else:
                target_cell = random.choice(valid_neighbours)

        else:
            target_cell = random.choice(valid_neighbours)

        creature = cell.creature

        creature.position_x = target_cell.x
        creature.position_y = target_cell.y

        target_cell.creature = creature
        cell.creature = None

        occupied.discard((x, y))
        occupied.add((target_cell.x, target_cell.y))
def update_creature_states() -> None:
    """
    Iterate through every creature currently in the world and apply
    per-tick state decay: energy decreases, hunger and thirst increase.

    If a creature's energy drops to zero or below, it is marked as
    no longer alive.
    """
    if current_world is None:
        return

    for cell in current_world.cells:
        creature = cell.creature

        # Skip empty or already dead creatures
        if creature is None or not creature.alive:
            continue

        creature.energy = max(0, creature.energy - 1)
        creature.hunger = min(100, creature.hunger + 1)
        creature.thirst = min(100, creature.thirst + 1)

        if  (
            creature.energy <= 0
            or creature.hunger >= 100
            or creature.thirst >= 100
        ):
            creature.alive = False
def process_resources() -> None:
    """
    Handle creature interaction with resources.

    Herbivores:
    - Berries -> +20 energy
    - Grass -> +15 energy

    Any creature:
    - Water -> thirst reset

    Consumed resources are removed.
    """

    if current_world is None:
        return

    herbivores = {"Rabbit", "Goat", "Camel"}

    for cell in current_world.cells:
        creature = cell.creature

        if creature is None or not creature.alive:
            continue

        if creature.species in herbivores:

            if cell.resource == "Berries":
                creature.energy = min(creature.energy + 20, 100)
                creature.hunger = 0
                cell.resource = None

            elif cell.resource == "Grass":
                creature.energy = min(creature.energy + 15, 100)
                creature.hunger = 0
                cell.resource = None

        if cell.resource == "Water":
            creature.thirst = 0
            cell.resource = None
def remove_dead_creatures() -> None:
    """
    Remove dead creatures from the simulation.

    Before removing the creature from the world,
    clear its stored position so its internal state
    remains consistent.
    """
    if current_world is None:
        return

    for cell in current_world.cells:
        creature = cell.creature

        if creature is not None and not creature.alive:
            creature.position_x = -1
            creature.position_y = -1
            cell.creature = None
def regenerate_resources() -> None:
    if current_world is None:
        return

    if current_tick % 10 != 0:
        return

    for cell in current_world.cells:

        if cell.resource is not None:
            continue

        if cell.creature is not None:
            continue

        resource = BIOME_CONFIG.get(cell.terrain, {}).get("resource")

        if resource is None:
            continue

        if random.random() < 0.35:
            cell.resource = resource
def tick() -> World | None:
    """
    Advance the simulation by one tick.

    Increments the tick counter, moves creatures randomly to
    neighbouring cells, updates each creature's energy/hunger/thirst
    state, processes resource consumption, removes dead creatures,
    regenerates resources, and returns the current world. Returns
    None if no world exists.
    """
    global current_tick

    if current_world is None:
        return None

    current_tick += 1

    move_creatures()
    predator_attack()
    update_creature_states()
    process_resources()
    remove_dead_creatures()
    regenerate_resources()

    return current_world

def is_running() -> bool:
    """Return whether the simulation is currently running."""
    return running


def get_tick() -> int:
    """Return the current tick count."""
    return current_tick


def set_speed(speed: int) -> None:
    """Set the simulation speed."""
    global simulation_speed
    simulation_speed = speed


def get_speed() -> int:
    """Return the current simulation speed."""
    return simulation_speed