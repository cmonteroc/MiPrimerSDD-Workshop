# Tasks: Curso-PSWE-07

**Input**: Design documents from `/specs/001-task-management/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/module-contracts.md, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Create root project structure in index.html, styles.css, app.js, server.js, src/, tests/, and package.json per plan.md
- [X] T002 [P] Define Node.js >=18.20 compatibility and package scripts `start` and `test` in package.json
- [X] T003 [P] Add the dependency-free static HTTP server shell in server.js
- [X] T004 Add browser and Node module entry points in index.html and app.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared contracts and test harness that block every story.

- [X] T005 Define Node built-in test configuration and shared test helpers in tests/
- [X] T006 Implement the `Task` entity and status constants for Pending/Done in src/task-service.js to satisfy FR-004
- [X] T007 Add persistence operation-result types and confirmed-write semantics in src/task-store.js for FR-016 and FR-017
- [X] T008 Create responsive shell structure and accessible control conventions in index.html and styles.css for FR-018 through FR-023
- [X] T009 Add shared requirement-to-test traceability notes in specs/001-task-management/quickstart.md

**Checkpoint**: Foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Create and review tasks (Priority: P1) MVP

**Goal**: Create valid tasks, render the list/detail views, and display empty states.

**Independent Test**: Create a task, verify it appears Pending in the list, open detail, reopen after persistence, and verify acceptance scenarios US1-1 through US1-4.

### Tests for User Story 1 (write first)

- [X] T010 [P] [US1] Add failing title/description/status tests for `createTask(input)` in tests/task-service.test.js covering FR-004 and FR-005
- [X] T011 [P] [US1] Add failing persistence round-trip tests for created tasks in tests/task-store.test.js covering FR-016
- [X] T012 [US1] Add failing UI integration tests for list rendering, application name and document title, task-row navigation, and empty states in tests/app-integration.test.js covering FR-001, FR-002, FR-003, and FR-023

### Implementation for User Story 1

- [X] T013 [US1] Implement creation and validation in src/task-service.js: unique id, non-empty title after trimming, optional description, and initial Pending status (FR-004, FR-005)
- [X] T014 [US1] Implement load/save round trips for created tasks in src/task-store.js (FR-016)
- [X] T015 [US1] Implement list rendering, Add task form, task-row navigation, and friendly empty states in app.js (FR-001 through FR-003, FR-023)
- [X] T016 [US1] Implement detail rendering for title, description or "No description", and status in app.js (FR-009, edge cases)
- [X] T017 [US1] Apply list/detail application chrome for "Curso-PSWE-07" in index.html and styles.css (FR-002, FR-018, FR-019)
- [X] T018 [US1] Run focused US1 tests and record command output only when executed, in specs/001-task-management/quickstart.md

**Acceptance Trace**: FR-001-FR-005, FR-007-FR-009, FR-018-FR-023; SC-001 and SC-004.

**Checkpoint**: US1 independently demonstrates task creation and review.

---

## Phase 4: User Story 2 - Maintain task details (Priority: P1)

**Goal**: Edit and delete tasks safely with validation, cancellation, and confirmed navigation.

**Independent Test**: Edit valid fields, reject blank title, cancel edit, confirm/delete/cancel deletion, and verify list/detail navigation plus acceptance scenarios US2-1 through US2-4.

### Tests for User Story 2 (write first)

- [X] T019 [P] [US2] Add failing edit-validation tests for `updateTask(task, changes)` in tests/task-service.test.js covering FR-007 and preserved status/identity
- [X] T020 [P] [US2] Add failing persistence tests for edit success and failed write confirmation in tests/task-store.test.js covering FR-016 and FR-017
- [X] T021 [US2] Add failing UI integration tests for Save/Cancel, confirmation, cancellation, confirmed deletion navigation, and persistence failure in tests/app-integration.test.js covering FR-006, FR-012, FR-013, and FR-017

### Implementation for User Story 2

- [X] T022 [US2] Implement `updateTask(task, changes)` preserving identity/status in src/task-service.js (FR-007, FR-008)
- [X] T023 [US2] Implement reusable Add/Edit form behavior with Save and Cancel in app.js (FR-006, FR-007)
- [X] T024 [US2] Implement confirmed deletion and cancellation navigation in app.js: confirmed delete returns to list, cancellation returns to detail (FR-010, FR-012, FR-013)
- [X] T025 [US2] Render persistence failure without claiming success and retain an unsaved draft when appropriate in app.js and src/task-store.js (FR-017, clarification persistence)
- [X] T026 [US2] Add warning styling for destructive controls and confirmation affordances in styles.css (FR-024)
- [X] T027 [US2] Run focused US2 tests and record executed results without inferred pass claims in specs/001-task-management/quickstart.md

**Acceptance Trace**: FR-006-FR-013, FR-017, FR-024; SC-003.

**Checkpoint**: US2 independently demonstrates editing and confirmed deletion.

---

## Phase 5: User Story 3 - Track and filter task status (Priority: P1)

**Goal**: Toggle status and apply All, Pending, and Done filters correctly across detail navigation.

**Independent Test**: Toggle both directions and verify active-filter reapplication, including opening Pending, marking Done, returning to Pending, and acceptance scenarios US3-1 through US3-5.

### Tests for User Story 3 (write first)

- [X] T028 [P] [US3] Add failing status-transition tests for `toggleStatus(task)` in tests/task-service.test.js covering FR-011 and FR-014A
- [X] T029 [P] [US3] Add failing filter tests for All, Pending, and Done in tests/task-service.test.js covering FR-014
- [X] T030 [US3] Add failing status/filter integration tests in tests/app-integration.test.js covering FR-011, FR-014, FR-014A, Pending-to-Done detail navigation, and dynamic “Mark as done” / “Mark as not done” labels

### Implementation for User Story 3

- [X] T031 [US3] Implement `toggleStatus(task)` and status-filter contract in src/task-service.js (FR-011, FR-014)
- [X] T032 [US3] Implement status actions, dynamic labels, active filter, and completed-task visual treatment in app.js and styles.css (FR-010, FR-011, FR-015)
- [X] T033 [US3] Preserve detail after status change and reapply the active filter on Back navigation in app.js (FR-014A, clarification filter navigation)
- [X] T034 [US3] Persist status transitions and report write failure in src/task-store.js for FR-016 and FR-017
- [X] T035 [US3] Run focused US3 tests and record executed outcomes in specs/001-task-management/quickstart.md

**Acceptance Trace**: FR-010-FR-011, FR-014-FR-016, FR-017; SC-002.

**Checkpoint**: US3 independently demonstrates status tracking and filtering.

---

## Phase 6: User Story 4 - Preserve tasks between sessions (Priority: P1)

**Goal**: Retain additions, edits, status changes, and deletions across application restarts.

**Independent Test**: Mutate several tasks, close/reopen the application, and verify the resulting collection plus US4-1 and US4-2.

### Tests for User Story 4 (write first)

- [X] T036 [P] [US4] Add failing localStorage success/failure contract tests for `loadTasks()` and `saveTasks(tasks)` in tests/task-store.test.js covering FR-016 and FR-017
- [X] T037 [US4] Add failing browser persistence integration test covering add/edit/status/delete and full application reload across two sessions in tests/app-integration.test.js covering FR-016 and SC-004

### Implementation for User Story 4

- [X] T038 [US4] Encapsulate localStorage JSON load/save and confirmed-write operation results in src/task-store.js (FR-016, FR-017)
- [X] T039 [US4] Wire application startup and successful mutations to persistence in app.js (FR-016)
- [X] T040 [US4] Implement corrupted-read or storage-failure reporting without inventing persisted data in src/task-store.js
- [X] T041 [US4] Run persistence integration tests and record executed results, limitations, and pending environment checks in specs/001-task-management/quickstart.md

**Acceptance Trace**: FR-016-FR-017; SC-004.

**Checkpoint**: US4 independently demonstrates persistence across sessions.

---

## Phase 7: Cross-Cutting Integration and Polish

- [X] T042 [P] Run static-server smoke tests in tests/server.test.js and verify local module serving
- [X] T043 [P] Add complete automated acceptance coverage for FR-001-FR-025 in tests/acceptance.test.js where behavior is automatically observable
- [X] T044 Integrate all stories and run `npm test`, recording actual output or documented execution failure in specs/001-task-management/quickstart.md
- [ ] T045 [P] Audit responsive layout, text/control contrast ratios of 4.5:1 for normal content and 3:1 for large text, touch/click targets >=44x44 px, and local visual controls in index.html and styles.css for FR-020-FR-022
- [ ] T046 Manually review list/detail flows in a desktop browser using specs/001-task-management/quickstart.md; record results, limitations, date, and browser
- [ ] T047 Manually review the same flows in a mobile-width browser and record results, limitations, date, and browser
- [X] T048 Verify usability evidence policy without claiming unexecuted testing in specs/001-task-management/quickstart.md; add separate participant method/results only if the test is actually run
- [X] T049 Audit requirements-to-test traceability across FR-001-FR-025 and SC-001-SC-006 in specs/001-task-management/quickstart.md
- [X] T050 Run final scope audit to confirm no accounts, categories, due dates, priorities, search, sync, or unapproved features were added in specs/001-task-management/quickstart.md
- [ ] T051 [P] Execute and record SC-001 participant usability evidence: method, date, first-time participants, completion/time results, limitations, and >=90% successful creation-and-detail-navigation criterion
- [ ] T052 [P] Execute and record SC-002 participant usability evidence: method, date, participants, completion/time results, limitations, and >=90% successful status-and-filter criterion
- [ ] T053 [P] Execute and record SC-003 participant usability evidence: method, date, participants, completion/time results, limitations, and >=90% successful edit-and-confirmed-delete criterion
- [ ] T054 [P] Add representative desktop/mobile acceptance evidence for SC-005, recording viewport assumptions, executed scenarios, outcomes, and unresolved DEC-003 limitations in specs/001-task-management/quickstart.md

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on setup; blocks every story.
- **US1 (Phase 3)**: Depends on foundation; provides the MVP increment.
- **US2 (Phase 4)**: Depends on foundation and Task entity/contract availability; integrates with US1 UI.
- **US3 (Phase 5)**: Depends on foundation and task/detail rendering; integrates with US1 and US2.
- **US4 (Phase 6)**: Depends on the persistence boundary and task mutations; integrates with all stories.
- **Polish (Phase 7)**: Depends on all requested stories.

Within each story, tests are listed before implementation and must be observed failing before the matching behavior is implemented.

## Parallel Opportunities

- T002 and T003 can proceed in parallel after T001.
- T010, T011, and T012 can proceed in parallel after test scaffolding.
- T019 and T020 can proceed in parallel, then feed their shared UI integration test T021.
- T028 and T029 can proceed in parallel before T030.
- T036 and T037 can proceed in parallel after persistence contract design.
- Browser desktop/mobile reviews T046 and T047 can proceed in parallel only when both environments are available.

## Parallel Example: User Story 1

```text
T010 tests/task-service.test.js
T011 tests/task-store.test.js
T012 tests/app-integration.test.js
```

## Implementation Strategy

### MVP First

1. Complete setup and foundational phases.
2. Complete US1 to deliver task creation and review.
3. Run US1 tests and independent browser checks before claiming completion.
4. Add US2, US3, and US4 as separate increments.
5. Finish integration, evidence recording, manual browser review, and scope audit.

### Evidence Rule

No task reports a passed test, successful browser review, or completed usability study unless the relevant
execution produced and recorded evidence. Pending or unavailable verification remains explicitly pending.
