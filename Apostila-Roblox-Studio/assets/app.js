(() => {
  "use strict";

  const STORAGE_KEYS = {
    theme: "apostila-roblox-theme",
    progress: "apostila-roblox-progress-v1",
    cloudAccount: "apostila-roblox-cloud-account-v1"
  };
  const lessonGroups = {
    "0": ["modulo-00-capitulo-01", "modulo-00-capitulo-02"],
    "1": ["modulo-01-capitulo-01", "modulo-01-capitulo-02", "modulo-01-capitulo-03", "modulo-01-capitulo-04"],
    "2": [
      "modulo-02-capitulo-01",
      "modulo-02-capitulo-02",
      "modulo-02-capitulo-03",
      "modulo-02-capitulo-04",
      "modulo-02-capitulo-05",
      "modulo-02-capitulo-06",
      "modulo-02-capitulo-07",
      "modulo-02-capitulo-08",
      "modulo-02-capitulo-09"
    ],
    "3": [
      "modulo-03-capitulo-01",
      "modulo-03-capitulo-02",
      "modulo-03-capitulo-03",
      "modulo-03-capitulo-04"
    ],
    "4": [
      "modulo-04-capitulo-01",
      "modulo-04-capitulo-02",
      "modulo-04-capitulo-03",
      "modulo-04-capitulo-04",
      "modulo-04-capitulo-05",
      "modulo-04-capitulo-06"
    ],
    "5": [
      "modulo-05-capitulo-01",
      "modulo-05-capitulo-02",
      "modulo-05-capitulo-03",
      "modulo-05-capitulo-04",
      "modulo-05-capitulo-05"
    ],
    "6": [
      "modulo-06-capitulo-01",
      "modulo-06-capitulo-02",
      "modulo-06-capitulo-03",
      "modulo-06-capitulo-04"
    ],
    "7": [
      "modulo-07-capitulo-01",
      "modulo-07-capitulo-02",
      "modulo-07-capitulo-03",
      "modulo-07-capitulo-04",
      "modulo-07-capitulo-05"
    ],
    "8": [
      "modulo-08-capitulo-01",
      "modulo-08-capitulo-02",
      "modulo-08-capitulo-03",
      "modulo-08-capitulo-04",
      "modulo-08-capitulo-05"
    ],
    "9": [
      "modulo-09-capitulo-01",
      "modulo-09-capitulo-02",
      "modulo-09-capitulo-03",
      "modulo-09-capitulo-04",
      "modulo-09-capitulo-05",
      "modulo-09-capitulo-06"
    ],
    "10": [
      "modulo-10-capitulo-01",
      "modulo-10-capitulo-02",
      "modulo-10-capitulo-03"
    ],
    "11": [
      "modulo-11-capitulo-01",
      "modulo-11-capitulo-02",
      "modulo-11-capitulo-03",
      "modulo-11-capitulo-04"
    ]
  };
  const availableLessons = Object.values(lessonGroups).flat();
  const root = document.documentElement;
  let activeUser = null;
  let cloudRequestInProgress = false;

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn(`Não foi possível ler ${key}.`, error);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Não foi possível salvar ${key}.`, error);
      return false;
    }
  }

  function preferredTheme() {
    const saved = readStorage(STORAGE_KEYS.theme, null);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const dark = theme === "dark";
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
      button.textContent = dark ? "☀ Modo claro" : "☾ Modo escuro";
    });
  }

  function setTheme(theme, persist = true) {
    root.dataset.theme = theme;
    updateThemeButtons(theme);
    if (persist) writeStorage(STORAGE_KEYS.theme, theme);
  }
  setTheme(preferredTheme(), false);

  function currentProgress() {
    const stored = readStorage(STORAGE_KEYS.progress, {});
    return stored && typeof stored === "object" ? stored : {};
  }

  function lessonIdsFor(element) {
    const scope = element.dataset.progressScope;
    return scope && lessonGroups[scope] ? lessonGroups[scope] : availableLessons;
  }

  function renderProgress() {
    const progress = currentProgress();
    document.querySelectorAll("[data-progress-fill]").forEach((bar) => {
      const ids = lessonIdsFor(bar);
      const completed = ids.filter((id) => progress[id] === true).length;
      const percentage = ids.length ? Math.round((completed / ids.length) * 100) : 0;
      bar.style.width = `${percentage}%`;
      bar.parentElement?.setAttribute("aria-valuenow", String(percentage));
    });
    document.querySelectorAll("[data-progress-label]").forEach((label) => {
      const ids = lessonIdsFor(label);
      const completed = ids.filter((id) => progress[id] === true).length;
      const percentage = ids.length ? Math.round((completed / ids.length) * 100) : 0;
      label.textContent = `${completed} de ${ids.length} capítulos disponíveis concluídos · ${percentage}%`;
    });
    Object.entries(lessonGroups).forEach(([moduleNumber, ids]) => {
      const completed = ids.filter((id) => progress[id] === true).length;
      document.querySelectorAll(`[data-module-progress='${moduleNumber}']`).forEach((label) => {
        label.textContent = `${completed}/${ids.length} concluídos`;
      });
    });
    document.querySelectorAll("[data-progress-id]").forEach((checkbox) => {
      checkbox.checked = progress[checkbox.dataset.progressId] === true;
    });
  }

  function showToast(message) {
    document.querySelector(".toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 3000);
  }

  async function apiFetch(path, options = {}) {
    if (window.location.protocol === "file:") throw new Error("offline");
    const headers = { Accept: "application/json", ...(options.headers || {}) };
    if (options.body) headers["Content-Type"] = "application/json";
    const response = await fetch(path, { ...options, headers, credentials: "same-origin" });
    let payload = null;
    if (response.status !== 204) {
      try { payload = await response.json(); } catch (_error) { payload = null; }
    }
    if (!response.ok) {
      const error = new Error(payload?.error || "A operação não pôde ser concluída.");
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function updateAccountUi() {
    document.querySelectorAll("[data-account-label]").forEach((element) => {
      element.textContent = activeUser ? activeUser.username : "Conta";
    });
    const accountPage = document.querySelector("[data-account-page]");
    if (!accountPage) return;
    const serverAvailable = accountPage.dataset.serverAvailable === "true";
    const guestPanel = accountPage.querySelector("[data-account-guest]");
    const signedPanel = accountPage.querySelector("[data-account-signed]");
    const offlinePanel = accountPage.querySelector("[data-account-offline]");
    if (guestPanel) guestPanel.hidden = Boolean(activeUser) || !serverAvailable;
    if (signedPanel) signedPanel.hidden = !activeUser;
    if (offlinePanel) offlinePanel.hidden = serverAvailable;
    accountPage.querySelectorAll("[data-username]").forEach((element) => {
      element.textContent = activeUser?.username || "";
    });
  }

  async function syncCloudProgress() {
    if (!activeUser || cloudRequestInProgress) return;
    cloudRequestInProgress = true;
    try {
      const cloud = await apiFetch("/api/progress");
      const local = currentProgress();
      const remoteMap = Object.fromEntries((cloud.progress || []).map((item) => [item.itemId, item.completed]));
      const merged = { ...remoteMap };
      availableLessons.forEach((id) => {
        if (local[id] === true || remoteMap[id] === true) merged[id] = true;
        else if (local[id] === false || remoteMap[id] === false) merged[id] = false;
      });
      writeStorage(STORAGE_KEYS.progress, merged);
      renderProgress();
      const uploads = availableLessons
        .filter((id) => Boolean(remoteMap[id]) !== Boolean(merged[id]))
        .map((id) => apiFetch(`/api/progress/${encodeURIComponent(id)}`, {
          method: "PUT",
          body: JSON.stringify({ completed: Boolean(merged[id]) })
        }));
      await Promise.all(uploads);
    } finally {
      cloudRequestInProgress = false;
    }
  }

  async function discoverAccount(force = false) {
    const accountPage = document.querySelector("[data-account-page]");
    if (!force && !readStorage(STORAGE_KEYS.cloudAccount, false) && !accountPage) return;
    try {
      const payload = await apiFetch("/api/auth/me");
      activeUser = payload.user;
      writeStorage(STORAGE_KEYS.cloudAccount, true);
      if (accountPage) accountPage.dataset.serverAvailable = "true";
      updateAccountUi();
    } catch (error) {
      activeUser = null;
      if (error.status === 401) {
        writeStorage(STORAGE_KEYS.cloudAccount, false);
        if (accountPage) accountPage.dataset.serverAvailable = "true";
      } else if (accountPage) {
        accountPage.dataset.serverAvailable = "false";
      }
      updateAccountUi();
      return;
    }
    try {
      await syncCloudProgress();
    } catch (_error) {
      showToast("Conta conectada; a sincronização será repetida quando a conexão voltar.");
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") return navigator.clipboard.writeText(text);
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("O navegador recusou a cópia.");
  }

  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-register-form], [data-login-form]");
    if (!form) return;
    event.preventDefault();
    const submit = form.querySelector("button[type='submit']");
    const message = form.querySelector("[data-form-message]");
    const data = new FormData(form);
    if (message) message.textContent = "";
    submit.disabled = true;
    try {
      const endpoint = form.matches("[data-register-form]") ? "/api/auth/register" : "/api/auth/login";
      const payload = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ username: data.get("username"), password: data.get("password") })
      });
      activeUser = payload.user;
      writeStorage(STORAGE_KEYS.cloudAccount, true);
      form.reset();
      updateAccountUi();
      try {
        await syncCloudProgress();
        showToast("Conta conectada e progresso sincronizado.");
      } catch (_error) {
        showToast("Conta conectada; o progresso local foi preservado para sincronizar depois.");
      }
    } catch (error) {
      if (message) message.textContent = error.message;
    } finally {
      submit.disabled = false;
    }
  });

  document.addEventListener("click", async (event) => {
    const themeButton = event.target.closest("[data-theme-toggle]");
    if (themeButton) {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
      showToast(`Modo ${root.dataset.theme === "dark" ? "escuro" : "claro"} ativado.`);
      return;
    }
    const logoutButton = event.target.closest("[data-logout-button]");
    if (logoutButton) {
      logoutButton.disabled = true;
      try { await apiFetch("/api/auth/logout", { method: "POST" }); } catch (_error) { /* O progresso local permanece disponível. */ }
      activeUser = null;
      writeStorage(STORAGE_KEYS.cloudAccount, false);
      updateAccountUi();
      logoutButton.disabled = false;
      showToast("Você saiu da conta. O progresso local foi mantido.");
      return;
    }
    const navButton = event.target.closest("[data-nav-toggle]");
    if (navButton) {
      const sidebar = document.querySelector("[data-module-sidebar]");
      if (!sidebar) return;
      const collapsed = sidebar.dataset.collapsed === "true";
      sidebar.dataset.collapsed = String(!collapsed);
      navButton.setAttribute("aria-expanded", String(collapsed));
      navButton.textContent = collapsed ? "Ocultar capítulos" : "Mostrar capítulos";
      return;
    }
    const copyButton = event.target.closest("[data-copy-target]");
    if (copyButton) {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return showToast("Conteúdo para copiar não encontrado.");
      try {
        await copyText(target.textContent.trim());
        copyButton.textContent = "Copiado!";
        showToast("Conteúdo copiado para a área de transferência.");
        window.setTimeout(() => { copyButton.textContent = copyButton.dataset.copyLabel || "Copiar"; }, 1800);
      } catch (error) {
        console.warn("A cópia automática falhou.", error);
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        showToast("Selecione Copiar no menu do navegador.");
      }
    }
  });

  document.addEventListener("change", async (event) => {
    const checkbox = event.target.closest("[data-progress-id]");
    if (!checkbox) return;
    const progress = currentProgress();
    progress[checkbox.dataset.progressId] = checkbox.checked;
    if (!writeStorage(STORAGE_KEYS.progress, progress)) return;
    renderProgress();
    showToast(checkbox.checked ? "Capítulo marcado como concluído." : "Conclusão removida.");
    if (!activeUser) return;
    try {
      await apiFetch(`/api/progress/${encodeURIComponent(checkbox.dataset.progressId)}`, {
        method: "PUT",
        body: JSON.stringify({ completed: checkbox.checked })
      });
    } catch (_error) {
      showToast("Salvo neste dispositivo; a nuvem será atualizada quando voltar.");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!event.altKey || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
    const links = [...document.querySelectorAll(".chapter-nav a[href^='#']")];
    if (!links.length) return;
    const currentIndex = links.findIndex((link) => link.getAttribute("href") === window.location.hash);
    const nextIndex = event.key === "ArrowRight"
      ? (currentIndex < 0 ? 0 : currentIndex + 1)
      : currentIndex - 1;
    const target = links[nextIndex];
    if (target) { event.preventDefault(); target.click(); }
  });

  const printDetails = [];
  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("details.answer").forEach((details) => {
      printDetails.push({ details, wasOpen: details.open });
      details.open = true;
    });
  });
  window.addEventListener("afterprint", () => {
    printDetails.splice(0).forEach(({ details, wasOpen }) => { details.open = wasOpen; });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    const saved = readStorage(STORAGE_KEYS.theme, null);
    if (!saved) setTheme(event.matches ? "dark" : "light", false);
  });

  const chapterLinks = Array.from(document.querySelectorAll(".chapter-nav a[href^='#']"));
  const observedSections = chapterLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && observedSections.length) {
    const chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      chapterLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -70% 0px" });
    observedSections.forEach((section) => chapterObserver.observe(section));
  }

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.progress) renderProgress();
    if (event.key === STORAGE_KEYS.theme) setTheme(preferredTheme(), false);
  });
  renderProgress();
  updateAccountUi();
  discoverAccount();
})();
