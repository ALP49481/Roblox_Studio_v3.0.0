"use strict";

const crypto = require("node:crypto");
const path = require("node:path");
const express = require("express");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { pool } = global.__APOSTILA_TEST_POOL__ ? { pool: global.__APOSTILA_TEST_POOL__ } : require("./db");
const { hashPassword, normalizeUsername, passwordIsValid, safeEqual, usernameIsValid } = require("./security");
const app = express();
const siteRoot = path.resolve(__dirname, "..");
const port = Number.parseInt(process.env.PORT || "3000", 10);
const sessionDays = Math.min(Math.max(Number.parseInt(process.env.SESSION_DAYS || "30", 10), 1), 90);
const cookieName = "apostila_session";
const isProduction = process.env.NODE_ENV === "production";
const availableLessonIds = new Set([
  "modulo-00-capitulo-01",
  "modulo-00-capitulo-02",
  "modulo-01-capitulo-01",
  "modulo-01-capitulo-02",
  "modulo-01-capitulo-03",
  "modulo-01-capitulo-04",
  "modulo-02-capitulo-01",
  "modulo-02-capitulo-02",
  "modulo-02-capitulo-03",
  "modulo-02-capitulo-04",
  "modulo-02-capitulo-05",
  "modulo-02-capitulo-06",
  "modulo-02-capitulo-07",
  "modulo-02-capitulo-08",
  "modulo-02-capitulo-09",
  "modulo-03-capitulo-01",
  "modulo-03-capitulo-02",
  "modulo-03-capitulo-03",
  "modulo-03-capitulo-04",
  "modulo-04-capitulo-01",
  "modulo-04-capitulo-02",
  "modulo-04-capitulo-03",
  "modulo-04-capitulo-04",
  "modulo-04-capitulo-05",
  "modulo-04-capitulo-06",
  "modulo-05-capitulo-01",
  "modulo-05-capitulo-02",
  "modulo-05-capitulo-03",
  "modulo-05-capitulo-04",
  "modulo-05-capitulo-05",
  "modulo-06-capitulo-01",
  "modulo-06-capitulo-02",
  "modulo-06-capitulo-03",
  "modulo-06-capitulo-04",
  "modulo-07-capitulo-01",
  "modulo-07-capitulo-02",
  "modulo-07-capitulo-03",
  "modulo-07-capitulo-04",
  "modulo-07-capitulo-05",
  "modulo-08-capitulo-01",
  "modulo-08-capitulo-02",
  "modulo-08-capitulo-03",
  "modulo-08-capitulo-04",
  "modulo-08-capitulo-05",
  "modulo-09-capitulo-01",
  "modulo-09-capitulo-02",
  "modulo-09-capitulo-03",
  "modulo-09-capitulo-04",
  "modulo-09-capitulo-05",
  "modulo-09-capitulo-06",
  "modulo-10-capitulo-01",
  "modulo-10-capitulo-02",
  "modulo-10-capitulo-03",
  "modulo-11-capitulo-01",
  "modulo-11-capitulo-02",
  "modulo-11-capitulo-03",
  "modulo-11-capitulo-04"
]);

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
      "font-src": ["'self'"],
      "frame-ancestors": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"]
    }
  },
  crossOriginResourcePolicy: { policy: "same-origin" }
}));
app.use(express.json({ limit: "16kb" }));

function parseCookies(request) {
  const header = request.headers.cookie || "";
  return Object.fromEntries(header.split(";").map((part) => {
    const separator = part.indexOf("=");
    if (separator < 0) return ["", ""];
    return [decodeURIComponent(part.slice(0, separator).trim()), decodeURIComponent(part.slice(separator + 1).trim())];
  }).filter(([key]) => key));
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest();
}

function setSessionCookie(response, token) {
  response.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: sessionDays * 24 * 60 * 60 * 1000
  });
}

function clearSessionCookie(response) {
  response.clearCookie(cookieName, { httpOnly: true, secure: isProduction, sameSite: "lax", path: "/" });
}

async function createSession(userId, response) {
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionDays * 24 * 60 * 60 * 1000);
  await pool.query(
    "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, hashToken(token), expiresAt]
  );
  setSessionCookie(response, token);
}

async function optionalUser(request, _response, next) {
  try {
    const token = parseCookies(request)[cookieName];
    if (!token) return next();
    const result = await pool.query(
      `SELECT users.id, users.username
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = $1 AND sessions.expires_at > NOW()`,
      [hashToken(token)]
    );
    request.user = result.rows[0] || null;
    if (request.user) {
      pool.query("UPDATE sessions SET last_seen_at = NOW() WHERE token_hash = $1", [hashToken(token)]).catch(() => {});
    }
    next();
  } catch (error) {
    next(error);
  }
}

function requireUser(request, response, next) {
  if (!request.user) return response.status(401).json({ error: "Entre na sua conta para sincronizar o progresso." });
  next();
}

function requireSameOrigin(request, response, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return next();
  const origin = request.get("origin");
  if (!origin) return next();
  const expected = process.env.PUBLIC_ORIGIN || `${request.protocol}://${request.get("host")}`;
  if (origin !== expected) return response.status(403).json({ error: "Origem da solicitação não permitida." });
  next();
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }
});

app.use("/api", requireSameOrigin, optionalUser);

app.get("/api/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok", database: "ok" });
  } catch (_error) {
    response.status(503).json({ status: "degraded", database: "unavailable" });
  }
});

app.post("/api/auth/register", authLimiter, async (request, response, next) => {
  const username = normalizeUsername(request.body?.username);
  const password = request.body?.password;
  if (!usernameIsValid(username)) {
    return response.status(400).json({ error: "Use de 3 a 32 caracteres: letras minúsculas, números, ponto, hífen ou sublinhado." });
  }
  if (!passwordIsValid(password)) {
    return response.status(400).json({ error: "A senha deve ter entre 10 e 128 caracteres." });
  }

  try {
    const { salt, hash } = await hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (username, username_normalized, password_salt, password_hash)
       VALUES ($1, $2, $3, $4) RETURNING id, username`,
      [username, username, salt, hash]
    );
    await createSession(result.rows[0].id, response);
    response.status(201).json({ user: { username: result.rows[0].username } });
  } catch (error) {
    if (error.code === "23505") return response.status(409).json({ error: "Esse nome de usuário já está em uso." });
    next(error);
  }
});

app.post("/api/auth/login", authLimiter, async (request, response, next) => {
  const username = normalizeUsername(request.body?.username);
  const password = request.body?.password;
  if (!username || typeof password !== "string") {
    return response.status(400).json({ error: "Informe o nome de usuário e a senha." });
  }

  try {
    const result = await pool.query(
      "SELECT id, username, password_salt, password_hash FROM users WHERE username_normalized = $1",
      [username]
    );
    const user = result.rows[0];
    const candidate = await hashPassword(password, user?.password_salt || crypto.randomBytes(16));
    if (!user || !safeEqual(candidate.hash, user.password_hash)) {
      return response.status(401).json({ error: "Nome de usuário ou senha incorretos." });
    }
    await pool.query("DELETE FROM sessions WHERE expires_at <= NOW()");
    await createSession(user.id, response);
    response.json({ user: { username: user.username } });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/logout", async (request, response, next) => {
  try {
    const token = parseCookies(request)[cookieName];
    if (token) await pool.query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
    clearSessionCookie(response);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", (request, response) => {
  if (!request.user) return response.status(401).json({ user: null });
  response.json({ user: { username: request.user.username } });
});

app.get("/api/progress", requireUser, async (request, response, next) => {
  try {
    const result = await pool.query(
      "SELECT item_id, completed, updated_at FROM user_progress WHERE user_id = $1 ORDER BY item_id",
      [request.user.id]
    );
    response.json({ progress: result.rows.map((row) => ({ itemId: row.item_id, completed: row.completed, updatedAt: row.updated_at })) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/progress/:itemId", requireUser, async (request, response, next) => {
  const itemId = request.params.itemId;
  const completed = request.body?.completed;
  if (!availableLessonIds.has(itemId) || typeof completed !== "boolean") {
    return response.status(400).json({ error: "Item de progresso inválido." });
  }
  try {
    await pool.query(
      `INSERT INTO user_progress (user_id, item_id, completed, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (user_id, item_id)
       DO UPDATE SET completed = EXCLUDED.completed, updated_at = NOW()`,
      [request.user.id, itemId, completed]
    );
    response.json({ itemId, completed });
  } catch (error) {
    next(error);
  }
});

app.use("/assets", express.static(path.join(siteRoot, "assets"), { maxAge: isProduction ? "1h" : 0 }));
app.use("/modulos", express.static(path.join(siteRoot, "modulos"), { etag: true, maxAge: 0 }));
app.use("/projetos", express.static(path.join(siteRoot, "projetos"), { etag: true, maxAge: 0 }));
app.use("/reports", express.static(path.join(siteRoot, "reports"), { etag: true, maxAge: 0 }));
app.get(["/", "/index.html"], (_request, response) => response.sendFile(path.join(siteRoot, "index.html")));
app.get("/conta.html", (_request, response) => response.sendFile(path.join(siteRoot, "conta.html")));
app.get("/avaliacoes.html", (_request, response) => response.sendFile(path.join(siteRoot, "avaliacoes.html")));
app.get("/certificado.html", (_request, response) => response.sendFile(path.join(siteRoot, "certificado.html")));
app.get("/atualizacoes.html", (_request, response) => response.sendFile(path.join(siteRoot, "atualizacoes.html")));
app.get("/CONTENT-MANIFEST.json", (_request, response) => response.sendFile(path.join(siteRoot, "CONTENT-MANIFEST.json")));
app.get("/CHANGELOG.md", (_request, response) => response.sendFile(path.join(siteRoot, "CHANGELOG.md")));

app.use((request, response) => {
  if (request.path.startsWith("/api/")) return response.status(404).json({ error: "Recurso não encontrado." });
  response.status(404).sendFile(path.join(siteRoot, "index.html"));
});

app.use((error, _request, response, _next) => {
  console.error("Erro não tratado.", error.message);
  if (response.headersSent) return;
  response.status(500).json({ error: "Não foi possível concluir a operação agora." });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Apostila disponível na porta ${port}.`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

module.exports = { app, server };
