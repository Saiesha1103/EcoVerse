import random

from app.models.world import World

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
    """
    Return True only if the given species is allowed to occupy the
    given terrain type.
    """
    allowed_terrain = {
        "Rabbit": {"Forest", "Grassland"},
        "Wolf": {"Forest", "Grassland"},
        "Fish": {"River"},
        "Goat": {"Mountain", "Grassland"},
        "Camel": {"Desert", "Grassland"},
    }

    return terrain in allowed_terrain.get(species, set())


def move_creatures() -> None:
    """
    Move each creature currently on the board to a random valid
    neighbouring cell (up, down, left, right), staying within the
    world boundaries, never moving onto a cell already occupied
    by another creature, and only moving onto terrain that is
    valid for that creature's species.

    If no valid neighbour exists, the creature stays where it is.

    Terrain and resources are left untouched.
    """
    if current_world is None:
        return

    width = current_world.width
    height = current_world.height

    # Map coordinates to their cell for O(1) neighbour lookups.
    cell_map = {(cell.x, cell.y): cell for cell in current_world.cells}

    # Track occupied positions.
    occupied = {
        (cell.x, cell.y)
        for cell in current_world.cells
        if cell.creature is not None
    }

    # Snapshot creatures so each moves only once.
    creature_cells = [
        cell for cell in current_world.cells
        if cell.creature is not None
    ]

    for cell in creature_cells:
        # Skip empty or dead creatures
        if cell.creature is None or not cell.creature.alive:
            continue

        x, y = cell.x, cell.y

        candidate_positions = [
            (x, y - 1),  # up
            (x, y + 1),  # down
            (x - 1, y),  # left
            (x + 1, y),  # right
        ]

        valid_neighbours = [
            cell_map[pos]
            for pos in candidate_positions
            if (
                0 <= pos[0] < width
                and 0 <= pos[1] < height
                and pos in cell_map
                and pos not in occupied
                and is_valid_terrain(cell.creature.species, cell_map[pos].terrain)
            )
        ]

        if not valid_neighbours:
            # No valid neighbour; creature stays where it is.
            continue

        target_cell = random.choice(valid_neighbours)

        # Keep reference to creature object
        creature = cell.creature

        # Update creature's internal position
        creature.position_x = target_cell.x
        creature.position_y = target_cell.y

        # Move creature
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

        creature.energy -= 1
        creature.hunger += 1
        creature.thirst += 1

        if creature.energy <= 0:
            creature.energy = 0
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
    """
    Regenerate ecosystem resources every 10 ticks.

    Existing resources are never overwritten.
    """

    if current_world is None:
        return

    if current_tick % 10 != 0:
        return

    for cell in current_world.cells:

        if cell.resource is not None:
            continue

        if cell.terrain == "Forest":
            cell.resource = "Berries"

        elif cell.terrain == "Grassland":
            cell.resource = "Grass"

        elif cell.terrain == "River":
            cell.resource = "Water"

        elif cell.terrain == "Desert":
            cell.resource = "Cactus"

        
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