"use strict";

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./test/e2e",
  timeout: 30_000,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { outputFolder: "reports/playwright", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:8765",
    browserName: "chromium",
    colorScheme: "light",
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 }
  }
});
