---
description: "Task list template for feature implementation"
---

# Tasks: Todo Manager

**Input**: Design documents from `/specs/001-todo-manager/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel
- **[Story]**: User story mapping (e.g., US1)

## Phase 1: Setup (Shared Infrastructure)
**Purpose**: Project initialization and basic structure

- [X] T001 Initialize `backend/` with Python/FastAPI environment and dependencies
- [X] T002 Initialize `frontend/` with React/Vite/TypeScript environment and dependencies
- [X] T003 [P] Configure backend linting (Ruff/MyPy) in `backend/pyproject.toml`
- [X] T004 [P] Configure frontend linting/formatting (ESLint/Prettier) in `frontend/`

## Phase 2: Foundational (Blocking Prerequisites)
**Purpose**: Core infrastructure MUST be complete before user stories

- [X] T005 Create JSON persistence base in `backend/src/repositories/base.py`
- [X] T006 [P] Setup FastAPI dependency injection container in `backend/src/api/dependencies.py`
- [X] T007 [P] Implement Global Exception Handler middleware in `backend/src/api/errors.py`
- [X] T008 Define base Enums (TaskStatus) and Audit traits in `backend/src/models/base.py`
- [X] T009 [P] Create base frontend API client service in `frontend/src/services/api.ts`

## Phase 3: User Story 1 - Task Management (Priority: P1) 🎯 MVP
**Goal**: User can create, edit, and delete tasks.
**Independent Test**: User can add a task, see it in the list, change its text, and remove it.

- [X] T010 [US1] Create Task Pydantic model (DTOs) in `backend/src/models/task.py`
- [X] T011 [US1] Implement TaskRepository (JSON IO) in `backend/src/repositories/task_repo.py`
- [X] T012 [US1] Implement TaskService (business logic) in `backend/src/services/task_service.py`
- [X] T013 [US1] Create FastAPI routes (POST, PATCH, DELETE) in `backend/src/api/routes/tasks.py`
- [X] T014 [US1] [P] Create frontend Task types/interfaces in `frontend/src/types/task.ts`
- [X] T015 [US1] [P] Implement frontend Task API service calls in `frontend/src/services/taskApi.ts`
- [X] T016 [US1] Build TaskList UI component in `frontend/src/components/TaskList.tsx`
- [X] T017 [US1] Build TaskInput UI component in `frontend/src/components/TaskInput.tsx`
- [X] T018 [US1] Build TaskItem (with edit/delete UI) in `frontend/src/components/TaskItem.tsx`
- [X] T019 [US1] Integrate components in main App view `frontend/src/App.tsx`

## Phase 4: User Story 2 - Status Control (Priority: P1)
**Goal**: User can mark tasks as completed or reopen them.
**Independent Test**: User can toggle the status of a task.

- [X] T020 [US2] Update TaskService to handle status toggles specifically (if needed) in `backend/src/services/task_service.py`
- [X] T021 [US2] Update frontend API service for status toggling in `frontend/src/services/taskApi.ts`
- [X] T022 [US2] Add Checkbox/Toggle UI to TaskItem component in `frontend/src/components/TaskItem.tsx`

## Phase 5: User Story 3 - Persistence & Offline Resilience (Priority: P2)
**Goal**: Tasks are saved locally; UI handles connection/save failures gracefully.
**Independent Test**: Close/reopen app retains data. Simulate connection loss during create.

- [X] T023 [US3] Implement retry logic for API calls in frontend base API service `frontend/src/services/api.ts`
- [X] T024 [US3] Add offline/error state UI feedback in `frontend/src/components/TaskInput.tsx`
- [X] T025 [US3] Ensure TaskRepository atomic file writes in `backend/src/repositories/base.py`


## Phase 6: User Story 4 - Filtering & List Views (Priority: P2)
**Goal**: Filter tasks by status (Active, Completed, All).
**Independent Test**: Filter UI correctly filters rendered list.

- [X] T026 [US4] Add GET /tasks filtering query params support in `backend/src/api/routes/tasks.py`
- [X] T027 [US4] Update frontend API service to pass filters in `frontend/src/services/taskApi.ts`
- [X] T028 [US4] Build FilterBar UI component in `frontend/src/components/FilterBar.tsx`
- [X] T029 [US4] Integrate FilterBar state into main view `frontend/src/App.tsx`

## Phase 7: Polish & Cross-Cutting Concerns
**Purpose**: Improvements that affect multiple user stories

- [X] T030 [P] Ensure CSS handles extremely long text wrapping (FR-007) in `frontend/src/index.css`
- [X] T031 Refactor and clean up React state management (e.g., Context if needed)
- [X] T032 Update main README with quickstart instructions

## Dependencies & Execution Order
- Phase 1 & 2 MUST run first.
- US1 (Phase 3) is MVP.
- US2 depends on US1.
- US3 and US4 depend on US1 and US2.

## Implementation Strategy
1. **MVP First**: Complete Phase 1, Phase 2, and Phase 3 (US1). Validate end-to-end task creation.
2. **Incremental**: Add US2 (Status toggle), then US3 (Resilience), then US4 (Filtering).
