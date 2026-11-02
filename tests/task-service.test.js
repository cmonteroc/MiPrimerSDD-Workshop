import test from "node:test";
import assert from "node:assert/strict";
import {
  createTask,
  filterTasks,
  toggleStatus,
  updateTask,
} from "../src/task-service.js";

test("createTask creates a pending task with trimmed values", () => {
  const task = createTask({ title: "  Write report  ", description: "  Draft  " });
  assert.equal(task.title, "Write report");
  assert.equal(task.description, "Draft");
  assert.equal(task.status, "pending");
  assert.ok(task.id);
});

test("createTask rejects an empty title", () => {
  assert.throws(() => createTask({ title: "   " }), /title/i);
});

test("updateTask preserves identity and status and validates title", () => {
  const task = { id: "task-1", title: "Original", description: "", status: "done" };
  const updated = updateTask(task, { title: " Revised ", description: "Details" });
  assert.deepEqual(updated, {
    id: "task-1",
    title: "Revised",
    description: "Details",
    status: "done",
  });
  assert.throws(() => updateTask(task, { title: " " }), /title/i);
});

test("toggleStatus toggles pending and done without other mutation", () => {
  const task = { id: "task-1", title: "Task", description: "", status: "pending" };
  assert.equal(toggleStatus(task).status, "done");
  assert.equal(toggleStatus(toggleStatus(task)).status, "pending");
  assert.throws(() => toggleStatus({ ...task, status: "unknown" }), /status/i);
});

test("filterTasks applies all, pending, and done filters", () => {
  const tasks = [
    { id: "1", title: "A", description: "", status: "pending" },
    { id: "2", title: "B", description: "", status: "done" },
  ];
  assert.equal(filterTasks(tasks, "all").length, 2);
  assert.deepEqual(filterTasks(tasks, "pending").map((task) => task.id), ["1"]);
  assert.deepEqual(filterTasks(tasks, "done").map((task) => task.id), ["2"]);
  assert.throws(() => filterTasks(tasks, "unknown"), /filter/i);
});
