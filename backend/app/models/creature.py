from pydantic import BaseModel


class Creature(BaseModel):
    id: int
    species: str
    position_x: int
    position_y: int
    energy: int = 100
    hunger: int = 0
    thirst: int = 0
    alive: bool = True