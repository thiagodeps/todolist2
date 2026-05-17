# API Contract v1

## Base URL: `http://localhost:8000`

### GET /tasks
- **Description**: List all non-deleted tasks.
- **Response**: `200 OK` with Task list.

### POST /tasks
- **Description**: Create a new task.
- **Request Body**: `{ "title": string, "description": string? }`
- **Response**: `201 Created` with Task object.

### PATCH /tasks/{id}
- **Description**: Update task (title, description, status).
- **Request Body**: Partial Task fields.
- **Response**: `200 OK` with updated Task.

### DELETE /tasks/{id}
- **Description**: Soft delete task.
- **Response**: `204 No Content`.
