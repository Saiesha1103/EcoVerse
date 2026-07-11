from pydantic import BaseModel

class Creature(BaseModel):
    id: int
    species: str
    position_x: int
    position_y: int
    energy: float
    hunger: float
    thirst: float
    alive: bool