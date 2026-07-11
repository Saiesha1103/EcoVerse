from fastapi import APIRouter

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/")
def analytics():
    return {
        "population": 1,
        "food": 100,
        "water": 100
    }