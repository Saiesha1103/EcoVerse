from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    analytics,
    creature,
    simulation,
    world,
)


app = FastAPI(
    title="EcoVerse API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to EcoVerse API 🌿",
    }


app.include_router(world.router)
app.include_router(creature.router)
app.include_router(simulation.router)
app.include_router(analytics.router)