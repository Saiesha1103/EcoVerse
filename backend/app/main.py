from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import (
    world,
    creature,
    simulation,
    analytics,
)

app = FastAPI(
    title="EcoVerse API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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