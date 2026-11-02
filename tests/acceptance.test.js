import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = ["index.html", "styles.css", "app.js", "server.js", "src/task-service.js", "src/task-store.js"];

test("acceptance surfaces are present for observable requirements", async () => {
  const sources = Object.fromEntries(await Promise.all(files.map(async (file) => [
    file,
    await readFile(new URL(`../${file}`, import.meta.url), "utf8"),
  ])));

  assert.match(sources["app.js"], /No description/);
  assert.match(sources["app.js"], /No tasks yet/);
  assert.match(sources["app.js"], /No tasks match this filter/);
  assert.match(sources["app.js"], /Mark as done/);
  assert.match(sources["app.js"], /Mark as not done/);
  assert.match(sources["styles.css"], /min-height: 44px/);
  assert.match(sources["styles.css"], /@media \(min-width: 768px\)/);
  assert.doesNotMatch(sources["app.js"] + sources["src/task-service.js"], /account|category|priority|due date|search|sync/i);
});
