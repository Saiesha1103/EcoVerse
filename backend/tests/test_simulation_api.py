from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_world_endpoint():
    response = client.get("/world/")
    assert response.status_code == 200


def test_start_simulation():
    client.get("/world/")  # ensure world exists

    response = client.post("/simulation/start")
    assert response.status_code == 200
    assert response.json()["status"] == "running"


def test_pause_simulation():
    response = client.post("/simulation/pause")
    assert response.status_code == 200
    assert response.json()["status"] == "paused"


def test_reset_simulation():
    response = client.post("/simulation/reset")
    assert response.status_code == 200
    assert response.json()["status"] == "reset"


def test_tick():
    client.get("/world/")

    response = client.post("/simulation/tick")
    assert response.status_code == 200


def test_state():
    response = client.get("/simulation/state")
    assert response.status_code == 200

    data = response.json()

    assert "running" in data
    assert "tick" in data
    assert "speed" in data


def test_algorithm_switch():
    response = client.post(
        "/simulation/algorithm",
        json={"algorithm": "astar"},
    )

    assert response.status_code == 200
    assert response.json()["algorithm"] == "astar"


def test_analytics():
    client.get("/world/")

    response = client.get("/analytics/")
    assert response.status_code == 200

    data = response.json()

    assert "population" in data
    assert "predators" in data
    assert "herbivores" in data
    assert "average_energy" in data
    assert "tick" in data
def test_multiple_ticks():
    client.get("/world/")
    client.post("/simulation/reset")
    client.post("/simulation/start")

    for _ in range(20):
        response = client.post("/simulation/tick")
        assert response.status_code == 200

    analytics = client.get("/analytics/")

    assert analytics.status_code == 200
    data = analytics.json()

    assert data["tick"] >= 20
    assert data["population"] >= 0