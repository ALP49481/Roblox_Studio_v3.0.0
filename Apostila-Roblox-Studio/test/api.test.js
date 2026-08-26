"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

function fakePool() {
  const users = [];
  const sessions = [];
  const progress = new Map();
  return {
    async query(sql, params = []) {
      const normalized = sql.replace(/\s+/g, " ").trim();
      if (normalized === "SELECT 1") return { rows: [{ "?column?": 1 }] };
      if (normalized.startsWith("INSERT INTO users")) {
        if (users.some((user) => user.username_normalized === params[1])) {
          const error = new Error("duplicate"); error.code = "23505"; throw error;
        }
        const user = { id: users.length + 1, username: params[0], username_normalized: params[1], password_salt: params[2], password_hash: params[3] };
        users.push(user); return { rows: [{ id: user.id, username: user.username }] };
      }
      if (normalized.startsWith("INSERT INTO sessions")) {
        sessions.push({ user_id: params[0], token_hash: params[1], expires_at: params[2] }); return { rows: [] };
      }
      if (normalized.startsWith("SELECT users.id, users.username FROM sessions")) {
        const session = sessions.find((item) => item.token_hash.equals(params[0]) && item.expires_at > new Date());
        const user = session && users.find((item) => item.id === session.user_id);
        return { rows: user ? [{ id: user.id, username: user.username }] : [] };
      }
      if (normalized.startsWith("UPDATE sessions SET last_seen_at")) return { rows: [] };
      if (normalized.startsWith("SELECT id, username, password_salt")) {
        const user = users.find((item) => item.username_normalized === params[0]); return { rows: user ? [user] : [] };
      }
      if (normalized === "DELETE FROM sessions WHERE expires_at <= NOW()") return { rows: [] };
      if (normalized === "DELETE FROM sessions WHERE token_hash = $1") {
        const index = sessions.findIndex((item) => item.token_hash.equals(params[0]));
        if (index >= 0) sessions.splice(index, 1); return { rows: [] };
      }
      if (normalized.startsWith("INSERT INTO user_progress")) {
        progress.set(`${params[0]}:${params[1]}`, { item_id: params[1], completed: params[2], updated_at: new Date() }); return { rows: [] };
      }
      if (normalized.startsWith("SELECT item_id, completed, updated_at FROM user_progress")) {
        return { rows: [...progress.entries()].filter(([key]) => key.startsWith(`${params[0]}:`)).map(([, value]) => value) };
      }
      throw new Error(`Consulta não simulada: ${normalized}`);
    },
    async end() {}
  };
}

test("cadastro, sessão e progresso funcionam no fluxo HTTP", async () => {
  process.env.PORT = "0";
  process.env.NODE_ENV = "test";
  global.__APOSTILA_TEST_POOL__ = fakePool();
  const { server } = require("../server/index");
  await new Promise((resolve) => server.listening ? resolve() : server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const register = await fetch(`${base}/api/auth/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: "aluno.teste", password: "senha-de-teste-123" }) });
    assert.equal(register.status, 201);
    const cookie = register.headers.get("set-cookie").split(";")[0];

    const me = await fetch(`${base}/api/auth/me`, { headers: { cookie } });
    assert.equal(me.status, 200);
    assert.equal((await me.json()).user.username, "aluno.teste");

    const save = await fetch(`${base}/api/progress/modulo-11-capitulo-04`, { method: "PUT", headers: { cookie, "content-type": "application/json" }, body: JSON.stringify({ completed: true }) });
    assert.equal(save.status, 200);

    const list = await fetch(`${base}/api/progress`, { headers: { cookie } });
    const saved = await list.json();
    assert.deepEqual(saved.progress.map((item) => [item.itemId, item.completed]), [["modulo-11-capitulo-04", true]]);

    const invalid = await fetch(`${base}/api/progress/item-inventado`, { method: "PUT", headers: { cookie, "content-type": "application/json" }, body: JSON.stringify({ completed: true }) });
    assert.equal(invalid.status, 400);

    const logout = await fetch(`${base}/api/auth/logout`, { method: "POST", headers: { cookie } });
    assert.equal(logout.status, 204);
    const afterLogout = await fetch(`${base}/api/progress`, { headers: { cookie } });
    assert.equal(afterLogout.status, 401);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    delete global.__APOSTILA_TEST_POOL__;
  }
});
