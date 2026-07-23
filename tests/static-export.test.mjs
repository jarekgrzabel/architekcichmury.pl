import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import net from "node:net";
import test, { after, before } from "node:test";

const projectRoot = new URL("../", import.meta.url);
let server;
let origin;

async function availablePort() {
  return new Promise((resolve, reject) => {
    const socket = net.createServer();
    socket.unref();
    socket.once("error", reject);
    socket.listen(0, "127.0.0.1", () => {
      const address = socket.address();
      socket.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status === 200) return;
    } catch {
      // Passenger-style server can need a short moment to begin listening.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Serwer testowy nie uruchomił się na czas.");
}

before(async () => {
  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ["app.js"], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitForServer(`${origin}/`);
});

after(() => {
  server?.kill("SIGTERM");
});

test("eksport zawiera kompletną stronę Architekci Chmury", async () => {
  const html = await readFile(
    new URL("../out/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<html[^>]*lang="pl"/i);
  assert.match(html, /<title>Architekci Chmury \| Doradztwo AWS<\/title>/i);
  assert.match(html, /Budujemy/);
  assert.match(html, /Migracje i modernizacja AWS/);
  assert.match(html, /Migracje · Modernizacja · Agenci AI/);
  assert.match(html, /AWS Community Builder/);
  assert.match(html, /AWS Black Belt — Containers/);
  assert.match(
    html,
    /Migracje i modernizacja AWS — również z użyciem agentów AI/,
  );
  assert.doesNotMatch(html, /SPECJALIZACJA/);
  assert.match(
    html,
    /href="https:\/\/itprofessional\.pl\/"[^>]*>[\s\S]*?IT Professional/,
  );
  assert.match(html, /Umówmy rozmowę/);
  assert.doesNotMatch(html, /kontakt@architekcichmury\.pl/i);
  assert.doesNotMatch(html, /mailto:/i);
  assert.doesNotMatch(html, /oai-authenticated-user|chatgpt\.site/i);
});

test("serwer zwraca stronę i bezpieczne nagłówki", async () => {
  const response = await fetch(`${origin}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /default-src 'self'/,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(html, /Architekci Chmury/);
});

test("nieistniejąca ścieżka zwraca prawdziwe 404", async () => {
  const response = await fetch(`${origin}/nieistniejaca-strona-kontrolna`);
  assert.equal(response.status, 404);
});

test("metody modyfikujące są odrzucane", async () => {
  const response = await fetch(`${origin}/`, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
});
