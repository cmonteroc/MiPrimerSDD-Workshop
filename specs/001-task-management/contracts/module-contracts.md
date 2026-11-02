# Module Contracts

The application exposes no external API. These internal contracts define responsibility boundaries.

## Task service

### createTask(input)

- Input: title and optional description.
- Success: returns a Pending task with a unique identifier.
- Failure: rejects a title that is empty or whitespace-only.

### updateTask(task, changes)

- Success: returns the task with validated title and description changes while preserving identity and status.
- Failure: rejects an empty or whitespace-only title.

### toggleStatus(task)

- Success: switches Pending to Done or Done to Pending.
- Failure: rejects an unknown status.

### filterTasks(tasks, filter)

- `all` returns every task.
- `pending` returns Pending tasks.
- `done` returns Done tasks.
- Unknown filters are rejected.

## Persistence store

### loadTasks()

- Success: returns the stored collection.
- Failure: reports an operation failure without inventing persisted data.

### saveTasks(tasks)

- Success only after confirmed storage completion.
- Failure: reports failure so the UI can show an unsaved state.

## UI coordinator

- Status changes leave task detail open.
- Back navigation reapplies the active filter.
- Confirmed deletion returns to the task list.
- Cancelled deletion returns to task detail without mutation.
- Persistence failures are never described as saved.
