from pydantic import BaseModel

class SimulationState(BaseModel):
    running: bool
    tick: int
    speed: float
    paused: bool