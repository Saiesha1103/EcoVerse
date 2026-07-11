from fastapi import APIRouter

from app.services.world_service import generate_world

router = APIRouter(
    prefix="/world",
    tags=["World"]
)

@router.get("/")
def get_world():
    return generate_world()