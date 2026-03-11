# 03_API_Spec: 技術仕様とエンドポイント

## 1. 共通仕様
- **Base URL:** `https://ai-work-os.vercel.app`
- **認証方式:** Bearer Token (Vercel 環境変数 `TODOIST_API_TOKEN` を使用)
- **データ形式:** JSON (UTF-8)

## 2. 実装済み API
### 2.1. Todoist タスク登録 (/api/todo)
- **Method:** POST
- **概要:** 事務局長の Inbox へタスクを 1 件登録する。
- **リクエストパラメータ:**
  ```json
  {
    "title": "string (必須: タスクの内容)",
    "due_string": "string (任意: デフォルトは 'today')"
  }
