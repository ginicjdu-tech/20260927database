# 20260927database

使用 Firebase Cloud Firestore 製作班級互動工具的專案工作區。

## 即時文字雲

這是一個供課堂使用的即時文字雲網頁。學生送出關鍵字後，所有開啟中的畫面會透過 Cloud Firestore 即時更新；重複出現的詞彙會變得更大。

## 目前狀態

- Firebase project ID：`database-eb5b8`
- Firestore：Standard，`asia-east1`（台灣）
- 已完成新增、讀取與刪除測試
- 已部署 `firestore.rules`
- 已建立即時文字雲網頁
- 網頁原始碼位於 `public/`

## 主要檔案

- `firestore.rules`：資料庫安全規則
- `firebase.json`：Firebase CLI 設定
- `.firebaserc`：預設 Firebase 專案
- `AGENTS.md`：專案固定規則與入口
- `handoff.md`：目前進度與下一步
- `public/`：Firebase Hosting 靜態網頁

## 常用操作

```powershell
npx.cmd -y firebase-tools@latest projects:list
npx.cmd -y firebase-tools@latest deploy --only firestore:rules,hosting
```

## 安全提醒

目前只有 `wordcloud_words` 集合允許公開讀寫，僅供課堂展示。正式服務應加入登入、班級碼或教師管理條件，且不得儲存學生姓名或其他個資。
