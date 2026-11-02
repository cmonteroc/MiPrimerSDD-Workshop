export const TASK_STATUS = Object.freeze({ PENDING: "pending", DONE: "done" });

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function validateTitle(title) {
  const normalized = String(title ?? "").trim();
  if (!normalized) throw new Error("Title is required.");
  return normalized;
}

export function createTask(input) {
  return {
    id: createId(),
    title: validateTitle(input?.title),
    description: String(input?.description ?? "").trim(),
    status: TASK_STATUS.PENDING,
  };
}

export function updateTask(task, changes) {
  return {
    ...task,
    title: validateTitle(changes?.title),
    description: String(changes?.description ?? "").trim(),
  };
}

export function toggleStatus(task) {
  if (![TASK_STATUS.PENDING, TASK_STATUS.DONE].includes(task?.status)) {
    throw new Error("Unknown task status.");
  }
  return {
    ...task,
    status: task.status === TASK_STATUS.PENDING ? TASK_STATUS.DONE : TASK_STATUS.PENDING,
  };
}

export function filterTasks(tasks, filter) {
  if (!["all", TASK_STATUS.PENDING, TASK_STATUS.DONE].includes(filter)) {
    throw new Error("Unknown filter.");
  }
  return filter === "all" ? [...tasks] : tasks.filter((task) => task.status === filter);
}
