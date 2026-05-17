# Data Model: Todo Manager

## Task Entity
- **id**: UUID (string)
- **title**: string (min 1, max 255)
- **description**: string (optional)
- **status**: Enum (ACTIVE, COMPLETED)
- **dueDate**: ISO8601 string | null (optional)
- **createdAt**: ISO8601 string
- **updatedAt**: ISO8601 string
- **deletedAt**: ISO8601 string | null (Soft Delete)

## JSON Storage Structure
```json
{
  "tasks": [
    {
      "id": "...",
      "title": "...",
      "status": "ACTIVE",
      ...
    }
  ]
}
```
