import pytest
from fastapi.testclient import TestClient
from main import app
import os
import json

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_test_data():
    # Ensure data directory exists
    os.makedirs("backend/data", exist_ok=True)
    # Clear tasks for tests if needed or use a mock repository
    # For now, we'll just test the running app's endpoints
    pass

def test_read_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_task():
    task_data = {"title": "Test Task Pytest", "status": "ACTIVE"}
    response = client.post("/tasks/", json=task_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task Pytest"
    assert "id" in data
    
    # Cleanup
    task_id = data["id"]
    client.delete(f"/tasks/{task_id}")
