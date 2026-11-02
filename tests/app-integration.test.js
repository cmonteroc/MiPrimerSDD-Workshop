import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("HTML and UI entry point preserve application chrome and screens", async () => {
  const [html, app] = await Promise.all([source("index.html"), source("app.js")]);
  assert.match(html, /<title>Curso-PSWE-07<\/title>/);
  assert.match(app, /Curso-PSWE-07/);
  assert.match(app, /renderList/);
  assert.match(app, /renderDetail/);
  assert.match(app, /renderForm/);
});

test("UI navigation covers editing, deletion confirmation, filters and persistence failures", async () => {
  const app = await source("app.js");
  assert.match(app, /cancel-form/);
  assert.match(app, /confirm\(/);
  assert.match(app, /Mark as not done/);
  assert.match(app, /activeFilter/);
  assert.match(app, /announce\(result\.error/);
});

test("persistence integration reloads the stored collection and reports read failures", async () => {
  const [store, app] = await Promise.all([source("src/task-store.js"), source("app.js")]);
  assert.match(store, /STORAGE_KEY/);
  assert.match(store, /JSON\.stringify/);
  assert.match(app, /loadTasks\(\)/);
});
