from fastapi import APIRouter

from app.services.analytics_service import generate_analytics

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/")
def analytics():
    return generate_analytics()