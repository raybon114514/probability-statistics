(function () {
  const STORAGE_MASTERED = "prob_stats_mastered_v1";
  const STORAGE_THEME = "prob_stats_theme_v1";

  const PLANNED_CHAPTERS = {
    "ch1-3": {
      id: "ch1-3",
      badge: "Ch 1–3",
      title: "Chapter 1–3：機率導論、條件機率與隨機變數基礎",
      desc: "此區預留給期初基礎章節（樣本空間、貝氏定理、離散／連續隨機變數與聯合機率分配），待後續補充上線。",
      topics: ["樣本空間與排列組合計數", "條件機率、獨立事件與 Bayes' Rule", "隨機變數 PMF / PDF / CDF 與邊際分配"]
    },
    ch4: {
      id: "ch4",
      badge: "Ch 4",
      title: "Chapter 4：Mathematical Expectation（數學期望值）",
      desc: "此區預留給第 4 章（期望值、變異數、共變異數與相關係數、線性組合與 Chebyshev 不等式），目前網站先聚焦第 5、6 章。",
      topics: ["4.1 期望值與 E[g(X,Y)]", "4.2 變異數、共變異數與相關係數", "4.3 線性組合期望值與變異數", "4.4 Chebyshev's Theorem 與 Markov 證明"]
    },
    "ch7-8": {
      id: "ch7-8",
      badge: "Ch 7–8",
      title: "Chapter 7–8：變數函數分配與抽樣分配",
      desc: "此區預留給第 7、8 章（動差母函數 MGF 與樣本平均數抽樣分配，對應期末 PDF 第 22–24 與 66–68 頁）。",
      topics: ["Moment-Generating Functions (e.g. 7.6, 7.7, ex 7.17–7.19)", "Central Limit Theorem 與樣本平均數分配 (e.g. 8.4)"]
    }
  };

  let mastered = new Set();
  try {
    const raw = localStorage.getItem(STORAGE_MASTERED);
    if (raw) JSON.parse(raw).forEach((id) => mastered.add(id));
  } catch (_) {}

  function saveMastered() {
    try {
      localStorage.setItem(STORAGE_MASTERED, JSON.stringify(Array.from(mastered)));
    } catch (_) {}
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (_) {}
  }

  function initTheme() {
    let saved = "light";
    try {
      saved = localStorage.getItem(STORAGE_THEME) || "light";
    } catch (_) {}
    applyTheme(saved);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    }
  }

  function renderMath(target) {
    if (!target) return;
    const opts = {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    };
    if (typeof window.renderMathInElement === "function") {
      window.renderMathInElement(target, opts);
    } else {
      setTimeout(() => {
        if (typeof window.renderMathInElement === "function") {
          window.renderMathInElement(target, opts);
        }
      }, 250);
    }
  }

  function allProblemsCount() {
    return (window.CH5_DATA?.problems?.length || 0) + (window.CH6_DATA?.problems?.length || 0);
  }

  function updateProgressUI() {
    const total = allProblemsCount();
    const done = mastered.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const textEl = document.getElementById("progress-count");
    const fillEl = document.getElementById("progress-fill");
    if (textEl) textEl.textContent = `${done} / ${total} 題 (${pct}%)`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }

  function renderSidebar(items) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    const total = allProblemsCount();
    const done = mastered.size;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    sidebar.innerHTML = `
      <h2 class="sidebar-title">本頁目錄</h2>
      <ul class="toc-list">
        ${items
          .map(
            (it) =>
              `<li><a class="toc-link ${it.sub ? "sub" : ""}" href="${it.href}" data-toc-target="${it.targetId || ""}">${it.label}</a></li>`
          )
          .join("")}
      </ul>
      <div class="progress-card">
        <div class="progress-meta">
          <span>複習完成度</span>
          <span id="progress-count">${done} / ${total} 題 (${pct}%)</span>
        </div>
        <div class="progress-track">
          <div id="progress-fill" class="progress-fill" style="width:${pct}%"></div>
        </div>
        <button id="reset-progress-btn" class="sidebar-reset-btn" type="button">清除已掌握標記</button>
      </div>
    `;

    sidebar.querySelectorAll(".toc-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("data-toc-target");
        if (targetId) {
          e.preventDefault();
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        closeMobileSidebar();
      });
    });

    const resetBtn = sidebar.querySelector("#reset-progress-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        mastered.clear();
        saveMastered();
        updateProgressUI();
        document.querySelectorAll(".problem-checkbox").forEach((cb) => {
          cb.checked = false;
          cb.closest(".problem-card")?.classList.remove("is-mastered");
        });
      });
    }
  }

  function closeMobileSidebar() {
    document.getElementById("sidebar")?.classList.remove("open");
    document.getElementById("sidebar-backdrop")?.classList.remove("open");
  }

  function initMobileSidebar() {
    const btn = document.getElementById("menu-toggle");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (btn) {
      btn.addEventListener("click", () => {
        document.getElementById("sidebar")?.classList.toggle("open");
        backdrop?.classList.toggle("open");
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeMobileSidebar);
    }
  }

  function renderHome() {
    const app = document.getElementById("app");
    app.className = "main-content";
    const totalProblems = allProblemsCount();

    app.innerHTML = `
      <section class="hero-card" id="home-hero">
        <span class="hero-eyebrow">期末考衝刺｜教授講義 ＋ 習題詳解 ＋ 筆記勘誤</span>
        <h1 class="hero-title">機率統計（Probability &amp; Statistics）</h1>
        <p class="hero-desc">
          這裡把課堂投影片與期末考練習筆記重新整理成結構化講義：先用教授口吻講透各分配的直覺與判斷心法，再附上互動視覺化小工具、10 題考前必考大題拆解、以及第 5、6 章全 83 題例題與習題逐題詳解。
        </p>
        <div class="stats-row">
          <div class="stat-box">
            <div class="stat-value">Ch 5 &amp; 6</div>
            <div class="stat-label">目前已上線章節</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${totalProblems} 題</div>
            <div class="stat-label">完整步驟與驗算</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">10 組</div>
            <div class="stat-label">必考母題深度精講</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">7 處</div>
            <div class="stat-label">原手寫筆記勘誤修正</div>
          </div>
        </div>
        <div class="hero-cta-row">
          <a href="#ch5" class="btn btn-ch5">進入 Ch 5：離散機率分配 →</a>
          <a href="#ch6" class="btn btn-ch6">進入 Ch 6：連續機率分配 →</a>
        </div>
      </section>

      <h2 class="section-heading" id="home-chapters">📚 課程章節導覽</h2>
      <div class="chapter-grid">
        <article class="chapter-card is-planned">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-tag planned">Ch 1–3</span>
              <span class="nav-badge planned">規劃中</span>
            </div>
            <h3>機率基礎與隨機變數</h3>
            <p>樣本空間、條件機率、貝氏定理、PMF / PDF / CDF 與聯合機率分配。</p>
          </div>
          <a href="#ch1-3" class="btn btn-outline btn-sm">查看規劃</a>
        </article>

        <article class="chapter-card is-planned">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-tag planned">Ch 4</span>
              <span class="nav-badge planned">規劃中</span>
            </div>
            <h3>Mathematical Expectation</h3>
            <p>期望值、變異數、共變異數、線性組合公式與 Chebyshev 不等式。</p>
          </div>
          <a href="#ch4" class="btn btn-outline btn-sm">查看規劃</a>
        </article>

        <article class="chapter-card">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-tag indigo">Ch 5 · 42 題</span>
              <span class="nav-badge ready">已上線</span>
            </div>
            <h3>離散機率分配</h3>
            <p>Uniform、Binomial、Multinomial、Hypergeometric、Negative Binomial、Geometric、Poisson 與逼近條件。</p>
          </div>
          <a href="#ch5" class="btn btn-ch5 btn-sm">開始上課與刷題 →</a>
        </article>

        <article class="chapter-card">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-tag teal">Ch 6 · 41 題</span>
              <span class="nav-badge ready">已上線</span>
            </div>
            <h3>連續機率分配</h3>
            <p>Uniform、Normal 常態正反查表、常態逼近二項（±0.5 修正）、Gamma 與 Exponential 及其對偶公式。</p>
          </div>
          <a href="#ch6" class="btn btn-ch6 btn-sm">開始上課與刷題 →</a>
        </article>

        <article class="chapter-card is-planned">
          <div>
            <div class="chapter-card-top">
              <span class="chapter-tag planned">Ch 7–8</span>
              <span class="nav-badge planned">規劃中</span>
            </div>
            <h3>MGF 與抽樣分配</h3>
            <p>動差母函數推導（e.g. 7.6, 7.7, ex 7.17–7.19）與中央極限定理（e.g. 8.4）。</p>
          </div>
          <a href="#ch7-8" class="btn btn-outline btn-sm">查看規劃</a>
        </article>
      </div>

      <section class="panel" id="home-errata" style="margin-top:24px;">
        <h2>⚠️ 考前必看：原期末考筆記重大勘誤摘要</h2>
        <p style="color:var(--text-muted);margin-top:0;">
          在整理手寫複習 PDF 時，我們發現幾處必須立刻糾正的算式或抄寫筆誤，避免考場誤背：
        </p>
        <div class="callout callout-errata">
          <div class="callout-title">Ch 5 &amp; Ch 6 最危險 4 處修正</div>
          <ul style="margin:6px 0 0;padding-left:20px;">
            <li><strong>e.g. 6.18（PDF p.19）</strong>：Poisson 解法方向寫反（應為 $P(X\\ge 2) = 1 - P(X\\le 1)$）且 $P(X\\le 1)$ 誤抄為 <code>0.1247</code>（實為 <code>0.0404</code>），正確答案應與 Gamma 一致皆為 $1 - 6e^{-5} \\approx \\mathbf{0.9596}$。</li>
            <li><strong>ex 5.52（PDF p.42）</strong>：染病率明明是 $p = 1/6$，手寫誤代入 $1/2$，正解為 $\\binom{7}{1}(1/6)^2(5/6)^6 \\approx \\mathbf{0.0651}$。</li>
            <li><strong>ex 5.9(c)（PDF p.36）</strong>：紅筆計算 $1 - 0.8516$ 筆誤寫成 <code>0.1464</code>，正確減法為 <strong><code>0.1484</code></strong>。</li>
            <li><strong>ex 5.65（PDF p.43 紅字提問解答）</strong>：因題幹「每年發生災難數」與小題時間單位同為 1 年，故 $t=1 \\implies \\mu = \\lambda t = 5$。</li>
          </ul>
        </div>
      </section>
    `;

    renderSidebar([
      { label: "總覽與統計", href: "#home", targetId: "home-hero" },
      { label: "課程章節導覽", href: "#home", targetId: "home-chapters" },
      { label: "原筆記重大勘誤", href: "#home", targetId: "home-errata" },
      { label: "→ 前往 Chapter 5", href: "#ch5" },
      { label: "→ 前往 Chapter 6", href: "#ch6" }
    ]);

    renderMath(app);
  }

  function renderComingSoon(info) {
    const app = document.getElementById("app");
    app.className = "main-content";
    app.innerHTML = `
      <section class="chapter-header">
        <span class="chapter-tag planned">${info.badge} · 規劃中</span>
        <h1>${info.title}</h1>
        <p>${info.desc}</p>
      </section>
      <section class="panel">
        <h2>📌 本章預計收錄內容</h2>
        <ul>
          ${info.topics.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="callout callout-tip" style="margin-top:16px;">
          <div class="callout-title">目前優先開放 Chapter 5 與 Chapter 6</div>
          <div>我們已優先完成期末核心第 5、6 章的教授講義與全 83 題題庫解析，你可以直接從上方導航列切換開始複習！</div>
        </div>
        <div class="hero-cta-row" style="margin-top:14px;">
          <a href="#ch5" class="btn btn-ch5 btn-sm">前往 Ch 5 離散分配</a>
          <a href="#ch6" class="btn btn-ch6 btn-sm">前往 Ch 6 連續分配</a>
          <a href="#home" class="btn btn-outline btn-sm">回總覽</a>
        </div>
      </section>
    `;
    renderSidebar([
      { label: "回總覽", href: "#home" },
      { label: "→ 前往 Ch 5", href: "#ch5" },
      { label: "→ 前往 Ch 6", href: "#ch6" }
    ]);
    renderMath(app);
  }

  function renderChapter(data) {
    const app = document.getElementById("app");
    app.className = `main-content theme-${data.accent}`;

    const sectionsUnique = Array.from(new Set(data.problems.map((p) => p.section)));
    let filterState = {
      section: "all",
      kind: "all",
      search: "",
      allExpanded: false
    };

    const mustProblems = data.mustExamIds
      .map((id) => data.problems.find((p) => p.id === id))
      .filter(Boolean);

    app.innerHTML = `
      <section class="chapter-header" id="ch-top">
        <span class="chapter-tag ${data.accent}">${data.shortTitle} · ${data.problems.length} 題詳解</span>
        <h1>${data.title}</h1>
        <p>${data.subtitle}</p>
        <div class="anchor-pills">
          <a class="anchor-pill" href="#${data.id}" data-jump-sec="sec-lecture">📖 教授講義</a>
          <a class="anchor-pill" href="#${data.id}" data-jump-sec="sec-widgets">🧪 互動工具</a>
          <a class="anchor-pill" href="#${data.id}" data-jump-sec="sec-must">🔥 必考精講 (${mustProblems.length})</a>
          <a class="anchor-pill" href="#${data.id}" data-jump-sec="sec-errata">⚠️ 筆記勘誤 (${data.errata.length})</a>
          <a class="anchor-pill" href="#${data.id}" data-jump-sec="sec-bank">📝 完整題庫 (${data.problems.length})</a>
        </div>
      </section>

      <section class="panel" id="sec-lecture">
        <h2>📖 教授核心講義</h2>
        ${data.lectureSections
          .map(
            (sec, idx) => `
            <article class="lecture-block" id="lec-${data.id}-${idx}">
              <h3>${sec.heading}</h3>
              ${sec.html}
            </article>
          `
          )
          .join("")}
        <div class="lecture-block">
          <h3>考場公式速查總表</h3>
          <div class="table-scroll">
            <table class="dist-table">
              <thead>
                <tr>
                  ${data.summaryTable.headers.map((h) => `<th>${h}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${data.summaryTable.rows
                  .map(
                    (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="panel" id="sec-widgets">
        <h2>🧪 互動式考場工具</h2>
        <div class="widget-grid" id="widget-mount"></div>
      </section>

      <section class="panel" id="sec-must">
        <h2>🔥 本章必考母題深度拆解</h2>
        <p style="color:var(--text-muted);margin-top:0;">這幾題最能考驗觀念整合與計算細心度，建議考前親手重寫一遍列式：</p>
        <div class="spotlight-grid">
          ${mustProblems
            .map(
              (p) => `
              <article class="spotlight-card">
                <div class="spotlight-head">
                  <span class="spotlight-title">${p.code}（${p.page}）— ${p.title}</span>
                  <button type="button" class="btn btn-outline btn-sm" data-open-prob="${p.id}">跳到題庫展開詳解 ↓</button>
                </div>
                <p style="margin:0 0 8px;color:var(--text-muted);font-size:0.92rem;"><strong>為什麼必考：</strong>${p.mustReason || p.prompt}</p>
                <div style="font-size:0.92rem;">${p.solutionHtml}</div>
              </article>
            `
            )
            .join("")}
        </div>
      </section>

      <section class="panel" id="sec-errata">
        <h2>⚠️ 原 PDF 手寫筆記勘誤與 Q&amp;A</h2>
        ${data.errata
          .map(
            (e) => `
            <div class="callout callout-errata">
              <div class="callout-title">${e.title}</div>
              <div>${e.html}</div>
            </div>
          `
          )
          .join("")}
      </section>

      <section class="panel" id="sec-bank">
        <h2>📝 完整例題與習題題庫（共 ${data.problems.length} 題）</h2>
        ${data.scopeNote ? `<p style="color:var(--text-soft);font-size:0.9rem;margin-top:0;">${data.scopeNote}</p>` : ""}
        <div class="filter-bar">
          <div class="filter-row" id="sec-filters">
            <button type="button" class="chip-btn active" data-sec="all">全部小節</button>
            ${sectionsUnique.map((s) => `<button type="button" class="chip-btn" data-sec="${s}">§ ${s}</button>`).join("")}
          </div>
          <div class="filter-row" id="kind-filters">
            <button type="button" class="chip-btn active" data-kind="all">全部題型</button>
            <button type="button" class="chip-btn" data-kind="eg">例題 (e.g.)</button>
            <button type="button" class="chip-btn" data-kind="ex">習題 / 複習題</button>
            <button type="button" class="chip-btn" data-kind="hot">🔥 必考題</button>
            <button type="button" class="chip-btn" data-kind="err">⚠️ 含勘誤/提問</button>
            <button type="button" class="chip-btn" data-kind="todo">僅看未掌握</button>
          </div>
          <div class="filter-row">
            <input id="prob-search" class="search-input" type="search" placeholder="搜尋題號或關鍵字（例如 5.52、6.18、NBA、指數、放回）…" />
            <button id="toggle-all-btn" type="button" class="btn btn-outline btn-sm">全部展開詳解</button>
          </div>
        </div>
        <div id="problem-list" class="problem-list"></div>
      </section>
    `;

    // Wire anchor pills inside chapter header
    app.querySelectorAll("[data-jump-sec]").forEach((pill) => {
      pill.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(pill.getAttribute("data-jump-sec"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // Build sidebar TOC
    const tocItems = [
      { label: "章節總覽", href: `#${data.id}`, targetId: "ch-top" },
      { label: "📖 教授核心講義", href: `#${data.id}`, targetId: "sec-lecture" },
      ...data.lectureSections.map((sec, idx) => ({
        label: sec.shortHeading || sec.heading,
        href: `#${data.id}`,
        targetId: `lec-${data.id}-${idx}`,
        sub: true
      })),
      { label: "🧪 互動式考場工具", href: `#${data.id}`, targetId: "sec-widgets" },
      { label: "🔥 必考母題拆解", href: `#${data.id}`, targetId: "sec-must" },
      { label: "⚠️ 原筆記勘誤", href: `#${data.id}`, targetId: "sec-errata" },
      { label: `📝 完整題庫 (${data.problems.length})`, href: `#${data.id}`, targetId: "sec-bank" }
    ];
    renderSidebar(tocItems);

    function renderProblemList() {
      const listEl = document.getElementById("problem-list");
      const q = filterState.search.trim().toLowerCase();
      const filtered = data.problems.filter((p) => {
        if (filterState.section !== "all" && p.section !== filterState.section) return false;
        if (filterState.kind === "eg" && p.kind !== "eg") return false;
        if (filterState.kind === "ex" && p.kind === "eg") return false;
        if (filterState.kind === "hot" && !p.isMust) return false;
        if (filterState.kind === "err" && !p.hasErrata) return false;
        if (filterState.kind === "todo" && mastered.has(p.id)) return false;
        if (q) {
          const hay = `${p.code} ${p.title} ${p.prompt} ${p.section} ${p.page} ${p.solutionHtml}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="empty-state">沒有符合篩選條件的題目，請清除關鍵字或切換篩選條件。</div>`;
        return;
      }

      listEl.innerHTML = filtered
        .map((p) => {
          const isDone = mastered.has(p.id);
          const kindBadge =
            p.kind === "eg"
              ? `<span class="badge badge-eg">例題</span>`
              : p.kind === "rev"
              ? `<span class="badge badge-rev">複習題</span>`
              : `<span class="badge badge-ex">習題</span>`;
          return `
            <article class="problem-card ${isDone ? "is-mastered" : ""}" id="prob-${p.id}">
              <div class="problem-head">
                <div class="problem-meta">
                  <span class="problem-id">${p.code}</span>
                  ${kindBadge}
                  <span class="badge badge-page">§ ${p.section} · ${p.page}</span>
                  ${p.isMust ? `<span class="badge badge-hot">🔥 必考</span>` : ""}
                  ${p.hasErrata ? `<span class="badge badge-err">⚠️ 勘誤/提問</span>` : ""}
                </div>
                <div class="problem-controls">
                  <label class="mastered-label">
                    <input type="checkbox" class="problem-checkbox" data-master-id="${p.id}" ${isDone ? "checked" : ""} />
                    已掌握
                  </label>
                  <button type="button" class="btn btn-outline btn-sm toggle-sol-btn" data-sol-id="${p.id}" aria-expanded="${filterState.allExpanded}">
                    ${filterState.allExpanded ? "收合解答" : "顯示詳解"}
                  </button>
                </div>
              </div>
              <div class="problem-prompt">
                <strong>${p.title}：</strong>${p.prompt}
              </div>
              <div class="problem-solution" id="sol-${p.id}" ${filterState.allExpanded ? "" : "hidden"}>
                ${p.solutionHtml}
              </div>
            </article>
          `;
        })
        .join("");

      listEl.querySelectorAll(".toggle-sol-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-sol-id");
          const sol = document.getElementById(`sol-${id}`);
          if (!sol) return;
          const opening = sol.hasAttribute("hidden");
          if (opening) {
            sol.removeAttribute("hidden");
            btn.textContent = "收合解答";
            btn.setAttribute("aria-expanded", "true");
            renderMath(sol);
          } else {
            sol.setAttribute("hidden", "");
            btn.textContent = "顯示詳解";
            btn.setAttribute("aria-expanded", "false");
          }
        });
      });

      listEl.querySelectorAll(".problem-checkbox").forEach((cb) => {
        cb.addEventListener("change", () => {
          const id = cb.getAttribute("data-master-id");
          if (cb.checked) mastered.add(id);
          else mastered.delete(id);
          saveMastered();
          cb.closest(".problem-card")?.classList.toggle("is-mastered", cb.checked);
          updateProgressUI();
        });
      });

      renderMath(listEl);
    }

    function jumpToProblem(probId) {
      filterState.section = "all";
      filterState.kind = "all";
      filterState.search = "";
      document.getElementById("prob-search").value = "";
      app.querySelectorAll("#sec-filters .chip-btn").forEach((b) => b.classList.toggle("active", b.getAttribute("data-sec") === "all"));
      app.querySelectorAll("#kind-filters .chip-btn").forEach((b) => b.classList.toggle("active", b.getAttribute("data-kind") === "all"));
      renderProblemList();

      const card = document.getElementById(`prob-${probId}`);
      const sol = document.getElementById(`sol-${probId}`);
      const btn = card?.querySelector(".toggle-sol-btn");
      if (sol) {
        sol.removeAttribute("hidden");
        renderMath(sol);
      }
      if (btn) {
        btn.textContent = "收合解答";
        btn.setAttribute("aria-expanded", "true");
      }
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Wire filters & buttons
    app.querySelectorAll("#sec-filters .chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterState.section = btn.getAttribute("data-sec");
        app.querySelectorAll("#sec-filters .chip-btn").forEach((b) => b.classList.toggle("active", b === btn));
        renderProblemList();
      });
    });

    app.querySelectorAll("#kind-filters .chip-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterState.kind = btn.getAttribute("data-kind");
        app.querySelectorAll("#kind-filters .chip-btn").forEach((b) => b.classList.toggle("active", b === btn));
        renderProblemList();
      });
    });

    document.getElementById("prob-search").addEventListener("input", (e) => {
      filterState.search = e.target.value;
      renderProblemList();
    });

    const toggleAllBtn = document.getElementById("toggle-all-btn");
    toggleAllBtn.addEventListener("click", () => {
      filterState.allExpanded = !filterState.allExpanded;
      toggleAllBtn.textContent = filterState.allExpanded ? "刷題模式：全部收合" : "全部展開詳解";
      renderProblemList();
    });

    app.querySelectorAll("[data-open-prob]").forEach((btn) => {
      btn.addEventListener("click", () => {
        jumpToProblem(btn.getAttribute("data-open-prob"));
      });
    });

    // Mount interactive widgets
    const widgetMount = document.getElementById("widget-mount");
    if (data.id === "ch5" && typeof window.mountCh5DecisionWidget === "function") {
      window.mountCh5DecisionWidget(widgetMount, renderMath, jumpToProblem);
    } else if (data.id === "ch6") {
      const normalDiv = document.createElement("div");
      const contDiv = document.createElement("div");
      widgetMount.appendChild(normalDiv);
      widgetMount.appendChild(contDiv);
      if (typeof window.mountCh6NormalWidget === "function") {
        window.mountCh6NormalWidget(normalDiv, renderMath);
      }
      if (typeof window.mountCh6ContinuityWidget === "function") {
        window.mountCh6ContinuityWidget(contDiv, renderMath);
      }
    }

    renderProblemList();
    renderMath(app);
  }

  function route() {
    const hash = (window.location.hash || "#home").replace(/^#/, "") || "home";
    document.querySelectorAll(".chapter-nav .nav-link").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-route") === hash);
    });
    closeMobileSidebar();

    if (hash === "ch5" && window.CH5_DATA) {
      document.title = "Ch 5 離散分配｜機率統計";
      renderChapter(window.CH5_DATA);
    } else if (hash === "ch6" && window.CH6_DATA) {
      document.title = "Ch 6 連續分配｜機率統計";
      renderChapter(window.CH6_DATA);
    } else if (PLANNED_CHAPTERS[hash]) {
      document.title = `${PLANNED_CHAPTERS[hash].badge}｜機率統計`;
      renderComingSoon(PLANNED_CHAPTERS[hash]);
    } else {
      document.title = "機率統計 — 教授講義與習題精講";
      renderHome();
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileSidebar();
    window.addEventListener("hashchange", route);
    route();
  });
})();
