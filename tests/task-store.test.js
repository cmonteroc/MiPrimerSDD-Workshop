import test from "node:test";
import assert from "node:assert/strict";
import { loadTasks, saveTasks } from "../src/task-store.js";

function memoryStorage(initial = null) {
  let value = initial;
  return {
    getItem() {
      return value;
    },
    setItem(_key, nextValue) {
      value = nextValue;
    },
  };
}

test("loadTasks returns an empty collection when no data exists", () => {
  assert.deepEqual(loadTasks(memoryStorage()).value, []);
});

test("loadTasks round trips a task collection", () => {
  const storage = memoryStorage(JSON.stringify([
    { id: "1", title: "Task", description: "", status: "pending" },
  ]));
  assert.deepEqual(loadTasks(storage).value, [
    { id: "1", title: "Task", description: "", status: "pending" },
  ]);
});

test("saveTasks confirms a completed write", () => {
  const storage = memoryStorage();
  const tasks = [{ id: "1", title: "Task", description: "", status: "done" }];
  assert.deepEqual(saveTasks(tasks, storage), { ok: true, value: tasks });
});

test("saveTasks reports a failed write without claiming success", () => {
  const storage = {
    setItem() {
      throw new Error("storage unavailable");
    },
  };
  const result = saveTasks([], storage);
  assert.equal(result.ok, false);
  assert.match(result.error, /could not be saved/i);
});

test("loadTasks reports malformed JSON", () => {
  const result = loadTasks(memoryStorage("{broken"));
  assert.equal(result.ok, false);
  assert.match(result.error, /could not be read/i);
});
