"use strict";

const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "CONTENT-MANIFEST.json"), "utf8"));
fs.writeFileSync(path.join(root, "assets", "content-manifest.js"), `/* Gerado por tools/build-content-manifest.js. */\nwindow.APOSTILA_CONTENT_MANIFEST = ${JSON.stringify(manifest)};\n`, "utf8");
console.log(`Manifesto ${manifest.version} preparado para uso offline.`);
