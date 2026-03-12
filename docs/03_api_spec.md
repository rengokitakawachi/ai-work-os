# 03_API_Spec: 技術仕様とエンドポイント

## 1. 共通仕様
- Base URL: https://ai-work-os.vercel.app
- 認証方式: Bearer Token (Vercel 環境変数 GITHUB_TOKEN / TODOIST_API_TOKEN 等を使用)
- データ形式: JSON (UTF-8)

## 2. Vercel 構成 (vercel.json)
```json
{
  "functions": { "src/api/*.ts": { "runtime": "nodejs20.x" } },
  "rewrites": [{ "source": "/api/:path*", "destination": "/src/api/:path*" }]
}
```

## 3. API エンドポイント詳細

### 3.1. タスク登録 (/api/task/create)
- Method: POST
- 機能: 事務局長の Todoist Inbox へタスクを登録する。
- パラメータ:
  - title (必須): タスク名（30-120分の粒度）
  - due_string: 期限（例: "today", "tomorrow"）
  - description: 詳細メモ
  - labels: タグ配列（例: ["#連合北河内"]）

### 3.2. ナレッジ保存 (/api/note/save)
- Method: POST
- 機能: GitHub リポジトリへ指定した Markdown ファイルを Push する（Obsidian 同期用）。
- パラメータ:
  ```json
  {
    "path": "string (例: 40_Knowledge/2026-03-11-meeting.md)",
    "content": "string (Markdown本文)",
    "message": "string (コミットメッセージ)"
  }
  ```
- 補足: フォルダ階層を含めて指定することで、Obsidian 内の適切な場所へ保存される。

### 3.3. 会議整理・タスク分解 (/api/meeting/process)
- Method: POST
- 機能: 会議メモから Meeting ノートと複数の Task を同時生成・処理する。
- 入力: title, date, participants, raw_text, project, work_domain。

### 3.4. 知識検索 (/api/knowledge/search)
- Method: GET
- 機能: Obsidian 内の過去資産から RAG（検索拡張生成）用のデータを抽出する（将来拡張）。

## 4. エラーハンドリング
- 401/403: 認証エラー。Vercel 環境変数のトークン設定（GITHUB_TOKEN等）を確認。
- 500: システムエラー。Vercel Logs で API の動作ログを診断。
