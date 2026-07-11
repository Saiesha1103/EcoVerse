from fastapi import APIRouter

router = APIRouter(
    prefix="/creatures",
    tags=["Creatures"]
)

@router.get("/")
def get_creatures():
    return [
        {
            "id": 1,
            "species": "Herbivore",
            "energy": 100,
            "alive": True
        }
    ]