from typing import List, Optional
from uuid import UUID
from src.models.task import Task
from src.repositories.base import JSONRepository

class TaskRepository(JSONRepository[Task]):
    def __init__(self, file_path: str = "data/tasks.json"):
        super().__init__(file_path, Task)

    def get_by_id(self, task_id: UUID) -> Optional[Task]:
        items = self.get_all()
        for item in items:
            if item.id == task_id and not item.deleted_at:
                return item
        return None

    def get_active(self) -> List[Task]:
        return [item for item in self.get_all() if not item.deleted_at]
