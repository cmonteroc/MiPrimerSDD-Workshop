export const STORAGE_KEY = "curso-pswe-07.tasks";

function storageFor(storage) {
  return storage ?? globalThis.localStorage;
}

export function loadTasks(storage = undefined) {
  try {
    const raw = storageFor(storage)?.getItem(STORAGE_KEY);
    if (!raw) return { ok: true, value: [] };
    const tasks = JSON.parse(raw);
    if (!Array.isArray(tasks)) throw new Error("Stored tasks are not a collection.");
    return { ok: true, value: tasks };
  } catch {
    return { ok: false, error: "Stored tasks could not be read." };
  }
}

export function saveTasks(tasks, storage = undefined) {
  try {
    storageFor(storage).setItem(STORAGE_KEY, JSON.stringify(tasks));
    return { ok: true, value: tasks };
  } catch {
    return { ok: false, error: "The change could not be saved." };
  }
}
