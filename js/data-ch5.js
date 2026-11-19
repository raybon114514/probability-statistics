window.CH5_DATA = {
  id: "ch5",
  shortTitle: "Ch 5 離散分配",
  title: "Chapter 5：Discrete Probability Distributions（離散機率分配）",
  subtitle:
    "離散分配看似很多個，其實背後只分成兩大家族：「重複試驗／抽樣家族（Bernoulli / Hypergeometric）」與「單位時間空間計數（Poisson）」。先把模型故事認出來，公式自然就寫得出來。",
  accent: "indigo",
  scopeNote:
    "完整收錄期末考範圍 PDF 之 41 題 Ch 5 例題與習題，並從 solution5.pdf 補齊投影片 5.2 列出但未印於 PDF 的 ex 5.18（合計 42 題）。另投影片 5.5 列出之 ex 5.95 未收錄於該份期末考 PDF 與解答中。",
  lectureSections: [
    {
      shortHeading: "5.1 Discrete Uniform",
      heading: "5.1 Discrete Uniform Distribution（離散均勻分配）",
      html: String.raw`
        <p>當隨機變數 $X$ 只會取有限個數值 $x_1, x_2, \dots, x_k$，且每一個值出現的機會<strong>完全相同</strong>（公平抽籤、擲單顆公正骰子），就稱為離散均勻分配：</p>
        <div class="formula-box">
          $$f(x) = \frac{1}{k}, \quad x = x_1, x_2, \dots, x_k$$
          $$\mu = \sum_{i=1}^k x_i f(x_i) = \frac{\sum_{i=1}^k x_i}{k}, \qquad \sigma^2 = \sum_{i=1}^k (x_i - \mu)^2 f(x_i) = \frac{\sum_{i=1}^k (x_i - \mu)^2}{k}$$
        </div>
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ 考場防呆</div>
          <div>從編號 $1$ 到 $10$ 中「只抽 1 張籤」（如 <code>ex 5.3</code>），是單次等機率抽樣，屬於 Discrete Uniform，<strong>絕對不能套用 Binomial</strong>！</div>
        </div>
      `
    },
    {
      shortHeading: "5.2 Binomial & Multinomial",
      heading: "5.2 Binomial and Multinomial Distributions（二項與多項分配）",
      html: String.raw`
        <p>一切重複試驗模型都建立在 <strong>Bernoulli Process（白努力過程）</strong> 四大條件上：① 由固定 $n$ 次試驗組成（$n > 0$）；② 每次結果只分「成功」與「失敗」；③ 每次成功機率 $p$ 維持不變（$q = 1-p$）；④ 各次試驗彼此獨立。</p>
        <div class="formula-box">
          $$\text{Binomial PMF：} f(x) = \binom{n}{x}p^x q^{n-x}, \quad 0 \le x \le n, \qquad \mu = np, \qquad \sigma^2 = npq$$
          $$\text{Multinomial PMF：} f(x_1,\dots,x_k) = \frac{n!}{x_1!x_2!\cdots x_k!}p_1^{x_1}p_2^{x_2}\cdots p_k^{x_k}, \quad \sum_{i=1}^k x_i = n,\ \sum_{i=1}^k p_i = 1$$
        </div>
        <div class="callout callout-tip">
          <div class="callout-title">💡 累積二項機率表查表鐵律</div>
          <div>課本附表給的是累積機率 $B(r) = P(X \le r) = \sum_{x=0}^r \binom{n}{x}p^x q^{n-x}$。離散分配<strong>下界永遠要減 1</strong>：
            <br />$P(X = a) = F(a) - F(a-1)$，$P(a \le X \le b) = F(b) - F(a-1)$，$P(X < a) = F(a-1)$，$P(X > a) = 1 - F(a)$。
          </div>
        </div>
      `
    },
    {
      shortHeading: "5.3 Hypergeometric",
      heading: "5.3 Hypergeometric Distribution（超幾何與多變量超幾何分配）",
      html: String.raw`
        <p>當母體大小有限（共 $N$ 個，內含 $k$ 個目標物）且採<strong>不放回抽樣（without replacement）</strong>抽取 $n$ 個時，每次抽出後成功比例都會改變、各次不再獨立，必須使用超幾何分配：</p>
        <div class="formula-box">
          $$f(x) = \frac{\binom{k}{x}\binom{N-k}{n-x}}{\binom{N}{n}}, \qquad \mu = \frac{nk}{N}, \qquad \sigma^2 = \underbrace{\frac{N-n}{N-1}}_{\text{有限母體修正}} \cdot n \cdot \frac{k}{N}\left(1-\frac{k}{N}\right)$$
        </div>
        <ul>
          <li><strong>逼近二項條件</strong>：當抽樣數相對母體非常小時（經驗法則 $n/N \le 0.05$），不放回與放回差異微乎其微，可用 $p = k/N$ 的 Binomial 逼近。</li>
          <li><strong>多類別推廣（Multivariate Hypergeometric）</strong>：若母體有 $a_1, \dots, a_k$ 個各類物件（$\sum a_i = N$），不放回抽 $n$ 個得 $(x_1,\dots,x_k)$，機率為 $\frac{\binom{a_1}{x_1}\cdots\binom{a_k}{x_k}}{\binom{N}{n}}$。</li>
        </ul>
      `
    },
    {
      shortHeading: "5.4 Negative Binomial & Geometric",
      heading: "5.4 Negative Binomial & Geometric（負二項與幾何分配）",
      html: String.raw`
        <p><strong>別跟 Binomial 搞混！</strong> Binomial 是「固定總次數 $n$，數成功次數 $X$」；Negative Binomial 則是「<strong>固定目標成功次數 $k$，數總共要試幾次 $X$</strong>」。</p>
        <div class="formula-box">
          $$\text{Negative Binomial：} f(x) = \binom{x-1}{k-1} p^{k-1} q^{x-k} \cdot p = \binom{x-1}{k-1} p^k q^{x-k}, \quad x = k, k+1, k+2, \dots$$
          $$\text{Geometric (} k=1 \text{ 特例)：} f(x) = pq^{x-1}, \quad x = 1, 2, 3, \dots, \qquad \mu = \frac{1}{p}, \qquad \sigma^2 = \frac{1-p}{p^2}$$
        </div>
        <div class="callout callout-insight">
          <div class="callout-title">🎯 最後一格卡位直覺法</div>
          <div>要在第 $x$ 次試驗剛好拿到第 $k$ 次成功，代表<strong>第 $x$ 次必須是成功</strong>（機率 $p$，不能與前面混排），而前面 $x-1$ 次裡面只要任選 $k-1$ 個位置成功、其餘 $x-k$ 次失敗即可！</div>
        </div>
      `
    },
    {
      shortHeading: "5.5 Poisson Distribution",
      heading: "5.5 Poisson Distribution（卜瓦松分配與二項逼近）",
      html: String.raw`
        <p><strong>Poisson Process 三大假設</strong>：① 互不重疊時間區間內的發生次數彼此獨立（no memory）；② 極短區間 $\Delta t$ 內發生單次事件的機率正比於區間長度；③ 極短區間內發生 2 次以上事件的機率趨近於 $0$。</p>
        <div class="formula-box">
          $$f(x) = \frac{e^{-\lambda t}(\lambda t)^x}{x!}, \quad x = 0, 1, 2, \dots, \qquad \mu = \lambda t, \qquad \sigma^2 = \lambda t$$
          $$\text{二項逼近（} n \text{ 很大、} p \text{ 趨近 } 0 \text{、} np \text{ 固定）：} \binom{n}{x}p^x q^{n-x} \approx \frac{e^{-np}(np)^x}{x!}$$
        </div>
        <div class="callout callout-tip">
          <div class="callout-title">📌 $\lambda$ 與 $\mu = \lambda t$ 記號提醒</div>
          <div>標準寫法中 $\lambda$ 是單位時間發生率、$t$ 是時間區間，總平均為 $\mu = \lambda t$。但若題目直接說「每年的次數服從 $\lambda = 5$ 的 Poisson 分配」，則該題已把單位區間固定為 $t = 1$（年），故 $\mu = \lambda t = 5$。</div>
        </div>
      `
    }
  ],
  summaryTable: {
    headers: ["分配名稱", "適用情境關鍵字", "PMF f(x)", "期望值 μ", "變異數 σ²"],
    rows: [
      [
        "Discrete Uniform",
        "有限 k 個值，單次公平等機率",
        String.raw`$\frac{1}{k}$`,
        String.raw`$\frac{\sum x_i}{k}$`,
        String.raw`$\frac{\sum(x_i-\mu)^2}{k}$`
      ],
      [
        "Binomial",
        "固定 n 次獨立試驗，數成功次數",
        String.raw`$\binom{n}{x}p^x q^{n-x}$`,
        String.raw`$np$`,
        String.raw`$npq$`
      ],
      [
        "Multinomial",
        "固定 n 次獨立試驗，k 種互斥類別",
        String.raw`$\frac{n!}{x_1!\cdots x_k!}p_1^{x_1}\cdots p_k^{x_k}$`,
        String.raw`$np_i$`,
        String.raw`$np_i(1-p_i)$`
      ],
      [
        "Hypergeometric",
        "有限母體 N 不放回抽 n 個",
        String.raw`$\frac{\binom{k}{x}\binom{N-k}{n-x}}{\binom{N}{n}}$`,
        String.raw`$\frac{nk}{N}$`,
        String.raw`$\frac{N-n}{N-1}\cdot n\frac{k}{N}\left(1-\frac{k}{N}\right)$`
      ],
      [
        "Negative Binomial",
        "反覆試驗直到第 k 次成功才停",
        String.raw`$\binom{x-1}{k-1}p^k q^{x-k}$`,
        String.raw`$\frac{k}{p}$`,
        String.raw`$\frac{kq}{p^2}$`
      ],
      [
        "Geometric",
        "首次成功所需次數（k = 1）",
        String.raw`$pq^{x-1}$`,
        String.raw`$\frac{1}{p}$`,
        String.raw`$\frac{1-p}{p^2}$`
      ],
      [
        "Poisson",
        "時間／空間區間 t 內事件發生數",
        String.raw`$\frac{e^{-\lambda t}(\lambda t)^x}{x!}$`,
        String.raw`$\lambda t$`,
        String.raw`$\lambda t$`
      ]
    ]
  },
  errata: [
    {
      title: "ex 5.52（PDF p.42）｜機率代入錯誤（重大）",
      html: String.raw`題目給定染病機率為 $p = 1/6$，但 PDF 手寫筆記誤代入 $1/2$ 寫成 $\binom{7}{1}(1/2)^1(1/2)^6\cdot(1/2)$。正確算式為 $\binom{7}{1}(1/6)^1(5/6)^6(1/6) \approx \mathbf{0.0651}$。`
    },
    {
      title: "ex 5.9(c)（PDF p.36）｜紅筆減法計算筆誤",
      html: String.raw`手寫計算 $P(X>5) = 1 - P(X\le 5) = 1 - 0.8516$ 時，紅筆筆誤寫成 <code>0.1464</code>，正確減法應為 <strong><code>0.1484</code></strong>（與 <code>solution5.pdf</code> 一致）。`
    },
    {
      title: "e.g. 5.6（PDF p.5）｜初稿混淆 P(X=6) 與 P(X≥6)",
      html: String.raw`左側藍筆寫 <code>P(X=6) = 0.0473</code>，實際上 $\binom{10}{6}(0.3)^6(0.7)^4 = 0.0368$；而 <code>0.0473</code> 是檢驗猜測時應求的極端尾端機率 $P(X \ge 6) = 1 - P(X \le 5)$。`
    },
    {
      title: "ex 5.65（PDF p.43）｜回答筆記紅字提問「why λ=5 ⇒ λt=5=μ, t=1 (per year)?」",
      html: String.raw`完全正確！因為題目定義「<strong>每年</strong>發生災難的車輛數（number of cars per year）為 $\lambda = 5$ 的 Poisson 變數」，且 (a)、(b) 小題問的同樣是「每 1 年」，速率時間單位與詢問區間一致為 1 年，故 $t = 1 \implies \mu = \lambda t = 5 \times 1 = 5$。`
    },
    {
      title: "e.g. 5.16（p.9）＆ ex 5.62（solution5.pdf）｜小筆誤提醒",
      html: String.raw`<code>e.g. 5.16</code> 手寫算式左側誤寫成 $P(X=x)$（應為 $P(X=5)$）；另外 <code>solution5.pdf</code> 中的 <code>ex 5.62</code> 把 $\mu = np = 1875 \times 0.004 = 7.5$ 誤印為 <code>5.7</code>，但其後數值 <code>0.1321</code> 與 <code>0.3376</code> 皆是用正確的 $\mu = 7.5$ 所查得。`
    }
  ],
  mustExamIds: ["eg-5-3", "ex-5-36", "ex-5-37", "eg-5-14", "ex-5-43", "ex-5-82"],
  problems: [
    {
      id: "ex-5-3",
      code: "ex 5.3",
      kind: "ex",
      section: "5.1",
      page: "p.35",
      title: "抽編號籤（Discrete Uniform）",
      prompt: "從 10 名員工中隨機抽一張編號 1 到 10 的標籤，寫出機率分配公式並求抽中號碼小於 4 的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>單次公平抽 1 張籤，每個號碼機率均為 $1/10$，屬於 <strong>Discrete Uniform</strong>（注意不可誤用 Binomial）：</p>
        $$f(x) = \frac{1}{10}, \quad x = 1, 2, \dots, 10$$
        $$P(X < 4) = \sum_{x=1}^3 \frac{1}{10} = \mathbf{\frac{3}{10}} = 0.3$$
      `
    },
    {
      id: "eg-5-2",
      code: "e.g. 5.2",
      kind: "eg",
      section: "5.2",
      page: "p.3",
      title: "罕見疾病康復人數（Binomial 累積表）",
      prompt: "康復機率 $p = 0.4$，共有 $n = 15$ 名病患。求：(a) 至少 10 人康復；(b) 3 到 8 人康復；(c) 恰好 5 人康復。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$X \sim \text{Binomial}(n=15,\ p=0.4)$，利用累積二項表 $F(r) = P(X \le r)$：</p>
        <ul>
          <li>(a) $P(X \ge 10) = 1 - P(X \le 9) = 1 - 0.9662 = \mathbf{0.0338}$</li>
          <li>(b) $P(3 \le X \le 8) = F(8) - F(2) = 0.9050 - 0.0271 = \mathbf{0.8779}$（精確值 $0.8778$）</li>
          <li>(c) $P(X = 5) = F(5) - F(4) = 0.4032 - 0.2173 = \mathbf{0.1859}$</li>
        </ul>
      `
    },
    {
      id: "eg-5-3",
      code: "e.g. 5.3",
      kind: "eg",
      section: "5.2",
      page: "p.4",
      title: "雙層嵌套 Binomial 驗貨抽檢",
      prompt: "電子零件不良率 $3\%$。(a) 單批隨機抽 20 個，求至少 1 個不良品之機率；(b) 若進貨 10 批、每批抽 20 個，求恰有 3 批驗出至少 1 個不良品的機率。",
      isMust: true,
      hasErrata: false,
      mustReason: "標準「兩層隨機變數嵌套」必考母題：第一層算單批不良機率，第二層直接把它當成新成功機率 $p'$。",
      solutionHtml: String.raw`
        <ol>
          <li><strong>第一層（單批內抽檢）</strong>：設 $X$ 為 20 個中的不良品數，$X \sim \text{Bin}(20, 0.03)$。用補事件求至少 1 個不良品：
            $$P(X \ge 1) = 1 - P(X = 0) = 1 - \binom{20}{0}(0.03)^0(0.97)^{20} = 1 - (0.97)^{20} \approx \mathbf{0.4562}$$
            （註：PDF 手寫分母組合數寫成 $C^{20}_{20}$，數值同為 $1 = C^{20}_0$。）
          </li>
          <li><strong>第二層（跨 10 批貨）</strong>：設 $Y$ 為 10 批中「驗出至少 1 個不良品」的批數，此時單批成功機率為 $p' = 0.4562$，即 $Y \sim \text{Bin}(10,\ 0.4562)$：
            $$P(Y = 3) = \binom{10}{3}(0.4562)^3(1 - 0.4562)^7 = 120(0.4562)^3(0.5438)^7 \approx \mathbf{0.1602}$$
          </li>
        </ol>
      `
    },
    {
      id: "eg-5-4",
      code: "e.g. 5.4",
      kind: "eg",
      section: "5.2",
      page: "p.4",
      title: "飲水井汙染測試",
      prompt: "假設 $30\%$ 飲水井含雜質，隨機抽 10 口井檢測。(a) 恰 3 口汙染；(b) 超過 3 口汙染。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$X \sim \text{Bin}(10,\ 0.3)$：</p>
        <ul>
          <li>(a) $P(X = 3) = F(3) - F(2) = 0.6496 - 0.3828 = \mathbf{0.2668}$</li>
          <li>(b) $P(X > 3) = 1 - P(X \le 3) = 1 - 0.6496 = \mathbf{0.3504}$</li>
        </ul>
      `
    },
    {
      id: "eg-5-6",
      code: "e.g. 5.6",
      kind: "eg",
      section: "5.2",
      page: "p.5",
      title: "以尾端機率檢驗 30% 汙染猜測",
      prompt: "承 e.g. 5.4，抽 10 口井發現 6 口汙染，請以機率陳述評估「30% 汙染」猜測是否合理。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <div class="callout callout-errata">
          <div class="callout-title">⚠️ 勘誤修正</div>
          <div>PDF 左側藍筆誤寫成 <code>P(X=6) = 0.0473</code>；其實 $P(X=6)=0.0368$，而 <code>0.0473</code> 是檢驗假設時要看的極端尾端機率 $P(X \ge 6)$。</div>
        </div>
        $$P(X \ge 6) = 1 - P(X \le 5) = 1 - 0.9527 = \mathbf{0.0473}$$
        <p class="solution-answer">結論：若真實汙染率只有 $30\%$，出現 6 口或以上汙染的機率僅約 $4.73\%$，相當罕見，故強烈懷疑實際汙染情況比 $30\%$ 更嚴重。</p>
      `
    },
    {
      id: "eg-5-7",
      code: "e.g. 5.7",
      kind: "eg",
      section: "5.2",
      page: "p.5",
      title: "機場三跑道降落分配（Multinomial）",
      prompt: "三條跑道使用機率分別為 $2/9, 1/6, 11/18$。求 6 架飛機以 $(2, 1, 3)$ 方式降落的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>套用 Multinomial PMF（確認 $2/9 + 1/6 + 11/18 = 1$）：</p>
        $$P = \frac{6!}{2!1!3!}\left(\frac{2}{9}\right)^2\left(\frac{1}{6}\right)^1\left(\frac{11}{18}\right)^3 \approx \mathbf{0.1127}$$
      `
    },
    {
      id: "ex-5-9",
      code: "ex 5.9",
      kind: "ex",
      section: "5.2",
      page: "p.36",
      title: "卡車輪胎爆胎測試（Binomial）",
      prompt: "測試發現 $25\%$ 卡車在無爆胎下無法完賽（即爆胎率 $p = 0.25$）。接下來測試 $n = 15$ 輛，求：(a) 3 到 6 輛爆胎；(b) 少於 4 輛爆胎；(c) 超過 5 輛爆胎。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <p>$X \sim \text{Bin}(15,\ 0.25)$，查累積二項表：</p>
        <ul>
          <li>(a) $P(3 \le X \le 6) = F(6) - F(2) = 0.9434 - 0.2361 = \mathbf{0.7073}$</li>
          <li>(b) $P(X < 4) = P(X \le 3) = \mathbf{0.4613}$</li>
          <li>(c) $P(X > 5) = 1 - P(X \le 5) = 1 - 0.8516 = \mathbf{0.1484}$</li>
        </ul>
        <div class="callout callout-errata">
          <div class="callout-title">⚠️ 勘誤修正</div>
          <div>PDF 紅筆在 (c) 將 <code>1 - 0.8516</code> 算錯成 <code>0.1464</code>，正解為 <code>0.1484</code>。</div>
        </div>
      `
    },
    {
      id: "ex-5-18",
      code: "ex 5.18（補充）",
      kind: "ex",
      section: "5.2",
      page: "solution5",
      title: "投影片補充：二項分配平均與標準差區間",
      prompt: "（Slide 5.2 列出、收錄於 solution5.pdf）承 ex 5.9（$n=15, p=0.25$），求 $\\mu$ 與 $\\mu \\pm 2\\sigma$ 區間。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>由 <code>solution5.pdf</code>：</p>
        $$\mu = np = 15(0.25) = \mathbf{3.75}, \qquad \sigma = \sqrt{npq} = \sqrt{15(0.25)(0.75)} \approx 1.677$$
        $$\mu \pm 2\sigma = 3.75 \pm 3.354 \implies [0.396,\ 7.104]$$
        <p class="solution-answer">涵蓋整數次數區間為 $1$ 到 $7$ 輛。</p>
      `
    },
    {
      id: "ex-5-19",
      code: "ex 5.19",
      kind: "ex",
      section: "5.2",
      page: "p.36",
      title: "上學紅綠燈機率分配（Multinomial）",
      prompt: "紅綠燈綠 35 秒、黃 5 秒、紅 60 秒，學生每個上學日上午 8:00–8:30 經過該路口，求遭遇綠、黃、紅燈次數 $(X_1, X_2, X_3)$ 的聯合分布。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>單一週期總長 $35 + 5 + 60 = 100$ 秒，故各燈號機率為 $p_1=0.35,\ p_2=0.05,\ p_3=0.60$。題幹未給固定總上學天數，設這段期間總共經過路口 $n$ 次，則：</p>
        $$f(x_1, x_2, x_3) = \binom{n}{x_1, x_2, x_3}(0.35)^{x_1}(0.05)^{x_2}(0.60)^{x_3}, \quad x_1+x_2+x_3 = n$$
      `
    },
    {
      id: "ex-5-20",
      code: "ex 5.20",
      kind: "ex",
      section: "5.2",
      page: "p.37",
      title: "藥檢陽性勞工類別（Multinomial）",
      prompt: "400 萬勞工中 $5.8\%$ 藥檢陽性；陽性者中 $22.5\%$ 用古柯鹼、$54.4\%$ 用大麻。抽檢 10 位呈陽性的勞工，求：(a) 2 古柯鹼、5 大麻、3 其他；(b) 全是大麻；(c) 無人使用古柯鹼。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p><strong>辨別干擾資訊</strong>：開頭的「400 萬人」與「$5.8\%$」不會用到！題目已經限定抽取的是 <strong>10 名呈陽性的勞工</strong>（$n=10$），各類機率為 $p_1=0.225,\ p_2=0.544,\ p_3=1-0.225-0.544=0.231$。</p>
        <ul>
          <li>(a) $\frac{10!}{2!5!3!}(0.225)^2(0.544)^5(0.231)^3 \approx \mathbf{0.0749}$</li>
          <li>(b) $(0.544)^{10} \approx \mathbf{0.00227}$</li>
          <li>(c) $(1 - 0.225)^{10} = (0.775)^{10} \approx \mathbf{0.0782}$</li>
        </ul>
      `
    },
    {
      id: "eg-5-8",
      code: "e.g. 5.8",
      kind: "eg",
      section: "5.3",
      page: "p.6",
      title: "10 件抽 3 件品管驗收（Hypergeometric）",
      prompt: "每批 10 件，容許至多 1 件不良。現隨機抽 3 件，若全數合格才收貨。請以最壞不良狀況評估此計畫。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>不應收貨表示「超過 1 件不良品」（即 $\ge 2$ 件），取最嚴格邊界 $k=2$ 件不良品、$8$ 件良品。抽 3 件卻誤收（$X=0$）的機率：</p>
        $$P(X = 0) = \frac{\binom{2}{0}\binom{8}{3}}{\binom{10}{3}} = \frac{56}{120} \approx \mathbf{0.4667}$$
        <p>誤收機率接近一半，抽 3 件太寬鬆。</p>
      `
    },
    {
      id: "eg-5-9",
      code: "e.g. 5.9",
      kind: "eg",
      section: "5.3",
      page: "p.6",
      title: "40 件抽 5 件抓不良品",
      prompt: "每批 40 件，抽 5 件檢查。若批內實際有 3 件不良品，求樣本中恰好出現 1 件不良品的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X = 1) = \frac{\binom{3}{1}\binom{37}{4}}{\binom{40}{5}} \approx \mathbf{0.3011}$$
      `
    },
    {
      id: "eg-5-12",
      code: "e.g. 5.12",
      kind: "eg",
      section: "5.3",
      page: "p.7",
      title: "大母體超幾何以二項逼近",
      prompt: "5000 條輪胎中有 1000 條輕微瑕疵，隨機買 10 條，求恰好 3 條瑕疵之機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>因抽樣比 $n/N = 10/5000 = 0.002 \le 0.05$，可用 $p = 1000/5000 = 0.2$ 的 Binomial 逼近：</p>
        $$P_H(X=3) = \frac{\binom{1000}{3}\binom{4000}{7}}{\binom{5000}{10}} \approx 0.2015 \quad \approx \quad \binom{10}{3}(0.2)^3(0.8)^7 = 0.8791 - 0.6778 = \mathbf{0.2013}$$
      `
    },
    {
      id: "eg-5-13",
      code: "e.g. 5.13",
      kind: "eg",
      section: "5.3",
      page: "p.7",
      title: "血型抽樣（Multivariate Hypergeometric）",
      prompt: "10 位受試者含 3 名 O 型、4 名 A 型、3 名 B 型，抽 5 名含 1 O、2 A、2 B 的機率？",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P = \frac{\binom{3}{1}\binom{4}{2}\binom{3}{2}}{\binom{10}{5}} = \frac{3\cdot 6\cdot 3}{252} = \frac{54}{252} = \frac{3}{14} \approx \mathbf{0.2143}$$
      `
    },
    {
      id: "ex-5-30",
      code: "ex 5.30",
      kind: "ex",
      section: "5.3",
      page: "p.37",
      title: "海關抽驗夾帶毒品藥丸",
      prompt: "瓶中混有 6 顆毒品與 9 顆維他命，海關隨機抽 3 顆化驗，求旅客被逮捕（至少抽中 1 顆毒品）的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$P(X \ge 1) = 1 - P(X = 0) = 1 - \frac{\binom{6}{0}\binom{9}{3}}{\binom{15}{3}} = 1 - \frac{84}{455} = \frac{53}{65} \approx \mathbf{0.8154}$$
      `
    },
    {
      id: "ex-5-31",
      code: "ex 5.31",
      kind: "ex",
      section: "5.3",
      page: "p.38",
      title: "醫護人員選委員會（注意定義域下界）",
      prompt: "4 名醫生與 2 名護士中選 3 人，寫出醫生人數 $X$ 的機率分配並求 $P(2 \\le X \\le 3)$。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p><strong>定義域關鍵</strong>：護士最多只有 2 人，要湊滿 3 人，醫生至少會有 1 人，故 $1 \le x \le 3$：</p>
        $$f(x) = \frac{\binom{4}{x}\binom{2}{3-x}}{\binom{6}{3}}, \quad x = 1, 2, 3$$
        $$P(2 \le X \le 3) = f(2) + f(3) = \frac{\binom{4}{2}\binom{2}{1} + \binom{4}{3}\binom{2}{0}}{\binom{6}{3}} = \frac{12 + 4}{20} = \mathbf{0.8}$$
      `
    },
    {
      id: "ex-5-33",
      code: "ex 5.33",
      kind: "ex",
      section: "5.3",
      page: "p.39",
      title: "52 張撲克牌發 7 張",
      prompt: "從 52 張撲克牌發 7 張，求：(a) 恰 2 張人頭牌（J, Q, K 共 12 張）；(b) 至少 1 張 Q。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\frac{\binom{12}{2}\binom{40}{5}}{\binom{52}{7}} \approx \mathbf{0.3246}$</li>
          <li>(b) $1 - \frac{\binom{4}{0}\binom{48}{7}}{\binom{52}{7}} \approx \mathbf{0.4496}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-36",
      code: "ex 5.36",
      kind: "ex",
      section: "5.3",
      page: "p.39",
      title: "兩階段抽檢（不放回 Hypergeometric）",
      prompt: "每箱 25 件，抽 3 件不放回檢驗，發現不良品即整箱退回。(a) 含 3 件不良品仍出貨的機率；(b) 僅含 1 件不良品卻被退回的機率。",
      isMust: true,
      hasErrata: false,
      mustReason: "與 ex 5.37 成對比較「不放回 vs. 放回」，且 (b) 小題題幹將母體不良數從 3 改成 1，極易看錯！",
      solutionHtml: String.raw`
        <p>抽 3 件不放回 $\implies$ Hypergeometric（$N=25,\ n=3$）：</p>
        <ul>
          <li>(a) 母體不良數 $k=3$、良品 $22$。出貨代表抽出 0 個不良品：
            $$\frac{\binom{3}{0}\binom{22}{3}}{\binom{25}{3}} = \frac{1540}{2300} = \frac{77}{115} \approx \mathbf{0.6696}$$
          </li>
          <li>(b) ⚠️ <strong>注意母體改為只有 $k=1$ 個不良品</strong>、$24$ 個良品！被退回代表抽中這唯一 1 個不良品：
            $$\frac{\binom{1}{1}\binom{24}{2}}{\binom{25}{3}} = \frac{276}{2300} = \frac{3}{25} = \mathbf{0.12}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-5-37",
      code: "ex 5.37",
      kind: "ex",
      section: "5.3",
      page: "p.40",
      title: "檢完放回三次獨立檢驗（Binomial 對照）",
      prompt: "承 ex 5.36，改為 3 位檢驗員依序「抽 1 件檢查完放回箱中」，任一人發現不良品即退回，重算 (a) 與 (b)。",
      isMust: true,
      hasErrata: false,
      mustReason: "只要改成「檢完放回」，各次抽樣恢復獨立且機率恆定，立刻從 Hypergeometric 轉換回 Binomial！",
      solutionHtml: String.raw`
        <p>有放回且獨立重複 $n=3$ 次 $\implies$ Binomial：</p>
        <ul>
          <li>(a) 含 3 件不良品（每次抽中機率 $3/25$，良品 $22/25$），3 次皆抽中良品才出貨：
            $$\binom{3}{0}\left(\frac{3}{25}\right)^0\left(\frac{22}{25}\right)^3 = \left(\frac{22}{25}\right)^3 \approx \mathbf{0.6815}$$
          </li>
          <li>(b) 含 1 件不良品（每次抽中機率 $1/25$），至少 1 人抽中即退回：
            $$1 - \left(\frac{24}{25}\right)^3 \approx \mathbf{0.1153}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-5-43",
      code: "ex 5.43",
      kind: "ex",
      section: "5.3",
      page: "p.40",
      title: "外籍生委員會分拆計數（Multivariate Hypergeometric）",
      prompt: "社團有 2 加拿大（C）、3 日本（J）、5 義大利（I）、2 德國（G），隨機選 4 人：(a) 4 國籍皆有；(b) 除了義大利外，其餘三國籍皆有。",
      isMust: true,
      hasErrata: false,
      mustReason: "(b) 小題考驗多類別不放回抽樣的窮舉分拆能力，漏算任何一組都會失分。",
      solutionHtml: String.raw`
        <p>共 $N = 12$ 人選 4 人，分母為 $\binom{12}{4} = 495$：</p>
        <ul>
          <li>(a) 四國各 1 人：
            $$\frac{\binom{2}{1}\binom{3}{1}\binom{5}{1}\binom{2}{1}}{\binom{12}{4}} = \frac{60}{495} = \frac{4}{33} \approx \mathbf{0.1212}$$
          </li>
          <li>(b) 義大利 0 人，且 C, J, G 至少各 1 人。先各發 1 名額，剩 1 名額可分給 C, J 或 G，共 3 組互斥組合 $(2,1,1)、(1,2,1)、(1,1,2)$：
            $$\frac{\binom{2}{2}\binom{3}{1}\binom{2}{1} + \binom{2}{1}\binom{3}{2}\binom{2}{1} + \binom{2}{1}\binom{3}{1}\binom{2}{2}}{\binom{12}{4}} = \frac{6 + 12 + 6}{495} = \frac{24}{495} = \frac{8}{165} \approx \mathbf{0.0485}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-5-47",
      code: "ex 5.47",
      kind: "ex",
      section: "5.3",
      page: "p.41",
      title: "環保稽查疑似違規廠商",
      prompt: "20 家廠商中實際有 3 家違規，抽查 5 家。(a) 未發現任何違規；(b) 恰發現 2 家違規。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\frac{\binom{3}{0}\binom{17}{5}}{\binom{20}{5}} \approx \mathbf{0.3991}$</li>
          <li>(b) $\frac{\binom{3}{2}\binom{17}{3}}{\binom{20}{5}} = \frac{5}{38} \approx \mathbf{0.1316}$</li>
        </ul>
      `
    },
    {
      id: "eg-5-14",
      code: "e.g. 5.14",
      kind: "eg",
      section: "5.4",
      page: "p.8",
      title: "NBA 冠軍系列賽（Negative Binomial）",
      prompt: "A 隊單場擊敗 B 隊機率為 $0.55$。(a) 7 戰 4 勝制中第 6 場奪冠；(b) A 隊贏得 7 戰 4 勝制系列賽；(c) 改為 5 戰 3 勝制時 A 隊贏得系列賽。",
      isMust: true,
      hasErrata: false,
      mustReason: "負二項分配最經典考題！在系列賽奪冠後就不再繼續比賽，絕對不可錯寫成固定場數的 Binomial。",
      solutionHtml: String.raw`
        <p>奪冠最後一場必須是 A 勝，前 $x-1$ 場恰好取 $k-1$ 勝：</p>
        <ul>
          <li>(a) 7 戰 4 勝制第 6 場奪冠（$k=4, x=6$）：
            $$\binom{5}{3}(0.55)^3(0.45)^2\cdot(0.55) \approx \mathbf{0.1853}$$
          </li>
          <li>(b) A 隊在第 4、5、6 或 7 場封王（互斥相加）：
            $$\sum_{x=4}^{7}\binom{x-1}{3}(0.55)^4(0.45)^{x-4} \approx 0.0915 + 0.1647 + 0.1853 + 0.1668 = \mathbf{0.6083}$$
          </li>
          <li>(c) 5 戰 3 勝制（$k=3$，第 3、4 或 5 場封王）：
            $$\sum_{x=3}^{5}\binom{x-1}{2}(0.55)^3(0.45)^{x-3} \approx 0.1664 + 0.2246 + 0.2021 = \mathbf{0.5931}$$
          </li>
        </ul>
      `
    },
    {
      id: "eg-5-15",
      code: "e.g. 5.15",
      kind: "eg",
      section: "5.4",
      page: "p.9",
      title: "第 5 件才首見不良品（Geometric）",
      prompt: "平均每 100 件有 1 件不良品（$p=0.01$），求第 5 件才首次發現不良品的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$f(5) = (0.99)^4(0.01) \approx \mathbf{0.0096}$$
      `
    },
    {
      id: "eg-5-16",
      code: "e.g. 5.16",
      kind: "eg",
      section: "5.4",
      page: "p.9",
      title: "電話第 5 次才撥通（Geometric）",
      prompt: "忙線時每次接通機率 $p = 0.05$，求恰好需要 5 次才成功接通的機率。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <p>Geometric（$x=5,\ p=0.05$）：</p>
        $$P(X = 5) = (0.05)(0.95)^4 \approx \mathbf{0.0407}$$
        <p style="font-size:0.86rem;color:var(--text-soft);">（註：PDF 手寫式左側誤寫為 $P(X=x)$，應為 $P(X=5)$。）</p>
      `
    },
    {
      id: "ex-5-50",
      code: "ex 5.50",
      kind: "ex",
      section: "5.4",
      page: "p.41",
      title: "擲硬幣直到第 k 個正面",
      prompt: "連續投擲公正硬幣：(a) 第 7 次出現第 3 個正面；(b) 第 4 次出現第 1 個正面。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) Negative Binomial（$k=3, x=7$）：$\binom{6}{2}\left(\frac{1}{2}\right)^2\left(\frac{1}{2}\right)^4\cdot\frac{1}{2} = \frac{15}{128} \approx \mathbf{0.1172}$</li>
          <li>(b) Geometric（$x=4$）：$\left(\frac{1}{2}\right)^3\cdot\frac{1}{2} = \frac{1}{16} = \mathbf{0.0625}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-52",
      code: "ex 5.52",
      kind: "ex",
      section: "5.4",
      page: "p.42",
      title: "老鼠接種病菌（Negative Binomial）",
      prompt: "科學家逐隻對老鼠接種病菌，直到找到 2 隻感染為止。若單隻感染機率為 $1/6$，求共需要 8 隻老鼠的機率。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <div class="callout callout-errata">
          <div class="callout-title">⚠️ 勘誤修正（PDF p.42 重大錯誤）</div>
          <div>PDF 筆記把機率誤代成 $1/2$ 而寫成 $\binom{7}{1}(1/2)^1(1/2)^6\cdot(1/2)$。正確 $p = 1/6,\ q = 5/6$！</div>
        </div>
        <p>第 8 隻必須是第 2 隻感染，前 7 隻恰有 1 隻感染：</p>
        $$P(X = 8) = \binom{7}{1}\left(\frac{1}{6}\right)^1\left(\frac{5}{6}\right)^6\cdot\frac{1}{6} = 7\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^6 \approx \mathbf{0.0651}$$
      `
    },
    {
      id: "ex-5-55",
      code: "ex 5.55",
      kind: "ex",
      section: "5.4",
      page: "p.42",
      title: "飛行員筆試通過次數（Geometric）",
      prompt: "學生每次通過筆試機率為 $0.7$。(a) 第 3 次通過；(b) 第 4 次之前通過。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $(0.3)^2(0.7) = \mathbf{0.063}$</li>
          <li>(b) $P(X < 4) = P(X \le 3) = 0.7 + (0.3)(0.7) + (0.3)^2(0.7) = \mathbf{0.973}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-92",
      code: "ex 5.92",
      kind: "rev",
      section: "5.4",
      page: "p.49",
      title: "第 2 個男孩恰好是第 4 胎",
      prompt: "一對夫妻決定生到有 2 個男孩為止，設生男孩機率 $0.5$，求第 2 個男孩剛好是第 4 胎的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>Negative Binomial（$k=2, x=4, p=0.5$），前 3 胎有 1 男 2 女，第 4 胎為男：</p>
        $$\binom{3}{1}(0.5)^1(0.5)^2(0.5) = \frac{3}{16} = \mathbf{0.1875}$$
      `
    },
    {
      id: "eg-5-17",
      code: "e.g. 5.17",
      kind: "eg",
      section: "5.5",
      page: "p.9",
      title: "放射性粒子計數（Poisson 基本型）",
      prompt: "實驗中每毫秒平均有 4 個粒子通過計數器，求某 1 毫秒內恰好有 6 個粒子通過的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\lambda = 4,\ t = 1 \implies \mu = \lambda t = 4$：</p>
        $$f(6) = \frac{e^{-4}4^6}{6!} \approx \mathbf{0.1042}$$
      `
    },
    {
      id: "eg-5-18",
      code: "e.g. 5.18",
      kind: "eg",
      section: "5.5",
      page: "p.10",
      title: "港口油輪超載拒絕機率",
      prompt: "港口每日平均到達 10 艘油輪（Poisson），港口每天最多處理 15 艘，求某天油輪必須被拒絕（turned away）的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$\mu = 10$，超過 15 艘即拒絕（$X > 15$）：</p>
        $$P(X > 15) = 1 - P(X \le 15) = 1 - 0.9513 = \mathbf{0.0487}$$
      `
    },
    {
      id: "eg-5-19",
      code: "e.g. 5.19",
      kind: "eg",
      section: "5.5",
      page: "p.10",
      title: "Poisson 逼近 Binomial（工業事故）",
      prompt: "工廠任一天發生事故機率 $0.005$，在 400 天中：(a) 恰 1 天發生事故；(b) 至多 3 天發生事故。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$n = 400$ 大、$p = 0.005$ 小 $\implies \mu = np = 2$：</p>
        <ul>
          <li>(a) $P(X=1) \approx \frac{e^{-2}2^1}{1!} \approx \mathbf{0.2707}$（與精確二項 $0.2707$ 一致）</li>
          <li>(b) $P(X \le 3) \approx \sum_{x=0}^3 \frac{e^{-2}2^x}{x!} \approx \mathbf{0.8571}$</li>
        </ul>
      `
    },
    {
      id: "eg-5-20",
      code: "e.g. 5.20",
      kind: "eg",
      section: "5.5",
      page: "p.11",
      title: "Poisson 逼近 Binomial（玻璃氣泡）",
      prompt: "平均每 1000 件玻璃製品有 1 件含氣泡，隨機抽 8000 件，求少於 7 件含氣泡的機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$n=8000,\ p=1/1000 \implies \mu = np = 8$：</p>
        $$P(X < 7) = P(X \le 6) \approx \sum_{x=0}^{6}\frac{e^{-8}8^x}{x!} \approx \mathbf{0.3134}$$
      `
    },
    {
      id: "ex-5-62",
      code: "ex 5.62",
      kind: "ex",
      section: "5.5",
      page: "p.43",
      title: "脊椎側彎篩檢未通過人數（Poisson 逼近）",
      prompt: "學生篩檢未通過率為 $0.004$，接下來篩檢 $n=1875$ 名學生。(a) 少於 5 人未通過；(b) 8、9 或 10 人未通過。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <p>$n=1875,\ p=0.004 \implies \mu = np = 7.5$（註：<code>solution5.pdf</code> 誤印為 <code>5.7</code>，但查表值皆以 $7.5$ 計算）：</p>
        <ul>
          <li>(a) $P(X < 5) = P(X \le 4) \approx \mathbf{0.1321}$</li>
          <li>(b) $P(8 \le X \le 10) = P(X \le 10) - P(X \le 7) = 0.8622 - 0.5246 = \mathbf{0.3376}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-65",
      code: "ex 5.65",
      kind: "ex",
      section: "5.5",
      page: "p.43",
      title: "汽車煞車故障災難數（解答紅字提問）",
      prompt: "每年發生故障災難的車輛數為 Poisson 變數且 $\\lambda = 5$。(a) 每年至多 3 輛；(b) 每年超過 1 輛。",
      isMust: false,
      hasErrata: true,
      solutionHtml: String.raw`
        <div class="callout callout-tip">
          <div class="callout-title">💬 回答 PDF 紅字提問：「why λ=5 ⇒ λt=5=μ, t=1 (per year)?」</div>
          <div>是的！因為題目敘述「<strong>每年</strong>發生災難的車輛數（per year）為 $\lambda=5$」，而 (a)、(b) 問的也是「<strong>每年</strong>」，代表時間區間 $t=1$ 年，所以 $\mu = \lambda t = 5 \times 1 = 5$。</div>
        </div>
        <ul>
          <li>(a) $P(X \le 3 \mid \mu=5) = \mathbf{0.2650}$</li>
          <li>(b) $P(X > 1 \mid \mu=5) = 1 - P(X \le 1) = 1 - 0.0404 = \mathbf{0.9596}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-66",
      code: "ex 5.66",
      kind: "ex",
      section: "5.5",
      page: "p.44",
      title: "小型飛機降落速率（時間區間縮放）",
      prompt: "小飛機以每小時 $\\lambda = 6$ 架服從 Poisson 到達。(a) 1 小時恰 4 架；(b) 1 小時至少 4 架；(c) 12 小時工作天至少 75 架。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $t=1 \implies \mu=6$：$P(X=4) = P(X\le 4) - P(X\le 3) = 0.2851 - 0.1512 = \mathbf{0.1339}$</li>
          <li>(b) $t=1 \implies \mu=6$：$P(X \ge 4) = 1 - 0.1512 = \mathbf{0.8488}$</li>
          <li>(c) $t=12 \implies \mu=72$：$P(X \ge 75) = 1 - \sum_{x=0}^{74}\frac{e^{-72}72^x}{x!} \approx \mathbf{0.3773}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-67",
      code: "ex 5.67",
      kind: "ex",
      section: "5.5",
      page: "p.44",
      title: "汽車服務廠顧客到達數",
      prompt: "每小時平均到達 $\\lambda = 7$ 名顧客。(a) 2 小時內超過 10 名顧客；(b) 2 小時平均到達數。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>$t = 2 \implies \mu = \lambda t = 7 \times 2 = 14$：</p>
        <ul>
          <li>(a) $P(X > 10 \mid \mu=14) = 1 - P(X \le 10) = 1 - 0.1757 = \mathbf{0.8243}$</li>
          <li>(b) $\mu = \mathbf{14}$ 人</li>
        </ul>
      `
    },
    {
      id: "ex-5-68",
      code: "ex 5.68",
      kind: "ex",
      section: "5.5",
      page: "p.45",
      title: "承 ex 5.62 求期望未通過人數",
      prompt: "承 ex 5.62（$n=1875,\ p=0.004$），求預期未通過篩檢的學生人數。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        $$\mu = np = 1875 \times 0.004 = \mathbf{7.5}$$
      `
    },
    {
      id: "ex-5-78",
      code: "ex 5.78",
      kind: "rev",
      section: "5.5",
      page: "p.45",
      title: "自動焊接機測試（雙向誤判）",
      prompt: "測試 100 次焊接，失敗 $\\le 3$ 次才採用。(a) 成功率 $99\%$ 的好機器卻被拒絕；(b) 成功率 $95\%$ 的差機器卻被接受。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>設 $X$ 為 100 次中的「失敗」次數：</p>
        <ul>
          <li>(a) 好機器失敗率 $p=0.01$，遭拒即 $X > 3$：
            $$P(X > 3) = 1 - \sum_{x=0}^3 \binom{100}{x}(0.01)^x(0.99)^{100-x} \approx \mathbf{0.0184}\quad (\text{Poisson } \mu=1 \text{ 逼近 } \approx 0.0190)$$
          </li>
          <li>(b) 差機器失敗率 $p=0.05$，被接受即 $X \le 3$：
            $$P(X \le 3) = \sum_{x=0}^3 \binom{100}{x}(0.05)^x(0.95)^{100-x} \approx \mathbf{0.2578}\quad (\text{Poisson } \mu=5 \text{ 逼近 } \approx 0.2650)$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-5-80",
      code: "ex 5.80",
      kind: "rev",
      section: "5.5",
      page: "p.46",
      title: "客服中心來電數（Poisson）",
      prompt: "每分鐘平均 $\\lambda = 2.7$ 通來電。(a) 1 分鐘至多 4 通；(b) 1 分鐘少於 2 通；(c) 5 分鐘超過 10 通。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $\mu=2.7$：$\sum_{x=0}^4 \frac{e^{-2.7}(2.7)^x}{x!} \approx \mathbf{0.8629}$</li>
          <li>(b) $\mu=2.7$：$P(X \le 1) = e^{-2.7}(1 + 2.7) \approx \mathbf{0.2487}$</li>
          <li>(c) $\mu = 2.7 \times 5 = 13.5$：$P(X > 10) = 1 - \sum_{x=0}^{10} \frac{e^{-13.5}(13.5)^x}{x!} \approx \mathbf{0.7888}$</li>
        </ul>
      `
    },
    {
      id: "ex-5-81",
      code: "ex 5.81",
      kind: "rev",
      section: "5.5",
      page: "p.46",
      title: "大批量抽檢推翻 5% 不良宣稱",
      prompt: "廠商宣稱某大批量零件不良率 $5\%$，買方隨機抽 15 個發現 5 個不良品。(a) 若宣稱屬實，此事件機率為何？(b) 買方的反應？",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <p>因是「大批量（large lot）」，直接使用 Binomial（$n=15,\ p=0.05$），不可如 PDF 紅框錯用 $N=100$ 超幾何：</p>
        <ul>
          <li>(a) $P(X=5) = \binom{15}{5}(0.05)^5(0.95)^{10} \approx \mathbf{0.000562}$</li>
          <li>(b) 發生機率不到千分之一，極不合理，因此<strong>不相信</strong>廠商宣稱只有 $5\%$ 不良率。</li>
        </ul>
      `
    },
    {
      id: "ex-5-82",
      code: "ex 5.82",
      kind: "rev",
      section: "5.5",
      page: "p.47",
      title: "電子開關 5 小時測試（Poisson 雙向誤判）",
      prompt: "合格標準為平均每小時故障 $\\le 0.20$ 次。測試 5 小時若 $\\le 1$ 次故障即判為滿意。(a) 合格裝置（邊界 $0.20$/hr）被判不合格之機率；(b) 故障率 $0.25$/hr 裝置被判滿意之機率。",
      isMust: true,
      hasErrata: false,
      mustReason: "把 Poisson 速率換算（$\mu=\lambda t$）、不等式方向（$>1$ vs $\le 1$）以及品質管制兩類誤判一次考齊！",
      solutionHtml: String.raw`
        <p>測試時間 $t = 5$ 小時，$\mu = \lambda t$：</p>
        <ul>
          <li>(a) 合格裝置取 $\lambda = 0.20 \implies \mu = 0.20 \times 5 = 1$。判不合格表示 $X > 1$：
            $$P(X > 1 \mid \mu=1) = 1 - P(X \le 1) = 1 - \left(\frac{e^{-1}1^0}{0!} + \frac{e^{-1}1^1}{1!}\right) = 1 - 2e^{-1} \approx \mathbf{0.2642}$$
          </li>
          <li>(b) 實際率 $\lambda = 0.25 \implies \mu = 0.25 \times 5 = 1.25$。判滿意表示 $X \le 1$：
            $$P(X \le 1 \mid \mu=1.25) = e^{-1.25}(1 + 1.25) \approx \mathbf{0.6446}$$
          </li>
        </ul>
      `
    },
    {
      id: "ex-5-85",
      code: "ex 5.85",
      kind: "rev",
      section: "5.5",
      page: "p.48",
      title: "Chevalier de Méré 骰子經典問題",
      prompt: "(a) 擲 4 顆骰子至少出現 1 個 1 點之機率；(b) 擲 2 顆骰子 24 次，至少出現 1 次雙 1 點（snake-eyes）之機率。",
      isMust: false,
      hasErrata: false,
      solutionHtml: String.raw`
        <ul>
          <li>(a) $1 - \left(\frac{5}{6}\right)^4 \approx \mathbf{0.5177}$</li>
          <li>(b) 單次出現 $(1,1)$ 機率為 $1/36$，故 $1 - \left(\frac{35}{36}\right)^{24} \approx \mathbf{0.4914}$</li>
        </ul>
      `
    }
  ]
};
