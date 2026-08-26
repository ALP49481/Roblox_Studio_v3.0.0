(() => {
  "use strict";
  const manifest = window.APOSTILA_CONTENT_MANIFEST;
  if (!manifest) return;
  document.querySelectorAll("[data-content-version]").forEach((element) => { element.textContent = manifest.version; });
  document.querySelectorAll("[data-release-date]").forEach((element) => { element.textContent = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${manifest.releasedAt}T12:00:00Z`)); });

  const modules = document.querySelector("[data-module-revisions]");
  manifest.modules.forEach((module) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>Módulo ${module.number}</td><td>${module.reviewedAt.split("-").reverse().join("/")}</td><td>${module.status}</td><td></td>`;
    const apiCell = row.lastElementChild;
    module.apis.forEach((api) => {
      const code = document.createElement("code");
      code.textContent = api;
      apiCell.append(code, document.createTextNode(" "));
    });
    modules.append(row);
  });

  const changes = document.querySelector("[data-api-changes]");
  manifest.apiChanges.forEach((change) => {
    const row = document.createElement("tr");
    [change.api, change.status, change.replacement, change.modules.map((number) => `M${number}`).join(", ")].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    changes.append(row);
  });

  const retests = document.querySelector("[data-retest-list]");
  manifest.examplesToRetest.forEach((example) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong></strong> — ${example.reason} <span class="status-pill">prioridade ${example.priority}</span>`;
    item.querySelector("strong").textContent = example.id;
    retests.append(item);
  });

  const broken = document.querySelector("[data-broken-links]");
  broken.textContent = manifest.brokenLinks.length
    ? `${manifest.brokenLinks.length} link(s) registrado(s) para correção.`
    : "Nenhum link quebrado registrado no manifesto desta versão.";

  const process = document.querySelector("[data-deprecation-process]");
  manifest.deprecationProcess.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    process.append(item);
  });
})();
