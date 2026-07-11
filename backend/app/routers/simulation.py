from fastapi import APIRouter

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

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)


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