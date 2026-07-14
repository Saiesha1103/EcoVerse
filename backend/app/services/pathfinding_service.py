from app.algorithms.bfs import bfs
from app.algorithms.astar import astar

_current_algorithm = "bfs"


def set_algorithm(name: str):
    global _current_algorithm

    if name not in ("bfs", "astar"):
        raise ValueError("Invalid algorithm")

    _current_algorithm = name


def get_algorithm():
    return _current_algorithm


def find_path(grid, start, goal, is_walkable):
    if _current_algorithm == "astar":
        return astar(grid, start, goal, is_walkable)

    return bfs(grid, start, goal, is_walkable)