(() => {
  "use strict";

  const data = window.APOSTILA_ASSESSMENTS;
  if (!data) return;

  const ATTEMPTS_KEY = "apostila-roblox-assessment-attempts-v1";
  const PROGRESS_KEY = "apostila-roblox-progress-v1";
  const totalChapters = 57;
  let activeAssessment = data.modules[0];

  function read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function attempts() {
    const stored = read(ATTEMPTS_KEY, []);
    return Array.isArray(stored) ? stored : [];
  }

  function bestAttempt(id) {
    return attempts().filter((attempt) => attempt.assessmentId === id)
      .sort((left, right) => right.percentage - left.percentage || right.createdAt.localeCompare(left.createdAt))[0] || null;
  }

  function passed(id) {
    return (bestAttempt(id)?.percentage || 0) >= data.passingScore;
  }

  function allModulesPassed() {
    return data.modules.every((module) => passed(module.id));
  }

  function completedChapters() {
    return Object.values(read(PROGRESS_KEY, {})).filter((value) => value === true).length;
  }

  function certificateReady() {
    return allModulesPassed() && passed(data.finalBoard.id) && completedChapters() >= totalChapters;
  }

  function assessmentFromHash() {
    const id = window.location.hash.slice(1);
    if (id === data.finalBoard.id) return data.finalBoard;
    return data.modules.find((module) => module.id === id) || data.modules[0];
  }

  function statusText(id) {
    const best = bestAttempt(id);
    if (!best) return "Ainda não realizada";
    return `${best.percentage}% · ${best.percentage >= data.passingScore ? "domínio confirmado" : "revisão necessária"}`;
  }

  function renderNavigation() {
    const navigation = document.querySelector("[data-assessment-nav]");
    if (!navigation) return;
    navigation.replaceChildren();
    data.modules.forEach((module) => {
      const link = document.createElement("a");
      link.className = "assessment-nav-item";
      link.href = `#${module.id}`;
      if (activeAssessment.id === module.id) link.setAttribute("aria-current", "page");
      const title = document.createElement("strong");
      title.textContent = `Módulo ${module.number}`;
      const status = document.createElement("span");
      status.textContent = statusText(module.id);
      link.append(title, status);
      navigation.append(link);
    });
    const finalLink = document.createElement("a");
    finalLink.className = "assessment-nav-item final";
    finalLink.href = allModulesPassed() ? `#${data.finalBoard.id}` : "#painel-dominio";
    finalLink.setAttribute("aria-disabled", String(!allModulesPassed()));
    finalLink.innerHTML = `<strong>Banca final</strong><span>${allModulesPassed() ? statusText(data.finalBoard.id) : "Disponível após os 12 módulos"}</span>`;
    navigation.append(finalLink);
  }

  function renderDashboard() {
    const dashboard = document.querySelector("[data-domain-dashboard]");
    if (!dashboard) return;
    const passedModules = data.modules.filter((module) => passed(module.id)).length;
    const chapters = completedChapters();
    dashboard.innerHTML = `
      <div class="metric-card"><strong>${passedModules}/12</strong><span>módulos aprovados</span></div>
      <div class="metric-card"><strong>${chapters}/${totalChapters}</strong><span>capítulos concluídos</span></div>
      <div class="metric-card"><strong>${bestAttempt(data.finalBoard.id)?.percentage || 0}%</strong><span>melhor nota da banca</span></div>`;
    const certificate = document.querySelector("[data-certificate-link]");
    if (certificate) {
      certificate.hidden = !certificateReady();
      certificate.setAttribute("aria-disabled", String(!certificateReady()));
    }
    const requirement = document.querySelector("[data-certificate-requirement]");
    if (requirement) {
      requirement.textContent = certificateReady()
        ? "Requisitos cumpridos. O certificado simbólico está disponível."
        : "Conclua os 57 capítulos, obtenha pelo menos 70% em cada módulo e aprove a banca final.";
    }
  }

  function renderAssessment() {
    const host = document.querySelector("[data-assessment-host]");
    if (!host) return;
    const isFinal = activeAssessment.id === data.finalBoard.id;
    if (isFinal && !allModulesPassed()) {
      host.innerHTML = `<div class="callout warning"><strong>Banca ainda bloqueada</strong><p>Confirme domínio nos 12 módulos antes de iniciar a banca final.</p></div>`;
      return;
    }

    const heading = document.createElement("div");
    heading.className = "section-heading";
    heading.innerHTML = `<span class="eyebrow">${isFinal ? "Banca final" : `Módulo ${activeAssessment.number}`}</span><h2>${activeAssessment.title}</h2><p>Responda antes de consultar a revisão. Para aprovação, obtenha pelo menos ${data.passingScore}% e confirme as evidências práticas.</p>`;
    const form = document.createElement("form");
    form.className = "assessment-form";
    form.dataset.assessmentForm = activeAssessment.id;

    activeAssessment.questions.forEach((question, questionIndex) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "quiz-question";
      const legend = document.createElement("legend");
      legend.textContent = `${questionIndex + 1}. ${question.prompt}`;
      fieldset.append(legend);
      question.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = question.id;
        input.value = String(optionIndex);
        input.required = true;
        label.append(input, document.createTextNode(option));
        fieldset.append(label);
      });
      form.append(fieldset);
    });

    const practical = document.createElement("fieldset");
    practical.className = "practical-evidence";
    practical.innerHTML = "<legend>Evidências realizadas no Roblox Studio</legend><p>Marque somente o que você realmente demonstrou. Estes itens não são verificados pelo navegador.</p>";
    activeAssessment.practical.forEach((criterion, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `practical-${index}`;
      input.required = true;
      label.append(input, document.createTextNode(criterion));
      practical.append(label);
    });
    form.append(practical);
    const message = document.createElement("p");
    message.className = "form-message";
    message.dataset.assessmentMessage = "";
    message.setAttribute("role", "alert");
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "button primary";
    submit.textContent = "Corrigir avaliação";
    form.append(message, submit);

    const result = document.createElement("section");
    result.className = "assessment-result";
    result.dataset.assessmentResult = "";
    result.setAttribute("aria-live", "polite");
    host.replaceChildren(heading, form, result);
  }

  function recordAttempt(assessment, answers, score) {
    const existing = attempts();
    const attempt = {
      id: `${assessment.id}-${Date.now()}`,
      assessmentId: assessment.id,
      score,
      maxScore: assessment.questions.length,
      percentage: Math.round((score / assessment.questions.length) * 100),
      answers,
      practicalConfirmed: true,
      createdAt: new Date().toISOString()
    };
    existing.unshift(attempt);
    write(ATTEMPTS_KEY, existing.slice(0, 120));
    return attempt;
  }

  function renderResult(attempt, answers) {
    const result = document.querySelector("[data-assessment-result]");
    if (!result) return;
    result.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = `${attempt.percentage}% — ${attempt.percentage >= data.passingScore ? "domínio confirmado" : "revise e tente novamente"}`;
    const summary = document.createElement("p");
    summary.textContent = `${attempt.score} de ${attempt.maxScore} decisões corretas. Esta foi a tentativa ${attempts().filter((item) => item.assessmentId === activeAssessment.id).length}.`;
    result.append(heading, summary);

    activeAssessment.questions.forEach((question) => {
      const selected = answers[question.id];
      const item = document.createElement("article");
      item.className = selected === question.correct ? "review-item correct" : "review-item incorrect";
      const title = document.createElement("h4");
      title.textContent = `${selected === question.correct ? "Correto" : "Revisar"}: ${question.prompt}`;
      const explanation = document.createElement("p");
      explanation.textContent = question.explanation;
      const link = document.createElement("a");
      link.className = "button compact";
      link.href = question.reviewUrl;
      link.textContent = "Revisar assunto";
      item.append(title, explanation, link);
      result.append(item);
    });
    result.focus?.();
  }

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-assessment-form]");
    if (!form) return;
    event.preventDefault();
    const formData = new FormData(form);
    const answers = {};
    let score = 0;
    activeAssessment.questions.forEach((question) => {
      const selected = Number(formData.get(question.id));
      answers[question.id] = selected;
      if (selected === question.correct) score += 1;
    });
    const attempt = recordAttempt(activeAssessment, answers, score);
    renderResult(attempt, answers);
    renderNavigation();
    renderDashboard();
  });

  window.addEventListener("hashchange", () => {
    activeAssessment = assessmentFromHash();
    renderNavigation();
    renderAssessment();
  });

  activeAssessment = assessmentFromHash();
  renderNavigation();
  renderDashboard();
  renderAssessment();
})();
