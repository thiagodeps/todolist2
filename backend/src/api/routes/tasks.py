from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, HTTPException, Depends, status, Query
from src.models.task import Task, TaskCreate, TaskUpdate
from src.models.base import TaskStatus
from src.services.task_service import TaskService
from src.repositories.task_repo import TaskRepository

router = APIRouter(prefix="/tasks", tags=["tasks"])

def get_task_service():
    repo = TaskRepository()
    return TaskService(repo)

@router.get("/", response_model=List[Task])
def list_tasks(
    status: Optional[TaskStatus] = Query(None),
    service: TaskService = Depends(get_task_service)
):
    tasks = service.list_tasks()
    if status:
        return [t for t in tasks if t.status == status]
    return tasks

@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, service: TaskService = Depends(get_task_service)):
    return service.create_task(task)

@router.patch("/{task_id}", response_model=Task)
def update_task(task_id: UUID, task_data: TaskUpdate, service: TaskService = Depends(get_task_service)):
    updated_task = service.update_task(task_id, task_data)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID, service: TaskService = Depends(get_task_service)):
    if not service.delete_task(task_id):
        raise HTTPException(status_code=404, detail="Task not found")
