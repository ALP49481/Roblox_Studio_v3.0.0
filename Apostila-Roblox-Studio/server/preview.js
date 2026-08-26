"use strict";

const path = require("node:path");
const express = require("express");

const app = express();
const root = path.resolve(__dirname, "..");
const port = Number.parseInt(process.env.PREVIEW_PORT || "8765", 10);

app.use("/assets", express.static(path.join(root, "assets")));
app.use("/modulos", express.static(path.join(root, "modulos")));
app.get(["/", "/index.html"], (_request, response) => response.sendFile(path.join(root, "index.html")));
app.get("/conta.html", (_request, response) => response.sendFile(path.join(root, "conta.html")));
app.use("/api", (_request, response) => response.status(503).json({ error: "Prévia offline: servidor de contas desativado." }));

app.listen(port, "127.0.0.1", () => {
  console.log(`Prévia offline disponível em http://127.0.0.1:${port}`);
});
