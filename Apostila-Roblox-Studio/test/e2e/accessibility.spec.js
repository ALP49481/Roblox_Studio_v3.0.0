"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const { createPreviewApp } = require("../../server/preview");

const screenshots = path.resolve(__dirname, "../../reports/screenshots");
const pages = [
  ["início", "/"],
  ["módulo", "/modulos/modulo-05.html"],
  ["kits", "/projetos/"],
  ["avaliações", "/avaliacoes.html"],
  ["atualizações", "/atualizacoes.html"]
];

let previewServer;

test.beforeAll(async () => {
  fs.mkdirSync(screenshots, { recursive: true });
  previewServer = await new Promise((resolve, reject) => {
    const server = createPreviewApp().listen(8765, "127.0.0.1", () => resolve(server));
    server.on("error", reject);
  });
});

test.afterAll(async () => {
  if (!previewServer) return;
  await new Promise((resolve, reject) => previewServer.close((error) => error ? reject(error) : resolve()));
});

for (const [name, url] of pages) {
  test(`${name}: sem violações sérias ou críticas detectadas pelo axe`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}

test("busca funciona somente com teclado e devolve o foco", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+K");
  const input = page.getByPlaceholder("Ex.: UpdateAsync, autoridade do servidor, erro");
  await expect(input).toBeFocused();
  await input.fill("UpdateAsync");
  await expect(page.locator("[data-search-results]")).toContainText("DataStore básico");
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-study-dialog]")).not.toHaveAttribute("open", "");
  await expect(page.getByRole("button", { name: "Buscar" })).toBeFocused();
});

test("progresso e favorito persistem após recarregar", async ({ page }) => {
  await page.goto("/modulos/modulo-02.html#capitulo-08");
  const chapter = page.locator("#capitulo-08");
  await chapter.locator("[data-progress-id]").check();
  await chapter.locator("[data-favorite-id]").click();
  await page.reload();
  await expect(chapter.locator("[data-progress-id]")).toBeChecked();
  await expect(chapter.locator("[data-favorite-id]")).toHaveAttribute("aria-pressed", "true");
});

test("cópia de código oferece confirmação visível", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/modulos/modulo-02.html#capitulo-01");
  const copy = page.locator("[data-copy-target]").first();
  await copy.click();
  await expect(copy).toHaveText("Copiado!");
});

test("reflow, textos extensos e screenshots em larguras-alvo", async ({ page }) => {
  const scenarios = [
    { width: 375, height: 812, url: "/", name: "automated-home-375.png" },
    { width: 768, height: 1024, url: "/projetos/", name: "automated-projects-768.png" },
    { width: 1440, height: 900, url: "/avaliacoes.html", name: "automated-assessments-1440.png" },
    { width: 640, height: 900, url: "/modulos/modulo-07.html", name: "reflow-equivalent-200.png" },
    { width: 320, height: 900, url: "/modulos/modulo-07.html", name: "reflow-equivalent-400.png" }
  ];
  for (const scenario of scenarios) {
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.goto(scenario.url);
    const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
    await page.screenshot({ path: path.join(screenshots, scenario.name), fullPage: false });
  }
});
