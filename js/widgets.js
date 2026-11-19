(function () {
  function normCdf(z) {
    const sign = z < 0 ? -1 : 1;
    const x = Math.abs(z) / Math.SQRT2;
    const t = 1 / (1 + 0.3275911 * x);
    const y =
      1 -
      (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
        0.254829592) *
        t) *
        Math.exp(-x * x);
    return 0.5 * (1 + sign * y);
  }

  function normPdf(z) {
    return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  }

  window.mountCh5DecisionWidget = function (container, renderMath, jumpToProblem) {
    const CATALOG = {
      poisson: {
        name: "Poisson Distribution（卜瓦松分配）",
        pmf: String.raw`$$f(x) = \frac{e^{-\lambda t}(\lambda t)^x}{x!}, \quad x = 0, 1, 2, \dots$$`,
        stats: String.raw`$\mu = \lambda t, \qquad \sigma^2 = \lambda t$`,
        tip: "先確認單位時間速率 $\\lambda$ 與題目問的時間長度 $t$，算出 $\\mu=\\lambda t$！若是 $n$ 很大、$p$ 很小的二項逼近，則令 $\\mu = np$。",
        refs: [
          { id: "eg-5-17", label: "e.g. 5.17" },
          { id: "ex-5-65", label: "ex 5.65" },
          { id: "ex-5-82", label: "ex 5.82 🔥" }
        ]
      },
      uniform: {
        name: "Discrete Uniform Distribution（離散均勻分配）",
        pmf: String.raw`$$f(x) = \frac{1}{k}, \quad x = x_1, x_2, \dots, x_k$$`,
        stats: String.raw`$\mu = \frac{1}{k}\sum_{i=1}^k x_i, \qquad \sigma^2 = \frac{1}{k}\sum_{i=1}^k (x_i - \mu)^2$`,
        tip: "從有限個編號中「單次公平抽 1 張」，就是離散均勻分配，千萬不要誤用二項分配！",
        refs: [{ id: "ex-5-3", label: "ex 5.3" }]
      },
      hyper: {
        name: "Hypergeometric Distribution（超幾何分配）",
        pmf: String.raw`$$f(x) = \frac{\binom{k}{x}\binom{N-k}{n-x}}{\binom{N}{n}}$$`,
        stats: String.raw`$\mu = \frac{nk}{N}, \qquad \sigma^2 = \frac{N-n}{N-1}\cdot n\cdot\frac{k}{N}\left(1-\frac{k}{N}\right)$`,
        tip: "關鍵字「不放回（without replacement）」！若抽樣比例 $n/N \\le 0.05$，可用二項分配（$p=k/N$）逼近。",
        refs: [
          { id: "eg-5-8", label: "e.g. 5.8" },
          { id: "ex-5-31", label: "ex 5.31" },
          { id: "ex-5-36", label: "ex 5.36 🔥" }
        ]
      },
      multihyper: {
        name: "Multivariate Hypergeometric（多變量超幾何分配）",
        pmf: String.raw`$$f(x_1,\dots,x_k) = \frac{\binom{a_1}{x_1}\binom{a_2}{x_2}\cdots\binom{a_k}{x_k}}{\binom{N}{n}}, \quad \sum a_i = N,\ \sum x_i = n$$`,
        stats: String.raw`各類別邊際為超幾何分配`,
        tip: "遇到「缺少某類別、其餘都要至少 1 個」時，記得先給每類 1 個名額，再把剩餘名額窮舉分拆！",
        refs: [
          { id: "eg-5-13", label: "e.g. 5.13" },
          { id: "ex-5-43", label: "ex 5.43 🔥" }
        ]
      },
      binom: {
        name: "Binomial Distribution（二項分配）",
        pmf: String.raw`$$f(x) = \binom{n}{x}p^x q^{n-x}, \quad x = 0, 1, \dots, n$$`,
        stats: String.raw`$\mu = np, \qquad \sigma^2 = npq$`,
        tip: "固定做 $n$ 次獨立試驗（或母體極大／有放回抽樣）。查累積表時 $P(a \\le X \\le b) = F(b) - F(a-1)$，下界務必減 1！",
        refs: [
          { id: "eg-5-3", label: "e.g. 5.3 🔥" },
          { id: "ex-5-9", label: "ex 5.9 ⚠️" },
          { id: "ex-5-37", label: "ex 5.37 🔥" }
        ]
      },
      multinom: {
        name: "Multinomial Distribution（多項分配）",
        pmf: String.raw`$$f(x_1,\dots,x_k) = \frac{n!}{x_1!\cdots x_k!}p_1^{x_1}\cdots p_k^{x_k}, \quad \sum x_i = n,\ \sum p_i = 1$$`,
        stats: String.raw`$\mu_i = np_i, \qquad \sigma_i^2 = np_i(1-p_i)$`,
        tip: "先把「其他」類別的機率 $1 - \\sum p_j$ 算出來，並確認所有 $p_i$ 加總為 $1$。",
        refs: [
          { id: "eg-5-7", label: "e.g. 5.7" },
          { id: "ex-5-19", label: "ex 5.19" },
          { id: "ex-5-20", label: "ex 5.20" }
        ]
      },
      negbin: {
        name: "Negative Binomial Distribution（負二項分配）",
        pmf: String.raw`$$f(x) = \binom{x-1}{k-1}p^k q^{x-k}, \quad x = k, k+1, k+2, \dots$$`,
        stats: String.raw`$\mu = \frac{k}{p}, \qquad \sigma^2 = \frac{kq}{p^2}$`,
        tip: "「最後一格卡位法」：第 $x$ 次必須是第 $k$ 次成功（機率 $p$），前 $x-1$ 次安排 $k-1$ 次成功！",
        refs: [
          { id: "eg-5-14", label: "e.g. 5.14 🔥" },
          { id: "ex-5-50", label: "ex 5.50" },
          { id: "ex-5-52", label: "ex 5.52 ⚠️" }
        ]
      },
      geom: {
        name: "Geometric Distribution（幾何分配）",
        pmf: String.raw`$$f(x) = pq^{x-1}, \quad x = 1, 2, 3, \dots$$`,
        stats: String.raw`$\mu = \frac{1}{p}, \qquad \sigma^2 = \frac{1-p}{p^2}$`,
        tip: "負二項分配 $k=1$ 的特例：前面 $x-1$ 次全失敗，第 $x$ 次才首次成功。",
        refs: [
          { id: "eg-5-15", label: "e.g. 5.15" },
          { id: "ex-5-55", label: "ex 5.55" }
        ]
      }
    };

    let state = { step1: "trials", step2: "negbin" };

    function render() {
      const selectedKey = state.step1 === "trials" ? state.step2 : state.step1;
      const item = CATALOG[selectedKey];
      container.innerHTML = `
        <div class="widget-card">
          <h3>🧭 互動工具：3 秒離散分配辨識器</h3>
          <p class="widget-sub">點選題目情境條件，立即判斷該用哪一個分配與考場防呆口訣。</p>

          <div>
            <strong>Step 1｜題目描述的是哪一種隨機過程？</strong>
            <div class="widget-options">
              <button type="button" class="chip-btn ${state.step1 === "trials" ? "active" : ""}" data-s1="trials">重複抽樣或試驗序列</button>
              <button type="button" class="chip-btn ${state.step1 === "poisson" ? "active" : ""}" data-s1="poisson">連續時間/空間內計數（或 n大 p小 逼近）</button>
              <button type="button" class="chip-btn ${state.step1 === "uniform" ? "active" : ""}" data-s1="uniform">有限個等機率結果單次抽樣</button>
            </div>
          </div>

          ${
            state.step1 === "trials"
              ? `<div>
                  <strong>Step 2｜抽樣方式與停止條件是什麼？</strong>
                  <div class="widget-options">
                    <button type="button" class="chip-btn ${state.step2 === "binom" ? "active" : ""}" data-s2="binom">有放回/母體大 + 固定 n 次（2類）</button>
                    <button type="button" class="chip-btn ${state.step2 === "multinom" ? "active" : ""}" data-s2="multinom">獨立重複固定 n 次（k ≥ 3類）</button>
                    <button type="button" class="chip-btn ${state.step2 === "hyper" ? "active" : ""}" data-s2="hyper">有限母體不放回抽 n 個（2類）</button>
                    <button type="button" class="chip-btn ${state.step2 === "multihyper" ? "active" : ""}" data-s2="multihyper">有限母體不放回（k ≥ 3類）</button>
                    <button type="button" class="chip-btn ${state.step2 === "negbin" ? "active" : ""}" data-s2="negbin">直到第 k 次成功才停（k > 1）</button>
                    <button type="button" class="chip-btn ${state.step2 === "geom" ? "active" : ""}" data-s2="geom">直到第 1 次成功就停（k = 1）</button>
                  </div>
                </div>`
              : ""
          }

          <div class="widget-result">
            <div style="font-weight:700;font-size:1.02rem;color:var(--accent);">${item.name}</div>
            <div>${item.pmf}</div>
            <div style="margin-bottom:8px;">${item.stats}</div>
            <div class="callout callout-tip" style="margin:8px 0 10px;">
              <div class="callout-title">教授叮嚀</div>
              <div>${item.tip}</div>
            </div>
            <div class="filter-row">
              <span style="font-size:0.84rem;color:var(--text-soft);font-weight:600;">對應範例：</span>
              ${item.refs
                .map(
                  (r) =>
                    `<button type="button" class="btn btn-outline btn-sm" data-jump="${r.id}">${r.label}</button>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll("[data-s1]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.step1 = btn.getAttribute("data-s1");
          render();
        });
      });
      container.querySelectorAll("[data-s2]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.step2 = btn.getAttribute("data-s2");
          render();
        });
      });
      container.querySelectorAll("[data-jump]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (typeof jumpToProblem === "function") {
            jumpToProblem(btn.getAttribute("data-jump"));
          }
        });
      });

      renderMath(container);
    }

    render();
  };

  window.mountCh6NormalWidget = function (container, renderMath) {
    let state = {
      mu: 30,
      sigma: 6,
      mode: "between",
      a: 32,
      b: 41,
      d: 7.8
    };

    function compute() {
      const mu = Number(state.mu) || 0;
      const sigma = Math.max(0.0001, Math.abs(Number(state.sigma) || 1));
      let prob = 0;
      let exprTex = "";
      let zTex = "";
      let shade = [];

      if (state.mode === "left") {
        const z = (state.b - mu) / sigma;
        prob = normCdf(z);
        exprTex = String.raw`P(X < ${state.b}) = P(Z < ${z.toFixed(4)})`;
        zTex = String.raw`z = \frac{${state.b} - ${mu}}{${sigma}} = ${z.toFixed(4)}`;
        shade = [[-4, Math.max(-4, Math.min(4, z))]];
      } else if (state.mode === "right") {
        const z = (state.a - mu) / sigma;
        prob = 1 - normCdf(z);
        exprTex = String.raw`P(X > ${state.a}) = 1 - P(Z < ${z.toFixed(4)})`;
        zTex = String.raw`z = \frac{${state.a} - ${mu}}{${sigma}} = ${z.toFixed(4)}`;
        shade = [[Math.max(-4, Math.min(4, z)), 4]];
      } else if (state.mode === "between") {
        const lo = Math.min(state.a, state.b);
        const hi = Math.max(state.a, state.b);
        const z1 = (lo - mu) / sigma;
        const z2 = (hi - mu) / sigma;
        prob = normCdf(z2) - normCdf(z1);
        exprTex = String.raw`P(${lo} < X < ${hi}) = P(${z1.toFixed(4)} < Z < ${z2.toFixed(4)})`;
        zTex = String.raw`z_1 = ${z1.toFixed(4)}, \quad z_2 = ${z2.toFixed(4)}`;
        shade = [[Math.max(-4, z1), Math.min(4, z2)]];
      } else {
        const d = Math.abs(Number(state.d) || 0);
        const z = d / sigma;
        prob = 2 * (1 - normCdf(z));
        exprTex = String.raw`P(|X - ${mu}| > ${d}) = 2\big(1 - \Phi(${z.toFixed(4)})\big)`;
        zTex = String.raw`z = \pm \frac{${d}}{${sigma}} = \pm ${z.toFixed(4)}`;
        shade = [
          [-4, -Math.min(4, z)],
          [Math.min(4, z), 4]
        ];
      }

      return { mu, sigma, prob, exprTex, zTex, shade };
    }

    function buildSvg(mu, sigma, shade) {
      const W = 540;
      const H = 190;
      const padL = 28;
      const padR = 28;
      const baseY = 152;
      const topY = 22;
      const scaleX = (z) => padL + ((z + 4) / 8) * (W - padL - padR);
      const maxPdf = normPdf(0);
      const scaleY = (y) => baseY - (y / maxPdf) * (baseY - topY);

      let curvePts = [];
      for (let i = 0; i <= 160; i++) {
        const z = -4 + (8 * i) / 160;
        curvePts.push(`${scaleX(z).toFixed(1)},${scaleY(normPdf(z)).toFixed(1)}`);
      }

      const shadePaths = shade
        .filter(([z1, z2]) => z2 > z1)
        .map(([z1, z2]) => {
          const pts = [`${scaleX(z1).toFixed(1)},${baseY}`];
          const steps = 60;
          for (let i = 0; i <= steps; i++) {
            const z = z1 + ((z2 - z1) * i) / steps;
            pts.push(`${scaleX(z).toFixed(1)},${scaleY(normPdf(z)).toFixed(1)}`);
          }
          pts.push(`${scaleX(z2).toFixed(1)},${baseY}`);
          return `<polygon points="${pts.join(" ")}" fill="var(--ch6)" fill-opacity="0.28" />`;
        })
        .join("");

      const ticks = [-3, -2, -1, 0, 1, 2, 3]
        .map((k) => {
          const x = scaleX(k).toFixed(1);
          const label = Number((mu + k * sigma).toFixed(2));
          return `
            <line x1="${x}" y1="${baseY}" x2="${x}" y2="${baseY + 5}" stroke="var(--text-soft)" stroke-width="1" />
            <text x="${x}" y="${baseY + 19}" text-anchor="middle" fill="var(--text-soft)" font-size="10.5" font-family="var(--font-mono)">${label}</text>
          `;
        })
        .join("");

      return `
        <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="常態分配曲線陰影圖">
          ${shadePaths}
          <line x1="${padL}" y1="${baseY}" x2="${W - padR}" y2="${baseY}" stroke="var(--border-strong)" stroke-width="1.5" />
          <line x1="${scaleX(0).toFixed(1)}" y1="${topY}" x2="${scaleX(0).toFixed(1)}" y2="${baseY}" stroke="var(--text-soft)" stroke-dasharray="4 4" stroke-width="1" />
          <polyline points="${curvePts.join(" ")}" fill="none" stroke="var(--ch6)" stroke-width="2.5" />
          ${ticks}
        </svg>
      `;
    }

    function render() {
      const res = compute();
      container.innerHTML = `
        <div class="widget-card">
          <h3>📈 互動工具：常態分配標準化與鐘形曲線計算機</h3>
          <p class="widget-sub">輸入參數與區間，即時繪出陰影面積與對應的標準常態 $Z$ 值（也可套用課本題型預設）。</p>

          <div class="widget-options">
            <button type="button" class="chip-btn" data-preset="ex68">套用 ex 6.8(c): μ=30, σ=6, 32&lt;X&lt;41</button>
            <button type="button" class="chip-btn" data-preset="ex622">套用 ex 6.22(a): |Z|&gt;1.3 雙尾</button>
            <button type="button" class="chip-btn" data-preset="std">標準常態 Z: μ=0, σ=1, Z&gt;1.84</button>
          </div>

          <div class="widget-controls">
            <label class="field">平均數 μ
              <input id="nw-mu" type="number" step="any" value="${state.mu}" />
            </label>
            <label class="field">標準差 σ
              <input id="nw-sigma" type="number" step="any" min="0.001" value="${state.sigma}" />
            </label>
            <label class="field">計算模式
              <select id="nw-mode">
                <option value="left" ${state.mode === "left" ? "selected" : ""}>左尾 P(X &lt; b)</option>
                <option value="right" ${state.mode === "right" ? "selected" : ""}>右尾 P(X &gt; a)</option>
                <option value="between" ${state.mode === "between" ? "selected" : ""}>區間 P(a &lt; X &lt; b)</option>
                <option value="two-tail" ${state.mode === "two-tail" ? "selected" : ""}>雙尾 P(|X - μ| &gt; d)</option>
              </select>
            </label>
            ${
              state.mode === "left"
                ? `<label class="field">上界 b<input id="nw-b" type="number" step="any" value="${state.b}" /></label>`
                : state.mode === "right"
                ? `<label class="field">下界 a<input id="nw-a" type="number" step="any" value="${state.a}" /></label>`
                : state.mode === "between"
                ? `<label class="field">下界 a<input id="nw-a" type="number" step="any" value="${state.a}" /></label>
                   <label class="field">上界 b<input id="nw-b" type="number" step="any" value="${state.b}" /></label>`
                : `<label class="field">偏離距離 d<input id="nw-d" type="number" step="any" min="0" value="${state.d}" /></label>`
            }
          </div>

          <div class="widget-result">
            <div>$$ ${res.zTex} $$</div>
            <div>$$ ${res.exprTex} \\approx \\mathbf{${res.prob.toFixed(4)}}\\ (${(res.prob * 100).toFixed(2)}\\%) $$</div>
            <div class="svg-wrap">${buildSvg(res.mu, res.sigma, res.shade)}</div>
          </div>
        </div>
      `;

      container.querySelector("#nw-mu").addEventListener("input", (e) => {
        state.mu = parseFloat(e.target.value);
        updateOutput();
      });
      container.querySelector("#nw-sigma").addEventListener("input", (e) => {
        state.sigma = parseFloat(e.target.value);
        updateOutput();
      });
      container.querySelector("#nw-mode").addEventListener("change", (e) => {
        state.mode = e.target.value;
        render();
      });
      const aEl = container.querySelector("#nw-a");
      if (aEl) {
        aEl.addEventListener("input", (e) => {
          state.a = parseFloat(e.target.value);
          updateOutput();
        });
      }
      const bEl = container.querySelector("#nw-b");
      if (bEl) {
        bEl.addEventListener("input", (e) => {
          state.b = parseFloat(e.target.value);
          updateOutput();
        });
      }
      const dEl = container.querySelector("#nw-d");
      if (dEl) {
        dEl.addEventListener("input", (e) => {
          state.d = parseFloat(e.target.value);
          updateOutput();
        });
      }
      container.querySelectorAll("[data-preset]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const p = btn.getAttribute("data-preset");
          if (p === "ex68") state = { mu: 30, sigma: 6, mode: "between", a: 32, b: 41, d: 6 };
          else if (p === "ex622") state = { mu: 0, sigma: 1, mode: "two-tail", a: -1.3, b: 1.3, d: 1.3 };
          else state = { mu: 0, sigma: 1, mode: "right", a: 1.84, b: 1.84, d: 1.84 };
          render();
        });
      });

      renderMath(container);
    }

    function updateOutput() {
      const box = container.querySelector(".widget-result");
      if (!box) return;
      const res = compute();
      box.innerHTML = `
        <div>$$ ${res.zTex} $$</div>
        <div>$$ ${res.exprTex} \\approx \\mathbf{${res.prob.toFixed(4)}}\\ (${(res.prob * 100).toFixed(2)}\\%) $$</div>
        <div class="svg-wrap">${buildSvg(res.mu, res.sigma, res.shade)}</div>
      `;
      renderMath(box);
    }

    render();
  };

  window.mountCh6ContinuityWidget = function (container, renderMath) {
    let state = { op: "lt", a: 30, b: 30 };

    function evaluate() {
      const a = Math.round(Number(state.a) || 0);
      const b = Math.round(Number(state.b) || 0);
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      let discText = "";
      let step1 = "";
      let step2 = "";
      let loInc = null;
      let hiInc = null;
      let center = a;

      if (state.op === "le") {
        discText = `P_B(X \\le ${a})`;
        step1 = `包含整數 $X \\le ${a}$（含 $${a}$）`;
        step2 = `P_N(X < ${(a + 0.5).toFixed(1)})`;
        loInc = -Infinity;
        hiInc = a;
        center = a;
      } else if (state.op === "lt") {
        discText = `P_B(X < ${a})`;
        step1 = `先轉含等號：$X \\le ${a - 1}$（不含 $${a}$！）`;
        step2 = `P_N(X < ${(a - 0.5).toFixed(1)})`;
        loInc = -Infinity;
        hiInc = a - 1;
        center = a;
      } else if (state.op === "ge") {
        discText = `P_B(X \\ge ${a})`;
        step1 = `包含整數 $X \\ge ${a}$（含 $${a}$）`;
        step2 = `P_N(X > ${(a - 0.5).toFixed(1)})`;
        loInc = a;
        hiInc = Infinity;
        center = a;
      } else if (state.op === "gt") {
        discText = `P_B(X > ${a})`;
        step1 = `先轉含等號：$X \\ge ${a + 1}$（不含 $${a}$！）`;
        step2 = `P_N(X > ${(a + 0.5).toFixed(1)})`;
        loInc = a + 1;
        hiInc = Infinity;
        center = a;
      } else if (state.op === "eq") {
        discText = `P_B(X = ${a})`;
        step1 = `單點長條僅包含整數 $${a}$`;
        step2 = `P_N(${(a - 0.5).toFixed(1)} < X < ${(a + 0.5).toFixed(1)})`;
        loInc = a;
        hiInc = a;
        center = a;
      } else {
        discText = `P_B(${lo} \\le X \\le ${hi})`;
        step1 = `包含整數 $${lo}, ${lo + 1}, \\dots, ${hi}$`;
        step2 = `P_N(${(lo - 0.5).toFixed(1)} < X < ${(hi + 0.5).toFixed(1)})`;
        loInc = lo;
        hiInc = hi;
        center = Math.round((lo + hi) / 2);
      }

      const startTile = state.op === "between" ? lo - 2 : center - 3;
      const endTile = state.op === "between" ? hi + 2 : center + 3;
      let tiles = [];
      for (let k = startTile; k <= endTile; k++) {
        tiles.push({
          k,
          included: k >= loInc && k <= hiInc
        });
      }

      return { discText, step1, step2, tiles };
    }

    function render() {
      const info = evaluate();
      container.innerHTML = `
        <div class="widget-card">
          <h3>🧱 互動工具：±0.5 連續性修正兩步法視覺化</h3>
          <p class="widget-sub">先轉成「含等號的整數區間」，再把包含的長條往外擴半格（$\\pm 0.5$）。</p>

          <div class="widget-options">
            <button type="button" class="chip-btn" data-cp="eg615">e.g. 6.15: X &lt; 30</button>
            <button type="button" class="chip-btn" data-cp="ex630a">ex 6.30(a): X &lt; 75</button>
            <button type="button" class="chip-btn" data-cp="ex630b">ex 6.30(b): X ≥ 75</button>
            <button type="button" class="chip-btn" data-cp="ex616">e.g. 6.16: 25 ≤ X ≤ 30</button>
            <button type="button" class="chip-btn" data-cp="ex624b">ex 6.24(b): X = 205</button>
          </div>

          <div class="widget-controls">
            <label class="field">離散事件形式
              <select id="cc-op">
                <option value="lt" ${state.op === "lt" ? "selected" : ""}>X &lt; a（少於 a）</option>
                <option value="le" ${state.op === "le" ? "selected" : ""}>X ≤ a（至多 a）</option>
                <option value="ge" ${state.op === "ge" ? "selected" : ""}>X ≥ a（至少 a）</option>
                <option value="gt" ${state.op === "gt" ? "selected" : ""}>X &gt; a（超過 a）</option>
                <option value="eq" ${state.op === "eq" ? "selected" : ""}>X = a（恰好 a）</option>
                <option value="between" ${state.op === "between" ? "selected" : ""}>a ≤ X ≤ b（介於兩者，含）</option>
              </select>
            </label>
            <label class="field">整數 a
              <input id="cc-a" type="number" step="1" value="${state.a}" />
            </label>
            ${
              state.op === "between"
                ? `<label class="field">整數 b<input id="cc-b" type="number" step="1" value="${state.b}" /></label>`
                : ""
            }
          </div>

          <div class="widget-result">
            <div><strong>Step 1｜確認包含哪些整數長條：</strong>${info.step1}</div>
            <div style="margin-top:6px;"><strong>Step 2｜往外擴 $\\pm 0.5$：</strong> $ ${info.discText} \\approx ${info.step2} $</div>
            <div class="bar-strip" aria-label="整數長條包含示意圖">
              ${info.tiles
                .map(
                  (t) =>
                    `<div class="bar-tile ${t.included ? "included" : ""}">
                      ${t.k}
                      <small>[${(t.k - 0.5).toFixed(1)}, ${(t.k + 0.5).toFixed(1)}]</small>
                    </div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      container.querySelector("#cc-op").addEventListener("change", (e) => {
        state.op = e.target.value;
        render();
      });
      container.querySelector("#cc-a").addEventListener("input", (e) => {
        state.a = parseInt(e.target.value, 10) || 0;
        render();
      });
      const bEl = container.querySelector("#cc-b");
      if (bEl) {
        bEl.addEventListener("input", (e) => {
          state.b = parseInt(e.target.value, 10) || 0;
          render();
        });
      }
      container.querySelectorAll("[data-cp]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const k = btn.getAttribute("data-cp");
          if (k === "eg615") state = { op: "lt", a: 30, b: 30 };
          else if (k === "ex630a") state = { op: "lt", a: 75, b: 75 };
          else if (k === "ex630b") state = { op: "ge", a: 75, b: 75 };
          else if (k === "ex616") state = { op: "between", a: 25, b: 30 };
          else state = { op: "eq", a: 205, b: 205 };
          render();
        });
      });

      renderMath(container);
    }

    render();
  };
})();
