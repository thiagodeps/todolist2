<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. MVC Architecture & Layering
  - [PRINCIPLE_2_NAME] → II. Type-Safe Data Transfer (DTOs & Enums)
  - [PRINCIPLE_3_NAME] → III. Dependency Injection & Decoupling
  - [PRINCIPLE_4_NAME] → IV. Validation & Security at Entry
  - [PRINCIPLE_5_NAME] → V. Logical Persistence & Audit
- Added sections:
  - Serverless Data Strategy (Section 2)
  - Error Handling & Exception Policy (Section 3)
- Removed sections: None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->

# TodoLista2 Constitution

## Core Principles

### I. MVC Architecture & Layering
The project MUST follow the Model-View-Controller pattern. Logic MUST be separated into distinct layers: Models for data structure/persistence, Views (or API responses) for presentation, and Controllers for request orchestration. Business logic MUST reside in Service layers to keep Controllers thin.

### II. Type-Safe Data Transfer (DTOs & Enums)
All data entering or leaving the system MUST use Data Transfer Objects (DTOs). Primitive types SHOULD be avoided for complex structures. Enums MUST be used for all status fields and fixed sets of constants to ensure strict typing and prevent invalid states.

### III. Dependency Injection & Decoupling
Dependency Injection (DI) MUST be used to manage component lifecycles and dependencies. Concrete implementations MUST NOT be instantiated directly within consuming classes. This ensures testability via mocking and promotes loose coupling between layers.

### IV. Validation & Security at Entry
All input data MUST be validated at the system boundary using Decorators on DTOs. Security checks MUST be performed on all entry points. Malformed or malicious data MUST be rejected before reaching the service layer.

### V. Logical Persistence & Audit
The system MUST implement Soft Delete (Logical Exclusion) for all primary entities; records are marked as deleted rather than removed from storage. Every entity MUST include Audit Metadata (createdAt, updatedAt, deletedAt) to track record lifecycle.

## Serverless Data Strategy

The system operates in a serverless-ready mode using JSON files for persistence.
- Data MUST be stored in structured JSON format.
- Persistence logic MUST be abstracted behind Repository interfaces to allow future migration to traditional databases.
- Concurrent access to JSON files MUST be handled safely if applicable.

## Error Handling & Exception Policy

A Global Exception Handling mechanism MUST be implemented.
- Uncaught exceptions MUST be intercepted and transformed into standardized error responses.
- Error responses MUST NOT leak sensitive system details (stack traces) in production.
- Specific exception types SHOULD be defined for common business failures (e.g., EntityNotFound, ValidationError).

## Governance

This constitution defines the non-negotiable architectural standards for TodoLista2.
- All code reviews MUST verify adherence to MVC, DI, and Validation principles.
- Any deviation from the JSON storage or Soft Delete policy requires a MAJOR version bump and constitutional amendment.
- Use `GEMINI.md` for project-specific instructions and `.specify/memory/constitution.md` as the source of truth for principles.

**Version**: 1.0.0 | **Ratified**: 2026-05-16 | **Last Amended**: 2026-05-16
