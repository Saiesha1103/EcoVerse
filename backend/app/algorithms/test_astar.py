from app.algorithms.astar import astar


class MockCell:
    def __init__(self):
        self.creature = None


def is_walkable(cell):
    return cell.creature is None


def test_astar_finds_path():
    cell_map = {}

    for x in range(3):
        for y in range(3):
            cell_map[(x, y)] = MockCell()

    path = astar(
        cell_map,
        (0, 0),
        (2, 2),
        is_walkable,
    )

    assert path[0] == (0, 0)
    assert path[-1] == (2, 2)
    assert len(path) >= 5


def test_astar_no_path():
    cell_map = {}

    for x in range(3):
        for y in range(3):
            cell_map[(x, y)] = MockCell()

    cell_map[(0, 1)].creature = object()
    cell_map[(1, 0)].creature = object()

    path = astar(
        cell_map,
        (0, 0),
        (2, 2),
        is_walkable,
    )

    assert path == []


def test_astar_start_equals_goal():
    cell_map = {(0, 0): MockCell()}

    path = astar(
        cell_map,
        (0, 0),
        (0, 0),
        is_walkable,
    )

    assert path == [(0, 0)]