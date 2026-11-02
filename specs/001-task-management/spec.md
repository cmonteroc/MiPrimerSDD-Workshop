# Feature Specification: Curso-PSWE-07

**Feature Branch**: `[001-task-management]`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Aplicación de tareas Curso-PSWE-07 definida por idea.md y contrastada con requirements/spec-inicial.md."

## Clarifications

### Session 2026-11-02

- Q: ¿Cuándo debe considerarse persistido un cambio de una tarea? → A: Solo cuando la operación confirma que la escritura fue exitosa; ante una falla, el valor editado puede mantenerse visible como borrador y la aplicación debe indicar que el cambio no fue guardado.
- Q: ¿Qué debe ocurrir cuando la eliminación se confirma y cuándo debe retirarse la confirmación? → A: Al confirmar se elimina la tarea y se vuelve a la lista; al cancelar se conserva la tarea y se vuelve al detalle; cerrar el diálogo sin confirmar no elimina la tarea.
- Q: ¿Qué navegación debe ocurrir al cambiar el estado de una tarea abierta desde un filtro? → A: Mantener el detalle abierto con el estado actualizado; al volver, la lista aplica el filtro activo y excluye la tarea si ya no coincide.
- Q: ¿Cómo deben verificarse los criterios de usabilidad sin afirmar que se realizaron pruebas? → A: Definirlos como criterios para una prueba futura; registrar evidencia real solo después de ejecutarla, incluyendo método, participantes, resultados, fecha y limitaciones.

## Document Contrast

The following differences were identified:

| Topic | idea.md | Initial specification | Resolution in this specification |
| --- | --- | --- | --- |
| Delete confirmation | Requires a confirmation before deletion | Allows deletion but does not state confirmation | Confirmation is mandatory. |
| Visual layout | Defines colors, typography, spacing, touch targets, responsive behavior, screen structure, and empty states | Does not define visual requirements | Visual requirements are included and use idea.md as the source. |
| Application name | Defines "Curso-PSWE-07" as header and window title | Mentions only "To-Do List Application" | "Curso-PSWE-07" is required. |
| Status wording | Uses "Done" and "Pending" | Uses complete and incomplete | User-facing labels MUST be Done and Pending; incomplete behavior is equivalent. |
| Persistence failure | Not specified | Mentions error reporting when saving fails | This specification retains the user notification requirement and leaves exact recovery messaging pending. |
| Out-of-scope features | Explicitly excludes accounts, categories, due dates, priorities, search, and sync | Mentions only several of those examples | All exclusions from idea.md are preserved. |

No contradiction between the documents changes the core scope. The initial specification expands persistence into multiple mutation types, which agrees with the persistence requirement in idea.md.

## Pending Decisions

- **DEC-001**: The exact accent color and exact sans-serif font family are not specified in idea.md. The specification requires a single accent color and one sans-serif family, but no specific values are established.
- **DEC-003**: The exact mobile and desktop breakpoint values are not specified; the specification requires responsive layouts without prescribing dimensions.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and review tasks (Priority: P1)

As a user, I want to create tasks and review them in a list or detail screen so that I can keep track of my work.

**Why this priority**: Creating and viewing tasks is the primary purpose of the application.

**Independent Test**: Create a task with a valid title, verify its appearance in the list, open it, and verify its details.

**Acceptance Scenarios**:

1. **Given** the task list is open and no tasks exist, **When** the user selects Add task, enters a title, and saves, **Then** a Pending task appears in the list.
2. **Given** the user creates a task without a description, **When** the task is viewed in detail, **Then** the application displays "No description".
3. **Given** a task exists, **When** the user selects its row, **Then** the detail screen displays its title, description state, and current status.
4. **Given** no tasks exist, **When** the user opens the list, **Then** the application shows a short friendly empty state and the Add task action remains available.

---

### User Story 2 - Maintain task details (Priority: P1)

As a user, I want to edit and delete tasks so that the list remains accurate.

**Why this priority**: Users need to correct or remove information that changes over time.

**Independent Test**: Edit a task and confirm the updated details; then delete it through confirmation and verify removal.

**Acceptance Scenarios**:

1. **Given** a task is open in detail, **When** the user edits its title or description and saves, **Then** the updated values appear in list and detail views.
2. **Given** the user attempts to save a blank or whitespace-only title, **When** saving is attempted, **Then** the task is not saved and a title-required message is shown.
3. **Given** a task is open in detail, **When** the user selects Delete and confirms, **Then** the task is removed and the application returns to the list.
4. **Given** the deletion confirmation is displayed, **When** the user cancels, **Then** the task remains unchanged and the application returns to its detail view.

---

### User Story 3 - Track and filter task status (Priority: P1)

As a user, I want to change completion status and filter by status so that I can focus on relevant tasks.

**Why this priority**: Completion tracking and filtering are explicit core behaviors.

**Independent Test**: Toggle a task between Pending and Done, select each filter, and verify only matching tasks are shown.

**Acceptance Scenarios**:

1. **Given** a Pending task is open, **When** the user selects Mark as done, **Then** the status becomes Done.
2. **Given** a Done task is open, **When** the user selects Mark as not done, **Then** the status becomes Pending.
3. **Given** tasks of both statuses exist, **When** the user selects All, Pending, or Done, **Then** the corresponding tasks are displayed.
4. **Given** the selected filter has no matching tasks, **When** the list is displayed, **Then** a short friendly no-match state is shown.
5. **Given** a Pending task opened from the Pending filter, **When** the user marks it Done, **Then** the detail shows Done and the Back action returns to a Pending list that excludes that task.

---

### User Story 4 - Preserve tasks between sessions (Priority: P1)

As a user, I want saved tasks and their latest state to remain available after closing and reopening the application.

**Why this priority**: The application is not reliable if it loses its data.

**Independent Test**: Create, edit, complete, and delete tasks, close the application, reopen it, and verify the resulting data.

**Acceptance Scenarios**:

1. **Given** tasks have been created or edited, **When** the application closes normally and opens again, **Then** their latest titles, descriptions, and statuses are retained.
2. **Given** a task was deleted, **When** the application closes normally and opens again, **Then** the deleted task remains absent.

### Edge Cases

- Titles that are empty or contain only whitespace are rejected on creation and edit.
- A task with no description remains valid and is shown as "No description" in detail.
- No tasks, or no tasks matching a filter, produce an informative friendly state rather than a blank screen.
- Cancelling an edit discards unsaved form values and leaves the saved task unchanged.
- Cancelling deletion leaves the task unchanged.
- A persistence operation that cannot be completed MUST not be presented as successful and MUST inform the user that the change was not saved.
- A completed task remains visibly completed through strikethrough and muted treatment in the list.
- Very long titles or descriptions MUST remain usable without removing or obscuring required controls; content may wrap or scroll.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide a To-Do List screen and a To-Do Detail screen.
- **FR-002**: The To-Do List screen MUST display the application name "Curso-PSWE-07"; the application window/document title MUST also be "Curso-PSWE-07".
- **FR-003**: The To-Do List screen MUST allow the user to add a task, open an existing task, and select All, Pending, or Done.
- **FR-004**: Each task MUST have a required non-empty title, an optional description, and a Pending or Done status.
- **FR-005**: A newly created task MUST initially have Pending status.
- **FR-006**: Task creation and editing MUST use a form that identifies required and optional fields and provides Save and Cancel actions.
- **FR-007**: Saving a task title that is empty or contains only whitespace MUST be rejected with a visible validation message.
- **FR-008**: Selecting a task row MUST open its detail view.
- **FR-009**: The detail view MUST display title, description or "No description", and the current status.
- **FR-010**: The detail view MUST provide Edit, Mark as done or Mark as not done, Delete, and Back actions.
- **FR-011**: The status action label MUST reflect the current task status.
- **FR-012**: Deletion MUST require confirmation before the task is removed.
- **FR-013**: Cancelling deletion MUST leave the task unchanged and return the user to the task detail view. Confirmed deletion MUST remove the task and return the user to the To-Do List screen.
- **FR-014**: The selected completion filter MUST display only tasks with the matching status; All MUST display every task.
- **FR-014A**: When the status of a task opened from a status filter changes, the detail view MUST remain open with its updated status unless navigation is separately requested. When the user returns to the list, the active filter MUST be reapplied and the task MUST appear only if its new status matches.
- **FR-015**: Completed tasks MUST use a strikethrough title and muted list treatment distinct from Pending tasks.
- **FR-016**: The application MUST retain created tasks, edited fields, status changes, and deletions after the application is closed normally and reopened.
- **FR-017**: A task change MUST be reported as saved only after successful confirmation of its persistent write. If persistence fails, the application MUST inform the user that the change was not saved, MUST NOT present it as saved, and MAY retain the unsaved value visibly as a draft.
- **FR-018**: The interface MUST use a clean, minimal, light-background presentation with generous white space, one sans-serif font family, and one accent color for primary actions and the active filter.
- **FR-019**: Task titles MUST use larger and bolder typography than descriptions.
- **FR-020**: Interactive targets MUST provide an effective size of at least 44 by 44 pixels.
- **FR-021**: Text and controls MUST maintain sufficient contrast. Normal text and interface controls MUST meet at least a 4.5:1 contrast ratio, and large text MUST meet at least a 3:1 ratio.
- **FR-022**: The screens MUST adapt responsively to mobile and desktop use.
- **FR-023**: The list MUST show friendly empty states when there are no tasks overall or no tasks match the active filter.
- **FR-024**: Destructive actions MUST use a warning color and confirm destructive intent.
- **FR-025**: Features not described in idea.md, including accounts, categories, due dates, priorities, search, and synchronization, MUST remain out of scope.

### Key Entities *(include if feature involves data)*

- **Task**: A personal task with a required title, optional description, and status of Pending or Done.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time users can create a valid task and open its detail within two minutes without assistance.
- **SC-002**: At least 90% of users can change a task status and locate it in the matching filter within one minute without assistance.
- **SC-003**: At least 90% of users can edit and delete a task through confirmation within two minutes without assistance.
- **SC-004**: In all acceptance tests, every addition, edit, status change, and deletion reported as saved remains correct after closing and reopening the application.
- **SC-005**: The completed application passes 100% of specified acceptance scenarios on representative mobile and desktop layouts.
- **SC-006**: No requested out-of-scope feature is present in the final product review.

Usability criteria MUST be evaluated with a future moderated or unmoderated test whose
participants, test method, tasks, timing, completion results, date, and limitations are
documented. Until this evidence is collected and recorded, the criteria MUST remain unverified
and MUST NOT be reported as passed. This specification does not assert that usability tests have
been executed.

## Assumptions

- The application serves one person's task list without accounts, sharing, or collaboration.
- A task title consisting only of whitespace is considered empty, but no maximum length is assumed.
- Pending and incomplete refer to the same initial and non-completed status.
- The user may cancel unsaved edits and deletions without changing the saved task.
- The list is filtered entirely from locally retained task data.
- Technology, platform, persistence mechanism, exact visual values, and implementation architecture will be decided later in planning.

## Dependencies

- The approved visual and functional requirements in idea.md.
- The initial task behavior review in requirements/spec-inicial.md.
- Resolution of DEC-001 and DEC-003 before those details enter acceptance validation.
