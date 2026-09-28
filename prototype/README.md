# AgentOS — Retail Order Desk Demo

可直接開啟 `index.html` 的純靜態 Proof of Capability Prototype。唯一可操作的 scenario 是小型零售商家「沐光手作小舖」；所有資料都是固定合成 Fixture，不會連接 Instagram、LINE、電商、付款、試算表、外部 Agent 或 API。

## 產品結構

| 頁面 | 目的 |
|---|---|
| Business Brief | 以引導式商業探索選擇商家現在的營運需求，檢視診斷與核准工作方案。 |
| My AI Team | 顯示核准後建立的 AI Agent／確定性自動化，以及今天的工作佇列。 |
| Owner Inbox | 集中顯示必須由 Owner 決定的例外與操作邊界。 |
| Business Pulse | 顯示固定示範交易、待確認訂單與工作狀態；不是已量測的 ROI。 |

四頁都可直接瀏覽。未啟用時，後三頁顯示可瀏覽的 frozen-data preview；所有會改變狀態的操作維持不可執行。

## Retail Golden Path

1. 在 **Business Brief** 選擇「顧客詢問與訂單整理」、「市集與線上庫存協調」與／或 Owner 控制。
2. 檢視由選擇形成的診斷與最少必要工作能力。
3. Owner 核准，建立、測試並啟用 AI 工作團隊。
4. 在 **My AI Team** 執行固定示範工作：Order Desk 整理訊息與訂單；Inventory Guardrail 找出庫存例外。
5. 在 **Owner Inbox** 核准操作，再獨立觸發模擬執行。
6. 在 **Business Pulse** 查看固定交易、待確認訂單與示範成本。

Owner 核准只會使操作成為「已核准，待執行」；必須另行點擊「執行已核准操作（模擬）」才載入固定結果。ORD-IG-104 的 NT$1,360 尚未確認，因此不計入收入或貢獻。

## 未來 Work Desk 架構

Retail 是目前唯一可操作的 Work Desk。Business Brief 另外展示兩個**非互動、規劃中**的延伸範例：

- **Translation Delivery Desk**：文件 → 術語／QA 例外 → Owner 審閱 → 交付。
- **Creative Project Desk**：Brief／素材 → feedback 整理 → Owner 創意決策 → 交付追蹤。

三者共用 Business Brief、My AI Team、Owner Inbox、Business Pulse 的核心；工作物件、例外、Owner 決定與指標則依職業更換。

## 能力界線

- **原型已實作**：固定 Fixture、有限引導式需求選擇、狀態機、確定性庫存比對、成本計算、hash navigation、localStorage、雙語切換、Modal、Reset。
- **模擬 AI**：Order Desk 的訊息整理、診斷、方案與 AI team configuration。
- **規劃能力**：live LLM 訪談追問、跨系統讀取、外部 Agent 部署、LINE／Instagram／電商／試算表串接、外部訊息傳送、真實庫存異動、真實 ROI 衡量。

純靜態版本刻意使用 **Guided Business Discovery**，不宣稱它能真正理解任意自由輸入。

## 測試

```bash
node tests/smoke-test.js
node --check js/core.js
node --check js/app.js
```

Smoke test 驗證需求路徑、狀態 gate、未啟用導覽、重新設定、Owner 核准與執行分離、P&L 不變量及英文 raw input 保留。這不是完整瀏覽器測試。
# AgentOS prototype

This directory is the static GitHub Pages application.

## Active runtime files

- `index.html`
- `css/styles.css`, `css/corrections.css`, `css/vnext.css`, `css/v3.css`
- `fixtures/data.js`
- `js/core.js`, `js/app.js`

## Reserved implementation structure

The following files are intentionally present but not loaded yet. They establish the future module contract without changing the existing demo:

- CSS: `tokens.css`, `base.css`, `components.css`, `pages.css`, `responsive.css`
- Fixtures: `copy.js`, `contracts.js`
- JavaScript: `router.js`, `state.js`, `i18n.js`, `ui.js`, `business-brief.js`, `ai-team.js`, `owner-inbox.js`, `business-pulse.js`
- AI solution design: `ai/` contains future prompt, structured-output, tool, workflow, knowledge and evaluation contracts.

Do not load or populate these modules until an implementation pass deliberately moves corresponding behaviour out of the active runtime files.
