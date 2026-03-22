# Todoist API Development Plan (Current)

## 概要
Todoist API を docs（03_api_spec.md）に完全準拠させるための開発計画。
コード・旧API・GPTスキーマを含めた統一を目的とする。

---

## 目的
- docs と API の完全一致
- 旧 API の互換層化
- GPT（AI Work OS / 開発）のスキーマ統一
- 実運用可能な状態の確立

---

## 正式エンドポイント（SSOT）
- POST /api/tasks
- PATCH /api/tasks/:id
- GET /api/tasks

---

## Phase 1: API統一
- api/tasks.js を正式入口に統合（create/list）
- api/tasks-v2.js を統合対象にする
- api/task.js を create の互換ラッパー化
- api/task-update.js を update の互換ラッパー化
- api/task-close.js は status=closed ラッパーとして維持

---

## Phase 2: Update API実装
- PATCH /api/tasks/:id を新規実装
- validateUpdate / dispatchUpdate を使用
- status=closed を正式完了表現に統一

---

## Phase 3: Service整合
- service / client を docs 仕様に一致させる
- assignee は Phase1では未対応として整理
- duration_minutes の扱いを統一
- エラー構造・request_id を統一

---

## Phase 4: 実動テスト
- create / list / update / close の実行確認
- subtasks 作成確認
- validation error 確認
- upstream error 確認

---

## Phase 5: GPTスキーマ更新
対象
- AI Work OS
- AI Work OS開発

内容
- 同一 OpenAPI スキーマへ統一
- operationId 統一（createTask / listTasks / updateTask）
- closeTask 廃止（status=closed へ統合）

---

## 優先順位
1. /api/tasks 系の完成
2. PATCH /api/tasks/:id 実装
3. 旧 API ラッパー化
4. 実動テスト
5. GPT スキーマ更新

---

## 完了条件
- docs と API が一致
- 旧 API が互換層化
- Todoist 実動確認済み
- GPT スキーマ更新済み

---

## 次のアクション
- api/tasks.js の統合設計と実装
