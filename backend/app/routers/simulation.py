from fastapi import APIRouter

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)

@router.get("/")
def simulation_status():
    return {
        "running": False,
        "tick": 0,
        "speed": 1
    }