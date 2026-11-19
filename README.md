# 機率統計（Probability & Statistics）

這是一個以教授授課口吻設計的「機率統計」互動式複習網站，對照課本投影片與期末考練習筆記，完整收錄教學講義、考場判別工具、必考大題拆解、手寫筆記勘誤，以及逐題詳解。

## 目前上線章節

- **Chapter 5：Discrete Probability Distributions（離散機率分配）**
  - 完整教授講義（5.1–5.5：Discrete Uniform、Binomial、Multinomial、Hypergeometric、Multivariate Hypergeometric、Negative Binomial、Geometric、Poisson 及其逼近條件）
  - 互動式「3 秒離散分配辨識器」
  - 42 題例題、習題與複習題逐題詳解（含 `ex 5.18` 補充與 PDF 手寫勘誤修正）
- **Chapter 6：Continuous Probability Distributions（連續機率分配）**
  - 完整教授講義（6.1–6.6：Continuous Uniform、Normal 常態分配與查表、常態逼近二項與 $\pm 0.5$ 連續性修正、Gamma 與 Exponential 參數 $\beta = 1/\lambda$ 提醒及 Poisson–Exponential–Gamma 對偶公式）
  - 互動式「常態曲線即時計算機（含 SVG 陰影圖）」與「$\pm 0.5$ 連續性修正視覺化工具」
  - 41 題例題、習題與複習題逐題詳解（含 `e.g. 6.18` 等手寫勘誤修正）
- **Ch 1–3、Ch 4、Ch 7–8**：已預留導航頁籤與擴充結構，後續只需新增對應 `js/data-chX.js` 並在 `js/app.js` 註冊路由即可擴充。

## 本地預覽

```bash
python -m http.server 8765
```

開啟瀏覽器訪問 `http://localhost:8765` 即可使用（純靜態 HTML/CSS/JS + KaTeX CDN，無需任何建置工具）。

## GitHub Pages 網址

部署至 GitHub Pages 後預期網址為：`https://raybon114514.github.io/probability-statistics/`
