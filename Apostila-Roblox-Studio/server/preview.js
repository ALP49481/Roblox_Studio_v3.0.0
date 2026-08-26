"use strict";

const path = require("node:path");
const express = require("express");

const root = path.resolve(__dirname, "..");
const port = Number.parseInt(process.env.PREVIEW_PORT || "8765", 10);

function createPreviewApp() {
  const app = express();
  app.use("/assets", express.static(path.join(root, "assets")));
  app.use("/modulos", express.static(path.join(root, "modulos")));
  app.use("/projetos", express.static(path.join(root, "projetos")));
  app.use("/reports", express.static(path.join(root, "reports")));
  app.get(["/", "/index.html"], (_request, response) => response.sendFile(path.join(root, "index.html")));
  app.get("/conta.html", (_request, response) => response.sendFile(path.join(root, "conta.html")));
  app.get("/avaliacoes.html", (_request, response) => response.sendFile(path.join(root, "avaliacoes.html")));
  app.get("/certificado.html", (_request, response) => response.sendFile(path.join(root, "certificado.html")));
  app.get("/atualizacoes.html", (_request, response) => response.sendFile(path.join(root, "atualizacoes.html")));
  app.get("/CONTENT-MANIFEST.json", (_request, response) => response.sendFile(path.join(root, "CONTENT-MANIFEST.json")));
  app.get("/CHANGELOG.md", (_request, response) => response.sendFile(path.join(root, "CHANGELOG.md")));
  app.use("/api", (_request, response) => response.status(503).json({ error: "Prévia offline: servidor de contas desativado." }));
  return app;
}

if (require.main === module) {
  createPreviewApp().listen(port, "127.0.0.1", () => {
    console.log(`Prévia offline disponível em http://127.0.0.1:${port}`);
  });
}

module.exports = { createPreviewApp };
