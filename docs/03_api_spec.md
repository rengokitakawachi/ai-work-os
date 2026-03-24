# 03_api_spec

## 目的

本ドキュメントは、AI Work OS における API 仕様を定義する。

API は Automation Layer として機能し、ユーザーの知的生産を支援する。

---

## Phase 定義

### Phase1

- 知能的処理は GPT が担う
- API は構造化されたタスクデータを受け取る
- service は検証と外部連携を担う
- Todoist の個人運用とチームプロジェクト運用を対象とする

### Phase3

- Obsidian 等の知識基盤を活用する
- service 側で知能的処理を担う拡張を想定する

---

## API の役割

### 現在実装

- タスク管理

### 将来実装

- ナレッジ保存
- 会議整理
- 知識検索

---

## 共通仕様

- Base URL: https://ai-work-os.vercel.app
- 認証方式: Bearer Token
- データ形式: JSON (UTF-8)

---

## 設計原則

- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する
- 責務は create / update / list で分離する

---

## API 一覧

- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

---

## create タスク

### エンドポイント

POST /api/tasks

### 概要

新規タスクを作成する。

### 前提

- 入力は構造化データのみ受け付ける
- GPT が事前にタスク情報を整形する

### リクエスト例

    {
      "title": "幹事会資料を作成する",
      "description": "依頼内容を整理した要約",
      "due_string": "2026-03-25",
      "labels": ["幹事会"],
      "assignee": "@t-niwa",
      "priority": 3,
      "duration_minutes": 60,
      "subtasks": [
        "関連資料を収集する",
        "構成案を作る",
        "初稿を作成する"
      ]
    }

### 処理

- 入力データの検証
- Todoist 形式への変換
- 親タスク作成
- subtasks の逐次作成

### subtasks

- 親タスク作成後に処理する
- parent_id を付与して作成する

### エラー処理

- 親タスクは保持する
- 失敗した subtasks はログのみ記録する

---

## update タスク

### エンドポイント

PATCH /api/tasks/:id

### 概要

既存タスクを更新する。

### リクエスト例

    {
      "title": "修正後タイトル",
      "description": "更新内容",
      "due_date": "2026-03-26",
      "labels": ["幹事会"],
      "assignee": "@t-niwa",
      "priority": 2,
      "status": "closed"
    }

### 処理

- タスク内容の変更
- 期限の変更
- 属性の更新
- status=closed による完了処理

---

## list タスク

### エンドポイント

GET /api/tasks

### 概要

タスク一覧を取得する。

### クエリ例

?project_id=xxx&assignee=@t-niwa&label=幹事会&status=open

### 処理

- タスクの一覧取得
- 条件によるフィルタリング
- status は open のみ指定可能とする
- pagination（cursor / limit）対応

---

## service 層

### 対象

src/services/

### 責務

- 入力検証
- 外部 API との連携
- データ変換処理
- assignee を外部サービス形式へ変換する
- エラーハンドリング

### 非責務

- 自然文解析
- タスク分解
- 意図理解

---

## エラー処理

### 基本方針

- API は構造化エラーを返す
- エラーは分類して返す
- request_id を付与する
- retryable を明示する
- ログとレスポンスで同じ request_id を使用する

### エラー分類

- validation
- auth
- routing
- service
- upstream
- config
- internal

### エラー形式

    {
      "ok": false,
      "error": {
        "code": "ERROR_CODE",
        "message": "説明",
        "category": "validation | auth | routing | service | upstream | config | internal",
        "step": "失敗箇所",
        "resource": "tasks",
        "action": "create | update | list",
        "status": 400,
        "retryable": false,
        "details": {},
        "request_id": "REQ_ID"
      }
    }

### 項目定義

- code
- message
- category
- step
- resource
- action
- status
- retryable
- details
- request_id

### 主なエラーコード

- INVALID_REQUEST
- UNAUTHORIZED
- METHOD_NOT_ALLOWED
- NOT_FOUND
- CONFIG_ERROR
- TODOIST_ERROR
- TODOIST_NOT_FOUND
- TODOIST_RATE_LIMIT
- UPSTREAM_TIMEOUT
- UPSTREAM_5XX
- UNKNOWN_ERROR

### step の例

- handler
- validateCreate
- validateUpdate
- validateList
- dispatchCreate
- dispatchUpdate
- dispatchList
- createTask
- createSubtask
- updateTask
- listTasks
- todoistRequest

### retryable の原則

- validation は false
- auth は false
- routing は false
- config は false
- not found は false
- upstream timeout は true
- upstream 5xx は true
- rate limit は true

### ログ方針

- サーバー側はエラー発生時に構造化ログを出力する
- ログには request_id を含める
- GPT と開発者は request_id を基点に切り分けを行う

---

## 旧 API

以下の旧 API は廃止済みとする。

- /api/task
- /api/task-update
- /api/task-close

---

## 非対象

docs 操作用 API は本ドキュメントの対象外とする。  
詳細は 10_repo_resource_api.md を参照する。

---

## セキュリティ

- 必要に応じて認証・認可を実装する

---

## 注意事項

- API は責務ごとに分離する
- 仕様変更は docs を更新してから実装する
