window.CH6_DATA = {
  id: "ch6",
  shortTitle: "Ch 6 連續分配",
  title: "Chapter 6：Continuous Probability Distributions（連續機率分配）",
  subtitle:
    "連續世界的第一條鐵律就是「單點機率為 0」。本章重點在於：把難積分的常態曲線轉成標準化查表（Z）、把龐大的離散二項交給常態逼近（記得 ±0.5！），並掌握 Exponential／Gamma 與 Poisson 之間的完美對偶。",
  accent: "teal",
  scopeNote:
    "完整收錄期末考範圍 PDF 之 41 題 Ch 6 例題與習題（含 PDF 額外收錄之 ex 6.5）。另投影片 6.6 列出之 Review Exercises 6.78、6.80、6.81 未收錄於該份期末考 PDF。",
  lectureSections: [
    {
      shortHeading: "6.1 Continuous Uniform",
      heading: "6.1 Continuous Uniform Distribution（連續均勻分配）",
      html: String.raw`
        <p>在連續隨機變數中，$P(X=c) = \int_c^c f(x)\,dx = 0$，因此<strong>端點有沒有等號（$&lt;$ 與 $\le$）機率完全相同</strong>。若在區間 $[A, B]$ 上任意等寬微區間 $dx$ 機率相同，則密度函數高度處處相等：</p>
        <div class="formula-box">
          $$f(x) = \frac{1}{B - A}, \quad A \le x \le B \quad (\text{其餘為 } 0)$$
          $$\mu = \frac{A + B}{2}, \qquad \sigma^2 = \frac{(B - A)^2}{12}$$
        </div>
      `
    },
    {
      shortHeading: "6.2–6.4 Normal & Z-Table",
      heading: "6.2–6.4 Normal (Gaussian) Distribution 與標準化查表",
      html: String.raw`
        <p>常態分配由中心 $\mu$（決定左右位置）與標準差 $\sigma$（決定胖瘦分散度；$\sigma$ 越小越瘦高）完全決定：</p>
        <div class="formula-box">
          $$f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}, \quad -\infty < x < \infty \qquad \xrightarrow{\ Z = \frac{X-\mu}{\sigma}\ } \qquad Z \sim N(0, 1)$$
        </div>
        <ul>
          <li><strong>正查表</strong>：先標準化算出 $z$，再以 $\Phi(z) = P(Z \le z)$ 計算左尾、右尾（$1-\Phi(z)$）或區間（$\Phi(z_2)-\Phi(z_1)$）。</li>
          <li><strong>反查表</strong>：永遠先改寫成「<strong>左側累積面積</strong> $P(Z < z) = \text{area}$」，到表內反查出 $z$，最後還原 $x = \mu + z\sigma$。</li>
        </ul>
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ 雙尾文字地雷：differ from the mean / 規格外</div>
          <div>看到「與平均數<strong>相差（differ from the mean）</strong>超過或少於多少倍 $\sigma$」，或者「落在 $\mu \pm d$ 之外」，代表<strong>左右兩尾都要計算</strong>（對稱圖形可算單側後乘以 2）！</div>
        </div>
      `
    },
    {
      shortHeading: "6.5 Normal Approx to Binomial",
      heading: "6.5 Normal Approximation to Binomial（常態逼近二項與 ±0.5 修正）",
      html: String.raw`
        <p>當二項試驗次數 $n$ 夠大或 $p$ 接近 $1/2$（通常檢核 $np \ge 5$ 且 $nq \ge 5$），二項長條圖趨近鐘形曲線，可用 $N(\mu = np,\ \sigma^2 = npq)$ 逼近。由於每個整數長條 $k$ 佔據區間 $[k-0.5,\ k+0.5]$，必須做<strong>連續性修正</strong>：</p>
        <div class="formula-box">
          $$P_B(X = x) \approx P_N(x - 0.5 < X < x + 0.5), \qquad P_B(a \le X \le b) \approx P_N(a - 0.5 < X < b + 0.5)$$
        </div>
        <div class="callout callout-insight">
          <div class="callout-title">🧱 兩步驟絕不出錯口訣</div>
          <div><strong>Step 1</strong>：先把離散事件轉成<strong>含等號的整數區間</strong>（如 $X < 30 \implies X \le 29$；$X > 227 \implies X \ge 228$）。<br />
          <strong>Step 2</strong>：把包含進來的最左整數<strong>減 0.5</strong>、最右整數<strong>加 0.5</strong>，再代入 $Z = \frac{X - np}{\sqrt{npq}}$！</div>
        </div>
      `
    },
    {
      shortHeading: "6.6 Gamma & Exponential",
      heading: "6.6 Gamma & Exponential Distributions（含 Poisson 對偶神技）",
      html: String.raw`
        <p>Gamma 函數定義為 $\Gamma(\alpha) = \int_0^\infty t^{\alpha-1}e^{-t}\,dt$，滿足 $\Gamma(\alpha) = (\alpha-1)\Gamma(\alpha-1)$；當 $\alpha$ 為正整數時，$\Gamma(\alpha) = (\alpha-1)!$。</p>
        <div class="formula-box">
          $$\text{Gamma (}\alpha>0,\ \beta>0\text{)：} f(t) = \frac{1}{\beta^\alpha \Gamma(\alpha)}t^{\alpha-1}e^{-t/\beta}\ (t>0), \qquad \mu = \alpha\beta, \qquad \sigma^2 = \alpha\beta^2$$
          $$\text{Exponential (}\alpha=1\text{)：} f(t) = \frac{1}{\beta}e^{-t/\beta} = \lambda e^{-\lambda t}, \qquad P(T > t) = e^{-t/\beta}, \qquad P(T \le t) = 1 - e^{-t/\beta}$$
        </div>
        <div class="callout callout-errata">
          <div class="callout-title">🚨 全學期最大記號地雷：Walpole 採用尺度參數 β = 1 / λ！</div>
          <div>本課本裡的 $\beta$ 是「<strong>平均等待時間</strong>」，跟速率 $\lambda$ 互為倒數（$\beta = 1/\lambda$）！題目若給「每小時來 6 通電話（$\lambda=6$）」，代入公式時務必先把 $\beta = 1/6$ 算出來！</div>
        </div>
        <div class="callout callout-tip">
          <div class="callout-title">🌟 Poisson – Exponential – Gamma 三角對偶與 5 秒驗算招</div>
          <div>在速率為 $\lambda$ 的 Poisson Process 中：第 1 次到達時間服從 $\text{Exp}(\beta=1/\lambda)$；第 $k$ 次（正整數）到達時間服從 $\text{Gamma}(k, \beta=1/\lambda)$。兩者滿足等價式：
            $$P\big(\text{Gamma}(k, \beta) \le t\big) = P\big(\text{Poisson}(\lambda t) \ge k\big) = 1 - \sum_{x=0}^{k-1}\frac{e^{-t/\beta}(t/\beta)^x}{x!}$$
            考場上算完 Gamma 分部積分後，立刻用這個 Poisson 級數驗算一次，100% 不會算錯係數或正負號！
          </div>
        </div>
      `
    }
  ],
  summaryTable: {
    headers: ["分配名稱", "核心故事與應用", "PDF f(x) 或 f(t)", "期望值 μ", "變異數 σ²"],
    rows: [
      [
        "Continuous Uniform",
        "區間 [A, B] 內各處等機率密度",
        String.raw`$\frac{1}{B-A}\ (A\le x\le B)$`,
        String.raw`$\frac{A+B}{2}$`,
        String.raw`$\frac{(B-A)^2}{12}$`
      ],
      [
        "Normal (Gaussian)",
        "自然界量測、誤差、成績常態曲線",
        String.raw`$\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$`,
        String.raw`$\mu$`,
        String.raw`$\sigma^2$`
      ],
      [
        "Normal Approx to Bin",
        "n 大或 p 近 0.5（需做 ±0.5 修正）",
        String.raw`$Z = \frac{(x \pm 0.5) - np}{\sqrt{npq}}$`,
        String.raw`$np$`,
        String.raw`$npq$`
      ],
      [
        "Exponential",
        "Poisson 過程第 1 次事件等待時間",
        String.raw`$\frac{1}{\beta}e^{-t/\beta}\ (\beta = 1/\lambda)$`,
        String.raw`$\beta$`,
        String.raw`$\beta^2$`
      ],
      [
        "Gamma",
        "Poisson 過程第 α 次事件等待時間",
        String.raw`$\frac{1}{\beta^\alpha\Gamma(\alpha)}t^{\alpha-1}e^{-t/\beta}$`,
        String.raw`$\alpha\beta$`,
        String.raw`$\alpha\beta^2$`
      ]
    ]
  },
  errata: [
    {
      title: "e.g. 6.18（PDF p.19）｜全 PDF 最嚴重雙重錯誤（方向反了＋查錯列）",
      html: String.raw`題意「2 通電話進來之前經過不超過 1 分鐘」即 $T_2 \le 1$，等價於 1 分鐘內來電數 $X \ge 2$。PDF 筆記的 <code>(by poisson)</code> 錯寫成 $P(X<2) = P(X\le 1) = 0.1247$：不僅方向寫反（少算了 $1-$），而且 $P(X\le 1) = 6e^{-5} \approx 0.0404$，筆記卻錯抄成 $0.1247$（那是 $P(X\le 2)$ 的值）。正解應與下方 Gamma 積分一致：<strong>$1 - 6e^{-5} \approx 0.9596$</strong>。`
    },
    {
      title: "ex 6.25(b)（PDF p.57）｜筆誤把 q=0.95 寫成 0.99",
      html: String.raw`當不良率變成 $p = 0.05$ 時，$q = 0.95$，故 $\sigma^2 = npq = 5 \times 0.95 = 4.75$。筆記把算式筆誤寫成 <code>5 × 0.99 = 4.75</code>（還好最後數值 <code>4.75</code> 與答案 <code>0.0197</code> 是對的）。`
    },
    {
      title: "e.g. 6.2(b)（PDF p.12）｜抄寫筆誤 -1.97 寫成 -1.99",
      html: String.raw`題目下界為 $z = -1.97$，手寫算式抄成 <code>-1.99</code>，不過其查表值 <code>0.0244</code> 確實對應 $-1.97$（答案 <code>0.7807</code> 正確）。`
    },
    {
      title: "ex 6.72（PDF p.65）＆ e.g. 6.1（PDF p.11）｜記號與插圖小誤植",
      html: String.raw`<code>ex 6.72</code> 法一積分開頭誤寫為 <code>P(X=x)</code>（應為 $P(X<200)$），且 $1-3e^{-2} = 0.593994\dots$ 四捨五入應為 <code>0.5940</code>（筆記寫截尾 <code>0.5939</code>）。另 <code>e.g. 6.1</code> 旁附貼的課本圖示為 $[1,3]$ 示意圖，實際題目區間為 $[0,4]$。`
    }
  ],
  mustExamIds: ["ex-6-8", "ex-6-22", "ex-6-30", "ex-6-45", "eg-6-18", "ex-6-44"],
  problems: [
    {
      id: "eg-6-1",
      code: "e.g. 6.1",
      kind: "eg",
      section: "6.1",
      page: "p.11",
      title: "會議室使用時間（Continuous Uniform）",
      prompt: "會議長度 $X$ 在 $[0, 4]$ 小時上服從均勻分配。(a) 寫出 pdf；(b) 求會議持續至少 3 小時的機率。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $f(x) = \frac{1}{4},\ 0 \le x \le 4$（其餘為 $0$）。（註：PDF 旁附貼之課本圖示為 $[1,3]$ 示意圖，黑板照片推導的「高度處處相等皆為 $1/4$」才是本題正解。）</li>
          <li>(b) $P(X \ge 3) = \int_3^4 \frac{1}{4}\,dx = \mathbf{\frac{1}{4}}$</li>
        </ul>
      `
    },
    {
      id: "ex-6-1",
      code: "ex 6.1",
      kind: "ex",
      section: "6.1",
      page: "p.49",
      title: "推導連續均勻分配之平均數與變異數",
      prompt: "已知 $X \sim U[A, B]$，證明：(a) $\\mu = \\frac{A+B}{2}$；(b) $\\sigma^2 = \\frac{(B-A)^2}{12}$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$\mu = \int_A^B \frac{x}{B-A}\,dx = \frac{B^2-A^2}{2(B-A)} = \mathbf{\frac{A+B}{2}}$$
        $$E(X^2) = \int_A^B \frac{x^2}{B-A}\,dx = \frac{B^3-A^3}{3(B-A)} = \frac{A^2+AB+B^2}{3}$$
        $$\sigma^2 = E(X^2) - \mu^2 = \frac{4(A^2+AB+B^2) - 3(A^2+2AB+B^2)}{12} = \mathbf{\frac{(B-A)^2}{12}}$$
      `
    },
    {
      id: "ex-6-4",
      code: "ex 6.4",
      kind: "ex",
      section: "6.1",
      page: "p.50",
      title: "公車等車時間（Uniform [0, 10]）",
      prompt: "公車每 10 分鐘一班，等車時間服從連續均勻分配。(a) 等超過 7 分鐘；(b) 等 2 到 7 分鐘之間。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$f(x) = \frac{1}{10},\ 0 \le x \le 10$：</p>
        <ul>
          <li>(a) $P(X > 7) = \int_7^{10}\frac{1}{10}\,dx = \mathbf{0.3}$</li>
          <li>(b) $P(2 < X < 7) = \int_2^7\frac{1}{10}\,dx = \mathbf{0.5}$</li>
        </ul>
      `
    },
    {
      id: "eg-6-2",
      code: "e.g. 6.2",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.12",
      title: "標準常態 Z 正查表",
      prompt: "標準常態分配中求面積：(a) $z = 1.84$ 右方；(b) $z = -1.97$ 與 $z = 0.86$ 之間。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $P(Z > 1.84) = 1 - 0.9671 = \mathbf{0.0329}$</li>
          <li>(b) $P(-1.97 < Z < 0.86) = 0.8051 - 0.0244 = \mathbf{0.7807}$（註：PDF 手寫式抄成 <code>-1.99</code>，但查表值 <code>0.0244</code> 實為 $-1.97$。）</li>
        </ul>
      `
    },
    {
      id: "eg-6-3",
      code: "e.g. 6.3",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.12",
      title: "標準常態反向查表求臨界值 k",
      prompt: "求標準常態分配中的 $k$：(a) $P(Z > k) = 0.3015$；(b) $P(k < Z < -0.18) = 0.4197$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $P(Z \le k) = 1 - 0.3015 = 0.6985 \implies k = \mathbf{0.52}$</li>
          <li>(b) $P(Z < k) = P(Z < -0.18) - 0.4197 = 0.4286 - 0.4197 = 0.0089 \implies k = \mathbf{-2.37}$</li>
        </ul>
      `
    },
    {
      id: "eg-6-4",
      code: "e.g. 6.4",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.13",
      title: "一般常態區間面積",
      prompt: "已知 $X \\sim N(\\mu=50,\\ \\sigma=10)$，求 $P(45 < X < 62)$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(45 < X < 62) = P(-0.5 < Z < 1.2) = 0.8849 - 0.3085 = \mathbf{0.5764}$$
      `
    },
    {
      id: "eg-6-5",
      code: "e.g. 6.5",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.13",
      title: "一般常態右尾面積",
      prompt: "已知 $X \\sim N(\\mu=300,\\ \\sigma=50)$，求 $P(X > 362)$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X > 362) = P(Z > 1.24) = 1 - 0.8925 = \mathbf{0.1075}$$
      `
    },
    {
      id: "eg-6-6",
      code: "e.g. 6.6",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.13",
      title: "給面積反求 x 值",
      prompt: "$X \\sim N(40, 6^2)$，求：(a) 左方面積 $45\%$ 之 $x$；(b) 右方面積 $14\%$ 之 $x$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $P(Z < z) = 0.45 \implies z = -0.13 \implies x = 40 + 6(-0.13) = \mathbf{39.22}$</li>
          <li>(b) $P(Z < z) = 1 - 0.14 = 0.86 \implies z = 1.08 \implies x = 40 + 6(1.08) = \mathbf{46.48}$</li>
        </ul>
      `
    },
    {
      id: "eg-6-7",
      code: "e.g. 6.7",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.14",
      title: "蓄電池壽命機率",
      prompt: "電池平均壽命 $3.0$ 年、標準差 $0.5$ 年（常態），求撐不到 $2.3$ 年的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X < 2.3) = P(Z < -1.4) = \mathbf{0.0808}$$
      `
    },
    {
      id: "eg-6-8",
      code: "e.g. 6.8",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.14",
      title: "燈泡壽命區間機率",
      prompt: "燈泡平均壽命 $800$ 小時、標準差 $40$ 小時，求壽命介於 $778$ 到 $834$ 小時的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(778 < X < 834) = P(-0.55 < Z < 0.85) = 0.8023 - 0.2912 = \mathbf{0.5111}$$
      `
    },
    {
      id: "eg-6-9",
      code: "e.g. 6.9",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.15",
      title: "滾珠軸承規格報廢率（雙尾）",
      prompt: "直徑 $\\mu = 3.0,\\ \\sigma = 0.005$，允收規格 $3.0 \\pm 0.01$（$[2.99, 3.01]$），求平均報廢率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$z = \pm\frac{0.01}{0.005} = \pm 2$，落在區間外的雙尾面積：</p>
        $$P(X < 2.99) + P(X > 3.01) = 2 \times P(Z < -2) = 2 \times 0.0228 = \mathbf{0.0456}$$
      `
    },
    {
      id: "eg-6-10",
      code: "e.g. 6.10",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.15",
      title: "反推 95% 合格規格公差 d",
      prompt: "尺寸 $\\mu = 1.50,\\ \\sigma = 0.2$，規格為 $1.50 \\pm d$。欲使規格涵蓋 $95\%$ 產品，求 $d$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>中間 $95\%$ 代表雙尾各 $0.025$：</p>
        $$P\left(Z < \frac{-d}{0.2}\right) = 0.025 \implies \frac{-d}{0.2} = -1.96 \implies d = \mathbf{0.392}$$
      `
    },
    {
      id: "eg-6-11",
      code: "e.g. 6.11",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.16",
      title: "電阻超過 43 歐姆比例",
      prompt: "電阻 $\\mu = 40,\\ \\sigma = 2$ 歐姆，求電阻超過 $43$ 歐姆之百分比。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X > 43) = P(Z > 1.5) = 1 - 0.9332 = \mathbf{0.0668}\ (6.68\%)$$
      `
    },
    {
      id: "eg-6-13",
      code: "e.g. 6.13",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.16",
      title: "成績常態調分取前 12% 為 A",
      prompt: "考試平均 $\\mu = 74,\\ \\sigma = 7$，前 $12\%$ 給 A，求最低 A 分數與最高 B 分數。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(Z < z) = 1 - 0.12 = 0.88 \implies z \approx 1.18 \implies x = 74 + 7(1.18) = 82.26$$
        <p class="solution-answer">若成績為整數，最低 A 為 <strong>83 分</strong>、最高 B 為 <strong>82 分</strong>。</p>
      `
    },
    {
      id: "eg-6-14",
      code: "e.g. 6.14",
      kind: "eg",
      section: "6.2-6.4",
      page: "p.17",
      title: "求成績之第 6 十分位數 D6",
      prompt: "承 e.g. 6.13（$\\mu = 74,\\ \\sigma = 7$），求第 6 十分位數 $D_6$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$D_6$ 即左側累積 $60\%$ 處：$P(Z < z) = 0.60 \implies z \approx 0.25$：</p>
        $$D_6 = 74 + 7(0.25) = \mathbf{75.75}$$
      `
    },
    {
      id: "ex-6-5",
      code: "ex 6.5",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.50",
      title: "標準常態基本查表六小題（PDF 額外收錄）",
      prompt: "求標準常態面積：(a) $z<-1.39$；(b) $z>1.96$；(c) $-2.16<z<-0.65$；(d) $z<1.43$；(e) $z>-0.89$；(f) $-0.48<z<1.74$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\mathbf{0.0823}$</li>
          <li>(b) $1 - 0.9750 = \mathbf{0.0250}$</li>
          <li>(c) $0.2578 - 0.0154 = \mathbf{0.2424}$</li>
          <li>(d) $\mathbf{0.9236}$</li>
          <li>(e) $1 - 0.1867 = \mathbf{0.8133}$</li>
          <li>(f) $0.9591 - 0.3156 = \mathbf{0.6435}$</li>
        </ul>
      `
    },
    {
      id: "ex-6-6",
      code: "ex 6.6",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.51",
      title: "標準常態反向查表四小題",
      prompt: "求 $z$ 使：(a) 右方面積 $0.3622$；(b) 左方面積 $0.1131$；(c) $0$ 到 $z$（$z>0$）面積 $0.4838$；(d) $-z$ 到 $z$ 面積 $0.9500$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\Phi(z) = 1 - 0.3622 = 0.6378 \implies z = \mathbf{0.35}$</li>
          <li>(b) $\Phi(z) = 0.1131 \implies z = \mathbf{-1.21}$</li>
          <li>(c) $\Phi(z) = 0.5 + 0.4838 = 0.9838 \implies z = \mathbf{2.14}$</li>
          <li>(d) $2(\Phi(z) - 0.5) = 0.95 \implies \Phi(z) = 0.9750 \implies z = \mathbf{1.96}$</li>
        </ul>
      `
    },
    {
      id: "ex-6-8",
      code: "ex 6.8",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.52",
      title: "常態分配正查、反查與中間對稱區間",
      prompt: "已知 $X \\sim N(\\mu=30,\\ \\sigma=6)$，求：(a) $x=17$ 右方；(b) $x=22$ 左方；(c) $32<X<41$；(d) 左面積 $80\%$ 之 $x$；(e) 包住中間 $75\%$ 面積的兩個 $x$。",
      isMust: true,
      hasErrata: false,
      mustReason: "一題涵蓋常態正查、單側反查與對稱中間面積反查（每尾 0.125）全套基本功！",
      solutionHtml: String.raw`
        <p>標準化 $Z = \frac{X - 30}{6}$：</p>
        <ul>
          <li>(a) $P(X > 17) = P(Z > -2.17) = 1 - 0.0150 = \mathbf{0.9850}$</li>
          <li>(b) $P(X < 22) = P(Z < -1.33) = \mathbf{0.0918}$</li>
          <li>(c) $P(32 < X < 41) = P(0.33 < Z < 1.83) = 0.9664 - 0.6293 = \mathbf{0.3371}$</li>
          <li>(d) $P(Z < z) = 0.80 \implies z = 0.84 \implies x = 30 + 6(0.84) = \mathbf{35.04}$</li>
          <li>(e) 中間 $75\%$ 代表左右兩尾合計 $0.25$、<strong>單尾各 $0.125$</strong>：
            $$P(Z < z_2) = 1 - 0.125 = 0.875 \implies z_2 = 1.15,\ z_1 = -1.15$$
            $$x_1 = 30 + 6(-1.15) = \mathbf{23.1}, \qquad x_2 = 30 + 6(1.15) = \mathbf{36.9}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-6-9",
      code: "ex 6.9",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.53",
      title: "一般常態正反查表綜合練習",
      prompt: "已知 $X \\sim N(18, 2.5^2)$，求：(a) $P(X<15)$；(b) $P(X<k)=0.2236$ 之 $k$；(c) $P(X>k)=0.1814$ 之 $k$；(d) $P(17<X<21)$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $P(Z < -1.2) = \mathbf{0.1151}$</li>
          <li>(b) $z = -0.76 \implies k = 18 - 2.5(0.76) = \mathbf{16.1}$</li>
          <li>(c) $\Phi(z) = 1 - 0.1814 = 0.8186 \implies z = 0.91 \implies k = 18 + 2.5(0.91) = \mathbf{20.275}$</li>
          <li>(d) $P(-0.4 < Z < 1.2) = 0.8849 - 0.3446 = \mathbf{0.5403}$</li>
        </ul>
      `
    },
    {
      id: "ex-6-10",
      code: "ex 6.10",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.53",
      title: "Chebyshev 保底 vs. 常態精確值",
      prompt: "Chebyshev 定理保證在 $\\mu \\pm 3\\sigma$ 內至少佔 $8/9$；若已知是常態分配，精確機率為何？",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(\mu - 3\sigma < X < \mu + 3\sigma) = P(-3 < Z < 3) = 0.9987 - 0.0013 = \mathbf{0.9974}$$
        <p style="font-size:0.86rem;color:var(--text-soft);">（不經四捨五入之精確計算為 $0.9973$，遠高於 Chebyshev 的 $8/9 \approx 0.8889$。）</p>
      `
    },
    {
      id: "ex-6-17",
      code: "ex 6.17",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.54",
      title: "馬達保固年限設定",
      prompt: "馬達平均壽命 $\\mu=10$ 年、$\\sigma=2$ 年（常態），製造商只願免費換新最壞的前 $3\%$，保固應定幾年？",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X < a) = 0.03 \implies z = -1.88 \implies a = 10 + 2(-1.88) = \mathbf{6.24\text{ 年}}$$
      `
    },
    {
      id: "ex-6-22",
      code: "ex 6.22",
      kind: "ex",
      section: "6.2-6.4",
      page: "p.55",
      title: "「與平均數相差（differ from the mean）」雙尾陷阱",
      prompt: "在常態分配資料中，與平均數相差（differ from the mean）：(a) 超過 $1.3\\sigma$；(b) 少於 $0.52\\sigma$ 的比例為何？",
      isMust: true,
      hasErrata: false,
      mustReason: "英文關鍵字 'differ from the mean' 代表絕對值距離 $|X-\\mu|$，漏乘雙尾直接扣一半！",
      solutionHtml: String.raw`
        <ul>
          <li>(a) 相差超過 $1.3\sigma$ 即 $|Z| > 1.3$（大於 $+1.3$ 與小於 $-1.3$ 兩側）：
            $$P(Z > 1.3) + P(Z < -1.3) = 2\big(1 - \Phi(1.3)\big) = 2(1 - 0.9032) = \mathbf{0.1936}\ (19.36\%)$$
          </li>
          <li>(b) 相差少於 $0.52\sigma$ 即 $-0.52 < Z < 0.52$：
            $$\Phi(0.52) - \Phi(-0.52) = 0.6985 - 0.3015 = \mathbf{0.3970}\ (39.70\%)$$
          </li>
        </ul>
      `
    },
    {
      id: "eg-6-15",
      code: "e.g. 6.15",
      kind: "eg",
      section: "6.5",
      page: "p.17",
      title: "常態逼近二項（少於 30 人康復）",
      prompt: "罕見疾病康復率 $p=0.4$，$n=100$ 人染病，求少於 30 人康復的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\mu = 100(0.4) = 40,\ \sigma = \sqrt{100(0.4)(0.6)} = \sqrt{24}$。「少於 30」是離散 $X \le 29$，往外擴半格至 $29.5$：</p>
        $$P_B(X \le 29) \approx P_N(X < 29.5) = P\left(Z < \frac{29.5 - 40}{\sqrt{24}}\right) = P(Z < -2.14) = \mathbf{0.0162}$$
      `
    },
    {
      id: "eg-6-16",
      code: "e.g. 6.16",
      kind: "eg",
      section: "6.5",
      page: "p.18",
      title: "純靠猜測答對 25 到 30 題",
      prompt: "80 題四選一單選題（$p=0.25$）純靠猜測，求答對 25 到 30 題（含）的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\mu = 80(0.25) = 20,\ \sigma = \sqrt{80(0.25)(0.75)} = \sqrt{15}$：</p>
        $$P_B(25 \le X \le 30) \approx P_N(24.5 < X < 30.5) = P(1.16 < Z < 2.71) = 0.9966 - 0.8770 = \mathbf{0.1196}$$
      `
    },
    {
      id: "ex-6-24",
      code: "ex 6.24",
      kind: "ex",
      section: "6.5",
      page: "p.56",
      title: "擲硬幣 400 次（區間、單點、雙尾逼近）",
      prompt: "擲公正硬幣 400 次，用常態逼近求正面數：(a) 介於 185 與 210（含）；(b) 恰 205 次；(c) 少於 176 或超過 227 次。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\mu = 200,\ \sigma = \sqrt{400(0.5)(0.5)} = 10$：</p>
        <ul>
          <li>(a) $P_N(184.5 < X < 210.5) = P(-1.55 < Z < 1.05) = 0.8531 - 0.0606 = \mathbf{0.7925}$</li>
          <li>(b) $P_N(204.5 < X < 205.5) = P(0.45 < Z < 0.55) = 0.7088 - 0.6736 = \mathbf{0.0352}$</li>
          <li>(c) $P_N(X < 175.5) + P_N(X > 227.5) = P(Z < -2.45) + 1 - P(Z < 2.75) = 0.0071 + (1 - 0.9970) = \mathbf{0.0101}$</li>
        </ul>
      `
    },
    {
      id: "ex-6-25",
      code: "ex 6.25",
      kind: "ex",
      section: "6.5",
      page: "p.57",
      title: "抽 100 個零件品管計畫（依題意用常態逼近）",
      prompt: "抽 100 個零件，若 $X=0$（無不良品）才繼續生產。依題意用常態逼近求繼續生產機率：(a) 不良率 $1\%$；(b) 惡化為 $5\%$。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $p=0.01 \implies \mu=1,\ \sigma^2=0.99$：
            $$P_B(X \le 0) \approx P_N(X < 0.5) = P\left(Z < \frac{0.5 - 1}{\sqrt{0.99}}\right) \approx P(Z < -0.50) = \mathbf{0.3085}$$
            <span style="font-size:0.86rem;color:var(--text-soft);">（註：因 $np=1<5$，逼近誤差較大，精確二項值為 $0.99^{100}=0.3660$。）</span>
          </li>
          <li>(b) $p=0.05,\ q=0.95 \implies \mu=5,\ \sigma^2 = 5 \times 0.95 = 4.75$：
            $$P_N(X < 0.5) = P\left(Z < \frac{0.5 - 5}{\sqrt{4.75}}\right) \approx P(Z < -2.06) = \mathbf{0.0197}$$
          </li>
        </ul>
        <div class="callout callout-errata">
          <div class="callout-title">⚠️ 筆誤提醒</div>
          <div>PDF 在 (b) 誤寫成 $\sigma^2 = 5 \times 0.99 = 4.75$，其中 <code>0.99</code> 應為 $q = 0.95$。</div>
        </div>
      `
    },
    {
      id: "ex-6-30",
      code: "ex 6.30",
      kind: "ex",
      section: "6.5",
      page: "p.58",
      title: "藥廠 80% 療效檢驗（±0.5 連續性修正必考題）",
      prompt: "政府抽檢 $n=100$ 位病人，若至少 75 人治癒（$X\\ge 75$）才接受宣稱。(a) 若真實治癒率為 $0.8$，遭拒絕的機率？(b) 若真實治癒率為 $0.7$，被接受的機率？",
      isMust: true,
      hasErrata: false,
      mustReason: "(a) 是 $X < 75$、(b) 是 $X \\ge 75$，經過「先轉含等號整數再擴半格」，兩題臨界線全都是 74.5！",
      solutionHtml: String.raw`
        <ul>
          <li>(a) 真實 $p = 0.8 \implies \mu = 80,\ \sigma = \sqrt{100(0.8)(0.2)} = 4$。
            「遭拒絕」是離散 $X < 75 \implies \mathbf{X \le 74}$，右界 $+0.5$ 得 $74.5$：
            $$P_N(X < 74.5) = P\left(Z < \frac{74.5 - 80}{4}\right) = P(Z < -1.375 \approx -1.38) = \mathbf{0.0838}$$
          </li>
          <li>(b) 真實 $p = 0.7 \implies \mu = 70,\ \sigma = \sqrt{100(0.7)(0.3)} = \sqrt{21}$。
            「被接受」是離散 $\mathbf{X \ge 75}$，左界 $-0.5$ 同樣得 $74.5$：
            $$P_N(X > 74.5) = P\left(Z > \frac{74.5 - 70}{\sqrt{21}}\right) \approx P(Z > 0.98) = 1 - 0.8365 = \mathbf{0.1635}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-6-34",
      code: "ex 6.34",
      kind: "ex",
      section: "6.5",
      page: "p.59",
      title: "擲兩顆骰子 180 次出現點數和 7",
      prompt: "兩骰擲 180 次，和為 7 機率 $p = 6/36 = 1/6$。求出現次數：(a) 至少 25 次；(b) 33 到 41 次（含）；(c) 恰 30 次。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\mu = 180(1/6) = 30,\ \sigma = \sqrt{180(1/6)(5/6)} = 5$：</p>
        <ul>
          <li>(a) $P_N(X > 24.5) = P(Z > -1.1) = 1 - 0.1357 = \mathbf{0.8643}$</li>
          <li>(b) $P_N(32.5 < X < 41.5) = P(0.5 < Z < 2.3) = 0.9893 - 0.6915 = \mathbf{0.2978}$</li>
          <li>(c) $P_N(29.5 < X < 30.5) = P(-0.1 < Z < 0.1) = 0.5398 - 0.4602 = \mathbf{0.0796}$</li>
        </ul>
      `
    },
    {
      id: "eg-6-17",
      code: "e.g. 6.17",
      kind: "eg",
      section: "6.6",
      page: "p.18",
      title: "Exponential + Binomial（零件 8 年存活數）",
      prompt: "零件壽命為平均 $\\beta=5$ 年的指數分配。5 個獨立系統各裝 1 個，求 8 年後至少還有 2 個運作的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ol>
          <li>單個撐過 8 年：$p = P(T > 8) = e^{-8/5} = e^{-1.6} \approx 0.2019 \approx 0.2$</li>
          <li>5 個中至少 2 個存活（$Y \sim \text{Bin}(5, 0.2)$）：
            $$P(Y \ge 2) = 1 - \sum_{x=0}^1 \binom{5}{x}(0.2)^x(0.8)^{5-x} = 1 - 0.7373 = \mathbf{0.2627}$$
          </li>
        </ol>
      `
    },
    {
      id: "eg-6-18",
      code: "e.g. 6.18",
      kind: "eg",
      section: "6.6",
      page: "p.19",
      title: "總機來電 2 通時間（Gamma ↔ Poisson 雙解法）",
      prompt: "總機來電遵循 Poisson Process，平均每分鐘 $\\lambda = 5$ 通。求在 2 通電話到達之前經過不超過 1 分鐘（$T_2 \\le 1$）的機率。",
      isMust: true,
      hasErrata: true,
      mustReason: "完美示範第 5 與第 6 章的對偶橋樑，且原 PDF 手寫筆記在 Poisson 解法犯了方向與查表雙重錯誤，必看訂正！",
      solutionHtml: String.raw`
        <div class="callout callout-errata">
          <div class="callout-title">🚨 糾正 PDF p.19 筆記雙重錯誤</div>
          <div>原筆記在 <code>(by poisson)</code> 誤寫為 $P(X<2) = P(X\le 1) = 0.1247$：不僅「方向寫反」（$T_2 \le 1$ 應對應 $X \ge 2$），而且 $P(X\le 1) = 6e^{-5} = 0.0404$，不是 <code>0.1247</code>（那是 $P(X\le 2)$）。</div>
        </div>
        <ul>
          <li><strong>法一｜Gamma 積分</strong>（$\alpha=2,\ \beta = 1/\lambda = 1/5$）：
            $$f(t) = \frac{1}{(1/5)^2\Gamma(2)} t^{2-1}e^{-5t} = 25te^{-5t}$$
            $$P(T_2 \le 1) = \int_0^1 25te^{-5t}\,dt = \big[-5te^{-5t} - e^{-5t}\big]_0^1 = (-5e^{-5} - e^{-5}) - (-1) = \mathbf{1 - 6e^{-5}} \approx \mathbf{0.9596}$$
          </li>
          <li><strong>法二｜Poisson 對偶秒算</strong>（1 分鐘內至少進來 2 通電話，$X \sim \text{Poisson}(\mu = 5 \times 1 = 5)$）：
            $$P(X \ge 2) = 1 - P(X \le 1) = 1 - \left(\frac{e^{-5}5^0}{0!} + \frac{e^{-5}5^1}{1!}\right) = \mathbf{1 - 6e^{-5}} \approx \mathbf{0.9596}$$
          </li>
        </ul>
      `
    },
    {
      id: "eg-6-19",
      code: "e.g. 6.19",
      kind: "eg",
      section: "6.6",
      page: "p.20",
      title: "不完全 Gamma 函數查表",
      prompt: "毒物反應白鼠存活週數服從 Gamma 分配，$\\alpha=5,\\ \\beta=10$，求存活不超過 60 週的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>令 $u = t/\beta = t/10$，上限變為 $60/10 = 6$：</p>
        $$P(X \le 60) = \int_0^6 \frac{1}{\Gamma(5)} u^{5-1}e^{-u}\,du \approx \mathbf{0.7150}$$
        <p style="font-size:0.86rem;color:var(--text-soft);">（利用對偶公式驗算：$P(\text{Poisson}(6) \ge 5) = 1 - \sum_{x=0}^4 \frac{e^{-6}6^x}{x!} = 0.7149$。）</p>
      `
    },
    {
      id: "eg-6-21",
      code: "e.g. 6.21",
      kind: "eg",
      section: "6.6",
      page: "p.21",
      title: "洗衣機大修等待年數（Exponential）",
      prompt: "大修前等待年數 $Y$ 具指數密度 $f(y)=\\frac{1}{4}e^{-y/4}\\ (y\\ge 0)$，求 $P(Y>6)$ 及第一年就需大修 $P(Y<1)$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>$P(Y > 6) = e^{-6/4} = e^{-1.5} \approx \mathbf{0.2231}$</li>
          <li>$P(Y < 1) = 1 - e^{-1/4} \approx \mathbf{0.2212}$（PDF 寫三位數 <code>0.221</code>）</li>
        </ul>
      `
    },
    {
      id: "ex-6-40",
      code: "ex 6.40",
      kind: "ex",
      section: "6.6",
      page: "p.60",
      title: "城市供水不足機率（Gamma）",
      prompt: "每日用水量（百萬公升）服從 Gamma（$\\alpha=2,\\ \\beta=3$）。若供水上限為 9 百萬公升，求供水不足的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X > 9) = \int_9^\infty \frac{1}{3^2\Gamma(2)} t e^{-t/3}\,dt = \frac{1}{9}\big[-3te^{-t/3} - 9e^{-t/3}\big]_9^\infty = \frac{36e^{-3}}{9} = \mathbf{4e^{-3}} \approx 0.1991$$
      `
    },
    {
      id: "ex-6-42",
      code: "ex 6.42",
      kind: "ex",
      section: "6.6",
      page: "p.61",
      title: "熱泵維修時間（Gamma）",
      prompt: "維修時間 $X$（小時）服從 Gamma（$\\alpha=2,\\ \\beta=1/2$）。求：(a) 至多 1 小時；(b) 至少 2 小時。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$f(t) = \frac{1}{(1/2)^2\Gamma(2)}t e^{-2t} = 4te^{-2t}$：</p>
        <ul>
          <li>(a) $P(X \le 1) = \int_0^1 4te^{-2t}\,dt = \big[-2te^{-2t} - e^{-2t}\big]_0^1 = \mathbf{1 - 3e^{-2}} \approx 0.5940$</li>
          <li>(b) $P(X \ge 2) = \int_2^\infty 4te^{-2t}\,dt = \mathbf{5e^{-4}} \approx 0.0916$</li>
        </ul>
      `
    },
    {
      id: "ex-6-44",
      code: "ex 6.44",
      kind: "ex",
      section: "6.6",
      page: "p.62",
      title: "Gamma 反求參數＋二次分部積分＋Poisson 驗算",
      prompt: "每日用電量 $X$ 服從 Gamma 分配，已知 $\\mu = 6,\\ \\sigma^2 = 12$。(a) 求 $\\alpha$ 與 $\\beta$；(b) 求 $P(X > 12)$。",
      isMust: true,
      hasErrata: false,
      mustReason: "集齊 $\\mu=\\alpha\\beta$ 與 $\\sigma^2=\\alpha\\beta^2$ 反推、$t^2 e^{-t/2}$ 二次 D-I 分部積分、以及 5 秒 Poisson 對偶驗算神招！",
      solutionHtml: String.raw`
        <ul>
          <li>(a) 兩式相除秒解參數：
            $$\beta = \frac{\alpha\beta^2}{\alpha\beta} = \frac{12}{6} = \mathbf{2}, \qquad \alpha = \frac{6}{2} = \mathbf{3}$$
          </li>
          <li>(b) $\beta^3\Gamma(3) = 2^3 \cdot 2! = 16$，用 D-I 表格法積分 $\int_{12}^\infty \frac{1}{16} t^2 e^{-t/2}\,dt$：
            $$P(X > 12) = \frac{1}{16}\Big[-2t^2e^{-t/2} - 8te^{-t/2} - 16e^{-t/2}\Big]_{12}^\infty = \frac{(288 + 96 + 16)e^{-6}}{16} = \frac{400}{16}e^{-6} = \mathbf{25e^{-6}} \approx \mathbf{0.0620}$$
          </li>
        </ul>
        <div class="callout callout-insight">
          <div class="callout-title">💡 5 秒考場驗算神技</div>
          <div>$\text{Gamma}(3, 2) > 12 \iff \text{Poisson}(\mu = 12/2 = 6) \le 2$：
            $$e^{-6}\left(1 + 6 + \frac{6^2}{2!}\right) = e^{-6}(1 + 6 + 18) = \mathbf{25e^{-6}}$$
          </div>
        </div>
      `
    },
    {
      id: "ex-6-45",
      code: "ex 6.45",
      kind: "ex",
      section: "6.6",
      page: "p.63",
      title: "餐廳服務時間＋天數（Exponential + Binomial 跨章壓軸）",
      prompt: "自助餐廳服務每位客人時間服從指數分配（平均 $\\beta=4$ 分鐘）。求未來 6 天中，至少有 4 天都在 3 分鐘內獲得服務的機率。",
      isMust: true,
      hasErrata: false,
      mustReason: "完美串聯 Ch 6（指數分配算單天機率）與 Ch 5（二項分配算多天累積）的跨章壓軸題。",
      solutionHtml: String.raw`
        <ol>
          <li><strong>Step 1（Ch 6 指數分配）</strong>：單天在 3 分鐘內獲得服務的機率 $p_t$（$\beta = 4$）：
            $$p_t = P(X < 3) = \int_0^3 \frac{1}{4}e^{-t/4}\,dt = 1 - e^{-3/4} \approx 0.5276$$
          </li>
          <li><strong>Step 2（Ch 5 二項分配）</strong>：設 $Y$ 為 6 天中達成的天數，$Y \sim \text{Bin}(6,\ p_t)$：
            $$P(Y \ge 4) = \binom{6}{4}p_t^4(1-p_t)^2 + \binom{6}{5}p_t^5(1-p_t)^1 + \binom{6}{6}p_t^6 \approx \mathbf{0.3969}$$
            <span style="font-size:0.86rem;color:var(--text-soft);">（PDF 寫 <code>0.3968</code> 屬中間四捨五入差異。）</span>
          </li>
        </ol>
      `
    },
    {
      id: "ex-6-55",
      code: "ex 6.55",
      kind: "ex",
      section: "6.6",
      page: "p.64",
      title: "電腦系統反應時間（Exponential）",
      prompt: "反應時間服從指數分配且平均 $\\beta=3$ 秒。(a) 超過 5 秒；(b) 超過 10 秒。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $P(T > 5) = \mathbf{e^{-5/3}} \approx 0.1889$</li>
          <li>(b) $P(T > 10) = \mathbf{e^{-10/3}} \approx 0.0357$</li>
        </ul>
      `
    },
    {
      id: "ex-6-62",
      code: "ex 6.62",
      kind: "rev",
      section: "6.6",
      page: "p.64",
      title: "Poisson 來電間隔等待時間",
      prompt: "來電每小時 $\\lambda = 6$ 通（間隔時間為 $\\beta=1/6$ 小時之指數分配），求兩通相鄰來電間隔超過 15 分鐘（$1/4$ 小時）的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(T > 1/4) = \int_{1/4}^\infty 6e^{-6t}\,dt = e^{-6(1/4)} = \mathbf{e^{-3/2}} \approx 0.2231$$
      `
    },
    {
      id: "ex-6-66",
      code: "ex 6.66",
      kind: "rev",
      section: "6.6",
      page: "p.65",
      title: "設備故障率 λ = 0.01/hr",
      prompt: "設備故障率恆為 $\\lambda = 0.01$/小時（Exponential）。(a) 平均故障時間？(b) 撐過 200 小時未發生故障之機率？",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\beta = \frac{1}{\lambda} = \frac{1}{0.01} = \mathbf{100\text{ 小時}}$</li>
          <li>(b) $P(T > 200) = e^{-200/100} = \mathbf{e^{-2}} \approx 0.1353$</li>
        </ul>
      `
    },
    {
      id: "ex-6-72",
      code: "ex 6.72",
      kind: "rev",
      section: "6.6",
      page: "p.65",
      title: "發生 2 次故障前經過少於 200 小時（Gamma）",
      prompt: "承 ex 6.66（$\\beta = 100$），求在發生 2 次故障（$\\alpha = 2$）之前經過少於 200 小時的機率。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <p>$\alpha = 2,\ \beta = 100$：</p>
        $$P(X < 200) = \int_0^{200} \frac{1}{100^2\Gamma(2)} x e^{-x/100}\,dx = \big[-x/100 \cdot e^{-x/100} - e^{-x/100}\big]_0^{200} = \mathbf{1 - 3e^{-2}} \approx 0.5940$$
        <p style="font-size:0.86rem;color:var(--text-soft);">（註：PDF 筆記誤寫積分左端為 <code>P(X=x)</code>，應為 $P(X<200)$；數值 $0.59399\dots$ 四捨五入應為 <code>0.5940</code>，查 Gamma 表亦為 <code>0.594</code>。）</p>
      `
    },
    {
      id: "ex-6-73",
      code: "ex 6.73",
      kind: "rev",
      section: "6.6",
      page: "p.66",
      title: "承 ex 6.72 求期望值與變異數",
      prompt: "承 ex 6.72（$\\alpha=2,\\ \\beta=100$），求發生 2 次故障前經過時間的期望值與變異數。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$\mu = \alpha\beta = 2 \times 100 = \mathbf{200\text{ 小時}}, \qquad \sigma^2 = \alpha\beta^2 = 2 \times 100^2 = \mathbf{20,000\text{ 小時}^2}$$
      `
    }
  ]
};
