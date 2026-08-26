(() => {
  "use strict";
  const data = window.APOSTILA_ASSESSMENTS;
  if (!data) return;
  const attempts = JSON.parse(localStorage.getItem("apostila-roblox-assessment-attempts-v1") || "[]");
  const progress = JSON.parse(localStorage.getItem("apostila-roblox-progress-v1") || "{}");
  const best = (id) => attempts.filter((item) => item.assessmentId === id).sort((a, b) => b.percentage - a.percentage)[0];
  const ready = data.modules.every((module) => (best(module.id)?.percentage || 0) >= data.passingScore)
    && (best(data.finalBoard.id)?.percentage || 0) >= data.passingScore
    && Object.values(progress).filter(Boolean).length >= 57;
  const locked = document.querySelector("[data-certificate-locked]");
  const content = document.querySelector("[data-certificate-content]");
  if (!ready) {
    locked.hidden = false;
    content.hidden = true;
    return;
  }
  locked.hidden = true;
  content.hidden = false;
  const nameInput = document.querySelector("[data-certificate-name]");
  const nameOutput = document.querySelector("[data-certificate-name-output]");
  const dateOutput = document.querySelector("[data-certificate-date]");
  nameInput.addEventListener("input", () => {
    nameOutput.textContent = nameInput.value.trim() || "Nome do estudante";
  });
  dateOutput.textContent = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date());
  document.querySelector("[data-print-certificate]")?.addEventListener("click", () => window.print());
})();
