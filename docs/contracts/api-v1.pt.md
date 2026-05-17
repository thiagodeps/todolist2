# Contrato da API v1

## URL Base: `http://localhost:8000`

### GET /tasks
- **Descrição**: Lista todas as tarefas não deletadas.
- **Resposta**: `200 OK` com a lista de Tarefas.

### POST /tasks
- **Descrição**: Cria uma nova tarefa.
- **Corpo da Requisição**: `{ "title": string, "description": string? }`
- **Resposta**: `201 Created` com o objeto da Tarefa.

### PATCH /tasks/{id}
- **Descrição**: Atualiza uma tarefa (título, descrição, status).
- **Corpo da Requisição**: Campos parciais da Tarefa.
- **Resposta**: `200 OK` com a Tarefa atualizada.

### DELETE /tasks/{id}
- **Descrição**: Deleção lógica (soft delete) da tarefa.
- **Resposta**: `204 No Content`.
