from pydantic import BaseModel

class Terrain(BaseModel):
    id: int
    type: str
    walkable: bool
    movement_cost: int