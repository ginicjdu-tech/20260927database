# 20260927database（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖。任何 Agent 的每個工作階段都應先讀本檔與 `handoff.md`。

## 專案簡介

製作使用 Firebase 的班級互動工具，讓教師能建立適合課堂使用的即時互動功能。

## 關鍵時程

- 無

## 目標與路線圖

- [x] 建立 Firebase 專案與 Cloud Firestore
- [x] 部署 `wordcloud_words` 測試用安全規則
- [x] 完成 Firestore 新增、讀取與刪除測試
- [x] 建立專案工作模式與本機 Git 儲存庫
- [x] 製作第一個班級互動工具（即時文字雲）
- [ ] 正式使用前，將公開寫入規則改為登入、班級碼或教師管理條件
- [x] 連接 GitHub 與 Obsidian

## 資料夾結構

- `.firebaserc`：Firebase 預設專案 `database-eb5b8`
- `firebase.json`：Firebase CLI 設定
- `firestore.rules`：Cloud Firestore 安全規則
- `AGENTS.md`：固定專案規則與藍圖
- `handoff.md`：跨工作階段交接狀態
- `README.md`：專案用途與基本操作說明
- `.gitignore`：版本控制排除規則

## 同步層級（本專案已擴充至第 3 層級）

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（Google 雲端硬碟） | `AGENTS.md`＋`handoff.md` | 每個工作階段 |
| L2 | GitHub | `https://github.com/ginicjdu-tech/20260927database`（公開） | 指定時 |
| L3 | Obsidian | `G:\我的雲端硬碟\Secondbrain\20260927database\專案工作流程.md` | 有需要時 |

## 專案入口

- 主要工作目錄：`G:\我的雲端硬碟\20260927database`
- Firebase project ID：`database-eb5b8`
- Firestore database：`(default)`，Standard，`asia-east1`
- 預設 branch：`main`
- Obsidian vault：`G:\我的雲端硬碟\Secondbrain`
- 專案駕駛艙：`20260927database/專案工作流程.md`

## 工作約定

- 任何 Agent、任何電腦：開工先讀 `handoff.md`，收工必更新 `handoff.md`。
- 開工使用 `startup-sync` 流程；收工使用 `shutdown-sync` 流程。
- 收工更新 Obsidian 專案駕駛艙時，同步將當天摘要寫入 `G:\我的雲端硬碟\Secondbrain\每日筆記\YYYY-MM-DD.md`；同日已有筆記時追加到「專案進度」，不覆蓋原有內容。
- 不自動執行 `git pull`、commit 或 push；涉及遠端同步時先確認。
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更。
- 所有回應與文件使用繁體中文（台灣）。
- 修改前先確認現況，保留原有資料與 Firebase 設定。

## 安全與隱私（不可違反）

- 不把密碼、token、Admin 憑證或其他祕密寫進版本庫；一律放在 `.env` 並列入 `.gitignore`。
- Firebase 前端設定可公開，但 Admin 憑證不可公開。
- 不儲存學生姓名；正式資料只使用座號與班級代號。
- `wordcloud_words` 目前允許公開讀寫，只適合課堂展示，不適合正式學生資料或長期公開服務。
- 公開分享前，必須再次檢查檔案與資料庫是否含敏感資訊。

## 不要做

- 不要把每日進度堆進 `AGENTS.md`；進度只寫入 `handoff.md`，未來若啟用 Obsidian 再記錄詳細脈絡。
- 不要自動納入無關的 Git 變更。
- 不要將 API key、token、密碼或 Firebase Admin 憑證提交到版本庫。
- 不要在未確認目標 project ID 前部署 Firebase 設定。
