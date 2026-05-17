# Todo Manager

Local-first To-Do List manager with React and FastAPI.

## Architecture Principles (Constitution v1.0.0)

Este projeto segue rigorosamente a constituição definida em `.specify/memory/constitution.md`:

1.  **MVC Architecture & Layering**: Separação clara entre Models, Views e Controllers/Services.
2.  **Type-Safe Data Transfer (DTOs & Enums)**: Uso obrigatório de DTOs e Enums para consistência de dados.
3.  **Dependency Injection & Decoupling**: Injeção de dependência para desacoplamento e testabilidade.
4.  **Validation & Security at Entry**: Validação de entrada via decorators nos DTOs.
5.  **Logical Persistence & Audit**: Soft Delete e metadados de auditoria (createdAt, updatedAt) em todas as entidades.
6.  **Serverless Data Strategy**: Persistência local em arquivos JSON estruturados.
7.  **Global Exception Handling**: Tratamento centralizado de erros para respostas padronizadas.

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
