"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const htmlFiles = ["index.html", "conta.html", "avaliacoes.html", "certificado.html", "atualizacoes.html"]
  .map((file) => path.join(root, file))
  .concat(fs.readdirSync(path.join(root, "modulos")).filter((file) => file.endsWith(".html")).map((file) => path.join(root, "modulos", file)));
const allowedHosts = new Set(["create.roblox.com", "luau.org"]);
const urls = [...new Set(htmlFiles.flatMap((file) => [...fs.readFileSync(file, "utf8").matchAll(/href="(https?:\/\/[^"#]+)(?:#[^"]*)?"/g)].map((match) => match[1])))].filter((value) => allowedHosts.has(new URL(value).hostname));

async function inspect(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      headers: { "user-agent": "Apostila-Roblox-LinkChecker/1.0" }
    });
    const status = response.status;
    await response.body?.cancel();
    if (status === 404 || status === 410) return { url, status, result: "broken" };
    if (status >= 200 && status < 400) return { url, status, result: "reachable" };
    return { url, status, result: "inconclusive" };
  } catch (error) {
    return { url, status: null, result: "inconclusive", message: error.name };
  }
}

async function main() {
  const results = [];
  for (let index = 0; index < urls.length; index += 6) {
    results.push(...await Promise.all(urls.slice(index, index + 6).map(inspect)));
  }
  const report = {
    checkedAt: new Date().toISOString(),
    scope: "Links oficiais Roblox Creator Hub e Luau encontrados nos HTMLs",
    totals: {
      checked: results.length,
      reachable: results.filter((item) => item.result === "reachable").length,
      broken: results.filter((item) => item.result === "broken").length,
      inconclusive: results.filter((item) => item.result === "inconclusive").length
    },
    results
  };
  const reportDirectory = path.join(root, "reports");
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(path.join(reportDirectory, "link-report.json"), JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`Links: ${report.totals.reachable} acessíveis, ${report.totals.broken} quebrados, ${report.totals.inconclusive} inconclusivos.`);
  if (report.totals.broken > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error("A verificação de links não terminou.", error.message);
  process.exitCode = 1;
});
