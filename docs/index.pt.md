# Gerenciador de Tarefas

Gerenciador de lista de tarefas local-first com React e FastAPI.

## Princípios de Arquitetura (Constituição v1.0.0)

Este projeto segue rigorosamente a constituição definida em [memory/constitution.md](memory/constitution.md):

1.  **Arquitetura MVC & Camadas**: Separação clara entre Models, Views e Controllers/Services.
2.  **Transferência de Dados Type-Safe (DTOs & Enums)**: Uso obrigatório de DTOs e Enums para consistência de dados.
3.  **Injeção de Dependência & Desacoplamento**: Injeção de dependência para desacoplamento e testabilidade.
4.  **Validação & Segurança na Entrada**: Validação de entrada via decorators nos DTOs.
5.  **Persistência Lógica & Auditoria**: Soft Delete e metadados de auditoria (createdAt, updatedAt) em todas as entidades.
6.  **Estratégia de Dados Serverless**: Persistência local em arquivos JSON estruturados.
7.  **Tratamento Global de Exceções**: Tratamento centralizado de erros para respostas padronizadas.

## Funcionalidades
- Criar, Editar, Deletar tarefas.
- Alternar status (Concluído/Reaberto).
- Filtrar por status.
- Persistência JSON local.
- Retentativas automáticas em falhas de rede.
- Lida com textos longos graciosamente.

## Configuração

### Backend
1. Vá para `backend/`
2. `pip install -r requirements.txt`
3. `python main.py`

### Frontend
1. Vá para `frontend/`
2. `npm install`
3. `npm run dev`
