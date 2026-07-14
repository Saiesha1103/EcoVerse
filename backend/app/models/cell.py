from pydantic import BaseModel

from app.models.creature import Creature


class Cell(BaseModel):
    x: int
    y: int
    terrain: str
    resource: str | None = None
    creature: Creature | None = None