import heapq


def heuristic(a, b):
    """Manhattan distance heuristic."""
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def astar(cell_map, start, goal, is_walkable):
    """Find the shortest path using the A* algorithm."""

    if start == goal:
        return [start]

    open_set = []
    heapq.heappush(open_set, (0, start))

    came_from = {}

    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            return list(reversed(path))

        x, y = current

        neighbours = [
            (x, y - 1),
            (x, y + 1),
            (x - 1, y),
            (x + 1, y),
        ]

        for neighbour in neighbours:
            if neighbour not in cell_map:
                continue

            if neighbour != goal and not is_walkable(cell_map[neighbour]):
                continue

            tentative_g = g_score[current] + 1

            if tentative_g < g_score.get(neighbour, float("inf")):
                came_from[neighbour] = current
                g_score[neighbour] = tentative_g
                f_score[neighbour] = tentative_g + heuristic(
                    neighbour,
                    goal,
                )

                heapq.heappush(
                    open_set,
                    (f_score[neighbour], neighbour),
                )

    return []