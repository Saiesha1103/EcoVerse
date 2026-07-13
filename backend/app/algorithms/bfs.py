from collections import deque


def bfs(grid, start, goal):
    """
    Find the shortest path from start to goal using Breadth-First Search.

    Parameters:
        grid: Dictionary mapping (x, y) -> Cell
        start: (x, y)
        goal: (x, y)

    Returns:
        List of coordinates representing the shortest path,
        or an empty list if no path exists.
    """

    queue = deque([start])
    visited = {start}
    parent = {}

    while queue:
        current = queue.popleft()

        if current == goal:
            break

        x, y = current

        neighbours = [
            (x, y - 1),  # Up
            (x, y + 1),  # Down
            (x - 1, y),  # Left
            (x + 1, y),  # Right
        ]

        for neighbour in neighbours:
            if neighbour not in grid:
                continue

            cell = grid[neighbour]

            if cell.creature is not None:
                continue

            if neighbour not in visited:
                visited.add(neighbour)
                parent[neighbour] = current
                queue.append(neighbour)

    if goal not in visited:
        return []

    path = []
    current = goal

    while current != start:
        path.append(current)
        current = parent[current]

    path.append(start)
    path.reverse()

    return path