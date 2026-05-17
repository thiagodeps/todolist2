# Todo Manager

Local-first To-Do List manager with React and FastAPI.

## Architecture Principles (Constitution v1.0.0)

This project strictly follows the constitution defined in `.specify/memory/constitution.md`:

1.  **MVC Architecture & Layering**: Clear separation between Models, Views, and Controllers/Services.
2.  **Type-Safe Data Transfer (DTOs & Enums)**: Mandatory use of DTOs and Enums for data consistency.
3.  **Dependency Injection & Decoupling**: Dependency injection for decoupling and testability.
4.  **Validation & Security at Entry**: Input validation via decorators in DTOs.
5.  **Logical Persistence & Audit**: Soft Delete and audit metadata (createdAt, updatedAt) in all entities.
6.  **Serverless Data Strategy**: Local persistence in structured JSON files.
7.  **Global Exception Handling**: Centralized error handling for standardized responses.

## Features
- Create, Edit, Delete tasks.
- Complete/Reopen status toggles.
- Filter by status.
- Local JSON persistence.
- Automatic retries on network failure.
- Handles long text gracefully.

## Setup

### Backend
1. Navigate to `backend/`
2. `pip install -r requirements.txt`
3. `python main.py`

### Frontend
1. Navigate to `frontend/`
2. `npm install`
3. `npm run dev`
