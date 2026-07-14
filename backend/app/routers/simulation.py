from fastapi import APIRouter
from pydantic import BaseModel


from app.services.simulation_service import (
    set_world,
    get_world,
    start,
    pause,
    reset,
    tick,
    is_running,
    get_tick,
    set_speed,
    get_speed,
)
from app.services.pathfinding_service import (
    set_algorithm,
    get_algorithm,
)

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)
class AlgorithmRequest(BaseModel):
    algorithm: str


@router.post("/start")
def start_simulation():
    start()
    return {
        "status": "running"
    }


@router.post("/pause")
def pause_simulation():
    pause()
    return {
        "status": "paused"
    }


@router.post("/reset")
def reset_simulation():
    reset()
    return {
        "status": "reset"
    }


@router.post("/tick")
def tick_simulation():
    world = tick()

    if world is None:
        return {
            "error": "No world loaded"
        }

    return world


@router.get("/state")
def get_state():
    return {
        "running": is_running(),
        "tick": get_tick(),
        "speed": get_speed()
    }
@router.post("/algorithm")
def change_algorithm(request: AlgorithmRequest):
    try:
        set_algorithm(request.algorithm)

        return {
            "status": "success",
            "algorithm": get_algorithm()
        }

    except ValueError as e:
        return {
            "status": "error",
            "message": str(e)
        }