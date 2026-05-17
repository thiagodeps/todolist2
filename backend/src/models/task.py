from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4
from pydantic import Field
from src.models.base import TaskStatus, AuditMetadata, BaseModel

class Task(AuditMetadata):
    id: UUID = Field(default_factory=uuid4)
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.ACTIVE
    due_date: Optional[datetime] = None

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[datetime] = None
