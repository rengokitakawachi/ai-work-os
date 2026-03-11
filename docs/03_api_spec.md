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
  ```
- **接続先:** Todoist Unified API v1 (`https://api.todoist.com/api/v1/tasks`)

## 3. 将来の拡張予定 (Planned APIs)
以下のエンドポイントは、開発ロードマップに基づき順次実装する。

### 3.1. ナレッジ保存 (/api/note)
- **Method:** POST
- **機能:** GitHub リポジトリへ指定した Markdown ファイルを Push する。
- **パラメータ:**
  ```json
  {
    "filename": "string (例: 2026-03-11-meeting.md)",
    "content": "string (Markdown本文)",
    "commit_message": "string"
  }
  ```

### 3.2. 会議録・戦略処理 (/api/meeting)
- **Method:** POST
- **機能:** 音声文字起こしやメモから、構造化された議事録（Markdown）を生成・保存する。

### 3.3. ベクトル検索 (/api/knowledge/search)
- **Method:** GET
- **機能:** Obsidian 内の過去資産から RAG（検索拡張生成）用のデータを抽出する。

## 4. エラーハンドリング
- **401/403:** 認証エラー。トークンの有効期限または設定を確認。
- **410:** 廃止されたエンドポイントへのアクセス（v2 から v1 への移行が必要）。
- **500:** システムエラー。Vercel Logs で診断が必要。
