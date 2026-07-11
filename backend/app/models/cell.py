from pydantic import BaseModel


class Cell(BaseModel):
    x: int
    y: int
    terrain: str
    resource: str | None = None
    creature: str | None = None