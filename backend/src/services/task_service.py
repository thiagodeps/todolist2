from datetime import datetime
from typing import List, Optional
from uuid import UUID
from src.models.task import Task, TaskCreate, TaskUpdate
from src.repositories.task_repo import TaskRepository

class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def list_tasks(self) -> List[Task]:
        return self.repository.get_active()

    def create_task(self, task_data: TaskCreate) -> Task:
        task = Task(**task_data.dict())
        self.repository.save(task)
        return task

    def update_task(self, task_id: UUID, task_data: TaskUpdate) -> Optional[Task]:
        task = self.repository.get_by_id(task_id)
        if not task:
            return None
        
        update_dict = task_data.dict(exclude_unset=True)
        for key, value in update_dict.items():
            setattr(task, key, value)
        
        task.updated_at = datetime.utcnow()
        self.repository.save(task)
        return task

    def delete_task(self, task_id: UUID) -> bool:
        task = self.repository.get_by_id(task_id)
        if not task:
            return False
        
        task.deleted_at = datetime.utcnow()
        self.repository.save(task)
        return True
