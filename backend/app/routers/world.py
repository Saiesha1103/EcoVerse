from fastapi import APIRouter

from app.models.world import World
from app.services.world_service import get_current_world


router = APIRouter(
    prefix="/world",
    tags=["World"],
)


@router.get("/", response_model=World)
def get_world() -> World:
    return get_current_world()