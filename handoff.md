# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前必讀；收工時必更新。本檔只放交接必需的精簡資訊。

## ⏯️ 目前做到哪

已完成第一個班級互動工具：Firebase 即時文字雲。網頁透過 Cloud Firestore 即時同步課堂關鍵字，並已部署至 Firebase Hosting。

## 🚦 目前狀態

- Firebase 資料庫可正常操作。
- `wordcloud_words` 允許公開讀取及受格式限制的新增；禁止前端更新與刪除。
- 即時文字雲網頁已佈署：`https://database-eb5b8.web.app`
- GitHub 公開 repository 已建立並完成 push：`https://github.com/ginicjdu-tech/20260927database`
- Obsidian Secondbrain、專案駕駛艙與 MCP 跨專案讀寫均已設定並測試成功。

## ➡️ 下一步

1. 在實際課堂用手機與投影畫面試用即時文字雲。
2. 視教學需求加入教師清空、班級碼或題目切換功能。
3. 正式長期使用前，設計登入、班級碼或教師管理的 Firestore 安全規則。

## ⚠️ 注意事項

- `.firebaserc` 必須維持指向 `database-eb5b8`。
- `wordcloud_words` 仍允許未登入使用者新增資料，只適合課堂展示，不可存放學生姓名或其他個資。
- 本資料夾位於 Google 雲端硬碟，請確認桌面版同步狀態正常後再換電腦工作。
- Obsidian MCP 設定需在完全重啟 Codex Desktop 後才會出現在新對話中。

## 🕐 最後更新

- 時間：2026-09-28
- 更新者：Codex @ GINI
- Git push：已推送至 `origin/main`
