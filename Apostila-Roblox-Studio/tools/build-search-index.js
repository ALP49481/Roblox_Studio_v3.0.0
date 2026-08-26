"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const modulesDirectory = path.join(root, "modulos");

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)));
}

function plainText(value) {
  return decodeHtml(value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extract(pattern, value, fallback = "") {
  return pattern.exec(value)?.[1] || fallback;
}

function collectApis(fragment) {
  const values = [...fragment.matchAll(/<code>([\s\S]*?)<\/code>/gi)]
    .map((match) => plainText(match[1]))
    .filter((value) => /^[A-Za-z][A-Za-z0-9_.:()!-]{2,80}$/.test(value))
    .filter((value) => /(?:Async|Service|Event|Function|CFrame|Vector3|Humanoid|Script|Instance|Remote|DataStore|Teleport|Http)/.test(value));
  return [...new Set(values)].slice(0, 24);
}

const entries = fs.readdirSync(modulesDirectory)
  .filter((file) => /^modulo-\d{2}\.html$/.test(file))
  .sort()
  .flatMap((file) => {
    const html = fs.readFileSync(path.join(modulesDirectory, file), "utf8");
    const moduleNumber = extract(/<h2>Módulo\s+(\d+)<\/h2>/i, html, extract(/Módulo\s+(\d+)/i, html));
    const moduleTitle = plainText(extract(/<h2>Módulo\s+\d+<\/h2>\s*<p>([\s\S]*?)<\/p>/i, html, extract(/<title>([\s\S]*?)<\/title>/i, html)));
    return [...html.matchAll(/<article class="chapter" id="([^"]+)"[\s\S]*?<\/article>/gi)].map((match) => {
      const fragment = match[0];
      const progressId = extract(/data-progress-id="([^"]+)"/i, fragment);
      const chapterLabel = plainText(extract(/<p class="chapter-kicker">([\s\S]*?)<\/p>/i, fragment));
      const title = plainText(extract(/<h2[^>]*>([\s\S]*?)<\/h2>/i, fragment));
      const intro = plainText(extract(/<h2[^>]*>[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/i, fragment));
      const text = plainText(fragment);
      const difficulties = [...new Set([...fragment.matchAll(/class="difficulty"[^>]*>([\s\S]*?)<\//gi)].map((item) => plainText(item[1])))];
      return {
        id: progressId,
        module: Number(moduleNumber),
        moduleTitle,
        chapter: chapterLabel.replace(/^Capítulo\s*/i, ""),
        title,
        summary: intro,
        url: `modulos/${file}#${match[1]}`,
        apis: collectApis(fragment),
        difficulties,
        hasDiagnostics: /diagn[oó]stic|erro comum|investiga|resultado diferente/i.test(text),
        hasExercises: /exerc[ií]cio/i.test(text),
        text
      };
    });
  });

const output = `/* Gerado por tools/build-search-index.js. Não edite manualmente. */\nwindow.APOSTILA_SEARCH_INDEX = ${JSON.stringify(entries)};\n`;
fs.writeFileSync(path.join(root, "assets", "search-index.js"), output, "utf8");
console.log(`Índice de busca gerado com ${entries.length} capítulos.`);
