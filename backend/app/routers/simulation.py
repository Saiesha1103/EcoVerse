from fastapi import APIRouter

from app.models.world import World
from app.services.world_service import reset_world, tick_world


router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)


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


@router.post("/pause")
def pause_simulation():
    simulation_state["running"] = False
    return simulation_state


@router.post("/tick", response_model=World)
def run_simulation_tick() -> World:
    updated_world = tick_world()
    simulation_state["tick"] += 1
    return updated_world


@router.post("/reset")
def reset_simulation():
    reset_world()

    simulation_state["running"] = False
    simulation_state["tick"] = 0
    simulation_state["speed"] = 1

    return simulation_state