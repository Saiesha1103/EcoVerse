from fastapi import FastAPI

from app.routers import (
    world,
    creature,
    simulation,
    analytics
)

app = FastAPI(
    title="EcoVerse API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to EcoVerse API 🌿"
    }

app.include_router(world.router)
app.include_router(creature.router)
app.include_router(simulation.router)
app.include_router(analytics.router)