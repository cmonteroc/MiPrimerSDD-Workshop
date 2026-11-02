import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../server.js";

test("static server serves index and JavaScript modules", async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();

  try {
    const index = await fetch(`http://127.0.0.1:${address.port}/`);
    assert.equal(index.status, 200);
    assert.match(await index.text(), /Curso-PSWE-07/);

    const module = await fetch(`http://127.0.0.1:${address.port}/src/task-service.js`);
    assert.equal(module.status, 200);
    assert.match(module.headers.get("content-type"), /javascript|text\/plain/);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve()),
    );
  }
});
