# Tasks API Redesign for GPT Alignment

## 背景
既存のGPT Actionスキーマは実装実態に基づき以下を使用している。
- POST /api/task
- GET /api/tasks
- POST /api/task-update
- POST /api/task-close

一方、docs/03_api_spec.md では以下を正式仕様としている。
- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

ユーザー要求は、docs に沿って API を再設計し、その後に 2つの GPT のスキーマを対応させること。

## docs から確定できる要件
- API は薄く保つ
- API は service を呼び出すのみとする
- ロジックは service 層に集約する
- 責務は create / update / list で分離する
- 認証は Bearer Token を前提とする
- 一部 API は INTERNAL_API_KEY を利用できる
- AI UI は Vercel API を介して最小権限で操作する

## 再設計方針
- 正式仕様は docs/03_api_spec.md を採用する
- タスク API の公開エンドポイントは以下に統一する
  - POST /api/tasks
  - PATCH /api/tasks/:id
  - GET /api/tasks
- close は update の一部として吸収する
- 既存の /api/task, /api/task-update, /api/task-close は移行期間の互換層としてのみ扱う

## GPT スキーマ方針
- 2つの GPT は同一の OpenAPI スキーマを使用する
- operationId は docs に沿って再命名する
  - createTask
  - listTasks
  - updateTask
- closeTask は廃止する
- 完了操作は updateTask で status=closed を送る方式に統一する

## update API の入力方針
- docs 確定範囲を優先する
- due_date と priority は正式サポートとする
- content, description, labels は既存実装互換のために維持可能
- status を追加し、closed 指定で完了に統一する

## list API の入力方針
- docs の status / assignee を基準とする
- 既存実装の filter, project_id, section_id, label_id, cursor, limit は拡張クエリとして許容可能
- docs 反映前に正式仕様としては固定しない

## 注意点
- docs 修正は人間レビュー前提
- 本メモは docs 直前の設計草案であり SSOT ではない
