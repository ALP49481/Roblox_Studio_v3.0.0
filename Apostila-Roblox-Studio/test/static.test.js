"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const htmlFiles = ["index.html", "conta.html", "modulos/modulo-00.html", "modulos/modulo-01.html", "modulos/modulo-02.html", "modulos/modulo-03.html", "modulos/modulo-04.html", "modulos/modulo-05.html", "modulos/modulo-06.html", "modulos/modulo-07.html", "modulos/modulo-08.html", "modulos/modulo-09.html", "modulos/modulo-10.html", "modulos/modulo-11.html"];

function html(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("todos os arquivos estudantis existem e não contêm pendências", () => {
  for (const file of htmlFiles) {
    const content = html(file);
    assert.match(content, /<!doctype html>/i, file);
    assert.doesNotMatch(content, /\bTODO\b|capítulos seguintes continuam|capítulo final continua|<!-- continuação -->/, file);
  }
});

test("ids são únicos em cada página", () => {
  for (const file of htmlFiles) {
    const ids = [...html(file).matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `id duplicado em ${file}`);
  }
});

test("links internos apontam para arquivos e fragmentos existentes", () => {
  for (const file of htmlFiles) {
    const content = html(file);
    const links = [...content.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    for (const href of links) {
      if (/^(https?:|mailto:)/.test(href)) continue;
      const [rawTargetWithQuery, fragment] = href.split("#");
      const rawTarget = rawTargetWithQuery.split("?")[0];
      const targetFile = rawTarget ? path.resolve(root, path.dirname(file), rawTarget) : path.join(root, file);
      assert.equal(fs.existsSync(targetFile), true, `${file} → ${href}`);
      if (fragment) assert.match(fs.readFileSync(targetFile, "utf8"), new RegExp(`id=["']${fragment}["']`), `${file} → #${fragment}`);
    }
  }
});

test("todo capítulo disponível participa do progresso", () => {
  const moduleIds = htmlFiles.filter((file) => file.includes("modulo-")).flatMap((file) => [...html(file).matchAll(/data-progress-id="([^"]+)"/g)].map((match) => match[1]));
  const script = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
  const server = fs.readFileSync(path.join(root, "server/index.js"), "utf8");
  for (const id of moduleIds) {
    assert.equal(script.includes(`"${id}"`), true, `frontend: ${id}`);
    assert.equal(server.includes(`"${id}"`), true, `servidor: ${id}`);
  }
  assert.equal(moduleIds.length, 57);
});

test("módulo 11 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-11.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/data-progress-id="modulo-11-capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 4);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 4);
  assert.match(content, /Expedição de cristais/);
  assert.match(content, /vertical slice/i);
  assert.match(content, /RequestCollect/);
  assert.match(content, /COLLECTION_DISTANCE/);
  assert.match(content, /Schema\.migrate/);
  assert.match(content, /load falhou/i);
  assert.match(content, /reduceMotion/);
  assert.match(content, /LogOnboardingFunnelStepEvent/);
  assert.match(content, /LogEconomyEvent/);
  assert.match(content, /rollback/i);
  assert.match(content, /Projeto progressivo 11 concluído/);
  assert.doesNotMatch(content, /LocalScript[\s\S]{0,300}DataStoreService/);
});

test("módulo 10 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-10.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 3);
  assert.equal([...content.matchAll(/data-progress-id="modulo-10-capitulo-/g)].length, 3);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 3);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 3);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 3);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 3);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 3);
  assert.match(content, /TeleportAsync/);
  assert.match(content, /TeleportInitFailed/);
  assert.match(content, /ShouldReserveServer/);
  assert.match(content, /SetTeleportData/);
  assert.match(content, /GetJoinData/);
  assert.match(content, /MemoryStoreService:GetQueue/);
  assert.match(content, /ReadAsync/);
  assert.match(content, /RemoveAsync/);
  assert.match(content, /MessagingService/);
  assert.match(content, /best effort/i);
  assert.match(content, /HttpService:GetSecret/);
  assert.match(content, /RequestAsync/);
  assert.match(content, /subconjunto/i);
  assert.match(content, /API key/);
  assert.match(content, /OAuth 2\.0/);
  assert.doesNotMatch(content, /(?:x-api-key|OPEN_CLOUD_READ_KEY)["'\s:=]+(?:eyJ|rblx|AKIA|[A-Za-z0-9_-]{36,})/i);
  assert.doesNotMatch(content, /TeleportService:(?:Teleport|TeleportPartyAsync|TeleportToPrivateServer)\(/);
});

test("módulo 9 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-09.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 6);
  assert.equal([...content.matchAll(/data-progress-id="modulo-09-capitulo-/g)].length, 6);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 6);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 7);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 6);
  assert.match(content, /id="avaliacao"/);
  assert.match(content, /FilterStringAsync/);
  assert.match(content, /debug\.profilebegin/);
  assert.match(content, /AssetManifest/);
  assert.match(content, /Version History/);
  assert.match(content, /BindReceiptHandler/);
  assert.match(content, /ProcessReceipt/);
  assert.match(content, /GetProductInfoAsync/);
  assert.match(content, /GetProductInfo<\/code>.*depreciad/is);
  assert.match(content, /processedReceipts/);
  assert.match(content, /LogOnboardingFunnelStepEvent/);
  assert.doesNotMatch(content, /PromptProductPurchaseFinished[\s\S]{0,200}(?:concede|grant)/i);
});

test("módulo 8 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-08.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/data-progress-id="modulo-08-capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 5);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 5);
  assert.match(content, /RunService\.Heartbeat/);
  assert.match(content, /SetNetworkOwner\(nil\)/);
  assert.match(content, /AudioPlayer/);
  assert.match(content, /PathfindingService:CreatePath/);
  assert.match(content, /math\.isfinite/);
  assert.match(content, /GetPartBoundsInBox/);
  assert.match(content, /Projeto progressivo 10 começa/);
  assert.match(content, /Projeto 10 concluído/);
  assert.doesNotMatch(content, /local\s+\w+\s*=\s*humanoid:LoadAnimation\(/i);
  assert.doesNotMatch(content, /<code>[\s\S]*?(?:\s|\))<(?:=|\s|\d)[\s\S]*?<\/code>/);
});

test("módulo 7 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-07.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/data-progress-id="modulo-07-capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 5);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 5);
  assert.match(content, /id="avaliacao"/);
  assert.match(content, /GetAsync/);
  assert.match(content, /UpdateAsync/);
  assert.match(content, /GetRequestBudgetForRequestType/);
  assert.match(content, /LockId/);
  assert.match(content, /BindToClose/);
  assert.match(content, /claimedRewards/);
  assert.match(content, /SIMULATE_FAILURE/);
  assert.doesNotMatch(content, /DataStoreService[\s\S]{0,120}LocalScript/);
});

test("módulo 6 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-06.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/data-progress-id="modulo-06-capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 4);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 4);
  assert.match(content, /ModuleScript/);
  assert.match(content, /VALID_TRANSITIONS/);
  assert.match(content, /Call Stack/);
  assert.match(content, /Script Sync/);
  assert.match(content, /Version History/);
  assert.match(content, /id="referencias-modulo"/);
  assert.doesNotMatch(content, /DataStoreService|UpdateAsync\s*\(/);
});

test("módulo 5 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-05.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/data-progress-id="modulo-05-capitulo-/g)].length, 5);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 5);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 5);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 5);
  assert.match(content, /id="avaliacao"/);
  assert.match(content, /math\.isfinite/);
  assert.match(content, /TokenBucket/);
  assert.match(content, /RemoteEvent/);
  assert.match(content, /RemoteFunction/);
  assert.match(content, /UnreliableRemoteEvent/);
  assert.match(content, /idempot/i);
});

test("módulo 4 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-04.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 6);
  assert.equal([...content.matchAll(/data-progress-id="modulo-04-capitulo-/g)].length, 6);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 6);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 6);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 6);
  for (let chapter = 1; chapter <= 6; chapter += 1) {
    assert.match(content, new RegExp(`id="capitulo-0${chapter}"`));
  }
  assert.match(content, /id="glossario"/);
  assert.match(content, /id="fontes"/);
  assert.match(content, /UIButton/);
  assert.match(content, /O cliente não é confiável|cliente não é confiável/i);
  assert.doesNotMatch(content, /RemoteEvent|RemoteFunction/);
});

test("módulo 3 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-03.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/data-progress-id="modulo-03-capitulo-/g)].length, 4);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 4);
  assert.equal([...content.matchAll(/<details class="answer">/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Fácil<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Intermediário<\/span>/g)].length, 4);
  assert.equal([...content.matchAll(/<span class="difficulty">Desafiador<\/span>/g)].length, 4);
  for (let chapter = 1; chapter <= 4; chapter += 1) {
    assert.match(content, new RegExp(`id="capitulo-0${chapter}"`));
  }
  assert.match(content, /id="glossario"/);
  assert.match(content, /id="fontes"/);
  assert.doesNotMatch(content, /FindPartOnRay\s*\(/);
  assert.doesNotMatch(content, /FindPartsInRegion3\s*\(/);
});

test("módulo 2 está completo e obedece ao contrato pedagógico", () => {
  const content = html("modulos/modulo-02.html");
  assert.equal([...content.matchAll(/<article class="chapter" id="capitulo-/g)].length, 9);
  assert.equal([...content.matchAll(/data-progress-id="modulo-02-capitulo-/g)].length, 9);
  assert.equal([...content.matchAll(/<h3>Validação técnica<\/h3>/g)].length, 9);
  assert.ok([...content.matchAll(/<details class="answer">/g)].length >= 10);
  for (let chapter = 1; chapter <= 9; chapter += 1) {
    assert.match(content, new RegExp(`id="capitulo-0?${chapter}"`));
  }
  assert.match(content, /id="avaliacao"/);
  assert.match(content, /id="glossario"/);
  assert.match(content, /id="fontes"/);
});

test("site não contém segredo real ou Markdown estudantil", () => {
  assert.equal(fs.existsSync(path.join(root, ".env")), false);
  assert.equal(htmlFiles.some((file) => file.endsWith(".md")), false);
  const example = fs.readFileSync(path.join(root, ".env.example"), "utf8");
  assert.match(example, /\.\.\./);
});

test("impressão e acessibilidade possuem regras explícitas", () => {
  const css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");
  const script = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
  assert.match(css, /:focus-visible\s*\{/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /@media\s+print/);
  assert.match(css, /\.module-sidebar[\s\S]*display:\s*none\s*!important/);
  assert.match(script, /beforeprint/);
  assert.match(script, /details\.answer/);
});

test("deploy Render e Aiven possui configuração reproduzível e sem segredos", () => {
  const render = fs.readFileSync(path.resolve(root, "..", "render.yaml"), "utf8");
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const guide = fs.readFileSync(path.join(root, "DEPLOY-RENDER-AIVEN.md"), "utf8");
  const start = fs.readFileSync(path.join(root, "server/start.js"), "utf8");
  const migrate = fs.readFileSync(path.join(root, "server/migrate.js"), "utf8");
  const database = fs.readFileSync(path.join(root, "server/db.js"), "utf8");
  assert.match(render, /rootDir: Apostila-Roblox-Studio/);
  assert.match(render, /plan: free/);
  assert.match(render, /buildCommand: npm ci --omit=dev && npm test/);
  assert.doesNotMatch(render, /preDeployCommand/);
  assert.match(render, /DATABASE_POOL_MAX[\s\S]*value: 3/);
  assert.match(render, /healthCheckPath: \/api\/health/);
  assert.match(render, /DATABASE_URL[\s\S]*sync: false/);
  assert.equal(packageJson.scripts.migrate, "node server/migrate.js");
  assert.equal(packageJson.scripts.start, "node server/start.js");
  assert.match(start, /await migrate\(\)/);
  assert.match(start, /MAX_ATTEMPTS = 4/);
  assert.match(migrate, /pg_advisory_xact_lock/);
  assert.match(database, /DATABASE_POOL_MAX \|\| "3"/);
  assert.match(database, /connectionUrl\.searchParams\.delete\(parameter\)/);
  assert.match(database, /rejectUnauthorized: true/);
  assert.match(guide, /Criar o PostgreSQL gratuito na Aiven/);
  assert.match(guide, /Web Service gratuito já existente no Render/);
  assert.match(guide, /Criar do zero com o Blueprint gratuito/);
  assert.match(guide, /Verificação obrigatória após publicar/);
  assert.match(guide, /Pre-Deploy Command vazio/);
  assert.match(guide, /faixas de saída do Render/i);
  assert.match(guide, /cold start/i);
  assert.doesNotMatch(render + guide, /postgres:\/\/avnadmin:[A-Za-z0-9_-]{12,}@/i);
});
