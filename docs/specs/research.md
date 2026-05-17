# Research: Todo Manager

## Decision 1: Backend Framework (Python)
- **Decision**: FastAPI
- **Rationale**: Built-in support for Pydantic (validation), type hints (strict typing), and async capabilities. Excellent for building modern APIs.
- **Alternatives considered**: Flask (requires more plugins for validation/DI), Django (too heavy for JSON-storage local app).

## Decision 2: Frontend Framework (React + TS)
- **Decision**: React with Vite and TypeScript.
- **Rationale**: Fast development, strict typing, and standard toolset.
- **Alternatives considered**: Create React App (deprecated/slow), Next.js (unnecessary overhead for local host).

## Decision 3: Dependency Injection (Python)
- **Decision**: `dependency-injector` or FastAPI's native `Depends`.
- **Rationale**: FastAPI's `Depends` is lightweight and handles request-scoped DI well. For more complex decoupling, `dependency-injector` provides a declarative container.
- **Alternatives considered**: Manual constructor injection (scales poorly).

## Decision 4: Local Storage (JSON)
- **Decision**: Python `json` module with atomic writes (using temp files) + Repository Pattern.
- **Rationale**: Minimalist and follows the "serverless/no database" constraint while ensuring data integrity.
- **Alternatives considered**: TinyDB (added dependency), SQLite (forbidden by user constraint).

## Decision 5: Validation
- **Decision**: Pydantic (Backend) + Zod/React Hook Form (Frontend).
- **Rationale**: Industry standards for type-safe validation with decorator-like or schema-driven approaches.
