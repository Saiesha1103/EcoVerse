from pydantic import BaseModel

class Resource(BaseModel):
    id: int
    type: str
    quantity: int
    position_x: int
    position_y: int