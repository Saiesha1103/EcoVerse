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

from app.models.world import World
from app.services.world_service import reset_world, tick_world


router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)
class AlgorithmRequest(BaseModel):
    algorithm: str


<<<<<<< HEAD
simulation_state = {
    "running": False,
    "tick": 0,
    "speed": 1,
}


@router.get("/state")
def get_simulation_state():
    return simulation_state


@router.post("/start")
def start_simulation():
    simulation_state["running"] = True
    return simulation_state
=======
@router.post("/start")
def start_simulation():
    start()
    return {
        "status": "running"
    }
>>>>>>> origin/backend-dev


@router.post("/pause")
def pause_simulation():
<<<<<<< HEAD
    simulation_state["running"] = False
    return simulation_state


@router.post("/tick", response_model=World)
def run_simulation_tick() -> World:
    updated_world = tick_world()
    simulation_state["tick"] += 1
    return updated_world
=======
    pause()
    return {
        "status": "paused"
    }
>>>>>>> origin/backend-dev


@router.post("/reset")
def reset_simulation():
<<<<<<< HEAD
    reset_world()

    simulation_state["running"] = False
    simulation_state["tick"] = 0
    simulation_state["speed"] = 1

    return simulation_state
=======
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
>>>>>>> origin/backend-dev
