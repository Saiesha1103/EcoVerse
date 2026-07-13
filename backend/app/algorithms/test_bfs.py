from app.algorithms.bfs import bfs


class MockCell:
    def __init__(self):
        self.creature = None


grid = {
    (0, 0): MockCell(),
    (1, 0): MockCell(),
    (2, 0): MockCell(),
}

path = bfs(grid, (0, 0), (2, 0))

print(path)