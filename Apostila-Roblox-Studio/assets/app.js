(() => {
  "use strict";

  const STORAGE_KEYS = {
    theme: "apostila-roblox-theme",
    progress: "apostila-roblox-progress-v1",
    cloudAccount: "apostila-roblox-cloud-account-v1",
    favorites: "apostila-roblox-favorites-v1",
    recent: "apostila-roblox-recent-v1",
    lastChapter: "apostila-roblox-last-chapter-v1"
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
  let searchIndexPromise = null;

  const appScript = document.querySelector('script[src*="assets/app.js"]');
  const siteRootUrl = appScript ? new URL("../", appScript.src) : new URL("./", window.location.href);

  function siteUrl(relativePath) {
    return new URL(relativePath, siteRootUrl).href;
  }

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

  function normalizeSearch(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  }

  function currentFavorites() {
    const stored = readStorage(STORAGE_KEYS.favorites, []);
    return Array.isArray(stored) ? stored.filter((id) => availableLessons.includes(id)) : [];
  }

  function currentRecent() {
    const stored = readStorage(STORAGE_KEYS.recent, []);
    return Array.isArray(stored)
      ? stored.filter((item) => item && availableLessons.includes(item.id)).slice(0, 8)
      : [];
  }

  function updateFavoriteButtons() {
    const favorites = new Set(currentFavorites());
    document.querySelectorAll("[data-favorite-id]").forEach((button) => {
      const favorite = favorites.has(button.dataset.favoriteId);
      button.setAttribute("aria-pressed", String(favorite));
      button.setAttribute("aria-label", favorite ? "Remover capítulo dos favoritos" : "Adicionar capítulo aos favoritos");
      button.textContent = favorite ? "★ Favorito" : "☆ Favoritar";
    });
  }

  function toggleFavorite(id) {
    const favorites = new Set(currentFavorites());
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    writeStorage(STORAGE_KEYS.favorites, [...favorites]);
    updateFavoriteButtons();
    renderStudyLibrary();
    showToast(favorites.has(id) ? "Capítulo adicionado aos favoritos." : "Capítulo removido dos favoritos.");
  }

  function chapterMetadata(chapter) {
    const checkbox = chapter?.querySelector("[data-progress-id]");
    const title = chapter?.querySelector("h2")?.textContent.trim();
    const kicker = chapter?.querySelector(".chapter-kicker")?.textContent.trim();
    if (!checkbox || !title) return null;
    return {
      id: checkbox.dataset.progressId,
      title,
      chapter: kicker || "Capítulo",
      url: `${window.location.pathname.split("/").pop()}#${chapter.id}`,
      visitedAt: new Date().toISOString()
    };
  }

  function recordVisit(chapter) {
    const metadata = chapterMetadata(chapter);
    if (!metadata) return;
    const recent = currentRecent().filter((item) => item.id !== metadata.id);
    recent.unshift(metadata);
    writeStorage(STORAGE_KEYS.recent, recent.slice(0, 8));
    writeStorage(STORAGE_KEYS.lastChapter, metadata);
    updateContinueLinks();
    renderStudyLibrary();
  }

  function resolveStoredChapterUrl(item) {
    if (!item?.url) return siteUrl("index.html#modulos");
    const moduleMatch = /^modulo-(\d{2})-/.exec(item.id || "");
    if (!moduleMatch) return siteUrl("index.html#modulos");
    const fragment = item.url.includes("#") ? item.url.slice(item.url.indexOf("#")) : "";
    return siteUrl(`modulos/modulo-${moduleMatch[1]}.html${fragment}`);
  }

  function updateContinueLinks() {
    const last = readStorage(STORAGE_KEYS.lastChapter, null);
    document.querySelectorAll("[data-continue-learning]").forEach((link) => {
      if (!last?.id) {
        link.href = siteUrl("modulos/modulo-00.html#capitulo-01");
        link.textContent = "Começar pelo Módulo 0";
        return;
      }
      link.href = resolveStoredChapterUrl(last);
      link.textContent = `Continuar: ${last.chapter}`;
      link.title = last.title;
    });
  }

  function addFavoriteControls() {
    document.querySelectorAll("article.chapter").forEach((chapter) => {
      const header = chapter.querySelector(".chapter-header");
      const checkbox = header?.querySelector("[data-progress-id]");
      if (!header || !checkbox || header.querySelector("[data-favorite-id]")) return;
      const controls = document.createElement("div");
      controls.className = "chapter-actions";
      const favorite = document.createElement("button");
      favorite.type = "button";
      favorite.className = "button compact";
      favorite.dataset.favoriteId = checkbox.dataset.progressId;
      const completion = header.querySelector(".completion-control");
      if (completion) controls.append(favorite, completion);
      else controls.append(favorite);
      header.append(controls);
    });
    updateFavoriteButtons();
  }

  function loadSearchIndex() {
    if (Array.isArray(window.APOSTILA_SEARCH_INDEX)) return Promise.resolve(window.APOSTILA_SEARCH_INDEX);
    if (searchIndexPromise) return searchIndexPromise;
    searchIndexPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = siteUrl("assets/search-index.js");
      script.onload = () => resolve(window.APOSTILA_SEARCH_INDEX || []);
      script.onerror = () => reject(new Error("Não foi possível carregar o índice de busca."));
      document.head.append(script);
    });
    return searchIndexPromise;
  }

  function searchEntryMatchesFilter(entry, filter) {
    if (filter === "api") return entry.apis.length > 0;
    if (filter === "diagnostic") return entry.hasDiagnostics;
    if (filter === "exercise") return entry.hasExercises;
    if (filter === "easy") return entry.difficulties.some((value) => normalizeSearch(value).includes("facil"));
    if (filter === "intermediate") return entry.difficulties.some((value) => normalizeSearch(value).includes("intermedi"));
    if (filter === "challenging") return entry.difficulties.some((value) => normalizeSearch(value).includes("desafi"));
    return true;
  }

  function searchEntries(index, query, filter) {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return index
      .filter((entry) => searchEntryMatchesFilter(entry, filter))
      .map((entry) => {
        const title = normalizeSearch(`${entry.chapter} ${entry.title} ${entry.apis.join(" ")}`);
        const body = normalizeSearch(`${entry.summary} ${entry.text}`);
        if (!terms.every((term) => title.includes(term) || body.includes(term))) return null;
        const score = terms.reduce((total, term) => total + (title.includes(term) ? 5 : 1), 0);
        return { entry, score };
      })
      .filter(Boolean)
      .sort((left, right) => right.score - left.score || left.entry.module - right.entry.module)
      .slice(0, 30)
      .map(({ entry }) => entry);
  }

  function createResultLink(entry) {
    const link = document.createElement("a");
    link.className = "search-result";
    link.href = siteUrl(entry.url);
    const heading = document.createElement("strong");
    heading.textContent = `${entry.chapter} — ${entry.title}`;
    const meta = document.createElement("span");
    meta.className = "search-result-meta";
    meta.textContent = `Módulo ${entry.module} · ${entry.moduleTitle}`;
    const summary = document.createElement("span");
    summary.textContent = entry.summary || "Abra o capítulo para estudar este conteúdo.";
    link.append(heading, meta, summary);
    if (entry.apis.length) {
      const chips = document.createElement("span");
      chips.className = "search-result-chips";
      entry.apis.slice(0, 4).forEach((api) => {
        const chip = document.createElement("code");
        chip.textContent = api;
        chips.append(chip);
      });
      link.append(chips);
    }
    return link;
  }

  async function renderSearchResults() {
    const dialog = document.querySelector("[data-study-dialog]");
    const results = dialog?.querySelector("[data-search-results]");
    const input = dialog?.querySelector("[data-search-input]");
    const filter = dialog?.querySelector("[data-search-filter]");
    if (!results || !input || !filter) return;
    results.replaceChildren();
    results.setAttribute("aria-busy", "true");
    try {
      const index = await loadSearchIndex();
      const matches = searchEntries(index, input.value, filter.value);
      const status = document.createElement("p");
      status.className = "search-status";
      status.setAttribute("role", "status");
      status.textContent = `${matches.length} resultado${matches.length === 1 ? "" : "s"}.`;
      results.append(status);
      matches.forEach((entry) => results.append(createResultLink(entry)));
      if (!matches.length) {
        const hint = document.createElement("p");
        hint.textContent = "Tente um termo mais curto, o nome da API ou outro filtro.";
        results.append(hint);
      }
    } catch (error) {
      results.textContent = error.message;
    } finally {
      results.setAttribute("aria-busy", "false");
    }
  }

  function renderStoredLinks(container, items, emptyMessage) {
    if (!container) return;
    container.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("p");
      empty.textContent = emptyMessage;
      container.append(empty);
      return;
    }
    items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "stored-chapter-link";
      link.href = resolveStoredChapterUrl(item);
      link.textContent = `${item.chapter} — ${item.title}`;
      container.append(link);
    });
  }

  async function renderStudyLibrary() {
    const dialog = document.querySelector("[data-study-dialog]");
    if (!dialog) return;
    renderStoredLinks(dialog.querySelector("[data-recent-list]"), currentRecent(), "Os capítulos visitados aparecerão aqui.");
    const favoriteIds = currentFavorites();
    try {
      const index = await loadSearchIndex();
      const items = favoriteIds.map((id) => {
        const entry = index.find((candidate) => candidate.id === id);
        return entry ? { id, chapter: entry.chapter, title: entry.title, url: entry.url } : null;
      }).filter(Boolean);
      renderStoredLinks(dialog.querySelector("[data-favorite-list]"), items, "Use “Favoritar” em um capítulo para guardá-lo aqui.");
    } catch (_error) {
      renderStoredLinks(dialog.querySelector("[data-favorite-list]"), [], "Não foi possível carregar os favoritos agora.");
    }
  }

  function createStudyTools() {
    const headerActions = document.querySelector(".header-actions");
    if (!headerActions || document.querySelector("[data-open-study-tools]")) return;
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "button";
    openButton.dataset.openStudyTools = "";
    openButton.textContent = "Buscar";
    openButton.setAttribute("aria-keyshortcuts", "Control+K /");
    headerActions.insertBefore(openButton, headerActions.lastElementChild);

    const dialog = document.createElement("dialog");
    dialog.className = "study-dialog";
    dialog.dataset.studyDialog = "";
    dialog.innerHTML = `
      <div class="dialog-header"><div><span class="eyebrow">Central de estudo</span><h2>Encontre e retome conteúdos</h2></div><button class="icon-button" type="button" data-close-study-tools aria-label="Fechar busca">Fechar</button></div>
      <div class="search-controls"><label><span>Buscar capítulos, APIs e conceitos</span><input type="search" data-search-input placeholder="Ex.: UpdateAsync, autoridade do servidor, erro" autocomplete="off"></label><label><span>Filtrar</span><select data-search-filter><option value="all">Tudo</option><option value="api">APIs</option><option value="diagnostic">Erros e diagnóstico</option><option value="exercise">Exercícios</option><option value="easy">Exercícios fáceis</option><option value="intermediate">Exercícios intermediários</option><option value="challenging">Exercícios desafiadores</option></select></label></div>
      <div class="study-shortcuts"><a class="button primary" data-continue-learning href="${siteUrl("modulos/modulo-00.html#capitulo-01")}">Começar pelo Módulo 0</a><a class="button" href="${siteUrl("avaliacoes.html")}">Avaliações</a><a class="button" href="${siteUrl("projetos/index.html")}">Kits práticos</a><a class="button" href="${siteUrl("atualizacoes.html")}">Atualizações</a></div>
      <div class="study-library"><section><h3>Favoritos</h3><div class="stored-links" data-favorite-list></div></section><section><h3>Visitados recentemente</h3><div class="stored-links" data-recent-list></div></section></div>
      <section aria-labelledby="resultados-busca"><h3 id="resultados-busca">Resultados</h3><div class="search-results" data-search-results></div></section>`;
    document.body.append(dialog);
    updateContinueLinks();
    renderStudyLibrary();
  }

  function openStudyTools() {
    const dialog = document.querySelector("[data-study-dialog]");
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    const input = dialog.querySelector("[data-search-input]");
    input?.focus();
    renderSearchResults();
  }

  function closeStudyTools() {
    const dialog = document.querySelector("[data-study-dialog]");
    if (!dialog?.hasAttribute("open")) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.querySelector("[data-open-study-tools]")?.focus();
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
    const openStudyButton = event.target.closest("[data-open-study-tools]");
    if (openStudyButton) {
      openStudyTools();
      return;
    }
    const closeStudyButton = event.target.closest("[data-close-study-tools]");
    if (closeStudyButton) {
      closeStudyTools();
      return;
    }
    const favoriteButton = event.target.closest("[data-favorite-id]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.favoriteId);
      return;
    }
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

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search-input], [data-search-filter]")) renderSearchResults();
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-search-filter]")) renderSearchResults();
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
    if (event.key === "Escape" && document.querySelector("[data-study-dialog][open]")) {
      event.preventDefault();
      closeStudyTools();
      return;
    }
    const typing = event.target.matches("input, textarea, select, [contenteditable='true']");
    if (!typing && ((event.ctrlKey && event.key.toLocaleLowerCase() === "k") || (!event.ctrlKey && !event.altKey && event.key === "/"))) {
      event.preventDefault();
      openStudyTools();
      return;
    }
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
      recordVisit(visible.target);
    }, { rootMargin: "-18% 0px -70% 0px" });
    observedSections.forEach((section) => chapterObserver.observe(section));
  }

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEYS.progress) renderProgress();
    if (event.key === STORAGE_KEYS.theme) setTheme(preferredTheme(), false);
    if (event.key === STORAGE_KEYS.favorites) updateFavoriteButtons();
    if (event.key === STORAGE_KEYS.recent || event.key === STORAGE_KEYS.lastChapter) {
      updateContinueLinks();
      renderStudyLibrary();
    }
  });
  createStudyTools();
  addFavoriteControls();
  updateContinueLinks();
  const initialHashId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "";
  const initialChapter = initialHashId ? document.getElementById(initialHashId) : document.querySelector("article.chapter");
  if (initialChapter?.matches("article.chapter")) recordVisit(initialChapter);
  renderProgress();
  updateAccountUi();
  discoverAccount();
})();
