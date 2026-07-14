from collections import deque


def bfs(grid, start, goal, is_walkable):
    """
    Find the shortest path from start to goal using Breadth-First Search.
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
            (x, y - 1),
            (x, y + 1),
            (x - 1, y),
            (x + 1, y),
        ]

        for neighbour in neighbours:
            if neighbour not in grid:
                continue

            cell = grid[neighbour]

            if neighbour != goal and not is_walkable(cell):
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