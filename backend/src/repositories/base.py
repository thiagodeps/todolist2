import json
import os
import tempfile
from typing import Generic, TypeVar, List, Optional
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)

class JSONRepository(Generic[T]):
    def __init__(self, file_path: str, model: type[T]):
        self.file_path = file_path
        self.model = model
        self._ensure_file()

    def _ensure_file(self):
        os.makedirs(os.path.dirname(self.file_path), exist_ok=True)
        if not os.path.exists(self.file_path):
            with open(self.file_path, "w") as f:
                json.dump({"items": []}, f)

    def _read(self) -> List[T]:
        try:
            with open(self.file_path, "r") as f:
                data = json.load(f)
                return [self.model(**item) for item in data.get("items", [])]
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _write(self, items: List[T]):
        from fastapi.encoders import jsonable_encoder
        # Atomic write using temporary file
        temp_fd, temp_path = tempfile.mkstemp(dir=os.path.dirname(self.file_path))
        try:
            with os.fdopen(temp_fd, 'w') as f:
                json.dump({"items": jsonable_encoder(items)}, f, indent=2)
            os.replace(temp_path, self.file_path)
        except Exception:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            raise

    def get_all(self) -> List[T]:
        return self._read()

    def save(self, item: T):
        items = self._read()
        for i, existing in enumerate(items):
            if getattr(existing, 'id', None) == getattr(item, 'id', None):
                items[i] = item
                break
        else:
            items.append(item)
        self._write(items)
