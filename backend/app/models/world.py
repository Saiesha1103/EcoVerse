from pydantic import BaseModel
from app.models.cell import Cell

class World(BaseModel):
    width: int
    height: int
    cells: list[Cell]